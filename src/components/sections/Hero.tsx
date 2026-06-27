import { getHomeContent } from '@/sanity/lib/content';
import HeroVisual from './HeroVisual';

export default async function Hero() {
  const c = await getHomeContent();

  // Découpe le titre autour du mot mis en valeur (affiché en doré).
  const hl = c.heroHighlight.trim();
  const idx = hl ? c.heroTitle.indexOf(hl) : -1;
  const before = idx >= 0 ? c.heroTitle.slice(0, idx) : c.heroTitle;
  const after = idx >= 0 ? c.heroTitle.slice(idx + hl.length) : '';

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
