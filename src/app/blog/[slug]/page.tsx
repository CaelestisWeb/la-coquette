import Link from 'next/link';
import type { Metadata } from 'next';

function slugToTitle(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slugToTitle(slug);
  return {
    title,
    description: `${title} — Conseils et inspirations bijoux par La Coquette.`,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="pt-20 min-h-screen bg-ivoire">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <nav className="font-body text-[10px] text-taupe tracking-wide uppercase mb-10 flex items-center gap-2">
          <Link href="/" className="hover:text-or transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-or transition-colors">Journal</Link>
          <span>/</span>
          <span className="text-noir">{slug.replace(/-/g, ' ')}</span>
        </nav>

        <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-or">Journal</span>
        <h1 className="font-display text-4xl sm:text-5xl text-noir mt-3 leading-snug">
          {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </h1>

        <div className="mt-10 space-y-5 font-body text-base text-taupe leading-relaxed">
          <p>Cet article sera bientôt disponible. Caroline rédige avec soin chaque contenu pour vous apporter les meilleurs conseils sur les bijoux, le style et l'élégance au quotidien.</p>
          <p>En attendant, n'hésitez pas à découvrir notre boutique ou à nous contacter directement.</p>
        </div>

        <div className="mt-12 flex gap-4">
          <Link href="/boutique" className="inline-flex items-center font-body text-xs tracking-widest uppercase bg-noir text-blanc px-6 py-3 hover:bg-or transition-colors">
            Voir la boutique
          </Link>
          <Link href="/blog" className="inline-flex items-center font-body text-xs tracking-widest uppercase border border-gris text-taupe px-6 py-3 hover:border-or hover:text-or transition-colors">
            Retour au journal
          </Link>
        </div>
      </div>
    </div>
  );
}
