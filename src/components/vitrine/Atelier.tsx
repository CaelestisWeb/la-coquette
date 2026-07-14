import Image from 'next/image';

export default function Atelier() {
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
            <p>
              Chaque paire de boucles d&apos;oreilles est imaginée et assemblée à la main, une à une, dans mon atelier
              de la Drôme. Rien n&apos;est produit en série.
            </p>
            <p>
              Je travaille l&apos;acier inoxydable doré, sans nickel : hypoallergénique, résistant à l&apos;eau, et qui
              ne ternit pas. Des matières simples et durables, pour des bijoux qui vous accompagnent au quotidien.
            </p>
            <p>La plupart de mes créations sont des pièces uniques. Celle que vous choisirez ne sera qu&apos;à vous.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
