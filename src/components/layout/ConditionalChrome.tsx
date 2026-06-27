'use client';

import { usePathname } from 'next/navigation';

const BARE_PREFIXES = ['/bientot', '/studio'];

/**
 * Affiche l'habillage du site (menu, pied de page, panier) sur les pages
 * normales, mais le masque sur la page d'attente et le Studio, qui doivent
 * rester épurés.
 */
export default function ConditionalChrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || '/';
  const bare = BARE_PREFIXES.some((p) => pathname.startsWith(p));

  if (bare) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
