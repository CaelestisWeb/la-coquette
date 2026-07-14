import Image from 'next/image';
import { getContent, getSettings } from '@/sanity/lib/vitrine';

export default async function SurMesure() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);
  const paras = content.surMesureText.split(/\n\n+/).filter(Boolean);

  return (
    <section id="sur-mesure" className="bg-ivoire py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="reveal order-2 lg:order-1">
          <span className="font-body text-[11px] font-medium tracking-[0.3em] uppercase text-taupe">Sur mesure</span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-noir mt-4 leading-[1.1]">
            La paire qui vous ressemble
          </h2>
          <div className="mt-7 space-y-4 font-body font-light text-[15px] sm:text-base text-taupe leading-relaxed max-w-md">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-9 bg-noir text-blanc font-body text-[11px] font-medium tracking-[0.18em] uppercase px-8 py-4 rounded hover:bg-or transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Décrire mon envie
          </a>
        </div>

        <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-beige reveal reveal-d1 order-1 lg:order-2">
          <Image
            src="/galerie/creole-3.jpg"
            alt="Création sur mesure La Coquette"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
