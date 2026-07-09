import { useEffect, useState } from 'react';

export const SCROLL_TO_TOP_RIGHT = 32;
export const SCROLL_TO_TOP_SIZE = 44;
export const BUTTON_GAP = 14;
export const CHAT_BUTTON_HEIGHT = 46;
export const MODAL_GAP_ABOVE_BUTTON = 16;

export function useChatAnchor() {
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);
  const [bottomPosition, setBottomPosition] = useState(32);

  useEffect(() => {
    const handleScroll = () => {
      setScrollToTopVisible(window.scrollY > 0);

      const footer = document.querySelector('[data-footer]');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const winH = window.innerHeight;
        if (footerRect.top < winH) {
          setBottomPosition(winH - footerRect.top + 32);
        } else {
          setBottomPosition(32);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const right = scrollToTopVisible
    ? SCROLL_TO_TOP_RIGHT + SCROLL_TO_TOP_SIZE + BUTTON_GAP
    : SCROLL_TO_TOP_RIGHT;

  const modalBottom = bottomPosition + CHAT_BUTTON_HEIGHT + MODAL_GAP_ABOVE_BUTTON;

  return { right, bottomPosition, modalBottom, scrollToTopVisible };
}
