import Link from 'next/link';

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const base = 'inline-flex items-center justify-center font-body font-normal tracking-[0.22em] text-[11px] uppercase transition-colors duration-500 cursor-pointer rounded';

const variants = {
  primary:   'bg-noir text-blanc border border-dore px-9 py-4 hover:bg-or',
  secondary: 'border border-dore text-noir px-9 py-4 hover:text-or',
  ghost:     'text-noir underline-offset-4 hover:underline hover:text-or px-0 py-1',
};

const sizes = {
  sm: 'text-[10px] px-5 py-2.5',
  md: '',
  lg: 'text-xs px-10 py-4',
};

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${size !== 'md' ? sizes[size] : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
