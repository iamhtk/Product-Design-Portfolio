import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Tag.module.css";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "default" | "primary" | "success";
  onRemove?: () => void;
  removeLabel?: string;
  onDark?: boolean;
}

export function Tag({
  children,
  variant = "default",
  onRemove,
  removeLabel = "Remove",
  onDark,
  className = "",
  ...rest
}: TagProps) {
  return (
    <span
      className={[
        styles.tag,
        variant === "primary" ? styles.primary : "",
        variant === "success" ? styles.success : "",
        onDark ? styles.onDark : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
      {onRemove != null && (
        <button
          type="button"
          className={styles.remove}
          aria-label={removeLabel}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
            <path
              d="M2 2l6 6M8 2L2 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
