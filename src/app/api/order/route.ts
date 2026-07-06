import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyPaid, claimSale, finalizeSale, type Order } from '@/lib/fulfill';

// Finalisation au RETOUR de la cliente sur /commande-confirmee.
// Le webhook SumUp fait la même chose côté serveur : le verrou (claimSale)
// garantit qu'emails + retrait de la vente ne se font qu'une seule fois.
export async function POST(req: NextRequest) {
  const body = (await req.json()) as Order;
  const { customer, items, checkoutId } = body;

  if (!customer?.email || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Commande invalide' }, { status: 400 });
  }

  // Paiement bien encaissé ?
  if (!(await verifyPaid(checkoutId))) {
    return NextResponse.json({ ok: false, paid: false });
  }

  // Emails + retrait de la vente, une seule fois.
  try {
    if (checkoutId) {
      const claim = await claimSale(checkoutId);
      if (claim.status === 'claimed') await finalizeSale(claim.order);
      else if (claim.status === 'missing') await finalizeSale(body); // pas de commande enregistrée → depuis le navigateur
      // 'done' : déjà traité par le webhook, on ne renvoie pas d'email
    } else {
      await finalizeSale(body);
    }
  } catch (e) {
    console.error('[order] Finalisation échouée:', e);
    return NextResponse.json({ error: 'Envoi de la commande échoué' }, { status: 500 });
  }

  // Historique de commande, si la cliente est connectée (RLS : sa commande à
  // son nom). Toujours tenté ici, même si le webhook a déjà envoyé les emails.
  try {
    const supabase = await createClient();
    const { data: auth } = await supabase.auth.getUser();
    if (auth.user) {
      await supabase.from('orders').insert({
        user_id: auth.user.id,
        reference: body.reference || null,
        status: 'paid',
        subtotal: Number(body.subtotal) || 0,
        shipping: Number(body.shipping) || 0,
        discount: Number(body.discount) || 0,
        total: Number(body.total) || 0,
        items,
        customer,
      });
    }
  } catch (e) {
    console.warn('[order] Historique non enregistré:', e);
  }

  return NextResponse.json({ ok: true, paid: true });
}
