import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { nom, email, sujet, message } = await req.json();

  if (!nom || !email || !message) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
  }

  await resend.emails.send({
    from: 'La Coquette <onboarding@resend.dev>',
    to: 'contact@lacoquette-bycaro.fr',
    replyTo: email,
    subject: sujet ? `[La Coquette] ${sujet} — ${nom}` : `[La Coquette] Message de ${nom}`,
    html: `
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Sujet :</strong> ${sujet || '—'}</p>
      <hr/>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
