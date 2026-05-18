import { useEffect, useRef, useState } from 'react';
import { FooterCreditsRow } from '../FooterAccessibilityLink';
import { createPortal } from 'react-dom';
import { Linkedin, Youtube, Instagram, Facebook, Github, Figma } from 'lucide-react';
import { ScrollToTop } from '../ScrollToTop';
import { ExploreMoreSection } from './ExploreMoreSection';
import { designTokens as dt } from '../../lib/designTokens';

const CURRENT_PROJECT_ID = 'PortfolioDesignSystem';

const PROGRESS_BAR_HIDE_DELAY_MS = 400;

const COLOR_LABELS: Record<keyof typeof dt.colors, string> = {
  background: 'Background',
  surface: 'Surface',
  textPrimary: 'Text primary',
  textMuted: 'Text muted',
  textLabel: 'Text label',
  border: 'Border',
  navBackground: 'Nav background',
  imagePlaceholder: 'Image placeholder',
  codeSurface: 'Code surface',
};

const TYPO_ORDER: (keyof typeof dt.typography.scale)[] = [
  'hero',
  'pageTitle',
  'cardTitle',
  'sectionLabel',
  'metadataTag',
  'body',
  'caption',
];

const SPACING_ORDER = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;

const RADIUS_SHOW = ['none', 'sm', 'md', 'lg'] as const;

function useWideLayout() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const fn = () => setWide(mq.matches);
    fn();
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return wide;
}

function sectionLabelClass(): string {
  return 'type-overline text-gray-400';
}

interface PortfolioDesignSystemProjectProps {
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

export function PortfolioDesignSystemProject({
  onBack,
  onProjectClick,
}: PortfolioDesignSystemProjectProps) {
  const wide = useWideLayout();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const hideBarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const gutterX = wide ? dt.spacing['2xl'] : dt.spacing.lg;
  const sectionGap = dt.spacing['3xl'];

  const pageShell: React.CSSProperties = {
    maxWidth: dt.layout.maxContentWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: gutterX,
    paddingRight: gutterX,
    paddingTop: dt.spacing['2xl'],
    paddingBottom: dt.spacing['2xl'],
  };

  const swatchCard: React.CSSProperties = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: dt.colors.border,
    borderRadius: dt.radius.lg,
    overflow: 'hidden',
    backgroundColor: dt.colors.surface,
    boxShadow: dt.shadows.subtle,
  };

