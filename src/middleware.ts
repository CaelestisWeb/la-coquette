import { NextResponse, type NextRequest } from 'next/server';
import { getComingSoon } from '@/lib/site-status';

// S'applique à toutes les pages SAUF : l'API, les fichiers Next internes,
// la page d'attente elle-même, l'espace admin, et les fichiers statiques
// (tout chemin contenant un point : .svg, .jpg, .ico…).
export const config = {
  matcher: ['/((?!api|_next|admin|bientot|.*\\.).*)'],
};

export async function middleware(req: NextRequest) {
  // Aperçu admin : une fois connecté, on laisse voir le vrai site.
  if (req.cookies.get('lc_admin')?.value === '1') {
    return NextResponse.next();
  }

  if (await getComingSoon()) {
    const url = req.nextUrl.clone();
    url.pathname = '/bientot';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
