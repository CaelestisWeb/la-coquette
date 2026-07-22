import Link from 'next/link';
import Image from 'next/image';
import { getSettings } from '@/sanity/lib/vitrine';

const navLinks = [
  { href: '/#atelier', label: "L'atelier" },
  { href: '/galerie', label: 'Galerie' },
  { href: '/#ou-acheter', label: 'Où me trouver' },
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
          className="w-64 sm:w-72 h-auto"
        />

        <p className="mt-8 font-body text-sm leading-relaxed text-blanc/55 max-w-md text-pretty">
          {settings.footerTagline}
        </p>

        <nav aria-label="Pied de page" className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-[12px] tracking-[0.06em] text-blanc/60 hover:text-blanc transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-9">
          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-creme text-noir font-body text-[11px] font-medium tracking-[0.16em] uppercase px-8 py-4 hover:bg-blanc transition-colors duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            {settings.instaHandle}
          </a>
        </div>

        <p className="mt-7 font-body text-[13px] text-blanc/45">{settings.zone}, France</p>
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
