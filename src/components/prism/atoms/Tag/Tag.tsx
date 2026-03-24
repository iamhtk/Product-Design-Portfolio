import styles from './Tag.module.css';

export type TagProps = {
  label: string;
  onRemove?: () => void;
  variant?: 'default' | 'primary' | 'success';
  disabled?: boolean;
};

const variantClassMap = {
  default: styles.variantDefault,
  primary: styles.variantPrimary,
  success: styles.variantSuccess,
} as const;

export const Tag = ({
  label,
  onRemove,
  variant = 'default',
  disabled = false,
}: TagProps) => {
  const rootClass = [
    styles.root,
    variantClassMap[variant],
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={rootClass}>
      {label}
      {onRemove != null ? (
        <button
          type="button"
          className={styles.remove}
          onClick={disabled ? undefined : onRemove}
          disabled={disabled}
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      ) : null}
    </span>
  );
};
