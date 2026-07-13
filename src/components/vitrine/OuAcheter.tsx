import { INSTAGRAM, INSTA_HANDLE } from './data';

export default function OuAcheter() {
  return (
    <section id="ou-acheter" className="bg-noir py-24 sm:py-32">
      <div className="max-w-2xl mx-auto px-6 text-center reveal">
        <span className="font-body text-[11px] font-medium tracking-[0.3em] uppercase text-blanc/45">Où me trouver</span>
        <h2 className="font-display font-light text-4xl sm:text-5xl text-blanc mt-4 leading-[1.1]">
          Sur les marchés,
          <br />et sur Instagram
        </h2>
        <p className="font-body font-light text-[15px] sm:text-base text-blanc/70 leading-relaxed mt-6">
          Je présente mes créations sur les marchés de la Drôme, au fil des saisons. L&apos;agenda, les nouveautés et
          les coulisses de l&apos;atelier, c&apos;est sur Instagram. Une pièce vous plaît ? Un simple message suffit
          pour la réserver ou pour commander la vôtre.
        </p>
        <a
          href={INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-10 bg-creme text-noir font-body text-[11px] font-medium tracking-[0.18em] uppercase px-8 py-4 rounded hover:bg-blanc transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          {INSTA_HANDLE}
        </a>
      </div>
    </section>
  );
}
