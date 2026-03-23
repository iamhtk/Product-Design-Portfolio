import styles from './Divider.module.css';

export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  variant?: 'default' | 'subtle' | 'strong';
  spacing?: 'sm' | 'md' | 'lg';
};

const variantClassMap = {
  default: styles.variantDefault,
  subtle: styles.variantSubtle,
  strong: styles.variantStrong,
} as const;

const spacingClassMap = {
  sm: styles.spacingSm,
  md: styles.spacingMd,
  lg: styles.spacingLg,
} as const;

const labelSpacingClassMap = {
  sm: styles.labelSpacingSm,
  md: styles.labelSpacingMd,
  lg: styles.labelSpacingLg,
} as const;

export const Divider = ({
  orientation = 'horizontal',
  label,
  variant = 'default',
  spacing = 'md',
}: DividerProps) => {
  const variantClass = variantClassMap[variant];
  const spacingClass = spacingClassMap[spacing];

  if (label != null && label.length > 0 && orientation === 'horizontal') {
    const wrapClass = [
      styles.withLabel,
      labelSpacingClassMap[spacing],
    ].join(' ');
    const lineClass = [styles.line, variantClass].join(' ');
    return (
      <div className={wrapClass} role="separator" aria-label={label}>
        <hr className={lineClass} />
        <span className={styles.label}>{label}</span>
        <hr className={lineClass} />
      </div>
    );
  }

  const axisClass =
    orientation === 'horizontal' ? styles.horizontal : styles.vertical;

  const rootClass = [
    styles.root,
    axisClass,
    variantClass,
    spacingClass,
  ].join(' ');

  return <hr className={rootClass} />;
};
