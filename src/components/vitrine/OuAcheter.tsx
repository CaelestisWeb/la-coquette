import { getContent, getSettings } from '@/sanity/lib/vitrine';

export default async function OuAcheter() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);

  return (
    <section id="ou-acheter" className="bg-noir py-24 sm:py-32">
      {/* Bloc sombre traité en éditorial : titre à gauche, propos à droite,
          rien n'est centré. */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start reveal">
        <h2 className="lg:col-span-6 font-display text-blanc text-[clamp(2.2rem,4.8vw,3.75rem)] leading-[1.0] tracking-[-0.015em]">
          Sur les marchés,
          <br />et sur Instagram
        </h2>

        <div className="lg:col-span-5 lg:col-start-8">
          <p className="font-body text-[15px] sm:text-base text-blanc/70 leading-relaxed whitespace-pre-line text-pretty">
            {content.ouAcheterText}
          </p>
          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 mt-9 bg-creme text-noir font-body text-[11px] font-medium tracking-[0.16em] uppercase px-8 py-4 hover:bg-blanc transition-colors duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            {settings.instaHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
