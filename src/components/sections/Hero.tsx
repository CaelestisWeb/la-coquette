import { getHomeContent } from '@/sanity/lib/content';
import HeroVisual from './HeroVisual';

export default async function Hero() {
  const c = await getHomeContent();

  // Titre et mot doré sont deux champs distincts : on les passe tels quels
  // (marquage stega conservé → chacun reste cliquable dans l'aperçu).
  return (
    <HeroVisual
      title={c.heroTitle}
      highlight={c.heroHighlight}
      ctaPrimary={c.heroCtaPrimary}
      ctaSecondary={c.heroCtaSecondary}
      imageUrl={c.heroImageUrl}
    />
  );
}
