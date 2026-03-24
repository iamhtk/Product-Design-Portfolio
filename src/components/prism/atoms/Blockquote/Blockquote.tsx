import type { ReactNode } from 'react';
import styles from './Blockquote.module.css';

export type BlockquoteProps = {
  children: ReactNode;
  cite?: string;
  variant?: 'default' | 'primary' | 'success' | 'info';
  className?: string;
};

const variantClassMap = {
  default: styles.variantDefault,
  primary: styles.variantPrimary,
  success: styles.variantSuccess,
  info: styles.variantInfo,
} as const;

export const Blockquote = ({
  children,
  cite,
  variant = 'default',
  className,
}: BlockquoteProps) => {
  const rootClass = [styles.root, variantClassMap[variant], className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <blockquote className={rootClass}>
      <div className={styles.quote}>{children}</div>
      {cite ? (
        <footer className={styles.citation}>— {cite}</footer>
      ) : null}
    </blockquote>
  );
};
