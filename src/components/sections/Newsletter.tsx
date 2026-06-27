import Link from 'next/link';
import { getHomeContent } from '@/sanity/lib/content';

export default async function Newsletter() {
  const { newsletterLabel, newsletterHeading, newsletterText, newsletterCta } = await getHomeContent();
  return (
    <section className="bg-noir py-28">
      <div className="max-w-2xl mx-auto px-6 text-center reveal">
        <span className="font-body text-[10px] font-medium tracking-[0.3em] uppercase text-blanc/45">
          {newsletterLabel}
        </span>
        <h2 className="font-display font-light text-4xl sm:text-5xl text-blanc mt-5 leading-[1.1] whitespace-pre-line">
          {newsletterHeading}
        </h2>
        <p className="font-body font-light text-sm text-blanc/50 leading-relaxed mt-6">
          {newsletterText}
        </p>
        <Link
          href="/contact?sujet=Bijou+personnalisé"
          className="inline-block mt-10 bg-creme text-noir border border-noir font-body text-[11px] font-normal tracking-[0.22em] uppercase px-10 py-4 rounded hover:bg-creme/80 transition-colors duration-500"
        >
          {newsletterCta}
        </Link>
      </div>
    </section>
  );
}
