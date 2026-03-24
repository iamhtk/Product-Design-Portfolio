import { useCallback, useState, type TransitionEvent } from 'react';
import styles from './Alert.module.css';

export type AlertProps = {
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
};

const variantRootMap = {
  success: styles.variantSuccess,
  error: styles.variantError,
  warning: styles.variantWarning,
  info: styles.variantInfo,
} as const;

const variantIconMap = {
  success: styles.iconSuccess,
  error: styles.iconError,
  warning: styles.iconWarning,
  info: styles.iconInfo,
} as const;

const iconLetter: Record<NonNullable<AlertProps['variant']>, string> = {
  success: 'S',
  error: 'E',
  warning: 'W',
  info: 'i',
};

export const Alert = ({
  message,
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
}: AlertProps) => {
  const [exiting, setExiting] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  const handleTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== 'opacity') return;
      if (!exiting) return;
      setUnmounted(true);
      onDismiss?.();
    },
    [exiting, onDismiss],
  );

  const handleDismiss = () => {
    setExiting(true);
  };

  if (unmounted) {
    return null;
  }

  const rootClass = [
    styles.root,
    variantRootMap[variant],
    exiting ? styles.rootDismissed : '',
  ]
    .filter(Boolean)
    .join(' ');

  const iconClass = [styles.icon, variantIconMap[variant]].join(' ');

  return (
    <div
      className={rootClass}
      role="alert"
      onTransitionEnd={handleTransitionEnd}
    >
      <span className={iconClass} aria-hidden="true">
        {iconLetter[variant]}
      </span>
      <div className={styles.body}>
        {title != null ? <p className={styles.title}>{title}</p> : null}
        <p className={styles.message}>{message}</p>
      </div>
      {dismissible ? (
        <button
          type="button"
          className={styles.dismiss}
          aria-label="Dismiss alert"
          onClick={handleDismiss}
        >
          ×
        </button>
      ) : null}
    </div>
  );
};
