import Image from 'next/image';
import { GALERIE, INSTAGRAM } from './data';

export default function Galerie() {
  return (
    <section id="galerie" className="bg-creme py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14 reveal">
          <span className="font-body text-[11px] font-medium tracking-[0.3em] uppercase text-taupe">Les créations</span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-noir mt-4">La galerie</h2>
          <p className="font-body font-light text-sm sm:text-base text-taupe leading-relaxed mt-5">
            Un aperçu de mes boucles d&apos;oreilles. Chaque pièce est unique. Pour commander, retrouvez-moi sur
            Instagram ou sur les marchés.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {GALERIE.map((b, i) => (
            <figure key={b.src} className={`group relative overflow-hidden rounded-md bg-beige reveal reveal-d${(i % 3) + 1}`}>
              <div className="relative aspect-[3/4]">
                <Image
                  src={b.src}
                  alt={b.nom}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-noir/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-body text-[11px] tracking-[0.12em] uppercase text-blanc">{b.nom}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="text-center mt-14 reveal">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-noir text-noir font-body text-[11px] font-medium tracking-[0.18em] uppercase px-8 py-3.5 rounded hover:bg-noir hover:text-blanc transition-colors"
          >
            Voir plus sur Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
