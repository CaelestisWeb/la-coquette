import 'server-only';
import { cache } from 'react';
import { client } from './client';
import { urlForImage } from './image';
import { sanityConfigured } from '../env';
import {
  SETTINGS_DEFAULTS,
  CONTENT_DEFAULTS,
  COLLECTIONS,
  type SiteSettings,
  type VitrineContent,
  type Collection,
} from '@/components/vitrine/data';

// Le contenu Sanity n'est lu que si le projet est configuré ET qu'un token de
// lecture est présent (le dataset ne répond pas en anonyme). Sinon, et à la
// moindre erreur, on renvoie le contenu de repli : le site ne casse jamais.
const hasToken = !!(process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN);
const enabled = sanityConfigured && hasToken;

export const getSettings = cache(async (): Promise<SiteSettings> => {
  if (!enabled) return SETTINGS_DEFAULTS;
  try {
    const d = await client.fetch(
      `*[_type=="siteSettings"][0]{instagramUrl, instaHandle, zone, footerTagline}`,
    );
    if (!d) return SETTINGS_DEFAULTS;
    return {
      instagram: d.instagramUrl || SETTINGS_DEFAULTS.instagram,
      instaHandle: d.instaHandle || SETTINGS_DEFAULTS.instaHandle,
      zone: d.zone || SETTINGS_DEFAULTS.zone,
      footerTagline: d.footerTagline || SETTINGS_DEFAULTS.footerTagline,
    };
  } catch {
    return SETTINGS_DEFAULTS;
  }
});

export const getContent = cache(async (): Promise<VitrineContent> => {
  if (!enabled) return CONTENT_DEFAULTS;
  try {
    const d = await client.fetch(
      `*[_type=="vitrineContent"][0]{heroText, galerieIntro, atelierText, surMesureText, ouAcheterText}`,
    );
    if (!d) return CONTENT_DEFAULTS;
    return {
      heroText: d.heroText || CONTENT_DEFAULTS.heroText,
      galerieIntro: d.galerieIntro || CONTENT_DEFAULTS.galerieIntro,
      atelierText: d.atelierText || CONTENT_DEFAULTS.atelierText,
      surMesureText: d.surMesureText || CONTENT_DEFAULTS.surMesureText,
      ouAcheterText: d.ouAcheterText || CONTENT_DEFAULTS.ouAcheterText,
    };
  } catch {
    return CONTENT_DEFAULTS;
  }
});

type SanityPhoto = { asset?: unknown };
type SanityCollection = { nom: string; slug: string; description?: string; photos?: SanityPhoto[] };

export const getCollections = cache(async (): Promise<Collection[]> => {
  if (!enabled) return COLLECTIONS;
  try {
    const rows: SanityCollection[] = await client.fetch(
      `*[_type=="collection" && count(photos) > 0]|order(ordre asc){nom, "slug":slug.current, description, photos}`,
    );
    if (!rows || rows.length === 0) return COLLECTIONS;
    const mapped = rows
      .map((r) => ({
        nom: r.nom,
        slug: r.slug,
        desc: r.description || '',
        photos: (r.photos || [])
          .filter((p) => p?.asset)
          // URL Sanity SANS transformation (pas de query) : c'est next/image qui
          // redimensionne et convertit en webp/avif. Les photos sont déjà en 3:4.
          .map((p) => urlForImage(p as never).url()),
      }))
      .filter((c) => c.nom && c.slug && c.photos.length > 0);
    return mapped.length > 0 ? mapped : COLLECTIONS;
  } catch {
    return COLLECTIONS;
  }
});
