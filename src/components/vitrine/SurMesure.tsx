import Image from 'next/image';
import Link from 'next/link';
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
          <p className="mt-8 font-body text-[13px] text-taupe">
            Création sur mesure, sur devis et sans engagement.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-noir text-blanc font-body text-[11px] font-medium tracking-[0.16em] uppercase px-8 py-4 hover:bg-taupe transition-colors duration-300"
            >
              Décrire mon envie
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <Link
              href="/sur-mesure"
              className="group relative pb-1 font-body text-[12px] tracking-[0.06em] text-taupe hover:text-noir transition-colors duration-300"
            >
              Comment ça se passe
              <span aria-hidden className="pointer-events-none absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-noir group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        <figure className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2 reveal reveal-d1">
          <div className="relative aspect-[3/4] overflow-hidden bg-beige">
            <Image
              src="/galerie/creole-3.jpg"
              alt="Création sur mesure La Coquette"
              width={600}
              height={800}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
