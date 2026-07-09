'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AccountActions() {
  const supabase = createClient();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function logout() {
    setBusy(true);
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  async function deleteAccount() {
    if (!confirm(
      'Supprimer définitivement votre compte ? Vos favoris seront effacés. Cette action est irréversible.',
    )) return;
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/account/delete', { method: 'POST' });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Suppression impossible');
      await supabase.auth.signOut();
      router.push('/');
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Suppression impossible');
      setBusy(false);
    }
  }

  return (
    <div className="mt-10 pt-8 border-t border-gris">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          onClick={logout}
          disabled={busy}
          className="font-body text-xs tracking-[0.12em] uppercase text-noir border border-noir px-5 py-2.5 rounded hover:bg-noir hover:text-blanc transition-colors disabled:opacity-50"
        >
          Se déconnecter
        </button>
        <button
          onClick={deleteAccount}
          disabled={busy}
          className="font-body text-xs tracking-wide text-taupe hover:text-red-600 transition-colors disabled:opacity-50"
        >
          Supprimer mon compte
        </button>
      </div>
      {err && <p className="font-body text-sm text-red-600 mt-3">{err}</p>}
    </div>
  );
}
