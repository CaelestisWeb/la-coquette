import { NextResponse, type NextRequest } from 'next/server';
import { getComingSoon } from '@/lib/site-status';

// S'applique à toutes les pages SAUF : l'API, les fichiers Next internes,
// le Studio (toujours joignable pour rééteindre le mode), la page d'attente
// elle-même, et les fichiers statiques (tout chemin contenant un point).
export const config = {
  matcher: ['/((?!api|_next|studio|bientot|.*\\.).*)'],
};

export async function middleware(req: NextRequest) {
  if (await getComingSoon()) {
    const url = req.nextUrl.clone();
    url.pathname = '/bientot';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
