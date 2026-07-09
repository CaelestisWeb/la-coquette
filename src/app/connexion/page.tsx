import { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ConnexionForm from './ConnexionForm';

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre compte La Coquette pour retrouver vos favoris et vos commandes.',
  robots: { index: false, follow: false },
};

export default async function ConnexionPage() {
  // Déjà connectée ? On file directement au compte.
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect('/compte');

  return (
    <div className="pt-32 md:pt-44 pb-24 min-h-screen bg-ivoire flex items-start justify-center px-6">
      <Suspense fallback={<div className="pt-10 font-body text-sm text-taupe">Chargement…</div>}>
        <ConnexionForm />
      </Suspense>
    </div>
  );
}
