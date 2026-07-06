import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestion de la boutique',
  robots: { index: false, follow: false },
};

export default function GestionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
