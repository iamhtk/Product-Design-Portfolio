/** Text/block alignment for content blocks. */
export type Align = 'left' | 'center' | 'right' | 'justify';

/** Tailwind class for text alignment (header, subheader, content, items). */
export function getAlignClass(align?: Align): string {
  if (align === 'center') return 'text-center';
  if (align === 'right') return 'text-right';
  if (align === 'justify') return 'text-justify';
  return 'text-left';
}

/** Tailwind class for block-level alignment (e.g. image/video: left, center, right). */
export function getBlockAlignClass(align?: Align): string {
  if (align === 'center') return 'mx-auto';
  if (align === 'right') return 'ml-auto';
  return '';
}
