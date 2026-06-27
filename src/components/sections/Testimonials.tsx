import SectionLabel from '@/components/ui/SectionLabel';
import { getHomeContent, type Testimonial } from '@/sanity/lib/content';

const STAR_PATH = 'M8,1.5 L9.5,5.9 L14.2,6 L10.5,8.8 L11.8,13.3 L8,10.6 L4.2,13.3 L5.5,8.8 L1.8,6 L6.5,5.9Z';

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path d={STAR_PATH} fill={i < n ? '#D4AF37' : 'none'} stroke="#D4AF37" strokeWidth="0.7" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t, className = '' }: { t: Testimonial; className?: string }) {
  return (
    <div className={`bg-creme rounded-lg flex flex-col items-center text-center gap-5 ${className}`}>
      <Stars n={t.rating} />
      <p className="font-body font-light text-base text-noir/75 leading-relaxed flex-1">«&nbsp;{t.text}&nbsp;»</p>
      <div className="pt-5 border-t border-gris/70 w-full">
        <p className="font-display text-2xl text-noir">{t.name}</p>
        <p className="font-body text-[11px] text-taupe tracking-[0.15em] uppercase mt-0.5">{t.location}</p>
      </div>
    </div>
  );
}

export default async function Testimonials() {
  const { testimonialsLabel, testimonialsHeading, testimonials } = await getHomeContent();
  return (
    <section className="bg-rose py-24 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14 reveal">
          <SectionLabel align="center">{testimonialsLabel}</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-noir mt-3">
            {testimonialsHeading}
          </h2>
        </div>

        {/* Mobile : scroll horizontal */}
        <div data-lenis-prevent className="md:hidden -mx-6 px-6 flex gap-4 overflow-x-auto hide-scrollbar snap-testimonials pb-2">
          {testimonials.map((t, i) => (
            <Card key={i} t={t} className="flex-none w-[82vw] p-6" />
          ))}
          <div className="flex-none w-2" aria-hidden />
        </div>

        {/* Desktop : grille 3 colonnes */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} t={t} className={`p-8 reveal reveal-d${i + 1}`} />
          ))}
        </div>

      </div>
    </section>
  );
}
