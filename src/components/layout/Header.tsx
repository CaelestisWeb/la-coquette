'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { INSTAGRAM } from '@/components/vitrine/data';

const navLinks = [
  { href: '/#atelier', label: "L'atelier" },
  { href: '/galerie', label: 'Galerie' },
  { href: '/#ou-acheter', label: 'Où me trouver' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header({ instagram = INSTAGRAM }: { instagram?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-ivoire border-b border-gris">
      <div className="px-6 sm:px-10 lg:px-[6vw]">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Marque, à gauche */}
          <Link href="/" aria-label="La Coquette, accueil" className="shrink-0">
            <Image
              src="/logo-wordmark.svg"
              alt="La Coquette"
              width={527}
              height={130}
              priority
              unoptimized
              className="h-9 md:h-11 w-auto"
            />
          </Link>

          {/* Navigation, à droite */}
          <nav className="hidden md:flex items-center gap-9 lg:gap-11">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative pb-1 font-body text-[12px] tracking-[0.06em] text-taupe hover:text-noir transition-colors duration-300"
              >
                {link.label}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-noir group-hover:scale-x-100 transition-transform duration-300"
                />
              </Link>
            ))}
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-taupe hover:text-noir transition-colors"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </nav>

          {/* Burger, mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 -mr-2 text-noir"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        inert={!menuOpen ? true : undefined}
        className={`md:hidden bg-ivoire border-t border-gris overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-noir"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-taupe"
          >
            Instagram
          </a>
        </nav>
      </div>
    </header>
  );
}
