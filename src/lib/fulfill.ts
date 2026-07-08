import 'server-only';
import { Resend } from 'resend';
import { revalidatePath } from 'next/cache';
import { writeClient } from '@/sanity/lib/writeClient';

/* Finalisation d'une commande payée : emails + retrait des pièces vendues.
   Partagé entre le retour navigateur (/api/order) et le webhook SumUp
   (/api/sumup-webhook), avec un verrou d'idempotence pour ne traiter qu'une
   seule fois (pas de double email). */

const SHOP_EMAIL = 'contact@lacoquette-bycaro.fr';
const FROM = 'La Coquette <commandes@lacoquette-bycaro.fr>';
const REPLY_TO = 'contact@lacoquette-bycaro.fr';

export type OrderItem = { id?: string; name: string; quantity: number; price: number; image?: string };
export type Order = {
  customer: { prenom?: string; nom?: string; email?: string; adresse?: string; codePostal?: string; ville?: string };
  items: OrderItem[];
  subtotal?: number;
  shipping?: number;
  discount?: number;
  total?: number;
  reference?: string;
  promoCode?: string;
  checkoutId?: string;
};

const eur = (n: number) => `${Number(n).toFixed(2)} €`;

// Vérifie auprès de SumUp que le paiement est bien encaissé.
export async function verifyPaid(checkoutId?: string): Promise<boolean> {
  if (!checkoutId) return true; // rien à vérifier (compat)
  try {
    const r = await fetch(`https://api.sumup.com/v0.1/checkouts/${checkoutId}`, {
      headers: { Authorization: `Bearer ${process.env.SUMUP_SECRET_KEY}` },
    });
    const co = await r.json();
    return co.status === 'PAID';
  } catch (e) {
    console.error('[fulfill] Vérification SumUp impossible:', e);
    return false;
  }
}

const pendingId = (checkoutId: string) => `porder-${checkoutId}`;

// Enregistre la commande en attente (au moment du paiement), pour que le
// webhook puisse la finaliser même si la cliente ferme l'onglet.
export async function savePending(order: Order): Promise<void> {
  if (!order.checkoutId) return;
  await writeClient.createOrReplace({
    _id: pendingId(order.checkoutId),
    _type: 'pendingOrder',
    reference: order.reference || '',
    status: 'pending',
    payload: JSON.stringify(order),
  });
}

type Claim = { status: 'claimed'; order: Order } | { status: 'done' } | { status: 'missing' };

// Réclame la commande de façon atomique (ifRevisionId) : une seule des deux
// voies (navigateur / webhook) la traite.
export async function claimSale(checkoutId: string): Promise<Claim> {
  const id = pendingId(checkoutId);
  const doc = await writeClient.getDocument(id).catch(() => null);
  if (!doc) return { status: 'missing' };
  if ((doc as { status?: string }).status === 'done') return { status: 'done' };
  try {
    await writeClient.patch(id).ifRevisionId(doc._rev).set({ status: 'done' }).commit();
  } catch {
    return { status: 'done' }; // réclamée entre-temps par l'autre voie
  }
  try {
    return { status: 'claimed', order: JSON.parse((doc as { payload?: string }).payload || '{}') };
  } catch {
    return { status: 'done' };
  }
}

