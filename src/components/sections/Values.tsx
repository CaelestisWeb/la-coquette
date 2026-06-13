const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: 'Passion',
    text: 'Chaque bijou est imaginé avec amour et attention. La passion de Caroline pour la création se ressent dans chaque détail.',
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
    text: 'Caroline est à votre écoute pour chaque commande, chaque question. Une relation directe, chaleureuse et authentique.',
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
    <section className="bg-rose py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Titre */}
        <div className="text-center mb-12 reveal">
          <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-or">
            Ce qui nous anime
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-noir mt-3">
            Nos valeurs
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {values.map((v, i) => (
            <div key={v.title} className={`bg-blanc p-6 sm:p-8 flex flex-col gap-5 group hover:shadow-lg transition-shadow duration-300 reveal reveal-d${i + 1}`}>
              <span className="text-or group-hover:scale-110 transition-transform duration-300 origin-left w-fit">
                {v.icon}
              </span>
              <h3 className="font-display text-2xl text-noir">{v.title}</h3>
              <p className="font-body text-sm text-taupe leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
