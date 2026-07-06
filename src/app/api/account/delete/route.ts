import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Suppression du compte (RGPD, droit à l'effacement). La cliente doit être
// connectée ; on appelle une fonction SQL sécurisée qui supprime SON propre
// compte. Favoris et profil sont effacés automatiquement (cascade).
export async function POST() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return NextResponse.json({ error: 'Non connectée' }, { status: 401 });
  }

  const { error } = await supabase.rpc('delete_current_user');
  if (error) {
    console.error('[account/delete]', error);
    return NextResponse.json({ error: 'Suppression impossible pour le moment.' }, { status: 500 });
  }

  await supabase.auth.signOut();
  return NextResponse.json({ ok: true });
}
