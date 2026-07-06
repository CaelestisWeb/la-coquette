'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Photo produit avec curseur « zoom » au survol et agrandissement plein écran
// au clic (fermeture au clic, ou avec la touche Échap).
export default function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Agrandir la photo"
        className="absolute inset-0 w-full h-full cursor-zoom-in"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-noir/90 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out motion-safe:animate-[lcFade_.2s_ease-out]"
        >
          <div className="relative w-full h-full max-w-4xl">
            <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" />
          </div>
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 text-blanc/80 hover:text-blanc transition-colors"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
