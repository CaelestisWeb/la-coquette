'use client';

import { useState } from 'react';

type Etat = 'repos' | 'envoi' | 'envoye' | 'erreur';

const champ =
  'w-full bg-transparent border-b border-gris focus:border-noir outline-none px-0 py-3 font-body text-[15px] text-noir placeholder:text-taupe/60 transition-colors';

export default function ContactForm() {
  const [etat, setEtat] = useState<Etat>('repos');
  const [erreur, setErreur] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === 'envoi') return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    setEtat('envoi');
    setErreur('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: fd.get('nom'),
          email: fd.get('email'),
          message: fd.get('message'),
          societe: fd.get('societe'),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || 'Envoi impossible.');
      setEtat('envoye');
      form.reset();
    } catch (err) {
      setErreur(err instanceof Error ? err.message : 'Envoi impossible.');
      setEtat('erreur');
    }
  }

  if (etat === 'envoye') {
    return (
      <div role="status" className="border border-gris px-7 py-10">
        <p className="font-display text-2xl text-noir">Message bien reçu.</p>
        <p className="font-body text-sm text-taupe leading-relaxed mt-3">
          Merci, je vous réponds personnellement, en général sous 48 heures.
        </p>
        <button
          type="button"
          onClick={() => setEtat('repos')}
          className="mt-6 font-body text-[12px] tracking-[0.06em] text-noir border-b border-noir/25 hover:border-noir pb-0.5 transition-colors"
        >
          Écrire un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <div>
        <label htmlFor="nom" className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-taupe mb-1">
          Votre nom
        </label>
        <input id="nom" name="nom" type="text" required autoComplete="name" maxLength={80} className={champ} placeholder="Marie Dupont" />
      </div>

      <div>
        <label htmlFor="email" className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-taupe mb-1">
          Votre email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" maxLength={160} className={champ} placeholder="marie@exemple.fr" />
      </div>

      <div>
        <label htmlFor="message" className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-taupe mb-1">
          Votre message
        </label>
        <textarea id="message" name="message" required rows={4} maxLength={3000} className={`${champ} resize-none`} placeholder="Une envie, une question, une idée de cadeau" />
      </div>

      {/* Champ piège anti-robot, masqué aux personnes et aux lecteurs d'écran */}
      <div aria-hidden className="hidden">
        <label htmlFor="societe">Société</label>
        <input id="societe" name="societe" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {etat === 'erreur' && (
          <p className="font-body text-sm text-noir border-l-2 border-noir pl-3">{erreur}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
        <button
          type="submit"
          disabled={etat === 'envoi'}
          className="inline-flex items-center gap-2.5 bg-noir text-blanc font-body text-[11px] font-medium tracking-[0.16em] uppercase px-8 py-4 hover:bg-taupe disabled:opacity-60 transition-colors duration-300"
        >
          {etat === 'envoi' ? 'Envoi en cours' : 'Envoyer le message'}
        </button>
        <p className="font-body text-[12px] text-taupe leading-relaxed max-w-xs">
          Vos informations servent uniquement à vous répondre, et ne sont transmises à personne.
        </p>
      </div>
    </form>
  );
}
