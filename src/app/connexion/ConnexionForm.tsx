'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Mode = 'login' | 'signup';

export default function ConnexionForm() {
  const supabase = createClient();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/compte';
  const linkError = params.get('erreur') === 'lien';

  const [mode, setMode] = useState<Mode>('login');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    linkError ? { type: 'err', text: "Ce lien a expiré ou a déjà été utilisé. Réessaie." } : null,
  );

  const redirectTo =
    typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
      : undefined;

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(next);
        router.refresh();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectTo, data: { full_name: prenom } },
        });
        if (error) throw error;
        if (data.session) {
          router.push(next);
          router.refresh();
        } else {
          setMsg({ type: 'ok', text: "Compte créé. Vérifie ta boîte mail pour confirmer ton adresse." });
        }
      }
    } catch (err) {
      setMsg({ type: 'err', text: translate(err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleMagicLink() {
    if (!email) { setMsg({ type: 'err', text: "Renseigne ton email d'abord." }); return; }
    setLoading(true);
    setMsg(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) throw error;
      setMsg({ type: 'ok', text: `Un lien de connexion a été envoyé à ${email}. Regarde ta boîte mail.` });
    } catch (err) {
      setMsg({ type: 'err', text: translate(err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setMsg(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) { setMsg({ type: 'err', text: translate(error) }); setLoading(false); }
  }

  const input =
    'w-full border border-gris bg-blanc px-4 py-3 rounded font-body text-sm text-noir outline-none focus:border-noir transition-colors';

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="font-display text-4xl text-noir text-center">Mon compte</h1>
      <p className="font-body text-sm text-taupe text-center mt-2 mb-8">
        Retrouve tes favoris et tes commandes, sur tous tes appareils.
      </p>

      {/* Onglets */}
      <div className="flex rounded-full bg-creme p-1 mb-7">
        {(['login', 'signup'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setMsg(null); }}
            className={`flex-1 py-2.5 rounded-full font-body text-xs tracking-[0.12em] uppercase transition-colors ${
              mode === m ? 'bg-noir text-blanc' : 'text-taupe hover:text-noir'
            }`}
          >
            {m === 'login' ? 'Se connecter' : 'Créer un compte'}
          </button>
        ))}
      </div>

      {msg && (
        <p
          className={`font-body text-sm rounded px-4 py-3 mb-5 ${
            msg.type === 'ok'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {msg.text}
        </p>
      )}

      <form onSubmit={handlePassword} className="space-y-3">
        {mode === 'signup' && (
          <input
            className={input}
            aria-label="Prénom"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            autoComplete="given-name"
          />
        )}
        <input
          className={input}
          type="email"
          required
          aria-label="Adresse email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          className={input}
          type="password"
          required
          minLength={6}
          aria-label="Mot de passe"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-noir text-blanc font-body text-xs font-medium tracking-[0.15em] uppercase py-3.5 rounded hover:bg-or transition-colors disabled:opacity-50"
        >
          {loading ? 'Un instant…' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
        </button>
      </form>

      {/* Séparateur */}
      <div className="flex items-center gap-4 my-6">
        <span className="flex-1 h-px bg-gris" />
        <span className="font-body text-[11px] text-taupe tracking-wide uppercase">ou</span>
        <span className="flex-1 h-px bg-gris" />
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={handleMagicLink}
          disabled={loading}
          className="w-full border border-noir text-noir font-body text-xs font-medium tracking-[0.12em] uppercase py-3.5 rounded hover:bg-noir hover:text-blanc transition-colors disabled:opacity-50"
        >
          Recevoir un lien de connexion par email
        </button>
        {process.env.NEXT_PUBLIC_GOOGLE_LOGIN === '1' && (
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full border border-gris text-noir font-body text-sm py-3.5 rounded hover:border-noir transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
            </svg>
            Continuer avec Google
          </button>
        )}
      </div>
    </div>
  );
}

function translate(err: unknown): string {
  const m = (err as { message?: string })?.message || '';
  if (/Invalid login credentials/i.test(m)) return 'Email ou mot de passe incorrect.';
  if (/User already registered/i.test(m)) return 'Un compte existe déjà avec cet email. Connecte-toi.';
  if (/Email not confirmed/i.test(m)) return "Confirme d'abord ton email (lien reçu par mail).";
  if (/provider is not enabled/i.test(m)) return "La connexion Google n'est pas encore activée.";
  if (/rate limit|too many/i.test(m)) return 'Trop de tentatives, réessaie dans quelques minutes.';
  return m || 'Une erreur est survenue. Réessaie.';
}
