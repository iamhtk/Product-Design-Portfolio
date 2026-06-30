import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { FooterCreditsRow } from '../FooterAccessibilityLink';
import { createPortal } from 'react-dom';
import { Facebook, Figma, Github, Instagram, Linkedin, Youtube } from 'lucide-react';
import { ScrollToTop } from '../ScrollToTop';
import { useLightbox } from '../Lightbox';
import { ExploreMoreSection } from './ExploreMoreSection';
import { SHOW_PROJECT_OVERVIEW } from './projectConfig';
import { DesignSystemExploreCallout } from './DesignSystemExploreCallout';

const CURRENT_PROJECT_ID = 'CWPC_DS';
const PROGRESS_BAR_HIDE_DELAY_MS = 400;

/** Same endpoints as the EXPLORE PRISM block in CWPC.tsx */
const PRISM_DOCS_URL = 'https://prism.cwpc.hrithiksanyal.com/docs';
const PRISM_SHOWCASE_URL = 'https://prism.cwpc.hrithiksanyal.com';
const PRISM_STORYBOOK_URL = 'https://prism-cwpc-storybook.pages.dev/';
const PRISM_FIGMA_URL = 'https://www.figma.com/@iamhtk';

export interface CwpcDsCaseStudyProjectProps {
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

export function CwpcDsCaseStudyProject({ onBack, onProjectClick }: CwpcDsCaseStudyProjectProps) {
  const { openLightbox } = useLightbox();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const hideBarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const title = 'Prism Design System';
  const company = 'Catastrophic Wildfire Prevention Consortium';
  const subtitle =
    'Design-system deep dive: Prism tokens, layers, and documentation that keep CWPC emergency tools consistent and accessible.';
  const role = 'Design Systems, Documentation, React + TypeScript';
  const team = 'Lead Product Designer';
  const when = '2025 – 2026';
  const progressBarColor = '#FF6701';
  const overview: string | undefined = '';
  const speedReadChallenge =
    'Emergency tooling needed a single source of truth: scattered UI patterns slowed shipping and risked inconsistent experiences when minutes matter.';
  const speedReadProcess =
    'I structured Prism in three layers foundations, composed patterns, and product shells, then documented each component with live props, usage guidance, and accessibility notes.';
  const speedReadTakeaways =
    'A design system is only as strong as its docs: interactive examples and clear naming beat static screenshots for adoption.';
  const speedReadImpact =
    'One token set, one component API, and docs that product and engineering can trust during high-stakes releases.';

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScrollableHeight = Math.max(documentHeight - windowHeight, 1);
      const progress = (scrollTop / totalScrollableHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
      setProgressBarVisible(true);
      if (hideBarTimeoutRef.current) clearTimeout(hideBarTimeoutRef.current);
      hideBarTimeoutRef.current = setTimeout(() => {
        setProgressBarVisible(false);
        hideBarTimeoutRef.current = null;
      }, PROGRESS_BAR_HIDE_DELAY_MS);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideBarTimeoutRef.current) clearTimeout(hideBarTimeoutRef.current);
    };
  }, []);

  const metaLabelStyle: CSSProperties = {
    color: '#F5F5F7',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px',
    fontSize: '11px',
  };
  const metaValueStyle: CSSProperties = {
    color: '#F5F5F7',
    fontSize: '18px',
    lineHeight: 1.6,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  };
  const speedReadMuted: CSSProperties = { color: '#F5F5F7' };
  const speedReadBody: CSSProperties = { color: '#F5F5F7' };

  const exploreActions = [
    { label: 'Open Storybook', href: "https://prism-cwpc-storybook.pages.dev/", variant: 'primary' as const },
    { label: 'View Component Showcase', href: "https://prism.cwpc.hrithiksanyal.com/", variant: 'secondary' as const },
    { label: 'View Docs', href: "https://prism.cwpc.hrithiksanyal.com/docs/", variant: 'secondary' as const },
    { label: 'View Figma File', href: PRISM_FIGMA_URL, variant: 'secondary' as const, showArrow: false },
  ];

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip" style={{ background: '#1B1B1F' }}>
      <ScrollToTop />

      {progressBarVisible
        ? createPortal(
            <div
              className="liquid-glass-progress-strip"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                height: '6px',
                zIndex: 9999,
                pointerEvents: 'none',
                transition: 'opacity 0.2s ease-out',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${scrollProgress}%`,
                  backgroundColor: progressBarColor,
                  transition: 'width 0.15s ease-out',
                }}
              />
            </div>,
            document.body,
          )
        : null}

      <div
        className="w-full relative overflow-hidden"
        style={{ height: 'clamp(300px, 42vw, 500px)', background: '#1B1B1F' }}
      >
        <img
          src="/cwpc/Group 15.png"
          alt="CWPC header"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16 w-full min-w-0 box-border">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 md:gap-16 min-w-0">
          <div className="space-y-8 min-w-0 order-2 md:order-none">
            <div className="block shrink-0" style={{ width: 48, height: 48 }}>
              <img
                src="/cwpc/cwpc-logo.png"
                alt="Catastrophic Wildfire Prevention Consortium"
                onClick={(e) => {
                  e.stopPropagation();
                  openLightbox(
                    [
                      {
                        src: '/cwpc/cwpc-logo.png',
                        alt: 'Catastrophic Wildfire Prevention Consortium',
                        caption: 'Catastrophic Wildfire Prevention Consortium',
                      },
                    ],
                    0,
                  );
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left center',
                  cursor: 'zoom-in',
                }}
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="space-y-8">
              <div>
                <div style={metaLabelStyle}>Company</div>
                <div style={metaValueStyle}>{company}</div>
              </div>
              <div>
                <div style={metaLabelStyle}>My Deliverables</div>
                <div style={metaValueStyle}>{role}</div>
              </div>
              <div>
                <div style={metaLabelStyle}>Team</div>
                <div style={metaValueStyle}>{team}</div>
              </div>
              <div>
                <div style={metaLabelStyle}>When</div>
                <div style={metaValueStyle}>{when}</div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#F5F5F7',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '6px',
                    fontWeight: 600,
                  }}
                >
                  Live Sites
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <a
                    href={PRISM_SHOWCASE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '14px',
                      color: '#FF6701',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Component Showcase ↗
                  </a>
                  <a
                    href={PRISM_DOCS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '14px',
                      color: '#FF6701',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Prism Docs ↗
                  </a>
                  <a
                    href={PRISM_STORYBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '14px',
                      color: '#FF6701',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Storybook ↗
                  </a>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="text-[15px] transition-colors hidden md:block cursor-pointer"
              style={{ color: '#71717A' }}
            >
              ← Back to Work
            </button>
          </div>

          <div className="space-y-16 min-w-0 max-w-full order-1 md:order-none">
            <div className="md:hidden">
              <button
                type="button"
                onClick={onBack}
                className="text-[15px] transition-colors cursor-pointer"
                style={{ color: '#71717A' }}
              >
                ← Back to Work
              </button>
            </div>

            <div className="space-y-6">
              <h1
                className="text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] font-bold tracking-tight"
                style={{ color: '#F5F5F7' }}
              >
                {title}
              </h1>
              <p
                className="text-[26px] md:text-[28px] lg:text-[30px] leading-relaxed font-medium"
                style={{ color: '#F5F5F7' }}
              >
                {subtitle}
              </p>
              {SHOW_PROJECT_OVERVIEW && overview ? (
                <p className="text-[18px] md:text-[20px] leading-[1.8]" style={{ color: '#F5F5F7' }}>
                  {overview}
                </p>
              ) : null}
            </div>

            <div className="space-y-8">
              <div className="space-y-2 text-center">
                <h3 className="text-[11px] tracking-[0.2em] uppercase font-medium" style={speedReadMuted}>
                  Speed Read
                </h3>
                <p className="text-[18px] leading-[1.85]" style={speedReadBody}>
                  In a rush? Here&apos;s the gist.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium" style={speedReadMuted}>
                    Challenge
                  </h4>
                  <p className="text-[18px] leading-[1.85]" style={speedReadBody}>
                    {speedReadChallenge}
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium" style={speedReadMuted}>
                    Process
                  </h4>
                  <p className="text-[18px] leading-[1.85]" style={speedReadBody}>
                    {speedReadProcess}
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium" style={speedReadMuted}>
                    Takeaways
                  </h4>
                  <p className="text-[18px] leading-[1.85]" style={speedReadBody}>
                    {speedReadTakeaways}
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium" style={speedReadMuted}>
                    Impact
                  </h4>
                  <p className="text-[18px] leading-[1.85]" style={speedReadBody}>
                    {speedReadImpact}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 flex flex-col items-center text-center">
                <p className="text-[18px] leading-[1.85]" style={speedReadBody}>
                  Have more time?
                </p>
                <p className="text-[16px] leading-relaxed" style={{ color: '#F5F5F7' }}>
                  Jump into live Prism resources docs, Storybook, showcase, and Figma.
                </p>
                <div className="w-full max-w-[960px] mt-6">
                  <DesignSystemExploreCallout
                    theme="cwpc"
                    sectionLabel="Explore Prism"
                    headlineLine1="68 components. 3 layers."
                    headlineLine2="One source of truth."
                    subtext="Every component interactive. Every prop documented."
                    actions={exploreActions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="case-study-start"
          className="space-y-16 mt-16 w-full min-w-0 max-w-full overflow-x-clip"
          style={{ scrollMarginTop: 'var(--nav-height, 80px)' }}
        >
          {/* <div className="rounded-2xl border border-white/[0.08] bg-[#232329] px-6 py-16 md:px-12 text-center">
            <p className="text-[18px] leading-relaxed" style={{ color: '#A1A1AA' }}>
              Full case study narrative for the CWPC design system is coming soon. Use the links above for live docs,
              Storybook, and the component showcase.
            </p>
          </div> */}
          <div style={{ marginTop: '80px' }}>
            <div
              style={{
                height: '80px',
                background: 'linear-gradient(to bottom, #1B1B1F, rgba(27,27,31,0))',
                marginBottom: '-40px',
              }}
            />
            <ExploreMoreSection
              currentProjectId={CURRENT_PROJECT_ID}
              onBack={onBack}
              onProjectClick={onProjectClick}
              projectTitleColor="#ffffff"
            />
          </div>
          <div className="md:hidden pt-8">
            <button
              type="button"
              onClick={onBack}
              className="text-[15px] transition-colors cursor-pointer"
              style={{ color: '#71717A' }}
            >
              ← Back to Work
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12" data-footer>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 text-[13px]">
          <div className="flex flex-wrap items-center gap-2" style={{ color: '#71717A' }}>
            <FooterCreditsRow />
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <a
              href="https://www.figma.com/@iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: '#71717A' }}
              aria-label="Figma"
            >
              <Figma className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://github.com/iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: '#71717A' }}
              aria-label="GitHub"
            >
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.linkedin.com/in/iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: '#71717A' }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.youtube.com/@avlnce"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: '#71717A' }}
              aria-label="YouTube"
            >
              <Youtube className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.instagram.com/hrithiksanyal/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: '#71717A' }}
              aria-label="Instagram"
            >
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.facebook.com/Avlnce/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: '#71717A' }}
              aria-label="Facebook"
            >
              <Facebook className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
