type Props = {
  children: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

/**
 * Eyebrow minimaliste : libellé en petites capitales largement espacées.
 */
export default function SectionLabel({ children, align = 'left', className = '' }: Props) {
  return (
    <span
      className={`block font-body text-[10px] font-medium tracking-[0.3em] uppercase text-dore ${
        align === 'center' ? 'text-center' : ''
      } ${className}`}
    >
      {children}
    </span>
  );
}
