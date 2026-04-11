import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import styles from "./Table.module.css";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  /** `dark` matches marketing tables on #121212 */
  surface?: "dark" | "light";
}

export function Table({
  striped,
  surface = "dark",
  className = "",
  children,
  ...rest
}: TableProps) {
  return (
    <table
      className={[
        styles.table,
        surface === "light" ? styles.tableLight : "",
        striped ? styles.striped : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </table>
  );
}

export function Tr({
  className = "",
  ...rest
}: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={`${styles.tr} ${className}`.trim()} {...rest} />;
}

export function Th({
  numeric,
  className = "",
  ...rest
}: ThHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return (
    <th
      scope="col"
      className={[styles.th, numeric ? styles.thNumeric : "", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}

export function Td({
  numeric,
  className = "",
  ...rest
}: TdHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return (
    <td
      className={[styles.td, numeric ? styles.tdNumeric : "", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
