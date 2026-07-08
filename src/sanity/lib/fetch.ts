import 'server-only';
import { client } from './client';

/**
 * Lecture du contenu PUBLIÉ, mise en cache 60 s (ISR).
 *
 * On n'appelle PAS `draftMode()` ici : cet appel ferait basculer chaque page
 * en rendu dynamique (SSR à chaque requête, TTFB élevé). En s'en passant, les
 * pages publiques (accueil, fiches produits…) sont générées statiquement et
 * servies depuis le cache CDN, avec revalidation toutes les 60 s.
 *
 * L'édition se fait via /gestion (écriture du document publié + revalidation),
 * donc l'aperçu « brouillon » du Studio n'est pas nécessaire au fonctionnement.
 */
export async function sanityFetch<T = any>( // eslint-disable-line @typescript-eslint/no-explicit-any
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params, { next: { revalidate: 60 } });
}
