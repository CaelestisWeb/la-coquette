import { NextResponse } from 'next/server';
import { GESTION_COOKIE, sessionToken } from '@/lib/gestion-auth';

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: '' }));
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(GESTION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 jours
  });
  return res;
}
