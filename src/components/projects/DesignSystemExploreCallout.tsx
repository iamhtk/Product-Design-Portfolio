import type { CSSProperties } from 'react';

export type DesignSystemExploreAction = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
  /** Default true for primary and secondary except when false (e.g. Figma). */
  showArrow?: boolean;
};

type DesignSystemExploreCalloutProps = {
  theme: 'cwpc' | 'raseet';
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2: string;
  subtext: string;
  actions: DesignSystemExploreAction[];
};

/** Matches the EXPLORE PRISM block in CWPC.tsx (case study) — outer shell + glow + typography + pills. */
export function DesignSystemExploreCallout({
  theme,
  sectionLabel,
  headlineLine1,
  headlineLine2,
  subtext,
  actions,
}: DesignSystemExploreCalloutProps) {
  const isCwpc = theme === 'cwpc';

  const outerShell: CSSProperties = isCwpc
    ? {
        background: '#1B1B1F',
        borderRadius: '16px',
        padding: '48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        width: '100%',
      }
    : {
        background: '#ffffff',
        borderRadius: '16px',
        padding: '48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(26, 107, 138, 0.18)',
        width: '100%',
      };

  const glowLayer: CSSProperties = isCwpc
    ? {
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 0%, rgba(255,103,1,0.15), transparent 70%)',
        pointerEvents: 'none',
      }
    : {
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 0%, rgba(26,107,138,0.14), transparent 70%)',
        pointerEvents: 'none',
      };

  const labelStyle: CSSProperties = isCwpc
    ? {
        fontSize: '11px',
        fontWeight: 700,
        color: '#FF6701',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        margin: '0 0 16px 0',
      }
    : {
        fontSize: '11px',
        fontWeight: 700,
        color: '#1A6B8A',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        margin: '0 0 16px 0',
      };

  const headlineStyle: CSSProperties = isCwpc
    ? {
        fontSize: '28px',
        fontWeight: 800,
        color: '#F5F5F7',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        margin: '0 0 12px 0',
      }
    : {
        fontSize: '28px',
        fontWeight: 800,
        color: '#0f172a',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        margin: '0 0 12px 0',
      };

  const subStyle: CSSProperties = isCwpc
    ? { fontSize: '15px', color: '#A1A1AA', margin: '0 0 32px 0', lineHeight: 1.5 }
    : { fontSize: '15px', color: '#64748b', margin: '0 0 32px 0', lineHeight: 1.5 };

  const primaryLinkStyle: CSSProperties = isCwpc
    ? {
        padding: '12px 28px',
        background: '#FF6701',
        color: 'black',
        borderRadius: '50px',
        fontSize: '14px',
        fontWeight: 700,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxSizing: 'border-box',
        border: 'none',
      }
    : {
        padding: '12px 28px',
        background: '#1A6B8A',
        color: '#ffffff',
        borderRadius: '50px',
        fontSize: '14px',
        fontWeight: 700,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxSizing: 'border-box',
        border: 'none',
      };

  const secondaryLinkStyle: CSSProperties = isCwpc
    ? {
        padding: '12px 28px',
        background: 'transparent',
        color: '#F5F5F7',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '50px',
        fontSize: '14px',
        fontWeight: 600,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxSizing: 'border-box',
      }
    : {
        padding: '12px 28px',
        background: 'transparent',
        color: '#0f172a',
        border: '1px solid rgba(26,107,138,0.35)',
        borderRadius: '50px',
        fontSize: '14px',
        fontWeight: 600,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxSizing: 'border-box',
      };

  const rowStyle: CSSProperties = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  return (
    <div className="w-full max-w-[960px] mx-auto" style={outerShell}>
      <div aria-hidden style={glowLayer} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={labelStyle}>{sectionLabel.toUpperCase()}</div>
        <div style={headlineStyle} role="heading" aria-level={2}>
          {headlineLine1}
          <br />
          {headlineLine2}
        </div>
        <div style={subStyle}>{subtext}</div>
        <div style={rowStyle}>
          {actions.map((action) => {
            const showArrow = action.showArrow !== false;
            const text = showArrow ? `${action.label} →` : action.label;
            const isPrimary = action.variant === 'primary';
            return (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                style={isPrimary ? primaryLinkStyle : secondaryLinkStyle}
              >
                {text}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
