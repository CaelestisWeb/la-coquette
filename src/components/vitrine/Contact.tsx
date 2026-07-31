import { INSTAGRAM, INSTA_HANDLE } from '@/components/vitrine/data';

// Adresse de contact direct de l'éditrice (déjà présente dans les mentions
// légales). Le formulaire n'envoie rien à un serveur : il prépare un message
// dans la messagerie du visiteur, le site ne collecte donc aucune donnée.
//
// Composant serveur volontairement : le petit script d'amélioration est en
// ligne (aucun fichier chargé en plus), pour ne pas alourdir la page.
const EMAIL = 'contact@lacoquette-bycaro.fr';

const CHAMP =
  'w-full border border-gris bg-creme px-4 py-3 font-body text-[14px] text-noir focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-noir';
const LABEL = 'block font-body text-[12px] tracking-[0.04em] text-taupe mb-2';

export default function Contact() {
  return (
    <section id="contact" className="bg-ivoire border-t border-gris py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <h2 className="font-display text-noir text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.02] tracking-[-0.015em]">
            Une envie,
            <br />une question ?
          </h2>
          <p className="mt-7 max-w-md font-body text-[15px] sm:text-base text-taupe leading-relaxed text-pretty">
            Le plus rapide reste un message sur Instagram, mais vous pouvez aussi
            m&apos;écrire ici : votre message part directement dans votre messagerie,
            rien n&apos;est enregistré sur le site.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-body text-[13px] text-noir hover:text-taupe transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              {INSTA_HANDLE}
            </a>
            <br />
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2.5 font-body text-[13px] text-noir hover:text-taupe transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
              </svg>
              {EMAIL}
            </a>
          </div>
        </div>

        <form
          id="lc-contact"
          action={`mailto:${EMAIL}`}
          method="post"
          encType="text/plain"
          className="lg:col-span-6 lg:col-start-7 space-y-5"
        >
          <div>
            <label htmlFor="contact-prenom" className={LABEL}>Votre prénom</label>
            <input id="contact-prenom" name="prenom" type="text" autoComplete="given-name" className={CHAMP} />
          </div>
          <div>
            <label htmlFor="contact-email" className={LABEL}>Votre email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" className={CHAMP} />
          </div>
          <div>
            <label htmlFor="contact-message" className={LABEL}>Votre message</label>
            <textarea id="contact-message" name="message" rows={5} className={CHAMP} />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2.5 bg-noir text-blanc font-body text-[11px] font-medium tracking-[0.16em] uppercase px-8 py-4 hover:bg-taupe transition-colors duration-300"
          >
            Envoyer mon message
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
      </div>

      {/* Amélioration légère, sans fichier chargé : au lieu du POST mailto brut
          (peu fiable selon la messagerie), on ouvre un message propre avec objet
          et corps pré-remplis. Sans JavaScript, l'action mailto native reste. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var f=document.getElementById('lc-contact');if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();var p=(f.prenom.value||'').trim();var m=(f.email.value||'').trim();var t=(f.message.value||'').trim();var suj='Message de '+(p||'votre site');var corps=t+'\\n\\n'+p+(m?' ('+m+')':'');window.location.href='mailto:${EMAIL}?subject='+encodeURIComponent(suj)+'&body='+encodeURIComponent(corps);});})();`,
        }}
      />
    </section>
  );
}
