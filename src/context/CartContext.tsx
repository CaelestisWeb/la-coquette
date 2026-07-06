'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

// Fusionne deux paniers : union par produit, on garde la plus grande quantité
// (évite de doubler un article présent des deux côtés).
function mergeCarts(a: CartItem[], b: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();
  for (const it of a) map.set(it.id, { ...it });
  for (const it of b) {
    const ex = map.get(it.id);
    if (ex) ex.quantity = Math.max(ex.quantity, it.quantity);
    else map.set(it.id, { ...it });
  }
  return [...map.values()];
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const itemsRef = useRef<CartItem[]>([]);
  const syncedUserRef = useRef<string | null>(null); // uid dont le panier a été fusionné
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  itemsRef.current = items;

  // Chargement du panier local (invité / avant connexion).
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('lacoquette-cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('lacoquette-cart', JSON.stringify(items));
  }, [items, mounted]);

  // À la connexion : fusionne le panier de l'appareil avec celui du compte,
  // puis enregistre le résultat sur le compte (synchro entre appareils).
  const syncWithServer = useCallback(
    async (uid: string) => {
      const { data } = await supabase.from('carts').select('items').eq('user_id', uid).maybeSingle();
      const serverItems: CartItem[] = Array.isArray(data?.items) ? data.items : [];
      const merged = mergeCarts(serverItems, itemsRef.current);
      setItems(merged);
      syncedUserRef.current = uid;
      await supabase.from('carts').upsert({ user_id: uid, items: merged, updated_at: new Date().toISOString() });
    },
    [supabase],
  );

  // Suivi de la session.
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user && syncedUserRef.current !== data.user.id) syncWithServer(data.user.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        if (syncedUserRef.current !== u.id) syncWithServer(u.id);
      } else {
        syncedUserRef.current = null; // déconnexion : on garde le panier local
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase, syncWithServer]);

  // Enregistrement (débounce) du panier sur le compte à chaque changement.
  useEffect(() => {
    if (!mounted || !user || syncedUserRef.current !== user.id) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      supabase.from('carts').upsert({ user_id: user.id, items, updated_at: new Date().toISOString() });
    }, 700);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [items, user, mounted, supabase]);

  // Pièces uniques : un seul exemplaire. Si le bijou est déjà au panier, on ne
  // l'ajoute pas une seconde fois (la quantité reste à 1).
  const addItem = useCallback((product: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      if (prev.some(i => i.id === product.id)) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans CartProvider');
  return ctx;
}
