import styles from "./Loader.module.css";

export interface LoaderProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  /** Match marketing accent */
  accent?: "information" | "primary";
  className?: string;
}

export function Loader({
  label = "Loading",
  size = "md",
  accent = "information",
  className = "",
}: LoaderProps) {
  return (
    <span
      className={[
        styles.wrap,
        size === "sm" ? styles.sm : "",
        size === "lg" ? styles.lg : "",
        accent === "primary" ? styles.orange : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
    >
      <span className={styles.spinner} aria-hidden />
      <span className={styles.sr}>{label}</span>
    </span>
  );
}
