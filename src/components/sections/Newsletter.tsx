import Link from 'next/link';

export default function Newsletter() {
  return (
    <section className="bg-noir py-28">
      <div className="max-w-2xl mx-auto px-6 text-center reveal">
        <span className="font-body text-[10px] font-medium tracking-[0.3em] uppercase text-blanc/45">
          Sur mesure
        </span>
        <h2 className="font-display font-light text-4xl sm:text-5xl text-blanc mt-5 leading-[1.1]">
          Optez pour des boucles d'oreilles<br />faites pour vous
        </h2>
        <p className="font-body font-light text-sm text-blanc/50 leading-relaxed mt-6">
          Décrivez vos envies à Caroline et elle créera la paire qui vous ressemble.
        </p>
        <Link
          href="/contact?sujet=Bijou+personnalisé"
          className="inline-block mt-10 bg-blanc text-noir font-body text-[11px] font-normal tracking-[0.22em] uppercase px-10 py-4 hover:bg-blanc/80 transition-colors duration-500"
        >
          Mes boucles d'oreilles
        </Link>
      </div>
    </section>
  );
}
