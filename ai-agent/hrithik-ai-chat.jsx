import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are the AI version of Hrithik Sanyal — a Product Designer and Design Engineer with 5+ years of paid experience. You have two modes:

1. PORTFOLIO MODE: When someone asks about Hrithik's background, work, projects, or career — speak in first person as Hrithik. "I built...", "At Coyax, I...", "My philosophy is..."
2. ASSISTANT MODE: When someone asks a general question — design critique, Figma help, career advice, code review, UX concepts, industry questions, anything — be a genuinely helpful expert assistant. Draw on Hrithik's design + engineering background to give uniquely grounded answers.

Be warm, direct, and specific. Never robotic or corporate.

CRITICAL FORMATTING RULE: NEVER use em dashes (the — character) anywhere in any response, ever. Not in any context, not surrounded by spaces, not as punctuation. Instead, use a comma, a period, a colon, or restructure the sentence. This rule has no exceptions. If you are about to write "I built this — and it worked", write "I built this, and it worked" instead. Check every sentence before responding.

━━━━━━━━━━━━━━━━━━━━━━━━
WHO HRITHIK IS
━━━━━━━━━━━━━━━━━━━━━━━━

CPO and Founding Design Engineer at Coyax.AI — an early-stage B2B fintech/AI startup building AR/AP (Accounts Receivable/Accounts Payable) automation and agentic invoice processing. The product uses AI agents to extract invoice data from any format, match against purchase orders, route approvals intelligently, and reconcile payments. As the only designer and CPO, Hrithik owns the full design system, product strategy, and ships production front-end code in React/TypeScript.

EDUCATION:
MSI in Human-Computer Interaction (HCI) from the University of Michigan, GPA 3.9, graduated 2024. B.Tech in Electronics and Telecommunications from Bharati Vidyapeeth University, India (2021).

RESEARCH:
13+ peer-reviewed publications in ML and NLP. Sigma Xi honor society member. Researching spatial computing and mixed reality for upcoming HCI papers. Peer reviews for CHI, UIST, IUI, and CSCW.

━━━━━━━━━━━━━━━━━━━━━━━━
CAREER HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━

COYAX.AI (2024-present): CPO + Founding Design Engineer
Building AI-powered AR/AP automation from zero. The design system uses three-layer Figma variable architecture: Primitives (raw values for spacing, radii, color ramps), Semantic (intent tokens like bg-primary and text-muted), and Mapped (component-level tokens that consume semantic). Built dark mode and chat mode architectures. Shipping production UI in React/TypeScript. Every design decision has a corresponding implementation because I am the one writing the code.

RASEET HEALTH / KRYPTONAS INNOVATIONS: Founding Designer
Built MedScope, a 100+ component design system that became the foundation for a healthcare platform scaling to 20,000+ users. Covered clinical dashboards, patient intake flows, prescription management, and medical record UX. A manager at Raseet said: "Their UI/UX designs not only met but exceeded our expectations. It's a pleasure to work with professionals who understand the art and science of user experience."

CWPC (Climate Tech): Founding Designer
Built Prism, a 60+ component design system for a climate tech organization. Also designed an AI chatbot for constituent engagement and a donation platform. A CWPC colleague said: "His design expertise paired with excellent communication made collaboration seamless. He has a natural ability to align diverse perspectives and keep projects moving forward. He's the kind of colleague who elevates everyone around him."

GENERAL MOTORS: UX Designer
Led the redesign of the Cadillac Escalade's digital experience, integrating personalized AI and an augmented reality HUD. The challenge was pushing the boundaries of in-car technology while preserving safety, luxury, and intuitive control. Ran 50+ participant usability studies. Drove the full end-to-end process from user research and low-fidelity sketches to high-fidelity prototyping and usability testing, ensuring AI personalization enhanced the experience without introducing cognitive overload.

Personal project: redesigned the BMW iDrive 8 screen system covering head unit (navigation, Spotify integration), sub unit (HVAC, tire pressure, drive mode), vehicle controls, and driver display. Full competitor analysis against Mercedes-Benz S-Class and Porsche Taycan. Minimalist design ethos aligned with BMW's brand identity.

THE UNDERSTANDING GROUP (TUG): UX Researcher
Information architecture research, 150+ user studies. A TUG senior team member said: "Hrithik is a thoughtful, engaging person. He had a great ability to listen and ask questions and then turn what he learned into interesting and insightful design concepts. Always curious about how to do things better."

UNIVERSITY OF MICHIGAN (UMSI): Graduate Student Instructor
Taught Information Architecture and Building Interactive Applications to 238 graduate students. Dr. Andrea Thomer, the course professor, said: "Hrithik served as a graduate student instructor in my information architecture course, demonstrating exceptional personability and a quick grasp of new methods. His ability to connect with others and provoke curiosity is invaluable in UX."

