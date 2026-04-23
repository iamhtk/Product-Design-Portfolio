import type { MouseEvent } from 'react';

/** True when the browser should handle navigation (new tab, modified click, non–primary button). */
export function allowBrowserDefaultNav(e: MouseEvent<HTMLElement>): boolean {
  return (
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey
  );
}
