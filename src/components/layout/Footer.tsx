import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-noir text-blanc/70">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div className="flex flex-col gap-5">
          <Image src="/logo.png" alt="La Coquette" width={70} height={70} className="brightness-0 invert opacity-80" />
          <p className="font-body text-sm leading-relaxed text-blanc/50 max-w-xs">
            Des bijoux artisanaux en acier inoxydable, conçus avec passion pour révéler votre élégance au quotidien.
          </p>
          <a
            href="https://www.instagram.com/lacoquette_bycaro/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blanc/50 hover:text-or transition-colors text-sm font-body"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
            @lacoquette_bycaro
          </a>
        </div>

        {/* Navigation */}
        <div>
          <p className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-or mb-6">Navigation</p>
          <ul className="space-y-3">
            {[
              { href: '/', label: 'Accueil' },
              { href: '/boutique', label: 'Boutique' },
              { href: '/boutique?cat=boucles', label: "Boucles d'oreilles" },
              { href: '/blog', label: 'Journal' },
              { href: '/contact', label: 'Contact' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="font-body text-sm text-blanc/50 hover:text-or transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-or mb-6">Contact</p>
          <ul className="space-y-3">
            <li className="font-body text-sm text-blanc/50">Drôme (26)</li>
            <li>
              <a href="mailto:contact@lacoquette-bycaro.fr" className="font-body text-sm text-blanc/50 hover:text-or transition-colors">
                contact@lacoquette-bycaro.fr
              </a>
            </li>
            <li>
              <a href="tel:0777888746" className="font-body text-sm text-blanc/50 hover:text-or transition-colors">
                07 77 88 87 46
              </a>
            </li>
          </ul>
          <div className="mt-8">
            <Link href="/contact" className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-or border border-or px-5 py-2.5 hover:bg-or hover:text-blanc transition-colors duration-300">
              Nous contacter
            </Link>
          </div>
        </div>
      </div>

      {/* Barre basse */}
      <div className="border-t border-blanc/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-body text-blanc/30">
          <p>© {new Date().getFullYear()} La Coquette, Caroline. Tous droits réservés.</p>
          <Link href="/mentions-legales" className="hover:text-blanc/60 transition-colors">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
