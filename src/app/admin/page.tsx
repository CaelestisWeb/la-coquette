'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);
  const [storage, setStorage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function call(action: 'status' | 'on' | 'off') {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, action }),
      });
      const data = await res.json();
      if (res.status === 401) {
        setError('Mot de passe incorrect.');
        return;
      }
      setAuthed(true);
      setComingSoon(data.comingSoon);
      setStorage(data.storage);
      if (data.error) setError(data.error);
    } catch {
      setError('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ivoire flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <h1 className="font-display text-3xl text-noir text-center mb-2">Espace administration</h1>
        <p className="font-body text-xs text-taupe text-center mb-10">La Coquette</p>

        {!authed ? (
          <form
            onSubmit={(e) => { e.preventDefault(); call('status'); }}
            className="space-y-4"
          >
            <label className="font-body text-[10px] tracking-widest uppercase text-taupe block mb-1 text-center">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full border border-gris bg-creme px-4 py-3 font-body text-sm text-noir outline-none focus:border-noir transition-colors text-center"
            />
            {error && <p className="font-body text-sm text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-noir text-blanc border border-dore font-body text-xs font-medium tracking-widest uppercase py-4 rounded hover:bg-or transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-creme border border-gris rounded-lg p-6 text-center">
              <p className="font-body text-[10px] tracking-widest uppercase text-taupe mb-3">État du site</p>
              {comingSoon ? (
                <p className="font-display text-2xl text-noir">
                  Mode <span className="text-dore-mat">bientôt disponible</span>
                </p>
              ) : (
                <p className="font-display text-2xl text-noir">
                  Boutique <span className="text-or">en ligne</span>
                </p>
              )}
              <p className="font-body text-xs text-taupe mt-3 leading-relaxed">
                {comingSoon
                  ? 'Les visiteurs voient la page « boutique bientôt disponible ».'
                  : 'Les visiteurs accèdent à la boutique normalement.'}
              </p>
            </div>

            {!storage && (
              <p className="font-body text-xs text-red-500 leading-relaxed text-center">
                Le stockage n'est pas encore branché : l'interrupteur ci-dessous ne pourra pas mémoriser le changement tant que ce n'est pas configuré.
              </p>
            )}

            <div className="grid grid-cols-1 gap-3">
              {comingSoon ? (
                <button
                  onClick={() => call('off')}
                  disabled={loading}
                  className="w-full bg-noir text-blanc border border-dore font-body text-xs font-medium tracking-widest uppercase py-4 rounded hover:bg-or transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? '…' : 'Mettre la boutique EN LIGNE'}
                </button>
              ) : (
                <button
                  onClick={() => call('on')}
                  disabled={loading}
                  className="w-full border border-dore text-dore-mat font-body text-xs font-medium tracking-widest uppercase py-4 rounded hover:bg-dore hover:text-blanc transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? '…' : 'Afficher « bientôt disponible »'}
                </button>
              )}
            </div>

            {error && <p className="font-body text-sm text-red-500 text-center">{error}</p>}

            <p className="font-body text-[11px] text-taupe text-center leading-relaxed">
              Astuce : tant que vous êtes connecté ici, vous pouvez parcourir le vrai site même en mode « bientôt disponible ».
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
