import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Field.module.css';

export type FieldProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  status?: 'default' | 'hover' | 'focus' | 'error' | 'disabled';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'disabled' | 'size'
>;

export const Field = ({
  placeholder,
  value,
  onChange,
  status = 'default',
  iconLeft,
  iconRight,
  className,
  ...inputRest
}: FieldProps) => {
  const isDisabled = status === 'disabled';
  const interactive = status === 'default';
  const forceHover = status === 'hover';
  const forceFocus = status === 'focus';
  const isError = status === 'error';

  const rootClass = [
    styles.root,
    interactive ? styles.interactive : '',
    forceHover ? styles.forceHover : '',
    forceFocus ? styles.forceFocus : '',
    isError ? styles.statusError : '',
    isDisabled ? styles.statusDisabled : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass}>
      {iconLeft != null ? (
        <span className={styles.iconSlot}>{iconLeft}</span>
      ) : null}
      <input
        {...inputRest}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        disabled={isDisabled}
        aria-invalid={isError || undefined}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {iconRight != null ? (
        <span className={styles.iconSlot}>{iconRight}</span>
      ) : null}
    </div>
  );
};