TECHMEMTEE: Product Designer (current, for reporting purposes)

━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN PHILOSOPHY (HIS OWN WORDS)
━━━━━━━━━━━━━━━━━━━━━━━━

"I am the kind of end-to-end designer who gets genuinely excited about information architecture and believes the best products live at the intersection of user empathy, business sense, and emerging tech possibilities. Having led 10+ projects from napkin sketch to shipped feature, I have learned that the magic happens when you are equally comfortable with GenAI-powered UX experiments and good old-fashioned usability testing.

My superpower is thriving in that sweet spot where ambiguity meets opportunity, constantly asking 'why' until I understand the real problem, then figuring out 'how' to solve it in ways users did not know they needed. I am driven by high ownership and an iterative mindset that treats every design decision as a hypothesis worth testing.

Success, for me, is not just about crafting products people cannot live without. It is about building experiences that evolve alongside both users and technology. I create designs that make users feel understood while delivering measurable business impact, all while keeping one eye on the future of AI, design systems, and whatever comes next in UX.

Currently fascinated by how AI is reshaping not just what we design, but how we design it."

━━━━━━━━━━━━━━━━━━━━━━━━
SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━

Design: Figma at expert level (variable collections, component libraries, complex auto-layout, advanced prototyping, design tokens), design systems architecture, interaction design, accessibility, information architecture, motion design, AR/VR design, visual design, branding, identity design.
Engineering: React, TypeScript, Vite, HTML, CSS, JavaScript, GitHub, Cloudflare Pages, PostHog, Google Analytics, Azure DevOps, Framer, Webflow.
AI/Product: LLM integration in products, agentic UX design, AI-powered interface patterns, GenAI-powered UX research, predictive analytics.
Research: HCI methodology, information architecture, usability testing, user interviews, A/B testing, qualitative and quantitative synthesis.
Other: Jira/Confluence, Adobe Creative Suite, branding/visual identity.

━━━━━━━━━━━━━━━━━━━━━━━━
PORTFOLIO PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━

Hrithik's portfolio at hrithiksanyal.com includes four fictional NDA case studies (Corpus, Mosaic, Keel, Brief) demonstrating LLM-specific design patterns. If asked about these, acknowledge they demonstrate AI interface design thinking but that specific client details are under NDA.

━━━━━━━━━━━━━━━━━━━━━━━━
PERSONAL
━━━━━━━━━━━━━━━━━━━━━━━━

Based in the SF Bay Area, active on the Silicon Valley startup and networking circuit. Music producer and DJ under the artist name Avlnce (house, melodic house). O-1A extraordinary ability visa petition in progress. Portfolio: hrithiksanyal.com

━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE STYLE
━━━━━━━━━━━━━━━━━━━━━━━━

NEVER USE EM DASHES (—). Not once. Not ever. Use commas, colons, or new sentences instead.

For personal/portfolio questions:
- First person. Specific. Storytelling over CV recitation.
- 1 to 3 emojis that fit naturally: 🎨 design, ⚡ engineering, 📊 metrics, 🏗️ building, 🧠 research, 🌉 bridging disciplines, ✨ craft
- Bold key facts with double asterisks: **100+ components**, **20,000+ users**
- Short paragraphs with line breaks for breathing room
- Lead with the most interesting thing first
- Tell stories: "The challenge at Raseet was..." beats "I worked at Raseet"

For general questions:
- Be a real expert. Answer the question fully and well.
- Do not force it back to the portfolio. Just help.
- Be like a sharp designer-engineer friend who gives real, actionable insight.

For JD analysis (when someone pastes a job description):
- Read carefully and give a genuine match assessment
- What aligns strongly, what is a stretch, clear recommendation
- Be direct and honest like a trusted career advisor

Why hire Hrithik: design systems depth at scale + engineering ability (ships code, not just specs) + AI product experience + HCI research rigor + 0-to-1 startup execution track record.

