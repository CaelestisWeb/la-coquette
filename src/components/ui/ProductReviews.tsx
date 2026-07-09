import type { Review } from '@/sanity/lib/productTypes';

const STAR = 'M8,1.5 L9.5,5.9 L14.2,6 L10.5,8.8 L11.8,13.3 L8,10.6 L4.2,13.3 L5.5,8.8 L1.8,6 L6.5,5.9Z';

export function ReviewStars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-[3px]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 16 16" fill="none">
          <path d={STAR} fill={i < Math.round(value) ? '#D4AF37' : 'none'} stroke="#D4AF37" strokeWidth="0.7" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
}

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) return null;

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <section id="avis" className="mt-24 scroll-mt-28">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl sm:text-4xl text-noir">Avis clientes</h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <ReviewStars value={avg} size={16} />
          <span className="font-body text-sm text-taupe">
            <span className="text-noir font-medium">{avg.toFixed(1).replace('.', ',')}</span>
            {' · '}
            {reviews.length} avis
          </span>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {reviews.map((r, i) => {
          const date = formatDate(r.date);
          return (
            <li key={i} className="bg-creme rounded-lg p-6 flex flex-col gap-3">
              <ReviewStars value={r.rating} />
              <p className="font-body font-light text-base text-noir/75 leading-relaxed flex-1">
                «&nbsp;{r.text}&nbsp;»
              </p>
              <p className="font-body text-[11px] text-taupe tracking-[0.15em] uppercase">
                {r.author}
                {date ? <span className="text-taupe/70 normal-case tracking-normal">{` · ${date}`}</span> : null}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
