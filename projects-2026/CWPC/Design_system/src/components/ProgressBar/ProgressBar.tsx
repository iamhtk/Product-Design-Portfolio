import styles from "./ProgressBar.module.css";

export interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
  id?: string;
  ariaLabel?: string;
  tone?: "information" | "primary";
}

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  showLabel,
  className = "",
  id,
  ariaLabel = "Progress",
  tone = "information",
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={className}>
      {showLabel && (
        <div className={styles.labelRow}>
          <span>{ariaLabel}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div
        id={id}
        className={[styles.track, size === "sm" ? styles.sm : "", size === "lg" ? styles.lg : ""]
          .filter(Boolean)
          .join(" ")}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
      >
        <div
          className={[styles.fill, tone === "primary" ? styles.fillPrimary : ""]
            .filter(Boolean)
            .join(" ")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
