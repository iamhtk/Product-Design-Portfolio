import type { CSSProperties } from "react";
import styles from "./ProgressCircle.module.css";

export interface ProgressCircleProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  className?: string;
  ariaLabel?: string;
  tone?: "information" | "primary";
  onDark?: boolean;
}

export function ProgressCircle({
  value,
  max = 100,
  size = 48,
  strokeWidth = 4,
  showValue,
  className = "",
  ariaLabel = "Progress",
  tone = "information",
  onDark,
}: ProgressCircleProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <div
      className={`${styles.wrap} ${onDark ? styles.onDark : ""} ${className}`.trim()}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      style={
        {
          width: size,
          height: size,
          ["--stroke" as string]: `${strokeWidth}px`,
        } as CSSProperties
      }
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={styles.svg}
        aria-hidden
      >
        <circle className={styles.track} cx={size / 2} cy={size / 2} r={r} />
        <circle
          className={[styles.arc, tone === "primary" ? styles.arcPrimary : ""]
            .filter(Boolean)
            .join(" ")}
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      {showValue && (
        <span className={styles.center}>{Math.round(pct)}%</span>
      )}
    </div>
  );
}
