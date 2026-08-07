import Image from 'next/image';
import Link from 'next/link';
import { getContent, getSettings } from '@/sanity/lib/vitrine';

export default async function Hero() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);

  // Mini-galerie : 4 paires de collections et couleurs différentes, pour
  // qu'au moins une accroche l'œil dès le premier écran. La 1re case est la
  // photo choisie par Caro dans le Studio (repli : créoles papillon).
  const tuiles = [
    { src: content.heroImage, alt: 'Créoles papillon bleu nuit et or, fait main par Caro' },
    { src: '/galerie/cabochon-2.jpg', alt: 'Cabochons corail et or, boucles fait main La Coquette' },
    { src: '/galerie/boheme-2.jpg', alt: 'Bohème verte, cascades de chaînes et perles fait main' },
    { src: '/galerie/coeur-2.jpg', alt: 'Cœurs rose fuchsia, boucles fait main La Coquette' },
  ];

  return (
    <section className="bg-ivoire">
      {/* Contenu dans la largeur du site (marges des deux côtés), deux colonnes
          centrées verticalement : une première section équilibrée, pas un bloc
          plein écran. */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texte */}
          <div>
            <p className="font-body text-[11px] font-medium tracking-[0.28em] uppercase text-taupe">
              Atelier de bijoux, {settings.zone}
            </p>

            <h1 className="font-display text-noir mt-6 text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.0] tracking-[-0.018em] text-balance">
              Le bijou fait main,
              <br />une paire à la fois.
            </h1>

            <p className="font-body text-[15px] sm:text-base text-taupe leading-relaxed mt-6 max-w-sm text-pretty">
              {content.heroText}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
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
                className="inline-flex items-center gap-2.5 border border-noir text-noir font-body text-[11px] font-medium tracking-[0.16em] uppercase px-8 py-4 hover:bg-noir hover:text-blanc transition-colors duration-300"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                {settings.instaHandle}
              </a>
            </div>
          </div>

          {/* Mini-galerie 2x2 : tuiles au format portrait, proche du ratio des
              photos, pour un cadrage propre sans déformation. */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {tuiles.map((t) => (
              <div key={t.src} className="relative aspect-[4/5] overflow-hidden bg-beige">
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 46vw, 25vw"
                  className="object-cover object-[50%_38%]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
