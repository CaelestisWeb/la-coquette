import { readFileSync } from 'fs';
import { createClient } from '@sanity/client';
import { HOME_DEFAULTS, SETTINGS_DEFAULTS, FAQ_DEFAULTS, CONTACT_DEFAULTS } from '../src/sanity/lib/contentDefaults';

for (const l of readFileSync('.env.local', 'utf8').split('\n')) {
  const m = l.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

const client = createClient({
  projectId: 'nuwh7dyu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const keys = <T,>(arr: T[]) => arr.map((o, i) => ({ ...o, _key: `k${i}` }));

async function main() {
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    ...HOME_DEFAULTS,
    reassuranceItems: keys(HOME_DEFAULTS.reassuranceItems),
    valuesItems: keys(HOME_DEFAULTS.valuesItems),
    testimonials: keys(HOME_DEFAULTS.testimonials),
  });
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    ...SETTINGS_DEFAULTS,
  });
  await client.createOrReplace({
    _id: 'faqPage',
    _type: 'faqPage',
    ...FAQ_DEFAULTS,
    items: keys(FAQ_DEFAULTS.items),
  });
  await client.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    ...CONTACT_DEFAULTS,
  });
  console.log('Contenu accueil + FAQ + contact + réglages remplis dans Sanity.');
}

main().catch((e) => {
  console.error('ERREUR:', e?.message || e);
  process.exit(1);
});
