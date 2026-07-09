import { useChatAnchor } from './useChatAnchor';

interface AIFloatingButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function AIFloatingButton({ onClick, isOpen }: AIFloatingButtonProps) {
  const { right, bottomPosition } = useChatAnchor();

  return (
    <>
      <style>{`
        .ai-floating-btn {
          position: fixed;
          z-index: 9997;
          height: 46px;
          padding: 0 18px;
          border: none;
          border-radius: 100px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          box-shadow: 0 4px 24px rgba(99, 102, 241, 0.45);
          color: white;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: right 200ms ease, bottom 300ms ease-in-out, filter 200ms ease, box-shadow 200ms ease, transform 200ms ease;
        }
        .ai-floating-btn:hover {
          filter: brightness(1.1);
          box-shadow: 0 6px 28px rgba(99, 102, 241, 0.55);
        }
        .ai-floating-btn:active {
          transform: scale(0.96);
        }
        .ai-floating-btn:focus-visible {
          outline: 2px solid #a5b4fc;
          outline-offset: 2px;
        }
        @media (max-width: 767px) {
          .ai-floating-btn.ai-floating-btn--open {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-floating-btn { transition: none; }
          .ai-floating-btn:active { transform: none; }
        }
      `}</style>
      <button
        type="button"
        className={`ai-floating-btn${isOpen ? ' ai-floating-btn--open' : ''}`}
        style={{ right: `${right}px`, bottom: `${bottomPosition}px` }}
        onClick={onClick}
        aria-label={isOpen ? 'Close chat' : 'Chat with Hrithik'}
      >
        {isOpen ? '✕ Close' : '✦ Chat with Hrithik'}
      </button>
    </>
  );
}
