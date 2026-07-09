import { useState, useRef, useEffect, type ReactNode } from 'react';

const SUGGESTIONS = [
  "Summarize Hrithik's experience and impact",
  'Tell me about his design systems work',
  'Why should I hire him?',
  'What did he build at General Motors?',
  'What makes him different from other designers?',
  "Paste a JD — see if he's a good fit!",
];

const QUICK_ACTIONS = [
  { label: 'Summarise his work' },
  { label: 'Why hire him?' },
  { label: 'His skills' },
  { label: 'Key projects' },
  { label: 'Get in touch' },
  { label: '⬇  Download Resume', href: 'https://hrithiksanyal.com/resume.pdf' },
];

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface HrithikAIProps {
  onClose?: () => void;
}

const Avatar = () => (
  <div
    style={{
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: '#6366f1',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 700,
      color: '#fff',
      flexShrink: 0,
    }}
  >
    H
  </div>
);

const UpArrow = ({ active }: { active: boolean }) => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 19V5M12 5L5 12M12 5L19 12"
      stroke={active ? '#000' : '#707070'}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HomeIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const renderContent = (text: string): ReactNode[] => {
  const paras = text.split(/\n{2,}/);
  return paras.map((para, pi) => {
    const lines = para.split('\n');
    const lineEls = lines.flatMap((line, li) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const spans = parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={`b-${pi}-${li}-${i}`} style={{ color: '#f0f0f0', fontWeight: 600 }}>
            {p}
          </strong>
        ) : (
          <span key={`t-${pi}-${li}-${i}`}>{p}</span>
        ),
      );
      return li < lines.length - 1 ? [...spans, <br key={`br-${pi}-${li}`} />] : spans;
    });
    return (
      <p key={`p-${pi}`} style={{ margin: pi > 0 ? '10px 0 0' : 0 }}>
        {lineEls}
      </p>
    );
  });
};

