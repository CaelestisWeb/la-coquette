import Image from 'next/image';
import Button from '@/components/ui/Button';

const STAR_PATH = 'M8,1.5 L9.5,5.9 L14.2,6 L10.5,8.8 L11.8,13.3 L8,10.6 L4.2,13.3 L5.5,8.8 L1.8,6 L6.5,5.9Z';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">

      {/* Image de fond plein écran */}
      <Image
        src="/hero-banner.jpg"
        alt="Bijou artisanal La Coquette — créole dorée sur pierre"
        fill
        priority
        className="object-cover object-[38%_50%]"
        sizes="100vw"
      />

      {/* Voile dégradé gauche → droite pour la lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-r from-noir/80 via-noir/45 to-noir/0 pointer-events-none" />
      {/* Voile bas → haut léger */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir/50 via-transparent to-noir/20 pointer-events-none" />

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="max-w-xl">

          {/* Eyebrow */}
          <p className="font-body text-[10px] font-medium tracking-[0.34em] uppercase text-blanc/65">
            Bijoux artisanaux · Drôme
          </p>

          {/* Titre */}
          <h1 className="font-display font-light text-5xl sm:text-6xl lg:text-[5.5rem] text-blanc mt-6 leading-[1.02]">
            Des bijoux pensés<br />
            pour révéler<br />
            votre <span className="text-blanc/70">élégance</span>
          </h1>

          {/* Sous-titre */}
          <p className="font-body font-light text-sm sm:text-base text-blanc/65 leading-relaxed mt-7 max-w-sm">
            Créés avec passion par Caroline, chaque bijou La Coquette est façonné en acier inoxydable de qualité, pour vous accompagner avec grâce au quotidien.
          </p>

          {/* CTA — variantes adaptées au fond sombre */}
          <div className="flex flex-wrap gap-3 mt-10">
            <Button href="/boutique" variant="primary" size="lg" className="!bg-blanc !text-noir hover:!bg-gris">
              Découvrir la boutique
            </Button>
            <Button href="/contact" variant="secondary" size="lg" className="!border-blanc/40 !text-blanc hover:!border-blanc hover:!text-blanc">
              Prendre contact
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-stretch gap-5 sm:gap-8 mt-12 pt-8 border-t border-blanc/20">
            <div>
              <p className="font-display text-3xl text-blanc leading-none">10+</p>
              <p className="font-body text-[10px] text-blanc/55 tracking-[0.15em] uppercase mt-2">Créations</p>
            </div>
            <div className="w-px bg-blanc/20" aria-hidden />
            <div>
              <p className="font-display text-3xl text-blanc leading-none">100%</p>
              <p className="font-body text-[10px] text-blanc/55 tracking-[0.15em] uppercase mt-2">Acier inox.</p>
            </div>
            <div className="w-px bg-blanc/20" aria-hidden />
            <div>
              <div className="flex items-center gap-[3px] h-[1.875rem]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d={STAR_PATH} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.9" strokeLinejoin="round" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-[10px] text-blanc/55 tracking-[0.15em] uppercase mt-2">Avis clients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-px h-10 bg-blanc/30 animate-pulse" />
      </div>
    </section>
  );
}
