'use client';

import { useState } from 'react';

type Item = { q: string; a: string };

export default function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-gris/70">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="border-b border-gris/70">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-6 text-left group"
            >
              <span className="font-display text-lg sm:text-xl text-noir group-hover:text-dore-mat transition-colors duration-300">
                {it.q}
              </span>
              <span className="relative flex-shrink-0 w-5 h-5">
                <span className="absolute top-1/2 left-0 w-5 h-px bg-noir -translate-y-1/2" />
                <span
                  className={`absolute top-1/2 left-0 w-5 h-px bg-noir -translate-y-1/2 transition-transform duration-300 ${
                    isOpen ? 'rotate-0' : 'rotate-90'
                  }`}
                />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[600px] pb-7 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="font-body font-light text-sm text-taupe leading-relaxed max-w-2xl pr-6">
                {it.a}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
