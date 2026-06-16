import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/boutique', label: 'Boutique' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-noir text-blanc/70">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">

        {/* Brand */}
        <div className="md:col-span-5 flex flex-col items-start gap-6">
          <Image
            src="/logo-dark.svg"
            alt="La Coquette — Bijoux artisanaux"
            width={639}
            height={321}
            className="w-72 sm:w-[22rem] h-auto"
          />
          <p className="font-body font-light text-sm leading-relaxed text-blanc/55 max-w-sm">
            Des bijoux artisanaux en acier inoxydable, conçus avec passion dans la Drôme
            pour révéler votre élégance au quotidien.
          </p>
          <a
            href="https://www.instagram.com/lacoquette_bycaro/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-blanc/55 hover:text-blanc transition-colors text-sm font-body"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
            @lacoquette_bycaro
          </a>
        </div>

        {/* Navigation */}
        <nav className="md:col-span-3" aria-label="Pied de page">
          <p className="font-body text-[10px] font-medium tracking-[0.28em] uppercase text-blanc/40 mb-6">Navigation</p>
          <ul className="space-y-3.5">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="font-body font-light text-sm text-blanc/55 hover:text-blanc transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="md:col-span-4">
          <p className="font-body text-[10px] font-medium tracking-[0.28em] uppercase text-blanc/40 mb-6">Contact</p>
          <ul className="space-y-3.5">
            <li className="font-body font-light text-sm text-blanc/55">Drôme (26) · France</li>
            <li>
              <a href="mailto:contact@lacoquette-bycaro.fr" className="font-body font-light text-sm text-blanc/55 hover:text-blanc transition-colors break-all">
                contact@lacoquette-bycaro.fr
              </a>
            </li>
          </ul>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center font-body text-[11px] tracking-[0.22em] uppercase text-blanc border border-blanc/25 px-7 py-3.5 hover:bg-blanc hover:text-noir transition-colors duration-500"
          >
            Nous contacter
          </Link>
        </div>
      </div>

      {/* Barre basse */}
      <div className="border-t border-blanc/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-body text-blanc/35">
          <p>© {new Date().getFullYear()} La Coquette · Caroline. Tous droits réservés.</p>
          <Link href="/mentions-legales" className="hover:text-blanc/70 transition-colors">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
