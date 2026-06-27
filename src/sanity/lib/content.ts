import { client } from './client';

const OPTS = { next: { revalidate: 60 } } as const;

export type HomeContent = {
  heroTitle: string;
  heroHighlight: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
};

// Valeurs de repli = le contenu actuel. Le site reste identique même si le
// document n'existe pas encore dans Sanity.
const DEFAULTS: HomeContent = {
  heroTitle: 'Des bijoux pensés\npour révéler votre élégance',
  heroHighlight: 'élégance',
  heroCtaPrimary: 'Découvrir la boutique',
  heroCtaSecondary: 'Prendre contact',
};

export async function getHomeContent(): Promise<HomeContent> {
  let d: Partial<HomeContent> | null = null;
  try {
    d = await client.fetch(
      `*[_type == "homePage"][0]{ heroTitle, heroHighlight, heroCtaPrimary, heroCtaSecondary }`,
      {},
      OPTS,
    );
  } catch {
    // en cas d'erreur, on garde les valeurs par défaut
  }
  return {
    heroTitle: d?.heroTitle || DEFAULTS.heroTitle,
    heroHighlight: d?.heroHighlight ?? DEFAULTS.heroHighlight,
    heroCtaPrimary: d?.heroCtaPrimary || DEFAULTS.heroCtaPrimary,
    heroCtaSecondary: d?.heroCtaSecondary || DEFAULTS.heroCtaSecondary,
  };
}
