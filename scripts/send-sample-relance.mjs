// Envoie UN exemplaire du mail de relance panier abandonné (aperçu pour
// Célestin), avec de vrais bijoux de la boutique. N'affecte aucune cliente.
import { readFileSync } from 'node:fs';
import { Resend } from 'resend';
import { createClient } from '@sanity/client';

for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const TO = 'caelestis-pro@hotmail.com';
const FROM = 'La Coquette <commandes@lacoquette-bycaro.fr>';
const REPLY_TO = 'contact@lacoquette-bycaro.fr';
const SITE = 'https://lacoquette-bycaro.fr';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nuwh7dyu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Reproduit exactement le template de src/lib/relance.ts (aperçu fidèle).
function buildHtml(prenom, items, checkoutId) {
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

const products = await client.fetch(
  `*[_type=="product" && available != false && defined(images[0].asset) && defined(slug.current)][0...3]{
     "id": _id, name, price, "slug": slug.current, "image": images[0].asset->url }`,
);

if (!products.length) {
  console.log('Aucun produit exploitable pour l\'aperçu.');
  process.exit(0);
}

const resend = new Resend(process.env.RESEND_API_KEY);
const { error } = await resend.emails.send({
  from: FROM,
  to: TO,
  replyTo: REPLY_TO,
  subject: '[Aperçu] Vos pièces vous attendent chez La Coquette',
  html: buildHtml('Célestin', products, ''),
});

console.log(error ? 'ERREUR: ' + JSON.stringify(error) : `Aperçu envoyé à ${TO} (${products.length} bijoux : ${products.map((p) => p.name).join(', ')})`);
