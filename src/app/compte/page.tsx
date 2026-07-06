import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AccountActions from './AccountActions';

export const metadata: Metadata = {
  title: 'Mon compte',
  robots: { index: false, follow: false },
};

export default async function ComptePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect('/connexion?next=/compte');

  const user = data.user;
  const prenom =
    (user.user_metadata?.full_name as string | undefined)?.split(' ')[0] || '';

  // Nombres (RLS : la cliente ne voit que les siens).
  const [{ count }, { count: orderCount }] = await Promise.all([
    supabase.from('favorites').select('product_id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }),
  ]);

  return (
    <div className="pt-32 md:pt-44 pb-24 min-h-screen bg-ivoire">
      <div className="max-w-2xl mx-auto px-6">
        <p className="font-body text-xs text-taupe tracking-[0.15em] uppercase">Mon compte</p>
        <h1 className="font-display text-4xl sm:text-5xl text-noir mt-2">
          Bonjour{prenom ? ` ${prenom}` : ''}
        </h1>
        <p className="font-body text-sm text-taupe mt-3">
          Connectée avec <span className="text-noir">{user.email}</span>
        </p>

        {/* Cartes d'accès */}
        <div className="grid sm:grid-cols-2 gap-4 mt-10">
          <Link
            href="/compte/favoris"
            className="group bg-creme rounded-xl p-6 hover:bg-rose transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl text-noir">Mes favoris</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8842E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </div>
            <p className="font-body text-sm text-taupe mt-2">
              {count ? `${count} bijou${count > 1 ? 'x' : ''} enregistré${count > 1 ? 's' : ''}` : 'Aucun favori pour l’instant'}
            </p>
          </Link>

          <Link
            href="/compte/commandes"
            className="group bg-creme rounded-xl p-6 hover:bg-rose transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl text-noir">Mes commandes</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8842E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <p className="font-body text-sm text-taupe mt-2">
              {orderCount ? `${orderCount} commande${orderCount > 1 ? 's' : ''}` : 'Aucune commande pour l’instant'}
            </p>
          </Link>
        </div>

        <AccountActions />
      </div>
    </div>
  );
}
