'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { INSTAGRAM } from '@/components/vitrine/data';

const navLinks = [
  { href: '/#atelier', label: "L'atelier" },
  { href: '/#galerie', label: 'Galerie' },
  { href: '/#ou-acheter', label: 'Où me trouver' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header({ instagram = INSTAGRAM }: { instagram?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Accueil non scrollé : hero sombre, on affiche le logo et les liens en clair.
  const onDarkHero = pathname === '/' && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? 'bg-ivoire/95 backdrop-blur-sm shadow-[0_2px_20px_rgba(17,17,17,0.06)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 md:py-5">
        <div className="relative flex items-center justify-center">
          {/* Burger, mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden absolute left-0 p-2 transition-colors ${onDarkHero ? 'text-blanc' : 'text-noir'}`}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" aria-label="La Coquette, accueil">
            <Image
              src={onDarkHero ? '/logo-wordmark-dark.svg' : '/logo-wordmark.svg'}
              alt="La Coquette"
              width={527}
              height={130}
              priority
              unoptimized
              className={`w-auto transition-all duration-300 ${scrolled ? 'h-11 md:h-12' : 'h-14 md:h-16'}`}
            />
          </Link>

          {/* Instagram, à droite */}
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`absolute right-0 p-2 transition-colors ${onDarkHero ? 'text-blanc/85 hover:text-blanc' : 'text-noir hover:text-taupe'}`}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center justify-center gap-10 lg:gap-14 mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative pb-1 font-body text-[11px] font-normal tracking-[0.22em] uppercase transition-colors duration-300 ${
                onDarkHero ? 'text-blanc/70 hover:text-blanc' : 'text-taupe hover:text-noir'
              }`}
            >
              {link.label}
              <span
                aria-hidden
                className={`pointer-events-none absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                  onDarkHero ? 'bg-blanc' : 'bg-noir'
                }`}
              />
            </Link>
          ))}
        </nav>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        inert={!menuOpen ? true : undefined}
        className={`md:hidden bg-ivoire border-t border-gris overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[11px] font-medium tracking-[0.18em] uppercase text-noir hover:text-taupe transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
