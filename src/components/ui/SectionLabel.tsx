type Props = {
  children: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

/**
 * Eyebrow éditorial : filet doré + libellé en petites capitales espacées.
 * En version centrée, le filet encadre le texte des deux côtés.
 */
export default function SectionLabel({ children, align = 'left', className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-body text-[10px] font-semibold tracking-[0.28em] uppercase text-or ${className}`}
    >
      <span className="block w-8 h-px bg-or/55" aria-hidden />
      {children}
      {align === 'center' && <span className="block w-8 h-px bg-or/55" aria-hidden />}
    </span>
  );
}
