import { getHomeContent } from '@/sanity/lib/content';

// Icônes gérées par le code (design) ; attribuées par position.
const icons = [
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
      <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />
    </svg>
  ),
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c3.5 4 6 7 6 10a6 6 0 01-12 0c0-3 2.5-6 6-10z" />
      <path d="M9.5 13.5a2.5 2.5 0 002.5 2.5" />
    </svg>
  ),
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="13" height="11" rx="1" />
      <path d="M14 9h4l3 3v5h-7z" />
      <circle cx="6" cy="18.5" r="1.8" />
      <circle cx="18" cy="18.5" r="1.8" />
    </svg>
  ),
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
];

export default async function Reassurance() {
  const { reassuranceItems } = await getHomeContent();
  return (
    <section className="bg-ivoire border-y border-gris/70">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {reassuranceItems.map((item, i) => (
            <li
              key={i}
              className={`flex items-center gap-4 py-7 px-2 sm:px-6 ${
                i !== 0 ? 'lg:border-l border-gris/60' : ''
              } ${i === 1 ? 'max-lg:border-l border-gris/60' : ''} ${
                i >= 2 ? 'max-lg:border-t border-gris/60' : ''
              }`}
            >
              <span className="text-noir flex-shrink-0" aria-hidden>
                {icons[i % icons.length]}
              </span>
              <div>
                <p className="font-body text-[11px] sm:text-xs font-medium tracking-[0.12em] uppercase text-noir leading-tight">
                  {item.title}
                </p>
                <p className="font-body font-light text-[11px] sm:text-xs text-taupe mt-1 leading-tight">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
