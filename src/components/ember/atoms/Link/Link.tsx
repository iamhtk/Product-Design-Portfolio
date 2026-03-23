import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Link.module.css';

export type LinkProps = {
  href: string;
  children: ReactNode;
  variant?: 'default' | 'primary';
  underline?: 'always' | 'hover' | 'never';
  disabled?: boolean;
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;

export const Link = ({
  href,
  children,
  variant = 'default',
  underline = 'hover',
  disabled = false,
  external = false,
  className,
  ...anchorRest
}: LinkProps) => {
  const variantClass =
    variant === 'primary' ? styles.variantPrimary : styles.variantDefault;

  const underlineClass =
    underline === 'always'
      ? styles.underlineAlways
      : underline === 'never'
        ? styles.underlineNever
        : styles.underlineHover;

  const rootClass = [
    styles.root,
    variantClass,
    underlineClass,
    disabled ? styles.disabled : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (disabled) {
    return (
      <span className={rootClass} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <a
      {...anchorRest}
      className={rootClass}
      href={href}
      target={external ? '_blank' : anchorRest.target}
      rel={external ? 'noopener noreferrer' : anchorRest.rel}
    >
      {children}
    </a>
  );
};
