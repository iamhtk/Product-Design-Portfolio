import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { FooterCreditsRow } from '../FooterAccessibilityLink';
import { createPortal } from 'react-dom';
import { Linkedin, Youtube, Instagram, Facebook, Github, Figma } from 'lucide-react';
import { ScrollToTop } from '../ScrollToTop';
import { ExploreMoreSection } from './ExploreMoreSection';
import { SHOW_PROJECT_OVERVIEW } from './projectConfig';
import { getInitialCaseStudyVisible } from './caseStudyRestore';

const CURRENT_PROJECT_ID = 'BuiltDeployed_Project2';
const PROGRESS_BAR_HIDE_DELAY_MS = 400;
const ACCENT = '#D4641C';
const ACCENT_BG = 'rgba(212,100,28,0.08)';
const ACCENT_BORDER = 'rgba(212,100,28,0.2)';

const TEXT_BADGE_ICONS = new Set(['anthropic', 'cursor']);

function GoogleFontsLink() {
  return (
    <link
      href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Barlow+Condensed:wght@600&family=Cabin:wght@400;600&family=Cormorant+Garamond:ital@1&family=Playfair+Display:ital@1&display=swap"
      rel="stylesheet"
    />
  );
}

function ScreenshotPlaceholder({
  label,
  height = '480px',
  embedded = false,
}: {
  label: string;
  height?: string;
  embedded?: boolean;
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1.5px dashed rgba(212,100,28,0.3)',
        borderRadius: embedded ? '12px 12px 0 0' : '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '8px',
        height,
        width: '100%',
        marginTop: embedded ? 0 : '32px',
      }}
    >
      <span
        style={{
          fontSize: '12px',
          color: ACCENT,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 600,
          textAlign: 'center',
          padding: '0 16px',
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: '11px', color: '#71717A' }}>Screenshot goes here</span>
    </div>
  );
}

function TechLogo({ name, icon, color }: { name: string; icon: string; color?: string }) {
  if (TEXT_BADGE_ICONS.has(icon)) {
    return (
      <div
        style={{
          background: '#232329',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          textAlign: 'center',
          minWidth: '100px',
        }}
      >
        <span
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '11px',
            color: '#A1A1AA',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {name}
        </span>
        <span style={{ fontSize: '12px', color: '#A1A1AA' }}>{name}</span>
      </div>
    );
  }

  const iconSrc = color
    ? `https://cdn.simpleicons.org/${icon}/${color}`
    : `https://cdn.simpleicons.org/${icon}`;

  return (
    <div
      style={{
        background: '#232329',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '10px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        textAlign: 'center',
        minWidth: '100px',
      }}
    >
      <img src={iconSrc} alt={`${name} logo`} width={24} height={24} style={{ display: 'block' }} />
      <span style={{ fontSize: '12px', color: '#A1A1AA' }}>{name}</span>
    </div>
  );
}

function CodeBlock({ filename, code }: { filename: string; code: string }) {
  return (
    <div
      style={{
        background: '#1E1E1E',
        borderRadius: '12px',
        overflow: 'hidden',
        marginTop: '24px',
        marginBottom: '32px',
      }}
    >
      <div style={{ background: '#2D2D2D', padding: '8px 16px' }}>
        <span style={{ fontSize: '11px', color: '#71717A', fontFamily: 'monospace' }}>{filename}</span>
      </div>
      <pre
        style={{
          margin: 0,
          padding: '24px',
          fontFamily: 'monospace',
          fontSize: '13px',
          color: '#E4E4E7',
          lineHeight: 1.8,
          overflowX: 'auto',
        }}
      >
        {code}
      </pre>
      <p style={{ fontSize: '11px', color: '#71717A', marginTop: '4px', padding: '0 16px 12px' }}>
        {'<- Scroll to see more ->'}
      </p>
    </div>
  );
}

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ height: '80px', background: hex, borderRadius: '8px 8px 0 0' }} />
      <div style={{ background: '#1B1B1F', padding: '12px 16px', borderRadius: '0 0 8px 8px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F5F7' }}>{name}</div>
        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#71717A', marginTop: '4px' }}>{hex}</div>
      </div>
    </div>
  );
}

