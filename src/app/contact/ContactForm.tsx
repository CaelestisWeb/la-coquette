'use client';

import { useState } from 'react';

const inputClass = "w-full border border-gris bg-creme font-body text-sm text-noir px-4 py-3 outline-none focus:border-or transition-colors placeholder:text-taupe/60 text-left";

export default function ContactForm() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '', entreprise: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-creme p-10 text-center flex flex-col items-center gap-5 rounded-lg">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.2">
          <circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/>
        </svg>
        <h3 className="font-display text-2xl text-noir">Message envoyé !</h3>
        <p className="font-body text-sm text-taupe">Merci. Caro vous répondra dans les plus brefs délais.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-creme p-8 space-y-5 rounded-lg text-center">
      <h2 className="font-display text-2xl text-noir mb-6">Envoyer un message</h2>

      {/* Honeypot anti-spam — caché aux humains, piège à robots */}
      <input
        type="text"
        name="entreprise"
        value={form.entreprise}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="font-body text-[10px] tracking-widest uppercase text-taupe block mb-2 text-center">Nom *</label>
          <input name="nom" value={form.nom} onChange={handleChange} required placeholder="Votre nom" className={inputClass} />
        </div>
        <div>
          <label className="font-body text-[10px] tracking-widest uppercase text-taupe block mb-2 text-center">Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="votre@email.fr" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="font-body text-[10px] tracking-widest uppercase text-taupe block mb-2 text-center">Sujet</label>
        <select name="sujet" value={form.sujet} onChange={handleChange} className={inputClass}>
          <option value="">Choisir un sujet</option>
          <option>Commande</option>
          <option>Bijou personnalisé</option>
          <option>Question sur un produit</option>
          <option>Autre</option>
        </select>
      </div>
      <div>
        <label className="font-body text-[10px] tracking-widest uppercase text-taupe block mb-2 text-center">Message *</label>
        <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Votre message..." className={`${inputClass} resize-none`} />
      </div>
      {error && <p className="font-body text-xs text-red-500">{error}</p>}
      <button type="submit" disabled={loading} className="w-full bg-noir text-blanc font-body font-medium text-xs tracking-widest uppercase py-4 hover:bg-or transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? 'Envoi en cours…' : 'Envoyer le message'}
      </button>
    </form>
  );
}
