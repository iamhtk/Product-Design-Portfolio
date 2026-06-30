import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { FooterCreditsRow } from '../FooterAccessibilityLink';
import { createPortal } from 'react-dom';
import { Linkedin, Youtube, Instagram, Facebook, Github, Figma } from 'lucide-react';
import { ScrollToTop } from '../ScrollToTop';
import { ExploreMoreSection } from './ExploreMoreSection';
import { SHOW_PROJECT_OVERVIEW } from './projectConfig';
import { getInitialCaseStudyVisible } from './caseStudyRestore';

const CURRENT_PROJECT_ID = 'BuiltDeployed_Project1';
const PROGRESS_BAR_HIDE_DELAY_MS = 400;
const ACCENT = '#E8822A';
const ACCENT_BG = 'rgba(232,130,42,0.08)';
const ACCENT_BORDER = 'rgba(232,130,42,0.2)';

const TEXT_BADGE_ICONS = new Set(['anthropic', 'cursor']);

function ScreenshotPlaceholder({ label, height = '480px' }: { label: string; height?: string }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1.5px dashed rgba(232,130,42,0.3)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '8px',
        height,
        width: '100%',
        marginTop: '32px',
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

  return (
    <div className="cwpc-case-study-inner w-full min-w-0 max-w-full">
      {/* SECTION 1 / CONTEXT */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          CONTEXT
        </p>
        <h2 style={sectionHeading}>A restaurant that existed only in the owners&apos; vision</h2>
        <p style={bodyText}>
          Desi Pizza House had no website, no digital menu, no way for customers to reach them online. The owners
          had Square set up for in-person orders, a Google Business listing, and a clear brand vision: pizza made
          with authentic South Asian spices, paneer, tikka, mango chili. What they needed was a digital home that
          could serve customers before the first slice was ever sold.
        </p>
        <ScreenshotPlaceholder label="DPH Homepage / Full Desktop View" height="560px" />
      </div>

      {cwpcSectionDivider}

      {/* SECTION 2 / THE PROBLEM */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          THE PROBLEM
        </p>
        <h2 style={sectionHeading}>Everything. In two weeks.</h2>
        <p style={bodyText}>
          The owners came with three problems that needed solving simultaneously. No time to solve them
          sequentially.
        </p>
        <div
          className="cwpc-grid-3"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '32px' }}
        >
          {[
            {
              num: '01',
              title: 'No digital presence',
              desc: 'No website, no online menu, no way for customers to find or contact them outside of a Google Maps listing.',
            },
            {
              num: '02',
              title: 'Manual inquiries only',
              desc: 'Catering and event inquiries came in through phone calls only. No structured intake, no paper trail, no way to track leads.',
            },
            {
              num: '03',
              title: 'Unused Square data',
              desc: '72 menu items already existed in Square. No way to display them on a website without building the integration from scratch.',
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
        <ScreenshotPlaceholder label="Client Kickoff / Requirements and Timeline" height="360px" />
      </div>

      {cwpcSectionDivider}

      {/* SECTION 3 / MY ROLE */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          MY ROLE
        </p>
        <h2 style={sectionHeading}>Lead design engineer, sole contributor</h2>
        <p style={bodyText}>
          I owned this project end to end. Competitive research, information architecture, visual design,
          component development, API integration, backend route handlers, DNS configuration, and deployment.
          Claude Code and Cursor handled all code execution. I directed every decision, made every architectural
          call, and owned every client conversation.
        </p>
        <div style={{ marginTop: '40px' }}>
          {[
            { label: 'Design', desc: 'Brand interpretation, typography, color system, layout, responsive design, competitive audit' },
            { label: 'Frontend', desc: 'Next.js 15 App Router, TypeScript strict mode, Tailwind v4, Framer Motion, Radix UI' },
            { label: 'Backend', desc: 'Three API route handlers, form validation with Zod, caching strategy, error boundaries' },
            { label: 'Integrations', desc: 'Square Catalog API, Google Sheets API v4, Google Places API, service account auth' },
            { label: 'Infrastructure', desc: 'AWS Amplify, Route 53 DNS, GoDaddy domain, environment variable management' },
            { label: 'Delivery', desc: 'Under 3 weeks from first client call to live URL' },
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
              <div
                style={{
                  width: '3px',
                  background: ACCENT,
                  borderRadius: '2px',
                  flexShrink: 0,
                }}
              />
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
        <ScreenshotPlaceholder label="Figma / Information Architecture and Wireframes" height="400px" />
      </div>

      {cwpcSectionDivider}

      {/* SECTION 4 / THE STACK */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          THE STACK
        </p>
        <h2 style={sectionHeading}>Every technology, every layer</h2>
        <p style={bodyText}>
          A deliberate stack built for a small business: fast to build, easy to maintain, zero ongoing complexity
          for the owners.
        </p>
        {[
          {
            label: 'FRONTEND',
            logos: [
              { name: 'Next.js', icon: 'nextdotjs', color: 'FFFFFF' },
              { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
              { name: 'Tailwind CSS', icon: 'tailwindcss', color: '06B6D4' },
              { name: 'Framer Motion', icon: 'framer', color: 'FFFFFF' },
              { name: 'Radix UI', icon: 'radixui', color: 'FFFFFF' },
              { name: 'React Hook Form', icon: 'reacthookform', color: 'EC5990' },
            ],
          },
          {
            label: 'BACKEND + INTEGRATIONS',
            logos: [
              { name: 'Square', icon: 'square', color: '3E4348' },
              { name: 'Google Sheets', icon: 'googlesheets', color: '34A853' },
              { name: 'Google Places', icon: 'googlemaps', color: '4285F4' },
              { name: 'Node.js', icon: 'nodedotjs', color: '339933' },
              { name: 'Zod', icon: 'zod', color: '3E67B1' },
            ],
          },
          {
            label: 'INFRASTRUCTURE',
            logos: [
              { name: 'AWS Amplify', icon: 'awsamplify', color: 'FF9900' },
              { name: 'Amazon Route 53', icon: 'amazonroute53', color: '8C4FFF' },
              { name: 'GitHub', icon: 'github', color: 'FFFFFF' },
              { name: 'pnpm', icon: 'pnpm', color: 'F69220' },
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
          <div key={group.label} style={{ marginBottom: '40px', marginTop: '32px' }}>
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
        <ScreenshotPlaceholder label="VS Code / Project Structure and lib/constants.ts" height="360px" />
      </div>

      {cwpcSectionDivider}

      {/* SECTION 5 / DESIGN DECISIONS */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          DESIGN DECISIONS
        </p>
        <h2 style={sectionHeading}>Warm, proud, and unmistakably desi</h2>
        <p style={bodyText}>
          The visual system needed to feel culturally confident without being a caricature. Deep saffron and spice
          tones. Food-forward imagery. A layout that prioritizes the menu and the order CTA above everything else.
          The benchmark was Curry Up Now: bold, food-forward, something a South Asian family would be proud to show
          their community.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginTop: '32px',
          }}
        >
          <ScreenshotPlaceholder label="Homepage Hero Section / Desktop" height="380px" />
          <ScreenshotPlaceholder label="Homepage Hero Section / Mobile (375px)" height="380px" />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginTop: '32px',
          }}
        >
          {[
            {
              title: 'Food first',
              body: "Every section hierarchy puts the menu and ordering CTA in the user's eye line within the first scroll. Nothing competes with the food.",
            },
            {
              title: 'Cultural confidence',
              body: 'Warm spice tones, not primary colors. The palette should feel like the food tastes: not like a generic SaaS product.',
            },
            {
              title: 'Trust signals early',
              body: 'Google Places reviews surface real customer validation on the homepage. Social proof before the menu, not after.',
            },
            {
              title: 'One URL to rule them all',
              body: 'All Order Now CTAs use a single SQUARE_ORDER_URL constant in lib/constants.ts. One line change updates every button on the site.',
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: '#232329',
                borderLeft: `3px solid ${ACCENT}`,
                borderRadius: '0 12px 12px 0',
                padding: '24px',
              }}
            >
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#F5F5F7', marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: 1.7 }}>{item.body}</div>
            </div>
          ))}
        </div>
      </div>

      {cwpcSectionDivider}

      {/* SECTION 6 / TECHNICAL ARCHITECTURE */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          TECHNICAL ARCHITECTURE
        </p>
        <h2 style={sectionHeading}>Three external APIs, one clean system</h2>
        <p style={bodyText}>
          The architecture decision I am most proud of is the separation of concerns between data sources. Square
          handles the catalog. Google Sheets handles form submissions. Google Places handles social proof. Each has
          its own API route, its own caching strategy, and its own error boundary. They never talk to each other,
          and any one can be swapped without touching the others.
        </p>
        <CodeBlock
          filename="lib/constants.ts"
          code={`// Single source of truth for all external service IDs
// Credentials live only in .env.local + Amplify env vars

export const SQUARE_LOCATION_ID    = 'LNDTMT054JXZD';
export const SQUARE_ORDER_URL      = 'https://cash.app/order/$desipizzahouseus';
export const GOOGLE_PLACE_ID       = 'ChIJdwzB9Ji3j4ARCR4skGIBg0Q';
export const GOOGLE_SHEETS_ID      = '1cHO3cd9qWxlr4DNk2IohblDv2YvOu3VBeDFe_MdA1sY';`}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '8px' }}>
          {[
            {
              steps: ['Square Catalog API', '/api/menu', 'Menu page (revalidate: 3600s)'],
            },
            {
              steps: ['Google Places API', '/api/reviews', 'Homepage reviews (revalidate: 86400s)'],
            },
            {
              steps: [
                'Form submission',
                '/api/catering-inquiry + /api/events-inquiry + /api/email-signup',
                'Google Sheets',
              ],
            },
          ].map((flow, fi) => (
            <div
              key={fi}
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              {flow.steps.map((step, si) => (
                <div key={step}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontFamily: 'monospace',
                      color: si === 0 ? ACCENT : '#A1A1AA',
                      fontWeight: si === 0 ? 600 : 400,
                      lineHeight: 1.6,
                      padding: '8px 0',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {step}
                  </div>
                  {si < flow.steps.length - 1 ? (
                    <div style={{ color: ACCENT, fontSize: '16px', fontWeight: 700, paddingLeft: '4px' }}>↓</div>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
        <ScreenshotPlaceholder label="Menu Page / Square Integration Live" height="500px" />
      </div>

      {cwpcSectionDivider}

      {/* SECTION 7 / KEY INTEGRATIONS */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          KEY INTEGRATIONS
        </p>
        <h2 style={sectionHeading}>The three pipelines that make it real</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}>
          {[
            {
              num: '01',
              borderColor: ACCENT,
              title: '72 live menu items from Square',
              body: "The /api/menu route handler fetches the full catalog from Square's Catalog API using location ID LNDTMT054JXZD. Items cache with revalidate 3600: updating hourly without a redeploy. Images serve via Square's image CDN. Categories, prices, and descriptions all pull live.",
              outcome: 'Owner updates Square once. The website reflects it within the hour. Zero manual menu maintenance.',
            },
            {
              num: '02',
              borderColor: '#34A853',
              title: 'Three form pipelines to Google Sheets',
              body: 'Email signup, catering inquiries, and event inquiries each have a dedicated Next.js Route Handler. All three authenticate via a Google service account and write structured rows to a shared Sheet. Zod validates every payload on the server before it reaches the API.',
              outcome: 'Every lead lands in Google Sheets, timestamped and structured. Owner opens one tab to see everything.',
            },
            {
              num: '03',
              borderColor: '#4285F4',
              title: 'Real reviews from Google Places',
              body: 'The /api/reviews route handler calls the Google Places API with Place ID ChIJdwzB9Ji3j4ARCR4skGIBg0Q and caches the result for 24 hours. Reviews surface on the homepage showing star ratings and text from real Google Maps customers.',
              outcome: 'New reviews appear on the site within 24 hours automatically. No CMS, no manual updates.',
            },
          ].map((card) => (
            <div
              key={card.num}
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTop: `3px solid ${card.borderColor}`,
                borderRadius: '16px',
                padding: '32px 36px',
              }}
            >
              <div style={{ fontSize: '11px', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {card.num}
              </div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#F5F5F7', marginTop: '8px', marginBottom: '16px' }}>
                {card.title}
              </div>
              <div style={{ fontSize: '15px', color: '#A1A1AA', lineHeight: 1.75 }}>{card.body}</div>
              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ fontSize: '10px', color: '#71717A', textTransform: 'uppercase', marginBottom: '6px' }}>
                  OUTCOME
                </div>
                <div style={{ fontSize: '13px', color: '#F5F5F7', lineHeight: 1.6 }}>{card.outcome}</div>
              </div>
            </div>
          ))}
        </div>
        <ScreenshotPlaceholder label="Google Sheets / Form Submissions Live View" height="360px" />
      </div>

      {cwpcSectionDivider}

      {/* SECTION 8 / OUTCOME */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          OUTCOME
        </p>
        <h2 style={sectionHeading}>Live in under 3 weeks</h2>
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
            { value: '72', label: 'menu items from Square' },
            { value: '3', label: 'active form pipelines' },
            { value: '< 3 wks', label: 'kickoff to live URL' },
            { value: '~40%', label: 'increase in online inquiries' },
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
          desipizzahouse.store is live. The owners update their Square catalog once and the website reflects it
          within an hour. Catering and event inquiries come in through structured forms and land in Google Sheets.
          Customer reviews from Google Maps surface automatically on the homepage.
        </p>
        <ScreenshotPlaceholder label="desipizzahouse.store / Live Site Full Page" height="640px" />
        <div
          style={{
            background: 'rgba(232,130,42,0.06)',
            border: '1px solid rgba(232,130,42,0.2)',
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
            <div style={{ fontSize: '20px', color: '#F5F5F7', fontWeight: 700, marginBottom: '6px' }}>View the live site</div>
            <div style={{ fontSize: '14px', color: '#A1A1AA' }}>desipizzahouse.store</div>
          </div>
          <a
            href="https://desipizzahouse.store"
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
            Open Live Site ↗
          </a>
        </div>
      </div>

      {cwpcSectionDivider}

      {/* SECTION 9 / REFLECTIONS */}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          REFLECTIONS
        </p>
        <h2 style={sectionHeading}>What I learned</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
          {[
            {
              num: '01',
              title: 'constants.ts is worth its weight',
              body: 'Putting every external ID and URL in one file sounds obvious until you are changing a Square ordering URL at 11pm before launch and you only need to touch one line. This pattern is now standard in every project I build.',
            },
            {
              num: '02',
              title: "Square's Cash App account is a different beast",
              body: 'The ordering URL from a Cash App for Business account is cash.app/order/ not square.site. This is not documented anywhere obvious. It cost two hours at deployment. Now I verify account type before building any Square integration.',
            },
            {
              num: '03',
              title: 'Zod on every API route, no exceptions',
              body: 'React Hook Form validates client side. The first time a malformed payload hit a route handler without server validation I added Zod to every route immediately. Belt and suspenders is the only approach.',
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
        <ScreenshotPlaceholder label="Deployment / AWS Amplify Console Live" height="360px" />
      </div>
    </div>
  );
}

export interface DesiPizzaHouseProjectProps {
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

export function DesiPizzaHouseProject({ onBack, onProjectClick }: DesiPizzaHouseProjectProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const [caseStudyVisible, setCaseStudyVisible] = useState(getInitialCaseStudyVisible);
  const hideBarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const title = 'Desi Pizza House';
  const company = 'Desi Pizza House, Mountain View, CA';
  const subtitle =
    'A full-stack restaurant marketing website with live Square catalog integration, Google Sheets form pipeline, and Google Places reviews. Built and shipped in under 3 weeks.';
  const role = 'Lead Design Engineer: UI/UX Design, Full Stack Development, Integrations, Deployment';
  const team = 'Solo: Design + Engineering';
  const when = 'June 2026';
  const progressBarColor = ACCENT;
  const arrowColor = ACCENT;
  const overview: string | undefined = '';
  const speedReadChallenge =
    'Desi Pizza House had no digital presence. The owners needed a complete marketing website before launch, one that could show their menu, take catering inquiries, handle event bookings, and connect directly to their Square POS system. They had a logo, a vision, and two weeks.';
  const speedReadProcess =
    'I designed and architected the full site from scratch using Next.js 15, TypeScript strict, Tailwind v4, and Framer Motion. Three backend API routes wired to Google Sheets for form submissions, Square Catalog API pulling 72 live menu items, and Google Places surfacing real customer reviews. Hosted on AWS Amplify with Route 53 DNS. The entire stack shipped in under 3 weeks using AI-assisted development with Claude Code and Cursor.';
  const speedReadTakeaways =
    "Integrating three external APIs in a single project taught me how to architect a clean separation between data layers. The lib/constants.ts pattern, keeping every external URL and ID in one file, saved hours during late credential changes. Square's Cash App for Business flow produces ordering URLs in a completely different format than standard Square, which only reveals itself at deployment.";
  const speedReadImpact =
    'Live at desipizzahouse.store. 72 menu items syncing live from Square. Three form pipelines writing to Google Sheets. Google Places reviews integrated. Estimated 40 percent increase in online customer inquiries within the first month.';

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
            background: 'linear-gradient(135deg, rgba(232,130,42,0.18) 0%, rgba(232,130,42,0.04) 100%)',
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
                  href="https://desipizzahouse.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '14px', color: ACCENT, textDecoration: 'none', fontWeight: 600 }}
                >
                  desipizzahouse.store ↗
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
