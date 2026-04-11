import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./MenuItem.module.css";

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  destructive?: boolean;
  /** Use when menu sits on dark card background */
  onDark?: boolean;
}

export function MenuItem({
  children,
  destructive,
  onDark,
  disabled,
  className = "",
  type = "button",
  ...rest
}: MenuItemProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        styles.item,
        onDark ? styles.onDark : "",
        destructive ? styles.destructive : "",
        disabled ? styles.disabled : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
