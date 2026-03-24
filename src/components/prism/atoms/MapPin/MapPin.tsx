import type { ReactNode } from 'react';
import styles from './MapPin.module.css';

export type MapPinProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'error' | 'info' | 'warning';
  label?: string;
  active?: boolean;
  onClick?: () => void;
};

const sizeClassMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const colorClassMap = {
  primary: styles.colorPrimary,
  success: styles.colorSuccess,
  error: styles.colorError,
  info: styles.colorInfo,
  warning: styles.colorWarning,
} as const;

export const MapPin = ({
  size = 'md',
  color = 'primary',
  label,
  active = false,
  onClick,
}: MapPinProps) => {
  const interactive = onClick != null;
  const rootClass = [
    styles.root,
    interactive ? styles.interactive : '',
    active ? styles.active : '',
  ]
    .filter(Boolean)
    .join(' ');

  const pinClass = [
    styles.pin,
    sizeClassMap[size],
    colorClassMap[color],
  ].join(' ');

  const body: ReactNode = (
    <>
      <div className={styles.pinWrap}>
        <div className={pinClass}>
          <span className={styles.dot} aria-hidden />
        </div>
      </div>
      {label != null ? <span className={styles.label}>{label}</span> : null}
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        className={rootClass}
        onClick={onClick}
        aria-pressed={active || undefined}
      >
        {body}
      </button>
    );
  }

  return (
    <span
      className={rootClass}
      role="img"
      aria-label={label ?? 'Location marker'}
    >
      {body}
    </span>
  );
};
