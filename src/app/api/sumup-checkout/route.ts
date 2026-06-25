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
      // redirect_url (et non return_url) est OBLIGATOIRE pour les wallets/APM
      // comme Apple Pay et Google Pay : c'est là que le client est renvoyé
      // après le flux de paiement par redirection. Sans lui, Apple Pay ne
      // s'initialise jamais (le bouton reste masqué), même si la carte marche.
      redirect_url: 'https://lacoquette-bycaro.fr/commande-confirmee',
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('[sumup] Erreur création checkout:', JSON.stringify(data));
    return NextResponse.json({ error: data.message || 'Erreur SumUp' }, { status: 500 });
  }

  return NextResponse.json({ checkoutId: data.id });
}
