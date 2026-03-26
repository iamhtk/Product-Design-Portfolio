/**
 * Design tokens extracted from this repo (confirmed usage only).
 *
 * Audit order (as requested):
 * 1) tailwind.config.js / tailwind.config.ts
 *    - No Tailwind config at the portfolio app root. The main site uses Tailwind CSS v4 with
 *      theme tokens emitted into `src/index.css` (@layer theme + compiled utilities).
 *    - A separate `analytics-dashboard/tailwind.config.js` exists for the analytics sub-app only;
 *      it is not the source of truth for the main portfolio UI.
 * 2) Global CSS (`src/index.css`, `src/styles/globals.css`)
 *    - `:root` custom properties: see values below (globals.css is the richer source for
 *      portfolio-specific shadows, radii, nav, and typography scale).
 *    - `src/index.css` duplicates/overlaps some `:root` vars and defines Tailwind v4 `--color-*`,
 *      `--spacing`, `--default-transition-*`, etc.
 * 3) App shell (`src/App.tsx`, `src/components/Navigation.tsx`)
 *    - Repeated patterns: `min-h-screen overflow-x-hidden` on the app root; `liquid-glass` nav;
 *      horizontal page gutters `px-6 md:px-8 lg:px-12`; max content width `max-w-[1600px] mx-auto`;
 *      `type-overline text-gray-400` + `type-h1 text-gray-900` + `type-body text-gray-600` on
 *      error/empty states; `project-page-offset` for project pages (padding-top: var(--nav-height)).
 *
 * Font: Titillium Web is loaded in `index.html` (Google Fonts) and set as `--font-primary` in CSS.
 */

