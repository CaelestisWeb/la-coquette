import Link from 'next/link';

export default function Newsletter() {
  return (
    <section className="bg-noir py-24">
      <div className="max-w-2xl mx-auto px-6 text-center reveal">
        <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-or">
          Sur mesure
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-blanc mt-3">
          Optez pour des boucles d'oreilles <span className="text-or italic">faites pour vous</span>
        </h2>
        <p className="font-body text-sm text-blanc/50 leading-relaxed mt-5">
          Décrivez vos envies à Caroline et elle créera la paire qui vous ressemble.
        </p>
        <Link
          href="/contact?sujet=Bijou+personnalisé"
          className="inline-block mt-10 bg-or text-blanc font-body text-xs font-medium tracking-widest uppercase px-10 py-4 hover:bg-blanc hover:text-noir transition-colors duration-300"
        >
          Mes boucles d'oreilles
        </Link>
      </div>
    </section>
  );
}
