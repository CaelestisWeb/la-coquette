'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { PRODUCT_COLORS, COLOR_SWATCH } from '@/sanity/lib/colors';

export type BoutiqueCard = {
  id: string;
  price: number;
  couleurs: string[];
  search: string; // texte déjà normalisé (minuscules, sans accents) : nom + collection
  node: ReactNode; // carte produit rendue côté serveur (pas ré-hydratée)
};

type Sort = 'default' | 'price-asc' | 'price-desc';

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

export default function BoutiqueBrowser({ cards }: { cards: BoutiqueCard[] }) {
  // Bornes de prix + couleurs réellement présentes dans la vue courante.
  const bounds = useMemo(() => {
    const prices = cards.map((c) => c.price);
    const rawMin = Math.min(...prices);
    const rawMax = Math.max(...prices);
    // L'écart se base sur les VRAIS prix (pas les bornes arrondies), sinon des
    // prix identiques (39,99) donneraient un faux écart 39→40.
    return { min: Math.floor(rawMin), max: Math.ceil(rawMax), spread: rawMax > rawMin };
  }, [cards]);
  const hasPriceSpread = bounds.spread;

  const availableColors = useMemo(() => {
    const set = new Set<string>();
    cards.forEach((c) => c.couleurs.forEach((col) => set.add(col)));
    return PRODUCT_COLORS.filter((c) => set.has(c));
  }, [cards]);

  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('default');
  const [colors, setColors] = useState<string[]>([]);
  const [pMin, setPMin] = useState(bounds.min);
  const [pMax, setPMax] = useState(bounds.max);

  const toggleColor = (c: string) =>
    setColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const q = query.trim();
  const nq = norm(query);
  const priceActive = hasPriceSpread && (pMin > bounds.min || pMax < bounds.max);
  const anyFilter = q !== '' || colors.length > 0 || priceActive;

  const visible = useMemo(() => {
    let list = cards;
    if (nq) list = list.filter((c) => c.search.includes(nq));
    if (colors.length) list = list.filter((c) => c.couleurs.some((col) => colors.includes(col)));
    if (hasPriceSpread) list = list.filter((c) => c.price >= pMin && c.price <= pMax);
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cards, nq, colors, pMin, pMax, hasPriceSpread, sort]);

  const reset = () => {
    setQuery('');
    setSort('default');
    setColors([]);
    setPMin(bounds.min);
    setPMax(bounds.max);
  };

  const labelCls = 'font-body text-[11px] tracking-[0.12em] uppercase text-taupe whitespace-nowrap';

  return (
    <div>
      {/* Barre d'outils */}
      <div className="mb-8 space-y-5">
        {/* Ligne 1 : recherche + tri */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <label htmlFor="tri-boutique" className={labelCls}>Trier</label>
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

        {/* Ligne 2 : filtres couleur + prix */}
        {(availableColors.length > 1 || hasPriceSpread) && (
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-x-8 gap-y-4 border-t border-gris/60 pt-5">
            {availableColors.length > 1 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className={`${labelCls} mr-1`}>Couleur</span>
                {availableColors.map((c) => {
                  const active = colors.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleColor(c)}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-1.5 rounded-full border pl-1.5 pr-3 py-1 font-body text-xs transition-colors ${
                        active ? 'border-noir bg-noir text-blanc' : 'border-gris text-taupe hover:border-noir hover:text-noir'
                      }`}
                    >
                      <span
                        aria-hidden
                        className="w-3.5 h-3.5 rounded-full border border-noir/20 shrink-0"
                        style={{ background: COLOR_SWATCH[c as keyof typeof COLOR_SWATCH] }}
                      />
                      {c}
                    </button>
                  );
                })}
              </div>
            )}

            {hasPriceSpread && (
              <div className="flex items-center gap-2.5 shrink-0">
                <span className={labelCls}>Prix</span>
                <input
                  type="number"
                  inputMode="numeric"
                  aria-label="Prix minimum"
                  value={pMin}
                  min={bounds.min}
                  max={pMax}
                  onChange={(e) => setPMin(Math.max(bounds.min, Math.min(Number(e.target.value) || bounds.min, pMax)))}
                  className="w-16 border border-gris bg-blanc px-2 py-2 rounded font-body text-sm text-noir text-center outline-none focus:border-noir transition-colors"
                />
                <span className="font-body text-xs text-taupe">à</span>
                <input
                  type="number"
                  inputMode="numeric"
                  aria-label="Prix maximum"
                  value={pMax}
                  min={pMin}
                  max={bounds.max}
                  onChange={(e) => setPMax(Math.min(bounds.max, Math.max(Number(e.target.value) || bounds.max, pMin)))}
                  className="w-16 border border-gris bg-blanc px-2 py-2 rounded font-body text-sm text-noir text-center outline-none focus:border-noir transition-colors"
                />
                <span className="font-body text-xs text-taupe">€</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Compteur + réinitialiser */}
      <p className="font-body text-xs text-taupe tracking-[0.12em] uppercase text-center mb-10 flex items-center justify-center gap-3 flex-wrap" aria-live="polite">
        <span>
          {visible.length} création{visible.length > 1 ? 's' : ''}
          {q && ` pour « ${q} »`}
        </span>
        {anyFilter && (
          <button
            type="button"
            onClick={reset}
            className="normal-case tracking-normal text-noir underline underline-offset-4 hover:text-or transition-colors"
          >
            Tout réinitialiser
          </button>
        )}
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
          <p className="font-body text-sm text-taupe">Aucune création ne correspond à votre recherche.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 font-body text-xs tracking-[0.12em] uppercase text-noir underline underline-offset-4 hover:text-or transition-colors"
          >
            Voir toutes les créations
          </button>
        </div>
      )}
    </div>
  );
}
