import type { MetadataRoute } from 'next';
import { products } from '@/data/products';

const BASE = 'https://lacoquette-bycaro.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/boutique`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/cgv`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/politique-confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map(p => ({
    url: `${BASE}/boutique/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
