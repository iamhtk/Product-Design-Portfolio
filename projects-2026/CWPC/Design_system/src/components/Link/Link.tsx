import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Link.module.css";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "default" | "subtle" | "inline";
  onDark?: boolean;
}

export function Link({
  children,
  variant = "default",
  onDark,
  className = "",
  ...rest
}: LinkProps) {
  return (
    <a
      className={[
        styles.link,
        variant === "subtle" ? styles.subtle : "",
        variant === "inline" ? styles.inline : "",
        onDark ? styles.onDark : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </a>
  );
}
