'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/boutique', label: 'Boutique' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { count, setIsOpen } = useCart();
  const { count: favCount, user } = useFavorites();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const prevCount = useRef(count);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Petit rebond de l'icône panier quand un article est ajouté.
  useEffect(() => {
    if (count > prevCount.current) setBump(true);
    prevCount.current = count;
  }, [count]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Sur la page d'accueil non scrollée : liens blancs sur la bannière sombre
  const onDarkHero = pathname === '/' && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? 'bg-ivoire/95 backdrop-blur-sm shadow-[0_2px_20px_rgba(17,17,17,0.06)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 md:py-5">

        {/* Rangée du haut : logo centré, icônes en absolu */}
        <div className="relative flex items-center justify-center">

          {/* Burger — mobile, à gauche */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden absolute left-0 p-2 transition-colors ${onDarkHero ? 'text-blanc' : 'text-noir'}`}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>
              }
            </svg>
          </button>

          {/* Logo centré, grand */}
          <Link href="/" aria-label="La Coquette — accueil">
            <Image
              src={onDarkHero ? '/logo-wordmark-dark.svg' : '/logo-wordmark.svg'}
              alt="La Coquette"
              width={527}
              height={130}
              priority
              unoptimized
              className={`w-auto transition-all duration-300 ${scrolled ? 'h-12 md:h-14' : 'h-16 md:h-[90px]'}`}
            />
          </Link>

          {/* Icônes — à droite */}
          <div className={`absolute right-0 flex items-center gap-1 sm:gap-2 ${onDarkHero ? 'text-blanc/80' : 'text-noir'}`}>
            {/* Favoris */}
            <Link
              href="/compte/favoris"
              className={`relative p-2 transition-colors ${onDarkHero ? 'hover:text-blanc' : 'hover:text-or'}`}
              aria-label="Mes favoris"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
              {favCount > 0 && (
                <span className="absolute top-0 right-0 min-w-4 h-4 px-1 bg-or text-blanc text-[9px] font-body font-medium flex items-center justify-center rounded-full">
                  {favCount}
                </span>
              )}
            </Link>

            {/* Compte */}
            <Link
              href={user ? '/compte' : '/connexion'}
              className={`p-2 transition-colors ${onDarkHero ? 'hover:text-blanc' : 'hover:text-taupe'}`}
              aria-label={user ? 'Mon compte' : 'Se connecter'}
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Panier */}
            <button
              onClick={() => setIsOpen(true)}
              onAnimationEnd={() => setBump(false)}
              className={`relative p-2 transition-colors ${onDarkHero ? 'hover:text-blanc' : 'hover:text-taupe'} ${bump ? 'motion-safe:animate-[lcCartBump_.4s_ease-out]' : ''}`}
              aria-label="Ouvrir le panier"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-noir text-blanc text-[9px] font-body font-medium flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Rangée du bas : navigation centrée — desktop */}
        <nav className="hidden md:flex items-center justify-center gap-10 lg:gap-14 mt-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative pb-1 font-body text-[11px] font-normal tracking-[0.22em] uppercase transition-colors duration-300 ${
                onDarkHero
                  ? pathname === link.href ? 'text-blanc' : 'text-blanc/65 hover:text-blanc'
                  : pathname === link.href ? 'text-noir' : 'text-taupe hover:text-noir'
              }`}
            >
              {link.label}
              <span
                aria-hidden
                className={`pointer-events-none absolute left-0 bottom-0 h-px w-full origin-left transition-transform duration-300 ${
                  onDarkHero ? 'bg-blanc' : 'bg-noir'
                } ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
              />
            </Link>
          ))}
        </nav>
      </div>

      {/* Menu mobile — slide animé */}
      <div
        id="mobile-menu"
        inert={!menuOpen ? true : undefined}
        className={`md:hidden bg-ivoire border-t border-gris overflow-hidden transition-all duration-300 ease-in-out ${
        menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <nav className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-[11px] font-medium tracking-[0.18em] uppercase transition-colors ${
                pathname === link.href ? 'text-or' : 'text-noir hover:text-or'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
