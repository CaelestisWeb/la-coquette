import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function About() {
  return (
    <section className="bg-ivoire py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Image */}
        <div className="relative order-2 lg:order-1">
          <div className="aspect-[3/4] w-full max-w-sm overflow-hidden">
            <Image
              src="https://picsum.photos/seed/about-caroline/480/640"
              alt="Caroline, créatrice La Coquette"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Citation flottante */}
          <div className="absolute -bottom-6 -right-6 bg-noir text-blanc p-6 max-w-[200px] hidden lg:block">
            <p className="font-accent text-2xl leading-snug text-blanc/90">
              "Chaque bijou porte une part de moi."
            </p>
            <p className="font-body text-[10px] tracking-widest uppercase text-or mt-3">Caroline</p>
          </div>
        </div>

        {/* Texte */}
        <div className="order-1 lg:order-2 reveal">
          <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-or">
            Notre histoire
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-noir mt-3">
            Créé avec passion,<br />
            porté avec fierté
          </h2>
          <div className="space-y-5 mt-7 font-body text-taupe text-base leading-relaxed">
            <p>
              Depuis plusieurs années, Caroline conçoit des bijoux élégants pour les femmes qui souhaitent prendre soin d'elles et se sentir belles au quotidien, sans compromis sur la qualité.
            </p>
            <p>
              Installée dans la Drôme, elle imagine chaque pièce avec soin : des formes épurées, des matières nobles, des finitions précises. Chaque bijou La Coquette est pensé pour durer et s'adapter à toutes vos envies.
            </p>
            <p>
              Acier inoxydable doré, anti-allergie, résistant à l'eau : parce que l'élégance ne devrait pas avoir de contraintes.
            </p>
          </div>

          {/* Points clés */}
          <ul className="mt-8 space-y-3">
            {[
              'Acier inoxydable hypoallergénique',
              'Résistant à l\'eau et au temps',
              'Livraison soignée par La Poste',
              'Créations exclusives & artisanales',
            ].map(point => (
              <li key={point} className="flex items-center gap-3 font-body text-sm text-noir">
                <span className="w-4 h-px bg-or flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button href="/contact" variant="primary">Nous contacter</Button>
          </div>

          {/* Citation — mobile uniquement */}
          <div className="lg:hidden mt-8 bg-noir text-blanc p-6">
            <p className="font-accent text-xl leading-snug text-blanc/90">
              "Chaque bijou porte une part de moi."
            </p>
            <p className="font-body text-[10px] tracking-widest uppercase text-or mt-3">Caroline</p>
          </div>
        </div>
      </div>
    </section>
  );
}
