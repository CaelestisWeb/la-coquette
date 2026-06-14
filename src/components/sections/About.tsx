import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionLabel from '@/components/ui/SectionLabel';

export default function About() {
  return (
    <section className="bg-beige py-28">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Image encadrée */}
        <div className="relative order-2 lg:order-1 w-full max-w-sm mx-auto lg:mx-0">
          {/* Panneau chaud décalé */}
          <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 w-full h-full bg-blanc pointer-events-none" />
          {/* Filet doré */}
          <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full border border-or/40 pointer-events-none" />

          <div className="relative z-10 aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/boucles-placeholder.jpg"
              alt="Création artisanale La Coquette par Caroline"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Citation flottante */}
          <div className="absolute z-20 -bottom-6 -right-6 bg-noir text-blanc p-6 max-w-[210px] hidden lg:block shadow-xl">
            <p className="font-accent text-2xl leading-snug text-blanc/90">
              «&nbsp;Chaque bijou porte une part de moi.&nbsp;»
            </p>
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-or mt-3">Caroline</p>
          </div>
        </div>

        {/* Texte */}
        <div className="order-1 lg:order-2 reveal">
          <SectionLabel>Notre histoire</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-noir mt-3">
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
          <div className="lg:hidden mt-10 bg-noir text-blanc p-6">
            <p className="font-accent text-xl leading-snug text-blanc/90">
              «&nbsp;Chaque bijou porte une part de moi.&nbsp;»
            </p>
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-or mt-3">Caroline</p>
          </div>
        </div>
      </div>
    </section>
  );
}
