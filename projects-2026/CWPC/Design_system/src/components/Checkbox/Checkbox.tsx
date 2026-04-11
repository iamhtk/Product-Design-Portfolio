import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Label/contrast for dark backgrounds */
  onDark?: boolean;
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  id,
  onDark,
  className = "",
  ...rest
}: CheckboxProps) {
  const uid = useId();
  const inputId = id ?? `cwpc-cb-${uid}`;

  return (
    <label
      htmlFor={inputId}
      className={[
        styles.root,
        onDark ? styles.rootOnDark : "",
        checked ? styles.checked : "",
        disabled ? styles.rootDisabled : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        id={inputId}
        type="checkbox"
        className={styles.input}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />
      <span className={styles.box} aria-hidden>
        {checked && (
          <svg className={styles.check} viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label != null && <span className={styles.label}>{label}</span>}
    </label>
  );
}
