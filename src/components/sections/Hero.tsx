import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionLabel from '@/components/ui/SectionLabel';

const STAR_PATH = 'M8,1.5 L9.5,5.9 L14.2,6 L10.5,8.8 L11.8,13.3 L8,10.6 L4.2,13.3 L5.5,8.8 L1.8,6 L6.5,5.9Z';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-ivoire pt-20 flex items-center overflow-hidden">
      {/* Halo chaud très diffus en fond */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose opacity-30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center py-12 lg:py-20">

        {/* Texte */}
        <div className="animate-fadein">
          <SectionLabel>Bijoux artisanaux · Drôme</SectionLabel>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-[5.25rem] text-noir mt-7 leading-[1.04]">
            Des bijoux pensés
            <br className="max-lg:hidden" />
            {' '}pour révéler votre{' '}
            <em className="italic font-light text-or">élégance</em>
          </h1>

          <p className="font-body text-sm sm:text-base text-taupe leading-relaxed mt-7 max-w-md">
            Créés avec passion par Caroline, chaque bijou La Coquette est façonné en acier inoxydable de qualité, pour vous accompagner du matin au soir avec grâce et confiance.
          </p>

          {/* Stats */}
          <div className="flex items-stretch gap-5 sm:gap-8 mt-9 pt-9 border-t border-gris">
            <div>
              <p className="font-display text-3xl text-noir leading-none">10+</p>
              <p className="font-body text-[10px] text-taupe tracking-[0.15em] uppercase mt-2">Créations</p>
            </div>
            <div className="w-px bg-gris" aria-hidden />
            <div>
              <p className="font-display text-3xl text-noir leading-none">100%</p>
              <p className="font-body text-[10px] text-taupe tracking-[0.15em] uppercase mt-2">Acier inox.</p>
            </div>
            <div className="w-px bg-gris" aria-hidden />
            <div>
              <div className="flex items-center gap-[3px] h-[1.875rem]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d={STAR_PATH} fill="#C69C3D" stroke="#C69C3D" strokeWidth="0.9" strokeLinejoin="round" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-[10px] text-taupe tracking-[0.15em] uppercase mt-2">Avis clients</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 mt-9">
            <Button href="/boutique" variant="primary" size="lg">Découvrir la boutique</Button>
            <Button href="/contact" variant="secondary" size="lg">Prendre contact</Button>
          </div>
        </div>

        {/* Image — cadre épuré, filet doré fin */}
        <div className="relative mx-auto lg:ml-auto w-full max-w-[300px] sm:max-w-sm lg:max-w-md p-3 sm:p-4">
          {/* Filet doré encadrant, décalé */}
          <div className="absolute inset-0 border border-or/30 translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 pointer-events-none" />

          <div className="relative z-10 aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/boucles-placeholder.jpg"
              alt="Boucles d'oreilles artisanales La Coquette"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 40vw"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-blanc/95 backdrop-blur-sm px-4 py-2.5 sm:px-5 sm:py-3">
              <p className="font-body text-[9px] tracking-[0.25em] uppercase text-taupe">Livraison offerte</p>
              <p className="font-display italic text-lg sm:text-xl text-noir">dès 50 €</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
