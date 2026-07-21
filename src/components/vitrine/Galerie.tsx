import Image from 'next/image';
import Link from 'next/link';
import { getCollections, getContent } from '@/sanity/lib/vitrine';

export default async function Galerie() {
  const [collections, content] = await Promise.all([getCollections(), getContent()]);

  return (
    <section id="galerie" className="bg-creme border-t border-gris py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Titre à gauche, intro décalée à droite : pas de bloc centré */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-end mb-16 sm:mb-20 reveal">
          <h2 className="lg:col-span-6 font-display text-noir text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.02] tracking-[-0.015em]">
            Les collections
          </h2>
          <p className="lg:col-span-5 lg:col-start-8 font-body text-[15px] text-taupe leading-relaxed text-pretty">
            {content.galerieIntro}
          </p>
        </div>

        {/* Couvertures : la colonne du milieu descend, ce décalage casse la
            grille uniforme et donne un rythme de mise en page éditoriale. */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-14">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              href={`/galerie#${c.slug}`}
              className={`group block reveal ${i % 3 === 1 ? 'md:mt-16' : ''} ${i > 0 ? `reveal-d${Math.min(i, 3)}` : ''}`}
            >
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden bg-beige">
                  <Image
                    src={c.photos[0]}
                    alt={`${c.nom}, boucles d'oreilles fait main La Coquette`}
                    fill
                    sizes="(max-width: 768px) 46vw, 30vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-3 border-t border-gris pt-3">
                  <span className="font-display text-xl sm:text-2xl text-noir leading-none">{c.nom}</span>
                  <span className="font-body text-[11px] tracking-[0.14em] uppercase text-taupe shrink-0">
                    {c.photos.length} pièces
                  </span>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>

        <div className="mt-20 sm:mt-24 flex justify-center reveal">
          <Link
            href="/galerie"
            className="inline-flex items-center gap-2.5 bg-noir text-blanc font-body text-[11px] font-medium tracking-[0.16em] uppercase px-9 py-4 hover:bg-taupe transition-colors duration-300"
          >
            Voir toute la galerie
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
