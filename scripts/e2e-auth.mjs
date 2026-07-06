// Test bout-en-bout : inscription, session, favori (RLS), profil auto, RGPD.
import { createClient } from '@supabase/supabase-js';
import pg from 'pg';

const URL = 'https://isfvvxyprdysebdqivxx.supabase.co';
const KEY = 'sb_publishable_jMvozJ3YwBwFP8sDHZ2Epg_Cgmp6Ii_';
const PWD = process.env.LC_DB_PWD;
const email = `e2e-${Date.now()}@example.com`;
const password = 'TestCoquette2026!';

const db = new pg.Client({
  host: 'aws-0-eu-west-3.pooler.supabase.com', port: 5432,
  user: 'postgres.isfvvxyprdysebdqivxx', password: PWD,
  database: 'postgres', ssl: { rejectUnauthorized: false },
});

const log = (ok, msg) => console.log(`${ok ? 'OK  ' : 'FAIL'} · ${msg}`);
let uid;

try {
  await db.connect();
  const sb = createClient(URL, KEY);

  // 1. Inscription
  const { data: su, error: e1 } = await sb.auth.signUp({
    email, password, options: { data: { full_name: 'Camille Test' } },
  });
  if (e1) throw new Error('signUp: ' + e1.message);
  uid = su.user.id;
  log(!!uid, `inscription (user créé ${uid.slice(0, 8)}…)`);

  // 2. Confirme l'email en base (simule le clic sur le lien)
  await db.query('update auth.users set email_confirmed_at = now() where id = $1', [uid]);

  // 3. Profil auto-créé par le trigger ?
  const prof = await db.query('select full_name from public.profiles where id = $1', [uid]);
  log(prof.rows[0]?.full_name === 'Camille Test', `profil auto-créé (« ${prof.rows[0]?.full_name} »)`);

  // 4. Connexion
  const { data: si, error: e3 } = await sb.auth.signInWithPassword({ email, password });
  if (e3) throw new Error('signIn: ' + e3.message);
  log(!!si.session, 'connexion (session obtenue)');

  // 5. Ajout d'un favori (RLS doit autoriser : auth.uid() = user_id)
  const { error: e4 } = await sb.from('favorites').insert({ user_id: uid, product_id: 'prod-e2e' });
  log(!e4, `ajout favori${e4 ? ' — ' + e4.message : ''}`);

  // 6. Relecture de ses favoris
  const { data: favs } = await sb.from('favorites').select('product_id');
  log(favs?.length === 1 && favs[0].product_id === 'prod-e2e', `relecture favoris (${favs?.length})`);

  // 7. RLS : un visiteur non connecté ne voit AUCUN favori
  const anon = createClient(URL, KEY);
  const { data: leak } = await anon.from('favorites').select('product_id');
  log((leak?.length ?? 0) === 0, `RLS : anonyme ne voit rien (${leak?.length ?? 0} lignes)`);

  // 8. Suppression de compte (RGPD) via la fonction sécurisée
  const { error: e8 } = await sb.rpc('delete_current_user');
  log(!e8, `suppression compte RGPD${e8 ? ' — ' + e8.message : ''}`);

  // 9. Vérifie l'effacement en cascade
  const gone = await db.query('select count(*)::int n from auth.users where id = $1', [uid]);
  const favGone = await db.query('select count(*)::int n from public.favorites where user_id = $1', [uid]);
  log(gone.rows[0].n === 0 && favGone.rows[0].n === 0, 'cascade : user + favoris effacés');
  uid = null; // déjà supprimé
} catch (e) {
  console.error('ERREUR:', e.message);
} finally {
  if (uid) { try { await db.query('delete from auth.users where id = $1', [uid]); } catch {} }
  await db.end();
}
