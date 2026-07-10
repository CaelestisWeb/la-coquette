import { NextResponse } from 'next/server';
import { runRelance } from '@/lib/relance';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Déclenché toutes les heures par le cron Vercel. Envoie au plus UN email de
// relance par commande abandonnée (24-48 h). ?dry=1 = test à blanc (n'envoie
// rien). Si CRON_SECRET est défini, seul le cron Vercel (qui porte l'en-tête
// Authorization) est autorisé.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  const dryRun = new URL(req.url).searchParams.get('dry') === '1';
  try {
    const res = await runRelance({ dryRun });
    return NextResponse.json({ ok: true, ...res });
  } catch (e) {
    console.error('[relance] erreur', e);
    return NextResponse.json({ ok: false, error: 'Relance impossible' }, { status: 500 });
  }
}
