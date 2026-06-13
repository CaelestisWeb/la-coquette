'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSent(true);
      setEmail('');
    }
  }

  return (
    <section className="bg-noir py-20">
      <div className="max-w-2xl mx-auto px-6 text-center reveal">
        <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-or">
          Restez connectée
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-blanc mt-3">
          Rejoignez la <span className="text-or">communauté</span>
        </h2>
        <p className="font-body text-sm text-blanc/50 leading-relaxed mt-5">
          Soyez la première informée des nouvelles créations, des offres exclusives et des coulisses de l'atelier.
        </p>

        {sent ? (
          <div className="mt-10 py-4 px-6 border border-or text-or font-body text-sm tracking-wide">
            Merci ! Vous recevrez bientôt nos actualités. ✨
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-0">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              required
              className="flex-1 bg-blanc/10 border border-blanc/20 text-blanc placeholder:text-blanc/30 font-body text-sm px-5 py-4 outline-none focus:border-or transition-colors"
            />
            <button
              type="submit"
              className="bg-or text-blanc font-body text-xs font-medium tracking-widest uppercase px-8 py-4 hover:bg-blanc hover:text-noir transition-colors duration-300 whitespace-nowrap"
            >
              S'inscrire
            </button>
          </form>
        )}
        <p className="font-body text-[10px] text-blanc/30 mt-4 tracking-wide">
          Aucun spam. Désinscription possible à tout moment.
        </p>
      </div>
    </section>
  );
}
