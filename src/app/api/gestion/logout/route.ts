import { NextResponse } from 'next/server';
import { GESTION_COOKIE } from '@/lib/gestion-auth';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(GESTION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
