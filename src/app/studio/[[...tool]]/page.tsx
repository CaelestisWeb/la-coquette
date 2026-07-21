import StudioClient from './StudioClient';

// Studio d'édition Sanity, monté côté client uniquement.
export const dynamic = 'force-static';

export const metadata = {
  title: 'La Coquette, Studio',
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <StudioClient />;
}