function CaseStudyContent() {
  const sectionLabelAccent: CSSProperties = {
    display: 'inline-block',
    width: '24px',
    height: '2px',
    background: ACCENT,
    borderRadius: '2px',
    flexShrink: 0,
  };

  const sectionLabel: CSSProperties = {
    fontSize: '11px',
    letterSpacing: '0.25em',
    color: ACCENT,
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    rowGap: '6px',
  };

  const sectionHeading: CSSProperties = {
    fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
    fontWeight: 800,
    color: '#F5F5F7',
    marginBottom: '20px',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    wordBreak: 'break-word',
  };

  const bodyText: CSSProperties = {
    fontSize: 'clamp(16px, 2.2vw, 18px)',
    lineHeight: 1.85,
    color: '#F5F5F7',
    maxWidth: 'min(720px, 100%)',
  };

  const sectionGap: CSSProperties = {
    marginBottom: '96px',
    paddingTop: '16px',
  };

  const cwpcSectionDivider = (
    <div
      className="cwpc-section-divider"
      style={{
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
        margin: '0 0 96px',
      }}
    />
  );

  const fontFamilies: Record<string, string> = {
    'Alfa Slab One': "'Alfa Slab One', serif",
    Cabin: "'Cabin', sans-serif",
    'Cormorant Garamond': "'Cormorant Garamond', serif",
    'Barlow Condensed': "'Barlow Condensed', sans-serif",
    'Playfair Display': "'Playfair Display', serif",
  };

  return (
    <div className="cwpc-case-study-inner w-full min-w-0 max-w-full">
      <GoogleFontsLink />

      {/* SECTION 1 / CONTEXT */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          CONTEXT
        </p>
        <h2 style={sectionHeading}>A great restaurant with a website that did not show it</h2>
        <p style={bodyText}>
          Tandoori Junction had been serving Mountain View for years. The food had regulars, the tandoor never
          slept, and the owners had a clear sense of what the restaurant meant to the community. But the website
          was a relic: stock photos, outdated hours, no real story. The owners wanted something that felt as good
          as the food.
        </p>
        <ScreenshotPlaceholder label="Old Tandoori Junction Website vs New Site / Before / After" height="480px" />
      </div>

      {cwpcSectionDivider}

      {/* SECTION 2 / THE BRIEF */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          THE BRIEF
        </p>
        <h2 style={sectionHeading}>A full rebrand and a complete rebuild</h2>
        <div
          className="cwpc-grid-3"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '32px' }}
        >
          {[
            {
              num: '01',
              title: 'Outdated website',
              desc: 'The existing site used stock imagery and did not reflect the warmth, quality, or identity of the restaurant. It looked like a template from 2015.',
            },
            {
              num: '02',
              title: 'No print materials',
              desc: 'No to-go menu, no dine-in menu. Staff were verbally explaining the full menu to every customer who walked in or called.',
            },
            {
              num: '03',
              title: 'No brand system',
              desc: 'No documented colors, typography, or design language. Every touchpoint, from the website to signage to packaging, looked like it came from a different restaurant.',
            },
          ].map((item) => (
            <div
              key={item.num}
              style={{
                position: 'relative',
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTop: `3px solid ${ACCENT}`,
                borderRadius: '16px',
                padding: '32px',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  fontSize: '48px',
                  fontWeight: 900,
                  color: ACCENT,
                  opacity: 0.2,
                  lineHeight: 1,
                }}
              >
                {item.num}
              </span>
              <div style={{ fontSize: '17px', fontWeight: 700, color: '#F5F5F7', marginBottom: '12px', paddingRight: '48px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <ScreenshotPlaceholder label="Project Brief / Deliverables and Timeline" height="360px" />
      </div>

      {cwpcSectionDivider}

      {/* SECTION 3 / MY ROLE */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          MY ROLE
        </p>
        <h2 style={sectionHeading}>Brand, website, print: all of it</h2>
        <p style={bodyText}>
          Three distinct deliverables: a brand system, a full-stack website, and two print-ready menus. I owned all
          three simultaneously.
        </p>
        <div style={{ marginTop: '40px' }}>
          {[
            { label: 'Brand', desc: 'Color system (6 tokens), typography (5 typefaces with roles), tagline, tone of voice' },
            { label: 'Design', desc: 'Visual system, dual light/dark theme, responsive layouts, WCAG 2.1 AA compliance throughout' },
            { label: 'Frontend', desc: 'Next.js 15, TypeScript strict, Tailwind v4, Framer Motion, Radix UI, React Hook Form + Zod' },
            { label: 'Backend', desc: 'API routes, Square Catalog integration, Google Sheets form pipeline, caching strategy' },
            { label: 'DevOps', desc: 'Docker multi-stage build, AWS Amplify native pipeline, Route 53, pnpm workspace config' },
            { label: 'Print', desc: 'WeasyPrint HTML to PDF pipeline, tri-fold to-go menu, two-page dine-in menu, pdftoppm verification' },
            { label: 'Delivery', desc: 'Under 3 weeks, old site kept live throughout the entire build' },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                gap: '20px',
                padding: '16px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                alignItems: 'stretch',
              }}
            >
              <div style={{ width: '3px', background: ACCENT, borderRadius: '2px', flexShrink: 0 }} />
              <div
                style={{
                  fontSize: '11px',
                  color: ACCENT,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  width: '120px',
                  flexShrink: 0,
                  fontWeight: 600,
                  paddingTop: '2px',
                }}
              >
                {row.label}
              </div>
              <div style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.6, flex: 1 }}>{row.desc}</div>
            </div>
          ))}
        </div>
        <ScreenshotPlaceholder label="Figma / Brand System Documentation" height="400px" />
      </div>

      {cwpcSectionDivider}

      {/* SECTION 4 / BRAND SYSTEM */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          BRAND SYSTEM
        </p>
        <h2 style={sectionHeading}>Six colors. Five typefaces. One tagline.</h2>
        <p style={bodyText}>
          Before writing a line of code, I locked the brand. Every decision downstream, from component colors to dark
          mode behavior to print menu layouts, derives from this foundation. Nothing ships until the tokens are agreed.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '32px',
            marginBottom: '40px',
          }}
        >
          {[
            { name: 'Tandoor Red', hex: '#8F1B1B' },
            { name: 'Saffron', hex: '#D4641C' },
            { name: 'Turmeric Gold', hex: '#C2880A' },
            { name: 'Punjab Green', hex: '#1B5E30' },
            { name: 'Warm Cream', hex: '#FAF4E6' },
            { name: 'Charcoal', hex: '#16100C' },
          ].map((color) => (
            <ColorSwatch key={color.name} name={color.name} hex={color.hex} />
          ))}
        </div>
        <div style={{ marginBottom: '40px' }}>
          {[
            { name: 'Alfa Slab One', role: 'DISPLAY', desc: 'Bold, confident, editorial. Used for all major headings.' },
            { name: 'Cabin', role: 'BODY', desc: 'Readable, neutral, accessible. All body copy and UI text.' },
            { name: 'Cormorant Garamond', role: 'ACCENT', desc: 'Elegant, cultural, refined. Pull quotes and accent text.' },
            { name: 'Barlow Condensed', role: 'HEADLINES', desc: 'High-impact, condensed, modern. Section headlines and labels.' },
            { name: 'Playfair Display', role: 'QUOTES', desc: 'Evocative, warm, storytelling. Italic pull quotes throughout.' },
          ].map((font) => (
            <div
              key={font.name}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '16px',
                padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: fontFamilies[font.name],
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#F5F5F7',
                  minWidth: '180px',
                  fontStyle: font.name === 'Playfair Display' ? 'italic' : 'normal',
                }}
              >
                {font.name}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  color: ACCENT,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                  minWidth: '100px',
                }}
              >
                {font.role}
              </span>
              <span style={{ fontSize: '13px', color: '#71717A', flex: 1, minWidth: '200px' }}>{font.desc}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: 'rgba(212,100,28,0.06)',
            border: '1px solid rgba(212,100,28,0.15)',
            borderLeft: `4px solid ${ACCENT}`,
            borderRadius: '0 16px 16px 0',
            padding: '32px 40px',
          }}
        >
          <div style={{ fontSize: '10px', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
            BRAND TAGLINE
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '36px',
              color: '#F5F5F7',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Where the Tandoor Never Sleeps.
          </p>
        </div>
        <ScreenshotPlaceholder label="Brand System / Color and Typography Reference Sheet" height="400px" />
      </div>

      {cwpcSectionDivider}

      {/* SECTION 5 / THE STACK */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          THE STACK
        </p>
        <h2 style={sectionHeading}>Full stack, plus Docker, plus print</h2>
        {[
          {
            label: 'FRONTEND',
            logos: [
              { name: 'Next.js', icon: 'nextdotjs', color: 'FFFFFF' },
              { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
              { name: 'Tailwind CSS', icon: 'tailwindcss', color: '06B6D4' },
              { name: 'Framer Motion', icon: 'framer', color: 'FFFFFF' },
              { name: 'Radix UI', icon: 'radixui', color: 'FFFFFF' },
              { name: 'Zod', icon: 'zod', color: '3E67B1' },
            ],
          },
          {
            label: 'BACKEND + INTEGRATIONS',
            logos: [
              { name: 'Square', icon: 'square', color: '3E4348' },
              { name: 'Google Sheets', icon: 'googlesheets', color: '34A853' },
              { name: 'Node.js', icon: 'nodedotjs', color: '339933' },
            ],
          },
          {
            label: 'INFRASTRUCTURE + DEVOPS',
            logos: [
              { name: 'Docker', icon: 'docker', color: '2496ED' },
              { name: 'AWS Amplify', icon: 'awsamplify', color: 'FF9900' },
              { name: 'Amazon Route 53', icon: 'amazonroute53', color: '8C4FFF' },
              { name: 'GitHub', icon: 'github', color: 'FFFFFF' },
              { name: 'pnpm', icon: 'pnpm', color: 'F69220' },
            ],
          },
          {
            label: 'PRINT PIPELINE',
            logos: [
              { name: 'WeasyPrint', icon: 'python', color: '3776AB' },
              { name: 'HTML5', icon: 'html5', color: 'E34F26' },
              { name: 'CSS3', icon: 'css3', color: '1572B6' },
            ],
          },
          {
            label: 'DESIGN + AI TOOLS',
            logos: [
              { name: 'Figma', icon: 'figma', color: 'F24E1E' },
              { name: 'Claude', icon: 'anthropic', color: 'FFFFFF' },
              { name: 'Cursor', icon: 'cursor', color: 'FFFFFF' },
            ],
          },
        ].map((group) => (
          <div key={group.label} style={{ marginBottom: '40px', marginTop: group.label === 'FRONTEND' ? '32px' : 0 }}>
            <div
              style={{
                fontSize: '10px',
                color: ACCENT,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '16px',
                fontWeight: 700,
              }}
            >
              {group.label}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {group.logos.map((logo) => (
                <TechLogo key={logo.name} name={logo.name} icon={logo.icon} color={logo.color} />
              ))}
            </div>
          </div>
        ))}
        <ScreenshotPlaceholder label="Dockerfile and amplify.yml / DevOps Configuration" height="360px" />
      </div>

      {cwpcSectionDivider}

      {/* SECTION 6 / DUAL THEME SYSTEM */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          DUAL THEME SYSTEM
        </p>
        <h2 style={sectionHeading}>Light at lunch. Dark at dinner. No localStorage.</h2>
        <p style={bodyText}>
          The site reads the current local time on every page load and sets the theme accordingly. Light mode from
          6am to 7:30pm. Dark mode from 7:30pm to 6am. The user can toggle it per session but the preference resets
          on every refresh. No localStorage, no sessionStorage, no cookies. Stateless by design.
        </p>
        <CodeBlock
          filename="hooks/useTheme.ts"
          code={`const getTimeBasedTheme = (): 'light' | 'dark' => {
  const hour    = new Date().getHours();
  const minutes = new Date().getMinutes();
  const time    = hour + minutes / 60;
  // Light: 6:00am to 7:30pm  ->  time >= 6 && time < 19.5
  // Dark:  7:30pm to 6:00am  ->  time >= 19.5 || time < 6
  return time >= 6 && time < 19.5 ? 'light' : 'dark';
};`}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '8px' }}>
          <div
            style={{
              background: '#232329',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '28px',
            }}
          >
            <div style={{ fontSize: '10px', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
              LIGHT MODE
            </div>
            <div style={{ fontSize: '13px', color: ACCENT, marginBottom: '16px', fontWeight: 600 }}>Active: 6:00am to 7:30pm</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Background', hex: '#FAF4E6', name: 'Warm Cream' },
                { label: 'Text', hex: '#16100C', name: 'Charcoal' },
              ].map((swatch) => (
                <div key={swatch.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: swatch.hex,
                      border: '1px solid rgba(255,255,255,0.12)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '12px', color: '#F5F5F7', fontWeight: 600 }}>{swatch.label}</div>
                    <div style={{ fontSize: '11px', color: '#71717A' }}>
                      {swatch.hex} ({swatch.name})
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: 1.6, marginTop: '16px', marginBottom: 0 }}>
              Warm cream backgrounds with charcoal text for daytime readability and a lunch-hour feel.
            </p>
          </div>
          <div
            style={{
              background: '#232329',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '28px',
            }}
          >
            <div style={{ fontSize: '10px', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
              DARK MODE
            </div>
            <div style={{ fontSize: '13px', color: ACCENT, marginBottom: '16px', fontWeight: 600 }}>Active: 7:30pm to 6:00am</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Background 1', hex: '#2C1F14' },
                { label: 'Background 2', hex: '#231A14' },
                { label: 'Background 3', hex: '#3D2510' },
                { label: 'Accent', hex: '#E05555' },
              ].map((swatch) => (
                <div key={swatch.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: swatch.hex,
                      border: '1px solid rgba(255,255,255,0.12)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '12px', color: '#F5F5F7', fontWeight: 600 }}>{swatch.label}</div>
                    <div style={{ fontSize: '11px', color: '#71717A' }}>{swatch.hex}</div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: 1.6, marginTop: '16px', marginBottom: 0 }}>
              Warm brown backgrounds with a red accent for evening dining and candlelight atmosphere.
            </p>
          </div>
        </div>
        <div
          style={{
            marginTop: '24px',
            background: '#232329',
            borderLeft: `3px solid ${ACCENT}`,
            borderRadius: '0 12px 12px 0',
            padding: '24px',
          }}
        >
          <div style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.7 }}>
            Dark mode backgrounds are warm mid-tone browns, not near-black. Near-black felt cold for a restaurant.
            The warmth of the browns makes dark mode feel like candlelight, not a developer terminal.
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginTop: '32px',
          }}
        >
          <ScreenshotPlaceholder label="Homepage / Light Mode (6am to 7:30pm)" height="440px" />
          <ScreenshotPlaceholder label="Homepage / Dark Mode (7:30pm to 6am)" height="440px" />
        </div>
      </div>

      {cwpcSectionDivider}

      {/* SECTION 7 / PRINT PIPELINE */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          PRINT PIPELINE
        </p>
        <h2 style={sectionHeading}>Two production menus built in code</h2>
        <p style={bodyText}>
          Most restaurants pay a print shop to design menus in InDesign. We built ours in HTML and CSS, rendered to
          PDF using WeasyPrint, and verified every page with pdftoppm pixel crops. The advantage: the same design
          tokens that drive the website can eventually feed the print layout directly.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '32px' }}>
          {[
            {
              label: 'TO-GO MENU',
              title: 'Tri-fold, 11 x 8.5in',
              specs: ['Landscape orientation', '3 panels', 'Brown color theme', '8 menu sections'],
              screenshot: 'Tri-fold To-Go Menu / Brown Theme',
            },
            {
              label: 'DINE-IN MENU',
              title: 'Two-page, 8.5 x 11in',
              specs: ['Portrait orientation', '2 columns per page', 'Emerald green theme', 'Visually distinct from to-go'],
              screenshot: 'Dine-In Menu / Emerald Green Theme',
            },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <ScreenshotPlaceholder label={card.screenshot} height="280px" embedded />
              <div style={{ padding: '24px' }}>
                <div style={{ fontSize: '10px', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {card.label}
                </div>
                <div style={{ fontSize: '16px', color: '#F5F5F7', fontWeight: 700, marginTop: '8px', marginBottom: '8px' }}>
                  {card.title}
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {card.specs.map((spec) => (
                    <li key={spec} style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: 1.8 }}>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: '32px',
            background: '#1B1B1F',
            border: '1px solid rgba(212,100,28,0.25)',
            borderLeft: `3px solid ${ACCENT}`,
            borderRadius: '0 12px 12px 0',
            padding: '28px 32px',
          }}
        >
          <div style={{ fontSize: '16px', color: '#F5F5F7', fontWeight: 700, marginBottom: '8px' }}>The @page trap</div>
          <div style={{ fontSize: '12px', color: ACCENT, marginBottom: '16px' }}>4 hours lost to a silent failure</div>
          <p style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.7, margin: '0 0 20px' }}>
            WeasyPrint requires @page at the absolute top level of the CSS. If nested inside @media print, it silently
            defaults to A4 portrait and clips all content past 8.27 inches with no error message, no warning.
          </p>
          <CodeBlock
            filename="print.css"
            code={`/* CORRECT - top level, renders at 11x8.5in */
@page { size: 11in 8.5in; margin: 0; }

/* WRONG - silently clips at 8.27in, no error */
@media print {
  @page { size: 11in 8.5in; margin: 0; }
}`}
          />
        </div>
      </div>

      {cwpcSectionDivider}

      {/* SECTION 8 / TECHNICAL ARCHITECTURE */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          TECHNICAL ARCHITECTURE
        </p>
        <h2 style={sectionHeading}>Docker locally, Amplify natively</h2>
        <p style={bodyText}>
          An interesting split emerged during deployment: Docker was set up locally for reproducible builds but
          Amplify&apos;s build environment does not have Docker CLI available. The solution was Amplify&apos;s native
          Next.js pipeline for production while keeping Docker for local development.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '32px' }}>
          <div
            style={{
              background: '#232329',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '28px',
            }}
          >
            <div style={{ fontSize: '10px', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', fontWeight: 700 }}>
              LOCAL DEV
            </div>
            {[
              'Docker multi-stage build',
              'Node 22 Alpine base image',
              'pnpm 9.15.0 pinned (avoids Node compatibility issues)',
              'next.config.ts output: standalone',
              'pnpm-workspace.yaml packages: ["."]',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: '10px', padding: '8px 0', alignItems: 'flex-start' }}>
                <span style={{ color: ACCENT, fontSize: '10px', marginTop: '4px' }}>●</span>
                <span style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              background: '#232329',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '28px',
            }}
          >
            <div style={{ fontSize: '10px', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', fontWeight: 700 }}>
              PRODUCTION
            </div>
            {[
              'AWS Amplify native Next.js pipeline',
              'pnpm build command',
              'Route 53 NS + SOA + A alias to CloudFront',
              'www CNAME record',
              'SSL CNAME verification record',
              '4 Route 53 nameservers ready to activate',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: '10px', padding: '8px 0', alignItems: 'flex-start' }}>
                <span style={{ color: ACCENT, fontSize: '10px', marginTop: '4px' }}>●</span>
                <span style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <ScreenshotPlaceholder label="Route 53 / DNS Records Configuration" height="400px" />
      </div>

      {cwpcSectionDivider}

      {/* SECTION 9 / OUTCOME */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          OUTCOME
        </p>
        <h2 style={sectionHeading}>Ready to go live on a nameserver switch</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginTop: '32px',
            marginBottom: '32px',
          }}
        >
          {[
            { value: '2', label: 'production print menus delivered' },
            { value: '6', label: 'brand color tokens locked' },
            { value: '5', label: 'typefaces with documented roles' },
            { value: '1 DNS change', label: 'everything standing between old and new site' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: ACCENT_BG,
                border: `1px solid ${ACCENT_BORDER}`,
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '26px', fontWeight: 800, color: ACCENT, lineHeight: 1, marginBottom: '6px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: '#A1A1AA', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <p style={bodyText}>
          The website is fully deployed on AWS Amplify. Route 53 is configured with all DNS records. The moment the
          owners switch their GoDaddy nameservers to the four Route 53 nameservers, the new site goes live. The old
          site stays live until that moment: zero downtime transition.
        </p>
        <ScreenshotPlaceholder label="Tandoori Junction New Site / Full Desktop View" height="640px" />
        <div
          style={{
            background: 'rgba(212,100,28,0.06)',
            border: '1px solid rgba(212,100,28,0.2)',
            borderRadius: '16px',
            padding: '32px 40px',
            marginTop: '40px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div>
            <div style={{ fontSize: '20px', color: '#F5F5F7', fontWeight: 700, marginBottom: '6px' }}>Preview the new site</div>
            <div style={{ fontSize: '14px', color: '#A1A1AA' }}>main.d1lv2p0jrrcjw5.amplifyapp.com</div>
          </div>
          <a
            href="https://main.d1lv2p0jrrcjw5.amplifyapp.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '8px',
              background: ACCENT,
              color: '#1B1B1F',
              fontSize: '14px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Open Preview ↗
          </a>
        </div>
      </div>

      {cwpcSectionDivider}

      {/* SECTION 10 / REFLECTIONS */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          REFLECTIONS
        </p>
        <h2 style={sectionHeading}>What this project taught me</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
          {[
            {
              num: '01',
              title: 'Brand before code, every time',
              body: 'On Desi Pizza House I started building before the brand was fully locked. On Tandoori Junction I documented every color, every typeface, and the tagline before touching a component. The downstream clarity was night and day. Every design decision had a reference point.',
            },
            {
              num: '02',
              title: 'Docker in dev, native in prod: know your environment',
              body: 'Setting up Docker locally taught me containerization and gave us a reproducible build environment. But finding out mid-deployment that Amplify does not have Docker CLI available was a real lesson: always verify what your deployment environment actually supports before building your local toolchain around it.',
            },
            {
              num: '03',
              title: 'The print pipeline is just another document',
              body: 'Once I understood that WeasyPrint consumes HTML and CSS the same way a browser does, the mental model clicked. A print menu is a single-page web document with specific @page dimensions. The same design tokens that drive the website can eventually feed the print layout. That unification is the real opportunity.',
            },
          ].map((item) => (
            <div
              key={item.num}
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '28px 32px',
              }}
            >
              <div style={{ fontSize: '11px', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                {item.num}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#F5F5F7', marginBottom: '10px' }}>{item.title}</div>
              <div style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.75 }}>{item.body}</div>
            </div>
          ))}
        </div>
        <ScreenshotPlaceholder label="Print Menus / Final PDF Output" height="360px" />
      </div>
    </div>
  );
}

export interface TandooriJunctionProjectProps {
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

export function TandooriJunctionProject({ onBack, onProjectClick }: TandooriJunctionProjectProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const [caseStudyVisible, setCaseStudyVisible] = useState(getInitialCaseStudyVisible);
  const hideBarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const title = 'Tandoori Junction';
  const company = 'Tandoori Junction, Mountain View, CA';
  const subtitle =
    'A full-stack restaurant website with a custom dual light/dark theme system, Docker pipeline, Square integration, and two production print menus. Built and shipped in under 3 weeks.';
  const role = 'Lead Design Engineer: Brand System, Full Stack Development, Print Design, DevOps, Deployment';
  const team = 'Solo: Design + Engineering';
  const when = 'June 2026';
  const progressBarColor = ACCENT;
  const arrowColor = ACCENT;
  const overview: string | undefined = '';
  const speedReadChallenge =
    'Tandoori Junction had an outdated website that did not reflect the quality of the food or the warmth of the restaurant. The owners wanted a complete rebuild: new site, new visual identity, a print to-go menu, and a dine-in menu, while keeping the old site live until they were ready to switch.';
  const speedReadProcess =
    'I built a complete brand system from scratch: 6 locked color tokens, 5 typefaces with specific roles, and a dual light/dark theme that switches automatically based on time of day with no localStorage persistence. Built on Next.js 15, TypeScript strict, Tailwind v4, Framer Motion, Radix UI. Docker multi-stage build locally, AWS Amplify with Route 53 in production. Two production print menus designed and rendered via a WeasyPrint HTML to PDF pipeline.';
  const speedReadTakeaways =
    "The time-based theme system taught me that user preference logic does not always need localStorage. Sometimes the right answer is stateless: what time is it right now? The print pipeline was the biggest technical surprise: WeasyPrint's @page rule must sit at the absolute top level of the CSS or it silently defaults to A4 portrait and clips everything with no error message.";
  const speedReadImpact =
    'Full website deployed on Amplify, ready to go live on a single nameserver switch. Two production print menus delivered and handed off. Complete brand system documented and locked.';

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

  const scrollToCaseStudy = () => {
    if (!caseStudyVisible) {
      setCaseStudyVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById('case-study-start')?.scrollIntoView({ behavior: 'smooth' });
        });
      });
    } else {
      document.getElementById('case-study-start')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(212,100,28,0.18) 0%, rgba(212,100,28,0.04) 100%)',
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16 w-full min-w-0 box-border">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 md:gap-16 min-w-0">
          <div className="space-y-8 min-w-0 order-2 md:order-none">
            <div
              className="block shrink-0 rounded-lg"
              style={{ width: 48, height: 48, background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}
              aria-hidden
            />

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
                  Live Site
                </div>
                <a
                  href="https://tandoorisjunction.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '14px', color: ACCENT, textDecoration: 'none', fontWeight: 600 }}
                >
                  tandoorisjunction.com ↗
                </a>
                <p style={{ fontSize: '12px', color: '#71717A', marginTop: '6px', lineHeight: 1.5 }}>
                  Switching to new site pending owner approval
                </p>
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
                  Preview
                </div>
                <a
                  href="https://main.d1lv2p0jrrcjw5.amplifyapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '14px', color: ACCENT, textDecoration: 'none', fontWeight: 600 }}
                >
                  Preview on Amplify ↗
                </a>
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
                  Read the full case study below.
                </p>
                <button
                  type="button"
                  onClick={scrollToCaseStudy}
                  aria-label="Scroll to case study"
                  className="group block cursor-pointer border-0 bg-transparent p-0 mt-8 min-h-[44px] min-w-[44px] transition-transform duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-0"
                >
                  <svg
                    width={44}
                    height={52}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: 'block',
                      flexShrink: 0,
                      color: arrowColor,
                      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.18))',
                    }}
                    className="arrow-float-premium"
                  >
                    <path d="M7 6l5 5 5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                    <path d="M7 14l5 5 5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity="1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {caseStudyVisible ? (
          <div
            id="case-study-start"
            className="cwpc-case-study space-y-16 mt-16 w-full min-w-0 max-w-full overflow-x-clip"
            style={{ scrollMarginTop: 'var(--nav-height, 80px)', overflowX: 'hidden' }}
          >
            <CaseStudyContent />
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
              <button type="button" onClick={onBack} className="text-[15px] transition-colors cursor-pointer" style={{ color: '#71717A' }}>
                ← Back to Work
              </button>
            </div>
          </div>
        ) : (
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
        )}
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12" data-footer>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 text-[13px]">
          <div className="flex flex-wrap items-center gap-2" style={{ color: '#71717A' }}>
            <FooterCreditsRow />
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <a href="https://www.figma.com/@iamhtk" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: '#71717A' }} aria-label="Figma">
              <Figma className="w-[18px] h-[18px]" />
            </a>
            <a href="https://github.com/iamhtk" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: '#71717A' }} aria-label="GitHub">
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.linkedin.com/in/iamhtk" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: '#71717A' }} aria-label="LinkedIn">
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.youtube.com/@avlnce" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: '#71717A' }} aria-label="YouTube">
              <Youtube className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.instagram.com/hrithiksanyal/" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: '#71717A' }} aria-label="Instagram">
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.facebook.com/Avlnce/" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: '#71717A' }} aria-label="Facebook">
              <Facebook className="w-[18px] h-[18px]" />
            </a>
            <a href="https://x.com/hrithiksanyal" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: '#71717A' }} aria-label="X (Twitter)">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