export const designTokens = {
  colors: {
    background: '#ffffff', // --page-bg, --background (src/styles/globals.css :root)
    surface: '#ffffff', // --card (src/styles/globals.css :root)
    textPrimary: 'oklch(0.18 0.01 265)', // --foreground (src/styles/globals.css :root); paired with text-gray-900 in App
    textMuted: 'oklch(0.551 0.027 264.364)', // Tailwind text-gray-500 token (--color-gray-500 in src/index.css @layer theme); common for secondary copy
    textLabel: 'oklch(0.707 0.022 261.325)', // Tailwind text-gray-400 token (--color-gray-400); used with .type-overline (e.g. App.tsx error states)
    border: 'rgba(0, 0, 0, 0.1)', // --border (src/styles/globals.css :root)
    navBackground: 'rgba(255, 255, 255, 0.72)', // .liquid-glass background (src/styles/globals.css)
    /** --secondary (src/styles/globals.css :root); neutral fill for placeholders */
    imagePlaceholder: 'oklch(0.95 0.0058 264.53)',
    /** --input-background (src/styles/globals.css :root) */
    codeSurface: '#f3f3f5',
  },
  typography: {
    fontFamily: {
      sans: "'Titillium Web', sans-serif",
      /** --font-mono (src/styles/globals.css :root) */
      mono:
        'ui-monospace, "SF Mono", "Cascadia Mono", "Segoe UI Mono", "Liberation Mono", Menlo, Consolas, monospace',
    },
    /** --tracking-wide (src/index.css @layer theme) */
    trackingWide: '0.025em',
    scale: {
      // From .type-* utilities (src/styles/globals.css); sizes use --type-* vars (responsive at lg).
      hero: {
        size: '2.75rem', // --type-display (base; lg: 2.875rem)
        weight: '700',
        lineHeight: '1.15',
        letterSpacing: '-0.02em',
      },
      pageTitle: {
        size: '2.125rem', // --type-h1 (base; lg: 2.25rem)
        weight: '600',
        lineHeight: '1.2',
        letterSpacing: '', // TODO: not set on .type-h1; pages often rely on default / Tailwind tracking classes
      },
      cardTitle: {
        size: '1.625rem', // --type-h2 (base; lg: 1.75rem) — used for section-level titles on marketing pages
        weight: '600',
        lineHeight: '1.3',
        letterSpacing: '', // TODO: not set on .type-h2
      },
      sectionLabel: {
        size: '0.6875rem', // --type-overline (11px)
        weight: '600',
        lineHeight: '', // TODO: .type-overline does not set line-height explicitly
        letterSpacing: '0.22em',
        textTransform: 'uppercase' as const,
      },
      metadataTag: {
        size: '13px', // .project-card-meta forces 13px (src/styles/globals.css)
        weight: '400',
        lineHeight: '1.5', // aligned with .type-caption
        letterSpacing: '', // TODO: varies by component (some tiles use tracking-[0.2em] etc.)
        // TODO: not a single global rule; many tiles use uppercase + tracking in JSX, others do not
        textTransform: '',
      },
      body: {
        size: '0.9375rem', // --type-body (15px)
        weight: '400',
        lineHeight: '1.65',
        letterSpacing: '', // TODO: body sets letter-spacing: 0.01em on <body> globally; not duplicated on .type-body
      },
      caption: {
        size: '0.8125rem', // --type-caption (13px)
        weight: '400',
        lineHeight: '1.5',
        letterSpacing: '',
      },
    },
  },
  spacing: {
    // Tailwind spacing scale: --spacing: 0.25rem (4px) in src/index.css @layer theme → utility n = n * 0.25rem
    xs: '0.25rem', // 4px — calc(var(--spacing) * 1)
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
    '4xl': '5rem', // 80px
  },
  radius: {
    none: '0px',
    sm: 'calc(0.625rem - 4px)', // --radius-sm (@theme inline in src/styles/globals.css)
    md: 'calc(0.625rem - 2px)', // --radius-md
    lg: '0.625rem', // --radius / --radius-lg (10px)
    pill: '9999px',
    // TODO: portfolio cards also use --radius-card: 0.75rem (.premium-card in globals.css); not mapped above
  },
  shadows: {
    none: 'none',
    subtle: '0 1px 2px rgba(0, 0, 0, 0.04)', // --shadow-subtle (src/styles/globals.css)
    card: '0 2px 8px rgba(0, 0, 0, 0.06)', // --shadow-card (src/styles/globals.css)
    // TODO: also defined in globals: --shadow-depth, --shadow-card-hover, --shadow-elevated, --shadow-expanded, --shadow-glass, --shadow-nav-scrolled
  },
  transitions: {
    // Tailwind v4 defaults in src/index.css @layer theme: .15s + cubic-bezier(.4, 0, .2, 1) drive .transition / .transition-colors
    default: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    /** Case study top progress strip (matches BMW inline behavior) */
    progressStripOpacity: 'opacity 200ms ease-out',
    progressStripWidth: 'width 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    // TODO: Navigation hover often pairs duration-300 + ease-out; premium surfaces use --transition-premium (0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94))
  },
  /** Layout strings derived from the same spacing scale (4xl = 5rem). */
  layout: {
    /** ~320px; matches 4× token `spacing['4xl']` */
    caseStudyHeaderBannerMinHeight: 'calc(4 * 5rem)',
    /** ~500px at md+; matches 5× `spacing['4xl']`, aligned with ~md:h-[500px] case study heroes */
    caseStudyHeaderBannerMinHeightMd: 'calc(5 * 5rem)',
    /** Visual scale for “mini” component previews inside documentation */
    componentPreviewScale: '0.85',
    /** Matches case-study `max-w-[1200px]` */
    maxContentWidth: '75rem',
    /** Matches site shell `max-w-[1600px]` */
    maxPageWidth: '100rem',
    /** Case study scroll progress strip height (6px) */
    progressBarHeight: '0.375rem',
    /** ~280px — matches small homepage / Explore-more tile width */
    miniProjectCardMaxWidth: '17.5rem',
  },
} as const;
