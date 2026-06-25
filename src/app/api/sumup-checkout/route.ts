import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { amount, description, reference } = await req.json();

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
      amount: parseFloat(amount.toFixed(2)),
      currency: 'EUR',
      merchant_code: 'M28Y0EMC',
      description: description || 'Commande La Coquette',
      // redirect_url : où la cliente est renvoyée après avoir payé sur la
      // page hébergée SumUp.
      redirect_url: 'https://lacoquette-bycaro.fr/commande-confirmee',
      // Page de paiement hébergée par SumUp : Apple Pay / Google Pay / carte
      // s'affichent automatiquement (domaine checkout.sumup.com déjà validé
      // chez Apple), sans aucune vérification de domaine de notre côté.
      hosted_checkout: { enabled: true },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('[sumup] Erreur création checkout:', JSON.stringify(data));
    return NextResponse.json({ error: data.message || 'Erreur SumUp' }, { status: 500 });
  }

  // URL de la page de paiement hébergée (fallback sur le format documenté).
  const hostedCheckoutUrl =
    data.hosted_checkout_url ||
    data?.hosted_checkout?.url ||
    `https://checkout.sumup.com/pay/${data.id}`;

  return NextResponse.json({ checkoutId: data.id, hostedCheckoutUrl });
}
