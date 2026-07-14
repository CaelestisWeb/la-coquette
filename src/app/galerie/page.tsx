import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { COLLECTIONS, INSTAGRAM } from '@/components/vitrine/data';

export const metadata: Metadata = {
  title: "La galerie, boucles d'oreilles fait main",
  description:
    "Toute la galerie des boucles d'oreilles fait main de La Coquette : cabochons, créoles, bohème, cœur, étoile filante et martelée. Chaque pièce est unique.",
  alternates: { canonical: '/galerie' },
};

export default function GaleriePage() {
  const total = COLLECTIONS.reduce((n, c) => n + c.photos.length, 0);

  return (
    <div className="bg-creme">
      {/* En-tête de page */}
      <header className="px-6 pt-28 sm:pt-36 pb-14 sm:pb-16 text-center max-w-2xl mx-auto">
        <span className="font-body text-[11px] font-medium tracking-[0.3em] uppercase text-taupe">
          Les créations
        </span>
        <h1 className="font-display font-light text-4xl sm:text-6xl text-noir mt-4">La galerie</h1>
        <p className="font-body font-light text-sm sm:text-base text-taupe leading-relaxed mt-6">
          {total} pièces, faites main dans la Drôme. Chaque bijou est unique. Un modèle vous plaît ? Écrivez-moi sur
          Instagram, ou retrouvez-moi sur les marchés.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {COLLECTIONS.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="font-body text-[12px] tracking-wide text-noir border border-gris hover:border-noir rounded-full px-4 py-1.5 transition-colors"
            >
              {c.nom}
            </a>
          ))}
        </div>
      </header>

      {/* Collections */}
      <div className="max-w-6xl mx-auto px-6 pb-24 sm:pb-32 space-y-20 sm:space-y-28">
        {COLLECTIONS.map((c) => (
          <section key={c.slug} id={c.slug} className="scroll-mt-24">
            <div className="text-center max-w-lg mx-auto mb-9 sm:mb-11">
              <h2 className="font-display text-2xl sm:text-3xl text-noir">{c.nom}</h2>
              <p className="font-body font-light text-sm text-taupe leading-relaxed mt-2">{c.desc}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {c.photos.map((src, i) => (
                <figure key={src} className="group relative aspect-[3/4] overflow-hidden rounded-md bg-beige">
                  <Image
                    src={src}
                    alt={`${c.nom} ${i + 1}, boucles d'oreilles fait main La Coquette`}
                    fill
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Appel à l'action */}
      <section className="bg-noir text-blanc py-20 sm:py-24 text-center px-6">
        <h2 className="font-display font-light text-3xl sm:text-4xl">Une pièce vous a plu ?</h2>
        <p className="font-body font-light text-sm sm:text-base text-blanc/70 max-w-md mx-auto mt-5 leading-relaxed">
          Les commandes se font sur Instagram, en message privé, ou de vive voix sur les marchés.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blanc text-noir font-body text-[11px] font-medium tracking-[0.18em] uppercase px-8 py-4 rounded hover:bg-or hover:text-noir transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Écrire sur Instagram
          </a>
          <Link
            href="/"
            className="font-body text-[12px] tracking-[0.12em] uppercase text-blanc/70 hover:text-blanc transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </div>
  );
}
