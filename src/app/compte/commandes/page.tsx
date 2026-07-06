import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Mes commandes',
  robots: { index: false, follow: false },
};

type OrderItem = { name: string; quantity: number; price: number; image?: string };
type Order = {
  id: string;
  reference: string | null;
  status: string;
  total: number;
  items: OrderItem[];
  created_at: string;
};

const eur = (n: number) => `${Number(n).toFixed(2)} €`;

export default async function CommandesPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect('/connexion?next=/compte/commandes');

  const { data: orders } = await supabase
    .from('orders')
    .select('id, reference, status, total, items, created_at')
    .order('created_at', { ascending: false });

  const list = (orders || []) as Order[];

  return (
    <div className="pt-32 md:pt-44 pb-24 min-h-screen bg-ivoire">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-body text-xs text-taupe tracking-[0.15em] uppercase">Mon compte</p>
            <h1 className="font-display text-4xl sm:text-5xl text-noir mt-2">Mes commandes</h1>
          </div>
          <Link
            href="/compte"
            className="font-body text-xs tracking-[0.12em] uppercase text-taupe hover:text-noir transition-colors whitespace-nowrap"
          >
            ← Mon compte
          </Link>
        </div>

        {list.length > 0 ? (
          <div className="space-y-5 mt-12">
            {list.map((o) => (
              <article key={o.id} className="bg-creme rounded-xl p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-4">
                  <div>
                    <p className="font-display text-lg text-noir">Commande {o.reference || ''}</p>
                    <p className="font-body text-xs text-taupe mt-0.5">
                      {new Date(o.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-body text-[10px] tracking-[0.1em] uppercase text-green-800 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
                      {o.status === 'paid' ? 'Payée' : o.status}
                    </span>
                    <p className="font-body text-sm text-noir mt-1.5">{eur(o.total)}</p>
                  </div>
                </div>

                <ul className="space-y-2.5 border-t border-gris/60 pt-4">
                  {(o.items || []).map((it, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {it.image
                        ? // eslint-disable-next-line @next/next/no-img-element
                          <img src={it.image} alt="" className="w-11 h-11 rounded-md object-cover border border-gris/60" />
                        : <span className="w-11 h-11 rounded-md bg-beige" />}
                      <span className="flex-1 min-w-0 font-body text-sm text-noir truncate">{it.name}</span>
                      <span className="font-body text-xs text-taupe">× {it.quantity}</span>
                      <span className="font-body text-sm text-noir w-20 text-right">{eur(it.price * it.quantity)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-body text-sm text-taupe">
              Tu n’as pas encore de commande. Les commandes passées en étant connectée apparaîtront ici.
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
