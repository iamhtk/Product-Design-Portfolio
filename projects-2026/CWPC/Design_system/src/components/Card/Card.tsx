import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

export type CardSurface = "marketing" | "light";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** `marketing` = dark CWPC homepage card (#121212) */
  surface?: CardSurface;
}

export function Card({
  children,
  surface = "light",
  className = "",
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        styles.card,
        surface === "marketing" ? styles.marketing : styles.light,
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

export function CardHeader({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.header} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

/** Main orange headline (e.g. event title) */
export function CardTitle({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`${styles.titleOrange} ${className}`.trim()} {...rest}>
      {children}
    </h3>
  );
}

export function CardKicker({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`${styles.titleYellow} ${className}`.trim()} {...rest}>
      {children}
    </p>
  );
}

export function CardSectionTitle({
  children,
  tone = "green",
  className = "",
  ...rest
}: HTMLAttributes<HTMLHeadingElement> & { tone?: "green" | "white" }) {
  const c =
    tone === "white" ? styles.titleWhite : styles.titleGreen;
  return (
    <h4 className={`${c} ${className}`.trim()} {...rest}>
      {children}
    </h4>
  );
}

export function CardDescription({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`${styles.description} ${className}`.trim()} {...rest}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.content} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

export function CardMedia({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.media} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.footer} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

/** “Have questions? … Email us” row */
export function CardFooterNote({
  question,
  actionLabel,
  actionHref = "#",
  className = "",
}: {
  question: string;
  actionLabel: string;
  actionHref?: string;
  className?: string;
}) {
  return (
    <div className={`${styles.footerNote} ${className}`.trim()}>
      <span className={styles.footerNoteQuestion}>{question}</span>
      <a href={actionHref} className={styles.footerNoteLink}>
        {actionLabel}
      </a>
    </div>
  );
}
