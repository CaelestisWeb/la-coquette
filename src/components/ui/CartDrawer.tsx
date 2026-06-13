'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-noir/30 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panneau */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-blanc z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gris">
          <div>
            <span className="font-display text-xl text-noir">Mon panier</span>
            {count > 0 && (
              <span className="ml-2 text-xs font-body text-taupe">({count} article{count > 1 ? 's' : ''})</span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-taupe hover:text-noir transition-colors"
            aria-label="Fermer le panier"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Articles */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D8D1CD" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="font-body text-taupe text-sm">Votre panier est vide</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs font-body font-medium tracking-widest uppercase text-or underline underline-offset-4"
              >
                Découvrir la boutique
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map(item => (
                <li key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-beige overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-base text-noir truncate">{item.name}</p>
                    <p className="font-body text-sm text-taupe">{item.price} €</p>
                    {/* Quantité */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-6 h-6 border border-gris flex items-center justify-center text-taupe hover:border-or hover:text-or transition-colors text-sm"
                      >−</button>
                      <span className="font-body text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-6 h-6 border border-gris flex items-center justify-center text-taupe hover:border-or hover:text-or transition-colors text-sm"
                      >+</button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-taupe hover:text-noir transition-colors"
                      aria-label="Supprimer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                    <p className="font-body text-sm font-medium text-noir">{(item.price * item.quantity).toFixed(0)} €</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pied */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-gris space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-body text-sm text-taupe tracking-wide uppercase text-xs">Total</span>
              <span className="font-display text-xl text-noir">{total.toFixed(0)} €</span>
            </div>
            <p className="text-[10px] font-body text-taupe">Livraison calculée à la commande · La Poste</p>
            <button className="w-full bg-noir text-blanc font-body font-medium tracking-widest text-xs uppercase py-4 hover:bg-or transition-colors duration-300">
              Commander
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
