import { INSTAGRAM, INSTA_HANDLE, EMAIL, ZONE } from './data';

function Item({ href, label, value, children }: { href: string; label: string; value: string; children: React.ReactNode }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex flex-col items-center gap-2.5"
    >
      <span className="w-11 h-11 rounded-full border border-gris flex items-center justify-center text-noir group-hover:border-noir transition-colors">
        {children}
      </span>
      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-taupe">{label}</span>
      <span className="font-body text-sm text-noir">{value}</span>
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="bg-ivoire py-24 sm:py-28">
      <div className="max-w-3xl mx-auto px-6 text-center reveal">
        <span className="font-body text-[11px] font-medium tracking-[0.3em] uppercase text-taupe">Contact</span>
        <h2 className="font-display font-light text-4xl sm:text-5xl text-noir mt-4">Écrivez-moi</h2>
        <p className="font-body font-light text-sm sm:text-base text-taupe leading-relaxed mt-5 max-w-md mx-auto">
          Une question, une envie de bijou sur mesure, une commande ? C&apos;est moi qui lis et réponds, avec plaisir.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-y-10 sm:gap-x-16">
          <Item href={INSTAGRAM} label="Instagram" value={INSTA_HANDLE}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </Item>
          <Item href={`mailto:${EMAIL}`} label="Email" value={EMAIL}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
            </svg>
          </Item>
          <div className="flex flex-col items-center gap-2.5">
            <span className="w-11 h-11 rounded-full border border-gris flex items-center justify-center text-noir">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-taupe">Zone</span>
            <span className="font-body text-sm text-noir">{ZONE}, France</span>
          </div>
        </div>
      </div>
    </section>
  );
}
