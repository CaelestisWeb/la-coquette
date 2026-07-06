'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

type ToggleResult = 'added' | 'removed' | 'need-auth' | 'error';

type FavoritesContextType = {
  user: User | null;
  ready: boolean;
  count: number;
  isFavorite: (productId: string) => boolean;
  toggle: (productId: string) => Promise<ToggleResult>;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  const loadFavorites = useCallback(
    async (uid: string | null) => {
      if (!uid) { setIds(new Set()); return; }
      const { data } = await supabase.from('favorites').select('product_id').eq('user_id', uid);
      setIds(new Set((data || []).map((r) => r.product_id as string)));
    },
    [supabase],
  );

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUser(data.user);
      loadFavorites(data.user?.id ?? null).finally(() => active && setReady(true));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      loadFavorites(u?.id ?? null);
    });
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, [supabase, loadFavorites]);

  const toggle = useCallback(
    async (productId: string): Promise<ToggleResult> => {
      if (!user) return 'need-auth';
      const has = ids.has(productId);
      // Mise à jour optimiste (retour visuel instantané).
      setIds((prev) => {
        const n = new Set(prev);
        if (has) n.delete(productId); else n.add(productId);
        return n;
      });
      const rollback = () =>
        setIds((prev) => {
          const n = new Set(prev);
          if (has) n.add(productId); else n.delete(productId);
          return n;
        });

      if (has) {
        const { error } = await supabase.from('favorites').delete()
          .eq('user_id', user.id).eq('product_id', productId);
        if (error) { rollback(); return 'error'; }
        return 'removed';
      }
      const { error } = await supabase.from('favorites')
        .insert({ user_id: user.id, product_id: productId });
      if (error) { rollback(); return 'error'; }
      return 'added';
    },
    [user, ids, supabase],
  );

  return (
    <FavoritesContext.Provider
      value={{ user, ready, count: ids.size, isFavorite: (id) => ids.has(id), toggle }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites doit être utilisé dans FavoritesProvider');
  return ctx;
}
