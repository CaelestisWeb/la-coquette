'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import HeartButton from '@/components/ui/HeartButton';
import type { ProductImage } from '@/sanity/lib/productTypes';

// Galerie de la page produit : photo principale zoomable (plein écran au clic),
// miniatures cliquables si plusieurs photos, navigation clavier et flèches.
export default function ProductGallery({
  images,
  alt,
  productId,
}: {
  images: ProductImage[];
  alt: string;
  productId: string;
}) {
  const photos = images.length > 0 ? images : [{ url: '/boucles-placeholder.jpg' }];
  const many = photos.length > 1;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  // Zoom dans la vue plein écran uniquement.
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const cur = photos[Math.min(active, photos.length - 1)];

  const next = () => setActive((i) => (i + 1) % photos.length);
  const prev = () => setActive((i) => (i - 1 + photos.length) % photos.length);

  // Réinitialise le zoom à l'ouverture/fermeture et au changement de photo.
  useEffect(() => { setZoomed(false); setOrigin({ x: 50, y: 50 }); }, [open, active]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      else if (many && e.key === 'ArrowRight') next();
      else if (many && e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, many, photos.length]);

  const arrow = 'absolute top-1/2 -translate-y-1/2 text-blanc/80 hover:text-blanc transition-colors';

  return (
    <div>
      {/* Photo principale */}
      <div className="aspect-square relative overflow-hidden bg-beige rounded-lg">
        <div className="absolute top-3 right-3 z-10">
          <HeartButton
            productId={productId}
            size={20}
            className="w-10 h-10 rounded-full bg-blanc/85 backdrop-blur-sm shadow-sm hover:bg-blanc"
          />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Agrandir la photo"
          className="absolute inset-0 w-full h-full cursor-zoom-in"
        >
          <Image
            key={cur.url}
            src={cur.url}
            alt={alt}
            fill
            priority
            placeholder={cur.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={cur.blurDataURL}
            className="object-cover motion-safe:animate-[lcFade_.3s_ease-out]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </button>
      </div>

      {/* Miniatures */}
      {many && (
        <div className="mt-3 flex flex-wrap gap-3">
          {photos.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Voir la photo ${i + 1}`}
              aria-current={i === active}
              className={`relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-md overflow-hidden bg-beige transition ${
                i === active ? 'ring-2 ring-noir' : 'ring-1 ring-gris hover:ring-taupe'
              }`}
            >
              <Image
                src={img.url}
                alt=""
                fill
                placeholder={img.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={img.blurDataURL}
                className="object-cover"
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Plein écran */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-noir/90 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out motion-safe:animate-[lcFade_.2s_ease-out]"
        >
          <div
            className={`relative w-full h-full max-w-4xl overflow-hidden ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
            onMouseMove={(e) => {
              if (!zoomed) return;
              const r = e.currentTarget.getBoundingClientRect();
              setOrigin({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
          >
            <Image
              src={cur.url}
              alt={alt}
              fill
              className="object-contain transition-transform duration-200"
              style={{ transform: zoomed ? 'scale(2.2)' : 'scale(1)', transformOrigin: `${origin.x}% ${origin.y}%` }}
              sizes="90vw"
            />
          </div>

          {many && (
            <>
              <button
                type="button"
                aria-label="Photo précédente"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className={`${arrow} left-3 sm:left-6`}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button
                type="button"
                aria-label="Photo suivante"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className={`${arrow} right-3 sm:right-6`}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-xs text-blanc/70 tracking-widest">
                {active + 1} / {photos.length}
              </div>
            </>
          )}

          <button
            type="button"
            aria-label="Fermer"
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            className="absolute top-5 right-5 text-blanc/80 hover:text-blanc transition-colors"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
