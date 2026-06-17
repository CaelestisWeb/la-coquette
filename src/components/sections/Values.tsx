import SectionLabel from '@/components/ui/SectionLabel';

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/>
        <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z"/>
      </svg>
    ),
    title: 'Fait main',
    text: 'Chaque paire est montée à la main par Caro, dans son atelier de la Drôme — jamais en série.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c3.5 4 6 7 6 10a6 6 0 01-12 0c0-3 2.5-6 6-10z"/>
        <path d="M9.5 13.5a2.5 2.5 0 002.5 2.5"/>
      </svg>
    ),
    title: 'Inaltérable',
    text: 'L\'acier inoxydable doré ne ternit pas et ne noircit pas la peau : douche, mer ou piscine, vos boucles restent intactes.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Sans nickel',
    text: 'Hypoallergénique, pensé pour les oreilles sensibles. À porter du matin au soir sans jamais y penser.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l3 6-9 12L3 9z"/>
        <path d="M3 9h18"/>
        <path d="M9 3 8 9l4 12 4-12-1-6"/>
      </svg>
    ),
    title: 'Sur-mesure',
    text: 'Une couleur, une forme, une longueur en tête ? Caro crée la paire qui n\'existe que pour vous.',
  },
];

export default function Values() {
  return (
    <section className="bg-ivoire py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Titre */}
        <div className="text-center mb-16 sm:mb-20 reveal">
          <SectionLabel align="center">Savoir-faire</SectionLabel>
          <h2 className="font-display text-5xl sm:text-6xl text-noir mt-3">
            La signature La Coquette
          </h2>
        </div>

        {/* Colonnes aérées séparées par de fins filets verticaux */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-y-0">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`group px-6 lg:px-10 flex flex-col items-center text-center reveal reveal-d${i + 1} ${i > 0 ? 'lg:border-l border-gris/70' : ''}`}
            >
              <span className="font-body text-[11px] font-medium tracking-[0.35em] text-dore">
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
