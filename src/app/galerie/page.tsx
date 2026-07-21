import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getCollections, getSettings } from '@/sanity/lib/vitrine';

export const revalidate = 60;

export const metadata: Metadata = {
  title: "La galerie, boucles d'oreilles fait main",
  description:
    "Toute la galerie des boucles d'oreilles fait main de La Coquette : cabochons, créoles, bohème, cœur, étoile filante et martelée. Chaque pièce est unique.",
  alternates: { canonical: '/galerie' },
};

export default async function GaleriePage() {
  const [collections, settings] = await Promise.all([getCollections(), getSettings()]);
  const total = collections.reduce((n, c) => n + c.photos.length, 0);

  return (
    <div className="bg-creme">
      {/* En-tête éditorial : titre à gauche, propos décalé à droite */}
      <header className="border-b border-gris">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-32 sm:pt-44 pb-14 sm:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <h1 className="lg:col-span-6 font-display text-noir text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] tracking-[-0.02em]">
            La galerie
          </h1>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="font-body text-[15px] text-taupe leading-relaxed text-pretty">
              {total} pièces, faites main dans la Drôme. Chaque bijou est unique. Un modèle vous plaît ? Écrivez-moi sur
              Instagram, ou retrouvez-moi sur les marchés.
            </p>
            <nav aria-label="Collections" className="flex flex-wrap gap-x-5 gap-y-2 mt-7">
              {collections.map((c) => (
                <a
                  key={c.slug}
                  href={`#${c.slug}`}
                  className="font-body text-[12px] text-taupe hover:text-noir border-b border-transparent hover:border-noir pb-0.5 transition-colors"
                >
                  {c.nom}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Collections */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-20 sm:py-28 space-y-24 sm:space-y-32">
        {collections.map((c) => (
          <section key={c.slug} id={c.slug} className="scroll-mt-24">
            <div className="flex items-baseline justify-between gap-6 border-b border-gris pb-4 mb-8 sm:mb-10">
              <h2 className="font-display text-noir text-[clamp(1.7rem,3.2vw,2.5rem)] leading-none tracking-[-0.01em]">
                {c.nom}
              </h2>
              <span className="font-body text-[11px] tracking-[0.14em] uppercase text-taupe shrink-0">
                {c.photos.length} pièces
              </span>
            </div>
            {c.desc && (
              <p className="font-body text-[15px] text-taupe leading-relaxed max-w-md mb-9 sm:mb-11 text-pretty">
                {c.desc}
              </p>
            )}
            {/* La première photo occupe deux colonnes : la grille cesse d'être
                une répétition de vignettes identiques. */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {c.photos.map((src, i) => (
                <figure
                  key={src}
                  className={`group relative overflow-hidden bg-beige ${
                    i === 0 ? 'col-span-2 aspect-[8/5]' : 'aspect-[4/5]'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${c.nom} ${i + 1}, boucles d'oreilles fait main La Coquette`}
                    fill
                    sizes={i === 0 ? '(max-width: 640px) 92vw, 46vw' : '(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw'}
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                  />
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Appel à l'action */}
      <section className="bg-noir text-blanc py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <h2 className="lg:col-span-6 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.02] tracking-[-0.015em]">
            Une pièce vous a plu ?
          </h2>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="font-body text-[15px] text-blanc/70 leading-relaxed text-pretty">
              Les commandes se font sur Instagram, en message privé, ou de vive voix sur les marchés.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-8">
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-creme text-noir font-body text-[11px] font-medium tracking-[0.16em] uppercase px-8 py-4 hover:bg-blanc transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Écrire sur Instagram
              </a>
              <Link href="/" className="font-body text-[13px] text-blanc/70 hover:text-blanc border-b border-blanc/25 hover:border-blanc pb-0.5 transition-colors">
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
