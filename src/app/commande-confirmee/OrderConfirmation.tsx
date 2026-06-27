'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

type Status = 'loading' | 'success' | 'unpaid';

export default function OrderConfirmation() {
  const { clearCart } = useCart();
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const raw = sessionStorage.getItem('lacoquette-pending-order');

    // Pas de commande en attente = visite directe de la page → on remercie.
    if (!raw) {
      setStatus('success');
      return;
    }

    // On retire tout de suite pour éviter un double traitement (rechargement).
    sessionStorage.removeItem('lacoquette-pending-order');

    let order: unknown;
    try {
      order = JSON.parse(raw);
    } catch {
      setStatus('success');
      return;
    }

    fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.paid === false) {
          setStatus('unpaid');
        } else {
          clearCart();
          setStatus('success');
        }
      })
      // En cas d'erreur réseau sur notre API, le paiement reste valide côté
      // SumUp : on remercie la cliente plutôt que de l'inquiéter.
      .catch(() => {
        clearCart();
        setStatus('success');
      });
  }, [clearCart]);

  if (status === 'loading') {
    return (
      <div className="pt-32 md:pt-44 min-h-screen bg-ivoire flex items-center justify-center">
        <p className="font-body text-sm text-taupe animate-pulse">Confirmation de votre commande…</p>
      </div>
    );
  }

  if (status === 'unpaid') {
    return (
      <div className="pt-32 md:pt-44 min-h-screen bg-ivoire flex items-center justify-center">
        <div className="text-center px-6 py-20 max-w-md">
          <h1 className="font-display text-3xl text-noir mt-4">Paiement non finalisé</h1>
          <p className="font-body text-sm text-taupe leading-relaxed mt-4">
            Votre paiement n'a pas été confirmé. Aucun montant n'a été débité. Vous pouvez réessayer, votre panier est conservé.
          </p>
          <div className="mt-10">
            <Link href="/checkout"
              className="inline-block bg-noir text-blanc border border-noir font-body text-xs font-medium tracking-widest uppercase px-10 py-4 rounded hover:bg-or transition-colors duration-300">
              Reprendre ma commande
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire flex items-center justify-center">
      <div className="text-center px-6 py-20 max-w-md">
        <div className="w-16 h-16 rounded-full bg-rose flex items-center justify-center mx-auto mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="font-display text-4xl text-noir mb-4">Merci pour votre commande !</h1>
        <p className="font-body text-sm text-taupe leading-relaxed mb-10">
          Caro a bien reçu votre commande et vous contactera très prochainement pour confirmer les détails de livraison.
        </p>
        <Link href="/boutique"
          className="inline-block bg-noir text-blanc border border-noir font-body text-xs font-medium tracking-widest uppercase px-10 py-4 rounded hover:bg-or transition-colors duration-300">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}
