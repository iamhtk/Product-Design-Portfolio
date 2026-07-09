import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { HrithikAI } from '../HrithikAI/HrithikAI';
import { useChatAnchor } from './useChatAnchor';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
}

export function AIModal({ isOpen, onClose }: AIModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [chatSession, setChatSession] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const { modalBottom } = useChatAnchor();

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setChatSession((s) => s + 1);
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timer = window.setTimeout(() => setMounted(false), 200);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !cardRef.current) return;

      const focusable = Array.from(
        cardRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement;

      if (e.shiftKey) {
        if (active === first || !cardRef.current.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const focusTimer = window.setTimeout(() => {
      const card = cardRef.current;
      if (!card) return;
      const focusable = card.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        card.focus();
      }
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, [mounted, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  if (!mounted) return null;

  return createPortal(
    <>
      <style>{`
        .ai-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9998;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .ai-modal-backdrop.modal-enter {
          animation: ai-modal-backdrop-in 280ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .ai-modal-backdrop.modal-exit {
          animation: ai-modal-backdrop-out 200ms ease-in forwards;
        }
        @keyframes ai-modal-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ai-modal-backdrop-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .ai-modal-card {
          position: fixed;
          z-index: 9999;
          background: #0d0d0d;
          border: 1px solid #3a3a3a;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.06);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          outline: none;
        }
        .ai-modal-card--desktop {
          left: 50%;
          width: min(440px, calc(100vw - 48px));
          height: min(720px, calc(100dvh - 120px));
          border-radius: 24px;
          transform: translateX(-50%);
          transition: bottom 300ms ease-in-out;
        }
        .ai-modal-card--desktop.modal-enter {
          animation: ai-modal-card-in-desktop 320ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .ai-modal-card--desktop.modal-exit {
          animation: ai-modal-card-out-desktop 220ms ease-in forwards;
        }
        @keyframes ai-modal-card-in-desktop {
          from { opacity: 0; transform: translateX(-50%) translateY(28px) scale(0.98); }
          to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        @keyframes ai-modal-card-out-desktop {
          from { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
          to { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.98); }
        }

        .ai-modal-card--mobile {
          bottom: 0;
          left: 0;
          right: 0;
          height: 88dvh;
          border-radius: 24px 24px 0 0;
        }
        .ai-modal-card--mobile.modal-enter {
          animation: ai-modal-card-in-mobile 320ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .ai-modal-card--mobile.modal-exit {
          animation: ai-modal-card-out-mobile 220ms ease-in forwards;
        }
        @keyframes ai-modal-card-in-mobile {
          from { opacity: 0; transform: translateY(32px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ai-modal-card-out-mobile {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(24px) scale(0.98); }
        }

        .ai-modal-handle {
          width: 36px;
          height: 4px;
          background: #3a3a3a;
          border-radius: 2px;
          margin: 10px auto 0;
          flex-shrink: 0;
        }

        .ai-modal-body {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-modal-backdrop.modal-enter,
          .ai-modal-backdrop.modal-exit,
          .ai-modal-card--desktop.modal-enter,
          .ai-modal-card--desktop.modal-exit,
          .ai-modal-card--mobile.modal-enter,
          .ai-modal-card--mobile.modal-exit {
            animation: none;
          }
        }
      `}</style>

      <div
        className={`ai-modal-backdrop ${visible ? 'modal-enter' : 'modal-exit'}`}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      <div
        ref={cardRef}
        className={`ai-modal-card ${isMobile ? 'ai-modal-card--mobile' : 'ai-modal-card--desktop'} ${visible ? 'modal-enter' : 'modal-exit'}`}
        style={isMobile ? undefined : { bottom: `${modalBottom}px` }}
        role="dialog"
        aria-modal="true"
        aria-label="Hrithik AI Chat"
        tabIndex={-1}
      >
        {isMobile && <div className="ai-modal-handle" aria-hidden="true" />}
        <div className="ai-modal-body">
          {mounted && <HrithikAI key={chatSession} onClose={onClose} />}
        </div>
      </div>
    </>,
    document.body,
  );
}
