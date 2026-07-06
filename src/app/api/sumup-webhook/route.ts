import { NextRequest, NextResponse } from 'next/server';
import { verifyPaid, claimSale, finalizeSale } from '@/lib/fulfill';

// Webhook SumUp : appelé au changement de statut d'un checkout, même si la
// cliente a fermé l'onglet après avoir payé. Payload minimal { event_type, id } ;
// on re-vérifie toujours le statut via l'API SumUp (aucune signature fournie).
export async function POST(req: NextRequest) {
  let checkoutId: string | undefined;
  try {
    const body = await req.json();
    checkoutId = typeof body?.id === 'string' ? body.id : undefined;
  } catch {
    // corps vide / non JSON : on accuse réception
    return new NextResponse(null, { status: 200 });
  }

  // Pas d'id ou paiement pas (encore) encaissé : on accuse réception sans agir.
  if (!checkoutId || !(await verifyPaid(checkoutId))) {
    return new NextResponse(null, { status: 200 });
  }

  try {
    const claim = await claimSale(checkoutId);
    if (claim.status === 'claimed') {
      await finalizeSale(claim.order);
    }
    // 'done' (déjà traité par le retour navigateur) ou 'missing' : rien à faire.
  } catch (e) {
    // Erreur transitoire : on renvoie une erreur pour que SumUp réessaie.
    console.error('[sumup-webhook] Finalisation échouée:', e);
    return new NextResponse(null, { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
}
