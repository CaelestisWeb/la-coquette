import type { Metadata } from 'next';
import SectionLabel from '@/components/ui/SectionLabel';
import FaqAccordion from './FaqAccordion';
import { getFaqContent } from '@/sanity/lib/content';

export const metadata: Metadata = {
  title: 'Questions fréquentes | La Coquette',
  description: 'Matières, entretien, livraison, retours, bijoux personnalisés : toutes les réponses à vos questions sur les créations La Coquette.',
};

export default async function FaqPage() {
  const { label, heading, intro, items } = await getFaqContent();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* En-tête */}
      <div className="bg-rose py-24 text-center">
        <SectionLabel align="center">{label}</SectionLabel>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-noir mt-3">
          {heading}
        </h1>
        <p className="font-body text-sm text-taupe mt-4 max-w-md mx-auto leading-relaxed">
          {intro}
        </p>
      </div>

      {/* Accordéon */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <FaqAccordion items={items} />

        <div className="text-center mt-14">
          <p className="font-body text-sm text-taupe">Une autre question&nbsp;?</p>
          <a
            href="/contact"
            className="inline-block mt-4 bg-noir text-blanc font-body text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded hover:bg-dore transition-colors duration-500"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
}
