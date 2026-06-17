import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import SectionLabel from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Contact | La Coquette',
  description: 'Contactez Caro pour une commande, un bijou personnalisé ou toute question. Réponse rapide garantie.',
};

const infos = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Adresse',
    value: 'Drôme (26)',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'contact@lacoquette-bycaro.fr',
    href: 'mailto:contact@lacoquette-bycaro.fr',
  },
];

export default function ContactPage() {
  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      <div className="bg-rose py-24 text-center">
        <SectionLabel align="center">Parlons-nous</SectionLabel>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-noir mt-3">
          Nous contacter
        </h1>
        <p className="font-body text-sm text-taupe mt-4 max-w-md mx-auto leading-relaxed">
          Une question, une commande personnalisée ou simplement envie d'échanger ? Caro vous répond avec plaisir.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Infos */}
        <div>
          <h2 className="font-display text-3xl text-noir">Informations</h2>
          <ul className="mt-8 space-y-6">
            {infos.map(info => (
              <li key={info.label} className="flex items-start gap-4">
                <span className="text-or mt-0.5">{info.icon}</span>
                <div>
                  <p className="font-body text-[10px] tracking-[0.15em] uppercase text-taupe">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="font-body text-sm text-noir hover:text-or transition-colors mt-1 block">
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-body text-sm text-noir mt-1">{info.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 p-6 bg-beige rounded-lg">
            <p className="font-body text-xs text-taupe leading-relaxed">
              <strong className="text-noir font-medium">Horaires :</strong><br />
              Du lundi au vendredi, de 9h à 18h.<br />
              Caro répond généralement sous 24h.
            </p>
          </div>
          <div className="mt-8">
            <p className="font-body text-[10px] text-taupe mb-3 tracking-[0.2em] uppercase">Suivez-nous</p>
            <a
              href="https://www.instagram.com/lacoquette_bycaro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-noir hover:text-or transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
              @lacoquette_bycaro
            </a>
          </div>
        </div>

        {/* Formulaire client */}
        <ContactForm />
      </div>
    </div>
  );
}
