import 'server-only';
import { draftMode } from 'next/headers';
import { client } from './client';
import { projectId } from '../env';

const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;

/**
 * Lecture du contenu, consciente du mode « aperçu » (draft mode).
 * - Site public : contenu PUBLIÉ, mis en cache 60 s (comportement habituel).
 * - Dans le Studio (volet Presentation, draft mode actif) : contenu BROUILLON,
 *   frais, pour que la cliente voie ses modifications avant publication.
 * Le token reste strictement côté serveur (fichier server-only).
 */
export async function sanityFetch<T = any>( // eslint-disable-line @typescript-eslint/no-explicit-any
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  const { isEnabled: isDraft } = await draftMode();
  if (isDraft && projectId) {
    // Client brouillon créé à la volée (au runtime, projectId présent).
    const draftClient = client.withConfig({
      perspective: 'previewDrafts',
      useCdn: false,
      token,
      stega: false,
    });
    return draftClient.fetch<T>(query, params, { next: { revalidate: 0 } });
  }
  return client.fetch<T>(query, params, { next: { revalidate: 60 } });
}
