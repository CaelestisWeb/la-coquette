import Image from 'next/image';
import { getContent } from '@/sanity/lib/vitrine';

export default async function Atelier() {
  const content = await getContent();
  const paras = content.atelierText.split(/\n\n+/).filter(Boolean);

  return (
    <section id="atelier" className="bg-ivoire py-24 sm:py-32">
      {/* Colonnes inégales et décalées : l'image démarre plus haut que le
          texte, ce qui évite la symétrie parfaite deux colonnes. */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <figure className="lg:col-span-6 reveal">
          <div className="relative aspect-[4/5] overflow-hidden bg-beige">
            <Image
              src="/galerie/creole-1.jpg"
              alt="Créations La Coquette, faites main"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 font-body text-[12px] text-taupe">
            Créoles papillon, assemblées à la main.
          </figcaption>
        </figure>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-20 reveal reveal-d1">
          <h2 className="font-display text-noir text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.02] tracking-[-0.015em]">
            La main de Caro,
            <br />dans la Drôme
          </h2>
          <div className="mt-8 space-y-5 font-body text-[15px] sm:text-base text-taupe leading-relaxed text-pretty">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
