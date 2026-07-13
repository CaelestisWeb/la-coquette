const ITEMS = [
  {
    label: 'Fait main dans la Drôme',
    icon: (
      <path d="M12 20s-6-4.3-6-9a3.6 3.6 0 0 1 6-2.4A3.6 3.6 0 0 1 18 11c0 4.7-6 9-6 9z" />
    ),
  },
  {
    label: 'Sans nickel, hypoallergénique',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12 2.3 2.3L15.5 9.7" />
      </>
    ),
  },
  {
    label: "Résistant à l'eau, ne ternit pas",
    icon: <path d="M12 3s5.5 6 5.5 10a5.5 5.5 0 0 1-11 0C6.5 9 12 3 12 3z" />,
  },
  {
    label: 'Chaque pièce est unique',
    icon: <path d="m12 3 2.4 5.9 6.3.5-4.8 4.1 1.5 6.1L12 16.9 6.6 19.7l1.5-6.1-4.8-4.1 6.3-.5z" />,
  },
];

export default function Reassurance() {
  return (
    <section className="bg-beige py-14 sm:py-16 border-y border-gris/60">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
        {ITEMS.map((it) => (
          <div key={it.label} className="flex flex-col items-center text-center gap-3">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-noir" aria-hidden>
              {it.icon}
            </svg>
            <span className="font-body text-[12px] sm:text-[13px] text-taupe leading-snug max-w-[10rem]">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
