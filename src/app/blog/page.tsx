import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import SectionLabel from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Journal | La Coquette',
  description: 'De son atelier dans la Drôme aux oreilles de ses clientes : la petite histoire des boucles d\'oreilles faites main de La Coquette.',
};

const article = {
  slug: 'histoire-de-la-coquette',
  title: 'L\'histoire de La Coquette',
  excerpt: 'De son atelier dans la Drôme aux oreilles de ses clientes : la petite histoire des boucles La Coquette.',
  category: 'Notre histoire',
  date: '1 mai 2026',
  image: '/boucles-placeholder.jpg',
  readTime: '6 min',
};

export default function BlogPage() {
  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">

      {/* En-tête */}
      <div className="bg-rose py-24 text-center">
        <SectionLabel align="center">Notre histoire</SectionLabel>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-noir mt-3">
          Le Journal
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href={`/blog/${article.slug}`} className="group block bg-creme overflow-hidden rounded-lg">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
          <div className="p-10 lg:p-14 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="font-body text-[10px] tracking-widest uppercase text-or">{article.category}</span>
              <span className="text-gris">·</span>
              <span className="font-body text-[10px] text-taupe">{article.date}</span>
              <span className="text-gris">·</span>
              <span className="font-body text-[10px] text-taupe">{article.readTime} de lecture</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-noir group-hover:text-or transition-colors duration-300 leading-snug">
              {article.title}
            </h2>
            <p className="font-body text-sm text-taupe leading-relaxed mt-5 max-w-xl mx-auto">{article.excerpt}</p>
            <div className="mt-8 inline-flex items-center justify-center gap-2 font-body text-xs tracking-widest uppercase text-noir group-hover:text-or transition-colors">
              Lire l'article
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
