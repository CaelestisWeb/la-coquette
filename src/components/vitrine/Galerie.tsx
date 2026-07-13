import Image from 'next/image';
import { COLLECTIONS, INSTAGRAM } from './data';

export default function Galerie() {
  return (
    <section id="galerie" className="bg-creme py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20 reveal">
          <span className="font-body text-[11px] font-medium tracking-[0.3em] uppercase text-taupe">Les créations</span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-noir mt-4">La galerie</h2>
          <p className="font-body font-light text-sm sm:text-base text-taupe leading-relaxed mt-5">
            Un aperçu de chaque collection. Chaque bijou est une pièce unique. Pour commander, retrouvez-moi sur
            Instagram ou sur les marchés.
          </p>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {COLLECTIONS.map((c) => (
            <div key={c.nom} className="reveal">
              <div className="text-center mb-8 max-w-lg mx-auto">
                <h3 className="font-display text-2xl sm:text-3xl text-noir">{c.nom}</h3>
                <p className="font-body font-light text-sm text-taupe leading-relaxed mt-2">{c.desc}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
                {c.photos.map((src) => (
                  <figure key={src} className="group relative overflow-hidden rounded-md bg-beige w-[46%] sm:w-[30%] max-w-[260px]">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={src}
                        alt={`${c.nom}, boucles d'oreilles fait main La Coquette`}
                        fill
                        sizes="(max-width: 640px) 46vw, 260px"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 sm:mt-20 reveal">
          <p className="font-body font-light text-sm text-taupe mb-6">Et bien d&apos;autres, renouvelées au fil des saisons.</p>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-noir text-noir font-body text-[11px] font-medium tracking-[0.18em] uppercase px-8 py-3.5 rounded hover:bg-noir hover:text-blanc transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Voir toute la collection sur Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
