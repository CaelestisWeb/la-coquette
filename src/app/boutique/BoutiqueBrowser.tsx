'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type BoutiqueCard = {
  id: string;
  price: number;
  search: string; // texte déjà normalisé (minuscules, sans accents) : nom + collection
  node: ReactNode; // carte produit rendue côté serveur (pas ré-hydratée)
};

type Sort = 'default' | 'price-asc' | 'price-desc';

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

export default function BoutiqueBrowser({ cards }: { cards: BoutiqueCard[] }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('default');

  const visible = useMemo(() => {
    const q = norm(query);
    let list = q ? cards.filter((c) => c.search.includes(q)) : cards;
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cards, query, sort]);

  const q = query.trim();

  return (
    <div>
      {/* Barre d'outils : recherche + tri */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-9">
        {/* Recherche */}
        <div role="search" className="relative w-full sm:max-w-xs">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-taupe pointer-events-none"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un bijou…"
            aria-label="Rechercher un bijou"
            className="w-full border border-gris bg-blanc pl-10 pr-9 py-2.5 rounded font-body text-sm text-noir outline-none focus:border-noir transition-colors placeholder:text-taupe/70 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Effacer la recherche"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-taupe hover:text-noir transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Tri */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <label htmlFor="tri-boutique" className="font-body text-[11px] tracking-[0.12em] uppercase text-taupe whitespace-nowrap">
            Trier
          </label>
          <select
            id="tri-boutique"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-gris bg-blanc pl-3 pr-8 py-2.5 rounded font-body text-sm text-noir outline-none focus:border-noir transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23847b73%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22/%3E%3C/svg%3E')] bg-[length:12px] bg-no-repeat bg-[right_0.7rem_center]"
          >
            <option value="default">Sélection</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      {/* Compteur */}
      <p className="font-body text-xs text-taupe tracking-[0.12em] uppercase text-center mb-10" aria-live="polite">
        {visible.length} création{visible.length > 1 ? 's' : ''}
        {q && ` pour « ${q} »`}
      </p>

      {/* Grille ou état vide */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {visible.map((c) => (
            <div key={c.id}>{c.node}</div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="font-body text-sm text-taupe">
            Aucune création ne correspond à « {q} ».
          </p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-4 font-body text-xs tracking-[0.12em] uppercase text-noir underline underline-offset-4 hover:text-or transition-colors"
          >
            Voir toutes les créations
          </button>
        </div>
      )}
    </div>
  );
}
