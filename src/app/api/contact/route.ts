import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const TO = 'contact@lacoquette-bycaro.fr';
// Tant que le domaine n'est pas vérifié chez Resend, l'expéditeur reste
// l'adresse de test. Poser CONTACT_FROM sur Vercel une fois le DNS validé.
const FROM = process.env.CONTACT_FROM || 'La Coquette <onboarding@resend.dev>';

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const nom = String(data?.nom ?? '').trim();
  const email = String(data?.email ?? '').trim();
  const message = String(data?.message ?? '').trim();
  // Champ piège, invisible pour une personne : s'il est rempli, c'est un robot.
  const piege = String(data?.societe ?? '').trim();

  if (piege) return NextResponse.json({ ok: true });

  if (nom.length < 2 || nom.length > 80) {
    return NextResponse.json({ error: 'Merci d’indiquer votre nom.' }, { status: 400 });
  }
  if (email.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: 'Votre adresse email semble incorrecte.' }, { status: 400 });
  }
  if (message.length < 10 || message.length > 3000) {
    return NextResponse.json({ error: 'Merci d’écrire un message un peu plus détaillé.' }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'L’envoi est momentanément indisponible. Écrivez-nous directement à ' + TO + '.' },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Message de ${nom}, via le site`,
      text: `${nom} (${email}) vous écrit depuis lacoquette-bycaro.fr :\n\n${message}\n`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'L’envoi a échoué. Réessayez, ou écrivez directement à ' + TO + '.' },
      { status: 502 },
    );
  }
}
