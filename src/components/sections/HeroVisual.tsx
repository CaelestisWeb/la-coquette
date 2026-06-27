'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';

type Props = {
  before: string;
  hl: string;
  after: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageUrl: string;
};

export default function HeroVisual({ before, hl, after, ctaPrimary, ctaSecondary, imageUrl }: Props) {
  const imgRef = useRef<HTMLDivElement>(null);

  // Parallaxe douce : la photo défile plus lentement que le contenu.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const el = imgRef.current;
        if (el && y < window.innerHeight * 1.1) {
          el.style.transform = `translate3d(0, ${y * 0.09}px, 0)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-end">

      {/* Photo de fond (légèrement plus grande pour la parallaxe) */}
      <div ref={imgRef} className="absolute -top-[10%] left-0 right-0 h-[120%] will-change-transform">
        <Image
          src={imageUrl}
          alt="Bijou artisanal La Coquette, créole dorée sur pierre"
          fill
          priority
          className="object-cover object-[38%_50%] opacity-80"
          sizes="100vw"
        />
      </div>

      {/* Voile haut → bas : couvre la nav */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir/60 via-noir/10 to-transparent pointer-events-none z-10" />
      {/* Voile bas → haut : zone de texte */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir/75 via-noir/30 to-transparent pointer-events-none z-10" />

      {/* Contenu */}
      <div className="relative z-20 w-full text-center px-6 pb-24 sm:pb-28">
        <h1 className="hero-rise font-display font-light text-[2.1rem] sm:text-[2.6rem] lg:text-[50px] text-blanc leading-[1.08] whitespace-pre-line">
          {before}
          {hl && <span className="hero-underline text-dore-mat">{hl}</span>}
          {after}
        </h1>

        <div className="hero-rise-2 flex flex-wrap justify-center gap-3 mt-8">
          <Button href="/boutique" variant="primary" className="!bg-creme !text-noir hover:!bg-gris !px-6 !py-3 !text-[10px]">
            {ctaPrimary}
          </Button>
          <Button href="/contact" variant="secondary" className="!border-dore !text-blanc !px-6 !py-3 !text-[10px]">
            {ctaSecondary}
          </Button>
        </div>
      </div>

      {/* Indicateur de scroll : hairline + point de lumière qui descend (sans mot) */}
      <div className="hero-rise-3 absolute bottom-7 left-1/2 -translate-x-1/2 z-20">
        <div className="scroll-hairline" aria-hidden />
      </div>
    </section>
  );
}
