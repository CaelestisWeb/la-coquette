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
    text: "Caroline est adorable et très réactive. Mes boucles d'oreilles sont exactement comme sur les photos, encore plus jolies en vrai. Elles ne s'oxydent pas, même au quotidien. Un vrai coup de cœur !",
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
          <path d={STAR_PATH} fill={i < n ? '#C69C3D' : 'none'} stroke="#C69C3D" strokeWidth="0.7" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

type Testimonial = (typeof testimonials)[0];

function Card({ t, className = '' }: { t: Testimonial; className?: string }) {
  return (
    <div className={`bg-blanc flex flex-col gap-4 ${className}`}>
      <Stars n={t.rating} />
      <p className="font-accent text-lg text-taupe leading-relaxed flex-1">"{t.text}"</p>
      <div className="pt-4 border-t border-gris">
        <p className="font-display text-base text-noir">{t.name}</p>
        <p className="font-body text-xs text-taupe tracking-wide">{t.location}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-beige py-20 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12 reveal">
          <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-or">
            Elles nous font confiance
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-noir mt-3">
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
