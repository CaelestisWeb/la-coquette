'use client';

import { useEffect, useState } from 'react';
import { VisualEditing } from 'next-sanity/visual-editing';

/**
 * Affiché uniquement quand le mode aperçu (draft) est actif.
 * - Dans le volet Presentation du Studio (iframe) : les contours d'édition cliquables.
 * - En navigation directe sur le domaine (le cookie d'aperçu traîne dans le
 *   navigateur de l'éditeur) : AUCUN contour, juste un bouton « Quitter l'aperçu ».
 *   Les vrais visiteurs n'ont jamais ce cookie : ils ne voient rien de tout ça.
 */
export default function PreviewControls() {
  const [inIframe, setInIframe] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setInIframe(window.self !== window.top);
    } catch {
      // Accès cross-origin au parent bloqué = on est bien dans une iframe.
      setInIframe(true);
    }
  }, []);

  if (inIframe === null) return null;

  // Dans le Studio (aperçu) : les contours d'édition.
  if (inIframe) return <VisualEditing />;

  // Sur le domaine en direct : pas de contours, juste de quoi quitter l'aperçu.
  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-[200] inline-flex items-center gap-2 bg-noir text-blanc text-[11px] font-body font-medium tracking-[0.18em] uppercase px-4 py-2.5 rounded-full shadow-lg hover:bg-or transition-colors"
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-or" aria-hidden />
      Aperçu · Quitter
    </a>
  );
}
