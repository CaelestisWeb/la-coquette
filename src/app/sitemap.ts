import type { MetadataRoute } from 'next';

const BASE = 'https://lacoquette-bycaro.fr';

// Site vitrine une page : sitemap statique.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    // Pages légales volontairement hors sitemap (noindex).
  ];
}
