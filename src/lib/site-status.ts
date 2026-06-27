import { apiVersion, dataset, projectId } from '@/sanity/env';

// État « boutique bientôt disponible » : piloté directement depuis le Studio
// (document « Réglages du site », champ comingSoon). Le middleware lit cette
// valeur ; on la met en cache quelques secondes en mémoire pour ne pas
// interroger Sanity à chaque requête.

const TTL_MS = 15_000;
let cache: { value: boolean; at: number } | null = null;

const QUERY = '*[_type == "siteSettings"][0].comingSoon';

async function readFromSanity(): Promise<boolean> {
  if (!projectId) throw new Error('Sanity non configuré');
  const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;
  const url =
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}` +
    `?query=${encodeURIComponent(QUERY)}`;
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  const json = (await res.json()) as { result?: unknown };
  return json.result === true;
}

/**
 * Mode « boutique bientôt disponible » actif ?
 * Source : le champ comingSoon des Réglages du site (Studio).
 * En cas d'erreur de lecture, repli sur la variable d'env COMING_SOON
 * (sinon site en ligne par défaut).
 */
export async function getComingSoon(): Promise<boolean> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.value;
  try {
    const value = await readFromSanity();
    cache = { value, at: Date.now() };
    return value;
  } catch {
    return process.env.COMING_SOON === 'true';
  }
}
