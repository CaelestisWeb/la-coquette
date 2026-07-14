import Image from 'next/image';
import { getContent, getSettings } from '@/sanity/lib/vitrine';

export default async function Hero() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center overflow-hidden">
      <Image
        src="/hero-banner.jpg"
        alt="Bijou artisanal La Coquette"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[38%_50%]"
      />
      {/* Voiles pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir/55 via-noir/25 to-noir/60" />

      <div className="relative z-10 px-6 hero-rise">
        <Image
          src="/logo-wordmark-dark.svg"
          alt="La Coquette"
          width={527}
          height={130}
          priority
          unoptimized
          className="h-16 md:h-24 w-auto mx-auto"
        />
        <p className="mt-7 font-body text-[11px] md:text-xs tracking-[0.34em] uppercase text-blanc/85">
          Bijoux fait main, en {`Drôme`}
        </p>
        <p className="mt-6 font-body font-light text-base md:text-lg text-blanc/85 max-w-md mx-auto leading-relaxed">
          {content.heroText}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-creme text-noir font-body text-[11px] font-medium tracking-[0.18em] uppercase px-7 py-3.5 rounded hover:bg-blanc transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Suivre sur Instagram
          </a>
          <a
            href="#galerie"
            className="inline-flex items-center border border-creme/80 text-blanc font-body text-[11px] font-medium tracking-[0.18em] uppercase px-7 py-3.5 rounded hover:bg-creme hover:text-noir transition-colors"
          >
            Voir les créations
          </a>
        </div>
      </div>

      <div className="hero-rise-3 absolute bottom-7 left-1/2 -translate-x-1/2 z-10">
        <div className="scroll-hairline" aria-hidden />
      </div>
    </section>
  );
}
