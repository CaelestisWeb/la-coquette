import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getProductsByIds } from '@/sanity/lib/products';
import ProductCard from '@/components/ui/ProductCard';

export const metadata: Metadata = {
  title: 'Mes favoris',
  robots: { index: false, follow: false },
};

export default async function FavorisPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect('/connexion?next=/compte/favoris');

  const { data: rows } = await supabase
    .from('favorites')
    .select('product_id')
    .order('created_at', { ascending: false });

  const ids = (rows || []).map((r) => r.product_id as string);
  const products = await getProductsByIds(ids);

  return (
    <div className="pt-32 md:pt-44 pb-24 min-h-screen bg-ivoire">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-body text-xs text-taupe tracking-[0.15em] uppercase">Mon compte</p>
            <h1 className="font-display text-4xl sm:text-5xl text-noir mt-2">Mes favoris</h1>
          </div>
          <Link
            href="/compte"
            className="font-body text-xs tracking-[0.12em] uppercase text-taupe hover:text-noir transition-colors whitespace-nowrap"
          >
            ← Mon compte
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-body text-sm text-taupe">
              Tu n’as pas encore de favori. Explore la boutique et clique sur le cœur des bijoux que tu aimes.
            </p>
            <Link
              href="/boutique"
              className="inline-block mt-6 bg-noir text-blanc font-body text-xs tracking-[0.15em] uppercase px-8 py-3.5 rounded hover:bg-or transition-colors"
            >
              Voir la boutique
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
