import SectionLabel from '@/components/ui/SectionLabel';

const testimonials = [
  {
    name: 'Sophie M.',
    location: 'Lyon',
    rating: 5,
    text: "J'ai commandé les créoles fines et les puces cœur pour ma fille. Elle est ravie ! La qualité est vraiment au rendez-vous, et le colis était magnifiquement présenté. Je recommande sans hésiter.",
  },
  {
    name: 'Marie-Claire D.',
    location: 'Valence',
    rating: 5,
    text: "Caro est adorable et très réactive. Mes boucles d'oreilles sont exactement comme sur les photos, encore plus jolies en vrai. Elles ne s'oxydent pas, même au quotidien. Un vrai coup de cœur !",
  },
  {
    name: 'Élisa R.',
    location: 'Grenoble',
    rating: 5,
    text: "Le collier étoile est absolument magnifique. Je le porte tous les jours depuis un mois, aucune décoloration. C'est rare de trouver des bijoux aussi qualitatifs à ce prix. Bravo La Coquette !",
  },
];

const STAR_PATH = 'M8,1.5 L9.5,5.9 L14.2,6 L10.5,8.8 L11.8,13.3 L8,10.6 L4.2,13.3 L5.5,8.8 L1.8,6 L6.5,5.9Z';

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path d={STAR_PATH} fill={i < n ? '#111111' : 'none'} stroke="#111111" strokeWidth="0.7" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

type Testimonial = (typeof testimonials)[0];

function Card({ t, className = '' }: { t: Testimonial; className?: string }) {
  return (
    <div className={`bg-blanc flex flex-col gap-5 ${className}`}>
      <Stars n={t.rating} />
      <p className="font-body font-light text-base text-noir/75 leading-relaxed flex-1">«&nbsp;{t.text}&nbsp;»</p>
      <div className="pt-5 border-t border-gris/70">
        <p className="font-display text-2xl text-noir">{t.name}</p>
        <p className="font-body text-[11px] text-taupe tracking-[0.15em] uppercase mt-0.5">{t.location}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-rose py-24 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14 reveal">
          <SectionLabel align="center">Elles nous font confiance</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-noir mt-3">
            Avis clients
          </h2>
        </div>

        {/* Mobile : scroll horizontal */}
        <div className="md:hidden -mx-6 px-6 flex gap-4 overflow-x-auto hide-scrollbar snap-testimonials pb-2">
          {testimonials.map(t => (
            <Card key={t.name} t={t} className="flex-none w-[82vw] p-6" />
          ))}
          {/* Espaceur fin de liste */}
          <div className="flex-none w-2" aria-hidden />
        </div>

        {/* Desktop : grille 3 colonnes */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={t.name} t={t} className={`p-8 reveal reveal-d${i + 1}`} />
          ))}
        </div>

      </div>
    </section>
  );
}
