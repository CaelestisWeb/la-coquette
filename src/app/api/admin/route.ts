import { NextRequest, NextResponse } from 'next/server';
import { getComingSoon, setComingSoon, storageReady } from '@/lib/site-status';

export async function POST(req: NextRequest) {
  const { password, action } = await req.json();

  // Authentification par mot de passe (variable d'env ADMIN_PASSWORD)
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  }

  let comingSoon = await getComingSoon();
  const storage = storageReady();

  // Changement d'état demandé
  if (action === 'on' || action === 'off') {
    const persisted = await setComingSoon(action === 'on');
    if (!persisted) {
      return NextResponse.json({
        ok: false,
        comingSoon,
        storage: false,
        error: 'Stockage non encore branché : impossible de mémoriser le changement.',
      });
    }
    comingSoon = action === 'on';
  }

  const res = NextResponse.json({ ok: true, comingSoon, storage });

  // Cookie d'aperçu : permet de voir le vrai site même en mode « bientôt
  // disponible » (valable 24 h sur ce navigateur).
  res.cookies.set('lc_admin', '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return res;
}
