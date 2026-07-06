import 'server-only';
import crypto from 'crypto';
import { cookies } from 'next/headers';

// Authentification du back-office /gestion.
// Cookie httpOnly dont la valeur est un jeton dérivé du mot de passe (HMAC) :
// impossible à forger sans connaître ADMIN_PASSWORD.

export const GESTION_COOKIE = 'lc_gestion';
const SALT = 'lc-gestion-v1';

export function sessionToken(): string {
  const pw = process.env.ADMIN_PASSWORD || '';
  return crypto.createHmac('sha256', pw).update(SALT).digest('hex');
}

export async function isAuthed(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  const store = await cookies();
  const token = store.get(GESTION_COOKIE)?.value;
  return !!token && token === sessionToken();
}
