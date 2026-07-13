import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boutique bientôt disponible',
  description: 'La boutique en ligne La Coquette, bijoux artisanaux en acier inoxydable doré, arrive très bientôt.',
  robots: { index: false, follow: false },
};

export default function BientotPage() {
  return (
    <div className="min-h-screen bg-ivoire flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-wordmark.svg" alt="La Coquette" className="h-16 md:h-20 w-auto mx-auto mb-10" />

        <p className="font-body text-[11px] tracking-[0.28em] uppercase text-dore-mat mb-6">
          Bijoux artisanaux · Drôme
        </p>

        <h1 className="font-display text-4xl md:text-5xl text-noir leading-[1.15] mb-6">
          Notre boutique arrive<br />très bientôt
        </h1>

        <p className="font-body text-sm text-taupe leading-relaxed mb-10 max-w-md mx-auto">
          Des créations fait main en acier inoxydable doré, pensées pour révéler votre élégance
          au quotidien. La boutique en ligne ouvre ses portes très prochainement.
        </p>

        <div className="inline-flex flex-col items-center gap-3">
          <a href="mailto:contact@lacoquette-bycaro.fr"
            className="font-body text-sm text-noir border-b border-dore pb-0.5 hover:text-dore-mat transition-colors">
            contact@lacoquette-bycaro.fr
          </a>
          <a href="https://www.instagram.com/lacoquette_bycaro/" target="_blank" rel="noopener noreferrer"
            className="font-body text-xs tracking-widest uppercase text-taupe hover:text-noir transition-colors">
            @lacoquette_bycaro
          </a>
        </div>
      </div>
    </div>
  );
}
