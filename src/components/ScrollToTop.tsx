import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomPosition, setBottomPosition] = useState(32);

  useEffect(() => {
    const handleScroll = () => {
      // Show button as soon as user scrolls away from the top
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 0);

      // Position above footer when footer is in view
      const footer = document.querySelector('[data-footer]');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const winH = window.innerHeight;
        if (footerRect.top < winH) {
          const footerVisibleHeight = winH - footerRect.top;
          setBottomPosition(footerVisibleHeight + 32);
        } else {
          setBottomPosition(32);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  // Portal to body so button appears above nav and is clickable (avoids stacking context from page-transition)
  return createPortal(
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed right-8 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300 ease-in-out"
      style={{ bottom: `${bottomPosition}px`, zIndex: 9998 }}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>,
    document.body
  );
}
