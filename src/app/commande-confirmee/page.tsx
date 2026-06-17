import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Commande confirmée | La Coquette',
  robots: { index: false },
};

export default function CommandeConfirmeePage() {
  return (
    <div className="pt-20 min-h-screen bg-blanc flex items-center justify-center">
      <div className="text-center px-6 py-20 max-w-md">
        <div className="w-16 h-16 rounded-full bg-rose flex items-center justify-center mx-auto mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h1 className="font-display text-4xl text-noir mb-4">Merci pour votre commande !</h1>
        <p className="font-body text-sm text-taupe leading-relaxed mb-10">
          Caro a bien reçu votre commande et vous contactera très prochainement pour confirmer les détails de livraison.
        </p>
        <Link href="/boutique"
          className="inline-block bg-noir text-blanc font-body text-xs font-medium tracking-widest uppercase px-10 py-4 hover:bg-or transition-colors duration-300">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}
