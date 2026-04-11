import { useId, type ReactNode } from "react";
import styles from "./Switch.module.css";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  id?: string;
  className?: string;
  onDark?: boolean;
  "aria-label"?: string;
}

export function Switch({
  checked,
  onChange,
  label,
  disabled,
  id,
  onDark,
  className = "",
  "aria-label": ariaLabel,
}: SwitchProps) {
  const uid = useId();
  const switchId = id ?? `cwpc-switch-${uid}`;
  const labelId = label ? `${switchId}-label` : undefined;

  const track = (
    <button
      id={switchId}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label == null ? (ariaLabel ?? "Toggle") : undefined}
      disabled={disabled}
      className={[styles.track, checked ? styles.trackOn : ""]
        .filter(Boolean)
        .join(" ")}
      onClick={() => !disabled && onChange(!checked)}
    >
      <span
        className={[styles.thumb, checked ? styles.thumbOn : ""]
          .filter(Boolean)
          .join(" ")}
      />
    </button>
  );

  if (label != null) {
    return (
      <label
        htmlFor={switchId}
        className={[
          styles.root,
          disabled ? styles.rootDisabled : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {track}
        <span
          id={labelId}
          className={`${styles.label} ${onDark ? styles.labelOnDark : ""}`.trim()}
        >
          {label}
        </span>
      </label>
    );
  }

  return (
    <div
      className={[
        styles.root,
        disabled ? styles.rootDisabled : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {track}
    </div>
  );
}
