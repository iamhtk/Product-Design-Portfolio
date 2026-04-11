import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "default" | "outlined" | "transparent";
export type ButtonTone = "information" | "primary" | "success";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma `Type` */
  variant?: ButtonVariant;
  /** Filled button surface (ignored when outlined/transparent, except disabled) */
  tone?: ButtonTone;
  children: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

/**
 * CWPC design-system button from Figma (`Button` component set).
 * — default: filled + border (information / primary / success)
 * — outlined: white fill, blue text (#0d72ff)
 * — transparent: no fill, blue text
 */
export function Button({
  variant = "default",
  tone = "information",
  iconLeft,
  iconRight,
  children,
  className = "",
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const filledClass =
    tone === "primary"
      ? styles.filledPrimary
      : tone === "success"
        ? styles.filledSuccess
        : styles.filledInformation;

  const variantClass = disabled
    ? styles.disabled
    : variant === "outlined"
      ? styles.outlined
      : variant === "transparent"
        ? styles.transparent
        : filledClass;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.base} ${variantClass} ${className}`.trim()}
      {...rest}
    >
      {iconLeft != null && <span className={styles.icon}>{iconLeft}</span>}
      <span className={styles.label}>{children}</span>
      {iconRight != null && <span className={styles.icon}>{iconRight}</span>}
    </button>
  );
}
