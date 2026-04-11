import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Badge.module.css";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?:
    | "default"
    | "primary"
    | "information"
    | "success"
    | "warning"
    | "danger"
    | "info";
}

export function Badge({
  children,
  variant = "default",
  className = "",
  ...rest
}: BadgeProps) {
  return (
    <span
      className={[
        styles.badge,
        variant === "primary" ? styles.primary : "",
        variant === "information" ? styles.information : "",
        variant === "success" ? styles.success : "",
        variant === "warning" ? styles.warning : "",
        variant === "danger" ? styles.danger : "",
        variant === "info" ? styles.info : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </span>
  );
}
