import Link from 'next/link';
import Image from 'next/image';
import { getSettings } from '@/sanity/lib/vitrine';

const navLinks = [
  { href: '/#atelier', label: "L'atelier" },
  { href: '/#galerie', label: 'Galerie' },
  { href: '/#ou-acheter', label: 'Où me trouver' },
  { href: '/#contact', label: 'Contact' },
];

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="bg-noir text-blanc/70">
      <div className="max-w-2xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <Image
          src="/logo-dark.svg"
          alt="La Coquette, bijoux fait main"
          width={639}
          height={321}
          unoptimized
          className="w-72 sm:w-80 h-auto"
        />

        <p className="mt-8 font-body font-light text-sm leading-relaxed text-blanc/55 max-w-md">
          {settings.footerTagline}
        </p>

        <nav aria-label="Pied de page" className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-blanc/60 hover:text-blanc transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col items-center gap-2 font-body font-light text-sm text-blanc/55">
          <span>{settings.zone}, France</span>
          <a href={`mailto:${settings.email}`} className="hover:text-blanc transition-colors break-all">
            {settings.email}
          </a>
        </div>

        <div className="mt-9">
          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-blanc font-body text-sm border border-creme/70 px-7 py-3.5 rounded hover:bg-creme hover:text-noir transition-colors duration-500"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            {settings.instaHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-blanc/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-body text-blanc/55">
          <p>© {new Date().getFullYear()} La Coquette, Caro. Tous droits réservés.</p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/politique-confidentialite" className="hover:text-blanc/70 transition-colors">Confidentialité</Link>
            <Link href="/mentions-legales" className="hover:text-blanc/70 transition-colors">Mentions légales</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
