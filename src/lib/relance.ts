import 'server-only';
import { Resend } from 'resend';
import { writeClient } from '@/sanity/lib/writeClient';
import { getProductsByIds } from '@/sanity/lib/products';
import { verifyPaid } from '@/lib/fulfill';

/* Relance panier abandonné : UN seul email chaleureux, 24 à 48 h après un
   paiement non finalisé (pendingOrder encore "pending"). On ne relance
   jamais deux fois (relanceSent), jamais un paiement finalement encaissé,
   et on ne propose que les pièces encore disponibles (pièces uniques). */

const FROM = 'La Coquette <commandes@lacoquette-bycaro.fr>';
const REPLY_TO = 'contact@lacoquette-bycaro.fr';
const SITE = 'https://lacoquette-bycaro.fr';

type PendingDoc = { _id: string; _createdAt: string; payload?: string };
type Item = { id: string; name: string; price: number; image: string; slug: string };

const esc = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildHtml(prenom: string, items: Item[], checkoutId?: string) {
  const rows = items
    .map(
      (p) => `
      <tr>
        <td width="64" style="padding:8px 0;vertical-align:middle;">
          <a href="${SITE}/boutique/${p.slug}"><img src="${p.image}" width="64" height="64" alt="" style="display:block;width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid #ECE7E1;" /></a>
        </td>
        <td style="padding:8px 0 8px 14px;vertical-align:middle;">
          <a href="${SITE}/boutique/${p.slug}" style="color:#111111;text-decoration:none;font-size:15px;">${esc(p.name)}</a>
          <div style="color:#6E655B;font-size:13px;margin-top:3px;">${p.price} €</div>
        </td>
      </tr>`,
    )
    .join('');
  const cta = checkoutId ? `${SITE}/reprendre?c=${encodeURIComponent(checkoutId)}` : `${SITE}/boutique`;
  const bonjour = prenom ? `Bonjour ${esc(prenom)},` : 'Bonjour,';
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F4EEE5;">
<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#FBF8F3;padding:36px 30px;color:#111111;">
  <p style="font-size:15px;line-height:1.6;margin:0 0 6px;">${bonjour}</p>
  <p style="font-size:15px;line-height:1.6;color:#6E655B;margin:0 0 26px;">Vous avez laissé quelques créations dans votre panier. Elles vous attendent, bien au chaud.</p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 26px;">${rows}</table>
  <p style="font-size:15px;line-height:1.6;color:#6E655B;margin:0 0 28px;">Chaque bijou est fait main par Caro, en pièce unique. Si l'un d'entre eux vous a plu, il ne reste qu'un seul pas pour qu'il soit à vous.</p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;"><tr><td style="border-radius:4px;background:#111111;">
    <a href="${cta}" style="display:inline-block;padding:14px 30px;color:#FFFFFF;text-decoration:none;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;">Reprendre ma commande</a>
  </td></tr></table>
  <p style="font-size:14px;line-height:1.6;color:#6E655B;margin:0;">Une question, une hésitation sur une taille ou une couleur ? Répondez simplement à ce message, c'est Caro qui vous lira.</p>
  <p style="font-size:14px;line-height:1.6;margin:22px 0 0;">À très vite,<br/>Caro · La Coquette</p>
  <p style="margin-top:30px;font-size:12px;color:#9A9189;text-align:center;">La Coquette · Bijoux artisanaux · Drôme</p>
</div></body></html>`;
}

export async function runRelance({ dryRun = false } = {}) {
  const now = Date.now();
  const h24 = new Date(now - 24 * 3600 * 1000).toISOString();
  const h48 = new Date(now - 48 * 3600 * 1000).toISOString();

  const docs: PendingDoc[] = await writeClient.fetch(
    `*[_type=="pendingOrder" && status=="pending" && relanceSent != true && _createdAt < $h24 && _createdAt > $h48]{_id, _createdAt, payload}`,
    { h24, h48 },
  );

  const resend = new Resend(process.env.RESEND_API_KEY);
  let envoyes = 0;
  let ignores = 0;
  const details: string[] = [];

  for (const d of docs) {
    let order: {
      customer?: { prenom?: string; email?: string };
      items?: { id?: string }[];
      checkoutId?: string;
    };
    try {
      order = JSON.parse(d.payload || '{}');
    } catch {
      ignores++;
      continue;
    }
    const email = order?.customer?.email;
    const checkoutId = order?.checkoutId;
    if (!email) { ignores++; continue; }

    // Finalement payé ? On ne relance surtout pas.
    if (checkoutId && (await verifyPaid(checkoutId))) {
      if (!dryRun) await mark(d._id);
      ignores++;
      details.push(`${email} : déjà payé, ignoré`);
      continue;
    }

    const ids = (order.items || []).map((i) => i.id).filter((x): x is string => !!x);
    const products = ids.length ? await getProductsByIds(ids) : [];
    const items: Item[] = products
      .filter((p) => p.available !== false)
      .map((p) => ({ id: p.id, name: p.name, price: p.price, image: p.image, slug: p.slug }));

    if (items.length === 0) {
      if (!dryRun) await mark(d._id);
      ignores++;
      details.push(`${email} : plus aucune pièce dispo, ignoré`);
      continue;
    }

    if (dryRun) {
      details.push(`${email} : ENVERRAIT (${items.length} pièce(s))`);
      envoyes++;
      continue;
    }

    try {
      const { error } = await resend.emails.send({
        from: FROM,
        to: email,
        replyTo: REPLY_TO,
        subject: 'Vos pièces vous attendent chez La Coquette',
        html: buildHtml(order.customer?.prenom || '', items, checkoutId),
      });
      if (error) throw new Error(JSON.stringify(error));
      await mark(d._id);
      envoyes++;
      details.push(`${email} : envoyé (${items.length} pièce(s))`);
    } catch (e) {
      ignores++;
      details.push(`${email} : échec envoi`);
      console.warn('[relance] envoi échoué', e);
    }
  }

  return { dryRun, candidats: docs.length, envoyes, ignores, details };
}

async function mark(id: string) {
  try {
    await writeClient.patch(id).set({ relanceSent: true, relanceSentAt: new Date().toISOString() }).commit();
  } catch (e) {
    console.warn('[relance] marquage impossible', e);
  }
}
