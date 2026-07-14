import Image from 'next/image';
import Link from 'next/link';
import { getCollections, getContent } from '@/sanity/lib/vitrine';

export default async function Galerie() {
  const [collections, content] = await Promise.all([getCollections(), getContent()]);

  return (
    <section id="galerie" className="bg-creme py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16 reveal">
          <span className="font-body text-[11px] font-medium tracking-[0.3em] uppercase text-taupe">Les créations</span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-noir mt-4">La galerie</h2>
          <p className="font-body font-light text-sm sm:text-base text-taupe leading-relaxed mt-5">
            {content.galerieIntro}
          </p>
        </div>

        {/* Une couverture par collection : les familles en un coup d'œil */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              href={`/galerie#${c.slug}`}
              className={`group block reveal ${i > 0 ? `reveal-d${Math.min(i, 3)}` : ''}`}
            >
              <figure className="relative aspect-[3/4] overflow-hidden rounded-md bg-beige">
                <Image
                  src={c.photos[0]}
                  alt={`${c.nom}, boucles d'oreilles fait main La Coquette`}
                  fill
                  sizes="(max-width: 768px) 46vw, 30vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noir/55 to-transparent px-4 pb-3 pt-10">
                  <span className="font-display text-lg sm:text-xl text-blanc">{c.nom}</span>
                </span>
              </figure>
            </Link>
          ))}
        </div>

        <div className="text-center mt-14 sm:mt-16 reveal">
          <Link
            href="/galerie"
            className="inline-flex items-center gap-2 bg-noir text-blanc font-body text-[11px] font-medium tracking-[0.18em] uppercase px-9 py-4 rounded hover:bg-or transition-colors"
          >
            Voir toute la galerie
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <p className="font-body font-light text-[13px] text-taupe mt-5">
            Les créations sont renouvelées au fil des saisons.
          </p>
        </div>
      </div>
    </section>
  );
}
