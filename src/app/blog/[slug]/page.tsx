import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

const HISTOIRE_SLUG = 'histoire-de-la-coquette';

function slugToTitle(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === HISTOIRE_SLUG) {
    return {
      title: "L'histoire de La Coquette",
      description: "De son atelier dans la Drôme aux oreilles de ses clientes : la petite histoire des boucles d'oreilles La Coquette.",
    };
  }
  const title = slugToTitle(slug);
  return {
    title,
    description: `${title} — Conseils et inspirations bijoux par La Coquette.`,
  };
}

function Breadcrumb({ label }: { label: string }) {
  return (
    <nav className="font-body text-[10px] text-taupe tracking-[0.2em] uppercase mb-10 flex items-center justify-center gap-2" aria-label="Fil d'ariane">
      <Link href="/" className="hover:text-noir transition-colors">Accueil</Link>
      <span aria-hidden>/</span>
      <Link href="/blog" className="hover:text-noir transition-colors">Journal</Link>
      <span aria-hidden>/</span>
      <span className="text-noir" aria-current="page">{label}</span>
    </nav>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // ── Article complet : L'histoire de La Coquette ──
  if (slug === HISTOIRE_SLUG) {
    return (
      <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <Breadcrumb label="L'histoire de La Coquette" />

          <p className="font-body text-[10px] font-medium tracking-[0.3em] uppercase text-dore text-center">Notre histoire</p>
          <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-noir mt-4 leading-[1.05] text-center">
            L'histoire de La Coquette
          </h1>

          <div className="relative aspect-[16/10] w-full overflow-hidden mt-12 rounded-lg">
            <Image
              src="/boucles-placeholder.jpg"
              alt="Création artisanale La Coquette par Caro"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <div className="mt-12 space-y-6 font-body font-light text-base sm:text-lg text-noir/75 leading-relaxed">
            <p>
              La Coquette est née d'une idée simple : créer des boucles d'oreilles qu'on garde aux oreilles toute la journée — et qu'on finit par oublier tant elles sont légères.
            </p>
            <p>
              Dans son atelier de la Drôme, Caro monte chaque paire à la main, une à une. Des formes pendantes, des couleurs choisies, des finitions vérifiées au cas par cas. Rien n'est produit en série.
            </p>
            <p>
              Le choix de l'acier inoxydable doré n'a rien d'un hasard : il ne ternit pas, ne verdit pas la peau et se moque de l'eau. Des bijoux faits pour être portés vraiment — pas pour rester au fond d'une boîte.
            </p>
          </div>

          {/* Citation */}
          <blockquote className="my-14 border-t border-b border-gris py-10 text-center">
            <p className="font-display font-light text-3xl sm:text-4xl text-noir leading-snug">
              «&nbsp;Chaque bijou porte une part de moi.&nbsp;»
            </p>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-taupe mt-5">Caro</p>
          </blockquote>

          {/* Points clés */}
          <div className="text-center">
            <ul className="space-y-3 inline-flex flex-col items-start text-left">
              {[
                'Acier inoxydable hypoallergénique',
                'Résistant à l\'eau et au temps',
                'Livraison soignée par La Poste',
                'Créations exclusives & artisanales',
              ].map(point => (
                <li key={point} className="flex items-center gap-3 font-body text-sm text-noir">
                  <span className="w-4 h-px bg-noir flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-3">
            <Link href="/boutique" className="inline-flex items-center font-body text-[11px] tracking-[0.22em] uppercase bg-noir text-blanc px-8 py-4 rounded hover:bg-taupe transition-colors duration-500">
              Découvrir les créations
            </Link>
            <Link href="/contact" className="inline-flex items-center font-body text-[11px] tracking-[0.22em] uppercase border border-noir/25 text-noir px-8 py-4 rounded hover:border-noir transition-colors duration-500">
              Contacter Caro
            </Link>
          </div>
        </article>
      </div>
    );
  }

  // ── Autres articles : à venir ──
  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Breadcrumb label={slug.replace(/-/g, ' ')} />

        <p className="font-body text-[10px] font-medium tracking-[0.3em] uppercase text-taupe">Journal</p>
        <h1 className="font-display font-light text-4xl sm:text-5xl text-noir mt-4 leading-snug">
          {slugToTitle(slug)}
        </h1>

        <div className="mt-10 space-y-5 font-body font-light text-base text-noir/70 leading-relaxed">
          <p>Cet article sera bientôt disponible. Caro rédige avec soin chaque contenu pour vous apporter les meilleurs conseils sur les bijoux, le style et l'élégance au quotidien.</p>
          <p>En attendant, n'hésitez pas à découvrir notre boutique ou à nous contacter directement.</p>
        </div>

        <div className="mt-12 flex gap-4">
          <Link href="/boutique" className="inline-flex items-center font-body text-[11px] tracking-[0.22em] uppercase bg-noir text-blanc px-7 py-3.5 rounded hover:bg-taupe transition-colors duration-500">
            Voir la boutique
          </Link>
          <Link href="/blog" className="inline-flex items-center font-body text-[11px] tracking-[0.22em] uppercase border border-noir/25 text-noir px-7 py-3.5 rounded hover:border-noir transition-colors duration-500">
            Retour au journal
          </Link>
        </div>
      </div>
    </div>
  );
}
