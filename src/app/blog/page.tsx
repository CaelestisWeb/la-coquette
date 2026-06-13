import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal | La Coquette',
  description: 'Conseils, inspirations et coulisses de l\'atelier La Coquette. Tout sur les bijoux artisanaux, la féminité et l\'élégance au quotidien.',
};

const articles = [
  {
    slug: 'comment-entretenir-ses-bijoux',
    title: 'Comment entretenir ses bijoux en acier inoxydable ?',
    excerpt: 'Découvrez nos conseils pour garder vos bijoux brillants et comme neufs, au fil des années.',
    category: 'Conseils',
    date: '10 juin 2026',
    image: 'https://picsum.photos/seed/blog01/600/400',
    readTime: '3 min',
  },
  {
    slug: 'tendances-bijoux-ete-2026',
    title: 'Les tendances bijoux de l\'été 2026',
    excerpt: 'Anneaux empilés, pendentifs discrets, créoles XL… Voici les pièces incontournables de la saison.',
    category: 'Tendances',
    date: '5 juin 2026',
    image: 'https://picsum.photos/seed/blog02/600/400',
    readTime: '4 min',
  },
  {
    slug: 'superposer-ses-colliers',
    title: 'L\'art de superposer ses colliers',
    excerpt: 'Le layering de colliers est un art subtil. On vous guide pour créer des associations harmonieuses.',
    category: 'Style',
    date: '28 mai 2026',
    image: 'https://picsum.photos/seed/blog03/600/400',
    readTime: '5 min',
  },
  {
    slug: 'acier-inoxydable-bijoux',
    title: 'Pourquoi choisir l\'acier inoxydable ?',
    excerpt: 'Durabilité, hypoallergénique, résistance à l\'eau… L\'acier inoxydable doré n\'a que des avantages.',
    category: 'Matières',
    date: '20 mai 2026',
    image: 'https://picsum.photos/seed/blog04/600/400',
    readTime: '3 min',
  },
  {
    slug: 'bijoux-au-quotidien',
    title: 'Comment intégrer les bijoux dans son quotidien ?',
    excerpt: 'Porter des bijoux chaque jour, c\'est une façon de prendre soin de soi. Nos astuces pour y prendre goût.',
    category: 'Style',
    date: '12 mai 2026',
    image: 'https://picsum.photos/seed/blog05/600/400',
    readTime: '4 min',
  },
  {
    slug: 'histoire-de-la-coquette',
    title: 'L\'histoire de La Coquette',
    excerpt: 'Comment Caroline a transformé sa passion pour les bijoux en une belle aventure entrepreneuriale.',
    category: 'Notre histoire',
    date: '1 mai 2026',
    image: 'https://picsum.photos/seed/blog06/600/400',
    readTime: '6 min',
  },
];

export default function BlogPage() {
  const [featured, ...rest] = articles;

  return (
    <div className="pt-20 min-h-screen bg-ivoire">

      {/* En-tête */}
      <div className="bg-rose py-20 text-center">
        <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-or">
          Inspirations & Conseils
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-noir mt-3">
          Le Journal
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Article vedette */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden bg-blanc">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-body text-[10px] tracking-widest uppercase text-or">{featured.category}</span>
                <span className="text-gris">·</span>
                <span className="font-body text-[10px] text-taupe">{featured.readTime} de lecture</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-noir group-hover:text-or transition-colors duration-300 leading-snug">
                {featured.title}
              </h2>
              <p className="font-body text-sm text-taupe leading-relaxed mt-5">{featured.excerpt}</p>
              <div className="mt-8 flex items-center gap-2 font-body text-xs tracking-widest uppercase text-noir group-hover:text-or transition-colors">
                Lire l'article
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group bg-blanc overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 100vw, 33vw" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-body text-[9px] tracking-widest uppercase text-or">{article.category}</span>
                  <span className="text-gris text-xs">·</span>
                  <span className="font-body text-[9px] text-taupe">{article.date}</span>
                </div>
                <h3 className="font-display text-xl text-noir group-hover:text-or transition-colors duration-200 leading-snug">
                  {article.title}
                </h3>
                <p className="font-body text-sm text-taupe leading-relaxed mt-3 line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
