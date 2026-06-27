import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import SectionLabel from '@/components/ui/SectionLabel';
import { getContactContent, getSiteSettings } from '@/sanity/lib/content';

export const metadata: Metadata = {
  title: 'Contact | La Coquette',
  description: 'Contactez Caro pour une commande, un bijou personnalisé ou toute question. Réponse rapide garantie.',
};

const PinIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const MailIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

export default async function ContactPage() {
  const { label, heading, intro } = await getContactContent();
  const s = await getSiteSettings();

  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      <div className="bg-rose py-24 text-center">
        <SectionLabel align="center">{label}</SectionLabel>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-noir mt-3">
          {heading}
        </h1>
        <p className="font-body text-sm text-taupe mt-4 max-w-md mx-auto leading-relaxed">
          {intro}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Infos */}
        <div className="text-center">
          <h2 className="font-display text-3xl text-noir">Informations</h2>
          <ul className="mt-8 space-y-6">
            <li className="flex flex-col items-center gap-2">
              <span className="text-or">{PinIcon}</span>
              <div>
                <p className="font-body text-[10px] tracking-[0.15em] uppercase text-taupe">Adresse</p>
                <p className="font-body text-sm text-noir mt-1">{s.contactLocation}</p>
              </div>
            </li>
            <li className="flex flex-col items-center gap-2">
              <span className="text-or">{MailIcon}</span>
              <div>
                <p className="font-body text-[10px] tracking-[0.15em] uppercase text-taupe">Email</p>
                <a href={`mailto:${s.contactEmail}`} className="font-body text-sm text-noir hover:text-or transition-colors mt-1 block">
                  {s.contactEmail}
                </a>
              </div>
            </li>
          </ul>
          <div className="mt-10 p-6 bg-beige rounded-lg">
            <p className="font-body text-xs text-taupe leading-relaxed whitespace-pre-line">
              <strong className="text-noir font-medium">Horaires :</strong>{'\n'}{s.contactHours}
            </p>
          </div>
          <div className="mt-8">
            <p className="font-body text-[10px] text-taupe mb-3 tracking-[0.2em] uppercase">Suivez-nous</p>
            <a
              href={s.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-body text-sm text-noir hover:text-or transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              {s.instagramHandle}
            </a>
          </div>
        </div>

        {/* Formulaire client */}
        <ContactForm />
      </div>
    </div>
  );
}
