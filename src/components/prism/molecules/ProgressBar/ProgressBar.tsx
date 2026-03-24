import styles from './ProgressBar.module.css';

export type ProgressBarProps = {
  value: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  animated?: boolean;
};

const sizeClassMap = {
  sm: styles.trackSm,
  md: styles.trackMd,
  lg: styles.trackLg,
} as const;

const variantClassMap = {
  primary: styles.variantPrimary,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  error: styles.variantError,
  info: styles.variantInfo,
} as const;

export const ProgressBar = ({
  value,
  label,
  showValue = false,
  size = 'md',
  variant = 'primary',
  animated = false,
}: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, value));
  const rounded = Math.round(clamped);

  const trackClass = [styles.track, sizeClassMap[size]].join(' ');
  const fillClass = [
    styles.fill,
    variantClassMap[variant],
    animated ? styles.fillAnimated : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.root}>
      {label != null ? (
        <span className={styles.label}>{label}</span>
      ) : null}
      <div className={styles.row}>
        <div className={trackClass}>
          <div
            className={fillClass}
            style={{ width: `${clamped}%` }}
            role="progressbar"
            aria-valuenow={rounded}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        {showValue ? (
          <span className={styles.valueText}>{rounded}%</span>
        ) : null}
      </div>
    </div>
  );
};
