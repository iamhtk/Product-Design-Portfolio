import { useId } from 'react';
import type { ReactNode } from 'react';
import { Field } from '../../atoms/Field/Field';
import type { FieldProps } from '../../atoms/Field/Field';
import { Label } from '../../atoms/Label/Label';
import styles from './Input.module.css';

export type InputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  hint?: string;
  error?: string;
  required?: boolean;
  showHintIcon?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  type?: 'text' | 'email' | 'password';
  status?: 'default' | 'hover' | 'focus' | 'error' | 'disabled';
  width?: string;
};

export const Input = ({
  label,
  placeholder,
  value,
  onChange,
  hint,
  error,
  required = false,
  showHintIcon = false,
  iconLeft,
  iconRight,
  type: inputType = 'text',
  status = 'default',
  width,
}: InputProps) => {
  const baseId = useId();
  const inputId = `input-${baseId}`;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const hasError = Boolean(error?.trim()) || status === 'error';
  const errorMessage = error?.trim() ?? '';

  const fieldStatus: FieldProps['status'] =
    status === 'disabled'
      ? 'disabled'
      : hasError
        ? 'error'
        : status;

  const showHintRow = !hasError && Boolean(hint);
  const showErrorRow = hasError && Boolean(errorMessage);

  const describedBy =
    showErrorRow ? errorId : showHintRow ? hintId : undefined;

  return (
    <div
      className={styles.root}
      style={width !== undefined ? { width } : undefined}
    >
      <Label
        htmlFor={inputId}
        text={label}
        required={required}
        hint={showHintIcon}
      />
      <Field
        id={inputId}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        status={fieldStatus}
        iconLeft={iconLeft}
        iconRight={iconRight}
        aria-describedby={describedBy}
      />
      {showHintRow ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {showErrorRow ? (
        <p id={errorId} className={styles.error} role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
