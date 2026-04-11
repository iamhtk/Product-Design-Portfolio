import { useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  /** Label + hint for dark UI (Figma input on charcoal) */
  onDark?: boolean;
  labelAccessory?: ReactNode;
}

export function TextArea({
  label,
  optional,
  hint,
  error,
  id,
  onDark,
  labelAccessory,
  className = "",
  disabled,
  ...rest
}: TextAreaProps) {
  const uid = useId();
  const inputId = id ?? `cwpc-ta-${uid}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errId = error ? `${inputId}-err` : undefined;

  return (
    <div className={`${styles.root} ${className}`.trim()}>
      {label != null && (
        <div className={styles.labelRow}>
          <label
            htmlFor={inputId}
            className={`${styles.label} ${onDark ? styles.labelOnDark : ""}`.trim()}
          >
            {label}
            {optional && <span> (optional)</span>}
          </label>
          {labelAccessory}
        </div>
      )}
      <textarea
        id={inputId}
        className={[styles.textarea, error ? styles.error : ""]
          .filter(Boolean)
          .join(" ")}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errId].filter(Boolean).join(" ") || undefined}
        {...rest}
      />
      {hint != null && !error && (
        <span
          id={hintId}
          className={`${styles.hint} ${onDark ? styles.hintOnDark : ""}`.trim()}
        >
          {hint}
        </span>
      )}
      {error != null && (
        <span id={errId} className={`${styles.hint} ${styles.hintError}`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
