import styles from './Badge.module.css';

export type BadgeProps = {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
};

const variantClassMap = {
  primary: styles.variantPrimary,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  error: styles.variantError,
  info: styles.variantInfo,
  neutral: styles.variantNeutral,
} as const;

export const Badge = ({
  label,
  variant = 'primary',
  size = 'md',
  dot = false,
}: BadgeProps) => {
  const rootClass = [
    styles.root,
    variantClassMap[variant],
    size === 'sm' ? styles.sizeSm : styles.sizeMd,
  ].join(' ');

  return (
    <span className={rootClass}>
      {dot ? <span className={styles.dot} aria-hidden="true" /> : null}
      {label}
    </span>
  );
};
