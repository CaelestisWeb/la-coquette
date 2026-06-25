'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

/**
 * Vide le panier à l'arrivée sur la page de confirmation.
 * Nécessaire pour le flux APM (Apple Pay / Google Pay) : le client est
 * redirigé ici par SumUp, donc le callback onResponse (qui vide le panier
 * pour le paiement carte) ne s'exécute pas. Sans ça, le panier resterait
 * plein après un paiement Apple Pay réussi.
 */
export default function ClearCart() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return null;
}
