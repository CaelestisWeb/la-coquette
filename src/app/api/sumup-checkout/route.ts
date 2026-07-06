import { NextRequest, NextResponse } from 'next/server';
import { resolvePromo } from '@/lib/promo';
import { writeClient } from '@/sanity/lib/writeClient';

/* eslint-disable @typescript-eslint/no-explicit-any */

const round2 = (n: number) => Math.round(n * 100) / 100;

export async function POST(req: NextRequest) {
  const { subtotal, shipping, promoCode, description, reference, items } = await req.json();

  // Pièces uniques : on refuse le paiement si un bijou du panier vient d'être
  // vendu (marqué indisponible). Lecture fraîche (writeClient, sans cache CDN).
  const ids: string[] = Array.isArray(items)
    ? items.map((i: any) => i?.id).filter((x: unknown): x is string => typeof x === 'string')
    : [];
  if (ids.length) {
    const sold: any[] = await writeClient.fetch(
      `*[_type == "product" && _id in $ids && available == false]{ _id, name }`,
      { ids },
    );
    if (sold.length) {
      const noms = sold.map((s) => s.name).filter(Boolean).join(', ');
      return NextResponse.json(
        {
          error:
            sold.length > 1
              ? `Désolé, ces bijoux viennent d'être vendus et ne sont plus disponibles : ${noms}. Ils ont été retirés de votre panier.`
              : `Désolé, ce bijou vient d'être vendu et n'est plus disponible : ${noms}. Il a été retiré de votre panier.`,
          soldOut: sold.map((s) => s._id),
        },
        { status: 409 },
      );
    }
  }

  // Montant recalculé CÔTÉ SERVEUR : la remise vient de la table serveur,
  // le navigateur ne peut pas la fabriquer.
  const base = Number(subtotal) || 0;
  const promo = resolvePromo(promoCode);
  const discount = promo?.discount ?? 0;
  const ship = promo?.freeShipping ? 0 : (Number(shipping) || 0);
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
