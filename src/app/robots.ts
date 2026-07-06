import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/commande-confirmee', '/gestion', '/studio', '/api/'],
    },
    sitemap: 'https://lacoquette-bycaro.fr/sitemap.xml',
  };
}
