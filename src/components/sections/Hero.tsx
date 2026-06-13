import Image from 'next/image';
import Button from '@/components/ui/Button';

const STAR_PATH = 'M8,1.5 L9.5,5.9 L14.2,6 L10.5,8.8 L11.8,13.3 L8,10.6 L4.2,13.3 L5.5,8.8 L1.8,6 L6.5,5.9Z';

export default function Hero() {
  return (
    <section className="min-h-screen bg-ivoire pt-20 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center py-10 lg:py-16">

        {/* Texte */}
        <div className="animate-fadein">
          <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-or">
            Bijoux artisanaux · Drôme
          </span>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl text-noir mt-4 leading-[1.12] lg:leading-[1.08]">
            Des bijoux pensés
            <br className="max-lg:hidden" />
            {' '}pour révéler votre{' '}
            <span className="text-or">élégance</span>
          </h1>

          <p className="font-body text-sm sm:text-base text-taupe leading-relaxed mt-5 max-w-md">
            Créés avec passion par Caroline, chaque bijou La Coquette est façonné en acier inoxydable de qualité, pour vous accompagner du matin au soir avec grâce et confiance.
          </p>

          {/* Stats */}
          <div className="flex gap-6 sm:gap-10 mt-7 pt-7 border-t border-gris">
            <div>
              <p className="font-display text-2xl text-noir">30+</p>
              <p className="font-body text-[10px] text-taupe tracking-wider uppercase mt-1">Créations</p>
            </div>
            <div>
              <p className="font-display text-2xl text-noir">100%</p>
              <p className="font-body text-[10px] text-taupe tracking-wider uppercase mt-1">Acier inox.</p>
            </div>
            <div>
              <div className="flex items-center gap-[3px] h-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 16 16" fill="none">
                    <path d={STAR_PATH} fill="none" stroke="#C69C3D" strokeWidth="0.9" strokeLinejoin="round" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-[10px] text-taupe tracking-wider uppercase mt-1">Avis clients</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Button href="/boutique" variant="primary" size="lg">Découvrir la boutique</Button>
            <Button href="/contact" variant="secondary" size="lg">Prendre contact</Button>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-rose opacity-50 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-gris opacity-40 blur-2xl pointer-events-none" />

          <div className="relative z-10 aspect-[4/5] w-full max-w-[260px] sm:max-w-sm mx-auto lg:max-w-md lg:ml-auto overflow-hidden">
            <Image
              src="https://picsum.photos/seed/hero-lacoquette/600/750"
              alt="Bijoux La Coquette"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 40vw"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-blanc px-4 py-2 sm:px-5 sm:py-3 shadow-lg">
              <p className="font-body text-[9px] tracking-[0.2em] uppercase text-taupe">Livraison offerte</p>
              <p className="font-display text-sm sm:text-base text-noir">dès 60 €</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
