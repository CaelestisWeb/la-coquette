'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCart, type CartItem } from '@/context/CartContext';

// Remet les pièces (encore disponibles) dans le panier, puis file au paiement.
export default function ResumeCart({ items }: { items: Omit<CartItem, 'quantity'>[] }) {
  const { addItem, setIsOpen } = useCart();
  const router = useRouter();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    items.forEach((it) => addItem(it));
    setIsOpen(false); // on n'ouvre pas le tiroir : on emmène directement au paiement
    const t = setTimeout(() => router.push('/checkout'), 900);
    return () => clearTimeout(t);
  }, [items, addItem, setIsOpen, router]);

  return (
    <>
      <h1 className="font-display text-3xl sm:text-4xl text-noir">Nous remettons vos pièces dans votre panier</h1>
      <p className="font-body text-sm text-taupe mt-4">Un instant, nous vous emmenons à votre commande.</p>
    </>
  );
}
