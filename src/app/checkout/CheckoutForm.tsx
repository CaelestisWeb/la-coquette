'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { SHIPPING_THRESHOLD, SHIPPING_COST } from '@/lib/shipping';

type AddressSuggestion = {
  label: string;
  postcode: string;
  city: string;
  housenumber: string;
  street: string;
};

export default function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const shipping = total >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = total + shipping;

  const [form, setForm] = useState({
    prenom: '', nom: '', email: '',
    adresse: '', codePostal: '', ville: '',
  });
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [checkoutId, setCheckoutId] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const sumupRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Autocomplétion adresse française (API officielle data.gouv — toute la France)
  async function searchAddress(query: string) {
    if (query.trim().length < 3) { setSuggestions([]); setShowSuggestions(false); return; }
    try {
      const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=6&autocomplete=1`
      );
      if (!res.ok) return;
      const data = await res.json();
      const results: AddressSuggestion[] = (data.features ?? []).map((f: any) => ({
        label: f.properties.label,
        postcode: f.properties.postcode ?? '',
        city: f.properties.city ?? '',
        housenumber: f.properties.housenumber ?? '',
        street: f.properties.street ?? f.properties.name ?? '',
      }));
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } catch {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleAddressInput(value: string) {
    setForm(f => ({ ...f, adresse: value }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchAddress(value), 300);
  }

  function selectSuggestion(s: AddressSuggestion) {
    setForm(f => ({
      ...f,
      adresse: `${s.housenumber} ${s.street}`.trim() || s.label,
      codePostal: s.postcode,
      ville: s.city,
    }));
    setSuggestions([]);
    setShowSuggestions(false);
  }

  async function handleAddressSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const ref = `LC-${Date.now()}`;
      setOrderRef(ref);
      const res = await fetch('/api/sumup-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: grandTotal,
          description: `Commande La Coquette — ${form.prenom} ${form.nom}`,
          reference: ref,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la création du paiement');
      setCheckoutId(data.checkoutId);
      setStep('payment');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Monter le widget SumUp quand on passe à l'étape paiement
  useEffect(() => {
    if (step !== 'payment' || !checkoutId || !sumupRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js';
    script.async = true;
    script.onload = () => {
      (window as any).SumUpCard.mount({
        id: 'sumup-card',
        checkoutId,
        donateSubmitButton: false,
        showInstallments: false,
        onResponse: (type: string, body: any) => {
          if (type === 'success') {
            // Notifie la commande à Caro (+ confirmation cliente). Non bloquant :
            // on redirige même si l'email échoue, le paiement est déjà validé.
            fetch('/api/order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                customer: form,
                items: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
                subtotal: total,
                shipping,
                total: grandTotal,
                reference: orderRef,
              }),
            }).catch(() => {});
            clearCart();
            router.push('/commande-confirmee');
          } else if (type === 'error') {
            setError('Paiement refusé. Vérifiez vos informations de carte.');
          }
        },
      });
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, [step, checkoutId]);

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-body text-taupe">Votre panier est vide.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

      {/* Colonne gauche — formulaire */}
      <div>
        {step === 'address' ? (
          <>
            <h2 className="font-display text-3xl text-noir mb-8 text-center">Livraison</h2>
            <form onSubmit={handleAddressSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-taupe block mb-1 text-center">Prénom *</label>
                  <input required value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
                    className="w-full border border-gris bg-creme px-4 py-3 font-body text-sm text-noir outline-none focus:border-noir transition-colors" />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-taupe block mb-1 text-center">Nom *</label>
                  <input required value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                    className="w-full border border-gris bg-creme px-4 py-3 font-body text-sm text-noir outline-none focus:border-noir transition-colors" />
                </div>
              </div>

              <div>
                <label className="font-body text-[10px] tracking-widest uppercase text-taupe block mb-1 text-center">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gris bg-creme px-4 py-3 font-body text-sm text-noir outline-none focus:border-noir transition-colors" />
              </div>

              {/* Adresse avec autocomplétion */}
              <div className="relative">
                <label className="font-body text-[10px] tracking-widest uppercase text-taupe block mb-1 text-center">Adresse *</label>
                <input required value={form.adresse} onChange={e => handleAddressInput(e.target.value)}
                  onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  autoComplete="off"
                  placeholder="Commencez à taper votre adresse..."
                  className="w-full border border-gris bg-creme px-4 py-3 font-body text-sm text-noir outline-none focus:border-noir transition-colors" />
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute z-20 w-full bg-creme border border-gris shadow-md mt-1 max-h-72 overflow-y-auto rounded-md">
                    {suggestions.map((s, i) => (
                      <li key={i} onMouseDown={() => selectSuggestion(s)}
                        className="px-4 py-2.5 font-body text-sm text-noir hover:bg-ivoire cursor-pointer border-b border-gris last:border-0">
                        <span className="block">{s.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-taupe block mb-1 text-center">Code postal *</label>
                  <input required value={form.codePostal} onChange={e => setForm(f => ({ ...f, codePostal: e.target.value }))}
                    className="w-full border border-gris bg-creme px-4 py-3 font-body text-sm text-noir outline-none focus:border-noir transition-colors" />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-taupe block mb-1 text-center">Ville *</label>
                  <input required value={form.ville} onChange={e => setForm(f => ({ ...f, ville: e.target.value }))}
                    className="w-full border border-gris bg-creme px-4 py-3 font-body text-sm text-noir outline-none focus:border-noir transition-colors" />
                </div>
              </div>

              {error && <p className="font-body text-sm text-red-500">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full bg-noir text-blanc border border-dore font-body text-xs font-medium tracking-widest uppercase py-4 rounded hover:bg-or transition-colors duration-300 disabled:opacity-50">
                {loading ? 'Chargement...' : 'Continuer vers le paiement →'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="font-display text-3xl text-noir mb-8 text-center">Paiement</h2>
            <div id="sumup-card" ref={sumupRef} />
            {error && <p className="font-body text-sm text-red-500 mt-4">{error}</p>}
            <button onClick={() => setStep('address')} className="mt-4 font-body text-xs text-taupe underline underline-offset-4">
              ← Modifier l'adresse
            </button>
          </>
        )}
      </div>

      {/* Colonne droite — récapitulatif */}
      <div className="bg-ivoire p-8 h-fit rounded-lg">
        <h3 className="font-display text-2xl text-noir mb-6">Récapitulatif</h3>
        <ul className="space-y-4 mb-6">
          {items.map(item => (
            <li key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-body text-sm text-noir">{item.name}</p>
                <p className="font-body text-xs text-taupe">× {item.quantity}</p>
              </div>
              <p className="font-body text-sm text-noir">{(item.price * item.quantity).toFixed(2)} €</p>
            </li>
          ))}
        </ul>
        <div className="border-t border-gris pt-4 space-y-2">
          <div className="flex justify-between font-body text-sm text-taupe">
            <span>Sous-total</span><span>{total.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between font-body text-sm text-taupe">
            <span>Livraison</span>
            <span>{shipping === 0 ? <span className="text-or">Gratuite</span> : `${shipping.toFixed(2)} €`}</span>
          </div>
          <div className="flex justify-between font-body text-base font-medium text-noir pt-2 border-t border-gris">
            <span>Total</span><span>{grandTotal.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  );
}
