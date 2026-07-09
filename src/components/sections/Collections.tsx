import Link from 'next/link';
import Image from 'next/image';
import { getCollections, getProducts } from '@/sanity/lib/products';

// Section « Nos collections » : une tuile par collection, avec un bijou
// représentatif (le premier de la collection). Classées par ordre alphabétique.
// Cliquer sur une tuile ouvre la boutique filtrée sur cette collection.
export default async function Collections() {
  const [collections, products] = await Promise.all([getCollections(), getProducts()]);

  const tiles = collections
    .map((col) => {
      const rep = products.find((p) => p.collection?.slug === col.slug);
      return rep
        ? { name: col.name, slug: col.slug, image: rep.image, blur: rep.blurDataURL }
        : null;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null)
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));

  if (tiles.length === 0) return null;

  return (
    <section className="bg-creme py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16 reveal">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-noir">Nos collections</h2>
          <p className="font-body font-light text-sm sm:text-base text-taupe leading-relaxed max-w-xl mx-auto mt-5">
            Chaque style a son univers. Choisissez le vôtre.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {tiles.map((t) => (
            <Link
              key={t.slug}
              href={`/boutique?c=${t.slug}`}
              aria-label={`Voir la collection ${t.name}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-md bg-beige reveal"
            >
              <Image
                src={t.image}
                alt={`Collection ${t.name}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                placeholder={t.blur ? 'blur' : 'empty'}
                blurDataURL={t.blur}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Voile bas pour la lisibilité du nom */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-center">
                <h3 className="font-display text-xl sm:text-2xl lg:text-[26px] text-blanc leading-tight">
                  {t.name}
                </h3>
                <span className="mt-2 inline-block font-body text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-blanc/75 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Découvrir
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
