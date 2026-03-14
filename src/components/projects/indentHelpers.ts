/** Indent level: 0 = none/default, 1 = medium (2.5rem), 2 = large (5rem). */
export type IndentLevel = 0 | 1 | 2;

/** Margin for header, subheader, or content. 0 = no indent, 1 = 2.5rem, 2 = 5rem. */
export function getHeaderIndentMargin(level?: IndentLevel): string {
  if (level === 1) return '2.5rem';
  if (level === 2) return '5rem';
  return '0';
}

/** Margin for bullet list. 0 = default (1.5rem), 1 = 2.5rem, 2 = 5rem. */
export function getListIndentMargin(level?: IndentLevel): string {
  if (level === 1) return '2.5rem';
  if (level === 2) return '5rem';
  return '1.5rem';
}