function rowsHtml(items: OrderItem[]) {
  const thumb = (image?: string) =>
    image && /^https?:\/\//.test(image)
      ? `<td style="padding-right:12px;vertical-align:middle;" width="56"><img src="${image}" width="56" height="56" alt="" style="display:block;width:56px;height:56px;object-fit:cover;border-radius:8px;border:1px solid #ECE7E1;" /></td>`
      : '';
  return items
    .map(
      (i) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #ECE7E1;color:#111111;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr>
            ${thumb(i.image)}
            <td style="vertical-align:middle;color:#111111;font-size:14px;">${i.name}</td>
          </tr></table>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #ECE7E1;text-align:center;color:#6E655B;vertical-align:middle;">× ${i.quantity}</td>
        <td style="padding:10px 0;border-bottom:1px solid #ECE7E1;text-align:right;color:#111111;vertical-align:middle;">${eur(i.price * i.quantity)}</td>
      </tr>`,
    )
    .join('');
}

async function sendEmails(order: Order) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { customer, items, subtotal = 0, shipping = 0, total = 0, reference, discount, promoCode } = order;
  const date = new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' });
  const rows = rowsHtml(items);
  const totals = `
    <tr><td colspan="2" style="padding:6px 0;color:#6E655B;">Sous-total</td><td style="padding:6px 0;text-align:right;color:#6E655B;">${eur(subtotal)}</td></tr>
    ${discount ? `<tr><td colspan="2" style="padding:6px 0;color:#A8842E;">Réduction${promoCode ? ` (${promoCode})` : ''}</td><td style="padding:6px 0;text-align:right;color:#A8842E;">-${eur(discount)}</td></tr>` : ''}
    <tr><td colspan="2" style="padding:6px 0;color:#6E655B;">Livraison</td><td style="padding:6px 0;text-align:right;color:#6E655B;">${shipping === 0 ? 'Offerte' : eur(shipping)}</td></tr>
    <tr><td colspan="2" style="padding:10px 0;font-weight:600;color:#111111;border-top:1px solid #DCD7D1;">Total</td><td style="padding:10px 0;text-align:right;font-weight:600;color:#111111;border-top:1px solid #DCD7D1;">${eur(total)}</td></tr>`;
  const address = `${customer.prenom} ${customer.nom}<br/>${customer.adresse}<br/>${customer.codePostal} ${customer.ville}`;
  const wrap = (inner: string) => `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F4EEE5;"><div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;background:#FBF8F3;padding:32px 28px;color:#111111;">${inner}
<p style="margin-top:28px;font-size:12px;color:#9A9189;text-align:center;">La Coquette · Bijoux artisanaux · Drôme</p></div></body></html>`;

  const shopHtml = wrap(`
    <h1 style="font-size:20px;color:#111111;margin:0 0 4px;">Nouvelle commande</h1>
    <p style="font-size:13px;color:#6E655B;margin:0 0 24px;">${reference || ''} · ${date}</p>
    <h2 style="font-size:14px;color:#A8842E;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Cliente</h2>
    <p style="font-size:14px;margin:0 0 4px;"><strong>${customer.prenom} ${customer.nom}</strong></p>
    <p style="font-size:14px;margin:0 0 20px;"><a href="mailto:${customer.email}" style="color:#A8842E;">${customer.email}</a></p>
    <h2 style="font-size:14px;color:#A8842E;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Adresse de livraison</h2>
    <p style="font-size:14px;line-height:1.5;margin:0 0 24px;">${address}</p>
    <h2 style="font-size:14px;color:#A8842E;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Articles</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}${totals}</table>`);

  const { error } = await resend.emails.send({
    from: FROM, to: SHOP_EMAIL, replyTo: customer.email || REPLY_TO,
    subject: `🛍️ Nouvelle commande — ${customer.prenom} ${customer.nom} (${eur(total)})`,
    html: shopHtml,
  });
  if (error) throw new Error('Resend boutique: ' + JSON.stringify(error));

  if (!customer.email) return; // pas d'email cliente : on s'arrête après Caro

  const customerHtml = wrap(`
    <h1 style="font-size:20px;color:#111111;margin:0 0 4px;">Merci pour votre commande !</h1>
    <p style="font-size:14px;color:#6E655B;line-height:1.6;margin:0 0 24px;">Bonjour ${customer.prenom}, votre commande est bien confirmée. L'équipe de Caro la prépare avec soin, pour vous garantir la meilleure qualité et la meilleure livraison. Nous mettons tout en œuvre pour qu'elle soit prête dans les meilleurs délais.</p>
    <h2 style="font-size:14px;color:#A8842E;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Votre commande</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}${totals}</table>
    <h2 style="font-size:14px;color:#A8842E;text-transform:uppercase;letter-spacing:1px;margin:24px 0 8px;">Livraison</h2>
    <p style="font-size:14px;line-height:1.5;margin:0;">${address}</p>`);

  const { error: custErr } = await resend.emails.send({
    from: FROM, to: customer.email, replyTo: REPLY_TO,
    subject: 'Votre commande La Coquette est confirmée ✨', html: customerHtml,
  });
  if (custErr) console.warn('[fulfill] Confirmation cliente non envoyée:', JSON.stringify(custErr));
}

// Retire de la vente les bijoux achetés (pièces uniques).
async function markSold(items: OrderItem[]) {
  const ids = items.map((i) => i.id).filter((x): x is string => typeof x === 'string');
  if (!ids.length) return;
  let tx = writeClient.transaction();
  ids.forEach((id) => { tx = tx.patch(id, { set: { available: false } }); });
  await tx.commit();
  revalidatePath('/');
  revalidatePath('/boutique');
  revalidatePath('/boutique/[slug]', 'page');
}

// Envoie les emails et retire les pièces vendues.
export async function finalizeSale(order: Order): Promise<void> {
  await sendEmails(order);
  try {
    await markSold(order.items || []);
  } catch (e) {
    console.warn('[fulfill] Retrait de la vente impossible:', e);
  }
}
