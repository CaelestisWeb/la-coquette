import Link from 'next/link';
import type { Metadata } from 'next';
import { writeClient } from '@/sanity/lib/writeClient';
import { getProductsByIds } from '@/sanity/lib/products';
import ResumeCart from './ResumeCart';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Reprendre ma commande', robots: { index: false, follow: false } };

// Cible du bouton de l'email de relance : on remet dans le panier les pièces
// encore disponibles, puis on emmène la cliente au paiement.
export default async function ReprendrePage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;

  let ids: string[] = [];
  if (c) {
    const doc = await writeClient.getDocument(`porder-${c}`).catch(() => null);
    try {
      const order = JSON.parse((doc as { payload?: string } | null)?.payload || '{}');
      ids = (order.items || []).map((i: { id?: string }) => i.id).filter(Boolean);
    } catch {
      /* lien invalide ou expiré */
    }
  }

  const products = ids.length ? await getProductsByIds(ids) : [];
  const items = products
    .filter((p) => p.available !== false)
    .map((p) => ({ id: p.id, name: p.name, price: p.price, image: p.image }));

  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        {items.length > 0 ? (
          <ResumeCart items={items} />
        ) : (
          <>
            <h1 className="font-display text-3xl sm:text-4xl text-noir">Ces pièces sont parties</h1>
            <p className="font-body text-sm text-taupe mt-4 leading-relaxed">
              Les créations de votre panier ont trouvé preneuse. Chaque bijou étant une pièce unique, il ne revient
              pas. Découvrez les nouveautés dans la boutique.
            </p>
            <Link
              href="/boutique"
              className="inline-block mt-8 bg-noir text-blanc font-body text-xs tracking-[0.15em] uppercase px-8 py-3.5 rounded hover:bg-or transition-colors"
            >
              Voir la boutique
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