  const componentCell: React.CSSProperties = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: dt.colors.border,
    borderRadius: dt.radius.lg,
    padding: dt.spacing.lg,
    backgroundColor: dt.colors.surface,
  };

  const figmaCard: React.CSSProperties = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: dt.colors.border,
    borderRadius: dt.radius.lg,
    padding: dt.spacing['2xl'],
    backgroundColor: dt.colors.surface,
    boxShadow: dt.shadows.subtle,
  };

  const codeBlock: React.CSSProperties = {
    fontFamily: dt.typography.fontFamily.mono,
    fontSize: dt.typography.scale.caption.size,
    lineHeight: dt.typography.scale.caption.lineHeight,
    color: dt.colors.textPrimary,
    backgroundColor: dt.colors.codeSurface,
    borderRadius: dt.radius.md,
    padding: dt.spacing.lg,
    whiteSpace: 'pre-wrap',
    margin: 0,
  };

  const colorEntries = Object.entries(dt.colors) as [keyof typeof dt.colors, string][];

  return (
    <div className="min-h-screen" style={{ backgroundColor: dt.colors.background }}>
      <ScrollToTop />

      {progressBarVisible &&
        createPortal(
          <div
            className="liquid-glass-progress-strip"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: dt.layout.progressBarHeight,
              zIndex: 9999,
              pointerEvents: 'none',
              transition: dt.transitions.progressStripOpacity,
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${scrollProgress}%`,
                backgroundColor: dt.colors.textPrimary,
                transition: dt.transitions.progressStripWidth,
              }}
            />
          </div>,
          document.body
        )}

      {/* Header banner */}
      <div
        className="w-full flex items-center justify-center overflow-hidden"
        style={{
          minHeight: wide ? dt.layout.caseStudyHeaderBannerMinHeightMd : dt.layout.caseStudyHeaderBannerMinHeight,
          backgroundColor: dt.colors.imagePlaceholder,
        }}
      >
        <div
          style={{
            fontFamily: dt.typography.fontFamily.sans,
            fontSize: dt.typography.scale.hero.size,
            fontWeight: Number(dt.typography.scale.hero.weight),
            letterSpacing: dt.typography.scale.hero.letterSpacing,
            color: dt.colors.textMuted,
          }}
        >
          Aa
        </div>
      </div>

      <div style={pageShell}>
        {/* Section 1, Case study header */}
        <header style={{ marginBottom: sectionGap }}>
          <div style={{ marginBottom: dt.spacing.md }}>
            <button
              type="button"
              onClick={onBack}
              className="type-caption border-0 bg-transparent cursor-pointer p-0 text-left hover:opacity-70"
              style={{ color: dt.colors.textMuted }}
            >
              Work
            </button>
            <span className="type-caption" style={{ color: dt.colors.textLabel }}>
              {' '}
              / Design System
            </span>
          </div>

          <h1 className="type-h1 text-gray-900" style={{ marginBottom: dt.spacing.md }}>
            Portfolio Design System
          </h1>

          <p
            className="project-card-meta type-caption text-gray-500 uppercase"
            style={{ letterSpacing: dt.typography.scale.sectionLabel.letterSpacing, marginBottom: dt.spacing.sm }}
          >
            SOLO PROJECT | FIGMA + CURSOR | REACT + TYPESCRIPT | 2025
          </p>

          <p
            className="type-caption text-gray-400 tracking-wide"
            style={{ marginBottom: dt.spacing.lg }}
          >
            8 MINUTE READ
          </p>

          <p className="type-body text-gray-600">
            The visual foundation behind hrithiksanyal.com. Designed in Figma. Built with Cursor.
          </p>
        </header>

        {/* Section 2, Overview */}
        <section style={{ marginBottom: sectionGap }}>
          <h2 className={`${sectionLabelClass()} mb-6`}>OVERVIEW</h2>
          <div className="space-y-6">
            <p className="type-body text-gray-700">
              Most portfolios are assembled. This one was architected. Before a single line of code was written, I
              built a design system in Figma, tokens, type scales, component rules, and used it as the contract
              between design and code.
            </p>
            <p className="type-body text-gray-700">
              This page is that system, made visible. Every component you see here is live, pulled directly from the
              site&apos;s own component library. The font is Titillium Web. The values are real.
            </p>
          </div>
        </section>

        {/* Section 3, Process */}
        <section style={{ marginBottom: sectionGap }}>
          <h2 className={`${sectionLabelClass()} mb-8`}>PROCESS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: wide ? dt.spacing['2xl'] : dt.spacing.xl }}>
            {(
              [
                { n: '1', title: 'Audit', body: 'Reverse-engineered the visual patterns already in use into concrete, nameable tokens.' },
                { n: '2', title: 'Figma', body: 'Built the full system in Figma: color styles, text styles, spacing rules, and a component library.' },
                { n: '3', title: 'Cursor', body: 'Used the Figma system as a written spec. Vibe-coded the implementation with Cursor, token by token.' },
              ] as const
            ).map((step) => (
              <div key={step.n}>
                <p
                  className="type-overline text-gray-400 mb-3"
                  style={{ letterSpacing: dt.typography.scale.sectionLabel.letterSpacing }}
                >
                  #{step.n}, {step.title}
                </p>
                <p className="type-body text-gray-700">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4, Color */}
        <section style={{ marginBottom: sectionGap }}>
          <h2 className={`${sectionLabelClass()} mb-8`}>COLOR</h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            style={{ gap: dt.spacing.lg }}
          >
            {colorEntries.map(([key, value]) => (
              <div key={key} style={swatchCard}>
                <div
                  style={{
                    height: dt.spacing['4xl'],
                    backgroundColor: value,
                    borderBottomWidth: '1px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: dt.colors.border,
                  }}
                />
                <div style={{ padding: dt.spacing.md }}>
                  <p className="type-body text-gray-900" style={{ marginBottom: dt.spacing.xs }}>
                    {COLOR_LABELS[key]}
                  </p>
                  <p className="type-caption text-gray-500" style={{ wordBreak: 'break-all' }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5, Typography */}
        <section style={{ marginBottom: sectionGap }}>
          <h2 className={`${sectionLabelClass()} mb-8`}>TYPOGRAPHY</h2>
          <div>
            {TYPO_ORDER.map((name) => {
              const spec = dt.typography.scale[name];
              const label = name.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
              return (
                <div
                  key={name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: wide
                      ? `minmax(${dt.spacing['3xl']}, auto) 1fr minmax(${dt.spacing['4xl']}, auto)`
                      : '1fr',
                    gap: dt.spacing.md,
                    alignItems: 'center',
                    paddingTop: dt.spacing.lg,
                    paddingBottom: dt.spacing.lg,
                    borderBottomWidth: '1px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: dt.colors.border,
                  }}
                >
                  <span className={sectionLabelClass()}>{label}</span>
                  <span
                    style={{
                      fontFamily: dt.typography.fontFamily.sans,
                      fontSize: spec.size,
                      fontWeight: Number(spec.weight),
                      lineHeight: spec.lineHeight || 1.5,
                      letterSpacing: spec.letterSpacing || undefined,
                      ...(spec.textTransform ? { textTransform: spec.textTransform } : {}),
                      color: dt.colors.textPrimary,
                    }}
                  >
                    The quick brown fox
                  </span>
                  <span className="type-caption text-gray-500">
                    {spec.size} / {spec.weight}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 6, Spacing */}
        <section style={{ marginBottom: sectionGap }}>
          <h2 className={`${sectionLabelClass()} mb-8`}>SPACING</h2>
          <div className="flex flex-col" style={{ gap: dt.spacing.md }}>
            {SPACING_ORDER.map((key) => {
              const val = dt.spacing[key];
              return (
                <div
                  key={key}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
                  style={{ gap: dt.spacing.md }}
                >
                  <span className="type-caption text-gray-500 shrink-0" style={{ minWidth: dt.spacing['3xl'] }}>
                    {key}
                  </span>
                  <div
                    style={{
                      height: dt.spacing.sm,
                      width: val,
                      maxWidth: '100%',
                      backgroundColor: dt.colors.textLabel,
                      borderRadius: dt.radius.sm,
                    }}
                  />
                  <span className="type-caption text-gray-500 shrink-0">{val}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 7, Border radius */}
        <section style={{ marginBottom: sectionGap }}>
          <h2 className={`${sectionLabelClass()} mb-8`}>BORDER RADIUS</h2>
          <div className="flex flex-row flex-wrap" style={{ gap: dt.spacing.xl }}>
            {RADIUS_SHOW.map((key) => {
              const r = dt.radius[key];
              const square = dt.spacing['2xl'];
              return (
                <div key={key} className="flex flex-col items-center" style={{ gap: dt.spacing.sm }}>
                  <div
                    style={{
                      width: square,
                      height: square,
                      backgroundColor: dt.colors.surface,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: dt.colors.border,
                      borderRadius: r,
                      boxShadow: dt.shadows.subtle,
                    }}
                  />
                  <span className="type-caption text-gray-500">{key}</span>
                  <span className="type-caption text-gray-400">{r}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 8, Components */}
        <section style={{ marginBottom: sectionGap }}>
          <h2 className={`${sectionLabelClass()} mb-8`}>COMPONENTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: dt.spacing['2xl'] }}>
            <div style={componentCell}>
              <p className={`${sectionLabelClass()} mb-4`}>NAV LINK</p>
              <div className="flex flex-wrap items-center" style={{ gap: dt.spacing.xl }}>
                <button
                  type="button"
                  className="relative border-0 bg-transparent cursor-default p-0"
                  style={{ paddingTop: dt.spacing.sm, paddingBottom: dt.spacing.sm }}
                >
                  <span className="text-[15px] text-gray-500">Work</span>
                </button>
                <button
                  type="button"
                  className="relative border-0 bg-transparent cursor-default p-0"
                  style={{ paddingTop: dt.spacing.sm, paddingBottom: dt.spacing.sm }}
                >
                  <span className="text-[15px] text-gray-900 font-medium">Work</span>
                  <div
                    className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gray-900"
                    style={{
                      bottom: `-${dt.spacing.xs}`,
                      width: dt.spacing.xs,
                      height: dt.spacing.xs,
                    }}
                  />
                </button>
              </div>
            </div>

            <div style={componentCell}>
              <p className={`${sectionLabelClass()} mb-4`}>METADATA TAG</p>
              <div className="project-card-meta">
                <p className="type-caption text-gray-500 uppercase" style={{ letterSpacing: '0.2em' }}>
                  DESIGN SYSTEM | REACT + TYPESCRIPT | 68 COMPONENTS
                </p>
              </div>
            </div>

            <div style={componentCell}>
              <p className={`${sectionLabelClass()} mb-4`}>READ TIME / CAPTION</p>
              <p className="type-caption text-gray-400 pt-1 tracking-wide">10 MINUTE READ →</p>
            </div>

            <div style={componentCell}>
              <p className={`${sectionLabelClass()} mb-4`}>SECTION LABEL</p>
              <h2 className="type-overline text-gray-400">DESIGN x ENGINEERING</h2>
            </div>

            <div style={{ ...componentCell, gridColumn: '1 / -1' }}>
              <p className={`${sectionLabelClass()} mb-4`}>PROJECT CARD (MINI)</p>
              <div
                style={{
                  maxWidth: dt.layout.miniProjectCardMaxWidth,
                  transform: `scale(${dt.layout.componentPreviewScale})`,
                  transformOrigin: 'top left',
                }}
              >
                <div className="h-full flex flex-col rounded-xl overflow-hidden bg-white border border-black/[0.06] shadow-[var(--shadow-card)]">
                  <div
                    className="mb-4 w-full flex-shrink-0 overflow-hidden"
                    style={{ backgroundColor: dt.colors.imagePlaceholder, aspectRatio: '1 / 1' }}
                  />
                  <div className="project-card-meta flex flex-col flex-1 space-y-2 px-3 pb-3">
                    <h3 className="type-body-lg text-gray-900 font-semibold leading-[1.4] line-clamp-2">Portfolio Design System</h3>
                    <p className="type-caption text-gray-500 leading-relaxed line-clamp-2 uppercase" style={{ letterSpacing: '0.2em' }}>
                      META CASE STUDY | TOKENS | COMPONENTS
                    </p>
                    <p className="type-caption text-gray-400 pt-1 mt-auto tracking-wide">8 MINUTE READ →</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ ...componentCell, gridColumn: '1 / -1' }}>
              <p className={`${sectionLabelClass()} mb-4`}>BLOG CARD (MINI)</p>
              <article className="max-w-xl space-y-6">
                <div className="type-overline text-gray-400">MARCH 25, 2025</div>
                <div>
                  <h2 className="type-h2 mb-3 text-gray-900">On documenting the system behind the site</h2>
                  <p className="type-body-lg text-gray-600">A short line about tokens, Figma, and shipping the portfolio itself.</p>
                </div>
                <p className="type-body text-gray-600">
                  Tokens stay in sync when design and code share one vocabulary, fewer surprises when the next page ships.
                </p>
                <span className="inline-flex items-center text-[15px] text-gray-900 group cursor-default">
                  <span>Read on Medium</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </article>
            </div>

            <div style={{ ...componentCell, gridColumn: '1 / -1' }}>
              <p className={`${sectionLabelClass()} mb-4`}>FRIENDS ROW</p>
              <div
                className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1.5fr_1fr_auto] items-start min-w-0 border-b"
                style={{
                  gap: wide ? dt.spacing['2xl'] : dt.spacing.md,
                  paddingTop: wide ? dt.spacing.lg : dt.spacing.md,
                  paddingBottom: wide ? dt.spacing.lg : dt.spacing.md,
                  borderBottomWidth: '1px',
                  borderBottomStyle: 'solid',
                  borderBottomColor: dt.colors.border,
                }}
              >
                <div className="type-caption text-gray-400">01</div>
                <div className="type-body text-gray-900 min-w-0 break-words">Alex Rivera</div>
                <div className="hidden md:block">
                  <p className="type-body text-gray-900">Design Engineer</p>
                  <p className="type-caption text-gray-400">Example Studio</p>
                </div>
                <div className="hidden md:block type-body text-gray-400">example.studio</div>
                <div className="type-caption text-gray-400 md:text-right">
                  <span>View profile</span>
                  <span className="ml-1" aria-hidden>
                    →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9, Figma */}
        <section style={{ marginBottom: sectionGap }}>
          <h2 className={`${sectionLabelClass()} mb-8`}>FIGMA</h2>
          <div style={figmaCard} className="text-center">
            <p className="type-body text-gray-900 font-medium" style={{ marginBottom: dt.spacing.md }}>
              View Source File
            </p>
            <a
              href="https://www.figma.com/@iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block type-body font-medium border-0 cursor-pointer no-underline transition-opacity hover:opacity-80"
              style={{
                backgroundColor: dt.colors.textPrimary,
                color: dt.colors.background,
                paddingLeft: dt.spacing.lg,
                paddingRight: dt.spacing.lg,
                paddingTop: dt.spacing.md,
                paddingBottom: dt.spacing.md,
                borderRadius: dt.radius.lg,
              }}
            >
              Open in Figma ↗
            </a>
            <p className="type-caption text-gray-500" style={{ marginTop: dt.spacing.lg }}>
              Every token and component on this page originated here.
            </p>
          </div>
        </section>

        {/* Section 10, Built with Cursor */}
        <section style={{ marginBottom: sectionGap }}>
          <h2 className={`${sectionLabelClass()} mb-8`}>BUILT WITH CURSOR</h2>
          <div className="flex flex-col" style={{ gap: dt.spacing['2xl'] }}>
            <div>
              <p className={`${sectionLabelClass()} mb-3`}>PROMPT 01</p>
              <pre style={codeBlock}>
                {`"Audit the codebase and extract all design tokens into src/lib/designTokens.ts. Map colors to semantic role names. Font is Titillium Web. Do not invent values, only use what exists in the codebase."`}
              </pre>
            </div>
            <div>
              <p className={`${sectionLabelClass()} mb-3`}>PROMPT 02</p>
              <pre style={codeBlock}>
                {`"Build a /design-system page using only values from designTokens.ts. Every component shown on the page must be a live render of an actual site component, not a screenshot or static image."`}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className={`${sectionLabelClass()} mb-8`}>EXPLORE MORE</h2>
          <ExploreMoreSection
            currentProjectId={CURRENT_PROJECT_ID}
            onBack={onBack}
            onProjectClick={onProjectClick}
            projectTitleColor={dt.colors.textPrimary}
          />
        </section>
      </div>

      <div
        className="mx-auto"
        style={{ maxWidth: dt.layout.maxPageWidth, paddingLeft: gutterX, paddingRight: gutterX }}
        data-footer
      >
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8"
          style={{ fontSize: dt.typography.scale.caption.size, color: dt.colors.textMuted }}
        >
          <FooterCreditsRow />

          <div className="flex items-center gap-3 md:gap-5">
            <a
              href="https://www.figma.com/@iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-70"
              style={{ color: dt.colors.textLabel }}
              aria-label="Figma"
            >
              <Figma style={{ width: dt.spacing.lg, height: dt.spacing.lg }} />
            </a>
            <a
              href="https://github.com/iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-70"
              style={{ color: dt.colors.textLabel }}
              aria-label="GitHub"
            >
              <Github style={{ width: dt.spacing.lg, height: dt.spacing.lg }} />
            </a>
            <a
              href="https://www.linkedin.com/in/iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-70"
              style={{ color: dt.colors.textLabel }}
              aria-label="LinkedIn"
            >
              <Linkedin style={{ width: dt.spacing.lg, height: dt.spacing.lg }} />
            </a>
            <a
              href="https://www.youtube.com/@avlnce"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-70"
              style={{ color: dt.colors.textLabel }}
              aria-label="YouTube"
            >
              <Youtube style={{ width: dt.spacing.lg, height: dt.spacing.lg }} />
            </a>
            <a
              href="https://www.instagram.com/hrithiksanyal/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-70"
              style={{ color: dt.colors.textLabel }}
              aria-label="Instagram"
            >
              <Instagram style={{ width: dt.spacing.lg, height: dt.spacing.lg }} />
            </a>
            <a
              href="https://www.facebook.com/Avlnce/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-70"
              style={{ color: dt.colors.textLabel }}
              aria-label="Facebook"
            >
              <Facebook style={{ width: dt.spacing.lg, height: dt.spacing.lg }} />
            </a>
            <a
              href="https://x.com/hrithiksanyal"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-70"
              style={{ color: dt.colors.textLabel }}
              aria-label="X (Twitter)"
            >
              <svg style={{ width: dt.spacing.lg, height: dt.spacing.lg }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://soundcloud.com/avlncemusic"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-70"
              style={{ color: dt.colors.textLabel }}
              aria-label="SoundCloud"
            >
              <svg style={{ width: dt.spacing.lg, height: dt.spacing.lg }} viewBox="0 0 800 348" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M101.875 163.438C99.375 163.438 97.5 165.313 97.1875 168.125L90 255.625L97.1875 340.313C97.5 342.813 99.375 345 101.875 345C104.375 345 106.25 343.125 106.563 340.313L114.687 255.625L106.563 168.125C106.25 165.313 104.063 163.438 101.875 163.438Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
