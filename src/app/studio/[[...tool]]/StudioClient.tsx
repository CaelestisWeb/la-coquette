'use client';

import dynamic from 'next/dynamic';
import config from '../../../../sanity.config';

// Chargé uniquement dans le navigateur (ssr:false) : le Studio Sanity utilise
// des API client (createContext) qui ne doivent pas être rendues côté serveur.
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((m) => m.NextStudio),
  { ssr: false },
);

export default function StudioClient() {
  return <NextStudio config={config} />;
}
