import type { ReactNode } from 'react';
import styles from './StatCard.module.css';

export type StatCardProps = {
  value: string;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'primary' | 'success' | 'info' | 'warning';
  icon?: ReactNode;
  description?: string;
};

const variantClassMap = {
  primary: styles.variantPrimary,
  success: styles.variantSuccess,
  info: styles.variantInfo,
  warning: styles.variantWarning,
} as const;

export const StatCard = ({
  value,
  label,
  trend,
  trendValue,
  variant = 'primary',
  icon,
  description,
}: StatCardProps) => {
  const rootClass = [styles.root, variantClassMap[variant]]
    .filter(Boolean)
    .join(' ');

  const trendClass =
    trend === 'up'
      ? styles.trendUp
      : trend === 'down'
        ? styles.trendDown
        : trend === 'neutral'
          ? styles.trendNeutral
          : '';

  const arrow =
    trend === 'up' ? '↑' : trend === 'down' ? '↓' : trend === 'neutral' ? '→' : null;

  return (
    <article className={rootClass}>
      {icon != null ? <div className={styles.iconSlot}>{icon}</div> : null}
      <div className={styles.valueRow}>
        <p className={styles.value}>{value}</p>
        {trend != null && arrow != null ? (
          <span className={[styles.trend, trendClass].filter(Boolean).join(' ')}>
            <span className={styles.trendArrow} aria-hidden>
              {arrow}
            </span>
            {trendValue != null ? (
              <span className={styles.trendValue}>{trendValue}</span>
            ) : null}
          </span>
        ) : null}
      </div>
      <p className={styles.label}>{label}</p>
      {description != null ? (
        <p className={styles.description}>{description}</p>
      ) : null}
    </article>
  );
};
