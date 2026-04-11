import type { HTMLAttributes, ReactNode } from "react";
import styles from "./ButtonGroup.module.css";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Stack vertically */
  vertical?: boolean;
  /** Detached buttons with space between */
  gap?: boolean;
}

/**
 * Visually groups buttons (segmented or spaced). Pass through your `Button` components as children.
 */
export function ButtonGroup({
  children,
  vertical,
  gap,
  className = "",
  role = "group",
  ...rest
}: ButtonGroupProps) {
  return (
    <div
      role={role}
      className={[
        styles.group,
        vertical ? styles.vertical : "",
        gap ? styles.gap : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
