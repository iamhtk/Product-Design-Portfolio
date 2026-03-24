import styles from './Loader.module.css';

export type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'info';
  label?: string;
};

const sizeClassMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const variantClassMap = {
  primary: styles.variantPrimary,
  success: styles.variantSuccess,
  info: styles.variantInfo,
} as const;

export const Loader = ({
  size = 'md',
  variant = 'primary',
  label,
}: LoaderProps) => {
  const spinnerClass = [
    styles.spinner,
    sizeClassMap[size],
    variantClassMap[variant],
  ].join(' ');

  return (
    <div className={styles.root} role="status" aria-live="polite">
      {label != null ? (
        <span className={styles.visuallyHidden}>{label}</span>
      ) : null}
      <span className={spinnerClass} aria-hidden="true" />
    </div>
  );
};
