'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SHIPPING_THRESHOLD } from '@/lib/shipping';

type Section = { title: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    title: 'Matière & entretien',
    body: (
      <>
        <p>Acier inoxydable 316L doré à l’or fin. Hypoallergénique et sans nickel, il convient aux peaux sensibles.</p>
        <p className="mt-2">Résistant à l’eau, il ne ternit pas et garde son éclat au fil du temps.</p>
        <p className="mt-2">Entretien : essuyez délicatement avec un chiffon doux. Évitez parfums, crèmes et produits ménagers.</p>
      </>
    ),
  },
  {
    title: 'Livraison & retours',
    body: (
      <>
        <p>Expédition soignée sous 3 à 5 jours ouvrés (Colissimo ou lettre suivie), avec numéro de suivi.</p>
        <p className="mt-2">Livraison offerte dès {SHIPPING_THRESHOLD} € d’achat.</p>
        <p className="mt-2">
          Vous disposez d’un délai de rétractation de 14 jours, dans les conditions détaillées dans nos{' '}
          <Link href="/cgv" className="text-noir underline underline-offset-2 hover:text-or transition-colors">conditions générales de vente</Link>.
        </p>
      </>
    ),
  },
  {
    title: 'Une pièce unique, faite main',
    body: (
      <>
        <p>Chaque bijou est imaginé et assemblé à la main par Caro, dans la Drôme.</p>
        <p className="mt-2">Il n’existe qu’en un seul exemplaire : une fois vendu, il laisse place à de nouvelles créations.</p>
        <p className="mt-2">Chaque commande est préparée et emballée avec soin.</p>
      </>
    ),
  },
];

export default function ProductDetails() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-8 border-t border-gris text-left">
      {SECTIONS.map((s, i) => {
        const isOpen = open === i;
        return (
          <div key={s.title} className="border-b border-gris">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between py-4 text-left font-body text-sm text-noir tracking-wide"
            >
              {s.title}
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                className={`text-taupe transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                aria-hidden
              >
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="pb-5 font-body text-sm text-taupe leading-relaxed">{s.body}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
