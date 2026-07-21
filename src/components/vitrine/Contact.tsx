import { getSettings } from '@/sanity/lib/vitrine';
import ContactForm from './ContactForm';

export default async function Contact() {
  const settings = await getSettings();

  return (
    <section id="contact" className="bg-ivoire border-t border-gris py-24 sm:py-32">
      {/* Deux colonnes inégales : le propos à gauche, le formulaire à droite */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
        <div className="lg:col-span-5 reveal">
          <h2 className="font-display text-noir text-[clamp(2.1rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.015em]">
            Écrivez-moi
          </h2>
          <p className="font-body text-[15px] text-taupe leading-relaxed mt-6 max-w-sm text-pretty">
            Une question, une envie de bijou sur mesure, une commande ? C&apos;est moi qui lis et réponds, avec plaisir.
          </p>

          <dl className="mt-12 space-y-6">
            <div>
              <dt className="font-body text-[11px] font-medium tracking-[0.18em] uppercase text-taupe">Email</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${settings.email}`} className="font-body text-[15px] text-noir border-b border-noir/20 hover:border-noir pb-0.5 transition-colors break-all">
                  {settings.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-body text-[11px] font-medium tracking-[0.18em] uppercase text-taupe">Instagram</dt>
              <dd className="mt-1.5">
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="font-body text-[15px] text-noir border-b border-noir/20 hover:border-noir pb-0.5 transition-colors">
                  {settings.instaHandle}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-body text-[11px] font-medium tracking-[0.18em] uppercase text-taupe">Où</dt>
              <dd className="mt-1.5 font-body text-[15px] text-noir">{settings.zone}, France</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7 lg:pl-6 reveal reveal-d1">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
