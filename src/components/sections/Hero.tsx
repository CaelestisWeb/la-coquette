import { stegaClean } from 'next-sanity';
import { getHomeContent } from '@/sanity/lib/content';
import HeroVisual from './HeroVisual';

export default async function Hero() {
  const c = await getHomeContent();

  // Découpe le titre autour du mot mis en valeur (affiché en doré).
  // On retire le marquage stega de l'aperçu, sinon indexOf/slice échouent.
  const title = stegaClean(c.heroTitle);
  const hl = stegaClean(c.heroHighlight).trim();
  const idx = hl ? title.indexOf(hl) : -1;
  const before = idx >= 0 ? title.slice(0, idx) : title;
  const after = idx >= 0 ? title.slice(idx + hl.length) : '';

  return (
    <HeroVisual
      before={before}
      hl={idx >= 0 ? hl : ''}
      after={after}
      ctaPrimary={c.heroCtaPrimary}
      ctaSecondary={c.heroCtaSecondary}
      imageUrl={c.heroImageUrl}
    />
  );
}
