import Image from 'next/image';
import { getContent } from '@/sanity/lib/vitrine';

export default async function Atelier() {
  const content = await getContent();
  const paras = content.atelierText.split(/\n\n+/).filter(Boolean);

  return (
    <section id="atelier" className="bg-ivoire py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-beige reveal">
          <Image
            src="/galerie/creole-1.jpg"
            alt="Créations La Coquette, faites main"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="reveal reveal-d1">
          <span className="font-body text-[11px] font-medium tracking-[0.3em] uppercase text-taupe">L&apos;atelier</span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-noir mt-4 leading-[1.1]">
            La main de Caro,
            <br />dans la Drôme
          </h2>
          <div className="mt-7 space-y-4 font-body font-light text-[15px] sm:text-base text-taupe leading-relaxed max-w-md">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
