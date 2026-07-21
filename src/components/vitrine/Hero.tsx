import Image from 'next/image';
import Link from 'next/link';
import { getContent, getSettings } from '@/sanity/lib/vitrine';

export default async function Hero() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);

  return (
    <section className="relative bg-ivoire">
      {/* Composition asymétrique 5/7 : le texte respire à gauche, la photo
          part à fond perdu à droite. Aucun voile, aucun dégradé : la photo
          n'a pas besoin d'être assombrie puisque le texte est à côté. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[92vh]">
        {/* Texte, calé en bas : la tension éditoriale vient de ce décalage */}
        <div className="lg:col-span-5 flex flex-col justify-end order-2 lg:order-1 px-6 sm:px-10 lg:pl-[6vw] lg:pr-12 pt-14 pb-16 lg:pt-40 lg:pb-24">
          <p className="font-body text-[11px] font-medium tracking-[0.28em] uppercase text-taupe">
            Atelier de bijoux, {settings.zone}
          </p>

          <h1 className="font-display text-noir mt-7 text-[clamp(2.7rem,5.6vw,4.75rem)] leading-[0.98] tracking-[-0.018em] text-balance">
            Le bijou fait main,
            <br />une paire à la fois.
          </h1>

          <p className="font-body text-[15px] sm:text-base text-taupe leading-relaxed mt-7 max-w-sm text-pretty">
            {content.heroText}
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/galerie"
              className="inline-flex items-center gap-2.5 bg-noir text-blanc font-body text-[11px] font-medium tracking-[0.16em] uppercase px-8 py-4 hover:bg-taupe transition-colors duration-300"
            >
              Voir la galerie
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-body text-[13px] text-noir inline-flex items-center gap-2"
            >
              <span className="border-b border-noir/25 group-hover:border-noir transition-colors pb-0.5">
                {settings.instaHandle}
              </span>
            </a>
          </div>
        </div>

        {/* Photo à fond perdu, sans arrondi ni voile */}
        <div className="lg:col-span-7 relative order-1 lg:order-2 min-h-[56vh] sm:min-h-[64vh] lg:min-h-full">
          <Image
            src="/hero-banner.jpg"
            alt="Boucles d'oreilles fait main de La Coquette"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-[38%_50%]"
          />
        </div>
      </div>
    </section>
  );
}
