import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const SHOP_EMAIL = 'contact@lacoquette-bycaro.fr';
const FROM = 'La Coquette <onboarding@resend.dev>';

type OrderItem = { name: string; quantity: number; price: number };

const eur = (n: number) => `${Number(n).toFixed(2)} €`;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { customer, items, subtotal, shipping, total, reference, checkoutId, discount, promoCode } = await req.json();

  if (!customer?.email || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Commande invalide' }, { status: 400 });
  }

  // Vérifie que le paiement a bien été encaissé côté SumUp avant d'envoyer
  // quoi que ce soit : évite d'avertir Caro d'une commande non payée (cliente
  // qui revient sur la page sans avoir finalisé le paiement, par exemple).
  if (checkoutId) {
    try {
      const check = await fetch(`https://api.sumup.com/v0.1/checkouts/${checkoutId}`, {
        headers: { Authorization: `Bearer ${process.env.SUMUP_SECRET_KEY}` },
      });
      const co = await check.json();
      if (co.status !== 'PAID') {
        return NextResponse.json({ ok: false, paid: false });
      }
    } catch (e) {
      console.error('[order] Vérification du paiement impossible:', e);
      return NextResponse.json({ ok: false, paid: false });
    }
  }

  const date = new Date().toLocaleString('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const rows = (items as OrderItem[])
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #ECE7E1;color:#111111;">${i.name}</td>
        <td style="padding:8px 0;border-bottom:1px solid #ECE7E1;text-align:center;color:#6E655B;">× ${i.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #ECE7E1;text-align:right;color:#111111;">${eur(i.price * i.quantity)}</td>
      </tr>`
    )
    .join('');

  const totals = `
    <tr><td colspan="2" style="padding:6px 0;color:#6E655B;">Sous-total</td><td style="padding:6px 0;text-align:right;color:#6E655B;">${eur(subtotal)}</td></tr>
    ${discount ? `<tr><td colspan="2" style="padding:6px 0;color:#A8842E;">Réduction${promoCode ? ` (${promoCode})` : ''}</td><td style="padding:6px 0;text-align:right;color:#A8842E;">-${eur(discount)}</td></tr>` : ''}
    <tr><td colspan="2" style="padding:6px 0;color:#6E655B;">Livraison</td><td style="padding:6px 0;text-align:right;color:#6E655B;">${shipping === 0 ? 'Offerte' : eur(shipping)}</td></tr>
    <tr><td colspan="2" style="padding:10px 0;font-weight:600;color:#111111;border-top:1px solid #DCD7D1;">Total</td><td style="padding:10px 0;text-align:right;font-weight:600;color:#111111;border-top:1px solid #DCD7D1;">${eur(total)}</td></tr>`;

  const address = `${customer.prenom} ${customer.nom}<br/>${customer.adresse}<br/>${customer.codePostal} ${customer.ville}`;

  const wrap = (inner: string) => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#F4EEE5;">
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;background:#FBF8F3;padding:32px 28px;color:#111111;">
    ${inner}
    <p style="margin-top:28px;font-size:12px;color:#9A9189;text-align:center;">La Coquette · Bijoux artisanaux · Drôme</p>
  </div>
</body>
</html>`;

  // ── 1. Email à Caro (essentiel) ─────────────────────────────
  const shopHtml = wrap(`
    <h1 style="font-size:20px;color:#111111;margin:0 0 4px;">Nouvelle commande</h1>
    <p style="font-size:13px;color:#6E655B;margin:0 0 24px;">${reference || ''} · ${date}</p>

    <h2 style="font-size:14px;color:#A8842E;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Cliente</h2>
    <p style="font-size:14px;margin:0 0 4px;"><strong>${customer.prenom} ${customer.nom}</strong></p>
    <p style="font-size:14px;margin:0 0 20px;"><a href="mailto:${customer.email}" style="color:#A8842E;">${customer.email}</a></p>

    <h2 style="font-size:14px;color:#A8842E;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Adresse de livraison</h2>
    <p style="font-size:14px;line-height:1.5;margin:0 0 24px;">${address}</p>

    <h2 style="font-size:14px;color:#A8842E;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Articles</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}${totals}</table>
  `);

  const { error } = await resend.emails.send({
    from: FROM,
    to: SHOP_EMAIL,
    replyTo: customer.email,
    subject: `🛍️ Nouvelle commande — ${customer.prenom} ${customer.nom} (${eur(total)})`,
    html: shopHtml,
  });

  if (error) {
    console.error('[order] Resend (boutique) error:', JSON.stringify(error));
    return NextResponse.json({ error: 'Envoi de la commande échoué' }, { status: 500 });
  }

  // ── 2. Confirmation à la cliente (best-effort) ──────────────
  // Échoue tant que le domaine n'est pas vérifié chez Resend : on n'interrompt
  // pas la commande pour autant (le mail à Caro, lui, est déjà parti).
  const customerHtml = wrap(`
    <h1 style="font-size:20px;color:#111111;margin:0 0 4px;">Merci pour votre commande !</h1>
    <p style="font-size:14px;color:#6E655B;line-height:1.6;margin:0 0 24px;">
      Bonjour ${customer.prenom}, votre commande est bien confirmée. Caro la prépare avec soin
      et vous contactera très prochainement pour la livraison.
    </p>

    <h2 style="font-size:14px;color:#A8842E;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Votre commande</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}${totals}</table>

    <h2 style="font-size:14px;color:#A8842E;text-transform:uppercase;letter-spacing:1px;margin:24px 0 8px;">Livraison</h2>
    <p style="font-size:14px;line-height:1.5;margin:0;">${address}</p>
  `);

  const { error: custErr } = await resend.emails.send({
    from: FROM,
    to: customer.email,
    subject: 'Votre commande La Coquette est confirmée ✨',
    html: customerHtml,
  });
  if (custErr) {
    console.warn('[order] Confirmation cliente non envoyée (domaine non vérifié ?):', JSON.stringify(custErr));
  }

  return NextResponse.json({ ok: true, paid: true });
}
