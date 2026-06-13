import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { nom, email, sujet, message } = await req.json();

  if (!nom || !email || !message) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"La Coquette – Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO,
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
