import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings } from '@/sanity/lib/vitrine';
import { jsonLd, filAriane } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Bijoux sur mesure',
  description:
    "Une paire de boucles d'oreilles imaginée pour vous : une couleur, une forme, une occasion. La création sur mesure de La Coquette, en Drôme, sur devis.",
  alternates: { canonical: '/sur-mesure' },
};

export const revalidate = 60;

const ETAPES = [
  {
    titre: 'Vous décrivez votre envie',
    texte:
      "Une couleur précise, une forme, une longueur, une occasion ou un cadeau à offrir : le plus simple est un message sur Instagram. Une photo qui vous inspire aide beaucoup.",
  },
  {
    titre: 'On affine ensemble',
    texte:
      "Je vous propose des pierres, des breloques et un montage, jusqu'à ce que la paire vous ressemble vraiment. Vous recevez un devis clair avant que je commence, sans engagement.",
  },
  {
    titre: 'Je façonne votre paire',
    texte:
      "Chaque paire est assemblée à la main dans mon atelier de la Drôme, en acier inoxydable doré sans nickel : hypoallergénique, il supporte la douche, la mer et le quotidien sans ternir.",
  },
];

export default async function SurMesurePage() {
  const settings = await getSettings();

  return (
    <div className="bg-ivoire">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            filAriane([
              { nom: 'Accueil', chemin: '/' },
              { nom: 'Sur mesure', chemin: '/sur-mesure' },
            ]),
          ),
        }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-32 md:pt-44 pb-24 sm:pb-32">
        <p className="font-body text-[11px] font-medium tracking-[0.28em] uppercase text-taupe">
          Sur mesure, {settings.zone}
        </p>
        <h1 className="font-display text-noir mt-6 text-[clamp(2.4rem,5vw,4rem)] leading-[1.0] tracking-[-0.018em] max-w-3xl">
          La paire qui vous ressemble,
          <br />imaginée pour vous
        </h1>
        <p className="mt-7 max-w-xl font-body text-[15px] sm:text-base text-taupe leading-relaxed">
          À côté des collections, je crée des paires sur mesure, à partir d&apos;une idée,
          d&apos;une couleur ou d&apos;une occasion. Une création unique, pensée avec vous, sur devis
          et sans engagement.
        </p>

        <ol className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-gris border border-gris">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="bg-ivoire p-8 lg:p-10">
              <span className="font-display text-2xl text-noir">0{i + 1}</span>
              <h2 className="mt-4 font-display text-xl text-noir">{e.titre}</h2>
              <p className="mt-3 font-body text-[14px] text-taupe leading-relaxed">{e.texte}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-noir text-blanc font-body text-[11px] font-medium tracking-[0.16em] uppercase px-8 py-4 hover:bg-taupe transition-colors duration-300"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Décrire mon envie
          </a>
          <Link
            href="/#contact"
            className="group relative pb-1 font-body text-[12px] tracking-[0.06em] text-taupe hover:text-noir transition-colors duration-300"
          >
            Autres façons de me joindre
            <span aria-hidden className="pointer-events-none absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-noir group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
        </div>

        <p className="mt-16">
          <Link href="/galerie" className="font-body text-[13px] text-taupe underline underline-offset-4 hover:text-noir transition-colors">
            Voir d&apos;abord les collections
          </Link>
        </p>
      </div>
    </div>
  );
}
