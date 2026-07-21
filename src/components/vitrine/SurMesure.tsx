import Image from 'next/image';
import { getContent, getSettings } from '@/sanity/lib/vitrine';

export default async function SurMesure() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);
  const paras = content.surMesureText.split(/\n\n+/).filter(Boolean);

  return (
    <section id="sur-mesure" className="bg-creme border-t border-gris py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 order-2 lg:order-1 lg:pt-16 reveal">
          <h2 className="font-display text-noir text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.02] tracking-[-0.015em]">
            La paire qui
            <br />vous ressemble
          </h2>
          <div className="mt-8 space-y-5 font-body text-[15px] sm:text-base text-taupe leading-relaxed max-w-md text-pretty">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 mt-10 bg-noir text-blanc font-body text-[11px] font-medium tracking-[0.16em] uppercase px-8 py-4 hover:bg-taupe transition-colors duration-300"
          >
            Décrire mon envie
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <figure className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2 reveal reveal-d1">
          <div className="relative aspect-[3/4] overflow-hidden bg-beige">
            <Image
              src="/galerie/creole-3.jpg"
              alt="Création sur mesure La Coquette"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
