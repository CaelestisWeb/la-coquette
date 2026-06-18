import SectionLabel from '@/components/ui/SectionLabel';

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: 'Passion',
    text: 'Chaque bijou est imaginé avec amour et attention. La passion de Caro pour la création se ressent dans chaque détail.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    title: 'Qualité',
    text: 'Acier inoxydable doré, anti-allergie, résistant à l\'eau et au temps. Des matières nobles pour un rendu précieux et durable.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Proximité',
    text: 'Caro est à votre écoute pour chaque commande, chaque question. Une relation directe, chaleureuse et authentique.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Confiance',
    text: 'Paiement sécurisé, livraison soignée, satisfaction garantie. Votre confiance est notre plus belle récompense.',
  },
];

export default function Values() {
  return (
    <section className="bg-ivoire py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Titre */}
        <div className="text-center mb-16 sm:mb-20 reveal">
          <SectionLabel align="center">Ce qui nous anime</SectionLabel>
          <h2 className="font-display text-5xl sm:text-6xl text-noir mt-3">
            Nos valeurs
          </h2>
        </div>

        {/* Colonnes aérées séparées par de fins filets verticaux */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-y-0">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`group px-6 lg:px-10 flex flex-col items-center text-center reveal reveal-d${i + 1} ${i > 0 ? 'lg:border-l border-gris/70' : ''}`}
            >
              <span className="font-body text-[11px] font-medium tracking-[0.35em] text-dore-mat">
                0{i + 1}
              </span>
              <span className="mt-7 w-16 h-16 rounded-full border border-gris flex items-center justify-center text-noir transition-colors duration-500 group-hover:border-dore group-hover:text-dore">
                {v.icon}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-noir mt-7">{v.title}</h3>
              <p className="font-body font-light text-sm text-taupe leading-relaxed mt-4 max-w-[15rem]">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
