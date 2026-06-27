'use client';

import dynamic from 'next/dynamic';

// Le Studio Sanity est une application 100% client (React createContext).
// On le charge sans rendu serveur pour qu'il ne soit pas évalué au build.
const StudioClient = dynamic(() => import('./StudioClient'), { ssr: false });

export default function StudioPage() {
  return <StudioClient />;
}
