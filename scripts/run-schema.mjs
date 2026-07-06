// Exécute supabase/schema.sql sur la base, en essayant plusieurs hôtes.
import pg from 'pg';
import { readFileSync } from 'node:fs';

const PWD = process.env.LC_DB_PWD;
const REF = 'isfvvxyprdysebdqivxx';
const SQL = readFileSync(new URL('../supabase/schema.sql', import.meta.url), 'utf8');

const targets = [
  { name: 'pooler session (IPv4) aws-0', host: 'aws-0-eu-west-3.pooler.supabase.com', port: 5432, user: `postgres.${REF}` },
  { name: 'pooler session (IPv4) aws-1', host: 'aws-1-eu-west-3.pooler.supabase.com', port: 5432, user: `postgres.${REF}` },
  { name: 'pooler txn (IPv4) aws-0', host: 'aws-0-eu-west-3.pooler.supabase.com', port: 6543, user: `postgres.${REF}` },
  { name: 'direct db', host: `db.${REF}.supabase.co`, port: 5432, user: 'postgres' },
];

async function tryTarget(t) {
  const client = new pg.Client({
    host: t.host, port: t.port, user: t.user, password: PWD,
    database: 'postgres', ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 12000,
  });
  await client.connect();
  await client.query(SQL);
  const check = await client.query(
    `select table_name from information_schema.tables where table_schema='public' and table_name in ('profiles','favorites') order by table_name;`,
  );
  await client.end();
  return check.rows.map((r) => r.table_name);
}

for (const t of targets) {
  try {
    process.stdout.write(`→ ${t.name} (${t.host}:${t.port})… `);
    const tables = await tryTarget(t);
    console.log(`OK ✓ tables: ${tables.join(', ')}`);
    process.exit(0);
  } catch (e) {
    console.log(`échec: ${e.code || ''} ${e.message}`);
  }
}
console.error('Aucun hôte joignable.');
process.exit(1);
