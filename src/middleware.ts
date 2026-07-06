import { NextResponse, type NextRequest } from 'next/server';
import { getComingSoon } from '@/lib/site-status';

// S'applique à toutes les pages SAUF : l'API, les fichiers Next internes,
// le Studio (toujours joignable pour rééteindre le mode), la page d'attente
// elle-même, et les fichiers statiques (tout chemin contenant un point).
export const config = {
  matcher: ['/((?!api|_next|studio|gestion|bientot|.*\\.).*)'],
};

export async function middleware(req: NextRequest) {
  // Aperçu Studio (Presentation) : laisser voir le vrai site même en mode
  // « bientôt disponible ». Next pose ce cookie quand le draft mode est actif.
  if (req.cookies.has('__prerender_bypass')) {
    return NextResponse.next();
  }

  if (await getComingSoon()) {
    const url = req.nextUrl.clone();
    url.pathname = '/bientot';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