export function HrithikAI({ onClose }: HrithikAIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatStarted = messages.length > 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const resizeTextarea = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 180)}px`;
  };

  const resetTextarea = () => {
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const resetChat = () => {
    setMessages([]);
    setInput('');
    setLoading(false);
    setStreaming(false);
    resetTextarea();
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading || streaming) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    resetTextarea();
    setLoading(true);

    let accumulated = '';
    let firstDelta = true;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) throw new Error('Stream failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value, { stream: true }).split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;

          try {
            const evt = JSON.parse(raw) as {
              type?: string;
              delta?: { type?: string; text?: string };
            };
            if (
              evt.type === 'content_block_delta' &&
              evt.delta?.type === 'text_delta' &&
              evt.delta.text
            ) {
              accumulated += evt.delta.text;

              if (firstDelta) {
                firstDelta = false;
                setLoading(false);
                setStreaming(true);
                setMessages((prev) => [...prev, { role: 'assistant', content: accumulated }]);
              } else {
                setMessages((prev) => {
                  const copy = [...prev];
                  copy[copy.length - 1] = { role: 'assistant', content: accumulated };
                  return copy;
                });
              }
            }
          } catch {
            // Skip malformed SSE lines
          }
        }
      }

      if (firstDelta) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Something went wrong. Please try again.' },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
      setStreaming(false);
      textareaRef.current?.focus();
    }
  };

  return (
    <>
      <style>{`
        .hrithik-ai *, .hrithik-ai *::before, .hrithik-ai *::after { box-sizing: border-box; }

        .hrithik-ai {
          height: 100%;
          background: #0d0d0d;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #e8e8e8;
          min-height: 0;
        }

        .hrithik-ai .topnav {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: rgba(13, 13, 13, 0.96);
          border-bottom: 1px solid #3a3a3a;
          gap: 8px;
        }
        .hrithik-ai .topnav-left {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }
        .hrithik-ai .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          background: transparent;
          border: 1.5px solid #555555;
          border-radius: 8px;
          color: #b0b0b0;
          font-size: 13px;
          font-family: inherit;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
          line-height: 1;
          white-space: nowrap;
        }
        .hrithik-ai .back-btn:hover {
          border-color: #7a7a7a;
          color: #f0f0f0;
          background: #1a1a1a;
        }
        .hrithik-ai .back-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }
        .hrithik-ai .close-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          padding: 0;
          background: transparent;
          border: 1.5px solid #555555;
          border-radius: 8px;
          color: #b0b0b0;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
          flex-shrink: 0;
        }
        .hrithik-ai .close-btn:hover {
          border-color: #7a7a7a;
          color: #f0f0f0;
          background: #1a1a1a;
        }
        .hrithik-ai .close-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

        .hrithik-ai .nav-center {
          font-size: 14px;
          font-weight: 600;
          color: #f0f0f0;
          letter-spacing: -0.01em;
          text-align: center;
          flex: 1;
          min-width: 0;
        }
        .hrithik-ai .accent { color: #a5b4fc; }

        .hrithik-ai .wrap {
          flex: 1;
          width: 100%;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .hrithik-ai .wrap.empty {
          justify-content: center;
        }
        .hrithik-ai .wrap.active {
          justify-content: flex-start;
          padding-top: 16px;
        }

        .hrithik-ai .empty-prompt {
          text-align: center;
          margin-bottom: 20px;
          padding: 0 8px;
        }
        .hrithik-ai .empty-prompt p {
          color: #969696;
          font-size: 14px;
          line-height: 1.65;
        }
        .hrithik-ai .empty-prompt strong { color: #d4d4d4; font-weight: 600; }

        .hrithik-ai .messages {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
          overflow-y: auto;
          flex: 1;
          min-height: 0;
          margin-bottom: 8px;
          padding-right: 3px;
        }
        .hrithik-ai .msg { display: flex; }
        .hrithik-ai .msg.user { justify-content: flex-end; }
        .hrithik-ai .msg.assistant { justify-content: flex-start; }

        .hrithik-ai .user-bubble {
          max-width: 76%;
          background: #1e1e1e;
          border: 1.5px solid #565656;
          border-radius: 18px 18px 4px 18px;
          padding: 11px 16px;
          font-size: 14.5px;
          line-height: 1.65;
          color: #eeeeee;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .hrithik-ai .ai-wrap { max-width: 100%; }
        .hrithik-ai .ai-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .hrithik-ai .ai-label {
          color: #949494;
          font-size: 10.5px;
          letter-spacing: 0.08em;
          font-weight: 600;
        }
        .hrithik-ai .ai-body {
          font-size: 15px;
          line-height: 1.8;
          color: #d8d8d8;
          word-break: break-word;
        }
        .hrithik-ai .ai-body p + p { margin-top: 10px; }

        .hrithik-ai .dots { display: flex; gap: 5px; padding-top: 2px; }
        .hrithik-ai .dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #585858;
          animation: hrithik-bounce 1.2s ease-in-out infinite;
        }
        @keyframes hrithik-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        .hrithik-ai .input-area {
          width: 100%;
          flex-shrink: 0;
          padding-bottom: 16px;
          min-width: 0;
        }
        .hrithik-ai .input-area.sticky {
          padding-top: 12px;
          background: linear-gradient(to top, #0d0d0d 72%, transparent);
        }

        .hrithik-ai .input-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #1a1a1a;
          border: 1.5px solid #585858;
          border-radius: 16px;
          padding: 12px 10px 12px 18px;
          transition: border-color 0.15s;
        }
        .hrithik-ai .input-box:focus-within { border-color: #808080; }

        .hrithik-ai textarea.ta {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #f0f0f0;
          font-size: 15px;
          font-family: inherit;
          resize: none;
          min-height: 26px;
          max-height: 180px;
          overflow-y: auto;
          line-height: 1.6;
          padding: 0;
        }
        .hrithik-ai textarea.ta::placeholder { color: #6a6a6a; }

        .hrithik-ai .send-btn {
          width: 34px; height: 34px;
          flex-shrink: 0;
          border-radius: 50%;
          border: 1.5px solid #4e4e4e;
          background: #242424;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: not-allowed;
          transition: all 0.15s;
        }
        .hrithik-ai .send-btn.active {
          background: #ffffff;
          border-color: #ffffff;
          cursor: pointer;
        }
        .hrithik-ai .send-btn.active:hover { background: #ebebeb; border-color: #ebebeb; }
        .hrithik-ai .send-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

        .hrithik-ai .chips {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 10px;
        }
        @media (min-width: 400px) {
          .hrithik-ai .chips { grid-template-columns: 1fr 1fr 1fr; }
        }
        .hrithik-ai .chip {
          background: #161616;
          border: 1.5px solid #484848;
          border-radius: 12px;
          padding: 13px 14px;
          color: #aaaaaa;
          font-size: 12.5px;
          line-height: 1.45;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .hrithik-ai .chip:hover {
          border-color: #6a6a6a;
          color: #e8e8e8;
          background: #1e1e1e;
        }
        .hrithik-ai .chip:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

        .hrithik-ai .online-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #6ee7b7;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.01em;
          min-width: 68px;
          justify-content: flex-end;
          flex-shrink: 0;
        }
        .hrithik-ai .online-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34d399;
          flex-shrink: 0;
          animation: hrithik-onlinePulse 2.2s ease-in-out infinite;
        }
        @keyframes hrithik-onlinePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.75); }
        }

        .hrithik-ai .quick-chips {
          display: flex;
          gap: 7px;
          overflow-x: auto;
          overflow-y: hidden;
          margin-top: 10px;
          margin-left: -16px;
          margin-right: -16px;
          padding-left: 16px;
          padding-right: 16px;
          padding-bottom: 4px;
          width: calc(100% + 32px);
          max-width: calc(100% + 32px);
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          overscroll-behavior-x: contain;
        }
        .hrithik-ai .quick-chips::-webkit-scrollbar { display: none; }
        .hrithik-ai .quick-chip {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          padding: 7px 14px;
          background: #161616;
          border: 1.5px solid #484848;
          border-radius: 20px;
          color: #aaaaaa;
          font-size: 12.5px;
          font-family: inherit;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .hrithik-ai .quick-chip:hover {
          border-color: #6a6a6a;
          color: #f0f0f0;
          background: #1e1e1e;
        }
        .hrithik-ai .quick-chip:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

        .hrithik-ai .cursor {
          display: inline-block;
          width: 2px;
          height: 0.88em;
          background: #a5b4fc;
          border-radius: 1px;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: hrithik-blink 0.55s ease-in-out infinite;
        }
        @keyframes hrithik-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hrithik-ai ::-webkit-scrollbar { width: 3px; }
        .hrithik-ai ::-webkit-scrollbar-thumb { background: #484848; border-radius: 3px; }

        @media (prefers-reduced-motion: reduce) {
          .hrithik-ai .dot { animation: none; opacity: 0.7; }
          .hrithik-ai .cursor { animation: none; }
          .hrithik-ai .online-dot { animation: none; }
          .hrithik-ai .back-btn, .hrithik-ai .chip, .hrithik-ai .send-btn, .hrithik-ai .input-box, .hrithik-ai .quick-chip, .hrithik-ai .close-btn { transition: none; }
        }
      `}</style>

      <div className="hrithik-ai">
        <header className="topnav" role="banner">
          <div className="topnav-left">
            {chatStarted && (
              <button
                type="button"
                className="back-btn"
                onClick={resetChat}
                aria-label="Start a new chat"
              >
                <HomeIcon />
                New Chat
              </button>
            )}
            {onClose && (
              <button
                type="button"
                className="close-btn"
                onClick={onClose}
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            )}
          </div>
          <span className="nav-center">
            Hi, I&apos;m <span className="accent">Hrithik.</span>
          </span>
          <div className="online-badge" aria-label="Status: Online">
            <span className="online-dot" aria-hidden="true" />
            Online
          </div>
        </header>

        <main className={`wrap ${chatStarted ? 'active' : 'empty'}`}>
          {!chatStarted && (
            <div className="empty-prompt">
              <p>
                Ask my virtual self anything about my work, my design philosophy, or anything you
                need help with across <strong>design</strong>, <strong>engineering</strong>, and{' '}
                <strong>AI</strong>.
              </p>
            </div>
          )}

          {chatStarted && (
            <div
              className="messages"
              role="log"
              aria-label="Chat messages"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`msg ${msg.role}`}>
                  {msg.role === 'user' ? (
                    <div className="user-bubble">{msg.content}</div>
                  ) : (
                    <div className="ai-wrap">
                      <div className="ai-meta">
                        <Avatar />
                        <span className="ai-label" aria-hidden="true">
                          HRITHIK AI
                        </span>
                      </div>
                      <div className="ai-body" aria-label="Hrithik AI response">
                        {renderContent(msg.content)}
                        {streaming && i === messages.length - 1 && (
                          <span className="cursor" aria-hidden="true" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="ai-wrap" aria-live="polite" aria-busy="true">
                  <div className="ai-meta">
                    <Avatar />
                    <span className="ai-label" aria-hidden="true">
                      HRITHIK AI
                    </span>
                  </div>
                  <div className="dots" aria-label="Typing">
                    <div className="dot" style={{ animationDelay: '0s' }} />
                    <div className="dot" style={{ animationDelay: '0.18s' }} />
                    <div className="dot" style={{ animationDelay: '0.36s' }} />
                  </div>
                </div>
              )}
              <div ref={endRef} aria-hidden="true" />
            </div>
          )}

          <div className={`input-area ${chatStarted ? 'sticky' : ''}`}>
            <div className="input-box">
              <textarea
                ref={textareaRef}
                className="ta"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  resizeTextarea();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder={
                  chatStarted
                    ? 'Ask a follow-up... (Shift+Enter for new line)'
                    : 'Ask me anything about design, my work, or anything else...'
                }
                rows={1}
                aria-label="Message input"
                aria-multiline="true"
              />
              <button
                type="button"
                className={`send-btn ${input.trim() && !loading && !streaming ? 'active' : ''}`}
                onClick={() => send(input)}
                disabled={!input.trim() || loading || streaming}
                aria-label="Send message"
              >
                <UpArrow active={!!input.trim() && !loading} />
              </button>
            </div>

            {!chatStarted && (
              <div className="chips" role="group" aria-label="Suggested questions">
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} type="button" className="chip" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {chatStarted && (
              <div className="quick-chips" role="group" aria-label="Quick actions">
                {QUICK_ACTIONS.map((a, i) =>
                  a.href ? (
                    <a
                      key={i}
                      className="quick-chip"
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {a.label}
                    </a>
                  ) : (
                    <button
                      key={i}
                      type="button"
                      className="quick-chip"
                      onClick={() => send(a.label)}
                      disabled={loading || streaming}
                    >
                      {a.label}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
