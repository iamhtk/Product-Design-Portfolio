import type { HTMLAttributes } from "react";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  ariaLabel?: string;
  onDark?: boolean;
}

export function Breadcrumb({
  items,
  className = "",
  ariaLabel = "Breadcrumb",
  onDark,
  ...rest
}: BreadcrumbProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={`${styles.nav} ${onDark ? styles.onDark : ""} ${className}`.trim()}
      {...rest}
    >
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={styles.item}>
              {i > 0 && (
                <span className={styles.sep} aria-hidden>
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  className={isLast ? styles.current : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