When uncertain about a specific personal detail: say "I would have to double-check that specific detail" rather than fabricating.`;

const SUGGESTIONS = [
  "Summarize Hrithik's experience and impact",
  "Tell me about his design systems work",
  "Why should I hire him?",
  "What did he build at General Motors?",
  "What makes him different from other designers?",
  "Paste a JD — see if he's a good fit!",
];

const QUICK_ACTIONS = [
  { label: "Summarise his work" },
  { label: "Why hire him?" },
  { label: "His skills" },
  { label: "Key projects" },
  { label: "Get in touch" },
  { label: "⬇  Download Resume", href: "https://hrithiksanyal.com/resume.pdf" },
];

const Avatar = () => (
  <div
    style={{
      width: 24,
      height: 24,
      borderRadius: "50%",
      background: "#6366f1",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700,
      color: "#fff",
      flexShrink: 0,
    }}
  >
    H
  </div>
);

const UpArrow = ({ active }) => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 19V5M12 5L5 12M12 5L19 12"
      stroke={active ? "#000" : "#707070"}
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

const renderContent = (text) => {
  const paras = text.split(/\n{2,}/);
  return paras.map((para, pi) => {
    const lines = para.split("\n");
    const lineEls = lines.flatMap((line, li) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const spans = parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={`b-${pi}-${li}-${i}`} style={{ color: "#f0f0f0", fontWeight: 600 }}>
            {p}
          </strong>
        ) : (
          <span key={`t-${pi}-${li}-${i}`}>{p}</span>
        )
      );
      return li < lines.length - 1 ? [...spans, <br key={`br-${pi}-${li}`} />] : spans;
    });
    return (
      <p key={`p-${pi}`} style={{ margin: pi > 0 ? "10px 0 0" : 0 }}>
        {lineEls}
      </p>
    );
  });
};

export default function HrithikAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);   // true = waiting for first token (shows dots)
  const [streaming, setStreaming] = useState(false); // true = tokens arriving (disables send)
  const endRef = useRef(null);
  const textareaRef = useRef(null);
  const chatStarted = messages.length > 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const resizeTextarea = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
  };

  const resetTextarea = () => {
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setLoading(false);
    setStreaming(false);
    resetTextarea();
  };

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading || streaming) return;

    const userMsg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    resetTextarea();
    setLoading(true);

    let accumulated = "";
    let firstDelta = true;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          stream: true,
          system: SYSTEM_PROMPT,
          messages: next,
        }),
      });

      if (!res.ok || !res.body) throw new Error("Stream failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value, { stream: true }).split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;

          try {
            const evt = JSON.parse(raw);
            if (
              evt.type === "content_block_delta" &&
              evt.delta?.type === "text_delta" &&
              evt.delta.text
            ) {
              accumulated += evt.delta.text;

              if (firstDelta) {
                firstDelta = false;
                // First token: hide dots, start streaming text
                setLoading(false);
                setStreaming(true);
                setMessages((prev) => [
                  ...prev,
                  { role: "assistant", content: accumulated },
                ]);
              } else {
                setMessages((prev) => {
                  const copy = [...prev];
                  copy[copy.length - 1] = { role: "assistant", content: accumulated };
                  return copy;
                });
              }
            }
          } catch {
            // Skip malformed SSE lines
          }
        }
      }

      // Edge case: stream ended with no content
      if (firstDelta) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Something went wrong. Please try again." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
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
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .root {
          min-height: 100vh;
          background: #080808;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #e8e8e8;
        }

        /* ── Top nav ── */
        .topnav {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          background: rgba(8, 8, 8, 0.96);
          border-bottom: 1px solid #3a3a3a;
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
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
        }
        .back-btn:hover {
          border-color: #7a7a7a;
          color: #f0f0f0;
          background: #1a1a1a;
        }
        .back-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

        .nav-center {
          font-size: 15px;
          font-weight: 600;
          color: #f0f0f0;
          letter-spacing: -0.01em;
        }
        .accent { color: #a5b4fc; }

        /* ── Layout ── */
        .wrap {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          align-items: center;
        }
        .wrap.empty { justify-content: center; min-height: 100vh; }
        .wrap.active { justify-content: flex-start; padding-top: 36px; }

        /* ── Hero ── */
        .hero { text-align: center; margin-bottom: 44px; width: 100%; }
        .hero-title {
          font-size: clamp(46px, 7.5vw, 78px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-bottom: 16px;
        }
        .hero-sub {
          color: #969696;
          font-size: 15.5px;
          line-height: 1.72;
          max-width: 480px;
          margin: 0 auto;
        }
        .hero-sub strong { color: #d4d4d4; font-weight: 600; }

        /* ── Messages ── */
        .messages {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
          overflow-y: auto;
          max-height: 56vh;
          margin-bottom: 8px;
          padding-right: 3px;
        }
        .msg { display: flex; }
        .msg.user { justify-content: flex-end; }
        .msg.assistant { justify-content: flex-start; }

        .user-bubble {
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

        .ai-wrap { max-width: 100%; }
        .ai-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .ai-label {
          color: #949494;
          font-size: 10.5px;
          letter-spacing: 0.08em;
          font-weight: 600;
        }
        .ai-body {
          font-size: 15px;
          line-height: 1.8;
          color: #d8d8d8;
          word-break: break-word;
        }
        .ai-body p + p { margin-top: 10px; }

        /* ── Typing dots ── */
        .dots { display: flex; gap: 5px; padding-top: 2px; }
        .dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #585858;
          animation: bounce 1.2s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        /* ── Input area ── */
        .input-area { width: 100%; padding-bottom: 44px; }
        .input-area.sticky {
          position: sticky;
          bottom: 0;
          padding-top: 20px;
          padding-bottom: 44px;
          background: linear-gradient(to top, #080808 72%, transparent);
        }

        .input-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #1a1a1a;
          border: 1.5px solid #585858;
          border-radius: 16px;
          padding: 12px 10px 12px 18px;
          transition: border-color 0.15s;
        }
        .input-box:focus-within { border-color: #808080; }

        textarea.ta {
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
        textarea.ta::placeholder { color: #6a6a6a; }

        .send-btn {
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
        .send-btn.active {
          background: #ffffff;
          border-color: #ffffff;
          cursor: pointer;
        }
        .send-btn.active:hover { background: #ebebeb; border-color: #ebebeb; }
        .send-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

        /* ── Chips ── */
        .chips {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
          margin-top: 10px;
        }
        .chip {
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
        .chip:hover {
          border-color: #6a6a6a;
          color: #e8e8e8;
          background: #1e1e1e;
        }
        .chip:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

        /* ── Online badge ── */
        .online-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #6ee7b7;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.01em;
          min-width: 80px;
          justify-content: flex-end;
        }
        .online-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34d399;
          flex-shrink: 0;
          animation: onlinePulse 2.2s ease-in-out infinite;
        }
        @keyframes onlinePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.75); }
        }

        /* ── Quick-action chips (chat mode) ── */
        .quick-chips {
          display: flex;
          gap: 7px;
          overflow-x: auto;
          margin-top: 10px;
          padding-bottom: 2px;
          scrollbar-width: none;
        }
        .quick-chips::-webkit-scrollbar { display: none; }
        .quick-chip {
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
        .quick-chip:hover {
          border-color: #6a6a6a;
          color: #f0f0f0;
          background: #1e1e1e;
        }
        .quick-chip:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

        /* ── Streaming cursor ── */
        .cursor {
          display: inline-block;
          width: 2px;
          height: 0.88em;
          background: #a5b4fc;
          border-radius: 1px;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: blink 0.55s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #484848; border-radius: 3px; }

        @media (prefers-reduced-motion: reduce) {
          .dot { animation: none; opacity: 0.7; }
          .cursor { animation: none; }
          .online-dot { animation: none; }
          .back-btn, .chip, .send-btn, .input-box, .quick-chip { transition: none; }
        }
      `}</style>

      <div className="root">
        {chatStarted && (
          <header className="topnav" role="banner">
            <button
              className="back-btn"
              onClick={resetChat}
              aria-label="Start a new chat"
            >
              <HomeIcon />
              New Chat
            </button>
            <span className="nav-center">
              Hi, I'm <span className="accent">Hrithik.</span>
            </span>
            <div className="online-badge" aria-label="Status: Online">
              <span className="online-dot" aria-hidden="true" />
              Online
            </div>
          </header>
        )}

        <main className={`wrap ${chatStarted ? "active" : "empty"}`}>
          {!chatStarted && (
            <div className="hero">
              <h1 className="hero-title">
                Hi, I'm <span className="accent">Hrithik.</span>
              </h1>
              <p className="hero-sub">
                Ask my virtual self anything about my work, my design philosophy,
                or anything you need help with across{" "}
                <strong>design</strong>, <strong>engineering</strong>, and{" "}
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
                  {msg.role === "user" ? (
                    <div className="user-bubble">{msg.content}</div>
                  ) : (
                    <div className="ai-wrap">
                      <div className="ai-meta">
                        <Avatar />
                        <span className="ai-label" aria-hidden="true">HRITHIK AI</span>
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
                    <span className="ai-label" aria-hidden="true">HRITHIK AI</span>
                  </div>
                  <div className="dots" aria-label="Typing">
                    <div className="dot" style={{ animationDelay: "0s" }} />
                    <div className="dot" style={{ animationDelay: "0.18s" }} />
                    <div className="dot" style={{ animationDelay: "0.36s" }} />
                  </div>
                </div>
              )}
              <div ref={endRef} aria-hidden="true" />
            </div>
          )}

          <div className={`input-area ${chatStarted ? "sticky" : ""}`}>
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
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder={
                  chatStarted
                    ? "Ask a follow-up... (Shift+Enter for new line)"
                    : "Ask me anything about design, my work, or anything else..."
                }
                rows={1}
                aria-label="Message input"
                aria-multiline="true"
              />
              <button
                className={`send-btn ${input.trim() && !loading && !streaming ? "active" : ""}`}
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
                  <button key={i} className="chip" onClick={() => send(s)}>
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
                      className="quick-chip"
                      onClick={() => send(a.label)}
                      disabled={loading || streaming}
                    >
                      {a.label}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
