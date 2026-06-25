import type { Metadata } from 'next';
import OrderConfirmation from './OrderConfirmation';

export const metadata: Metadata = {
  title: 'Commande confirmée | La Coquette',
  robots: { index: false },
};

export default function CommandeConfirmeePage() {
  return <OrderConfirmation />;
}
