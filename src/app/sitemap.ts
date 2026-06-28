import type { MetadataRoute } from 'next';
import { getProducts } from '@/sanity/lib/products';

const BASE = 'https://lacoquette-bycaro.fr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/boutique`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    // Pages légales : volontairement hors sitemap (noindex).
  ];

  const products = await getProducts();
  const productPages: MetadataRoute.Sitemap = products.map(p => ({
    url: `${BASE}/boutique/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
