import type { Metadata } from 'next';
import CheckoutForm from './CheckoutForm';

export const metadata: Metadata = {
  title: 'Commande | La Coquette',
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      <div className="bg-rose py-12 text-center">
        <h1 className="font-display text-4xl text-noir">Ma commande</h1>
      </div>
      <CheckoutForm />
    </div>
  );
}
