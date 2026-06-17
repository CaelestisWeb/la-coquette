import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { nom, email, sujet, message, entreprise } = await req.json();

  // Honeypot : un humain ne remplit jamais ce champ caché → on ignore en silence
  if (entreprise) {
    return NextResponse.json({ ok: true });
  }

  if (!nom || !email || !message) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
  }

  // Validation basique de l'email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
  }

  const subject = sujet
    ? `[La Coquette] ${sujet} - ${nom}`
    : `[La Coquette] Message de ${nom}`;

  const { data, error } = await resend.emails.send({
    from: 'La Coquette <onboarding@resend.dev>',
    to: 'contact@lacoquette-bycaro.fr',
    replyTo: email,
    subject,
    html: `
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Sujet :</strong> ${sujet || '-'}</p>
      <hr/>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  });

  if (error) {
    console.error('[contact] Resend error:', JSON.stringify(error));
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('[contact] Email sent:', data?.id);
  return NextResponse.json({ ok: true });
}
