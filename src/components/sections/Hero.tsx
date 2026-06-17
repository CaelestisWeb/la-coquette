import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-end">

      {/* Image de fond — légèrement assombrie */}
      <Image
        src="/hero-banner.jpg"
        alt="Bijou artisanal La Coquette — créole dorée sur pierre"
        fill
        priority
        className="object-cover object-[38%_50%] opacity-80"
        sizes="100vw"
      />

      {/* Voile haut → bas : couvre la nav */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir/60 via-noir/10 to-transparent pointer-events-none z-10" />
      {/* Voile bas → haut : zone de texte */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir/75 via-noir/30 to-transparent pointer-events-none z-10" />

      {/* Contenu — centré, vers le bas */}
      <div className="relative z-20 w-full text-center px-6 pb-24 sm:pb-28">

        <h1 className="font-display font-light text-[2.55rem] sm:text-[3.5rem] lg:text-[5.25rem] text-blanc leading-[1.05]">
          Des bijoux pensés<br />
          pour révéler votre <span className="text-blanc/65">élégance</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mt-9">
          <Button href="/boutique" variant="primary" size="lg" className="!bg-blanc !text-noir hover:!bg-gris">
            Découvrir la boutique
          </Button>
          <Button href="/contact" variant="secondary" size="lg" className="!border-blanc/40 !text-blanc hover:!border-blanc">
            Prendre contact
          </Button>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
        <div className="w-px h-9 bg-blanc/35 animate-pulse" />
      </div>
    </section>
  );
}
