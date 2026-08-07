import { getSettings } from '@/sanity/lib/vitrine';

// Questions réelles et utiles : matières, entretien, sur-mesure, où commander.
// Contenu stable (factuel), donc en dur dans le code, comme la réassurance.
const QA = [
  {
    q: 'En quoi sont faites les boucles ?',
    r: "En acier inoxydable doré, sans nickel. C'est un matériau hypoallergénique, qui convient aux oreilles sensibles.",
  },
  {
    q: 'Comment les entretenir ?',
    r: "Rien de compliqué : elles résistent à l'eau, ne ternissent pas, et supportent la douche comme la mer. Un chiffon doux de temps en temps suffit à leur rendre leur éclat.",
  },
  {
    q: 'Peut-on commander une paire sur mesure ?',
    r: "Oui, avec plaisir. Décrivez-moi votre envie (une couleur, une forme, une idée de cadeau) en message privé sur Instagram, et je crée une paire rien que pour vous.",
  },
  {
    q: 'Comment commander une paire vue sur le site ?',
    r: "Écrivez-moi en message privé sur Instagram en me disant laquelle vous plaît. On convient ensemble de la remise, sur un marché ou par envoi. Il n'y a pas de vente directement sur le site.",
  },
  {
    q: "Une paire me plaît mais elle n'est plus disponible ?",
    r: "La plupart de mes créations sont des pièces uniques, donc certaines partent vite. Mais une couleur ou une forme peut souvent être refaite : demandez-moi, on regarde ensemble.",
  },
];

export default async function Faq() {
  const settings = await getSettings();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: QA.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.r },
    })),
  };

  return (
    <section id="faq" className="bg-ivoire border-t border-gris py-24 sm:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Titre à gauche, questions à droite : même grammaire éditoriale que le reste */}
        <div className="lg:col-span-4 reveal">
          <h2 className="font-display text-noir text-[clamp(2.1rem,4.4vw,3.25rem)] leading-[1.02] tracking-[-0.015em]">
            Questions
            <br />fréquentes
          </h2>
          <p className="font-body text-[15px] text-taupe leading-relaxed mt-6 max-w-xs text-pretty">
            Une autre question ? Écrivez-moi sur{' '}
            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-noir border-b border-noir/25 hover:border-noir pb-0.5 transition-colors"
            >
              Instagram
            </a>
            , je réponds moi-même.
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 reveal reveal-d1">
          <dl className="border-t border-gris">
            {QA.map((item) => (
              <details key={item.q} className="group border-b border-gris">
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none py-6 sm:py-7">
                  <dt className="font-display text-lg sm:text-xl text-noir leading-snug">{item.q}</dt>
                  <span
                    aria-hidden
                    className="shrink-0 text-taupe transition-transform duration-300 group-open:rotate-45"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <dd className="font-body text-[15px] text-taupe leading-relaxed pb-7 pr-8 sm:pr-12 max-w-2xl text-pretty">
                  {item.r}
                </dd>
              </details>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
