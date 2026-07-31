import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Le site répondait à la fois sur lacoquette-bycaro.fr et www.lacoquette-bycaro.fr
// sans redirection : Google y voyait deux sites identiques et diluait leur valeur.
// On redirige toute visite en www vers le domaine nu (canonique), en 308 pour
// préserver la méthode et transmettre le signal aux moteurs.
export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  if (host.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.host = host.slice(4);
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

// On exclut les fichiers statiques et l'optimiseur d'images : la redirection
// n'a de sens que sur les pages, et ça évite tout surcoût inutile.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico|woff2?)$).*)'],
};
