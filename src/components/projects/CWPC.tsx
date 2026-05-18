import React, { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { FooterCreditsRow } from '../FooterAccessibilityLink';
import { createPortal } from 'react-dom';
import { Linkedin, Youtube, Instagram, Facebook, Github, Figma } from 'lucide-react';
import { Button } from '../prism/atoms/Button/Button';
import { Badge } from '../prism/atoms/Badge/Badge';
import { Avatar } from '../prism/atoms/Avatar/Avatar';
import { Rating } from '../prism/atoms/Rating/Rating';
import { Loader } from '../prism/atoms/Loader/Loader';
import { Input } from '../prism/molecules/Input/Input';
import { ProgressBar } from '../prism/molecules/ProgressBar/ProgressBar';
import { TabBar } from '../prism/molecules/TabBar/TabBar';
import { Stepper } from '../prism/molecules/Stepper/Stepper';
import { StatCard } from '../prism/molecules/StatCard/StatCard';
import { Card } from '../prism/organisms/Card/Card';
import { AccordionItem } from '../prism/organisms/AccordionItem/AccordionItem';
import { Alert } from '../prism/organisms/Alert/Alert';
import { Navbar } from '../prism/organisms/Navbar/Navbar';
import { ScrollToTop } from '../ScrollToTop';
import { useLightbox } from '../Lightbox';
import { ExploreMoreSection } from './ExploreMoreSection';
import { SHOW_PROJECT_OVERVIEW } from './projectConfig';
import { getInitialCaseStudyVisible } from './caseStudyRestore';
import { DesignSystemExploreCallout } from './DesignSystemExploreCallout';

/** Must match `PROJECT_ORDER` in projectOrder.ts so ExploreMoreSection prev/next resolves. */
const CURRENT_PROJECT_ID = 'CWPC';

const PROGRESS_BAR_HIDE_DELAY_MS = 400;

/** Same endpoints as `CwpcDsCaseStudy.tsx` EXPLORE PRISM block */
const PRISM_FIGMA_URL = 'https://www.figma.com/@iamhtk';

const CWPC_PRISM_EXPLORE_ACTIONS = [
  { label: 'Open Storybook', href: 'https://prism-cwpc-storybook.pages.dev/', variant: 'primary' as const },
  { label: 'View Component Showcase', href: 'https://prism.cwpc.hrithiksanyal.com/', variant: 'secondary' as const },
  { label: 'View Docs', href: 'https://prism.cwpc.hrithiksanyal.com/docs/', variant: 'secondary' as const },
  { label: 'View Figma File', href: PRISM_FIGMA_URL, variant: 'secondary' as const, showArrow: false },
];

function EmberStyles() {
  return (
    <style>{`
    @keyframes ember-spin {
      to { transform: rotate(360deg); }
    }
    @keyframes ember-shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `}</style>
  );
}

const E = {
  Button,
  Badge,
  Avatar,
  Rating,
  Loader,
  Input,
  ProgressBar,
  TabBar,
  Stepper,
  StatCard,
  Card,
  AccordionItem,
  Alert,
  Navbar,
  Skeleton: ({
    variant = 'text',
    lines = 3,
    width = '100%',
    height = '16px',
    animated = true,
  }: {
    variant?: 'text' | 'circle' | 'rectangle';
    lines?: number;
    width?: string | number;
    height?: string | number;
    animated?: boolean;
  }) => {
    const shimmerStyle: CSSProperties = animated
      ? {
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
          backgroundSize: '200% 100%',
          animation: 'ember-shimmer 1.5s infinite',
        }
      : { background: 'rgba(255,255,255,0.06)' };

    if (variant === 'circle')
      return (
        <div
          style={{
            width: height,
            height: height,
            borderRadius: '50%',
            flexShrink: 0,
            ...shimmerStyle,
          }}
        />
      );
    if (variant === 'rectangle')
      return <div style={{ width, height, borderRadius: '8px', ...shimmerStyle }} />;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            style={{
              height,
              borderRadius: '4px',
              width: i === lines - 1 ? '60%' : '100%',
              ...shimmerStyle,
            }}
          />
        ))}
      </div>
    );
  },

  Tag: ({
    label,
    onRemove,
    variant = 'default',
    disabled = false,
  }: {
    label: string;
    onRemove?: () => void;
    variant?: 'default' | 'primary' | 'success';
    disabled?: boolean;
  }) => {
    const variants = {
      default: {
        bg: 'rgba(255,255,255,0.08)',
        color: '#A1A1AA',
        border: 'rgba(255,255,255,0.12)',
      },
      primary: { bg: 'rgba(255,103,1,0.12)', color: '#FF6701', border: 'rgba(255,103,1,0.25)' },
      success: { bg: 'rgba(101,166,55,0.12)', color: '#65A637', border: 'rgba(101,166,55,0.25)' },
    };
    const v = variants[variant];
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: '100px',
          background: v.bg,
          border: `1px solid ${v.border}`,
          fontSize: '12px',
          fontWeight: 600,
          color: v.color,
          opacity: disabled ? 0.4 : 1,
        }}
      >
        {label}
        {onRemove && !disabled ? (
          <span
            role="button"
            tabIndex={0}
            onClick={onRemove}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') onRemove();
            }}
            style={{ cursor: 'pointer', opacity: 0.6, lineHeight: 1 }}
          >
            ×
          </span>
        ) : null}
      </span>
    );
  },

  Checkbox: ({
    label,
    checked = false,
    disabled = false,
    hint,
  }: {
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    hint?: string;
  }) => {
    const [isChecked, setIsChecked] = React.useState(checked);
    return (
      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.4 : 1,
          maxWidth: '100%',
        }}
      >
        <div
          role="checkbox"
          aria-checked={isChecked}
          onClick={() => {
            if (!disabled) setIsChecked(!isChecked);
          }}
          onKeyDown={(ev) => {
            if (!disabled && (ev.key === 'Enter' || ev.key === ' ')) {
              ev.preventDefault();
              setIsChecked(!isChecked);
            }
          }}
          tabIndex={disabled ? -1 : 0}
          style={{
            width: 20,
            height: 20,
            borderRadius: '4px',
            flexShrink: 0,
            marginTop: '1px',
            border: `2px solid ${isChecked ? '#FF6701' : 'rgba(255,255,255,0.2)'}`,
            background: isChecked ? '#FF6701' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
          }}
        >
          {isChecked ? (
            <span style={{ color: '#000', fontSize: '12px', fontWeight: 900, lineHeight: 1 }}>✓</span>
          ) : null}
        </div>
        {label ? (
          <div style={{ flex: 1, minWidth: 0, overflowWrap: 'break-word' }}>
            <div style={{ fontSize: '14px', color: '#F5F5F7', fontWeight: 500 }}>{label}</div>
            {hint ? (
              <div style={{ fontSize: '12px', color: '#71717A', marginTop: '2px' }}>{hint}</div>
            ) : null}
          </div>
        ) : null}
      </label>
    );
  },

  Switch: ({
    label,
    checked = false,
    disabled = false,
    hint,
  }: {
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    hint?: string;
  }) => {
    const [isOn, setIsOn] = React.useState(checked);
    return (
      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.4 : 1,
          maxWidth: '100%',
        }}
      >
        <div
          role="switch"
          aria-checked={isOn}
          onClick={() => {
            if (!disabled) setIsOn(!isOn);
          }}
          style={{
            width: 44,
            height: 24,
            borderRadius: '100px',
            flexShrink: 0,
            background: isOn ? '#FF6701' : 'rgba(255,255,255,0.12)',
            position: 'relative',
            transition: 'background 0.2s ease',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '3px',
              left: isOn ? '23px' : '3px',
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          />
        </div>
        {label ? (
          <div style={{ flex: 1, minWidth: 0, overflowWrap: 'break-word', paddingTop: '1px' }}>
            <div style={{ fontSize: '14px', color: '#F5F5F7', fontWeight: 500 }}>{label}</div>
            {hint ? (
              <div style={{ fontSize: '12px', color: '#71717A', marginTop: '2px' }}>{hint}</div>
            ) : null}
          </div>
        ) : null}
      </label>
    );
  },

  MapPin: ({
    color = 'primary',
    size = 'md',
    label,
    active = false,
  }: {
    color?: 'primary' | 'success' | 'error' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    active?: boolean;
  }) => {
    const colors = {
      primary: '#FF6701',
      success: '#65A637',
      error: '#FF270D',
      warning: '#FFAC0D',
    };
    const sizes = { sm: 24, md: 32, lg: 44 };
    const px = sizes[size];
    const c = colors[color];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <div
          style={{
            width: px,
            height: px * 1.3,
            position: 'relative',
            filter: active ? `drop-shadow(0 0 8px ${c}80)` : 'none',
          }}
        >
          <svg viewBox="0 0 24 32" fill={c} style={{ width: '100%', height: '100%' }}>
            <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
          </svg>
        </div>
        {label ? (
          <span style={{ fontSize: '11px', color: '#A1A1AA', fontWeight: 500 }}>{label}</span>
        ) : null}
      </div>
    );
  },

  NotificationBar: ({
    message,
    variant = 'info',
    dismissible = true,
  }: {
    message: string;
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    dismissible?: boolean;
  }) => {
    const [visible, setVisible] = React.useState(true);
    const variants = {
      primary: {
        bg: 'rgba(255,103,1,0.12)',
        border: 'rgba(255,103,1,0.25)',
        color: '#FF6701',
        icon: '🔔',
      },
      success: {
        bg: 'rgba(101,166,55,0.12)',
        border: 'rgba(101,166,55,0.25)',
        color: '#65A637',
        icon: '✅',
      },
      warning: {
        bg: 'rgba(255,172,13,0.12)',
        border: 'rgba(255,172,13,0.25)',
        color: '#FFAC0D',
        icon: '⚠️',
      },
      error: {
        bg: 'rgba(255,39,13,0.12)',
        border: 'rgba(255,39,13,0.25)',
        color: '#FF270D',
        icon: '🚨',
      },
      info: {
        bg: 'rgba(13,114,255,0.12)',
        border: 'rgba(13,114,255,0.25)',
        color: '#0D72FF',
        icon: 'ℹ️',
      },
    };
    const v = variants[variant];
    if (!visible) return null;
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 20px',
          borderRadius: '8px',
          background: v.bg,
          border: `1px solid ${v.border}`,
        }}
      >
        <span style={{ fontSize: '16px' }}>{v.icon}</span>
        <span
          style={{
            flex: 1,
            minWidth: 0,
            fontSize: '14px',
            color: v.color,
            fontWeight: 500,
            overflowWrap: 'break-word',
          }}
        >
          {message}
        </span>
        {dismissible ? (
          <span
            role="button"
            tabIndex={0}
            onClick={() => setVisible(false)}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') setVisible(false);
            }}
            style={{ cursor: 'pointer', color: v.color, opacity: 0.6, fontSize: '16px', lineHeight: 1 }}
          >
            ×
          </span>
        ) : null}
      </div>
    );
  },

  FilterBar: ({
    filters,
    multiSelect = true,
  }: {
    filters: { id: string; label: string; count?: number }[];
    multiSelect?: boolean;
  }) => {
    const [active, setActive] = React.useState<string[]>(() =>
      filters[0]?.id != null ? [filters[0].id] : [],
    );
    const toggle = (id: string) => {
      if (multiSelect) {
        setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
      } else {
        setActive([id]);
      }
    };
    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '100%' }}>
        {filters.map((f) => {
          const isActive = active.includes(f.id);
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => toggle(f.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '100px',
                border: `1px solid ${isActive ? '#FF6701' : 'rgba(255,255,255,0.12)'}`,
                background: isActive ? 'rgba(255,103,1,0.12)' : 'transparent',
                color: isActive ? '#FF6701' : '#A1A1AA',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s ease',
              }}
            >
              {f.label}
              {f.count !== undefined ? (
                <span style={{ fontSize: '11px', opacity: 0.7 }}>{f.count}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    );
  },

  Pagination: ({
    currentPage,
    totalPages,
    onChange,
  }: {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
  }) => {
    const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
      if (totalPages <= 7) return i + 1;
      if (i === 0) return 1;
      if (i === 6) return totalPages;
      if (currentPage <= 4) return i + 1;
      if (currentPage >= totalPages - 3) return totalPages - 6 + i;
      return currentPage - 3 + i;
    });
    const btnStyle = (active: boolean, disabled = false): CSSProperties => ({
      width: 36,
      height: 36,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${active ? '#FF6701' : 'rgba(255,255,255,0.1)'}`,
      background: active ? '#FF6701' : 'transparent',
      color: active ? '#000' : disabled ? '#71717A' : '#A1A1AA',
      fontSize: '13px',
      fontWeight: active ? 700 : 400,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'inherit',
      opacity: disabled ? 0.4 : 1,
    });
    return (
      <div className="cwpc-pagination-scroll">
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'nowrap', width: 'max-content' }}>
          <button
            type="button"
            onClick={() => onChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={btnStyle(false, currentPage === 1)}
          >
            ←
          </button>
          {pages.map((page, i) => (
            <button
              key={i}
              type="button"
              onClick={() => typeof page === 'number' && onChange(page)}
              style={btnStyle(page === currentPage)}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={btnStyle(false, currentPage === totalPages)}
          >
            →
          </button>
        </div>
      </div>
    );
  },

  PlaceholderImage: ({
    label,
    width = '100%',
    height = '400px',
    note,
  }: {
    label: string;
    width?: string;
    height?: string;
    note?: string;
  }) => (
    <div
      style={{
        width,
        maxWidth: '100%',
        boxSizing: 'border-box',
        height,
        borderRadius: '12px',
        background:
          'repeating-linear-gradient(45deg, rgba(255,103,1,0.04) 0px, rgba(255,103,1,0.04) 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)',
        border: '2px dashed rgba(255,103,1,0.25)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: '24px' }}>🖼️</div>
      <div
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#FF6701',
          textAlign: 'center',
          padding: '0 16px',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {label}
      </div>
      {note ? (
        <div
          style={{
            fontSize: '11px',
            color: '#71717A',
            textAlign: 'center',
            padding: '0 16px',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {note}
        </div>
      ) : null}
    </div>
  ),
};

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
        Rating: click to set value
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
      className="cwpc-molecule-demo"
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
        Input: click a state
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
    components: '68 components across 3 atomic layers: 17 atoms, 26 molecules, 20 organisms.',
    tokens: '100+ design tokens covering color, spacing, typography, elevation, and blur.',
    accessibility:
      'Every component meets WCAG AA minimum. Keyboard navigation documented for each.',
  };
  return (
    <div
      className="cwpc-molecule-demo"
      style={{
        background: '#232329',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <div className="cwpc-tabbar-demo-header" style={{ padding: '16px 24px 0', background: '#232329' }}>
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
          TabBar: click to switch content
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
        className="cwpc-tabbar-demo-panel"
        style={{
          padding: '20px 24px',
          background: '#1B1B1F',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#A1A1AA',
            lineHeight: 1.7,
            overflowWrap: 'break-word',
          }}
        >
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
    { label: 'Prism Docs', description: 'Interactive documentation' },
  ];
  return (
    <div
      className="cwpc-molecule-demo"
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
        Stepper: click Prev/Next
      </div>
      <div className="cwpc-stepper-scroll" style={{ maxWidth: '100%', minWidth: 0 }}>
        <Stepper
          steps={steps.map((s, i) => ({
            ...s,
            status:
              i < step ? ('complete' as const) : i === step ? ('current' as const) : ('upcoming' as const),
          }))}
          currentStep={step}
          orientation="horizontal"
        />
      </div>
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
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
        Alert: 4 variants, dismissible
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
        Card: variant toggle
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
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

function TagDemo() {
  const [tags, setTags] = useState([
    'Wildfire',
    'Community',
    'Prevention',
    'Scorecard',
    'CWPC',
  ]);
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
        Tag: click × to remove
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {tags.map((tag, i) => (
          <E.Tag
            key={tag}
            label={tag}
            variant={i === 0 ? 'primary' : i === 1 ? 'success' : 'default'}
            onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
          />
        ))}
        {tags.length < 5 ? (
          <button
            type="button"
            onClick={() =>
              setTags(['Wildfire', 'Community', 'Prevention', 'Scorecard', 'CWPC'])
            }
            style={{
              padding: '4px 12px',
              borderRadius: '100px',
              border: '1px dashed rgba(255,255,255,0.2)',
              background: 'transparent',
              color: '#71717A',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Reset
          </button>
        ) : null}
      </div>
    </div>
  );
}

function CheckboxGroupDemo() {
  return (
    <div
      className="cwpc-molecule-demo"
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
        Checkbox: interactive
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <E.Checkbox
          label="Subscribe to CWPC updates"
          hint="Wildfire alerts and community news"
          checked
        />
        <E.Checkbox label="I'm interested in piloting the Scorecard" checked={false} />
        <E.Checkbox label="Accept terms of service" disabled checked={false} />
      </div>
    </div>
  );
}

function SwitchDemo() {
  return (
    <div
      className="cwpc-molecule-demo"
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
        Switch: toggle
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <E.Switch label="Email notifications" hint="Receive wildfire alerts" checked />
        <E.Switch label="SMS alerts" checked={false} />
        <E.Switch label="Auto-renew subscription" disabled checked />
      </div>
    </div>
  );
}

function SearchBarDemo() {
  const [query, setQuery] = useState('');
  const suggestions = [
    'Wildfire scorecard',
    'Wildfire risk assessment',
    'Wildfire prevention tools',
    'Community preparedness',
  ];
  const filtered = suggestions.filter(
    (s) => s.toLowerCase().includes(query.toLowerCase()) && query.length > 0,
  );
  return (
    <div
      className="cwpc-molecule-demo"
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
        SearchBar: type to see suggestions
      </div>
      <div style={{ position: 'relative', width: '100%', minWidth: 0, maxWidth: '100%' }}>
        <div
          style={{
            height: '48px',
            borderRadius: '8px',
            padding: '0 14px 0 40px',
            border: '1.5px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
          }}
        >
          <span style={{ position: 'absolute', left: '14px', color: '#71717A', fontSize: '16px' }}>
            🔍
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search CWPC resources..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#F5F5F7',
              fontSize: '14px',
              fontFamily: 'inherit',
              width: '100%',
              paddingRight: query ? '30px' : '0',
            }}
          />
          {query ? (
            <span
              role="button"
              tabIndex={0}
              onClick={() => setQuery('')}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') setQuery('');
              }}
              style={{
                position: 'absolute',
                right: '14px',
                cursor: 'pointer',
                color: '#71717A',
                fontSize: '16px',
              }}
            >
              ×
            </span>
          ) : null}
        </div>
        {filtered.length > 0 ? (
          <div
            style={{
              position: 'absolute',
              top: '52px',
              left: 0,
              right: 0,
              background: '#1B1B1F',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              overflow: 'hidden',
              zIndex: 10,
            }}
          >
            {filtered.map((s, i) => (
              <div
                key={s}
                role="button"
                tabIndex={0}
                onClick={() => setQuery(s)}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter' || ev.key === ' ') setQuery(s);
                }}
                style={{
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: '#A1A1AA',
                  cursor: 'pointer',
                  borderBottom:
                    i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,103,1,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                🔍 {s}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(3);
  return (
    <div
      className="cwpc-molecule-demo"
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
        Pagination: page {page} of 10
      </div>
      <E.Pagination currentPage={page} totalPages={10} onChange={setPage} />
    </div>
  );
}

function FilterBarDemo() {
  return (
    <div
      className="cwpc-molecule-demo"
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
        FilterBar: multi-select
      </div>
      <E.FilterBar
        filters={[
          { id: 'all', label: 'All', count: 68 },
          { id: 'atoms', label: 'Atoms', count: 17 },
          { id: 'molecules', label: 'Molecules', count: 26 },
          { id: 'organisms', label: 'Organisms', count: 20 },
          { id: 'stable', label: 'Stable' },
          { id: 'new', label: 'New' },
        ]}
        multiSelect
      />
    </div>
  );
}

function SkeletonDemo() {
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
        Skeleton: loading states
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <E.Skeleton variant="circle" height="48px" animated />
        <E.Skeleton variant="text" lines={3} animated />
      </div>
      <div style={{ marginTop: '16px' }}>
        <E.Skeleton variant="rectangle" height="80px" animated />
      </div>
    </div>
  );
}

function MapPinDemo() {
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
        MapPin: 3 colors, active state
      </div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <E.MapPin color="primary" size="lg" label="High Risk" active />
        <E.MapPin color="warning" size="md" label="Medium" />
        <E.MapPin color="success" size="md" label="Safe" />
        <E.MapPin color="error" size="sm" label="Danger" />
      </div>
    </div>
  );
}

function CaseStudyContent() {
  const screenshotHeight = '400px';
  const figmaAtomPairMinHeight = '520px';

  const sectionLabelAccent: CSSProperties = {
    display: 'inline-block',
    width: '24px',
    height: '2px',
    background: '#FF6701',
    borderRadius: '2px',
    flexShrink: 0,
  };

  const sectionLabel: CSSProperties = {
    fontSize: '11px',
    letterSpacing: '0.25em',
    color: '#FF6701',
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
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          CONTEXT
        </p>
        <h2 style={sectionHeading}>When design fails, people fail</h2>
        <p style={bodyText}>
          The Catastrophic Wildfire Prevention Consortium builds tools that help communities
          assess wildfire risk before it&apos;s too late. Picture this: it&apos;s wildfire season,
          a 68-year-old resident opens the Community Scorecard on her phone to check if her
          neighborhood is in danger. Smoke is already visible on the horizon. Her hands are
          shaking. The text is too small. The button is hard to find. She gives up and calls 911
          instead.
        </p>
        <p style={{ ...bodyText, marginTop: '20px' }}>
          That&apos;s not a hypothetical. That&apos;s what poor design costs in this domain. I built
          Prism because emergency tools have zero tolerance for confusion, and the existing CWPC
          product was full of it.
        </p>
      </div>
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          DESIGN PRINCIPLES
        </p>
        <h2 style={sectionHeading}>Three principles that guided every decision</h2>
        <p style={bodyText}>
          Before touching Figma, before writing a single line of code, I wrote down three rules.
          Every component, every token, every documentation decision had to satisfy all three or
          it didn&apos;t ship.
        </p>

        <div
          className="cwpc-grid-3"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '40px' }}
        >
          {[
            {
              number: '01',
              title: 'Accessibility is not a feature',
              body: 'WCAG AA compliance is the floor, not the ceiling. If a component fails contrast, keyboard nav, or ARIA requirements, it does not exist in Prism. Emergency tools serve people in crisis, this is non-negotiable.',
              color: '#FF6701',
              icon: '♿',
            },
            {
              number: '02',
              title: 'Tokens before everything',
              body: 'No hardcoded values. Ever. Every color, every spacing unit, every border radius is a named token. This is what makes the system maintainable, one change propagates everywhere instantly.',
              color: '#0D72FF',
              icon: '🔗',
            },
            {
              number: '03',
              title: 'Documentation is the product',
              body: "A component library without documentation is just code. Prism ships every component with interactive controls, usage guidelines, Do's and Don'ts, and accessibility notes. The docs site IS the design system.",
              color: '#65A637',
              icon: '📖',
            },
          ].map((principle, i) => (
            <div
              key={i}
              className="cwpc-principle-card"
              style={{
                background: '#232329',
                border: `1px solid ${principle.color}25`,
                borderTop: `3px solid ${principle.color}`,
                borderRadius: '0 0 16px 16px',
                padding: '32px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px',
                }}
              >
                <span style={{ fontSize: '32px' }}>{principle.icon}</span>
                <span
                  style={{
                    fontSize: '48px',
                    fontWeight: 900,
                    color: `${principle.color}20`,
                    fontFamily: 'monospace',
                    lineHeight: 1,
                  }}
                >
                  {principle.number}
                </span>
              </div>
              <div
                style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#F5F5F7',
                  marginBottom: '12px',
                  lineHeight: 1.3,
                }}
              >
                {principle.title}
              </div>
              <div style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: 1.7 }}>{principle.body}</div>
            </div>
          ))}
        </div>
      </div>
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          THE PROBLEM
        </p>
        <h2 style={sectionHeading}>What we found when we looked</h2>
        <p style={bodyText}>
          Before writing a single token, I spent two weeks doing something uncomfortable: auditing
          every pixel of the existing CWPC product. What I found wasn&apos;t a design system that
          needed updating. It was evidence that no system had ever existed at all.
        </p>
        <div style={{ marginBottom: '32px' }}>
          <E.NotificationBar
            message="⚠ High wildfire risk detected in your area. Check your Community Scorecard immediately."
            variant="warning"
            dismissible
          />
        </div>
        <div
          className="cwpc-grid-3"
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
          className="cwpc-grid-3"
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
          className="cwpc-grid-3"
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
        <div hidden style={{ marginBottom: '80px' }}>
          <p
            style={{
              fontSize: '11px',
              color: '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            FIGMA AUDIT: BEFORE STATE
          </p>
          <E.PlaceholderImage
            label="UI Audit: Before Prism"
            height={screenshotHeight}
            note="Replace with: Screenshot from Figma showing 5 inconsistent button styles found across CWPC products"
          />
        </div>
      </div>
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          THE DECISION
        </p>
        <h2 style={sectionHeading}>My Journey</h2>
        <div style={{ position: 'relative', marginBottom: '48px' }}>
          <div
            style={{
              position: 'absolute',
              left: '15px',
              top: '8px',
              bottom: '8px',
              width: '2px',
              background: 'linear-gradient(to bottom, #FF6701, rgba(255,103,1,0.1))',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              {
                date: '2025 Q1',
                title: '🔍 Product Audit',
                points: ['Found 5 button styles', '47 raw color values', '9 typography scales'],
                highlight: 'Evidence that a DS was critical',
                color: '#FF6701',
              },
              {
                date: '2025 Q1',
                title: '🏗️ Token Architecture',
                points: ['Color system', 'Spacing scale', 'Typography tokens'],
                highlight: 'Foundation before components',
                color: '#FFAC0D',
              },
              {
                date: '2025 Q2',
                title: '⚛️ Atoms, 17 components',
                points: ['Button, Label, Field', 'Badge, Avatar, Rating', 'All states documented'],
                highlight: 'Smallest pieces first',
                color: '#FF6701',
              },
              {
                date: '2025 Q2',
                title: '🧬 Molecules, 26 components',
                points: ['Input, Checkbox, Switch', 'ProgressBar, TabBar', 'All interactive'],
                highlight: 'Atoms working together',
                color: '#0D72FF',
              },
              {
                date: '2025 Q3',
                title: '🏛️ Organisms, 20 components',
                points: ['Navbar, Card, Forms', 'Modal, Toast, Alert', 'Full page patterns'],
                highlight: 'Complete UI sections',
                color: '#65A637',
              },
              {
                date: '2025 Q4',
                title: '✨ Prism Docs Site',
                points: ['Storybook-style docs', 'Interactive controls', '68 components live'],
                highlight: 'The system ships',
                color: '#FF6701',
              },
            ].map((phase, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '24px',
                  paddingLeft: '0',
                  paddingBottom: i < 5 ? '0' : '0',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: `${phase.color}20`,
                      border: `2px solid ${phase.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      zIndex: 1,
                      position: 'relative',
                    }}
                  >
                    {phase.title.split(' ')[0]}
                  </div>
                  {i < 5 ? (
                    <div
                      style={{
                        width: '2px',
                        flex: 1,
                        minHeight: '32px',
                        background: 'rgba(255,255,255,0.06)',
                        margin: '4px 0',
                      }}
                    />
                  ) : null}
                </div>

                <div style={{ flex: 1, minWidth: 0, paddingBottom: '32px' }}>
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#71717A',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                      fontWeight: 600,
                    }}
                  >
                    {phase.date}
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#F5F5F7',
                      marginBottom: '12px',
                    }}
                  >
                    {phase.title.slice(2).trim()}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      marginBottom: '12px',
                    }}
                  >
                    {phase.points.map((p, j) => (
                      <div
                        key={j}
                        style={{
                          fontSize: '13px',
                          color: '#A1A1AA',
                          display: 'flex',
                          gap: '8px',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: phase.color,
                            flexShrink: 0,
                          }}
                        />
                        {p}
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '5px 12px',
                      background: `${phase.color}12`,
                      border: `1px solid ${phase.color}30`,
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: phase.color,
                      fontWeight: 600,
                    }}
                  >
                    {phase.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
          <p
            style={{
              fontSize: '11px',
              color: '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            FIGMA FILE STRUCTURE
          </p>
          <div
            className="cwpc-grid-2"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            }}
          >
            {[
              { src: '/cwpc/responsive.png', alt: 'Responsive breakpoints in Figma' },
              { src: '/cwpc/mapped.png', alt: 'Mapped token structure in Figma' },
              { src: '/cwpc/alias.png', alt: 'Alias tokens in Figma' },
              { src: '/cwpc/brand.png', alt: 'Brand color tokens in Figma' },
            ].map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                style={{
                  width: '100%',
                  minHeight: screenshotHeight,
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
        <div
          className="cwpc-grid-2"
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
      </div>
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          METHODOLOGY
        </p>
        <h2 style={sectionHeading}>Building from the smallest possible piece</h2>
        <p style={bodyText}>
          I could have started building components immediately. Instead I spent the first week
          asking one question: what is the smallest possible piece? Atomic Design gave me the
          answer. Start with atoms, things that cannot be broken down further. Then combine them.
          This sounds obvious until you realize most design systems skip this step and end up with
          200 components that share nothing in common.
        </p>
        <div
          className="cwpc-grid-3"
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
        <div hidden style={{ marginBottom: '32px' }}>
          <p
            style={{
              fontSize: '11px',
              color: '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            ATOMIC DESIGN DIAGRAM
          </p>
          <E.PlaceholderImage
            label="Atomic Design Diagram"
            height={screenshotHeight}
            note="Replace with: Figma diagram showing Atom → Molecule → Organism hierarchy"
          />
        </div>
        <div
          className="cwpc-live-showcase"
          style={{
            background: 'linear-gradient(135deg, #1B1B1F 0%, #0F0F12 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '48px',
            marginTop: '40px',
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p
              style={{
                fontSize: '11px',
                color: '#FF6701',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              LIVE COMPONENTS, ACTUALLY RUNNING IN CODE
            </p>
            <p style={{ fontSize: '15px', color: '#71717A', margin: 0 }}>
              The same principle at three levels of complexity, stacked so each layer has room to
              breathe. Click, type, and interact with each.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              width: '100%',
              maxWidth: '100%',
            }}
          >
            <div style={{ width: '100%', minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6701' }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    color: '#FF6701',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Atom
                </span>
                <span style={{ fontSize: '11px', color: '#71717A' }}> no dependencies</span>
              </div>
              <div
                className="cwpc-demo-surface"
                style={{
                  background: 'rgba(255,103,1,0.06)',
                  border: '1px solid rgba(255,103,1,0.15)',
                  borderRadius: '12px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}
              >
                <E.Button label="Download Scorecard" type="default" colorScheme="primary" />
                <E.Button label="Learn More" type="outlined" colorScheme="primary" />
                <E.Button label="Dismiss" type="transparent" colorScheme="primary" />
              </div>
              <p style={{ fontSize: '12px', color: '#71717A', marginTop: '10px', lineHeight: 1.5 }}>
                Button atom, standalone, renders with no parent dependencies
              </p>
            </div>

            <div style={{ width: '100%', minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0D72FF' }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    color: '#0D72FF',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Molecule
                </span>
                <span style={{ fontSize: '11px', color: '#71717A' }}> atoms combined</span>
              </div>
              <div
                className="cwpc-demo-surface"
                style={{
                  background: 'rgba(13,114,255,0.06)',
                  border: '1px solid rgba(13,114,255,0.15)',
                  borderRadius: '12px',
                  padding: '28px',
                }}
              >
                <E.Input
                  label="Email address"
                  placeholder="you@example.com"
                  type="email"
                  hint={"We'll send your scorecard here"}
                />
              </div>
              <p style={{ fontSize: '12px', color: '#71717A', marginTop: '10px', lineHeight: 1.5 }}>
                Input molecule, Label atom + Field atom + hint Text atom
              </p>
            </div>

            <div style={{ width: '100%', minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#65A637' }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    color: '#65A637',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Organism
                </span>
                <span style={{ fontSize: '11px', color: '#71717A' }}> complete section</span>
              </div>
              <div
                className="cwpc-demo-surface"
                style={{
                  background: 'rgba(101,166,55,0.06)',
                  border: '1px solid rgba(101,166,55,0.15)',
                  borderRadius: '12px',
                  padding: '28px',
                  overflow: 'hidden',
                  width: '100%',
                  minWidth: 0,
                  boxSizing: 'border-box',
                }}
              >
                <E.Card title="Wildfire Scorecard" titleColor="primary" width="100%">
                  <p
                    style={{
                      color: '#A1A1AA',
                      fontSize: '13px',
                      margin: '0 0 16px',
                      lineHeight: 1.6,
                    }}
                  >
                    Assess your community wildfire risk using the CWPC framework.
                  </p>
                  <E.Button label="View Scorecard" type="default" colorScheme="success" />
                </E.Card>
              </div>
              <p style={{ fontSize: '12px', color: '#71717A', marginTop: '10px', lineHeight: 1.5 }}>
                Card organism, built from Button atoms + Text atoms
              </p>
            </div>
          </div>
        </div>
      </div>
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          FOUNDATIONS
        </p>
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
          <p style={{ fontSize: '11px', color: '#71717A', marginTop: '4px' }}>← Scroll to see more →</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{ fontSize: '13px', fontWeight: 600, color: '#F5F5F7', marginBottom: '16px' }}
          >
            Color Token System
          </div>
          <div
            className="cwpc-grid-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
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
                          borderRadius: '8px',
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
            ].map((s, i) => {
              const barMax = Math.min(s.px * 2.5, 320);
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      color: '#71717A',
                      width: '130px',
                      flexShrink: 0,
                      maxWidth: '100%',
                    }}
                  >
                    {s.token}
                  </div>
                  <div style={{ flex: '1 1 80px', minWidth: 0, maxWidth: '100%' }}>
                    <div
                      style={{
                        height: '8px',
                        width: '100%',
                        maxWidth: `${barMax}px`,
                        background: '#FF6701',
                        borderRadius: '100px',
                        minWidth: '4px',
                      }}
                    />
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#A1A1AA' }}>
                    {s.px}px
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div
            style={{ fontSize: '13px', fontWeight: 600, color: '#F5F5F7', marginBottom: '16px' }}
          >
            Typography Scale: Work Sans
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
                  gap: '12px',
                  flexWrap: 'wrap',
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
                  className="cwpc-typography-sample"
                  style={{
                    fontSize: `clamp(12px, ${(t.size / 4.5).toFixed(2)}vw, ${t.size}px)`,
                    color: t.color,
                    fontFamily: 'inherit',
                    lineHeight: 1.2,
                    flex: '1 1 200px',
                    minWidth: 0,
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                  }}
                >
                  {t.sample}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          ATOMS: 17 COMPONENTS
        </p>
        <h2 style={sectionHeading}>The raw materials</h2>
        <p style={bodyText}>
          17 atoms form the foundation of Prism. Each fully documented with interactive controls,
          all states, code examples, props, Do&apos;s and Don&apos;ts, and accessibility notes.
        </p>
        <div
          className="cwpc-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '32px',
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              minWidth: 0,
            }}
          >
            <p
              style={{
                fontSize: '11px',
                color: '#71717A',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
                marginBottom: '12px',
                flexShrink: 0,
              }}
            >
              FIGMA: BUTTON COMPONENT
            </p>
            <div
              className="cwpc-grid-2"
              style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
                gap: '12px',
                minHeight: figmaAtomPairMinHeight,
              }}
            >
              {[
                { src: '/cwpc/Button1.png', alt: 'Button component in Figma — view 1' },
                { src: '/cwpc/Button2.png', alt: 'Button component in Figma — view 2' },
                { src: '/cwpc/Button3.png', alt: 'Button component in Figma — view 3' },
                { src: '/cwpc/Button4.png', alt: 'Button component in Figma — view 4' },
                { src: '/cwpc/Button5.png', alt: 'Button component in Figma — view 5' },
              ].map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 0,
                    minWidth: 0,
                    display: 'block',
                    objectFit: 'contain',
                  }}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              minWidth: 0,
            }}
          >
            <p
              style={{
                fontSize: '11px',
                color: '#71717A',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
                marginBottom: '12px',
                flexShrink: 0,
              }}
            >
              FIGMA: INPUT COMPONENT
            </p>
            <img
              src="/cwpc/Input.png"
              alt="Input component in Figma"
              style={{
                flex: 1,
                width: '100%',
                minHeight: figmaAtomPairMinHeight,
                minWidth: 0,
                display: 'block',
                objectFit: 'contain',
              }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <p
          style={{
            fontSize: '12px',
            color: '#71717A',
            fontStyle: 'italic',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          Designed in Figma. Running live in code below.
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
        <div className="cwpc-table-scroll" style={{ marginBottom: '32px', overflowX: 'auto' }}>
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
            Button States Matrix: live components
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
        <p style={{ fontSize: '11px', color: '#71717A', marginTop: '4px' }}>← Scroll to see more →</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}>
          <div className="cwpc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div
              className="cwpc-demo-surface"
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  color: '#71717A',
                  fontWeight: 700,
                  marginBottom: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Badge, 6 semantic variants
              </p>
              <p style={{ fontSize: '12px', color: '#71717A', marginBottom: '12px' }}>Medium</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {(['primary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((v) => (
                  <E.Badge key={v} label={v} variant={v} size="md" />
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#71717A', marginBottom: '12px' }}>Small</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(['primary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((v) => (
                  <E.Badge key={`${v}-sm`} label={v} variant={v} size="sm" />
                ))}
              </div>
            </div>

            <div
              className="cwpc-demo-surface"
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  color: '#71717A',
                  fontWeight: 700,
                  marginBottom: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Avatar, 5 sizes + status indicators
              </p>
              <p style={{ fontSize: '12px', color: '#71717A', marginBottom: '12px' }}>Sizes</p>
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                }}
              >
                {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                  <E.Avatar key={size} name="Hrithik Sanyal" size={size} />
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#71717A', marginBottom: '12px' }}>With status</p>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <E.Avatar name="Jane Smith" size="md" status="online" />
                <span style={{ fontSize: '12px', color: '#65A637' }}>online</span>
                <E.Avatar name="Alex Chen" size="md" status="away" />
                <span style={{ fontSize: '12px', color: '#FFAC0D' }}>away</span>
                <E.Avatar name="Maria Garcia" size="md" status="offline" />
                <span style={{ fontSize: '12px', color: '#8D8D8D' }}>offline</span>
              </div>
            </div>
          </div>

          <div className="cwpc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div
              className="cwpc-demo-surface"
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  color: '#71717A',
                  fontWeight: 700,
                  marginBottom: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Loader, pure CSS animation
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '28px',
                  alignItems: 'center',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <E.Loader size="lg" variant="primary" />
                  <span style={{ fontSize: '10px', color: '#71717A' }}>large</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <E.Loader size="md" variant="primary" />
                  <span style={{ fontSize: '10px', color: '#71717A' }}>medium</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <E.Loader size="sm" variant="primary" />
                  <span style={{ fontSize: '10px', color: '#71717A' }}>small</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <E.Loader size="md" variant="primary" />
                <E.Loader size="md" variant="success" />
                <E.Loader size="md" variant="info" />
                <span style={{ fontSize: '12px', color: '#71717A', marginLeft: '4px' }}>
                  3 color variants
                </span>
              </div>
            </div>

            <RatingDemo />
          </div>

          <div className="cwpc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <TagDemo />
            <SkeletonDemo />
          </div>

          <div className="cwpc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <MapPinDemo />
            <div
              className="cwpc-demo-surface"
              style={{
                background: '#232329',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  color: '#71717A',
                  fontWeight: 700,
                  marginBottom: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Heading, 4 levels
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { level: 'H1', size: '32px', text: 'Prevent Wildfires', color: '#FF6701' },
                  { level: 'H2', size: '26px', text: 'Community Scorecard', color: '#F5F5F7' },
                  { level: 'H3', size: '20px', text: 'Risk Assessment', color: '#F5F5F7' },
                  { level: 'H4', size: '16px', text: 'Design System', color: '#A1A1AA' },
                ].map((h, i) => {
                  const sizePx = parseInt(h.size, 10);
                  const fluidHeading = `clamp(11px, ${(sizePx / 4.5).toFixed(2)}vw, ${h.size})`;
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '14px',
                        flexWrap: 'wrap',
                        padding: '8px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '10px',
                          color: '#71717A',
                          width: '24px',
                          flexShrink: 0,
                        }}
                      >
                        {h.level}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          color: '#71717A',
                          fontFamily: 'monospace',
                          width: '36px',
                          flexShrink: 0,
                        }}
                      >
                        {h.size}
                      </span>
                      <span
                        style={{
                          fontSize: fluidHeading,
                          fontWeight: 700,
                          color: h.color,
                          lineHeight: 1.1,
                          flex: '1 1 140px',
                          minWidth: 0,
                          overflowWrap: 'break-word',
                        }}
                      >
                        {h.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          MOLECULES: 26 COMPONENTS
        </p>
        <h2 style={sectionHeading}>Atoms working together</h2>
        <p style={bodyText}>
          Molecules are where atoms start working as a team. The Input molecule combines Label +
          Field + hint Text into one complete unit that handles every state consistently.
        </p>
        <div
          className="cwpc-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            marginTop: '32px',
            minWidth: 0,
          }}
        >
          <InputStateDemo />
          <TabBarDemo />
          <StepperDemo />
          <div
            className="cwpc-molecule-demo"
            style={{
              background: '#232329',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '24px',
              minWidth: 0,
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
              ProgressBar: 5 variants
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
          className="cwpc-grid-4"
          style={{
            marginTop: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            minWidth: 0,
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
        <div
          className="cwpc-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            marginTop: '24px',
            minWidth: 0,
          }}
        >
          <CheckboxGroupDemo />
          <SwitchDemo />
          <SearchBarDemo />
          <FilterBarDemo />
          <PaginationDemo />
          <div
            className="cwpc-molecule-demo"
            style={{
              background: '#232329',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '24px',
              minWidth: 0,
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
              ButtonGroup: connected mode
            </div>
            <div className="cwpc-button-group-scroll" style={{ marginBottom: '16px' }}>
              <div className="cwpc-button-group-inner" style={{ display: 'flex', width: 'max-content' }}>
                {['All', 'Atoms', 'Molecules', 'Organisms'].map((item, i, arr) => (
                  <button
                    key={item}
                    type="button"
                    style={{
                      padding: '10px 16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      background: i === 0 ? '#FF6701' : 'transparent',
                      color: i === 0 ? '#000' : '#A1A1AA',
                      border: `1px solid ${i === 0 ? '#FF6701' : 'rgba(255,255,255,0.15)'}`,
                      borderLeft: i > 0 ? 'none' : undefined,
                      borderRadius:
                        i === 0 ? '8px 0 0 8px' : i === arr.length - 1 ? '0 8px 8px 0' : '0',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      flexShrink: 0,
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <E.Button label="Primary" type="default" colorScheme="primary" />
              <E.Button label="Outlined" type="outlined" colorScheme="primary" />
              <E.Button label="Ghost" type="transparent" colorScheme="primary" />
            </div>
          </div>
        </div>
      </div>
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          ORGANISMS: 20 COMPONENTS
        </p>
        <h2 style={sectionHeading}>Page-level patterns</h2>
        <p style={bodyText}>
          Organisms are the complex UI sections that represent meaningful pieces of the CWPC
          product. Built entirely from molecules and atoms, they represent real production-ready
          patterns.
        </p>
        <div style={{ marginBottom: '32px' }}>
          <p
            style={{
              fontSize: '11px',
              color: '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            FIGMA: FORMS ORGANISM
          </p>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                gap: '12px',
                height: screenshotHeight,
                minWidth: 'min(100%, 720px)',
              }}
            >
              {[
                { src: '/cwpc/forms-dialgoue.png', alt: 'Forms dialogue in Figma' },
                { src: '/cwpc/Forms-Dialogues.png', alt: 'Forms dialogues in Figma' },
                { src: '/cwpc/Forms-Dialogues-1.png', alt: 'Forms dialogues variant 1 in Figma' },
                { src: '/cwpc/Forms-Dialogues-2.png', alt: 'Forms dialogues variant 2 in Figma' },
                { src: '/cwpc/Forms.png', alt: 'Forms organism in Figma' },
              ].map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    minWidth: 0,
                    display: 'block',
                    objectFit: 'contain',
                  }}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className="cwpc-navbar-preview min-w-0 max-w-full"
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
            Navbar: actual CWPC navigation
          </div>
          <div
            className="cwpc-navbar-scroll min-w-0"
            style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
          >
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
          <p style={{ fontSize: '11px', color: '#71717A', marginTop: '4px' }}>← Scroll to see more →</p>
        </div>
        <div
          className="cwpc-grid-2"
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
            AccordionItem: click to expand
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
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          DOCUMENTATION
        </p>
        <h2 style={sectionHeading}>Components without docs are just code</h2>
        <p style={bodyText}>
          I built Prism: a full Storybook-style documentation site. Every component has
          interactive controls, per-variant code, props table, Do&apos;s and Don&apos;ts, and
          accessibility notes.
        </p>
        <div
          className="cwpc-grid-2"
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
          className="cwpc-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '11px',
                color: '#71717A',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              PRISM DOCS: INTRODUCTION
            </p>
            <img
              src="/cwpc/homepagee.png"
              alt="Prism docs introduction page"
              style={{
                width: '100%',
                height: screenshotHeight,
                display: 'block',
                objectFit: 'contain',
              }}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <p
              style={{
                fontSize: '11px',
                color: '#71717A',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              PRISM DOCS: BUTTON PAGE
            </p>
            <img
              src="/cwpc/button-page.png"
              alt="Prism docs button page with controls"
              style={{
                width: '100%',
                height: screenshotHeight,
                display: 'block',
                objectFit: 'contain',
              }}
              loading="lazy"
              decoding="async"
            />
          </div>
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
              EXPLORE PRISM
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
                href="https://prism.cwpc.hrithiksanyal.com/docs"
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
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
              >
                Open Prism Docs →
              </a>
              <a
                href="https://prism.cwpc.hrithiksanyal.com"
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
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
              >
                View Component Showcase →
              </a>
              <a
                href="https://prism-cwpc-storybook.pages.dev/"
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
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
              >
                View Storybook →
              </a>
              <a
                href="#"
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
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
              >
                View Figma File
              </a>
            </div>
          </div>
        </div>
      </div>
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          ACCESSIBILITY
        </p>
        <h2 style={sectionHeading}>Designing for the person in the smoke</h2>
        <p style={bodyText}>
          WCAG AA compliance is the baseline below which no Prism component ships. Emergency tools
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
              <div style={{ flex: 1, minWidth: 0 }}>
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
                <div
                  style={{
                    fontSize: '13px',
                    color: '#A1A1AA',
                    lineHeight: 1.6,
                    overflowWrap: 'break-word',
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="cwpc-grid-2"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}
        >
          <div
            className="cwpc-demo-surface"
            style={{
              background: '#232329',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '28px',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: '#71717A',
                fontWeight: 700,
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Keyboard shortcuts, all documented
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { keys: ['Tab'], desc: 'Move focus to next interactive element' },
                { keys: ['Enter', 'Space'], desc: 'Activate button or checkbox' },
                { keys: ['Escape'], desc: 'Close modal, popover, or dropdown' },
                { keys: ['↑', '↓'], desc: 'Navigate menu or list items' },
                { keys: ['←', '→'], desc: 'Switch tabs or move stepper' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    {item.keys.map((k, ki) => (
                      <span
                        key={`${i}-${ki}-${k}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '2px 8px',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '5px',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                          color: '#F5F5F7',
                          minWidth: '24px',
                        }}
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#A1A1AA',
                      flex: '1 1 160px',
                      minWidth: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="cwpc-demo-surface"
            style={{
              background: '#232329',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '28px',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: '#71717A',
                fontWeight: 700,
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              ARIA implementation, actual code
            </p>
            <div
              style={{
                background: '#0F0F12',
                borderRadius: '8px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '11px',
                lineHeight: 2,
                color: '#E4E4E7',
                overflowX: 'auto',
              }}
            >
              <div>
                <span style={{ color: '#71717A' }}>{`<!-- Button -->`}</span>
              </div>
              <div>
                <span style={{ color: '#FF6701' }}>aria-label</span>=
                <span style={{ color: '#65A637' }}>&quot;Download scorecard&quot;</span>
              </div>
              <div>
                <span style={{ color: '#FF6701' }}>aria-disabled</span>=
                <span style={{ color: '#65A637' }}>&quot;true&quot;</span>
              </div>
              <div style={{ marginTop: '8px' }}>
                <span style={{ color: '#71717A' }}>{`<!-- Input -->`}</span>
              </div>
              <div>
                <span style={{ color: '#FF6701' }}>aria-required</span>=
                <span style={{ color: '#65A637' }}>&quot;true&quot;</span>
              </div>
              <div>
                <span style={{ color: '#FF6701' }}>aria-describedby</span>=
                <span style={{ color: '#65A637' }}>&quot;error-msg&quot;</span>
              </div>
              <div style={{ marginTop: '8px' }}>
                <span style={{ color: '#71717A' }}>{`<!-- Alert -->`}</span>
              </div>
              <div>
                <span style={{ color: '#FF6701' }}>role</span>=
                <span style={{ color: '#65A637' }}>&quot;alert&quot;</span>
              </div>
              <div>
                <span style={{ color: '#FF6701' }}>aria-live</span>=
                <span style={{ color: '#65A637' }}>&quot;polite&quot;</span>
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontSize: '11px', color: '#71717A', marginTop: '4px' }}>← Scroll to see more →</p>
        <div hidden style={{ marginBottom: '32px' }}>
          <p
            style={{
              fontSize: '11px',
              color: '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            ACCESSIBILITY: BEFORE / AFTER
          </p>
          <E.PlaceholderImage
            label="Accessibility Before / After Comparison"
            height={screenshotHeight}
            note="Replace with: Side-by-side showing old CWPC element (2.8:1 FAIL) vs new Prism version (4.8:1 PASS)"
          />
        </div>
        <div className="cwpc-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
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
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          DESIGN ↔ CODE
        </p>
        <h2 style={sectionHeading}>The same value, in two places</h2>
        <p style={bodyText}>
          Every visual decision in Figma maps directly to a CSS custom property in code. There is
          no translation layer, no interpretation, no ambiguity.
        </p>
        <div
          className="cwpc-token-pipeline"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr auto 1fr',
            gap: '8px',
            alignItems: 'center',
            marginTop: '32px',
            marginBottom: '32px',
            minWidth: 0,
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
              <div
                key={i}
                className="arrow"
                style={{ color: '#FF6701', fontSize: '20px', fontWeight: 700 }}
              >
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
                  minWidth: 0,
                  maxWidth: '100%',
                  boxSizing: 'border-box',
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
                    overflowWrap: 'anywhere',
                    wordBreak: 'break-word',
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
              tsx, using Prism components in your project
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
          <p style={{ fontSize: '11px', color: '#71717A', marginTop: '4px' }}>← Scroll to see more →</p>
          <p
            style={{
              fontSize: '12px',
              color: '#71717A',
              marginTop: '8px',
              fontStyle: 'italic',
            }}
          >
            Note: The{' '}
            <code
              style={{
                background: 'rgba(255,255,255,0.08)',
                padding: '1px 6px',
                borderRadius: '4px',
                fontSize: '11px',
              }}
            >
              prism/
            </code>{' '}
            folder contains all Prism Design System components
          </p>
        </div>
        <div style={{ marginBottom: '32px' }}>
          <p
            style={{
              fontSize: '11px',
              color: '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            TOKEN FILE: VS CODE
          </p>
          <img
            src="/cwpc/tokens-css.png"
            alt="ember-tokens.css open in VS Code showing CSS custom properties"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F5F7', marginBottom: '16px' }}>
          Component Governance
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              step: '01',
              q: 'Does a similar component exist in Prism?',
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
              yes: 'Build it + add to Prism',
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
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          IMPACT
        </p>
        <h2 style={sectionHeading}>What Prism delivered</h2>
        <div
          className="cwpc-grid-4"
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
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '24px',
          }}
        >
          <a
            href="https://prism.cwpc.hrithiksanyal.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              background: 'rgba(255,103,1,0.1)',
              border: '1px solid rgba(255,103,1,0.25)',
              color: '#FF6701',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            🔥 Live Component Showcase
          </a>
          <a
            href="https://prism-docs.cwpc.hrithiksanyal.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              background: 'rgba(101,166,55,0.1)',
              border: '1px solid rgba(101,166,55,0.25)',
              color: '#65A637',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            📖 Prism Docs Site
          </a>
        </div>
        <p style={bodyText}>
          Beyond the numbers, Prism changed how CWPC builds. Designers no longer debate which
          button to use. Developers no longer guess at spacing values. New features start from
          68 production-ready components. Every screen now works for elderly residents, keyboard
          users, and anyone who needs it most.
        </p>
        <div
          className="cwpc-impact-quote"
          style={{
            position: 'relative',
            padding: '40px 48px',
            background: 'rgba(255,103,1,0.05)',
            border: '1px solid rgba(255,103,1,0.15)',
            borderRadius: '16px',
            marginTop: '40px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '24px',
              fontSize: '120px',
              color: 'rgba(255,103,1,0.1)',
              fontFamily: 'Georgia, serif',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            &quot;
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p
              style={{
                fontSize: 'clamp(17px, 4vw, 22px)',
                fontStyle: 'italic',
                color: '#F5F5F7',
                lineHeight: 1.65,
                marginBottom: '24px',
                fontWeight: 400,
                maxWidth: 'min(680px, 100%)',
              }}
            >
              Building Prism changed how I think about design. Every decision had downstream
              consequences. I learned to design for every screen that will ever exist, not just the
              one in front of me.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <E.Avatar name="Hrithik Sanyal" size="sm" />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#F5F5F7' }}>
                  Hrithik Sanyal
                </div>
                <div style={{ fontSize: '12px', color: '#71717A' }}>
                  Product Designer, Prism Design System
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cwpcSectionDivider}
      <div className="cwpc-section-block" style={sectionGap}>
        <p style={sectionLabel}>
          <span style={sectionLabelAccent} />
          REFLECTIONS
        </p>
        <h2 style={sectionHeading}>What I learned building alone</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
          {[
            {
              emoji: '🏗️',
              title: 'Tokens are the foundation: get them right first',
              body: "I spent time refactoring early components after my initial token naming wasn't scalable. color-orange is wrong. color-primary-default is right: it carries meaning, not just appearance. Spend a full week on token architecture before touching any component.",
            },
            {
              emoji: '📝',
              title: 'Documentation is half the product',
              body: "Beautiful components that no one understands are useless. The props tables, Do's and Don'ts, accessibility notes. These are what make Prism a system rather than a component library.",
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
            Start with a minimal viable system: 10 core components, fully documented, then expand
            based on real usage. I tried to build comprehensively from day one. Better to ship
            something useful than something complete.
          </p>
        </div>
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F5F7', marginBottom: '16px' }}>
            What&apos;s next for Prism
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'Publish as an npm package so CWPC developers can install and import directly',
              'Add dark mode support: the token architecture is already ready for it',
              'Build Figma Code Connect so Figma components link directly to their code counterparts',
              'Add automated accessibility testing to the Prism docs site',
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
    </div>
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
  const { openLightbox } = useLightbox();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const [caseStudyVisible, setCaseStudyVisible] = useState(getInitialCaseStudyVisible);
  const hideBarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const title = 'Prism Design System';
  const company = 'Catastrophic Wildfire Prevention Consortium';
  const subtitle =
    'A production-ready React + TypeScript design system with 68 documented components, 100+ tokens, and a Storybook-style docs site for CWPC emergency tools.';
  const role =
    'End-to-end Design Systems, Component Development, React + TypeScript, Documentation';
  const team = 'Lead Product Designer';
  const when = '2025 – 2026';
  const progressBarColor = '#FF6701';
  const arrowColor = '#FF6701';
  const overview: string | undefined = '';
  const speedReadChallenge =
    'CWPC had no shared design language. Five different button styles across three platforms. Forty-seven raw color values with no naming system. Zero accessibility standards. Emergency tools that people depend on during wildfires were failing the communities they were built to serve.';
  const speedReadProcess =
    "I audited every existing CWPC UI pattern, extracted design tokens from Figma, and built the system bottom-up using Atomic Design principles: 17 atoms first, then 26 molecules, then 20 organisms. I wrote the component library in React with TypeScript and CSS custom properties, then built Prism: a full Storybook-style documentation site with interactive controls, per-component code examples, Do's and Don'ts, and accessibility guidelines.";
  const speedReadTakeaways =
    "Building a design system alone taught me that the hardest part isn't the components: it's the decisions. Every token name, every prop interface, every state has downstream consequences. I learned to think in systems, not screens. Documentation is not an afterthought: it is half the product.";
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
      <EmberStyles />
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
        {/* Paste your header image src path here (must be served from `public/`). */}
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
                      0
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
                    href="https://prism.cwpc.hrithiksanyal.com"
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
                    href="https://prism-docs.cwpc.hrithiksanyal.com/docs"
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
                    href="https://prism-cwpc-storybook.pages.dev/"
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
                <p
                  className="text-[18px] md:text-[20px] leading-[1.8]"
                  style={{ color: '#F5F5F7' }}
                >
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
                    actions={CWPC_PRISM_EXPLORE_ACTIONS}
                  />
                </div>
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
                    <path
                      d="M7 6l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.45"
                    />
                    <path
                      d="M7 10l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.7"
                    />
                    <path
                      d="M7 14l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="1"
                    />
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

export { EmberDesignSystemProject as CWPCProject };
