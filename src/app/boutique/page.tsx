import { getProducts, getSoldProducts, getCollections } from '@/sanity/lib/products';
import { getBoutiqueContent } from '@/sanity/lib/content';
import ProductCard from '@/components/ui/ProductCard';
import BoutiqueBrowser, { type BoutiqueCard } from './BoutiqueBrowser';
import Link from 'next/link';
import type { Metadata } from 'next';

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export const metadata: Metadata = {
  title: 'Boutique',
  description: 'Découvrez toutes nos créations : boucles d\'oreilles artisanales en acier inoxydable doré, élégantes et durables.',
};

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;

  const [products, sold, collections, { heading, intro }] = await Promise.all([
    getProducts(),
    getSoldProducts(),
    getCollections(),
    getBoutiqueContent(),
  ]);

  // Filtre actif : slug de collection valide, sinon « tout ».
  const active = collections.some((col) => col.slug === c) ? c : undefined;
  const byCollection = (list: typeof products) =>
    active ? list.filter((p) => p.collection?.slug === active) : list;
  const filtered = byCollection(products);
  const filteredSold = byCollection(sold);

  // Cartes pré-rendues côté serveur (non ré-hydratées) + métadonnées légères
  // pour la recherche/tri client. On garde ainsi la grille en composant serveur.
  const cards: BoutiqueCard[] = filtered.map((product, i) => ({
    id: product.id,
    price: product.price,
    search: norm(`${product.name} ${product.collection?.name ?? ''}`),
    node: <ProductCard key={product.id} product={product} priority={i < 4} />,
  }));

  const tab = 'font-body text-xs sm:text-[13px] tracking-[0.12em] uppercase pb-1.5 border-b transition-colors';

  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      {/* En-tête */}
      <div className="bg-rose py-24 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-noir">
          {heading}
        </h1>
        <p className="font-body text-sm text-taupe mt-4 max-w-md mx-auto leading-relaxed">
          {intro}
        </p>
      </div>

      {/* Filtres par collection */}
      {collections.length > 0 && (
        <nav
          aria-label="Collections"
          className="max-w-7xl mx-auto px-6 pt-10 flex flex-wrap justify-center gap-x-7 gap-y-3"
        >
          <Link
            href="/boutique"
            aria-current={!active ? 'page' : undefined}
            className={`${tab} ${!active ? 'text-noir border-noir' : 'text-taupe border-transparent hover:text-noir'}`}
          >
            Tout
          </Link>
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/boutique?c=${col.slug}`}
              aria-current={active === col.slug ? 'page' : undefined}
              className={`${tab} ${active === col.slug ? 'text-noir border-noir' : 'text-taupe border-transparent hover:text-noir'}`}
            >
              {col.name}
            </Link>
          ))}
        </nav>
      )}

      {/* Grille produits : recherche + tri (cartes rendues côté serveur) */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-24">
        {filtered.length > 0 ? (
          <BoutiqueBrowser cards={cards} />
        ) : filteredSold.length === 0 ? (
          <p className="font-body text-sm text-taupe text-center py-16">
            Aucune création dans cette collection pour le moment.
          </p>
        ) : null}

        {/* Déjà adoptées : pièces uniques vendues, en dernière position */}
        {filteredSold.length > 0 && (
          <section className="mt-20 pt-14 border-t border-gris/60">
            <div className="text-center mb-10 max-w-lg mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl text-noir">Déjà adoptées</h2>
              <p className="font-body text-sm text-taupe mt-3 leading-relaxed">
                Ces pièces uniques ont trouvé preneuse. Un modèle vous plaît ?{' '}
                <Link href="/contact" className="text-noir underline underline-offset-4 hover:text-or transition-colors">
                  Caro peut en créer une dans le même esprit
                </Link>
                .
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredSold.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
