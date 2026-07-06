'use client';

import { useRouter } from 'next/navigation';
import { useFavorites } from '@/context/FavoritesContext';

// Bouton cœur : ajoute/retire des favoris. Si la cliente n'est pas connectée,
// on la dirige vers la connexion (les favoris sont liés à son compte).
export default function HeartButton({
  productId,
  size = 18,
  className = '',
}: {
  productId: string;
  size?: number;
  className?: string;
}) {
  const { isFavorite, toggle } = useFavorites();
  const router = useRouter();
  const active = isFavorite(productId);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const res = await toggle(productId);
    if (res === 'need-auth') {
      const here = typeof window !== 'undefined' ? window.location.pathname : '/';
      router.push(`/connexion?next=${encodeURIComponent(here)}`);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className={`inline-flex items-center justify-center transition-colors ${
        active ? 'text-or' : 'text-taupe hover:text-or'
      } ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    </button>
  );
}
