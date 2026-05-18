import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { FooterCreditsRow } from '../components/FooterAccessibilityLink';
import { createPortal } from 'react-dom';
import { Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';
import { Button } from '../components/prism/atoms/Button/Button';
import { Badge } from '../components/prism/atoms/Badge/Badge';
import { Avatar } from '../components/prism/atoms/Avatar/Avatar';
import { Rating } from '../components/prism/atoms/Rating/Rating';
import { Loader } from '../components/prism/atoms/Loader/Loader';
import { Input } from '../components/prism/molecules/Input/Input';
import { ProgressBar } from '../components/prism/molecules/ProgressBar/ProgressBar';
import { TabBar } from '../components/prism/molecules/TabBar/TabBar';
import { Stepper } from '../components/prism/molecules/Stepper/Stepper';
import { StatCard } from '../components/prism/molecules/StatCard/StatCard';
import { Card } from '../components/prism/organisms/Card/Card';
import { AccordionItem } from '../components/prism/organisms/AccordionItem/AccordionItem';
import { Alert } from '../components/prism/organisms/Alert/Alert';
import { Navbar } from '../components/prism/organisms/Navbar/Navbar';
import { ScrollToTop } from '../components/ScrollToTop';
import { ExploreMoreSection } from '../components/projects/ExploreMoreSection';
import { SHOW_PROJECT_OVERVIEW } from '../components/projects/projectConfig';
import { getArrowGradientColors } from '../components/projects/arrowGradient';
import { getInitialCaseStudyVisible } from '../components/projects/caseStudyRestore';

/** Must match `PROJECT_ORDER` in projectOrder.ts so ExploreMoreSection prev/next resolves. */
const CURRENT_PROJECT_ID = 'CWPC';

const HEADER_SQUARE_COLORS = [
  '#FF6701',
  '#65A637',
  '#0D72FF',
  '#FFAC0D',
  '#FF270D',
  '#8D8D8D',
] as const;

const PROGRESS_BAR_HIDE_DELAY_MS = 400;

function RatingDemo() {
  const [val, setVal] = useState(4);
  return (
    <div
      style={{
        background: '#232329',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '24px',
      }}
    >
      <div
        style={{
          fontSize: '12px',
          color: '#71717A',
          fontWeight: 600,
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        Rating, click to set value
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Rating value={val} onChange={setVal} size="lg" showValue />
        <Rating value={4.3} readonly size="md" showValue />
      </div>
    </div>
  );
}

function InputStateDemo() {
  const [status, setStatus] = useState<
    'default' | 'hover' | 'focus' | 'error' | 'disabled'
  >('default');
  return (
    <div
      style={{
        background: '#232329',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '24px',
      }}
    >
      <div
        style={{
          fontSize: '12px',
          color: '#71717A',
          fontWeight: 600,
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        Input, click a state
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {(['default', 'hover', 'focus', 'error', 'disabled'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            style={{
              padding: '5px 12px',
              borderRadius: '6px',
              border: `1px solid ${status === s ? '#FF6701' : 'rgba(255,255,255,0.08)'}`,
              background: status === s ? 'rgba(255,103,1,0.12)' : '#1B1B1F',
              color: status === s ? '#FF6701' : '#A1A1AA',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: status === s ? 600 : 400,
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <Input
        label="Email address"
        placeholder="you@example.com"
        type="email"
        status={status}
        error={status === 'error' ? 'Please enter a valid email' : undefined}
        hint={status !== 'error' ? "We'll never share your email" : undefined}
      />
    </div>
  );
}

function TabBarDemo() {
  const [active, setActive] = useState('overview');
  const content: Record<string, string> = {
    overview:
      "The CWPC Community Wildfire Resilience Scorecard follows the United Nations' 10 Essentials framework.",
    components: '68 components across 3 atomic layers, 17 atoms, 26 molecules, 20 organisms.',
    tokens: '100+ design tokens covering color, spacing, typography, elevation, and blur.',
    accessibility:
      'Every component meets WCAG AA minimum. Keyboard navigation documented for each.',
  };
  return (
    <div
      style={{
        background: '#232329',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '16px 24px 0', background: '#232329' }}>
        <div
          style={{
            fontSize: '12px',
            color: '#71717A',
            fontWeight: 600,
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          TabBar, click to switch content
        </div>
      </div>
      <TabBar
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'components', label: 'Components' },
          { id: 'tokens', label: 'Tokens' },
          { id: 'accessibility', label: 'Accessibility' },
        ]}
        activeTab={active}
        onChange={setActive}
      />
      <div
        style={{
          padding: '20px 24px',
          background: '#1B1B1F',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <p style={{ margin: 0, fontSize: '14px', color: '#A1A1AA', lineHeight: 1.7 }}>
          {content[active]}
        </p>
      </div>
    </div>
  );
}

function StepperDemo() {
  const [step, setStep] = useState(2);
  const steps = [
    { label: 'Token Setup', description: 'Color, spacing, typography' },
    { label: 'Atoms', description: '17 base components' },
    { label: 'Molecules', description: '26 composite components' },
    { label: 'Organisms', description: '20 page patterns' },
    { label: 'Ember Docs', description: 'Interactive documentation' },
  ];
  return (
    <div
      style={{
        background: '#232329',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '24px',
      }}
    >
      <div
        style={{
          fontSize: '12px',
          color: '#71717A',
          fontWeight: 600,
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        Stepper, click Prev/Next
      </div>
      <Stepper
        steps={steps.map((s, i) => ({
          ...s,
          status:
            i < step ? ('complete' as const) : i === step ? ('current' as const) : ('upcoming' as const),
        }))}
        currentStep={step}
        orientation="horizontal"
      />
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button
          type="button"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          style={{
            padding: '7px 16px',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: '#1B1B1F',
            color: '#A1A1AA',
            fontSize: '12px',
            cursor: step === 0 ? 'not-allowed' : 'pointer',
            opacity: step === 0 ? 0.4 : 1,
            fontFamily: 'inherit',
          }}
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          style={{
            padding: '7px 16px',
            borderRadius: '6px',
            border: '1px solid rgba(255,103,1,0.2)',
            background: 'rgba(255,103,1,0.08)',
            color: '#FF6701',
            fontSize: '12px',
            cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer',
            opacity: step === steps.length - 1 ? 0.4 : 1,
            fontFamily: 'inherit',
            fontWeight: 600,
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function AlertDemo() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const alerts = [
    {
      id: 'success',
      variant: 'success' as const,
      title: 'Scorecard downloaded',
      message: 'Your Community Wildfire Resilience Scorecard has been downloaded successfully.',
    },
    {
      id: 'error',
      variant: 'error' as const,
      title: 'Download failed',
      message: 'Unable to download. Please check your connection and try again.',
    },
    {
      id: 'warning',
      variant: 'warning' as const,
      title: 'High risk detected',
      message: 'Your community scorecard indicates elevated wildfire risk.',
    },
    {
      id: 'info',
      variant: 'info' as const,
      title: 'New version available',
      message: 'Version 2.0 of the Community Wildfire Resilience Scorecard is now available.',
    },
  ];
  return (
    <div>
      <div
        style={{
          fontSize: '12px',
          color: '#71717A',
          fontWeight: 600,
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        Alert, 4 variants, dismissible
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {alerts
          .filter((a) => !dismissed.includes(a.id))
          .map((alert) => (
            <Alert
              key={alert.id}
              variant={alert.variant}
              title={alert.title}
              message={alert.message}
              dismissible
              onDismiss={() => setDismissed((prev) => [...prev, alert.id])}
            />
          ))}
        {dismissed.length > 0 ? (
          <button
            type="button"
            onClick={() => setDismissed([])}
            style={{
              alignSelf: 'flex-start',
              padding: '5px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#1B1B1F',
              color: '#A1A1AA',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Reset alerts
          </button>
        ) : null}
      </div>
    </div>
  );
}

function CardVariantDemo() {
  const [variant, setVariant] = useState<'default' | 'highlighted'>('default');
  return (
    <div>
      <div
        style={{
          fontSize: '12px',
          color: '#71717A',
          fontWeight: 600,
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        Card, variant toggle
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {(['default', 'highlighted'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            style={{
              padding: '5px 12px',
              borderRadius: '6px',
              border: `1px solid ${variant === v ? '#FF6701' : 'rgba(255,255,255,0.08)'}`,
              background: variant === v ? 'rgba(255,103,1,0.12)' : '#1B1B1F',
              color: variant === v ? '#FF6701' : '#A1A1AA',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {v}
          </button>
        ))}
      </div>
      <Card title="Wildfire Innovator Showcase" variant={variant} titleColor="primary">
        <p style={{ color: '#A1A1AA', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
          The CWPC Wildfire Innovator Showcase connects groundbreaking wildfire prevention
          ventures with the communities who need them.
        </p>
      </Card>
    </div>
  );
}

function CaseStudyContent() {
  const sectionLabel: CSSProperties = {
    fontSize: '11px',
    letterSpacing: '0.2em',
    color: '#71717A',
    textTransform: 'uppercase',
    fontWeight: 500,
    marginBottom: '8px',
  };

  const sectionHeading: CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: '#F5F5F7',
    marginBottom: '16px',
    lineHeight: 1.2,
  };

  const bodyText: CSSProperties = {
    fontSize: '18px',
    lineHeight: 1.85,
    color: '#A1A1AA',
  };

  const sectionGap: CSSProperties = {
    marginBottom: '80px',
  };

  const journeyPhases = [
    {
      date: '2025 Q1',
      title: '🔍 Product Audit',
      points: ['Found 5 button styles', '47 raw color values', '9 typography scales'],
      highlight: 'Evidence that a DS was critical',
    },
    {
      date: '2025 Q1',
      title: '🏗️ Token Architecture',
      points: ['Color system', 'Spacing scale', 'Typography tokens'],
      highlight: 'Foundation before components',
    },
    {
      date: '2025 Q2',
      title: '⚛️ Atoms, 17',
      points: ['Button, Label, Field', 'Badge, Avatar, Rating', 'All states documented'],
      highlight: 'Smallest pieces first',
    },
    {
      date: '2025 Q2',
      title: '🧬 Molecules, 26',
      points: ['Input, Checkbox, Switch', 'ProgressBar, TabBar', 'All interactive'],
      highlight: 'Atoms working together',
    },
    {
      date: '2025 Q3',
      title: '🏛️ Organisms, 20',
      points: ['Navbar, Card, Forms', 'Modal, Toast, Alert', 'Full page patterns'],
      highlight: 'Complete UI sections',
    },
    {
      date: '2025 Q4',
      title: '✨ Ember Docs',
      points: ['Storybook-style site', 'Interactive controls', '68 components live'],
      highlight: 'The system ships',
    },
  ] as const;

  return (
    <>
      <div style={sectionGap}>
        <p style={sectionLabel}>CONTEXT</p>
        <h2 style={sectionHeading}>When design fails, people fail</h2>
        <p style={bodyText}>
          The Catastrophic Wildfire Prevention Consortium builds tools that help communities
          assess wildfire risk, prepare their properties, and access emergency resources.
          During wildfire season, someone might open the Community Scorecard to check whether
          their neighborhood is in danger. Smoke in the air. Phone in shaking hands. If the
          interface is unclear, if the text is too small, if the button is hard to find, they
          give up.
        </p>
        <p style={{ ...bodyText, marginTop: '16px' }}>
          Emergency tools must work for everyone, everywhere, under any condition. That was
          the brief. The existing CWPC product was failing it.
        </p>
      </div>

      <div style={sectionGap}>
        <p style={sectionLabel}>THE PROBLEM</p>
        <h2 style={sectionHeading}>What we found when we looked</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {[
            {
              emoji: '🗂️',
              title: 'UI Chaos',
              desc: '5 different button styles across 3 products. No consistent naming. No shared tokens.',
            },
            {
              emoji: '♿',
              title: 'Zero Accessibility',
              desc: 'Contrast never tested. No keyboard navigation. Elderly users had no clear path through critical flows.',
            },
            {
              emoji: '🐌',
              title: 'Dev Bottleneck',
              desc: 'Designers recreated components from scratch every feature. Simple UI took 3× longer than needed.',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.emoji}</div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#F5F5F7',
                  marginBottom: '8px',
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {[
            { number: '5', label: 'button styles found' },
            { number: '47', label: 'raw color values' },
            { number: '9', label: 'typography scales' },
            { number: '0', label: 'WCAG AA components' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,103,1,0.08)',
                border: '1px solid rgba(255,103,1,0.2)',
                borderRadius: '12px',
                padding: '20px 28px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  color: '#FF6701',
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#A1A1AA',
                  marginTop: '6px',
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '32px',
          }}
        >
          {[
            {
              emoji: '🔁',
              title: 'Repetitive Work',
              desc: 'Recreating the same components for every feature.',
            },
            {
              emoji: '🐌',
              title: 'Slow to Change',
              desc: 'No token system meant every color change was manual.',
            },
            {
              emoji: '😵',
              title: 'Too Much in My Head',
              desc: 'Design decisions existed nowhere but my memory.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: '#232329', padding: '28px 24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.emoji}</div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#F5F5F7',
                  marginBottom: '8px',
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: 1.55 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <p style={bodyText}>
          It was clear that I needed to create a Design System to reduce inconsistencies,
          ensure accessibility at every level, and give CWPC a scalable foundation that would
          outlast any single designer.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '32px',
          }}
        >
          {[
            {
              emoji: '📐',
              title: 'Tokens First',
              desc: 'Establish the complete token architecture before touching any component.',
            },
            {
              emoji: '⚛️',
              title: 'Build Atomic',
              desc: 'Atoms → Molecules → Organisms. No skipping layers.',
            },
            {
              emoji: '📖',
              title: 'Document Everything',
              desc: 'Build the docs site in parallel. Documentation is half the product.',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: '3px solid #FF6701',
                borderRadius: '0 12px 12px 0',
                padding: '24px',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>{item.emoji}</div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#F5F5F7',
                  marginBottom: '8px',
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={sectionGap}>
        <p style={sectionLabel}>THE DECISION</p>
        <h2 style={sectionHeading}>My Journey</h2>
        <div style={{ overflowX: 'auto', paddingBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              minWidth: '800px',
            }}
          >
            {journeyPhases.map((phase, i) => (
              <Fragment key={i}>
                <div style={{ flex: 1, paddingTop: i % 2 === 0 ? 0 : 60, position: 'relative' }}>
                  <div
                    style={{
                      background: '#232329',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderTop: '3px solid #FF6701',
                      borderRadius: '0 0 12px 12px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '10px',
                        color: '#71717A',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                      }}
                    >
                      {phase.date}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#F5F5F7',
                        marginBottom: '10px',
                      }}
                    >
                      {phase.title}
                    </div>
                    {phase.points.map((p, j) => (
                      <div
                        key={j}
                        style={{
                          fontSize: '12px',
                          color: '#A1A1AA',
                          marginBottom: '3px',
                          display: 'flex',
                          gap: '6px',
                        }}
                      >
                        <span style={{ color: '#FF6701' }}>›</span>
                        {p}
                      </div>
                    ))}
                    <div
                      style={{
                        marginTop: '10px',
                        background: 'rgba(255,103,1,0.08)',
                        border: '1px solid rgba(255,103,1,0.2)',
                        borderRadius: '6px',
                        padding: '5px 8px',
                        fontSize: '11px',
                        color: '#FF6701',
                        fontWeight: 600,
                      }}
                    >
                      {phase.highlight}
                    </div>
                  </div>
                </div>
                {i < journeyPhases.length - 1 ? (
                  <div
                    style={{
                      color: '#FF6701',
                      fontSize: '16px',
                      fontWeight: 700,
                      flexShrink: 0,
                      alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                      marginTop: i % 2 === 0 ? 40 : 100,
                    }}
                  >
                    →
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginTop: '40px',
          }}
        >
          {[
            {
              title: 'Single Source of Truth',
              desc: 'One place where every design decision lives. If the primary color changes, it changes everywhere at once.',
            },
            {
              title: 'Accessibility by Default',
              desc: 'Build WCAG compliance into the foundation. Every component inherits it automatically.',
            },
            {
              title: 'Design to Code Fidelity',
              desc: 'The same --color-primary-default lives in both Figma and the codebase. No translation layer.',
            },
            {
              title: 'Scale Without Chaos',
              desc: 'CWPC builds more products. Every new one starts from 68 production-ready components, not zero.',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: '3px solid #FF6701',
                borderRadius: '0 12px 12px 0',
                padding: '24px',
              }}
            >
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#F5F5F7',
                  marginBottom: '8px',
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '40px' }}>
          <div
            style={{
              fontSize: '11px',
              color: '#71717A',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '16px',
            }}
          >
            Component Development Loop
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {['Design Component', 'Initial Review', 'Test Component', 'Validate / Redesign'].map(
              (step, i, arr) => (
                <Fragment key={step}>
                  <div
                    style={{
                      background: '#232329',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '12px 20px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#F5F5F7',
                    }}
                  >
                    {step}
                  </div>
                  {i < arr.length - 1 ? (
                    <div style={{ color: '#FF6701', fontSize: '18px', fontWeight: 700 }}>→</div>
                  ) : null}
                </Fragment>
              ),
            )}
          </div>
        </div>
      </div>

      <div style={sectionGap}>
        <p style={sectionLabel}>METHODOLOGY</p>
        <h2 style={sectionHeading}>Building from the smallest possible piece</h2>
        <p style={bodyText}>
          I chose Brad Frost&apos;s Atomic Design methodology, the same framework used by IBM
          Carbon, Shopify Polaris, and Codecademy Gamut. Design the smallest possible unit first,
          then combine units into increasingly complex structures. Every decision made at the
          atom level propagates correctly up through molecules and organisms.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '32px',
            marginBottom: '48px',
          }}
        >
          {[
            {
              label: 'ATOM',
              color: '#FF6701',
              count: '17 components',
              items: ['Button', 'Label', 'Badge', 'Avatar', 'Rating', '+ 12 more'],
              desc: 'Smallest building blocks. No dependencies.',
            },
            {
              label: 'MOLECULE',
              color: '#0D72FF',
              count: '26 components',
              items: ['Input', 'Checkbox', 'TabBar', 'Stepper', 'SearchBar', '+ 21 more'],
              desc: 'Simple combinations of atoms. One clear purpose.',
            },
            {
              label: 'ORGANISM',
              color: '#65A637',
              count: '20 components',
              items: ['Navbar', 'Card', 'Forms', 'Alert', 'Modal', '+ 15 more'],
              desc: 'Complex page-level patterns.',
            },
          ].map((layer, i) => (
            <div
              key={i}
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTop: `3px solid ${layer.color}`,
                borderRadius: '0 0 12px 12px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: layer.color,
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                }}
              >
                {layer.label}
              </div>
              <div
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#F5F5F7',
                  marginBottom: '4px',
                }}
              >
                {layer.count}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#A1A1AA',
                  marginBottom: '16px',
                  lineHeight: 1.5,
                }}
              >
                {layer.desc}
              </div>
              {layer.items.map((item, j) => (
                <div
                  key={j}
                  style={{
                    fontSize: '12px',
                    color: '#A1A1AA',
                    padding: '4px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: layer.color }}>›</span>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            background: '#232329',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '32px',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: '#71717A',
              fontWeight: 600,
              marginBottom: '24px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Live hierarchy, these are actual running components
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#FF6701',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}
              >
                ATOM
              </div>
              <div
                style={{
                  background: '#1B1B1F',
                  border: '1px solid rgba(255,103,1,0.2)',
                  borderRadius: '8px',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button label="Download Scorecard" type="default" />
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#71717A',
                  marginTop: '8px',
                  textAlign: 'center',
                }}
              >
                Button, standalone, no dependencies
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#0D72FF',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}
              >
                MOLECULE
              </div>
              <div
                style={{
                  background: '#1B1B1F',
                  border: '1px solid rgba(13,114,255,0.25)',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <Input label="Email address" placeholder="you@example.com" type="email" />
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#71717A',
                  marginTop: '8px',
                  textAlign: 'center',
                }}
              >
                Input, Label + Field + hint text
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#65A637',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}
              >
                ORGANISM
              </div>
              <div
                style={{
                  background: '#1B1B1F',
                  border: '1px solid rgba(101,166,55,0.25)',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <Card title="Wildfire Scorecard" titleColor="primary">
                  <p style={{ color: '#A1A1AA', fontSize: '13px', margin: 0 }}>
                    Assess your community wildfire risk.
                  </p>
                </Card>
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#71717A',
                  marginTop: '8px',
                  textAlign: 'center',
                }}
              >
                Card, complete UI section
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={sectionGap}>
        <p style={sectionLabel}>FOUNDATIONS</p>
        <h2 style={sectionHeading}>Before components, tokens</h2>
        <p style={bodyText}>
          Design tokens are named variables that carry a value and a meaning. Before writing a
          single component, I extracted and documented every design decision as a token. When
          CWPC updates its brand color, one line in cwpc-tokens.css propagates across all 68
          components.
        </p>
        <div
          style={{
            background: '#1E1E1E',
            borderRadius: '12px',
            overflow: 'hidden',
            marginTop: '24px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              background: '#2D2D2D',
              padding: '8px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '11px', color: '#71717A', fontFamily: 'monospace' }}>
              cwpc-tokens.css
            </span>
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
          >{`/* Instead of hardcoding: */
color: #FF6701;              /* ❌ brittle */

/* We use tokens: */
color: var(--color-primary-default);  /* ✅ one source of truth */

--color-primary-default: #FF6701;
--space-400: 16px;
--font-size-body-md: 16px;
--border-radius-pill: 50px;`}</pre>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{ fontSize: '13px', fontWeight: 600, color: '#F5F5F7', marginBottom: '16px' }}
          >
            Color Token System
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              {
                name: 'Primary',
                colors: [
                  { hex: '#FF6701', label: 'default' },
                  { hex: '#E85E01', label: 'hover' },
                  { hex: 'rgba(255,103,1,0.12)', label: 'subtle' },
                ],
              },
              {
                name: 'Success',
                colors: [
                  { hex: '#65A637', label: 'default' },
                  { hex: '#98C379', label: 'hover' },
                ],
              },
              {
                name: 'Warning',
                colors: [
                  { hex: '#FFB020', label: 'default' },
                  { hex: '#FFAC0D', label: 'tertiary' },
                ],
              },
              {
                name: 'Error',
                colors: [
                  { hex: '#FF270D', label: 'default' },
                  { hex: '#FF523D', label: 'hover' },
                ],
              },
              {
                name: 'Information',
                colors: [
                  { hex: '#0D72FF', label: 'default' },
                  { hex: '#5DA1FF', label: 'hover' },
                ],
              },
              {
                name: 'Neutral',
                colors: [
                  { hex: '#121212', label: '900' },
                  { hex: '#8D8D8D', label: '90' },
                  { hex: '#B6B6B6', label: '60' },
                ],
              },
            ].map((group, gi) => (
              <div key={gi}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#A1A1AA',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {group.name}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {group.colors.map((color, ci) => (
                    <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: color.hex,
                          border: '1px solid rgba(255,255,255,0.08)',
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: '12px',
                            fontFamily: 'monospace',
                            color: '#A1A1AA',
                          }}
                        >
                          {color.hex}
                        </div>
                        <div style={{ fontSize: '11px', color: '#71717A' }}>{color.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{ fontSize: '13px', fontWeight: 600, color: '#F5F5F7', marginBottom: '16px' }}
          >
            Spacing Scale
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { token: '--space-100', px: 4 },
              { token: '--space-200', px: 8 },
              { token: '--space-300', px: 12 },
              { token: '--space-400', px: 16 },
              { token: '--space-600', px: 24 },
              { token: '--space-800', px: 32 },
              { token: '--space-1000', px: 40 },
              { token: '--space-1200', px: 48 },
              { token: '--space-1400', px: 64 },
              { token: '--space-1600', px: 96 },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    color: '#71717A',
                    width: '130px',
                    flexShrink: 0,
                  }}
                >
                  {s.token}
                </div>
                <div
                  style={{
                    height: '8px',
                    width: `${Math.min(s.px * 2.5, 320)}px`,
                    background: '#FF6701',
                    borderRadius: '100px',
                    minWidth: '4px',
                  }}
                />
                <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#A1A1AA' }}>
                  {s.px}px
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div
            style={{ fontSize: '13px', fontWeight: 600, color: '#F5F5F7', marginBottom: '16px' }}
          >
            Typography Scale, Work Sans
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              {
                label: 'H1',
                size: 47,
                sample: 'Prevent Catastrophic Wildfires',
                color: '#FF6701',
              },
              { label: 'H2', size: 39, sample: 'Community Scorecard', color: '#F5F5F7' },
              { label: 'H3', size: 33, sample: 'Wildfire Risk Assessment', color: '#F5F5F7' },
              { label: 'H4', size: 27, sample: 'Design System', color: '#F5F5F7' },
              {
                label: 'Body LG',
                size: 18,
                sample: 'The quick brown fox jumps over the lazy dog',
                color: '#A1A1AA',
              },
              {
                label: 'Body MD',
                size: 16,
                sample: 'The quick brown fox jumps over the lazy dog',
                color: '#A1A1AA',
              },
              {
                label: 'Body SM',
                size: 14,
                sample: 'The quick brown fox jumps over the lazy dog',
                color: '#71717A',
              },
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '20px',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    color: '#71717A',
                    width: '55px',
                    flexShrink: 0,
                  }}
                >
                  {t.label}
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    color: '#71717A',
                    width: '40px',
                    flexShrink: 0,
                  }}
                >
                  {t.size}px
                </div>
                <div
                  style={{
                    fontSize: `${t.size}px`,
                    color: t.color,
                    fontFamily: 'inherit',
                    lineHeight: 1.2,
                  }}
                >
                  {t.sample}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={sectionGap}>
        <p style={sectionLabel}>ATOMS, 17 COMPONENTS</p>
        <h2 style={sectionHeading}>The raw materials</h2>
        <p style={bodyText}>
          17 atoms form the foundation of Ember. Each fully documented with interactive controls,
          all states, code examples, props, Do&apos;s and Don&apos;ts, and accessibility notes.
        </p>
        <div
          style={{
            background: '#232329',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            marginTop: '32px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: '#71717A',
              fontWeight: 600,
              marginBottom: '24px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Button Anatomy
          </div>
          <div style={{ display: 'inline-flex', position: 'relative', marginBottom: '32px' }}>
            <Button label="Download Scorecard" type="default" />
          </div>
          <div
            style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {[
              { label: 'Height', value: '48px', note: 'WCAG touch target' },
              { label: 'H. Padding', value: '24px', note: 'var(--space-600)' },
              { label: 'Border Radius', value: '50px', note: 'pill shape' },
              { label: 'Font Size', value: '19.2px', note: 'Work Sans' },
              { label: 'Focus Ring', value: '2px', note: 'offset 2px' },
            ].map((spec, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#F5F5F7' }}>
                  {spec.value}
                </div>
                <div style={{ fontSize: '11px', color: '#A1A1AA', marginTop: '2px' }}>{spec.label}</div>
                <div
                  style={{
                    fontSize: '10px',
                    color: '#71717A',
                    fontFamily: 'monospace',
                  }}
                >
                  {spec.note}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '32px', overflowX: 'auto' }}>
          <div
            style={{
              fontSize: '12px',
              color: '#71717A',
              fontWeight: 600,
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Button States Matrix, live components
          </div>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: '#232329' }}>
                <th
                  style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    fontSize: '11px',
                    color: '#A1A1AA',
                    fontWeight: 600,
                    borderBottom: '2px solid #FF6701',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                />
                {['Default', 'Hover', 'Pressed', 'Focus', 'Disabled'].map((s) => (
                  <th
                    key={s}
                    style={{
                      padding: '10px 16px',
                      textAlign: 'center',
                      fontSize: '11px',
                      color: '#A1A1AA',
                      fontWeight: 600,
                      borderBottom: '2px solid #FF6701',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(['default', 'outlined', 'transparent'] as const).map((type, ti) => (
                <tr
                  key={type}
                  style={{ background: ti % 2 === 0 ? '#1B1B1F' : '#232329' }}
                >
                  <td
                    style={{
                      padding: '14px 16px',
                      fontSize: '11px',
                      color: '#A1A1AA',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {type}
                  </td>
                  {(['default', 'hover', 'pressed', 'focus', 'disabled'] as const).map((status) => (
                    <td key={status} style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <Button label="Button" type={type} status={status} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          <div
            style={{
              background: '#232329',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                color: '#71717A',
                fontWeight: 600,
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Badge, 6 semantic variants
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {(['primary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((v) => (
                <Badge key={`${v}-md`} label={v} variant={v} size="md" />
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(['primary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((v) => (
                <Badge key={`${v}-sm`} label={v} variant={v} size="sm" />
              ))}
            </div>
          </div>
          <div
            style={{
              background: '#232329',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                color: '#71717A',
                fontWeight: 600,
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Avatar, 5 sizes + status
            </div>
            <div
              style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}
            >
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <Avatar key={size} name="Hrithik Sanyal" size={size} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Avatar name="Jane Smith" size="md" status="online" />
              <Avatar name="Alex Chen" size="md" status="away" />
              <Avatar name="Maria Garcia" size="md" status="offline" />
            </div>
          </div>
          <div
            style={{
              background: '#232329',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                color: '#71717A',
                fontWeight: 600,
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Loader, 3 sizes, pure CSS
            </div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Loader size="sm" variant="primary" />
              <Loader size="md" variant="primary" />
              <Loader size="lg" variant="primary" />
              <Loader size="md" variant="success" />
              <Loader size="md" variant="info" />
            </div>
          </div>
          <RatingDemo />
        </div>
      </div>

      <div style={sectionGap}>
        <p style={sectionLabel}>MOLECULES, 26 COMPONENTS</p>
        <h2 style={sectionHeading}>Atoms working together</h2>
        <p style={bodyText}>
          Molecules are where atoms start working as a team. The Input molecule combines Label +
          Field + hint Text into one complete unit that handles every state consistently.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            marginTop: '32px',
          }}
        >
          <InputStateDemo />
          <TabBarDemo />
          <StepperDemo />
          <div
            style={{
              background: '#232329',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                color: '#71717A',
                fontWeight: 600,
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              ProgressBar, 5 variants
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(
                [
                  { variant: 'primary', value: 75, label: 'Scorecard completion' },
                  { variant: 'success', value: 90, label: 'Accessibility compliance' },
                  { variant: 'warning', value: 45, label: 'Community preparedness' },
                  { variant: 'error', value: 20, label: 'Risk exposure' },
                  { variant: 'info', value: 60, label: 'Documentation' },
                ] as const
              ).map((item, i) => (
                <ProgressBar
                  key={i}
                  value={item.value}
                  variant={item.variant}
                  label={item.label}
                  showValue
                  animated
                  size="md"
                />
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
        >
          <StatCard
            value="68"
            label="Total components"
            variant="primary"
            trend="up"
            trendValue="+68 from v0"
          />
          <StatCard value="100+" label="Design tokens" variant="info" />
          <StatCard value="WCAG AA" label="Every component" variant="success" />
          <StatCard value="3" label="Atomic layers" variant="warning" />
        </div>
      </div>

      <div style={sectionGap}>
        <p style={sectionLabel}>ORGANISMS, 20 COMPONENTS</p>
        <h2 style={sectionHeading}>Page-level patterns</h2>
        <p style={bodyText}>
          Organisms are the complex UI sections that represent meaningful pieces of the CWPC
          product. Built entirely from molecules and atoms, they represent real production-ready
          patterns.
        </p>
        <div
          style={{
            marginTop: '32px',
            marginBottom: '32px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: '#71717A',
              fontWeight: 600,
              padding: '12px 16px',
              background: '#232329',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Navbar, actual CWPC navigation
          </div>
          <Navbar
            sticky={false}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Showcase', href: '/showcase', hasDropdown: true },
              { label: 'Scorecard', href: '/scorecard', hasDropdown: true },
              { label: 'Sponsor', href: '/sponsor' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ]}
            activeHref="/"
          />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            marginBottom: '32px',
          }}
        >
          <CardVariantDemo />
          <AlertDemo />
        </div>
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              fontSize: '12px',
              color: '#71717A',
              fontWeight: 600,
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            AccordionItem, click to expand
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <AccordionItem
              title="What is the Community Wildfire Resilience Scorecard?"
              body="The CWPC Community Wildfire Resilience Scorecard follows the United Nations' 10 Essentials framework and incorporates cutting-edge resilience principles with a diverse range of readiness factors."
            />
            <AccordionItem
              title="How do I use the Scorecard?"
              body="Download the Scorecard ZIP file which contains instructions, an Excel spreadsheet for data entry, and a PDF version. Work through each of the 10 essential categories."
              defaultOpen
            />
            <AccordionItem
              title="Who is the Scorecard for?"
              body="The Scorecard is designed for community leaders, fire safe councils, local government officials, and anyone working to improve wildfire resilience."
            />
          </div>
        </div>
      </div>

      <div style={sectionGap}>
        <p style={sectionLabel}>DOCUMENTATION</p>
        <h2 style={sectionHeading}>Components without docs are just code</h2>
        <p style={bodyText}>
          I built Ember, a full Storybook-style documentation site. Every component has
          interactive controls, per-variant code, props table, Do&apos;s and Don&apos;ts, and
          accessibility notes.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginTop: '32px',
            marginBottom: '40px',
          }}
        >
          {[
            {
              emoji: '🎛️',
              title: 'Interactive Controls',
              desc: 'Every prop editable live. The component updates instantly.',
            },
            {
              emoji: '📑',
              title: 'Story Tabs',
              desc: 'One tab per variant, each with its own code snippet.',
            },
            {
              emoji: '📋',
              title: 'Props Table',
              desc: 'Every prop with type, default value, and description.',
            },
            {
              emoji: '♿',
              title: 'Accessibility Notes',
              desc: 'ARIA roles, keyboard nav, WCAG level, per component.',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                gap: '16px',
              }}
            >
              <div style={{ fontSize: '24px', flexShrink: 0 }}>{item.emoji}</div>
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#F5F5F7',
                    marginBottom: '6px',
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: '#1B1B1F',
            borderRadius: '16px',
            padding: '48px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 0%, rgba(255,103,1,0.15), transparent 70%)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#FF6701',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              EXPLORE EMBER
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 800,
                color: '#F5F5F7',
                letterSpacing: '-0.02em',
                marginBottom: '12px',
                lineHeight: 1.2,
              }}
            >
              68 components. 3 layers.
              <br />
              One source of truth.
            </div>
            <div style={{ fontSize: '15px', color: '#A1A1AA', marginBottom: '32px' }}>
              Every component interactive. Every prop documented.
            </div>
            <div
              style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <a
                href="/docs"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '12px 28px',
                  background: '#FF6701',
                  color: 'black',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Open Ember Docs →
              </a>
              <a
                href="https://www.figma.com/design/2bE1dja5Ul5JrXGhvBgE23"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '12px 28px',
                  background: 'transparent',
                  color: '#F5F5F7',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                View Figma File
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={sectionGap}>
        <p style={sectionLabel}>ACCESSIBILITY</p>
        <h2 style={sectionHeading}>Designing for the person in the smoke</h2>
        <p style={bodyText}>
          WCAG AA compliance is the baseline below which no Ember component ships. Emergency tools
          must work for elderly residents, keyboard users, and anyone making critical decisions
          under pressure.
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            marginTop: '32px',
            marginBottom: '40px',
          }}
        >
          {[
            {
              icon: '⌨️',
              label: 'Keyboard Navigation',
              desc: 'Every interactive component fully navigable by keyboard. Tab, Enter, Space, Escape, all mapped.',
            },
            {
              icon: '🎨',
              label: 'Color Contrast',
              desc: 'All combinations meet 4.5:1 WCAG AA minimum. Primary actions meet 7:1 AAA.',
            },
            {
              icon: '👆',
              label: 'Touch Targets',
              desc: 'All interactive elements meet 44×44px minimum. Primary buttons are 48px for stressed hands.',
            },
            {
              icon: '📢',
              label: 'Screen Reader Support',
              desc: 'Semantic HTML throughout. ARIA labels on icon-only elements. Errors via aria-describedby.',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: '#1B1B1F',
                padding: '20px 24px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                borderBottom:
                  i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255,103,1,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#F5F5F7',
                    marginBottom: '4px',
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {[
            { bg: '#FF6701', text: '#000', ratio: '4.8:1', label: 'Orange on Black', pass: true },
            { bg: '#121212', text: '#fff', ratio: '19.2:1', label: 'White on Dark', pass: true },
            { bg: '#65A637', text: '#000', ratio: '5.1:1', label: 'Green on Black', pass: true },
            { bg: '#0D72FF', text: '#fff', ratio: '4.6:1', label: 'Blue + White', pass: true },
            { bg: '#FF6701', text: '#fff', ratio: '2.9:1', label: 'Orange on White', pass: false },
            { bg: '#FFAC0D', text: '#000', ratio: '8.2:1', label: 'Amber on Black', pass: true },
            { bg: '#FF270D', text: '#fff', ratio: '4.5:1', label: 'Red on White', pass: true },
            { bg: '#B6B6B6', text: '#121212', ratio: '10.3:1', label: 'Neutral on Dark', pass: true },
          ].map((item, i) => (
            <div key={i} style={{ background: item.bg, borderRadius: '8px', padding: '14px' }}>
              <div style={{ color: item.text, fontSize: '14px', fontWeight: 700 }}>{item.ratio}</div>
              <div style={{ color: item.text, fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>
                {item.label}
              </div>
              <div
                style={{
                  marginTop: '8px',
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '100px',
                  fontSize: '10px',
                  fontWeight: 700,
                  background: 'rgba(0,0,0,0.25)',
                  color: 'white',
                }}
              >
                {item.pass ? '✓ PASS' : '✗ FAIL, not used'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={sectionGap}>
        <p style={sectionLabel}>DESIGN ↔ CODE</p>
        <h2 style={sectionHeading}>The same value, in two places</h2>
        <p style={bodyText}>
          Every visual decision in Figma maps directly to a CSS custom property in code. There is
          no translation layer, no interpretation, no ambiguity.
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginTop: '32px',
            marginBottom: '32px',
          }}
        >
          {[
            { label: 'Figma Variable', value: 'color/primary/default', color: '#7C3AED' },
            '→',
            { label: 'CSS Custom Property', value: '--color-primary-default', color: '#FF6701' },
            '→',
            { label: 'Resolved Value', value: '#FF6701', color: '#FF6701' },
          ].map((item, i) =>
            typeof item === 'string' ? (
              <div key={i} style={{ color: '#FF6701', fontSize: '20px', fontWeight: 700 }}>
                {item}
              </div>
            ) : (
              <div
                key={i}
                style={{
                  background: '#232329',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    color: '#71717A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '6px',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontFamily: 'monospace',
                    color: item.color,
                    fontWeight: 600,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ),
          )}
        </div>
        <div
          style={{
            background: '#1E1E1E',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '32px',
          }}
        >
          <div style={{ background: '#2D2D2D', padding: '8px 16px' }}>
            <span style={{ fontSize: '11px', color: '#71717A', fontFamily: 'monospace' }}>
              tsx, using Ember in production
            </span>
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
          >{`import { Button } from './components/prism/atoms/Button/Button'
import { Input } from './components/prism/molecules/Input/Input'
import { Card } from './components/prism/organisms/Card/Card'

<Button label="Download Scorecard" type="default" colorScheme="information" />
<Input label="Email address" type="email" required hint="We'll send your scorecard here" />
<Card title="Community Wildfire Resilience" variant="highlighted" />`}</pre>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F5F7', marginBottom: '16px' }}>
          Component Governance
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              step: '01',
              q: 'Does a similar component exist in Ember?',
              yes: 'Use the existing component',
              no: 'Continue to next step',
            },
            {
              step: '02',
              q: 'Can an existing component be adapted?',
              yes: 'Modify it + document the change',
              no: 'Continue to next step',
            },
            {
              step: '03',
              q: 'Is this pattern reusable across products?',
              yes: 'Build it + add to Ember',
              no: 'Build as one-off, review later',
            },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,103,1,0.12)',
                  border: '1px solid rgba(255,103,1,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#FF6701',
                  flexShrink: 0,
                }}
              >
                {item.step}
              </div>
              <div
                style={{
                  flex: 1,
                  background: '#232329',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  padding: '16px',
                }}
              >
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#F5F5F7',
                    marginBottom: '10px',
                  }}
                >
                  {item.q}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: 'rgba(101,166,55,0.08)',
                      border: '1px solid rgba(101,166,55,0.25)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#65A637',
                    }}
                  >
                    ✓ Yes → {item.yes}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: '#232329',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#A1A1AA',
                    }}
                  >
                    ✗ No → {item.no}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={sectionGap}>
        <p style={sectionLabel}>IMPACT</p>
        <h2 style={sectionHeading}>What Ember delivered</h2>
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
            {
              value: '68',
              label: 'Total components',
              color: '#FF6701',
              bg: 'rgba(255,103,1,0.08)',
              border: 'rgba(255,103,1,0.2)',
            },
            {
              value: '100+',
              label: 'Design tokens',
              color: '#0D72FF',
              bg: 'rgba(13,114,255,0.08)',
              border: 'rgba(13,114,255,0.2)',
            },
            {
              value: 'WCAG AA',
              label: 'Every component',
              color: '#65A637',
              bg: 'rgba(101,166,55,0.08)',
              border: 'rgba(101,166,55,0.25)',
            },
            {
              value: '3',
              label: 'Atomic layers',
              color: '#FFAC0D',
              bg: 'rgba(255,172,13,0.08)',
              border: 'rgba(255,172,13,0.2)',
            },
            {
              value: '17',
              label: 'Atoms',
              color: '#FF6701',
              bg: 'rgba(255,103,1,0.08)',
              border: 'rgba(255,103,1,0.2)',
            },
            {
              value: '26',
              label: 'Molecules',
              color: '#0D72FF',
              bg: 'rgba(13,114,255,0.08)',
              border: 'rgba(13,114,255,0.2)',
            },
            {
              value: '20',
              label: 'Organisms',
              color: '#65A637',
              bg: 'rgba(101,166,55,0.08)',
              border: 'rgba(101,166,55,0.25)',
            },
            {
              value: '5+',
              label: 'States per component',
              color: '#FFAC0D',
              bg: 'rgba(255,172,13,0.08)',
              border: 'rgba(255,172,13,0.2)',
            },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: stat.bg,
                border: `1px solid ${stat.border}`,
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: '#A1A1AA', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <p style={bodyText}>
          Beyond the numbers, Ember changed how CWPC builds. Designers no longer debate which
          button to use. Developers no longer guess at spacing values. New features start from
          68 production-ready components. Every screen now works for elderly residents, keyboard
          users, and anyone who needs it most.
        </p>
        <div
          style={{
            padding: '24px 32px',
            background: 'rgba(255,103,1,0.08)',
            borderRadius: '0 12px 12px 0',
            marginTop: '32px',
            border: '1px solid rgba(255,103,1,0.2)',
            borderLeft: '3px solid #FF6701',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontStyle: 'italic',
              color: '#A1A1AA',
              lineHeight: 1.65,
              marginBottom: '16px',
            }}
          >
            &quot;Building Ember changed how I think about design. Every decision had downstream
            consequences. I learned to design for every screen that will ever exist, not just the
            one in front of me.&quot;
          </div>
          <div style={{ fontSize: '13px', color: '#71717A', fontWeight: 600 }}>
           , Hrithik Sanyal, Product Designer
          </div>
        </div>
      </div>

      <div style={sectionGap}>
        <p style={sectionLabel}>REFLECTIONS</p>
        <h2 style={sectionHeading}>What I learned building alone</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
          {[
            {
              emoji: '🏗️',
              title: 'Tokens are the foundation, get them right first',
              body: "I spent time refactoring early components after my initial token naming wasn't scalable. color-orange is wrong. color-primary-default is right, it carries meaning, not just appearance. Spend a full week on token architecture before touching any component.",
            },
            {
              emoji: '📝',
              title: 'Documentation is half the product',
              body: "Beautiful components that no one understands are useless. The props tables, Do's and Don'ts, accessibility notes, these are what make Ember a system rather than a component library.",
            },
            {
              emoji: '🔁',
              title: 'Systems thinking is a different muscle',
              body: 'Product design asks: what does this user need on this screen? Systems design asks: what will every designer and developer need, in every future context, for every future product?',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                gap: '16px',
              }}
            >
              <div style={{ fontSize: '24px', flexShrink: 0 }}>{item.emoji}</div>
              <div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#F5F5F7',
                    marginBottom: '8px',
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.7 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F5F7', marginBottom: '12px' }}>
            What I&apos;d do differently
          </h3>
          <p style={bodyText}>
            Start with a minimal viable system, 10 core components, fully documented, then expand
            based on real usage. I tried to build comprehensively from day one. Better to ship
            something useful than something complete.
          </p>
        </div>
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F5F7', marginBottom: '16px' }}>
            What&apos;s next for Ember
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'Publish as an npm package so CWPC developers can install and import directly',
              'Add dark mode support, the token architecture is already ready for it',
              'Build Figma Code Connect so Figma components link directly to their code counterparts',
              'Add automated accessibility testing to the Ember docs site',
            ].map((line, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  padding: '12px 16px',
                  background: '#232329',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                }}
              >
                <span style={{ color: '#FF6701', fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.5 }}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export interface EmberDesignSystemProjectProps {
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

export function EmberDesignSystemProject({
  onBack,
  onProjectClick,
}: EmberDesignSystemProjectProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const [caseStudyVisible, setCaseStudyVisible] = useState(getInitialCaseStudyVisible);
  const hideBarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const title = 'Ember Design System';
  const company = 'Catastrophic Wildfire Prevention Consortium';
  const subtitle =
    'A production-ready React + TypeScript design system with 68 documented components, 100+ tokens, and a Storybook-style docs site for CWPC emergency tools.';
  const role =
    'End-to-end Design Systems, Component Development, React + TypeScript, Documentation';
  const team = 'Solo Designer + Developer';
  const when = '2025 – 2026';
  const progressBarColor = '#FF6701';
  const arrowColor = '#FF6701';
  const overview: string | undefined = '';
  const speedReadChallenge =
    'CWPC had no shared design language. Five different button styles across three platforms. Forty-seven raw color values with no naming system. Zero accessibility standards. Emergency tools that people depend on during wildfires were failing the communities they were built to serve.';
  const speedReadProcess =
    "I audited every existing CWPC UI pattern, extracted design tokens from Figma, and built the system bottom-up using Atomic Design principles, 17 atoms first, then 26 molecules, then 20 organisms. I wrote the component library in React with TypeScript and CSS custom properties, then built Ember, a full Storybook-style documentation site with interactive controls, per-component code examples, Do's and Don'ts, and accessibility guidelines.";
  const speedReadTakeaways =
    "Building a design system alone taught me that the hardest part isn't the components, it's the decisions. Every token name, every prop interface, every state has downstream consequences. I learned to think in systems, not screens. Documentation is not an afterthought, it is half the product.";
  const speedReadImpact =
    '68 fully documented interactive components. 100+ design tokens. A live Storybook-style documentation site. A shared design language that ensures CWPC tools now serve every community member including elderly residents and people using assistive technology.';

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
    color: '#71717A',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px',
    fontSize: '11px',
  };
  const metaValueStyle: CSSProperties = { color: '#A1A1AA', fontSize: '18px', lineHeight: 1.6 };
  const speedReadMuted: CSSProperties = { color: '#71717A' };
  const speedReadBody: CSSProperties = { color: '#A1A1AA' };

  return (
    <div className="min-h-screen" style={{ background: '#1B1B1F' }}>
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
        className="w-full h-[300px] md:h-[500px] flex items-center justify-center overflow-hidden"
        style={{ background: '#1B1B1F' }}
      >
        <div
          className="h-full w-full flex flex-wrap content-center justify-center gap-2 p-6"
          style={{ alignContent: 'center' }}
        >
          {Array.from({ length: 60 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 40,
                height: 40,
                borderRadius: 6,
                background: HEADER_SQUARE_COLORS[i % HEADER_SQUARE_COLORS.length],
                opacity: 0.7,
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 md:gap-16">
          <div className="space-y-8">
            <div className="block">
              <svg className="w-[48px] h-[48px]" viewBox="0 0 24 24" fill="#A1A1AA">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
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

          <div className="space-y-16">
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
                style={{ color: '#A1A1AA' }}
              >
                {subtitle}
              </p>
              {SHOW_PROJECT_OVERVIEW && overview ? (
                <p className="text-[18px] md:text-[20px] leading-[1.8]" style={{ color: '#A1A1AA' }}>
                  {overview}
                </p>
              ) : null}
            </div>

            <div className="space-y-8">
              <div className="space-y-2 text-center">
                <h3
                  className="text-[11px] tracking-[0.2em] uppercase font-medium"
                  style={speedReadMuted}
                >
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
                <p className="text-[16px] leading-relaxed" style={{ color: '#71717A' }}>
                  Click the arrow to read the entire case study.
                </p>
                <button
                  type="button"
                  onClick={scrollToCaseStudy}
                  aria-label="Scroll to case study"
                  className="group block cursor-pointer border-0 bg-transparent p-0 mt-8 transition-transform duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-0"
                >
                  <svg
                    width={56}
                    height={64}
                    viewBox="0 0 32 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: 'block',
                      flexShrink: 0,
                      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.25))',
                    }}
                    className="arrow-float-premium"
                  >
                    {getArrowGradientColors(arrowColor).map((fill, i) => (
                      <path key={i} d={`M4 ${i * 5} L28 ${i * 5} L16 ${12 + i * 5}`} fill={fill} />
                    ))}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {caseStudyVisible ? (
          <>
            <div
              id="case-study-start"
              className="space-y-16 mt-16"
              style={{ scrollMarginTop: 'var(--nav-height, 80px)' }}
            >
              <CaseStudyContent />
              <ExploreMoreSection
                currentProjectId={CURRENT_PROJECT_ID}
                onBack={onBack}
                onProjectClick={onProjectClick}
                projectTitleColor="#ffffff"
              />
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
          </>
        ) : null}
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12" data-footer>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 text-[13px]">
          <div className="flex flex-wrap items-center gap-2" style={{ color: '#71717A' }}>
            <FooterCreditsRow />
          </div>
          <div className="flex items-center gap-3 md:gap-5">
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
            <a
              href="https://x.com/hrithiksanyal"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: '#71717A' }}
              aria-label="X (Twitter)"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://soundcloud.com/avlncemusic"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: '#71717A' }}
              aria-label="SoundCloud"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 800 348" fill="none" xmlns="http://www.w3.org/2000/svg">
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
