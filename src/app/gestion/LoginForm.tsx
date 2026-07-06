'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/gestion/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setError('Mot de passe incorrect.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-creme rounded-xl p-8 text-center shadow-sm">
        <h1 className="font-display text-3xl text-noir">Gestion de la boutique</h1>
        <p className="font-body text-sm text-taupe mt-2 mb-6">Espace réservé. Entrez le mot de passe.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          autoFocus
          className="w-full border border-gris bg-blanc px-4 py-3 rounded font-body text-sm text-noir outline-none focus:border-noir transition-colors text-center"
        />
        {error && <p className="font-body text-xs text-red-500 mt-3">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full mt-5 bg-noir text-blanc font-body text-xs font-medium tracking-widest uppercase py-3.5 rounded hover:bg-or transition-colors disabled:opacity-50"
        >
          {loading ? 'Connexion…' : 'Entrer'}
        </button>
      </form>
    </div>
  );
}
