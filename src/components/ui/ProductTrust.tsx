import { SHIPPING_THRESHOLD } from '@/lib/shipping';

// Signaux de confiance placés LÀ où naît le doute : juste sous le bouton d'achat.
// Strictement monochrome (aucun or), icônes fines. Le seuil de livraison est
// dynamique (source unique shipping.ts), jamais écrit en dur.
const ICON = 'shrink-0 mt-[1px] text-noir';

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-left">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden>
        {children}
      </svg>
      <span className="font-body text-[11px] leading-snug text-taupe">{label}</span>
    </li>
  );
}

export default function ProductTrust() {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-gris pt-6 max-w-sm mx-auto">
      <Item label={`Livraison offerte dès ${SHIPPING_THRESHOLD} €`}>
        <path d="M12 3 4 6.5v7L12 17l8-3.5v-7z" />
        <path d="M4 6.5 12 10l8-3.5" />
        <path d="M12 10v7" />
      </Item>
      <Item label="Expédié sous 3 à 5 jours">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </Item>
      <Item label="Retours sous 14 jours">
        <path d="M4 11h10a4.5 4.5 0 0 1 0 9H9" />
        <path d="M7 8 4 11l3 3" />
      </Item>
      <Item label="Paiement 100 % sécurisé">
        <path d="M12 3l7 3v5c0 4.4-3 7.4-7 8.9-4-1.5-7-4.5-7-8.9V6z" />
        <path d="M9 12l2 2 4-4" />
      </Item>
    </ul>
  );
}
