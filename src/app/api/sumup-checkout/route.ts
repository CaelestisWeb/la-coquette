import { NextRequest, NextResponse } from 'next/server';
import { resolvePromo } from '@/lib/promo';

const round2 = (n: number) => Math.round(n * 100) / 100;

export async function POST(req: NextRequest) {
  const { subtotal, shipping, promoCode, description, reference } = await req.json();

  // Montant recalculé CÔTÉ SERVEUR : la remise vient de la table serveur,
  // le navigateur ne peut pas la fabriquer.
  const base = Number(subtotal) || 0;
  const ship = Number(shipping) || 0;
  const discount = resolvePromo(promoCode)?.discount ?? 0;
  const amount = round2(base * (1 - discount) + ship);

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: 'Montant invalide' }, { status: 400 });
  }

  const res = await fetch('https://api.sumup.com/v0.1/checkouts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SUMUP_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      checkout_reference: reference || `LC-${Date.now()}`,
      amount,
      currency: 'EUR',
      merchant_code: 'M28Y0EMC',
      description: description || 'Commande La Coquette',
      redirect_url: 'https://lacoquette-bycaro.fr/commande-confirmee',
      // Page de paiement hébergée par SumUp : Apple Pay / Google Pay / carte
      // s'affichent automatiquement (domaine checkout.sumup.com déjà validé).
      hosted_checkout: { enabled: true },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('[sumup] Erreur création checkout:', JSON.stringify(data));
    return NextResponse.json({ error: data.message || 'Erreur SumUp' }, { status: 500 });
  }

  const hostedCheckoutUrl =
    data.hosted_checkout_url ||
    data?.hosted_checkout?.url ||
    `https://checkout.sumup.com/pay/${data.id}`;

  return NextResponse.json({ checkoutId: data.id, hostedCheckoutUrl, amount });
}
