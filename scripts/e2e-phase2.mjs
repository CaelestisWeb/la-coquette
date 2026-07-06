// Test bout-en-bout phase 2 : commandes + panier synchronisé (RLS).
import { createClient } from '@supabase/supabase-js';
import pg from 'pg';

const URL = 'https://isfvvxyprdysebdqivxx.supabase.co';
const KEY = 'sb_publishable_jMvozJ3YwBwFP8sDHZ2Epg_Cgmp6Ii_';
const PWD = process.env.LC_DB_PWD;
const email = `e2e2-${Date.now()}@example.com`;
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
  const { data: su } = await sb.auth.signUp({ email, password, options: { data: { full_name: 'Julie Test' } } });
  uid = su.user.id;
  await db.query('update auth.users set email_confirmed_at = now() where id = $1', [uid]);
  await sb.auth.signInWithPassword({ email, password });
  log(true, `compte de test prêt (${uid.slice(0, 8)}…)`);

  // COMMANDES
  const order = {
    user_id: uid, reference: 'LC-E2E-1', status: 'paid',
    subtotal: 79.98, shipping: 2.99, discount: 0, total: 82.97,
    items: [{ name: 'Créoles dorées', quantity: 2, price: 39.99, image: 'https://x/y.jpg' }],
    customer: { prenom: 'Julie', nom: 'Test', ville: 'Valence' },
  };
  const { error: eIns } = await sb.from('orders').insert(order);
  log(!eIns, `enregistrement commande${eIns ? ' — ' + eIns.message : ''}`);
  const { data: myOrders } = await sb.from('orders').select('reference, total, items');
  log(myOrders?.length === 1 && myOrders[0].total === 82.97, `relecture commande (${myOrders?.length}, total ${myOrders?.[0]?.total})`);
  log((myOrders?.[0]?.items?.[0]?.name) === 'Créoles dorées', 'articles de la commande conservés (jsonb)');

  // PANIER SYNCHRONISÉ
  const cart = [{ id: 'p1', name: 'Cabochon', price: 39.99, image: 'x', quantity: 1 }];
  const { error: eCart } = await sb.from('carts').upsert({ user_id: uid, items: cart, updated_at: new Date().toISOString() });
  log(!eCart, `sauvegarde panier${eCart ? ' — ' + eCart.message : ''}`);
  // upsert (mise à jour) : simule un autre appareil qui modifie le panier
  const { error: eCart2 } = await sb.from('carts').upsert({ user_id: uid, items: [...cart, { id: 'p2', name: 'Créole', price: 39.99, image: 'x', quantity: 3 }], updated_at: new Date().toISOString() });
  const { data: savedCart } = await sb.from('carts').select('items').eq('user_id', uid).maybeSingle();
  log(!eCart2 && savedCart?.items?.length === 2, `panier mis à jour et relu (${savedCart?.items?.length} articles)`);

  // RLS : un visiteur non connecté ne voit ni commandes ni paniers
  const anon = createClient(URL, KEY);
  const { data: leakO } = await anon.from('orders').select('id');
  const { data: leakC } = await anon.from('carts').select('user_id');
  log((leakO?.length ?? 0) === 0 && (leakC?.length ?? 0) === 0, `RLS : anonyme ne voit rien (${leakO?.length ?? 0} cmd, ${leakC?.length ?? 0} panier)`);

  // Cascade à la suppression du compte
  await sb.rpc('delete_current_user');
  const o = await db.query('select count(*)::int n from public.orders where user_id=$1', [uid]);
  const c = await db.query('select count(*)::int n from public.carts where user_id=$1', [uid]);
  log(o.rows[0].n === 0 && c.rows[0].n === 0, 'cascade : commandes + panier effacés à la suppression du compte');
  uid = null;
} catch (e) {
  console.error('ERREUR:', e.message);
} finally {
  if (uid) { try { await db.query('delete from auth.users where id=$1', [uid]); } catch {} }
  await db.end();
}
