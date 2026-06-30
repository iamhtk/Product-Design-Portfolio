// ═══════════════════════════════════════════════════════════════════════════
// ✏️  EDIT THIS FILE TO CHANGE YOUR PROJECT
// ═══════════════════════════════════════════════════════════════════════════
// 
// This file contains EVERYTHING for this project - both data AND display!
// Just edit the content below and the website will update automatically.
//
// ═══════════════════════════════════════════════════════════════════════════

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { FooterCreditsRow } from '../FooterAccessibilityLink';
import { createPortal } from 'react-dom';
import {
  ArrowRight,
  Bell,
  ChevronDown,
  Code,
  Copy,
  Database,
  Eye,
  Facebook,
  Figma,
  FileSearch,
  FileText,
  Github,
  Hand,
  Heart,
  Home,
  Instagram,
  Layers,
  Linkedin,
  MessageSquare,
  Navigation,
  PanelLeft,
  RefreshCw,
  Shield,
  Smartphone,
  Sparkles,
  TrendingUp,
  Type,
  Upload,
  Users,
  Youtube,
  Zap,
} from 'lucide-react';
import { ScrollToTop } from '../ScrollToTop';
import { useLightbox } from '../Lightbox';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ExploreMoreSection } from './ExploreMoreSection';
import { getInitialCaseStudyVisible } from './caseStudyRestore';
import { SHOW_PROJECT_OVERVIEW } from './projectConfig';
import { getHeaderIndentMargin, getListIndentMargin } from './indentHelpers';
import { getAlignClass, getBlockAlignClass } from './alignHelpers';
import type { ContentBlock } from './types';
import { CaseStudyStatStrip, type CaseStudyStatStripItem } from './caseStudyNativeBlocks';
import { renderRaseetFinalImage } from './raseetNativeImageBlocks';

/** Resolve list indent level from textBullets block (supports listIndent and legacy indent/indentLevel). */
function getTextBulletsListIndentLevel(
  block: Extract<ContentBlock, { type: 'textBullets' }>
): 0 | 1 | 2 {
  if (block.listIndent !== undefined) return block.listIndent;
  if (block.indentLevel === 2) return 2;
  if (block.indent) return 1;
  return 0;
}

// Convert raseet device sources to mp4 only (to match browser reliability).
function normalizeRaseetVidsSrc(src: string): string {
  if (!src.includes('/raseet/vids/')) return src;
  if (src.endsWith('.webm')) return `${src.slice(0, -5)}.mp4`;
  return src;
}

// Shared mobile flag to apply maxWidth/height auto only on <=768px.
let _mobileMql: MediaQueryList | null = null;
let _mobileValue = false;
const _mobileListeners = new Set<(v: boolean) => void>();
function ensureMobileQuery() {
  if (typeof window === 'undefined') return;
  if (_mobileMql) return;

  _mobileMql = window.matchMedia('(max-width: 768px)');
  _mobileValue = _mobileMql.matches;

  const handler = () => {
    _mobileValue = _mobileMql?.matches ?? false;
    _mobileListeners.forEach((fn) => fn(_mobileValue));
  };

  if (typeof _mobileMql.addEventListener === 'function') {
    _mobileMql.addEventListener('change', handler);
  } else {
    // Safari fallback.
    // eslint-disable-next-line deprecation/deprecation
    _mobileMql.addListener(handler);
  }
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    ensureMobileQuery();
    setIsMobile(_mobileValue);

    const fn = (v: boolean) => setIsMobile(v);
    _mobileListeners.add(fn);
    return () => {
      _mobileListeners.delete(fn);
    };
  }, []);

  return isMobile;
}

/** Looping video: IO triggers load/play once; then loops without pause-on-scroll. */
function LoopingVideo({
  src,
  className,
  style,
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);
  const normalizedSrc = normalizeRaseetVidsSrc(src);
  const isMobile = useIsMobile();

  useEffect(() => {
    startedRef.current = false;
    const el = videoRef.current;
    if (!el) return;

    let obs: IntersectionObserver | null = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        el.muted = true;
        if (el.readyState < 2) el.load();
        el.play().catch(() => {});
        obs?.disconnect();
        obs = null;
      },
      { threshold: 0.01, rootMargin: '300px' }
    );
    obs.observe(el);
    return () => {
      obs?.disconnect();
    };
  }, [normalizedSrc]);

  const mobileInlineStyle: React.CSSProperties | undefined = isMobile
    ? { maxWidth: '100%', height: 'auto' }
    : undefined;

  return (
    <video
      ref={videoRef}
      src={normalizedSrc}
      className={className}
      style={mobileInlineStyle ? { ...style, ...mobileInlineStyle } : style}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label="Looping video"
    >
      <source src={normalizedSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

function SyncedLoopingVideoRow({
  videos,
  columnsClassName,
  itemClassName,
  videoClassName,
}: {
  videos: { src: string; style?: React.CSSProperties }[];
  columnsClassName: string;
  itemClassName?: string;
  videoClassName?: string;
}) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    hasTriggeredRef.current = false;
    refs.current = refs.current.slice(0, videos.length);
    const elements = refs.current.filter(Boolean) as HTMLVideoElement[];
    if (elements.length === 0) return;

    const loaded = new Set<number>();
    const tryStartTogether = () => {
      if (!hasTriggeredRef.current) return;
      if (loaded.size !== videos.length) return;
      elements.forEach((el) => {
        el.muted = true;
      });
      elements.forEach((el) => {
        el.play().catch(() => {});
      });
    };

    const handlers = elements.map((el, idx) => {
      const onLoaded = () => {
        loaded.add(idx);
        tryStartTogether();
      };
      el.addEventListener('loadeddata', onLoaded);
      if (el.readyState >= 2) {
        loaded.add(idx);
      }
      return { el, onLoaded };
    });

    const node = containerRef.current;
    if (!node) {
      return () => {
        handlers.forEach(({ el, onLoaded }) => {
          el.removeEventListener('loadeddata', onLoaded);
        });
      };
    }

    let obs: IntersectionObserver | null = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasTriggeredRef.current) return;
        hasTriggeredRef.current = true;
        elements.forEach((el) => {
          if (el.readyState < 2) el.load();
        });
        tryStartTogether();
        obs?.disconnect();
        obs = null;
      },
      { threshold: 0.01, rootMargin: '300px' }
    );
    obs.observe(node);

    return () => {
      obs?.disconnect();
      handlers.forEach(({ el, onLoaded }) => {
        el.removeEventListener('loadeddata', onLoaded);
      });
    };
  }, [videos, videos.length]);

  return (
    <div ref={containerRef} className={columnsClassName}>
      {videos.map((video, index) => (
        <div key={`${video.src}-${index}`} className={itemClassName ?? 'w-full flex justify-start'}>
          <video
            ref={(el) => {
              refs.current[index] = el;
            }}
            src={normalizeRaseetVidsSrc(video.src)}
            className={videoClassName ?? 'w-full h-auto max-w-full'}
            style={
              isMobile ? { ...video.style, maxWidth: '100%', height: 'auto' } : video.style
            }
            loop
            muted
            playsInline
            autoPlay
            preload="none"
            aria-label="Looping video"
          >
            <source src={normalizeRaseetVidsSrc(video.src)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}

/** Row3 triplets where all videos are under /raseet/vids/ and none are iPad demos, uniform iPhone grid; skip per-video maxHeight so row md:h-[500px] controls height. */
function isRaseetIphoneOnlyRow3Triplet(a: { src: string }, b: { src: string }, c: { src: string }) {
  const paths = [a.src, b.src, c.src];
  return (
    paths.every((p) => p.includes('/raseet/vids/')) &&
    !paths.some((p) => p.includes('PP-demo') || p.includes('HP-demo'))
  );
}

/*
function SyncedLoopingVideoMosaic({
  iphoneVideos,
  ipadVideos,
}: {
  iphoneVideos: { src: string; style?: React.CSSProperties }[];
  ipadVideos: { src: string; style?: React.CSSProperties }[];
}) {
  const videos = [...iphoneVideos, ...ipadVideos];
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    hasTriggeredRef.current = false;
    refs.current = refs.current.slice(0, videos.length);
    const elements = refs.current.filter(Boolean) as HTMLVideoElement[];
    if (elements.length === 0) return;

    const loaded = new Set<number>();
    const tryStartTogether = () => {
      if (!hasTriggeredRef.current) return;
      if (loaded.size !== videos.length) return;
      elements.forEach((el) => {
        el.muted = true;
      });
      elements.forEach((el) => {
        el.play().catch(() => {});
      });
    };

    const handlers = elements.map((el, idx) => {
      const onLoaded = () => {
        loaded.add(idx);
        tryStartTogether();
      };
      el.addEventListener('loadeddata', onLoaded);
      if (el.readyState >= 2) loaded.add(idx);
      return { el, onLoaded };
    });

    const node = containerRef.current;
    if (!node) {
      return () => {
        handlers.forEach(({ el, onLoaded }) => {
          el.removeEventListener('loadeddata', onLoaded);
        });
      };
    }

    let obs: IntersectionObserver | null = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasTriggeredRef.current) return;
        hasTriggeredRef.current = true;
        elements.forEach((el) => {
          if (el.readyState < 2) el.load();
        });
        tryStartTogether();
        obs?.disconnect();
        obs = null;
      },
      { threshold: 0.01, rootMargin: '300px' }
    );
    obs.observe(node);

    return () => {
      obs?.disconnect();
      handlers.forEach(({ el, onLoaded }) => {
        el.removeEventListener('loadeddata', onLoaded);
      });
    };
  }, [videos, videos.length]);

  const renderVideo = (video: { src: string; style?: React.CSSProperties }, idx: number) => (
    <video
      key={`${video.src}-${idx}`}
      ref={(el) => {
        refs.current[idx] = el;
      }}
      src={normalizeRaseetVidsSrc(video.src)}
      className="w-full h-auto max-w-full"
      style={isMobile ? { ...video.style, maxWidth: '100%', height: 'auto' } : video.style}
      loop
      muted
      playsInline
      autoPlay
      preload="none"
      aria-label="Looping video"
    >
      <source src={normalizeRaseetVidsSrc(video.src)} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );

  return (
    <div ref={containerRef} className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      <div className="flex flex-col gap-6 flex-1 min-w-0">
        {ipadVideos.map((video, idx) => (
          <div key={`ipad-${video.src}-${idx}`} className="w-full flex justify-start">
            {renderVideo(video, iphoneVideos.length + idx)}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-3 items-start self-start md:self-center flex-1 min-w-0">
        {iphoneVideos.map((video, idx) => (
          <div key={`iphone-${video.src}-${idx}`} className="w-1/2 flex justify-start">
            {renderVideo(video, idx)}
          </div>
        ))}
      </div>
    </div>
  );
}
*/

const COYAX_STONE = '#78716c';

const COYAX_CS_DIVIDER = (
  <hr
    className="coyax-cs-divider"
    style={{ border: 'none', borderTop: '1px solid #f5f5f4', margin: '0' }}
  />
);

const COYAX_HERO_STAT_STRIP_ITEMS: CaseStudyStatStripItem[] = [
  {
    Icon: Layers,
    label: 'Audit files produced',
    labelDetail: '',
    top: '',
    countEnd: 13,
    prefix: '',
    suffix: '',
  },
  {
    Icon: Layers,
    label: 'Libraries unified',
    labelDetail: '',
    top: '',
    countEnd: 2,
    prefix: '',
    suffix: '',
  },
  {
    Icon: Layers,
    label: 'Faster handoff',
    labelDetail: '',
    top: '',
    countEnd: 40,
    prefix: '',
    suffix: '%',
  },
];

function CoyaxCaseStudyFigure({
  src,
  alt,
  caption,
  maxHeight,
}: {
  src: string;
  alt: string;
  caption: string;
  maxHeight?: string;
}) {
  const isSidebarScreenshot = src.includes('sidebar-component.png') || src.includes('sidebarr.png');
  const mediaStyle = isSidebarScreenshot
    ? {
        width: '100%',
        maxWidth: '100%',
        maxHeight: 380,
        display: 'block',
        border: '1px solid #e7e5e4',
        borderRadius: 8,
        objectFit: 'cover' as const,
        objectPosition: 'top',
      }
    : maxHeight
      ? { maxHeight, objectFit: 'contain' as const }
      : undefined;
  return (
    <div style={COYAX_STACK}>
      <div className={isSidebarScreenshot ? 'w-full' : 'w-full flex justify-start'}>
        <ImageWithFallback
          src={src}
          alt={alt}
          className={isSidebarScreenshot ? 'w-full' : 'h-auto max-w-full w-auto object-contain rounded-lg'}
          style={mediaStyle}
        />
      </div>
      <p className="text-[13px] text-gray-500 m-0">{caption}</p>
    </div>
  );
}

const COYAX_IMPACT_STATS_ITEMS: CaseStudyStatStripItem[] = [
  {
    Icon: FileSearch,
    label: 'Audit files, zero assumptions',
    labelDetail: '',
    top: '',
    countEnd: 13,
    prefix: '',
    suffix: '',
  },
  {
    Icon: Layers,
    label: 'Libraries unified into one system',
    labelDetail: '',
    top: '',
    countEnd: 2,
    prefix: '',
    suffix: '',
  },
  {
    Icon: Zap,
    label: 'Faster design to engineering handoff',
    labelDetail: '',
    top: '',
    countEnd: 40,
    prefix: '',
    suffix: '%',
  },
];

const STONE_SWATCHES = [
  { hex: '#fafaf9', token: 'stone-50' },
  { hex: '#f5f5f4', token: 'stone-100' },
  { hex: '#e7e5e4', token: 'stone-200' },
  { hex: '#d6d3d1', token: 'stone-300' },
  { hex: '#a8a29e', token: 'stone-400' },
  { hex: '#78716c', token: 'stone-500' },
  { hex: '#57534e', token: 'stone-600' },
  { hex: '#44403c', token: 'stone-700' },
  { hex: '#292524', token: 'stone-800' },
  { hex: '#1c1917', token: 'stone-900' },
] as const;

const ZINC_SWATCHES = [
  { hex: '#fafafa', token: 'zinc-50' },
  { hex: '#f4f4f5', token: 'zinc-100' },
  { hex: '#e4e4e7', token: 'zinc-200' },
  { hex: '#d4d4d8', token: 'zinc-300' },
  { hex: '#a1a1aa', token: 'zinc-400' },
  { hex: '#71717a', token: 'zinc-500' },
  { hex: '#52525b', token: 'zinc-600' },
  { hex: '#3f3f46', token: 'zinc-700' },
  { hex: '#27272a', token: 'zinc-800' },
  { hex: '#18181b', token: 'zinc-900' },
] as const;

const COYAX_CHALLENGE_CARDS = [
  {
    number: '01',
    title: 'Two neutral palettes',
    body: 'Mantine used stone. shadcn used zinc. Both present in the codebase with no rules for which owned what. Colors chosen by feel rather than by system.',
  },
  {
    number: '02',
    title: 'No tokens in Figma',
    body: 'Without tokens every design was a guess about what the engineers had actually built. Values that looked right in Figma did not exist in the product.',
  },
  {
    number: '03',
    title: 'No source of truth',
    body: 'Components built independently across two libraries with no documentation. Every new screen was a negotiation with no winner.',
  },
] as const;

const COYAX_KEY_DECISIONS = [
  {
    number: '01',
    title: '13px base font size',
    body: "Matched the engineering team's custom Tailwind override. Not Tailwind's default 16px.",
  },
  {
    number: '02',
    title: 'Stone not zinc as primary neutral',
    body: 'Stone is the Mantine palette override. Zinc handles shadcn tokens only.',
  },
  {
    number: '03',
    title: 'Seven border radius values only',
    body: 'Exactly what existed in the codebase. No additions.',
  },
  {
    number: '04',
    title: 'Five shadow levels',
    body: 'sm, default, md, lg, drop-shadow. Matching the codebase exactly.',
  },
  {
    number: '05',
    title: 'Seven functional colors only',
    body: 'Amber, sky, teal, red, blue, emerald, orange. No purple, pink, or lime in product UI.',
  },
] as const;

const COYAX_FIGMA_TABS = [
  'Colors',
  'Typography',
  'Spacing and Radius',
  'Grid and Layout',
  'Components',
  'Patterns',
  'Icons',
  'Motion',
  'Explorations',
  'Screen Designs',
  'Changelog',
] as const;

const COYAX_VARIABLE_TIERS = [
  {
    id: 'primitives',
    title: 'Primitives',
    subtitle: 'Raw color values. All scales.',
    examples: ['stone', 'zinc', 'blue', 'green', 'red', 'amber', 'orange', 'purple', 'teal'],
  },
  {
    id: 'semantic',
    title: 'Semantic',
    subtitle: 'References primitives. Never hardcodes hex.',
    examples: ['background → stone-0', 'foreground → stone-9', 'border → zinc-200'],
  },
  {
    id: 'component',
    title: 'Component',
    subtitle: 'Tokens applied to components.',
    examples: ['button-bg → semantic/primary', 'input-border → semantic/border'],
  },
] as const;

import {
  COYAX_ATOMIC_LAYER_EXPLAINERS,
  COYAX_ATOMIC_LAYER_FILTERS,
  COYAX_COMPONENT_DEMOS,
  COYAX_COMPONENT_SHOWCASE_FILTERS,
  COYAX_DEMO_COLORS,
  type CoyaxAtomicLayer,
  type CoyaxComponentFilter,
  type CoyaxShowcaseView,
} from './coyaxShowcaseDemos';

const COYAX_SHOWCASE_STATS_ITEMS: CaseStudyStatStripItem[] = [
  {
    Icon: Layers,
    label: 'Components in the library',
    labelDetail: '',
    top: '',
    countEnd: 68,
    prefix: '',
    suffix: '',
  },
  {
    Icon: Layers,
    label: 'Audit files the system is built from',
    labelDetail: '',
    top: '',
    countEnd: 13,
    prefix: '',
    suffix: '',
  },
  {
    Icon: Layers,
    label: 'Tokens reference primitives',
    labelDetail: '',
    top: '',
    countEnd: 100,
    prefix: '',
    suffix: '%',
  },
];

const COYAX_MAJOR_SECTION_PAD = { paddingTop: 64, paddingBottom: 64 } as const;
const COYAX_SECTION_PAD_48 = { paddingTop: 48, paddingBottom: 48 } as const;
const COYAX_CONTENT_GAP = 24;
const COYAX_SECTION_INNER_GAP = 32;

const COYAX_STACK: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: COYAX_CONTENT_GAP,
};

const COYAX_STACK_LG: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: COYAX_SECTION_INNER_GAP,
};

const COYAX_CASE_STUDY_CARD: CSSProperties = {
  background: '#fafaf9',
  border: '1px solid #e7e5e4',
  borderRadius: 10,
  padding: '24px',
  height: '100%',
};

function CoyaxCaseStudyCard({
  number,
  title,
  body,
  style,
}: {
  number?: string;
  title: string;
  body: string;
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...COYAX_CASE_STUDY_CARD, ...style }}>
      {number ? (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 28,
            height: 28,
            padding: '0 8px',
            borderRadius: 6,
            background: 'rgba(120, 113, 108, 0.1)',
            border: `1px solid ${COYAX_STONE}`,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: COYAX_STONE,
            marginBottom: 14,
          }}
        >
          {number}
        </span>
      ) : null}
      <p className="text-[16px] font-bold text-gray-900 m-0 mb-2">{title}</p>
      <p className="text-[14px] leading-relaxed text-gray-600 m-0">{body}</p>
    </div>
  );
}

const COYAX_CHIP_BUTTON: CSSProperties = {
  padding: '6px 12px',
  borderRadius: 6,
  fontSize: 12,
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  lineHeight: 1.3,
};

const COYAX_INPUT_FIELD: CSSProperties = {
  padding: '8px 12px',
  fontSize: 13,
  border: '1px solid #d1d5db',
  borderRadius: 6,
  fontFamily: 'inherit',
  lineHeight: 1.4,
};

function CoyaxComponentShowcaseGallery({
  showcaseView,
  componentFilter,
  atomicFilter,
  onShowcaseViewChange,
  onComponentFilterChange,
  onAtomicFilterChange,
}: {
  showcaseView: CoyaxShowcaseView;
  componentFilter: CoyaxComponentFilter;
  atomicFilter: CoyaxAtomicLayer;
  onShowcaseViewChange: (view: CoyaxShowcaseView) => void;
  onComponentFilterChange: (filter: CoyaxComponentFilter) => void;
  onAtomicFilterChange: (filter: CoyaxAtomicLayer) => void;
}) {
  const filteredDemos =
    showcaseView === 'By Category'
      ? componentFilter === 'All'
        ? COYAX_COMPONENT_DEMOS
        : COYAX_COMPONENT_DEMOS.filter((item) => item.category === componentFilter)
      : COYAX_COMPONENT_DEMOS.filter((item) => item.layer === atomicFilter);

  const explainer =
    showcaseView === 'By Atomic Layer' ? COYAX_ATOMIC_LAYER_EXPLAINERS[atomicFilter] : null;

  return (
    <div className="space-y-4">
      <div
        className="coyax-view-toggle"
        style={{
          background: '#f5f5f4',
          borderRadius: 9999,
          padding: 4,
          display: 'inline-flex',
        }}
      >
        {(['By Category', 'By Atomic Layer'] as const).map((view) => (
          <button
            key={view}
            type="button"
            onClick={() => onShowcaseViewChange(view)}
            className="coyax-view-toggle-option"
            style={{
              padding: '5px 16px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: showcaseView === view ? 500 : 400,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              background: showcaseView === view ? '#18181b' : 'transparent',
              color: showcaseView === view ? '#fafaf9' : '#57534e',
            }}
          >
            {view}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2" style={{ marginTop: 16 }}>
        {showcaseView === 'By Category'
          ? COYAX_COMPONENT_SHOWCASE_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => onComponentFilterChange(filter)}
                className="coyax-filter-chip"
                style={{
                  background: componentFilter === filter ? '#18181b' : '#f5f5f4',
                  borderRadius: 6,
                  padding: '6px 12px',
                  fontSize: 12,
                  fontWeight: 500,
                  color: componentFilter === filter ? '#fafaf9' : '#57534e',
                  cursor: 'pointer',
                  border: 'none',
                  fontFamily: 'inherit',
                }}
              >
                {filter}
              </button>
            ))
          : COYAX_ATOMIC_LAYER_FILTERS.filter((f): f is CoyaxAtomicLayer => f !== 'All').map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => onAtomicFilterChange(filter)}
                className="coyax-filter-chip"
                style={{
                  background: atomicFilter === filter ? '#18181b' : '#f5f5f4',
                  borderRadius: 6,
                  padding: '6px 12px',
                  fontSize: 12,
                  fontWeight: 500,
                  color: atomicFilter === filter ? '#fafaf9' : '#57534e',
                  cursor: 'pointer',
                  border: 'none',
                  fontFamily: 'inherit',
                }}
              >
                {filter}
              </button>
            ))}
      </div>
      {explainer ? <p className="text-[11px] text-gray-500 m-0">{explainer}</p> : null}
      <div
        className="coyax-showcase-grid"
      >
        {filteredDemos.map((item, index) => {
          const forceFullRow = item.id === 'sidebar' || item.id === 'modal' || item.id === 'stepper';
          const isLastWithoutPair =
            filteredDemos.length % 2 === 1 && index === filteredDemos.length - 1 && !forceFullRow;
          return (
            <div
              key={item.id}
              className={forceFullRow || isLastWithoutPair ? 'coyax-showcase-span-2 min-w-0' : 'min-w-0'}
              style={item.id === 'input' ? { alignSelf: 'start' } : undefined}
            >
              <item.Demo />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function useCoyaxScrollInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function CoyaxColorSwatchColumn({
  label,
  swatches,
}: {
  label: string;
  swatches: readonly { hex: string; token: string }[];
}) {
  return (
    <div className="flex-1 min-w-0">
      <p className="coyax-cs-label">{label}</p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
        }}
      >
        {swatches.map((swatch) => (
          <div
            key={swatch.token}
            title={swatch.token}
            style={{
              width: 36,
              height: 36,
              borderRadius: 4,
              border: '1px solid rgba(0,0,0,0.06)',
              backgroundColor: swatch.hex,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const COYAX_TOKEN_LOOKUP: {
  name: string;
  hex: string;
  css: string;
  tier: 'primitive' | 'semantic' | 'component';
  usage: string;
}[] = [
  ...STONE_SWATCHES.map((s) => ({
    name: s.token,
    hex: s.hex,
    css: `--color-${s.token}`,
    tier: 'primitive' as const,
    usage: 'Mantine stone palette override',
  })),
  ...ZINC_SWATCHES.map((s) => ({
    name: s.token,
    hex: s.hex,
    css: `--color-${s.token}`,
    tier: 'primitive' as const,
    usage: 'shadcn/ui token layer only',
  })),
  { name: 'semantic/background', hex: '#fafaf9', css: '--background', tier: 'semantic', usage: 'Page and panel surfaces' },
  { name: 'semantic/foreground', hex: '#1c1917', css: '--foreground', tier: 'semantic', usage: 'Primary text' },
  { name: 'semantic/border', hex: '#e4e4e7', css: '--border', tier: 'semantic', usage: 'Dividers and input borders' },
  { name: 'semantic/primary', hex: '#78716c', css: '--primary', tier: 'semantic', usage: 'Primary actions' },
  { name: 'component/button-bg', hex: '#78716c', css: '--button-bg', tier: 'component', usage: 'Button default fill' },
  { name: 'component/input-border', hex: '#e4e4e7', css: '--input-border', tier: 'component', usage: 'Input default border' },
  { name: 'component/sidebar-link-active', hex: '#dedcda', css: '--sidebar-link-bg-active', tier: 'component', usage: 'Active sidebar row' },
];

const COYAX_TYPE_SCALE = [
  { label: 'xs', size: '11px', line: '15.4px', sample: 'Caption / badge' },
  { label: 'sm', size: '12px', line: '16.8px', sample: 'Secondary labels' },
  { label: 'base', size: '13px', line: '18.2px', sample: 'Body, engineering override' },
  { label: 'md', size: '14px', line: '19.6px', sample: 'UI controls' },
  { label: 'lg', size: '16px', line: '22.4px', sample: 'Section headings' },
  { label: 'xl', size: '20px', line: '28px', sample: 'Page titles' },
] as const;

const COYAX_SPACING_SCALE = [
  { token: 'space-1', px: 4 },
  { token: 'space-2', px: 8 },
  { token: 'space-3', px: 12 },
  { token: 'space-4', px: 16 },
  { token: 'space-5', px: 20 },
  { token: 'space-6', px: 24 },
  { token: 'space-8', px: 32 },
  { token: 'space-10', px: 40 },
] as const;

function CoyaxInteractiveBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-[#e7e5e4] bg-[#fafaf9] overflow-hidden">
      <div className="border-b border-[#e7e5e4] bg-white" style={{ padding: '10px 16px' }}>
        <p className="coyax-cs-label" style={{ marginBottom: 0 }}>{title}</p>
      </div>
      <div className="p-4 md:p-5">{children}</div>
    </div>
  );
}

function CoyaxBeforeAfterToggle() {
  const [beforeAfter, setBeforeAfter] = useState<'before' | 'after'>('before');

  const toggleButtonStyle = (active: boolean): CSSProperties => ({
    background: 'none',
    border: 'none',
    borderBottom: active ? '2px solid #0a0a0a' : '2px solid transparent',
    borderRadius: 0,
    padding: '0 0 4px',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    color: active ? '#0a0a0a' : '#a8a29e',
    fontFamily: 'inherit',
  });

  const panelStyle: CSSProperties = {
    background: '#ffffff',
    border: '1px solid #e7e5e4',
    borderRadius: 8,
    padding: '20px 28px 24px 28px',
  };

  const sectionLabelStyle: CSSProperties = {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#a8a29e',
    marginBottom: 16,
    marginTop: 0,
  };

  const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  };

  const engineerLabelStyle: CSSProperties = {
    fontSize: 12,
    color: '#78716c',
  };

  const beforeButtons: CSSProperties[] = [
    {
      background: '#1a1a2e',
      borderRadius: 2,
      padding: '5px 20px',
      fontSize: 14,
      color: '#ffffff',
      fontWeight: 400,
      border: 'none',
      fontFamily: 'inherit',
    },
    {
      background: '#ffffff',
      border: '2px solid #0f3460',
      borderRadius: 12,
      padding: '6px 18px',
      fontSize: 12,
      color: '#0f3460',
      fontWeight: 600,
      fontFamily: 'inherit',
    },
    {
      background: '#533483',
      borderRadius: 0,
      padding: '8px 12px',
      fontSize: 11,
      color: '#ffffff',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      border: 'none',
      fontFamily: 'inherit',
    },
  ];

  const afterButtonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#18181b',
    borderRadius: 6,
    padding: '7px 18px',
    fontSize: 13,
    fontWeight: 500,
    color: '#fafaf9',
    border: 'none',
    fontFamily: 'inherit',
    lineHeight: 1.3,
  };

  return (
    <div className="coyax-before-after-wrap">
      <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
        <button type="button" style={toggleButtonStyle(beforeAfter === 'before')} onClick={() => setBeforeAfter('before')}>
          Before system
        </button>
        <button type="button" style={toggleButtonStyle(beforeAfter === 'after')} onClick={() => setBeforeAfter('after')}>
          After system
        </button>
      </div>
      {beforeAfter === 'before' ? (
        <div key="before-panel" style={panelStyle}>
          <p style={sectionLabelStyle}>Before: no shared system</p>
          {beforeButtons.map((btnStyle, i) => (
            <div key={i} className="coyax-before-after-row" style={rowStyle}>
              <span style={engineerLabelStyle}>{`Engineer ${i + 1}`}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', ...btnStyle }}>Save</span>
            </div>
          ))}
          <p style={{ fontSize: 12, color: '#ef4444', marginTop: 8, marginBottom: 0 }}>
            Same component. Three different implementations. No shared rule.
          </p>
        </div>
      ) : (
        <div key="after-panel" style={panelStyle}>
          <p style={sectionLabelStyle}>After: one design system</p>
          {[1, 2, 3].map((n) => (
            <div key={n} className="coyax-before-after-row" style={rowStyle}>
              <span style={engineerLabelStyle}>{`Engineer ${n}`}</span>
              <span style={afterButtonStyle}>Save</span>
            </div>
          ))}
          <p style={{ fontSize: 12, color: '#22c55e', marginTop: 8, marginBottom: 0 }}>
            Same component. One token. Zero negotiation.
          </p>
        </div>
      )}
    </div>
  );
}

function CoyaxTokenLookupTool() {
  const [query, setQuery] = useState('stone-500');
  const match =
    COYAX_TOKEN_LOOKUP.find((t) => t.name === query) ??
    COYAX_TOKEN_LOOKUP.find((t) => t.name.includes(query.toLowerCase())) ??
    COYAX_TOKEN_LOOKUP[0];

  return (
    <CoyaxInteractiveBlock title="Live Token Lookup">
      <p className="text-[13px] text-gray-600 m-0 mb-4">
        Search any token name from the audit. See the hex value, CSS custom property, and where it lives in the three-tier system.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. stone-500, semantic/border"
          className="flex-1 rounded-md font-mono border border-gray-300"
          style={{ ...COYAX_INPUT_FIELD, flex: 1 }}
        />
        <select
          value={match.name}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-md bg-white min-w-[160px] border border-gray-300"
          style={COYAX_INPUT_FIELD}
        >
          {COYAX_TOKEN_LOOKUP.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-4 items-start rounded-md border border-gray-200 bg-white p-4">
        <div className="w-full h-16 rounded-md border border-black/5" style={{ backgroundColor: match.hex }} />
        <div className="space-y-1.5 font-mono text-[12px]">
          <p className="m-0 text-gray-900">
            <span className="text-gray-400">token </span>
            {match.name}
          </p>
          <p className="m-0 text-gray-700">
            <span className="text-gray-400">hex </span>
            {match.hex}
          </p>
          <p className="m-0 text-gray-700">
            <span className="text-gray-400">css </span>
            {match.css}
          </p>
          <p className="m-0 text-gray-700">
            <span className="text-gray-400">tier </span>
            {match.tier}
          </p>
          <p className="m-0 text-gray-600 font-sans text-[13px] pt-1">{match.usage}</p>
        </div>
      </div>
    </CoyaxInteractiveBlock>
  );
}

function CoyaxFigmaVariablesPanel() {
  const [collection, setCollection] = useState<'Primitives' | 'Semantic' | 'Component'>('Primitives');

  const rows: { name: string; value: string; kind: 'hex' | 'ref' }[] =
    collection === 'Primitives'
      ? [
          { name: 'stone/50', value: '#fafaf9', kind: 'hex' },
          { name: 'stone/500', value: '#78716c', kind: 'hex' },
          { name: 'stone/900', value: '#1c1917', kind: 'hex' },
          { name: 'zinc/200', value: '#e4e4e7', kind: 'hex' },
          { name: 'zinc/500', value: '#71717a', kind: 'hex' },
          { name: 'blue/500', value: '#3b82f6', kind: 'hex' },
          { name: 'blue/600', value: '#2563eb', kind: 'hex' },
          { name: 'red/500', value: '#ef4444', kind: 'hex' },
          { name: 'amber/500', value: '#f59e0b', kind: 'hex' },
          { name: 'green/500', value: '#22c55e', kind: 'hex' },
        ]
      : collection === 'Semantic'
        ? [
            { name: 'background', value: 'stone-0', kind: 'ref' },
            { name: 'foreground', value: 'stone-9', kind: 'ref' },
            { name: 'border', value: 'zinc-200', kind: 'ref' },
            { name: 'muted', value: 'zinc-100', kind: 'ref' },
            { name: 'primary', value: 'blue-600', kind: 'ref' },
            { name: 'destructive', value: 'red-500', kind: 'ref' },
            { name: 'success', value: 'green-500', kind: 'ref' },
            { name: 'warning', value: 'amber-500', kind: 'ref' },
            { name: 'sidebar-bg', value: 'stone-0', kind: 'ref' },
            { name: 'text-muted', value: 'stone-5', kind: 'ref' },
          ]
        : [
            { name: 'button-bg', value: 'semantic/primary', kind: 'ref' },
            { name: 'button-text', value: 'semantic/primary-fg', kind: 'ref' },
            { name: 'input-border', value: 'semantic/border', kind: 'ref' },
            { name: 'input-bg', value: 'semantic/background', kind: 'ref' },
            { name: 'badge-success-bg', value: 'semantic/status-success', kind: 'ref' },
            { name: 'badge-error-bg', value: 'semantic/status-error', kind: 'ref' },
          ];

  return (
    <CoyaxInteractiveBlock title="Figma Variables Panel">
      <p className="text-[13px] text-gray-600 m-0 mb-4">
        Three collections in Figma mirror the codebase. Primitives hold raw values. Semantic and component layers reference up, never hardcode hex.
      </p>
      <div className="coyax-figma-panel-wrap">
        <div className="coyax-figma-panel-sidebar">
          {(['Primitives', 'Semantic', 'Component'] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCollection(c)}
              className="coyax-figma-panel-tab"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '6px 12px',
                fontSize: 12,
                fontWeight: collection === c ? 600 : 400,
                cursor: 'pointer',
                border: 'none',
                fontFamily: 'inherit',
                background: collection === c ? '#f0f0ef' : 'transparent',
                color: collection === c ? '#18181b' : '#78716c',
                borderRadius: collection === c ? 4 : 0,
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, background: '#ffffff', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              padding: '8px 16px',
              background: '#f5f5f4',
              borderBottom: '1px solid #e7e5e4',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#a8a29e',
            }}
          >
            <span style={{ flex: 1 }}>Variable</span>
            <span style={{ flex: 1 }}>Value</span>
          </div>
          {rows.map((row) => (
            <div
              key={row.name}
              style={{
                display: 'flex',
                padding: '8px 16px',
                borderBottom: '1px solid #fafaf9',
                fontSize: 12,
                fontFamily: 'monospace',
              }}
            >
              <span style={{ flex: 1, color: '#44403c' }}>{row.name}</span>
              <span style={{ flex: 1, color: row.kind === 'hex' ? '#78716c' : '#2563eb' }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </CoyaxInteractiveBlock>
  );
}

function CoyaxColorScaleVisual() {
  const [active, setActive] = useState(5);
  const swatch = STONE_SWATCHES[active];
  return (
    <CoyaxInteractiveBlock title="Color Scale Visual">
      <p className="text-[13px] text-gray-600 m-0 mb-4">
        Stone primary neutral. Click any step. Token name and hex from the live audit.
      </p>
      <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-3">
        {STONE_SWATCHES.map((s, i) => (
          <button
            key={s.token}
            type="button"
            onClick={() => setActive(i)}
            className="flex-1 h-12 min-w-0 transition-transform hover:scale-y-110 focus:outline-none"
            style={{
              backgroundColor: s.hex,
              boxShadow: active === i ? `inset 0 0 0 2px ${COYAX_STONE}` : undefined,
            }}
            title={s.token}
            aria-label={s.token}
          />
        ))}
      </div>
      <p className="text-[12px] font-mono text-gray-700 m-0">
        {swatch.token} · {swatch.hex}
      </p>
    </CoyaxInteractiveBlock>
  );
}

function CoyaxTypographySpecimen() {
  return (
    <CoyaxInteractiveBlock title="Typography Specimen">
      <p className="text-[13px] text-gray-600 m-0 mb-4">
        13px base from the engineering Tailwind override, not Tailwind&apos;s default 16px. Inter medium across UI.
      </p>
      <div className="space-y-0 divide-y divide-gray-100">
        {COYAX_TYPE_SCALE.map((row) => (
          <div key={row.label} className="flex items-baseline gap-4 py-4">
            <span className="text-[10px] font-mono text-gray-400 w-10 shrink-0">{row.label}</span>
            <span style={{ fontSize: row.size, lineHeight: row.line }} className="text-gray-900 flex-1 min-w-0">
              {row.sample}
            </span>
            <span className="text-[10px] font-mono text-gray-400 text-right shrink-0 hidden sm:block">
              {row.size} / {row.line}
            </span>
          </div>
        ))}
      </div>
    </CoyaxInteractiveBlock>
  );
}

function CoyaxSpacingVisualizer() {
  const [active, setActive] = useState(3);
  const row = COYAX_SPACING_SCALE[active];
  return (
    <CoyaxInteractiveBlock title="Spacing Visualizer">
      <p className="text-[13px] text-gray-600 m-0 mb-4">
        Spacing tokens from spacing.md. 4px base grid. Every padding and gap value maps to a named token.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {COYAX_SPACING_SCALE.map((s, i) => (
          <button
            key={s.token}
            type="button"
            onClick={() => setActive(i)}
            className="coyax-chip-btn"
            style={{
              ...COYAX_CHIP_BUTTON,
              borderRadius: 4,
              fontSize: 11,
              fontFamily: 'monospace',
              ...(active === i
                ? { backgroundColor: COYAX_STONE, color: '#ffffff' }
                : { backgroundColor: '#f5f5f4', color: '#57534e' }),
            }}
          >
            {s.token}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-gray-900 h-2 rounded-full transition-all duration-300" style={{ width: row.px }} />
        <span className="text-[12px] font-mono text-gray-600">
          {row.token} = {row.px}px
        </span>
      </div>
    </CoyaxInteractiveBlock>
  );
}

function CoyaxWhatThisUnlocks() {
  const items = [
    {
      title: 'One source of truth',
      body: 'Designers and engineers reference the same token names. No more translating hex values at handoff.',
    },
    {
      title: '40% faster handoff',
      body: 'Every Figma variable maps to a real CSS custom property. Implementation surprises dropped sharply after the audit.',
    },
    {
      title: 'Library clarity',
      body: 'Mantine owns structure and stone. shadcn owns scoped zinc tokens. The rule is documented, not tribal knowledge.',
    },
    {
      title: 'Onboarding speed',
      body: 'New engineers read the variable hierarchy and recognize it from the codebase. The system feels familiar on day one.',
    },
  ];
  return (
    <section style={{ ...COYAX_MAJOR_SECTION_PAD, ...COYAX_STACK_LG }}>
      <div style={COYAX_STACK}>
        <p className="coyax-cs-label">WHAT THIS UNLOCKS</p>
        <h2 className="coyax-cs-heading" style={{ marginBottom: 0 }}>
          What became possible once the system existed
        </h2>
      </div>
      <div className="coyax-card-grid coyax-card-grid--2">
        {items.map((item) => (
          <CoyaxCaseStudyCard key={item.title} title={item.title} body={item.body} />
        ))}
      </div>
    </section>
  );
}

// ─── Full-spec interactive sections (after component showcase) ─────────────────

const COYAX_LIVE_TOKEN_ROWS: { token: string; primitive: string; hex: string }[] = [
  { token: 'background', primitive: 'stone-0', hex: '#fafaf9' },
  { token: 'foreground', primitive: 'stone-9', hex: '#1c1917' },
  { token: 'border', primitive: 'zinc-200', hex: '#e4e4e7' },
  { token: 'muted', primitive: 'zinc-100', hex: '#f4f4f5' },
  { token: 'primary', primitive: 'blue-600', hex: '#2563eb' },
  { token: 'destructive', primitive: 'red-500', hex: '#ef4444' },
  { token: 'success', primitive: 'green-500', hex: '#22c55e' },
  { token: 'warning', primitive: 'amber-500', hex: '#f59e0b' },
  { token: 'sidebar-bg', primitive: 'stone-0', hex: '#fafaf9' },
  { token: 'text-muted', primitive: 'stone-5', hex: '#78716c' },
  { token: 'input-border', primitive: 'zinc-200', hex: '#e4e4e7' },
  { token: 'btn-default', primitive: 'zinc-900', hex: '#18181b' },
  { token: 'btn-secondary', primitive: 'zinc-100', hex: '#f4f4f5' },
  { token: 'card-bg', primitive: 'stone-0', hex: '#fafaf9' },
  { token: 'ring', primitive: 'stone-9', hex: '#1c1917' },
  { token: 'status-success', primitive: 'green-300', hex: '#86efac' },
  { token: 'status-warning', primitive: 'amber-300', hex: '#fcd34d' },
  { token: 'status-error', primitive: 'red-300', hex: '#fca5a5' },
  { token: 'status-info', primitive: 'blue-300', hex: '#93c5fd' },
  { token: 'hover', primitive: 'stone-1', hex: '#f5f5f4' },
];

const COYAX_PRIMITIVE_VARIABLE_GROUPS: Record<string, { name: string; value: string }[]> = {
  stone: [
    { name: 'stone-0', value: '#fafaf9' },
    { name: 'stone-5', value: '#78716c' },
    { name: 'stone-9', value: '#1c1917' },
  ],
  zinc: [
    { name: 'zinc-100', value: '#f4f4f5' },
    { name: 'zinc-200', value: '#e4e4e7' },
    { name: 'zinc-900', value: '#18181b' },
  ],
  blue: [
    { name: 'blue-300', value: '#93c5fd' },
    { name: 'blue-600', value: '#2563eb' },
    { name: 'blue-900', value: '#1e3a8a' },
  ],
  green: [
    { name: 'green-300', value: '#86efac' },
    { name: 'green-500', value: '#22c55e' },
    { name: 'green-700', value: '#15803d' },
  ],
  red: [
    { name: 'red-300', value: '#fca5a5' },
    { name: 'red-500', value: '#ef4444' },
    { name: 'red-700', value: '#b91c1c' },
  ],
  amber: [
    { name: 'amber-300', value: '#fcd34d' },
    { name: 'amber-500', value: '#f59e0b' },
    { name: 'amber-700', value: '#b45309' },
  ],
  orange: [
    { name: 'orange-300', value: '#fdba74' },
    { name: 'orange-500', value: '#f97316' },
    { name: 'orange-700', value: '#c2410c' },
  ],
  purple: [
    { name: 'purple-300', value: '#d8b4fe' },
    { name: 'purple-500', value: '#a855f7' },
    { name: 'purple-700', value: '#7e22ce' },
  ],
  teal: [
    { name: 'teal-300', value: '#5eead4' },
    { name: 'teal-500', value: '#14b8a6' },
    { name: 'teal-700', value: '#0f766e' },
  ],
  base: [
    { name: 'white', value: '#ffffff' },
    { name: 'black', value: '#000000' },
    { name: 'transparent', value: 'transparent' },
  ],
  brand: [
    { name: 'brand-primary', value: '#78716c' },
    { name: 'brand-accent', value: '#2563eb' },
  ],
  chart: [
    { name: 'chart-1', value: '#78716c' },
    { name: 'chart-2', value: '#2563eb' },
    { name: 'chart-3', value: '#22c55e' },
  ],
};

const COYAX_SEMANTIC_VARIABLE_GROUPS: Record<string, { name: string; value: string }[]> = {
  backgrounds: [
    { name: 'background', value: 'stone-0' },
    { name: 'card', value: 'stone-0' },
    { name: 'muted', value: 'zinc-100' },
  ],
  text: [
    { name: 'foreground', value: 'stone-9' },
    { name: 'muted-foreground', value: 'stone-5' },
  ],
  buttons: [
    { name: 'primary', value: 'blue-600' },
    { name: 'secondary', value: 'zinc-100' },
    { name: 'destructive', value: 'red-500' },
  ],
  borders: [
    { name: 'border', value: 'zinc-200' },
    { name: 'input', value: 'zinc-200' },
  ],
  interactive: [
    { name: 'hover', value: 'stone-1' },
    { name: 'ring', value: 'stone-9' },
  ],
  status: [
    { name: 'success', value: 'green-300' },
    { name: 'warning', value: 'amber-300' },
    { name: 'error', value: 'red-300' },
  ],
  progress: [
    { name: 'progress-track', value: 'zinc-100' },
    { name: 'progress-fill', value: 'stone-5' },
  ],
  brand: [
    { name: 'brand', value: 'stone-5' },
    { name: 'brand-foreground', value: 'stone-0' },
  ],
};

const COYAX_FULL_COLOR_SCALES: { name: string; colors: string[] }[] = [
  { name: 'Stone', colors: ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917'] },
  { name: 'Zinc', colors: ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b'] },
  { name: 'Blue', colors: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'] },
  { name: 'Red', colors: ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'] },
  { name: 'Amber', colors: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'] },
  { name: 'Green', colors: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'] },
  { name: 'Teal', colors: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a'] },
  { name: 'Orange', colors: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12'] },
  { name: 'Purple', colors: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87'] },
  { name: 'Sky', colors: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'] },
];

const COYAX_FULL_TYPOGRAPHY_ROWS = [
  { label: '10px / 500', text: 'MICRO LABEL', style: { fontSize: '10px', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#78716c' } },
  { label: '12px / 500', text: 'Table cell value · Menu item · Header label', style: { fontSize: '12px', fontWeight: 500, color: '#44403c' } },
  { label: '13px / 400', text: 'Default body text. This is the base size for all product UI content.', style: { fontSize: '13px', fontWeight: 400, color: '#292524' } },
  { label: '13px / 500', text: 'Sidebar link · Form label · Button text', style: { fontSize: '13px', fontWeight: 500, color: '#1c1917' } },
  { label: '14px / 500', text: 'Slightly above base. Used for emphasis within body.', style: { fontSize: '14px', fontWeight: 500, color: '#1c1917' } },
  { label: '16px / 600', text: 'Section heading or upload title', style: { fontSize: '16px', fontWeight: 600, color: '#1c1917' } },
  { label: '18px / 600', text: 'Page heading', style: { fontSize: '18px', fontWeight: 600, color: '#1c1917' } },
  { label: '24px / 700', text: 'Display heading', style: { fontSize: '24px', fontWeight: 700, color: '#1c1917' } },
  { label: '36px / 700', text: 'Hero', style: { fontSize: '36px', fontWeight: 700, color: '#1c1917' } },
];

const COYAX_FULL_SPACING_ROWS = [
  { token: 'spacing-1', px: 4, use: 'icon margins, tightest gaps' },
  { token: 'spacing-2', px: 8, use: 'default internal padding, most common gap' },
  { token: 'spacing-3', px: 12, use: 'medium element spacing' },
  { token: 'spacing-4', px: 16, use: 'card body, form fields, base page padding' },
  { token: 'spacing-6', px: 24, use: 'section separators' },
  { token: 'spacing-8', px: 32, use: 'large section gaps' },
  { token: 'spacing-10', px: 40, use: 'spacious containers' },
  { token: 'spacing-12', px: 48, use: 'section padding' },
  { token: 'spacing-16', px: 64, use: 'large section gaps' },
  { token: 'spacing-24', px: 96, use: 'landing page hero areas only' },
];

const COYAX_UNLOCKS_EXTRA_STATS: CaseStudyStatStripItem[] = [
  { Icon: Layers, label: 'Base spacing unit', labelDetail: '', top: '', countEnd: 4, prefix: '', suffix: 'px' },
  { Icon: Type, label: 'Typeface. Inter only.', labelDetail: '', top: '', countEnd: 1, prefix: '', suffix: '' },
  { Icon: Navigation, label: 'Border radius values', labelDetail: '', top: '', countEnd: 7, prefix: '', suffix: '' },
  { Icon: Zap, label: 'Tokens reference primitives', labelDetail: '', top: '', countEnd: 100, prefix: '', suffix: '%' },
];

function CoyaxLiveTokenLookupTool() {
  const [query, setQuery] = useState('');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const filtered =
    query.trim() === ''
      ? COYAX_LIVE_TOKEN_ROWS.slice(0, 6)
      : COYAX_LIVE_TOKEN_ROWS.filter(
          (row) =>
            row.token.includes(query.toLowerCase()) ||
            row.primitive.includes(query.toLowerCase()),
        );

  const copyToken = async (token: string) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 1500);
    } catch {
      setCopiedToken(null);
    }
  };

  return (
    <div style={COYAX_STACK}>
      <p className="coyax-cs-label">TOKEN LOOKUP</p>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a token... try 'background' or 'border'"
        className="w-full rounded-md bg-white border border-gray-300"
        style={{ ...COYAX_INPUT_FIELD, width: '100%' }}
      />
      <div className="rounded-lg border border-gray-200 overflow-hidden coyax-live-token-lookup-body">
        {filtered.length === 0 ? (
          <p className="text-[13px] text-gray-500 p-4 m-0">
            No token found. Try &apos;background&apos;, &apos;border&apos;, or &apos;primary&apos;.
          </p>
        ) : (
          filtered.map((row) => (
            <div
              key={row.token}
              className="coyax-live-token-row"
            >
              <span style={{ fontWeight: 500, fontFamily: 'monospace', color: '#18181b', flexShrink: 0 }}>
                {row.token}
              </span>
              <ArrowRight size={14} style={{ color: '#a8a29e', flexShrink: 0 }} />
              <span style={{ fontFamily: 'monospace', color: '#78716c', flexShrink: 0 }}>{row.primitive}</span>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 3,
                  flexShrink: 0,
                  backgroundColor: row.hex,
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              />
              <span style={{ fontFamily: 'monospace', color: '#a8a29e', flexShrink: 0 }}>{row.hex}</span>
              <button
                type="button"
                onClick={() => copyToken(row.token)}
                className="ml-auto flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-900 transition-colors shrink-0"
                aria-label={`Copy ${row.token}`}
              >
                <Copy size={12} />
                {copiedToken === row.token ? 'Copied' : 'Copy'}
              </button>
            </div>
          ))
        )}
      </div>
      <p className="text-[13px] text-gray-500 m-0">
        Every semantic token traces back to a primitive. No guessing required.
      </p>
    </div>
  );
}

function CoyaxFullColorScaleVisual({ compact = false }: { compact?: boolean }) {
  const scaleRef = useCoyaxScrollInView(0.15);
  const [tooltip, setTooltip] = useState<{ label: string; x: number; y: number } | null>(null);
  const swatchSize = compact ? 28 : 40;

  const content = (
    <>
      <p className="coyax-cs-label">COLOR SCALE</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 16 }}>
      {COYAX_FULL_COLOR_SCALES.map((scale) => (
        <div key={scale.name} className="flex flex-col sm:flex-row sm:items-center gap-3">
          <p
            className="text-[10px] tracking-[0.12em] text-gray-400 uppercase font-medium m-0 shrink-0"
            style={{ width: compact ? 44 : 56 }}
          >
            {scale.name}
          </p>
          <div className="flex flex-wrap gap-0">
            {scale.colors.map((hex, i) => {
              const token = `${scale.name.toLowerCase()}-${i}`;
              return (
                <div
                  key={hex}
                  className="relative"
                  style={{ width: swatchSize, height: swatchSize }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({ label: `${token} · ${hex}`, x: rect.left, y: rect.top });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <div className="w-full h-full border border-black/5" style={{ backgroundColor: hex }} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      </div>
      {tooltip ? (
        <div
          className="fixed z-50 rounded text-[11px] font-mono text-white pointer-events-none"
          style={{ backgroundColor: '#1c1917', left: tooltip.x, top: tooltip.y - 28, padding: '4px 8px' }}
        >
          {tooltip.label}
        </div>
      ) : null}
      {!compact ? (
        <p className="text-[13px] text-gray-500 m-0">
          10 color scales. 100 primitive tokens. Every value used in the product traces back to one of these.
        </p>
      ) : null}
    </>
  );

  if (compact) {
    return (
      <div
        ref={scaleRef.ref}
        className="coyax-scale-column"
        style={{
          opacity: scaleRef.inView ? 1 : 0,
          transform: scaleRef.inView ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.55s ease, transform 0.55s ease',
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      ref={scaleRef.ref}
      style={{
        ...COYAX_STACK,
        opacity: scaleRef.inView ? 1 : 0,
        transform: scaleRef.inView ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.55s ease, transform 0.55s ease',
      }}
    >
      {content}
    </div>
  );
}

function CoyaxFullTypographySpecimen({ compact = false }: { compact?: boolean }) {
  const content = (
    <>
      <p className="coyax-cs-label">TYPOGRAPHY SCALE</p>
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        {COYAX_FULL_TYPOGRAPHY_ROWS.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-baseline ${i < COYAX_FULL_TYPOGRAPHY_ROWS.length - 1 ? 'border-b border-gray-100' : ''}`}
            style={{ gap: compact ? 8 : 16, padding: compact ? '10px 12px' : '16px' }}
          >
            <span
              className="text-[11px] font-mono text-gray-400 shrink-0"
              style={{ width: compact ? 72 : 140 }}
            >
              {row.label}
            </span>
            <span
              style={{ ...row.style, fontFamily: 'Inter, system-ui, sans-serif' }}
              className="flex-1 min-w-0"
            >
              {compact && row.text.length > 36 ? `${row.text.slice(0, 36)}…` : row.text}
            </span>
          </div>
        ))}
      </div>
      {!compact ? (
        <p className="text-[13px] text-gray-500 m-0">
          One typeface. Inter only. Base size 13px, not Tailwind&apos;s default 16px. Medium 500 is the dominant weight
          across all product UI.
        </p>
      ) : null}
    </>
  );

  if (compact) {
    return <div className="coyax-scale-column">{content}</div>;
  }

  return <div style={COYAX_STACK}>{content}</div>;
}

function CoyaxFullSpacingVisualizer({ compact = false }: { compact?: boolean }) {
  const content = (
    <>
      <p className="coyax-cs-label">SPACING SCALE</p>
      <div className="rounded-xl border border-gray-200 bg-white" style={{ padding: compact ? 12 : 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12 }}>
          {COYAX_FULL_SPACING_ROWS.map((row) => (
            <div key={row.token} className="flex items-center gap-3">
              <span
                style={{
                  width: compact ? 80 : 120,
                  flexShrink: 0,
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: '#78716c',
                }}
              >
                {row.token}
              </span>
              <div
                style={{
                  width: row.px,
                  height: compact ? 6 : 8,
                  background: '#e7e5e4',
                  borderRadius: 4,
                  flexShrink: 0,
                }}
              />
              {!compact ? (
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#78716c' }}>{row.px}px</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {!compact ? (
        <p className="text-[13px] text-gray-500 m-0">
          4px base unit. Every spacing value is a multiple of 4. Consistent rhythm across every screen.
        </p>
      ) : null}
    </>
  );

  if (compact) {
    return <div className="coyax-scale-column">{content}</div>;
  }

  return <div style={COYAX_STACK}>{content}</div>;
}

function CoyaxFullWhatThisUnlocks() {
  const unlocksRef = useCoyaxScrollInView(0.1);
  const cards = [
    { Icon: Zap, title: 'Faster handoff', body: 'Every token in Figma maps to a real value in code. No translation layer needed.' },
    { Icon: Users, title: 'Onboard faster', body: 'New designers and engineers share one reference from day one.' },
    { Icon: RefreshCw, title: 'Consistent updates', body: 'Changing one token updates every component that references it.' },
    { Icon: Shield, title: 'Design confidence', body: 'Every decision is grounded in what actually ships, not what looks right in Figma.' },
    { Icon: TrendingUp, title: 'Scales with the product', body: 'Built to grow from three people to a funded team without rebuilding.' },
    { Icon: Code, title: 'Engineering alignment', body: 'The system mirrors the codebase. Engineers recognize it as familiar, not foreign.' },
  ];

  return (
    <section style={COYAX_STACK_LG}>
      <div style={COYAX_STACK}>
        <p className="coyax-cs-label">WHAT THIS UNLOCKS</p>
        <h2 className="coyax-cs-heading" style={{ marginBottom: 0 }}>
          A system is not an end. It is a starting point.
        </h2>
      </div>
      <div ref={unlocksRef.ref} className="coyax-card-grid coyax-card-grid--2">
        {cards.map((card, index) => (
          <div
            key={card.title}
            style={{
              ...COYAX_CASE_STUDY_CARD,
              background: '#ffffff',
              opacity: unlocksRef.inView ? 1 : 0,
              transform: unlocksRef.inView ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 0.55s ease ${index * 100}ms, transform 0.55s ease ${index * 100}ms`,
            }}
          >
            <card.Icon size={20} className="text-gray-500 mb-3" strokeWidth={1.75} />
            <p className="text-[16px] font-bold text-gray-900 m-0 mb-2">{card.title}</p>
            <p className="text-[14px] leading-relaxed text-gray-600 m-0">{card.body}</p>
          </div>
        ))}
      </div>
      <CaseStudyStatStrip brandColor={COYAX_STONE} items={COYAX_UNLOCKS_EXTRA_STATS} labelMaxWidth={220} />
    </section>
  );
}

function CoyaxCaseStudyContent() {
  const conflictRef = useCoyaxScrollInView(0.15);
  const decisionsRef = useCoyaxScrollInView(0.1);
  const [expandedTier, setExpandedTier] = useState<string | null>('primitives');
  const [activeFigmaTab, setActiveFigmaTab] = useState<string>('Colors');
  const [componentFilter, setComponentFilter] = useState<CoyaxComponentFilter>('All');
  const [showcaseView, setShowcaseView] = useState<CoyaxShowcaseView>('By Category');
  const [atomicFilter, setAtomicFilter] = useState<CoyaxAtomicLayer>('Atoms');

  const handleShowcaseViewChange = (view: CoyaxShowcaseView) => {
    setShowcaseView(view);
    if (view === 'By Category') {
      setComponentFilter('All');
    } else {
      setAtomicFilter('Atoms');
    }
  };

  const processSteps = [
    {
      title: 'Git Repository Audit',
      body: 'I read the Tailwind config, index.css, and the Mantine theme override file directly from the git repository. I produced 13 audit files covering every dimension of the visual system: typography, spacing, borders, shadows, icons, animations, layout, component patterns, interactive states, opacity, breakpoints, tokens, and color.',
      extra: (
        <div style={COYAX_STACK_LG}>
          <div className="coyax-terminal-block" style={{ borderRadius: 12, overflow: 'hidden' }}>
            <div
              className="coyax-terminal-header"
              style={{
                background: '#292524',
                borderRadius: '12px 12px 0 0',
                padding: '8px 16px',
                fontSize: 11,
                fontFamily: 'monospace',
                color: '#78716c',
              }}
            >
              // git repository audit
            </div>
            <div
              className="coyax-terminal-body font-mono text-[12px] leading-relaxed overflow-x-auto"
              style={{ backgroundColor: '#1c1917', padding: 24, color: '#fafaf9' }}
            >
              <pre className="m-0 whitespace-pre-wrap" style={{ color: '#fafaf9' }}>
{`// Files audited from live git repository
typography.md
spacing.md
borders.md
shadows.md
icons.md
animations.md
layout.md
component-patterns.md
interactive-states.md
opacity.md
breakpoints.md
design-tokens.md
color-audit.md  // 13 files. Zero guesses.`}
              <span className="coyax-blink-cursor inline-block w-[7px] h-[14px] ml-0.5 align-middle" style={{ backgroundColor: '#fafaf9' }} />
            </pre>
            </div>
          </div>
          <div className="coyax-quote-block" style={{
            margin: '40px 0',
            padding: '28px 32px',
            borderLeft: '3px solid #78716c',
            background: '#fafaf9',
          }}>
            <p style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: '#1c1917',
              fontStyle: 'italic',
              fontWeight: 400,
              margin: 0,
              marginBottom: 16,
            }}>
              &ldquo;I almost built the entire system based on what I thought the tokens should be called. The audit stopped me. Engineers had named things one way in code. I would have named them differently in Figma. That gap would have broken the handoff before it even started.&rdquo;
            </p>
            <p style={{ fontSize: 12, color: '#a8a29e', margin: 0, letterSpacing: '0.04em' }}>
              — HRITHIK SANYAL, FOUNDING DESIGN ENGINEER
            </p>
          </div>
          <CoyaxCaseStudyFigure
            src="/coyax/sidebarr.png"
            alt="Sidebar component expanded and collapsed states"
            caption="Sidebar component, expanded and collapsed states. Built using sidebar-link tokens from the design system."
          />
          <div className="coyax-mid-build-note" style={{
            marginTop: 32,
            padding: '20px 24px',
            background: '#fffbeb',
            border: '1px solid #fcd34d',
            borderRadius: 8,
            display: 'flex',
            gap: 16,
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: 1,
            }}>
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>!</span>
            </div>
            <div>
              <p style={{ fontSize: 13, color: '#92400e', fontWeight: 600, margin: 0, marginBottom: 6 }}>
                Mid-build note
              </p>
              <p style={{ fontSize: 13, color: '#78350f', lineHeight: 1.6, margin: 0 }}>
                This screenshot was taken while I was still figuring out whether the collapsed state should show icon labels or not. I had three versions of this component before landing here. The 42px badge on every item was a placeholder I never removed — it maps to a database row count that the engineers query live.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Resolving Stone vs Zinc',
      body: 'The audit revealed the root of the color confusion. Stone was the Mantine custom palette override. Zinc was only for shadcn tokens. One rule fixed the entire system.',
      extra: (
        <div style={COYAX_STACK_LG}>
          <div className="flex flex-col md:flex-row gap-8">
            <CoyaxColorSwatchColumn label="STONE, primary neutral" swatches={STONE_SWATCHES} />
            <CoyaxColorSwatchColumn label="ZINC, shadcn tokens only" swatches={ZINC_SWATCHES} />
          </div>
          <CoyaxTokenLookupTool />
        </div>
      ),
    },
    {
      title: 'Three-Tier Variable Architecture',
      body: 'I designed a three-tier variable system in Figma that mirrors exactly how the code is structured. Every tier references the one above it. No hex values are ever hardcoded in the semantic or component layers.',
      extra: (
        <div style={COYAX_STACK_LG}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {COYAX_VARIABLE_TIERS.map((tier, index) => {
              const isOpen = expandedTier === tier.id;
              return (
                <div key={tier.id}>
                  <button
                    type="button"
                    onClick={() => setExpandedTier(isOpen ? null : tier.id)}
                    className="w-full text-left transition-colors"
                    style={{
                      background: '#fafaf9',
                      border: '1px solid #e7e5e4',
                      borderRadius: 8,
                      padding: '20px 24px',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[15px] font-semibold text-gray-900 m-0">{tier.title}</p>
                        <p className="text-[13px] text-gray-500 m-0 mt-1">{tier.subtitle}</p>
                      </div>
                      <ChevronDown
                        size={18}
                        className="text-gray-400 shrink-0 transition-transform"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </div>
                    {isOpen ? (
                      <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                        {tier.examples.map((example) => (
                          <span
                            key={example}
                            className="rounded text-[11px] font-mono text-gray-600 bg-gray-50 border border-gray-200"
                            style={{ padding: '4px 10px', display: 'inline-block' }}
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </button>
                  {index < COYAX_VARIABLE_TIERS.length - 1 ? (
                    <div
                      style={{
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      aria-hidden
                    >
                      <span style={{ color: '#a8a29e', fontSize: 18 }}>↓</span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 40, marginBottom: 48 }}>
            <p style={{ fontSize: 12, color: '#a8a29e', fontStyle: 'italic', marginBottom: 16 }}>
              How I thought about it before opening Figma
            </p>
            <svg width="100%" viewBox="0 0 680 480" style={{ display: 'block', maxWidth: 800 }}>
              <defs>
                <marker id="sketch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="#78716c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </marker>
              </defs>

              <text x="40" y="32" style={{ fontSize: 11, fill: '#a8a29e', fontStyle: 'italic', fontFamily: 'inherit' }}>figma variables architecture — working draft</text>

              <g transform="rotate(-0.8, 170, 120)">
                <rect x="40" y="70" width="260" height="110" rx="6" fill="#fafaf9" stroke="#a8a29e" strokeWidth="1.5"/>
                <rect x="44" y="74" width="252" height="102" rx="5" fill="none" stroke="#e7e5e4" strokeWidth="0.5"/>
                <text x="62" y="102" style={{ fontSize: 13, fontWeight: 600, fill: '#1c1917', fontFamily: 'inherit' }}>01 — Primitives</text>
                <path d="M62 108 Q130 112 240 106" fill="none" stroke="#a8a29e" strokeWidth="0.8" strokeLinecap="round"/>
                <text x="62" y="126" style={{ fontSize: 11, fill: '#57534e', fontFamily: 'inherit' }}>Raw hex values. All scales.</text>
                <text x="62" y="144" style={{ fontSize: 11, fill: '#a8a29e', fontFamily: 'inherit' }}>stone · zinc · blue · green · red · amber</text>
              </g>

              <path d="M170 184 Q167 218 170 248" fill="none" stroke="#78716c" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#sketch-arrow)"/>
              <text x="182" y="214" style={{ fontSize: 10, fill: '#a8a29e', fontStyle: 'italic', fontFamily: 'inherit' }}>references up</text>
              <text x="182" y="228" style={{ fontSize: 10, fill: '#a8a29e', fontStyle: 'italic', fontFamily: 'inherit' }}>never hardcodes hex</text>

              <g transform="rotate(0.5, 170, 310)">
                <rect x="40" y="252" width="260" height="118" rx="6" fill="#fafaf9" stroke="#a8a29e" strokeWidth="1.5"/>
                <rect x="44" y="256" width="252" height="110" rx="5" fill="none" stroke="#e7e5e4" strokeWidth="0.5"/>
                <text x="62" y="284" style={{ fontSize: 13, fontWeight: 600, fill: '#1c1917', fontFamily: 'inherit' }}>02 — Semantic</text>
                <path d="M62 290 Q120 295 230 289" fill="none" stroke="#a8a29e" strokeWidth="0.8" strokeLinecap="round"/>
                <text x="62" y="308" style={{ fontSize: 11, fill: '#57534e', fontFamily: 'inherit' }}>Intent-based tokens. Two modes.</text>
                <text x="62" y="326" style={{ fontSize: 11, fill: '#a8a29e', fontFamily: 'inherit' }}>background · foreground · border · muted</text>
                <text x="62" y="344" style={{ fontSize: 11, fill: '#a8a29e', fontFamily: 'inherit' }}>primary · destructive · status</text>
                <rect x="168" y="272" width="114" height="16" rx="8" fill="none" stroke="#2563eb" strokeWidth="0.8"/>
                <text x="225" y="284" textAnchor="middle" style={{ fontSize: 10, fill: '#2563eb', fontFamily: 'inherit' }}>light + dark modes</text>
              </g>

              <path d="M170 374 Q173 408 170 434" fill="none" stroke="#78716c" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#sketch-arrow)"/>

              <rect x="40" y="438" width="260" height="24" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="1"/>
              <text x="170" y="454" textAnchor="middle" style={{ fontSize: 11, fill: '#166534', fontFamily: 'inherit' }}>03 — Applied to components</text>

              <rect x="380" y="62" width="272" height="390" rx="8" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1"/>

              <text x="400" y="92" style={{ fontSize: 10, fill: '#a8a29e', fontFamily: 'inherit' }}>the wrong approach</text>
              <rect x="400" y="102" width="232" height="54" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="0.5"/>
              <text x="516" y="124" textAnchor="middle" style={{ fontSize: 11, fill: '#991b1b', fontFamily: 'inherit' }}>hardcode #78716c</text>
              <text x="516" y="140" textAnchor="middle" style={{ fontSize: 11, fill: '#991b1b', fontFamily: 'inherit' }}>in every component</text>
              <path d="M618 108 L642 152 M642 108 L618 152" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>

              <path d="M396 170 L644 170" fill="none" stroke="#e7e5e4" strokeWidth="0.5" strokeDasharray="4 4"/>

              <text x="400" y="194" style={{ fontSize: 10, fill: '#a8a29e', fontFamily: 'inherit' }}>the right approach</text>
              <rect x="400" y="204" width="232" height="54" rx="4" fill="#f0fdf4" stroke="#86efac" strokeWidth="0.5"/>
              <text x="516" y="226" textAnchor="middle" style={{ fontSize: 11, fill: '#166534', fontFamily: 'inherit' }}>stone.500 → #78716c</text>
              <text x="516" y="242" textAnchor="middle" style={{ fontSize: 11, fill: '#166534', fontFamily: 'inherit' }}>semantic.muted → stone.500</text>
              <path d="M618 220 L629 234 L646 210" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

              <path d="M396 272 L644 272" fill="none" stroke="#e7e5e4" strokeWidth="0.5" strokeDasharray="4 4"/>

              <text x="400" y="296" style={{ fontSize: 10, fill: '#a8a29e', fontFamily: 'inherit' }}>why it matters</text>
              <text x="400" y="318" style={{ fontSize: 11, fill: '#44403c', fontFamily: 'inherit' }}>update stone.500 once →</text>
              <text x="400" y="334" style={{ fontSize: 11, fill: '#44403c', fontFamily: 'inherit' }}>every component updates.</text>
              <text x="400" y="356" style={{ fontSize: 11, fill: '#44403c', fontFamily: 'inherit' }}>no hunting. no hex values.</text>
              <text x="400" y="372" style={{ fontSize: 11, fill: '#44403c', fontFamily: 'inherit' }}>no guessing in Figma.</text>

              <text x="400" y="426" style={{ fontSize: 10, fill: '#a8a29e', fontStyle: 'italic', fontFamily: 'inherit' }}>took me 2 weeks to name this correctly</text>
              <path d="M398 432 Q516 438 644 430" fill="none" stroke="#e7e5e4" strokeWidth="0.5" strokeLinecap="round"/>

              <text x="40" y="470" style={{ fontSize: 10, fill: '#a8a29e', fontStyle: 'italic', fontFamily: 'inherit' }}>↑ every token traces to a raw value. no exceptions.</text>
            </svg>
          </div>
          <CoyaxFigmaVariablesPanel />
          <CoyaxColorScaleVisual />
          <CoyaxTypographySpecimen />
          <div style={{ marginBottom: 48 }}>
            <CoyaxSpacingVisualizer />
          </div>
          <div
            style={{
              height: 1,
              background: '#f0f0ef',
              width: '100%',
              margin: '0 0 48px 0',
            }}
          />
        </div>
      ),
    },
    {
      title: 'Figma File Structure',
      body: 'Figma is the recipe book. The codebase is the kitchen. Every design decision lives here before it touches code.',
      extra: (
        <div className="overflow-x-auto pb-2 -mx-1 px-1">
          <div className="flex gap-2 min-w-max">
            {COYAX_FIGMA_TABS.map((tab) => {
              const isActive = activeFigmaTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFigmaTab(tab)}
                  className="whitespace-nowrap"
                  style={{
                    background: isActive ? '#18181b' : '#f5f5f4',
                    borderRadius: 6,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 500,
                    color: isActive ? '#fafaf9' : '#57534e',
                    cursor: 'pointer',
                    border: 'none',
                    fontFamily: 'inherit',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-w-0 coyax-case-study">
      <section style={{ ...COYAX_MAJOR_SECTION_PAD, ...COYAX_STACK_LG }}>
        <p className="coyax-cs-label">THE PROBLEM</p>
        <h2 className="coyax-cs-heading">
          No system. Two libraries. Zero shared language.
        </h2>
        <p className="coyax-cs-body">
          When I joined Coyax as the founding designer in March 2026, the product was already being built. Two founding
          engineers had made independent visual decisions using a mix of Mantine and shadcn/ui, two separate component
          libraries with two separate color systems. Sometimes the team took monochromatic colors from shadcn but used
          Mantine for structure. Sometimes the reverse. There was no documented rule for which library owned what. There
          was no Figma file. No design tokens. No shared language between design and engineering.
        </p>
        <div
          ref={conflictRef.ref}
          className="coyax-conflict-wrap relative"
          style={{
            marginTop: 8,
            opacity: conflictRef.inView ? 1 : 0,
            transform: conflictRef.inView ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.55s ease, transform 0.55s ease',
          }}
        >
          <div className="coyax-conflict-panel-left">
            <p className="text-[11px] tracking-[0.15em] text-gray-400 uppercase font-medium m-0 mb-4">MANTINE</p>
            {['Stone neutrals', 'Component structure', 'Theme overrides'].map((row) => (
              <p
                key={row}
                className="text-[14px] text-gray-700 m-0 border-b border-gray-100 last:border-0"
                style={{ padding: '8px 0' }}
              >
                {row}
              </p>
            ))}
          </div>
          <div className="coyax-conflict-divider">
            <span className="coyax-conflict-badge">
              Conflict zone
            </span>
          </div>
          <div className="coyax-conflict-panel-right">
            <p className="text-[11px] tracking-[0.15em] text-gray-400 uppercase font-medium m-0 mb-4">SHADCN/UI</p>
            {['Zinc neutrals', 'Component tokens', 'Utility classes'].map((row) => (
              <p
                key={row}
                className="text-[14px] text-gray-700 m-0 border-b border-gray-100 last:border-0"
                style={{ padding: '8px 0' }}
              >
                {row}
              </p>
            ))}
          </div>
        </div>
        <div style={{ marginTop: COYAX_SECTION_INNER_GAP }}>
          <CoyaxBeforeAfterToggle />
        </div>
      </section>

      {COYAX_CS_DIVIDER}

      <section style={{ ...COYAX_SECTION_PAD_48, ...COYAX_STACK_LG }}>
        <p className="coyax-cs-label">THE CHALLENGE</p>
        <div className="coyax-card-grid coyax-card-grid--3">
          {COYAX_CHALLENGE_CARDS.map((card) => (
            <CoyaxCaseStudyCard key={card.number} number={card.number} title={card.title} body={card.body} />
          ))}
        </div>
      </section>

      {COYAX_CS_DIVIDER}

      <section style={{ ...COYAX_SECTION_PAD_48, ...COYAX_STACK_LG }}>
        <p className="coyax-cs-label">THE PROCESS</p>
        <h2 className="coyax-cs-heading">
          I audited the codebase before touching Figma
        </h2>
        <p className="coyax-cs-body">
          Rather than guessing at the system I went directly to the source.
        </p>
        <div className="relative">
          <div
            className="absolute left-[15px] top-2 bottom-2 w-0.5 hidden md:block"
            style={{ background: `linear-gradient(to bottom, ${COYAX_STONE}, rgba(120, 113, 108, 0.1))` }}
          />
          <div className="space-y-10">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="flex gap-6"
                style={
                  step.title === 'Resolving Stone vs Zinc'
                    ? { marginTop: 48 }
                    : step.title === 'Three-Tier Variable Architecture'
                      ? { marginTop: 48 }
                      : step.title === 'Figma File Structure'
                        ? { marginTop: 48, marginBottom: 48 }
                        : undefined
                }
              >
                <div className="hidden md:flex flex-col items-center shrink-0 w-8">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold z-10"
                    style={{
                      backgroundColor: 'rgba(120, 113, 108, 0.12)',
                      border: `2px solid ${COYAX_STONE}`,
                      color: COYAX_STONE,
                    }}
                  >
                    {index + 1}
                  </div>
                  {index < processSteps.length - 1 ? (
                    <div className="w-0.5 flex-1 min-h-[24px] bg-gray-200 my-1" />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0 pb-2" style={COYAX_STACK_LG}>
                  <p className="md:hidden text-[11px] font-bold tracking-[0.15em] m-0" style={{ color: COYAX_STONE }}>
                    Step {index + 1}
                  </p>
                  <h3 className="text-[20px] font-bold text-gray-900 m-0">{step.title}</h3>
                  <p className="coyax-cs-body">{step.body}</p>
                  {step.extra}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {COYAX_CS_DIVIDER}

      <section style={{ ...COYAX_SECTION_PAD_48, ...COYAX_STACK_LG }}>
        <p className="coyax-cs-label">THE COMPONENTS</p>
        <div
          style={{
            height: 1,
            background: '#f0f0ef',
            width: '100%',
            marginTop: -8,
            marginBottom: 0,
          }}
        />
        <h2 className="coyax-cs-heading">
          68 components. Built from the codebase up.
        </h2>
        <p className="coyax-cs-body">
          Every component maps to a real value in production. Nothing invented.
        </p>
        <CoyaxComponentShowcaseGallery
          showcaseView={showcaseView}
          componentFilter={componentFilter}
          atomicFilter={atomicFilter}
          onShowcaseViewChange={handleShowcaseViewChange}
          onComponentFilterChange={setComponentFilter}
          onAtomicFilterChange={setAtomicFilter}
        />
        <div
          className="coyax-dark-closing"
          style={{
            width: '100%',
            background: '#0a0a0a',
            borderRadius: 16,
            padding: '64px 48px',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          <h3
            className="coyax-dark-closing-heading m-0"
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#fafaf9',
              marginBottom: 32,
              lineHeight: 1.15,
            }}
          >
            Every component. One system. Zero guesses.
          </h3>
          <div className="coyax-dark-closing-stats">
            <CaseStudyStatStrip
              brandColor="#e7e5e4"
              items={[
                {
                  Icon: Layers,
                  label: 'Components in the library',
                  labelDetail: '',
                  top: '',
                  countEnd: 68,
                  prefix: '',
                  suffix: '',
                },
                {
                  Icon: Layers,
                  label: 'Audit files the system is built from',
                  labelDetail: '',
                  top: '',
                  countEnd: 13,
                  prefix: '',
                  suffix: '',
                },
                {
                  Icon: Layers,
                  label: 'Tokens reference primitives',
                  labelDetail: '',
                  top: '',
                  countEnd: 100,
                  prefix: '',
                  suffix: '%',
                },
              ]}
              labelMaxWidth={240}
            />
          </div>
        </div>
      </section>

      <section style={{ ...COYAX_SECTION_PAD_48, display: 'flex', flexDirection: 'column', gap: 48 }}>
        <CoyaxLiveTokenLookupTool />
        <div className="coyax-scale-trio">
          <CoyaxFullColorScaleVisual compact />
          <CoyaxFullTypographySpecimen compact />
          <CoyaxFullSpacingVisualizer compact />
        </div>
        <CoyaxFullWhatThisUnlocks />
      </section>

      {COYAX_CS_DIVIDER}

      <section style={{ ...COYAX_MAJOR_SECTION_PAD, ...COYAX_STACK_LG }}>
        <div style={COYAX_STACK}>
          <p className="coyax-cs-label">KEY DECISIONS</p>
          <h2 className="coyax-cs-heading" style={{ marginBottom: 0 }}>
            Every decision came from the audit, not from preference.
          </h2>
        </div>
        <div ref={decisionsRef.ref} className="coyax-card-grid coyax-card-grid--2 coyax-card-grid--3-lg">
          {COYAX_KEY_DECISIONS.map((card, index) => (
            <CoyaxCaseStudyCard
              key={card.number}
              number={card.number}
              title={card.title}
              body={card.body}
              style={{
                opacity: decisionsRef.inView ? 1 : 0,
                transform: decisionsRef.inView ? 'translateY(0)' : 'translateY(10px)',
                transition: `opacity 0.55s ease ${index * 80}ms, transform 0.55s ease ${index * 80}ms`,
              }}
            />
          ))}
        </div>
        <CoyaxCaseStudyFigure
          src="/coyax/input-component.png"
          alt="Input field component states"
          caption="Input field component, 6 states. Error uses red semantic token. Success uses green semantic token. Disabled uses 40% opacity pattern."
        />
      </section>

      {COYAX_CS_DIVIDER}

      <CoyaxWhatThisUnlocks />

      {COYAX_CS_DIVIDER}

      <section style={{ ...COYAX_MAJOR_SECTION_PAD, ...COYAX_STACK_LG }}>
        <p className="coyax-cs-label">IMPACT</p>
        <h2 className="coyax-cs-heading">
          What changed after the system existed
        </h2>
        <CaseStudyStatStrip brandColor={COYAX_STONE} items={COYAX_IMPACT_STATS_ITEMS} labelMaxWidth={220} />
        <div style={{
          marginTop: 48,
          paddingTop: 32,
          borderTop: '1px solid #f0f0ef',
          maxWidth: 680,
        }}>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#44403c', marginBottom: 16 }}>
            The clearest signal that the system was working: the question that stopped appearing in our weekly syncs.
          </p>
          <p style={{
            fontSize: 20,
            lineHeight: 1.6,
            color: '#1c1917',
            fontStyle: 'italic',
            fontWeight: 400,
            borderLeft: '3px solid #e7e5e4',
            paddingLeft: 24,
            marginBottom: 16,
          }}>
            &ldquo;Why does this look different in the product than it does in Figma?&rdquo;
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#44403c' }}>
            That question came up every week before the audit. It stopped after. Not because I asked anyone to check the tokens. Because the tokens were now the same tokens — in Figma and in code — and there was nothing left to misread.
          </p>
        </div>
        <p className="coyax-cs-body">
          Before the design system, design decisions were disconnected from engineering decisions. After the audit and
          system build, every token in Figma maps to a real value in the codebase. The engineering team no longer needs
          to interpret designs. The founder no longer sees inconsistencies between what gets shown and what gets built.
        </p>
      </section>
    </div>
  );
}

const HERO_C = COYAX_DEMO_COLORS;

function CoyaxHeroStatusBadge({ label, variant }: { label: string; variant: 'teal' | 'amber' | 'red' }) {
  const styles = {
    teal: { bg: '#ccfbf1', color: '#115e59', border: '#2dd4bf' },
    amber: { bg: '#fef3c7', color: '#92400e', border: '#f59e0b' },
    red: { bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' },
  } as const;
  const s = styles[variant];
  return (
    <span
      style={{
        borderRadius: 9999,
        padding: '2px 8px',
        fontSize: 10,
        fontWeight: 500,
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

function CoyaxHeroSidebarLink({
  icon,
  label,
  active,
  indent = 0,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  indent?: number;
}) {
  return (
    <div
      style={{
        height: 26,
        borderRadius: 8,
        padding: `0 8px 0 ${8 + indent}px`,
        fontSize: 12,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: active ? HERO_C.hoverBg : 'transparent',
        color: HERO_C.stone700,
        borderLeft: active ? `2px solid ${HERO_C.bgPrimary}` : undefined,
        marginLeft: active ? -2 : undefined,
      }}
    >
      {icon}
      {label}
    </div>
  );
}

function CoyaxHeroComposition() {
  const tableRows = [
    { id: 'INV-2041', vendor: 'Acme Corp', amount: '$12,400', status: 'Matched' as const, variant: 'teal' as const },
    { id: 'INV-2038', vendor: 'Northwind LLC', amount: '$8,920', status: 'Needs Review' as const, variant: 'amber' as const },
    { id: 'INV-2035', vendor: 'Globex Inc', amount: '$4,150', status: 'Rejected' as const, variant: 'red' as const },
  ];

  const categoryPills = [
    'Forms · 14',
    'Navigation · 9',
    'Feedback · 11',
    'Data · 8',
  ];

  const stoneSwatches = ['#fafaf9', '#e7e5e4', '#78716c', '#44403c', '#1c1917'];
  const accentSwatches = ['#2563eb', '#22c55e', '#f59e0b', '#ef4444'];

  const heroCard: CSSProperties = {
    flex: 1,
    minWidth: 0,
    background: HERO_C.white,
    border: `1px solid ${HERO_C.stone200}`,
    borderRadius: 8,
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  };

  return (
    <div className="coyax-hero-composition">
      <div className="coyax-hero-composition__brand">
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#a8a29e',
            margin: 0,
          }}
        >
          Coyax · Design System
        </p>
        <h2
          style={{
            fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#fafaf9',
            margin: 0,
          }}
        >
          Coyax
        </h2>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            color: '#d6d3d1',
            margin: 0,
            maxWidth: 320,
          }}
        >
          68 components mapped to production. Stone and zinc tokens across Mantine and shadcn.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {categoryPills.map((pill) => (
            <span
              key={pill}
              style={{
                fontSize: 11,
                fontWeight: 500,
                padding: '5px 12px',
                borderRadius: 9999,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#e7e5e4',
                background: 'rgba(255, 255, 255, 0.06)',
                whiteSpace: 'nowrap',
              }}
            >
              {pill}
            </span>
          ))}
        </div>
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: 11,
            fontWeight: 500,
            color: '#d6d3d1',
            lineHeight: 1.5,
          }}
        >
          Git-audited · Token-first · Figma variables · Code-mirrored naming
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {stoneSwatches.map((hex) => (
              <span
                key={hex}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: hex,
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {accentSwatches.map((hex) => (
              <span
                key={hex}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: hex,
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 11, color: '#a8a29e' }}>
            7 color scales · 70+ primitives
          </span>
        </div>
      </div>

      <div className="coyax-hero-composition__preview">
        <div className="coyax-hero-composition__app">
          <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
            <aside
              style={{
                width: 148,
                flexShrink: 0,
                borderRight: `1px solid ${HERO_C.border}`,
                padding: '12px 10px',
                background: HERO_C.white,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '0 4px' }}>
                <PanelLeft size={15} color={HERO_C.stone600} />
                <span style={{ fontSize: 14, fontWeight: 700, color: HERO_C.bgPrimary }}>Coyax</span>
              </div>
              <CoyaxHeroSidebarLink icon={<Home size={13} />} label="Home" active />
              <p
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  color: HERO_C.stone500,
                  letterSpacing: '0.06em',
                  margin: '10px 0 4px',
                  paddingLeft: 8,
                }}
              >
                Documents
              </p>
              <CoyaxHeroSidebarLink icon={<FileText size={13} />} label="Invoices" indent={8} />
              <p
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  color: HERO_C.stone500,
                  letterSpacing: '0.06em',
                  margin: '10px 0 4px',
                  paddingLeft: 8,
                }}
              >
                Automate
              </p>
              <CoyaxHeroSidebarLink icon={<Sparkles size={13} />} label="AI Analytics" indent={8} />
              <p
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  color: HERO_C.stone500,
                  letterSpacing: '0.06em',
                  margin: '10px 0 4px',
                  paddingLeft: 8,
                }}
              >
                Database
              </p>
              <CoyaxHeroSidebarLink icon={<Database size={13} />} label="Tables" indent={8} />
            </aside>

            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: 44,
                  borderBottom: `1px solid ${HERO_C.border}`,
                  padding: '0 14px',
                  flexShrink: 0,
                  background: HERO_C.white,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <PanelLeft size={17} color={HERO_C.stone600} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: HERO_C.bgPrimary }}>Documents</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      fontSize: 11,
                      padding: '4px 10px',
                      border: `1px solid ${HERO_C.border}`,
                      borderRadius: 9999,
                      color: HERO_C.stone600,
                      background: HERO_C.white,
                    }}
                  >
                    AI Credits 200
                  </span>
                  <Bell size={16} color={HERO_C.stone500} />
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: HERO_C.stone200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 600,
                      color: HERO_C.stone600,
                    }}
                  >
                    H
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, padding: '12px 14px', minHeight: 0, background: HERO_C.stone50 }}>
                <div
                  style={{
                    border: `1px solid ${HERO_C.border}`,
                    borderRadius: 8,
                    overflow: 'hidden',
                    height: '100%',
                    background: HERO_C.white,
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1.2fr 0.8fr 1fr',
                      gap: 8,
                      padding: '8px 12px',
                      background: HERO_C.stone100,
                      borderBottom: `1px solid ${HERO_C.border}`,
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: HERO_C.stone500,
                    }}
                  >
                    <span>Invoice</span>
                    <span>Vendor</span>
                    <span>Amount</span>
                    <span>Status</span>
                  </div>
                  {tableRows.map((row, i) => (
                    <div
                      key={row.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.2fr 0.8fr 1fr',
                        gap: 8,
                        padding: '9px 12px',
                        alignItems: 'center',
                        borderBottom: i < tableRows.length - 1 ? `1px solid ${HERO_C.stone100}` : undefined,
                        fontSize: 12,
                        color: HERO_C.stone700,
                      }}
                    >
                      <span style={{ fontFamily: 'monospace', fontSize: 11 }}>{row.id}</span>
                      <span>{row.vendor}</span>
                      <span style={{ fontWeight: 500 }}>{row.amount}</span>
                      <CoyaxHeroStatusBadge label={row.status} variant={row.variant} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 10,
              padding: '12px 14px',
              borderTop: `1px solid ${HERO_C.border}`,
              background: HERO_C.stone50,
              flexShrink: 0,
            }}
          >
            <div style={heroCard}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: HERO_C.stone400, margin: 0, textTransform: 'uppercase' }}>
                Button Variants
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                {[
                  { label: 'Primary', bg: HERO_C.bgPrimary, color: HERO_C.fgPrimary, border: 'none' },
                  { label: 'Secondary', bg: HERO_C.zinc100, color: HERO_C.bgPrimary, border: `1px solid ${HERO_C.border}` },
                  { label: 'Ghost', bg: 'transparent', color: HERO_C.bgPrimary, border: 'none' },
                  { label: 'Upload', bg: HERO_C.zinc100, color: HERO_C.bgPrimary, border: `1px solid ${HERO_C.border}`, icon: true },
                ].map((btn) => (
                  <span
                    key={btn.label}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '6px 12px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 500,
                      background: btn.bg,
                      color: btn.color,
                      border: btn.border,
                    }}
                  >
                    {'icon' in btn && btn.icon ? <Upload size={11} /> : null}
                    {btn.label}
                  </span>
                ))}
              </div>
            </div>

            <div style={heroCard}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: HERO_C.stone400, margin: 0, textTransform: 'uppercase' }}>
                Badge Variants
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {[
                  { label: 'Teal', bg: '#ccfbf1', color: '#115e59', border: '#2dd4bf' },
                  { label: 'Amber', bg: '#fef3c7', color: '#92400e', border: '#f59e0b' },
                  { label: 'Red', bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' },
                  { label: 'Blue', bg: '#eff6ff', color: '#1e40af', border: '#93c5fd' },
                  { label: 'Green', bg: '#dcfce7', color: '#166534', border: '#86efac' },
                  { label: 'Gray', bg: '#f4f4f5', color: '#3f3f46', border: '#d4d4d8' },
                ].map((b) => (
                  <span
                    key={b.label}
                    style={{
                      borderRadius: 9999,
                      padding: '3px 8px',
                      fontSize: 10,
                      fontWeight: 500,
                      background: b.bg,
                      color: b.color,
                      border: `1px solid ${b.border}`,
                    }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            <div style={heroCard}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: HERO_C.stone400, margin: 0, textTransform: 'uppercase' }}>
                Input Field States
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { value: 'Default state', border: `1px solid ${HERO_C.border}` },
                  { value: 'Error state', border: `1px solid ${HERO_C.destructive}` },
                  { value: 'Success state', border: `1px solid ${HERO_C.success}` },
                ].map((field) => (
                  <input
                    key={field.value}
                    readOnly
                    value={field.value}
                    style={{
                      height: 28,
                      borderRadius: 6,
                      padding: '0 10px',
                      fontSize: 11,
                      border: field.border,
                      background: HERO_C.white,
                      color: HERO_C.stone700,
                      fontFamily: 'inherit',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CURRENT_PROJECT_ID = 'CoyaxDesignSystem';
/** Toggle when hero + sidebar should link to the live site again. */
const COYAX_LIVE_SITE_LINKS_ENABLED = true;
const COYAX_FIGMA_LINK_ENABLED = false;
const COYAX_WEBSITE_URL = 'https://www.coyax.ai/';
const COYAX_FIGMA_URL = 'https://www.figma.com/design/acgtVQdx5kEZfoAnqAW5i1/Coyax';

interface CoyaxDesignSystemProjectProps {
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}
const PROGRESS_BAR_HIDE_DELAY_MS = 400;

export function CoyaxDesignSystemProject({ onBack, onProjectClick }: CoyaxDesignSystemProjectProps) {
  const { openLightbox } = useLightbox();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const [caseStudyVisible, setCaseStudyVisible] = useState(getInitialCaseStudyVisible);
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

  // ═══════════════════════════════════════════════════════════════════════
  // EDIT YOUR PROJECT CONTENT BELOW
  // ═══════════════════════════════════════════════════════════════════════
  
  const title = 'Coyax Design System: Building the Foundation';
  const company = 'Coyax';
  const subtitle =
    'Auditing a live production codebase and building a unified design system from scratch for an AI-powered B2B fintech startup.';
  const headerColor = '#78716c';
  const progressBarColor = '#78716c';
  const arrowColor = '#78716c';
  const icon = '/coyax/coyax-logo.png';
  const role =
    'Founding Design Engineer. Design System Audit, Token Architecture, Figma Variable System, Component Library';
  const team = 'Solo Designer, 2 Founding Engineers';
  const when = 'March 2026 to Present';
  const overview: string | undefined = '';
  const speedReadChallenge =
    'Coyax shipped with Mantine and shadcn/ui running in parallel. Two libraries, two neutral palettes, and no documented rules for which owned what. Without Figma tokens or a shared language, every screen became a negotiation between design and engineering.';
  const speedReadProcess =
    'I audited the live git repository first: 13 files covering typography through color, then resolved stone vs zinc, built a three-tier Figma variable architecture mirroring the codebase, and documented 68 production-mapped components.';
  const speedReadTakeaways =
    'A design system only works when it reflects what was actually built. Mirroring code structure in Figma naming and hierarchy made the system familiar to engineers rather than foreign.';
  const speedReadImpact =
    'Thirteen audit files replaced guesswork. Two libraries unified under one token system. Design-to-engineering handoff improved by an estimated 40% once every Figma token mapped to a real codebase value.';

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

  // Page content: add text or image/video in the order you want. Order here = order on page.
  const blocks: ContentBlock[] = [
    { type: 'coyaxHeroStats' },
    { type: 'coyaxCaseStudyContent' },
    {
      type: 'text',
      header: 'Retrospectives',
      subheader: '1. Read the code, do not guess at it',
      content:
        'The single most valuable thing I did was audit the git repository directly instead of starting in Figma. Most designers build a system based on what they think the product should be. I built one based on what the product actually was. That distinction is what made the system trusted and used rather than ignored.',
    },
    {
      type: 'text',
      header: '',
      subheader: '2. A design system is a collaboration tool, not a design artifact',
      content:
        'The system only has value because both designers and engineers reference it. I designed it to mirror the code structure precisely so that engineers would recognize it as familiar rather than foreign. Same naming conventions, same variable hierarchy, same color logic that already existed in the codebase.',
    },
    {
      type: 'text',
      header: 'Reflections',
      content: '',
      items: [
        'Joining a team mid-build means you cannot start from zero. The right move is to understand what exists before proposing what should change.',
        'The stone vs zinc confusion was not a mistake by the engineers. It was a documentation gap. The design system fixed the gap, not the code.',
        'Building a three-tier variable system taught me that the hardest part is not the design, it is the naming. Every token name is a decision that affects every engineer who comes after you.',
        'A founding designer at a pre-seed startup is not just a visual designer. You are the person who creates the shared language between design and engineering. I designed the system so that when the engineering team opened Figma, the variable names already matched what they had been typing in code for months.',
      ],
      itemsIndent: 0,
    },
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // DISPLAY CODE BELOW - Don't edit unless you know what you're doing
  // ═══════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-white" style={{ overflowX: 'hidden', paddingBottom: 0 }}>
      <style>{`
        .coyax-dark-closing-stats svg {
          display: none !important;
        }
        .coyax-dark-closing-stats .case-study-stat-strip {
          position: static !important;
          left: auto !important;
          transform: none !important;
          width: 100% !important;
          max-width: 100% !important;
          padding: 0 !important;
          overflow: visible;
          border: none !important;
        }
        .coyax-dark-closing-stats .case-study-stat-strip > div.hidden {
          justify-content: space-around !important;
        }
        .coyax-hero-stat-strip {
          overflow: visible;
          width: 100%;
          display: flex;
          justify-content: space-around;
        }
        .coyax-hero-stat-strip svg {
          display: none !important;
        }
        .coyax-hero-stat-strip .case-study-stat-strip {
          position: static !important;
          left: auto !important;
          transform: none !important;
          width: 100% !important;
          overflow: visible;
          border-top: 1px solid rgba(120, 113, 108, 0.35);
          border-bottom: 1px solid rgba(120, 113, 108, 0.35);
        }
        .coyax-hero-stat-strip .case-study-stat-strip > div.hidden {
          justify-content: space-around !important;
        }
        .coyax-case-study .case-study-stat-strip {
          position: static !important;
          left: auto !important;
          transform: none !important;
          width: 100% !important;
          max-width: 100% !important;
          padding: 24px 0 !important;
          overflow: visible;
        }
        .coyax-case-study .case-study-stat-strip > div.hidden {
          justify-content: space-around !important;
        }
        .coyax-cs-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #a8a29e;
          text-transform: uppercase;
          margin: 0 0 8px;
        }
        .coyax-cs-heading {
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 700;
          color: #0a0a0a;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .coyax-cs-body {
          font-size: 16px;
          line-height: 1.85;
          color: #44403c;
          max-width: 680px;
          margin: 0;
        }
        .coyax-cs-divider {
          border: none;
          border-top: 1px solid #f5f5f4;
          margin: 0;
        }
        .coyax-case-study button.coyax-state-pill,
        .coyax-case-study button.coyax-chip-btn {
          box-sizing: border-box;
        }
        .coyax-case-study section + .coyax-cs-divider,
        .coyax-case-study .coyax-cs-divider + section {
          margin: 0;
        }
        .coyax-card-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .coyax-card-grid--2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .coyax-card-grid--3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .coyax-card-grid--3-lg {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .coyax-scale-trio {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 1024px) {
          .coyax-scale-trio {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            align-items: start;
          }
        }
        .coyax-scale-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: #fafaf9;
          border: 1px solid #e7e5e4;
          border-radius: 10px;
          padding: 20px;
          height: 100%;
        }
        .coyax-scale-column .coyax-cs-label {
          margin-bottom: 4px;
        }
        .coyax-hero-composition {
          display: flex;
          width: 100%;
          height: 100%;
          background: #2a2a2a;
          overflow: hidden;
        }
        .coyax-hero-composition__brand {
          width: 36%;
          min-width: 280px;
          max-width: 420px;
          padding: clamp(20px, 4vw, 40px) clamp(16px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
          flex-shrink: 0;
        }
        .coyax-hero-composition__preview {
          flex: 1;
          min-width: 0;
          padding: clamp(14px, 2.5vw, 22px) clamp(14px, 2.5vw, 28px) clamp(14px, 2.5vw, 22px) 0;
          display: flex;
          align-items: stretch;
        }
        .coyax-hero-composition__app {
          flex: 1;
          min-width: 0;
          height: 100%;
          background: #ffffff;
          border: 1px solid #e7e5e4;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .coyax-hero-composition {
            flex-direction: column;
          }
          .coyax-hero-composition__brand {
            width: 100%;
            max-width: none;
            min-width: 0;
            padding: 20px 20px 12px;
          }
          .coyax-hero-composition__preview {
            padding: 0 16px 16px;
            min-height: 240px;
          }
        }
        .coyax-showcase-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 16px;
          align-items: start;
        }
        .coyax-showcase-grid > div {
          min-width: 0;
        }
        @media (min-width: 768px) {
          .coyax-showcase-grid {
            grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
          }
          .coyax-showcase-grid .coyax-showcase-span-2 {
            grid-column: span 2;
          }
        }
        .coyax-conflict-wrap {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .coyax-conflict-panel-left,
        .coyax-conflict-panel-right {
          flex: 1;
          padding: 20px 24px;
          background: #fafaf9;
          border: 1px solid #e7e5e4;
        }
        .coyax-conflict-panel-left {
          border-radius: 8px 8px 0 0;
        }
        .coyax-conflict-panel-right {
          border-radius: 0 0 8px 8px;
          border-top: none;
        }
        .coyax-conflict-divider {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          background: #fafaf9;
          border-left: 1px solid #e7e5e4;
          border-right: 1px solid #e7e5e4;
        }
        .coyax-conflict-badge {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
          border-radius: 9999px;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 600;
          text-align: center;
        }
        @media (min-width: 768px) {
          .coyax-conflict-wrap {
            flex-direction: row;
            gap: 2px;
          }
          .coyax-conflict-panel-left {
            border-radius: 8px 0 0 8px;
          }
          .coyax-conflict-panel-right {
            border-radius: 0 8px 8px 0;
            border-top: 1px solid #e7e5e4;
            border-left: none;
          }
          .coyax-conflict-divider {
            width: 2px;
            flex-shrink: 0;
            align-self: stretch;
            min-height: 120px;
            height: auto;
            background: #e7e5e4;
            border: none;
          }
          .coyax-conflict-badge {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            white-space: nowrap;
          }
        }
        .coyax-figma-panel-wrap {
          display: flex;
          flex-direction: column;
          border: 1px solid #e7e5e4;
          border-radius: 12px;
          overflow: hidden;
          min-height: 320px;
          width: 100%;
        }
        .coyax-figma-panel-sidebar {
          width: 100%;
          flex-shrink: 0;
          background: #fafaf9;
          border-bottom: 1px solid #e7e5e4;
          padding: 8px;
          display: flex;
          flex-direction: row;
          gap: 4px;
          overflow-x: auto;
        }
        .coyax-figma-panel-tab {
          white-space: nowrap;
        }
        @media (min-width: 768px) {
          .coyax-figma-panel-wrap {
            flex-direction: row;
          }
          .coyax-figma-panel-sidebar {
            width: 180px;
            flex-direction: column;
            border-bottom: none;
            border-right: 1px solid #e7e5e4;
            padding: 12px 0;
            overflow-x: visible;
          }
          .coyax-figma-panel-tab {
            white-space: normal;
          }
        }
        .coyax-live-token-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-bottom: 1px solid #f5f5f4;
          font-size: 13px;
          min-width: max-content;
        }
        .coyax-live-token-lookup-body {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        @media (min-width: 768px) {
          .coyax-live-token-row {
            min-width: 0;
            padding: 8px 0;
          }
          .coyax-live-token-lookup-body {
            overflow-x: visible;
          }
        }
        .raseet-hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          border: 1px solid #78716c;
          background: #78716c;
          color: #ffffff;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .raseet-hero-cta:hover {
          background: #57534e;
          border-color: #57534e;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(120, 113, 108, 0.28);
        }
        .raseet-hero-cta:active {
          background: #44403c;
          border-color: #44403c;
          transform: translateY(0px);
          box-shadow: 0 6px 14px rgba(120, 113, 108, 0.24);
        }
        @keyframes coyax-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .coyax-blink-cursor {
          animation: coyax-blink 0.7s step-end infinite;
        }
        .raseet-hero-cta:focus-visible {
          outline: 2px solid #78716c;
          outline-offset: 2px;
        }
        .raseet-hero-cta-arrow {
          transition: transform 0.2s ease;
        }
        .raseet-hero-cta:hover .raseet-hero-cta-arrow {
          transform: translate(2px, -2px);
        }
        .raseet-hero-cta--disabled,
        .raseet-hero-cta--disabled:hover,
        .raseet-hero-cta--disabled:active {
          background: #94a3b8;
          border-color: #94a3b8;
          color: #ffffff;
          transform: none;
          box-shadow: none;
          cursor: not-allowed;
          pointer-events: none;
        }
        .raseet-hero-cta--disabled:hover .raseet-hero-cta-arrow {
          transform: none;
        }
        .raseet-sidebar-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #78716c;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.5;
          transition: color 0.2s ease;
          text-decoration: none;
        }
        .raseet-sidebar-link-label {
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-color: rgba(120, 113, 108, 0.45);
          transition: text-decoration-color 0.2s ease;
        }
        .raseet-inline-link {
          color: #78716c;
          font-size: 15px;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-color: rgba(120, 113, 108, 0.45);
          transition: color 0.2s ease, text-decoration-color 0.2s ease;
        }
        .raseet-inline-link:hover {
          color: #57534e;
          text-decoration-color: rgba(21, 90, 116, 0.95);
        }
        .raseet-inline-link:active {
          color: #44403c;
        }
        .raseet-sidebar-link-arrow {
          transition: transform 0.2s ease;
        }
        .raseet-sidebar-link:hover {
          color: #57534e;
        }
        .raseet-sidebar-link:hover .raseet-sidebar-link-label {
          text-decoration-color: rgba(21, 90, 116, 0.95);
        }
        .raseet-sidebar-link:hover .raseet-sidebar-link-arrow {
          transform: translate(2px, -2px);
        }
        .raseet-sidebar-link:active {
          color: #44403c;
        }
        .raseet-sidebar-link--disabled,
        .raseet-sidebar-link--disabled:hover,
        .raseet-sidebar-link--disabled:active {
          color: #9ca3af;
          cursor: not-allowed;
          pointer-events: none;
        }
        .raseet-sidebar-link--disabled .raseet-sidebar-link-label {
          text-decoration-color: rgba(156, 163, 175, 0.45);
        }
        .raseet-sidebar-link--disabled:hover .raseet-sidebar-link-label {
          text-decoration-color: rgba(156, 163, 175, 0.45);
        }
        .raseet-sidebar-link--disabled:hover .raseet-sidebar-link-arrow {
          transform: none;
        }
        .raseet-impact-stats {
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          padding: 48px clamp(40px, 5vw, 72px);
          border-top: 1px solid rgba(120, 113, 108, 0.35);
          border-bottom: 1px solid rgba(120, 113, 108, 0.35);
          opacity: 1;
          transition: opacity 0.5s ease;
        }
        .raseet-impact-stats.is-visible {
          opacity: 1;
        }
        .raseet-impact-stat-value {
          color: #78716c;
          font-size: clamp(2.35rem, 4.8vw, 3rem);
          font-weight: 700;
          line-height: 1.15;
        }
        .raseet-impact-stat-label {
          color: #6b7280;
          font-size: 13px;
          line-height: 1.45;
          margin-top: 0.35rem;
        }
        @media (max-width: 767px) {
          .coyax-case-study section {
            padding-top: 48px !important;
            padding-bottom: 48px !important;
          }
          .coyax-case-study .coyax-cs-body {
            max-width: none;
            font-size: 18px;
            line-height: 1.85;
          }
          .coyax-case-study img,
          .coyax-case-study video,
          .coyax-case-study svg:not(.arrow-float-premium) {
            max-width: 100%;
            height: auto;
          }
          .coyax-showcase-grid > div {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          .coyax-terminal-block {
            max-width: 100%;
          }
          .coyax-terminal-body {
            max-width: 100%;
          }
          .coyax-terminal-body pre {
            white-space: pre-wrap;
            overflow-wrap: anywhere;
          }
          .coyax-quote-block {
            padding: 20px 16px !important;
            margin: 28px 0 !important;
          }
          .coyax-mid-build-note {
            flex-direction: column !important;
          }
          .coyax-before-after-row {
            flex-wrap: wrap;
            gap: 8px;
          }
          .coyax-figma-panel-tab {
            width: auto !important;
          }
          .coyax-dark-closing {
            padding: 40px 24px !important;
          }
          .coyax-dark-closing-heading {
            font-size: 22px !important;
            margin-bottom: 24px !important;
          }
          .raseet-impact-mobile-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .raseet-impact-mobile-item {
            text-align: center;
            padding: 16px;
          }
          .raseet-impact-mobile-item-last {
            grid-column: 1 / -1;
            text-align: center;
          }
        }
        video {
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
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
          document.body
        )}

      {/* Header Banner */}
      <div
        className="w-full relative overflow-hidden"
        style={{ height: 'clamp(300px, 42vw, 500px)', background: '#2a2a2a' }}
      >
        <CoyaxHeroComposition />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 md:gap-16">
          <div className="space-y-8 order-2 md:order-none">
            {icon ? (
              COYAX_LIVE_SITE_LINKS_ENABLED ? (
                <a
                  href={COYAX_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  style={{ width: 48, height: 48 }}
                  aria-label="Visit Coyax website"
                >
                  <ImageWithFallback
                    src={icon.startsWith('/') ? icon : `/${icon}`}
                    alt={`${company} logo`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }}
                  />
                </a>
              ) : (
                <div className="block" style={{ width: 48, height: 48 }}>
                  <ImageWithFallback
                    src={icon.startsWith('/') ? icon : `/${icon}`}
                    alt={`${company} logo`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }}
                  />
                </div>
              )
            ) : (
              <div className="block">
                <svg className="w-[48px] h-[48px]" viewBox="0 0 24 24" fill={headerColor}>
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </div>
            )}

            <div className="space-y-8">
              <div>
                <div className="text-gray-400 uppercase tracking-wider mb-2 text-[11px]">Company</div>
                <div className="text-gray-700 text-[18px] leading-relaxed">{company}</div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider mb-2 text-[11px]">My Deliverables</div>
                <div className="text-gray-700 text-[18px] leading-relaxed">{role}</div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider mb-2 text-[11px]">Team</div>
                <div className="text-gray-700 text-[18px] leading-relaxed">{team}</div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider mb-2 text-[11px]">When</div>
                <div className="text-gray-700 text-[18px] leading-relaxed">{when}</div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider mb-2 text-[11px]">Live Links</div>
                <div className="flex flex-col gap-2">
                  {COYAX_LIVE_SITE_LINKS_ENABLED ? (
                    <a
                      href={COYAX_WEBSITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="raseet-sidebar-link"
                    >
                      <span className="raseet-sidebar-link-label">Live Website</span>
                      <span className="raseet-sidebar-link-arrow">↗</span>
                    </a>
                  ) : (
                    <span
                      className="raseet-sidebar-link raseet-sidebar-link--disabled"
                      aria-disabled="true"
                    >
                      <span className="raseet-sidebar-link-label">Live Website</span>
                      <span className="raseet-sidebar-link-arrow">↗</span>
                    </span>
                  )}
                  {COYAX_FIGMA_LINK_ENABLED ? (
                    <a
                      href={COYAX_FIGMA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="raseet-sidebar-link"
                    >
                      <span className="raseet-sidebar-link-label">Coyax Figma</span>
                      <span className="raseet-sidebar-link-arrow">↗</span>
                    </a>
                  ) : (
                    <span
                      className="raseet-sidebar-link raseet-sidebar-link--disabled"
                      aria-disabled="true"
                    >
                      <span className="raseet-sidebar-link-label">Coyax Figma</span>
                      <span className="raseet-sidebar-link-arrow">↗</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button 
              onClick={onBack}
              className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors hidden md:block cursor-pointer"
            >
              ← Back to Work
            </button>
          </div>

          <div className="space-y-16 order-1 md:order-none">
            <div className="md:hidden">
              <button 
                onClick={onBack}
                className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              >
                ← Back to Work
              </button>
            </div>

            <div className="space-y-6">
              <h1 className="text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] font-bold text-gray-900 tracking-tight">
                {title}
              </h1>
              <p className="text-[26px] md:text-[28px] lg:text-[30px] text-gray-700 leading-relaxed font-medium">
                {subtitle}
              </p>

              {SHOW_PROJECT_OVERVIEW && overview && (
                <p className="text-[18px] md:text-[20px] text-gray-700 leading-[1.8]">
                  {overview}
                </p>
              )}
            </div>

            {/* Speed Read / Gist */}
            <div className="space-y-8">
              <div className="space-y-2 text-center">
                <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">Speed Read</h3>
                <p className="text-[18px] leading-[1.85] text-gray-700">In a rush? Here&apos;s the gist.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">Challenge</h4>
                  <p className="text-[18px] leading-[1.85] text-gray-700">{speedReadChallenge}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">Process</h4>
                  <p className="text-[18px] leading-[1.85] text-gray-700">{speedReadProcess}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">Takeaways</h4>
                  <p className="text-[18px] leading-[1.85] text-gray-700">{speedReadTakeaways}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">Impact</h4>
                  <p className="text-[18px] leading-[1.85] text-gray-700">{speedReadImpact}</p>
                </div>
              </div>
              <div className="space-y-4 pt-4 flex flex-col items-center text-center">
                <p className="text-[18px] leading-[1.85] text-gray-700">Have more time?</p>
                <p className="text-[16px] leading-relaxed text-gray-500">Click the arrow to read the entire case study.</p>
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
                      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))',
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
          className="space-y-16 mt-16"
          style={{ scrollMarginTop: 'var(--nav-height, 80px)', paddingBottom: 0, overflowX: 'hidden' }}
        >
          {(() => {
            const skipped = new Set<number>();
            return blocks.map((block, index) => {
            if (skipped.has(index)) return null;
            if (block.type === 'text') {
              const contentMargin =
                block.contentIndent !== undefined
                  ? getHeaderIndentMargin(block.contentIndent)
                  : block.indent
                    ? '2.5rem'
                    : undefined;
              const isMajorSectionHeader =
                block.header === 'Retrospectives' || block.header === 'Reflections';
              return (
                <Fragment key={index}>
                  {isMajorSectionHeader ? COYAX_CS_DIVIDER : null}
                  <div
                    className={`${isMajorSectionHeader && block.items?.length ? 'space-y-3' : 'space-y-6'} ${getAlignClass(block.align)}`}
                    style={isMajorSectionHeader ? COYAX_MAJOR_SECTION_PAD : undefined}
                  >
                  {block.header && (
                    <h3
                      className={isMajorSectionHeader ? 'coyax-cs-label' : 'text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium'}
                      style={
                        block.headerIndent !== undefined && block.headerIndent !== 0
                          ? { marginLeft: getHeaderIndentMargin(block.headerIndent) }
                          : undefined
                      }
                    >
                      {block.header}
                    </h3>
                  )}
                  {block.subheader && (
                    <h3
                      className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium"
                      style={
                        block.subheaderIndent !== undefined && block.subheaderIndent !== 0
                          ? { marginLeft: getHeaderIndentMargin(block.subheaderIndent) }
                          : undefined
                      }
                    >
                      {block.subheader}
                    </h3>
                  )}
                  {block.content ? (
                    <p
                      className="coyax-cs-body"
                      style={contentMargin ? { marginLeft: contentMargin } : undefined}
                    >
                      {block.content}
                    </p>
                  ) : null}
                  {block.items && block.items.length > 0 && (
                    <ul
                      className={block.header === 'Reflections' ? 'pl-6' : 'list-disc coyax-cs-body space-y-2 pl-6'}
                      style={
                        block.header === 'Reflections'
                          ? {
                              listStyleType: 'disc',
                              marginLeft: getListIndentMargin(block.itemsIndent ?? 0),
                              fontSize: 16,
                              lineHeight: 1.7,
                              color: '#44403c',
                              maxWidth: 680,
                            }
                          : {
                              marginLeft: getListIndentMargin(block.itemsIndent ?? 0),
                            }
                      }
                    >
                      {block.items.map((item, i) => (
                        <li
                          key={i}
                          style={block.header === 'Reflections' ? { marginTop: i > 0 ? 12 : 0, paddingLeft: 4 } : undefined}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                </Fragment>
              );
            }
            if (block.type === 'textBullets') {
              const listIndent = getListIndentMargin(getTextBulletsListIndentLevel(block));
              return (
                <div key={index} className={`space-y-6 ${getAlignClass(block.align)}`}>
                  {block.header && (
                    <h3
                      className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium"
                      style={
                        block.headerIndent !== undefined && block.headerIndent !== 0
                          ? { marginLeft: getHeaderIndentMargin(block.headerIndent) }
                          : undefined
                      }
                    >
                      {block.header}
                    </h3>
                  )}
                  {block.subheader && (
                    <h3
                      className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium"
                      style={
                        block.subheaderIndent !== undefined && block.subheaderIndent !== 0
                          ? { marginLeft: getHeaderIndentMargin(block.subheaderIndent) }
                          : undefined
                      }
                    >
                      {block.subheader}
                    </h3>
                  )}
                  <ul
                    className="space-y-2 coyax-cs-body pl-6"
                    style={{ listStyleType: 'disc', marginLeft: listIndent }}
                  >
                    {block.items.map((item, i) => (
                      <li key={i} className="pl-1">{item}</li>
                    ))}
                  </ul>
                </div>
              );
            }
            if (block.type === 'textImageRow') {
              const isVideo = block.src.endsWith('.mp4') || block.src.endsWith('.webm');
              const imageOnLeft = block.imageSide === 'left';
              const textCol = (
                <div key={`${index}-text`} className={`space-y-6 ${getAlignClass(block.align)}`}>
                  {block.header && (
                    <h3
                      className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium"
                      style={
                        block.headerIndent !== undefined && block.headerIndent !== 0
                          ? { marginLeft: getHeaderIndentMargin(block.headerIndent) }
                          : undefined
                      }
                    >
                      {block.header}
                    </h3>
                  )}
                  {block.subheader && (
                    <h3
                      className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium"
                      style={
                        block.subheaderIndent !== undefined && block.subheaderIndent !== 0
                          ? { marginLeft: getHeaderIndentMargin(block.subheaderIndent) }
                          : undefined
                      }
                    >
                      {block.subheader}
                    </h3>
                  )}
                  <p className="text-[18px] leading-[1.85] text-gray-700">{block.content}</p>
                  {block.items && block.items.length > 0 && (
                    <ul
                      className="space-y-2 text-[18px] leading-[1.85] text-gray-700 pl-6"
                      style={{
                        listStyleType: 'disc',
                        marginLeft: getListIndentMargin(block.itemsIndent),
                      }}
                    >
                      {block.items.map((item, i) => (
                        <li key={i} className="pl-1">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
              const imageContainerStyle = {
                ...(block.maxHeight ? { maxHeight: block.maxHeight } : { maxHeight: '120px' }),
                ...(block.maxWidth && { maxWidth: block.maxWidth }),
              };
              const imageMediaStyle = {
                ...(block.maxHeight ? { maxHeight: block.maxHeight } : { maxHeight: '120px' }),
                ...(block.maxWidth && { maxWidth: block.maxWidth }),
              };
              const imageCol = (
                <div key={`${index}-img`} className={`w-full overflow-hidden rounded-lg ${getBlockAlignClass(block.imageAlign)}`} style={imageContainerStyle}>
                  {isVideo ? (
                    <LoopingVideo src={block.src} className="w-full h-full max-w-full object-contain rounded-lg" style={imageMediaStyle} />
                  ) : (
                    <ImageWithFallback src={block.src} alt={`${title} - ${index + 1}`} className="w-full h-full max-w-full object-contain rounded-lg" style={imageMediaStyle} />
                  )}
                </div>
              );
              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                  {imageOnLeft ? [imageCol, textCol] : [textCol, imageCol]}
                </div>
              );
            }
            if (block.type === 'textTextRow') {
              const alignClass = getAlignClass(block.align);
              const headerLeft = block.headerLeft ?? '';
              const headerRight = block.headerRight ?? '';
              const leftBothEmpty = !headerLeft.trim() && !block.contentLeft.trim();
              const rightBothEmpty = !headerRight.trim() && !block.contentRight.trim();
              const hideLeftOnMobile = !block.contentLeft.trim();
              const hideRightOnMobile = !block.contentRight.trim();
              const onlyRightColumn = leftBothEmpty && !rightBothEmpty;
              const onlyLeftColumn = rightBothEmpty && !leftBothEmpty;

              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                  {!leftBothEmpty && (
                    <div
                      className={`space-y-6 ${alignClass} ${hideLeftOnMobile ? 'hidden md:block' : ''} ${onlyLeftColumn ? 'md:col-span-2' : ''}`}
                    >
                      {headerLeft ? (
                        <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                          {headerLeft}
                        </h3>
                      ) : null}
                      {block.contentLeft ? (
                        <p className="text-[18px] leading-[1.85] text-gray-700">{block.contentLeft}</p>
                      ) : null}
                    </div>
                  )}
                  {!rightBothEmpty && (
                    <div
                      className={`space-y-6 ${alignClass} ${hideRightOnMobile ? 'hidden md:block' : ''} ${onlyRightColumn ? 'md:col-span-2' : ''}`}
                    >
                      {headerRight ? (
                        <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                          {headerRight}
                        </h3>
                      ) : null}
                      {block.contentRight ? (
                        <p className="text-[18px] leading-[1.85] text-gray-700">{block.contentRight}</p>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            }
            if (block.type === 'video') {
              /* if (block.group === 'mosaic4') {
                const second = blocks[index + 1];
                const third = blocks[index + 2];
                const fourth = blocks[index + 3];
                const hasMosaicFour =
                  second && second.type === 'video' && second.group === 'mosaic4' &&
                  third && third.type === 'video' && third.group === 'mosaic4' &&
                  fourth && fourth.type === 'video' && fourth.group === 'mosaic4';
                if (hasMosaicFour) {
                  skipped.add(index + 1);
                  skipped.add(index + 2);
                  skipped.add(index + 3);
                  const styleOne = block.maxHeight ? { maxHeight: block.maxHeight, objectFit: 'contain' as const } : undefined;
                  const styleTwo = second.maxHeight ? { maxHeight: second.maxHeight, objectFit: 'contain' as const } : undefined;
                  const styleThree = third.maxHeight ? { maxHeight: third.maxHeight, objectFit: 'contain' as const } : undefined;
                  const styleFour = fourth.maxHeight ? { maxHeight: fourth.maxHeight, objectFit: 'contain' as const } : undefined;
                  return (
                    <SyncedLoopingVideoMosaic
                      key={index}
                      iphoneVideos={[
                        { src: block.src, style: styleOne },
                        { src: fourth.src, style: styleFour },
                      ]}
                      ipadVideos={[
                        { src: second.src, style: styleTwo },
                        { src: third.src, style: styleThree },
                      ]}
                    />
                  );
                }
              } */
              if (block.group === 'row3') {
                const second = blocks[index + 1];
                const third = blocks[index + 2];
                const previous = blocks[index - 1];
                const isConsecutiveRowThree = previous && previous.type === 'video' && previous.group === 'row3';
                const hasRowThree =
                  second && second.type === 'video' && second.group === 'row3' &&
                  third && third.type === 'video' && third.group === 'row3';
                if (hasRowThree) {
                  skipped.add(index + 1);
                  skipped.add(index + 2);
                  const iphoneOnlyRow3 = isRaseetIphoneOnlyRow3Triplet(block, second, third);
                  const row3VideoStyle = (b: typeof block) =>
                    iphoneOnlyRow3
                      ? undefined
                      : b.maxHeight
                        ? { maxHeight: b.maxHeight, objectFit: 'contain' as const }
                        : undefined;
                  return (
                    <SyncedLoopingVideoRow
                      key={index}
                      columnsClassName={`flex flex-col md:flex-row md:flex-nowrap gap-6 md:h-[500px] md:items-center justify-center md:justify-center ${isConsecutiveRowThree ? 'mt-12 md:mt-20' : ''}`}
                      itemClassName="h-full flex justify-center items-center"
                      videoClassName="h-full w-auto"
                      videos={[
                        { src: block.src, style: row3VideoStyle(block) },
                        { src: second.src, style: row3VideoStyle(second) },
                        { src: third.src, style: row3VideoStyle(third) },
                      ]}
                    />
                  );
                }
              }
              if (block.group === 'row') {
                const next = blocks[index + 1];
                const nextIsRowVideo = next && next.type === 'video' && next.group === 'row';
                if (nextIsRowVideo) {
                  skipped.add(index + 1);
                  const videoStyle = block.maxHeight ? { maxHeight: block.maxHeight, objectFit: 'contain' as const } : undefined;
                  const nextVideoStyle = next.maxHeight ? { maxHeight: next.maxHeight, objectFit: 'contain' as const } : undefined;
                  return (
                    <SyncedLoopingVideoRow
                      key={index}
                      columnsClassName="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
                      videos={[
                        { src: block.src, style: videoStyle },
                        { src: next.src, style: nextVideoStyle },
                      ]}
                    />
                  );
                }
              }
              const marginLeft = block.indentLevel === 2 ? '5rem' : block.indent ? '2.5rem' : undefined;
              const containerStyle = {
                ...(marginLeft && { marginLeft, maxWidth: marginLeft === '5rem' ? 'calc(100% - 5rem)' : 'calc(100% - 2.5rem)' }),
                ...(block.maxHeight && { maxHeight: block.maxHeight, overflow: 'hidden' as const }),
              };
              const videoStyle = block.maxHeight ? { maxHeight: block.maxHeight, objectFit: 'contain' as const } : undefined;
              return (
                <div key={index} className={`w-full flex ${block.align === 'center' ? 'justify-center' : block.align === 'right' ? 'justify-end' : 'justify-start'}`} style={containerStyle}>
                  <LoopingVideo src={block.src} className="w-full h-auto max-w-full" style={videoStyle} />
                </div>
              );
            }
            if (block.type === 'raseetAccessibilitySection') {
              return null;
            }
            if (block.type === 'goalsVenn') {
              return (
                <div key={index} className="w-full flex flex-col items-center py-8">
                  <div className="w-full max-w-[600px]">
                    <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                      {/* Business circle */}
                      <circle
                        cx="220"
                        cy="160"
                        r="130"
                        fill="#78716c"
                        fillOpacity="0.12"
                        stroke="#78716c"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                      />
                      {/* User circle */}
                      <circle
                        cx="380"
                        cy="160"
                        r="130"
                        fill="#78716c"
                        fillOpacity="0.12"
                        stroke="#78716c"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                      />
                      {/* Shared overlap highlight */}
                      <ellipse cx="300" cy="160" rx="55" ry="95" fill="#78716c" fillOpacity="0.25" />

                      {/* Business label */}
                      <text x="165" y="120" textAnchor="middle" fill="#78716c" fontSize="13" fontWeight="700" fontFamily="inherit">
                        Business
                      </text>
                      <text x="165" y="138" textAnchor="middle" fill="#374151" fontSize="11" fontFamily="inherit">
                        Revenue growth
                      </text>
                      <text x="165" y="154" textAnchor="middle" fill="#374151" fontSize="11" fontFamily="inherit">
                        Repeat orders
                      </text>
                      <text x="165" y="170" textAnchor="middle" fill="#374151" fontSize="11" fontFamily="inherit">
                        Partner retention
                      </text>
                      <text x="165" y="186" textAnchor="middle" fill="#374151" fontSize="11" fontFamily="inherit">
                        Operational scale
                      </text>

                      {/* Shared label */}
                      <text x="300" y="143" textAnchor="middle" fill="#78716c" fontSize="12" fontWeight="700" fontFamily="inherit">
                        Shared
                      </text>
                      <text x="300" y="160" textAnchor="middle" fill="#78716c" fontSize="10" fontFamily="inherit">
                        Trust
                      </text>
                      <text x="300" y="175" textAnchor="middle" fill="#78716c" fontSize="10" fontFamily="inherit">
                        Simplicity
                      </text>
                      <text x="300" y="190" textAnchor="middle" fill="#78716c" fontSize="10" fontFamily="inherit">
                        Access
                      </text>

                      {/* User label */}
                      <text x="435" y="120" textAnchor="middle" fill="#78716c" fontSize="13" fontWeight="700" fontFamily="inherit">
                        User
                      </text>
                      <text x="435" y="138" textAnchor="middle" fill="#374151" fontSize="11" fontFamily="inherit">
                        Easy refills
                      </text>
                      <text x="435" y="154" textAnchor="middle" fill="#374151" fontSize="11" fontFamily="inherit">
                        Clear status
                      </text>
                      <text x="435" y="170" textAnchor="middle" fill="#374151" fontSize="11" fontFamily="inherit">
                        Trusted platform
                      </text>
                      <text x="435" y="186" textAnchor="middle" fill="#374151" fontSize="11" fontFamily="inherit">
                        Low friction
                      </text>
                    </svg>
                  </div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '12px', textAlign: 'center' }}>
                    Design decisions were evaluated against all three goal sets, prioritizing the overlap.
                  </p>
                </div>
              );
            }
            if (block.type === 'keyDesignDecisions') {
              return (
                <div key={index} className="w-full space-y-6">
                  <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                    Key Design Decisions
                  </h3>
                  <p className="text-[18px] leading-[1.85] text-gray-700">
                    Four moments that fundamentally shaped the product.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        number: '01',
                        decision: 'Trust over aesthetics',
                        context:
                          'Research showed trust was the single biggest barrier, not price, not selection.',
                        action:
                          'Replaced generic "Proceed to pay" with "Secure checkout". Added verified pharmacy badges, batch numbers, and explicit data security messaging throughout every flow.',
                        outcome: '68% monthly retention vs 40-50% industry average.',
                      },
                      {
                        number: '02',
                        decision: 'Accessibility forced a complete rebuild',
                        context:
                          'First chronic care design was modern and minimalistic, following typical SaaS patterns.',
                        action:
                          "Usability testing with 15 elderly patients revealed they couldn't navigate or read critical medication information. Rebuilt entirely: larger text, high contrast, fewer steps, guided mode.",
                        outcome: '45% increase in customer lifetime value. 2,000+ chronic patients served.',
                      },
                      {
                        number: '03',
                        decision: 'The drop-off was a trust problem, not a UX problem',
                        context:
                          'Mixpanel showed 40% prescription upload drop-off. Initial assumption was the interface was too complex.',
                        action:
                          'Session recordings revealed users were scared, confused about which documents to upload and worried about privacy. Fixed with messaging: "Your data is encrypted", "Verified by licensed pharmacists". Then simplified from 4 steps to 2.',
                        outcome: '40% drop-off → eventually single digits through continued iteration.',
                      },
                      {
                        number: '04',
                        decision: 'Ship in a week or lose the revenue',
                        context:
                          'Mixpanel flagged significant payment page dropouts on a Monday morning.',
                        action:
                          'Monday: identified via analytics. Tuesday: session recordings + usability tests. Wednesday: modal-based redesign with engineers. Thursday: Figma prototypes + A/B tests. Friday: final implementation. Following Monday: live.',
                        outcome: 'Cart abandonment noticeably reduced. 5 steps → 3 steps. Shipped in 7 days.',
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          borderTop: '3px solid #78716c',
                          padding: '24px',
                          background: 'rgba(120, 113, 108, 0.03)',
                          borderRadius: '0 0 8px 8px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#78716c',
                            letterSpacing: '0.15em',
                            marginBottom: '8px',
                          }}
                        >
                          {item.number}
                        </div>
                        <div
                          style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: '#111827',
                            marginBottom: '16px',
                            lineHeight: 1.3,
                          }}
                        >
                          {item.decision}
                        </div>
                        <div
                          style={{
                            fontSize: '0.85rem',
                            color: '#6b7280',
                            marginBottom: '8px',
                            lineHeight: 1.6,
                          }}
                        >
                          <span style={{ fontWeight: 600, color: '#374151' }}>Context: </span>
                          {item.context}
                        </div>
                        <div
                          style={{
                            fontSize: '0.85rem',
                            color: '#6b7280',
                            marginBottom: '8px',
                            lineHeight: 1.6,
                          }}
                        >
                          <span style={{ fontWeight: 600, color: '#374151' }}>Decision: </span>
                          {item.action}
                        </div>
                        <div
                          style={{
                            fontSize: '0.85rem',
                            color: '#78716c',
                            fontWeight: 600,
                            lineHeight: 1.6,
                            paddingTop: '8px',
                            borderTop: '1px solid rgba(120, 113, 108, 0.15)',
                          }}
                        >
                          {item.outcome}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            if (block.type === 'beforeAfter') {
              const comparisons = [
                {
                  title: 'Payment Flow',
                  metric: 'Cart abandonment noticeably reduced',
                  beforeScreens: [
                    { src: '/raseet/bef-af/bef/Cart.png', label: 'Cart' },
                    { src: '/raseet/bef-af/bef/Map%20view%20order.png', label: 'Delivery' },
                    { src: '/raseet/bef-af/bef/Place%20Order%20Step%201.png', label: 'Payment' },
                  ],
                  afterScreens: [
                    { src: '/raseet/bef-af/aft/mycart.png', label: 'Cart' },
                    { src: '/raseet/bef-af/aft/payment%20screen.png', label: 'Payment' },
                    { src: '/raseet/bef-af/aft/order%20placed.png', label: 'Confirmed' },
                  ],
                  before: {
                    steps: [
                      'Review cart',
                      'Select delivery address',
                      'Choose delivery slot',
                      'Enter payment details',
                      'Confirm order',
                    ],
                    note: 'Significant dropouts at payment step',
                  },
                  after: {
                    steps: ['Review cart', 'Confirm address + slot', 'Pay and confirm'],
                    note: 'Cart abandonment noticeably reduced',
                  },
                },
                {
                  title: 'Onboarding Flow',
                  metric: '0 → 21,000+ users. 68% retention.',
                  beforeScreens: [
                    { src: '/raseet/bef-af/bef/Mobile%20Entry.png', label: 'Phone Entry' },
                    { src: '/raseet/bef-af/bef/Screen%20after%20sign%20up.png', label: 'Success' },
                  ],
                  afterScreens: [
                    { src: '/raseet/bef-af/aft/Splash.png', label: 'Splash' },
                    { src: '/raseet/bef-af/aft/Phone-1.png', label: 'Phone Entry' },
                    { src: '/raseet/bef-af/aft/Welcome.png', label: 'Welcome' },
                  ],
                  before: {
                    steps: [
                      'Enter phone number',
                      'Verify OTP',
                      'Age verification',
                      'Biometric scan',
                      'Profile setup',
                      'Welcome screen',
                    ],
                    note: 'Long flow with multiple friction points',
                  },
                  after: {
                    steps: ['Enter phone', 'Verify OTP', 'Welcome'],
                    note: 'Streamlined to 3 steps. Drop-offs reduced significantly.',
                  },
                },
              ];

              return (
                <div key={index} className="w-full space-y-16">
                  <div>
                    <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium mb-4">
                      Before vs After
                    </h3>
                    <p className="text-[18px] leading-[1.85] text-gray-700">
                      Two flows that were quietly losing users - and what changed.
                    </p>
                  </div>
                  {comparisons.map((comp, ci) => {
                    const beforeLbImages = comp.beforeScreens.map((s) => ({
                      src: s.src,
                      alt: s.label,
                      caption: s.label,
                    }));
                    const afterLbImages = comp.afterScreens.map((s) => ({
                      src: s.src,
                      alt: s.label,
                      caption: s.label,
                    }));
                    return (
                    <div key={ci} className="w-full space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>{comp.title}</h4>
                        <span
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: '#78716c',
                            background: 'rgba(26,107,138,0.08)',
                            padding: '4px 12px',
                            borderRadius: '100px',
                          }}
                        >
                          {comp.metric}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#ef4444',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              marginBottom: '12px',
                            }}
                          >
                            Before
                          </p>
                          <div className="flex gap-4 overflow-x-auto pb-2">
                            {comp.beforeScreens.map((screen, si) => (
                              <div key={si} className="flex flex-col items-center gap-2 flex-shrink-0">
                                <img
                                  src={screen.src}
                                  alt={screen.label}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openLightbox(beforeLbImages, si);
                                  }}
                                  style={{
                                    height: '300px',
                                    width: 'auto',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(239,68,68,0.15)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                    filter: 'grayscale(25%) opacity(0.85)',
                                    cursor: 'zoom-in',
                                  }}
                                />
                                <span style={{ fontSize: '11px', color: '#9ca3af' }}>{screen.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#78716c',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              marginBottom: '12px',
                            }}
                          >
                            After
                          </p>
                          <div className="flex gap-4 overflow-x-auto pb-2">
                            {comp.afterScreens.map((screen, si) => (
                              <div key={si} className="flex flex-col items-center gap-2 flex-shrink-0">
                                <img
                                  src={screen.src}
                                  alt={screen.label}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openLightbox(afterLbImages, si);
                                  }}
                                  style={{
                                    height: '300px',
                                    width: 'auto',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(26,107,138,0.15)',
                                    boxShadow: '0 4px 16px rgba(26,107,138,0.12)',
                                    cursor: 'zoom-in',
                                  }}
                                />
                                <span style={{ fontSize: '11px', color: '#78716c', fontWeight: 600 }}>
                                  {screen.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          style={{
                            border: '1px solid rgba(239,68,68,0.2)',
                            borderTop: '3px solid #ef4444',
                            borderRadius: '0 0 8px 8px',
                            padding: '20px',
                            background: 'rgba(239,68,68,0.02)',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#ef4444',
                              letterSpacing: '0.15em',
                              marginBottom: '16px',
                            }}
                          >
                            BEFORE
                          </div>
                          <div className="space-y-2">
                            {comp.before.steps.map((step, si) => (
                              <div key={si} className="flex items-start gap-3">
                                <div
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: 'rgba(239,68,68,0.1)',
                                    border: '1px solid rgba(239,68,68,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    color: '#ef4444',
                                    flexShrink: 0,
                                    marginTop: '2px',
                                  }}
                                >
                                  {si + 1}
                                </div>
                                <span style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.5 }}>
                                  {step}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div
                            style={{
                              marginTop: '16px',
                              paddingTop: '12px',
                              borderTop: '1px solid rgba(239,68,68,0.15)',
                              fontSize: '0.8rem',
                              color: '#ef4444',
                              fontWeight: 500,
                            }}
                          >
                            {comp.before.note}
                          </div>
                        </div>
                        <div
                          style={{
                            border: '1px solid rgba(26,107,138,0.2)',
                            borderTop: '3px solid #78716c',
                            borderRadius: '0 0 8px 8px',
                            padding: '20px',
                            background: 'rgba(26,107,138,0.02)',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#78716c',
                              letterSpacing: '0.15em',
                              marginBottom: '16px',
                            }}
                          >
                            AFTER
                          </div>
                          <div className="space-y-2">
                            {comp.after.steps.map((step, si) => (
                              <div key={si} className="flex items-start gap-3">
                                <div
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: 'rgba(26,107,138,0.1)',
                                    border: '1px solid rgba(26,107,138,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    color: '#78716c',
                                    flexShrink: 0,
                                    marginTop: '2px',
                                  }}
                                >
                                  {si + 1}
                                </div>
                                <span style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.5 }}>
                                  {step}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div
                            style={{
                              marginTop: '16px',
                              paddingTop: '12px',
                              borderTop: '1px solid rgba(26,107,138,0.15)',
                              fontSize: '0.8rem',
                              color: '#78716c',
                              fontWeight: 500,
                            }}
                          >
                            {comp.after.note}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                  })}
                </div>
              );
            }
            if (block.type === 'accessibilityContrast') {
              const accOldScreens = [
                { src: '/raseet/bef-af/bef/Home.png', label: 'Home - dense, hard to scan' },
                { src: '/raseet/bef-af/bef/Category.png', label: 'Browse - small text, no hierarchy' },
              ];
              const accNewScreens = [
                {
                  src: '/raseet/bef-af/aft/homescreen-.png',
                  label: 'Home - clear hierarchy, larger text',
                },
                {
                  src: '/raseet/bef-af/aft/Search%20med.png',
                  label: 'Browse - accessible, spacious layout',
                },
              ];
              const accOldLb = accOldScreens.map((s) => ({ src: s.src, alt: s.label, caption: s.label }));
              const accNewLb = accNewScreens.map((s) => ({ src: s.src, alt: s.label, caption: s.label }));
              return (
                <div key={index} className="w-full space-y-6">
                  <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                    The Problem We Discovered
                  </h3>
                  <p className="text-[18px] leading-[1.85] text-gray-700">
                    Our first design followed standard SaaS patterns - compact, modern, information-dense. Usability
                    testing with 15 elderly chronic care patients revealed they couldn&apos;t navigate it.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#ef4444',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Old Design - What Failed
                      </p>
                      <div className="flex gap-4">
                        {accOldScreens.map((screen, i) => (
                          <div key={i} className="flex min-w-0 flex-1 flex-col gap-3">
                            <div
                              className="flex w-full items-center justify-center overflow-hidden rounded-xl"
                              style={{
                                aspectRatio: '860 / 1864',
                                border: '1px solid rgba(239,68,68,0.15)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                              }}
                            >
                              <img
                                src={screen.src}
                                alt={screen.label}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openLightbox(accOldLb, i);
                                }}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain',
                                  filter: 'grayscale(30%) opacity(0.8)',
                                  cursor: 'zoom-in',
                                }}
                              />
                            </div>
                            <p
                              style={{
                                fontSize: '11px',
                                color: '#c53030',
                                lineHeight: 1.4,
                                fontWeight: 500,
                              }}
                            >
                              {screen.label}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          padding: '16px',
                          background: 'rgba(239,68,68,0.04)',
                          border: '1px solid rgba(239,68,68,0.15)',
                          borderRadius: '8px',
                        }}
                      >
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ef4444', marginBottom: '8px' }}>
                          What testing revealed
                        </p>
                        <ul
                          style={{
                            fontSize: '0.85rem',
                            color: '#374151',
                            lineHeight: 1.7,
                            listStyleType: 'disc',
                            paddingLeft: '16px',
                          }}
                        >
                          <li>Elderly patients couldn&apos;t read medication names at default size</li>
                          <li>Compact rows made it impossible to distinguish items</li>
                          <li>No visual hierarchy between critical and secondary info</li>
                          <li>Touch targets too small for users with limited motor control</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#78716c',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        New Design - What We Rebuilt
                      </p>
                      <div className="flex gap-4">
                        {accNewScreens.map((screen, i) => (
                          <div key={i} className="flex flex-col gap-2 flex-1">
                            <img
                              src={screen.src}
                              alt={screen.label}
                              onClick={(e) => {
                                e.stopPropagation();
                                openLightbox(accNewLb, i);
                              }}
                              style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '12px',
                                border: '1px solid rgba(26,107,138,0.2)',
                                boxShadow: '0 4px 16px rgba(26,107,138,0.12)',
                                cursor: 'zoom-in',
                              }}
                            />
                            <p
                              style={{
                                fontSize: '11px',
                                color: '#78716c',
                                lineHeight: 1.4,
                                fontWeight: 500,
                              }}
                            >
                              {screen.label}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          padding: '16px',
                          background: 'rgba(26,107,138,0.04)',
                          border: '1px solid rgba(26,107,138,0.15)',
                          borderRadius: '8px',
                        }}
                      >
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#78716c', marginBottom: '8px' }}>
                          What we rebuilt
                        </p>
                        <ul
                          style={{
                            fontSize: '0.85rem',
                            color: '#374151',
                            lineHeight: 1.7,
                            listStyleType: 'disc',
                            paddingLeft: '16px',
                          }}
                        >
                          <li>Significantly larger text throughout</li>
                          <li>High contrast color schemes (WCAG 2.2 AA)</li>
                          <li>44px minimum touch targets on all interactions</li>
                          <li>Guided step-by-step mode for chronic care flows</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            if (block.type === 'productShowcase') {
              const keyFeatureCards = [
                {
                  src: '/raseet/bef-af/aft/mycart.png',
                  feature: 'One-Tap Checkout',
                  desc: 'Reduced from 5 steps to 3. Returning users complete orders in under 2 minutes with saved addresses and one-click payment.',
                },
                {
                  src: '/raseet/bef-af/aft/meds-reminder.png',
                  feature: 'Medication Reminders',
                  desc: 'Smart notifications triggered by prescription end dates. One-tap refill directly from the notification reduced chronic patient drop-offs significantly.',
                },
                {
                  src: '/raseet/bef-af/aft/Upload%20Rx.png',
                  feature: 'Prescription Upload',
                  desc: 'Redesigned from 4 steps to 2. Added trust indicators and clear guidance. Drop-off rate went from 40% to single digits.',
                },
                {
                  src: '/raseet/bef-af/aft/pharma-chat.png',
                  feature: 'Pharmacist Chat',
                  desc: 'Direct messaging with verified pharmacists built trust for first-time users and reduced support tickets by giving customers a human touchpoint.',
                },
              ];
              const keyFeatureLb = keyFeatureCards.map((item) => ({
                src: item.src,
                alt: item.feature,
                caption: item.feature,
              }));
              return (
                <div key={index} className="w-full space-y-6">
                  <div>
                    <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium mb-4">Key Features</h3>
                    <p className="text-[18px] leading-[1.85] text-gray-700">Four features that defined the product experience.</p>
                  </div>

                  <div className="w-full min-w-0">
                    <div
                      className="hidden w-full md:grid"
                      style={{ gridTemplateColumns: '1fr 1px 1fr', gap: '0 48px' }}
                    >
                      {keyFeatureCards.map((item, i) => (
                        <>
                          <div key={`kf-${i}`} className="flex min-w-0 flex-col py-4 text-left">
                            <p className="text-[80px] font-extralight leading-none text-gray-200">
                              {String(i + 1).padStart(2, '0')}
                            </p>
                            <p className="mt-2 text-[18px] font-semibold text-gray-900">{item.feature}</p>
                            <p className="mt-2 text-[15px] leading-relaxed text-gray-500">{item.desc}</p>
                            <img
                              src={item.src}
                              alt={item.feature}
                              onClick={(e) => { e.stopPropagation(); openLightbox(keyFeatureLb, i); }}
                              className="mt-4 cursor-zoom-in self-start object-contain"
                              style={{ height: '500px', width: 'auto', maxWidth: '250px' }}
                            />
                          </div>
                          {i % 2 === 0 && (
                            <div key={`divider-${i}`} className="bg-gray-200 w-px" />
                          )}
                        </>
                      ))}
                    </div>
                    {/* Mobile: single column */}
                    <div className="flex flex-col gap-12 md:hidden">
                      {keyFeatureCards.map((item, i) => (
                        <div key={`kf-mob-${i}`} className="flex min-w-0 flex-col text-left">
                          <p className="text-[64px] font-extralight leading-none text-gray-200 sm:text-[80px]">
                            {String(i + 1).padStart(2, '0')}
                          </p>
                          <p className="mt-2 text-[18px] font-semibold text-gray-900">{item.feature}</p>
                          <p className="mt-2 text-[15px] leading-relaxed text-gray-500">{item.desc}</p>
                          <img
                            src={item.src}
                            alt={item.feature}
                            onClick={(e) => { e.stopPropagation(); openLightbox(keyFeatureLb, i); }}
                            className="mt-4 cursor-zoom-in self-start object-contain"
                            style={{ height: '280px', width: 'auto', maxWidth: '140px' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            if (block.type === 'onboardingStory') {
              const onboardingScreens = [
                {
                  src: '/raseet/bef-af/aft/Mobile.png',
                  label: '1. Brand entry point',
                  desc: 'Clear brand identity from first launch',
                },
                {
                  src: '/raseet/bef-af/aft/Phone-1.png',
                  label: '2. Phone verification',
                  desc: 'Simple auth - no password to remember',
                },
                {
                  src: '/raseet/bef-af/aft/Phone-2.png',
                  label: '3. OTP verification',
                  desc: 'Secure but frictionless',
                },
                {
                  src: '/raseet/bef-af/aft/Welcome.png',
                  label: '4. Welcome moment',
                  desc: 'Warm confirmation that builds trust immediately',
                },
              ];
              const onboardingLb = onboardingScreens.map((s) => ({
                src: s.src,
                alt: s.label,
                caption: s.label,
              }));
              return (
                <div key={index} className="w-full space-y-6">
                  <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">Patient Onboarding</h3>
                  <p className="text-[18px] leading-[1.85] text-gray-700">
                    Getting patients from zero to their first order - with trust built at every step.
                  </p>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {onboardingScreens.map((screen, i) => (
                      <div key={i} className="flex flex-col gap-3 flex-1">
                        <img
                          src={screen.src}
                          alt={screen.label}
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(onboardingLb, i);
                          }}
                          style={{
                            width: '100%',
                            maxWidth: '200px',
                            height: 'auto',
                            borderRadius: '16px',
                            border: '1px solid rgba(26,107,138,0.15)',
                            boxShadow: '0 4px 20px rgba(26,107,138,0.1)',
                            cursor: 'zoom-in',
                          }}
                        />
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{screen.label}</p>
                          <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{screen.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            if (block.type === 'image') {
              const raseetNative = renderRaseetFinalImage(block.src);
              if (raseetNative) {
                const marginLeft =
                  block.indentLevel === 2 ? '5rem' : block.indent ? '2.5rem' : undefined;
                const containerStyle = {
                  ...(marginLeft && {
                    marginLeft,
                    maxWidth: marginLeft === '5rem' ? 'calc(100% - 5rem)' : 'calc(100% - 2.5rem)',
                  }),
                };
                return (
                  <div
                    key={index}
                    className={`w-full flex ${block.align === 'center' ? 'justify-center' : block.align === 'right' ? 'justify-end' : 'justify-start'}`}
                    style={containerStyle}
                  >
                    <div className="w-full max-w-full">{raseetNative}</div>
                  </div>
                );
              }
              if (block.group === 'row') {
                const next = blocks[index + 1];
                const nextIsRowImage = next && next.type === 'image' && next.group === 'row';
                if (nextIsRowImage) {
                  skipped.add(index + 1);
                  const sharedHeight = block.maxHeight ?? next.maxHeight ?? '500px';
                  return (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <div className="w-full flex justify-start">
                        <ImageWithFallback
                          src={block.src}
                          alt={`${title} - ${index + 1}`}
                          className="w-full max-w-full object-contain"
                          style={{ height: sharedHeight }}
                        />
                      </div>
                      <div className="w-full flex justify-start">
                        <ImageWithFallback
                          src={next.src}
                          alt={`${title} - ${index + 2}`}
                          className="w-full max-w-full object-contain"
                          style={{ height: sharedHeight }}
                        />
                      </div>
                    </div>
                  );
                }
              }
              const isVideo = block.src.endsWith('.mp4') || block.src.endsWith('.webm');
              const marginLeft = block.indentLevel === 2 ? '5rem' : block.indent ? '2.5rem' : undefined;
              const containerStyle = {
                ...(marginLeft && { marginLeft, maxWidth: marginLeft === '5rem' ? 'calc(100% - 5rem)' : 'calc(100% - 2.5rem)' }),
                ...(block.maxHeight && { maxHeight: block.maxHeight, overflow: 'hidden' as const }),
              };
              const mediaStyle = block.maxHeight ? { maxHeight: block.maxHeight, objectFit: 'contain' as const } : undefined;
              return (
                <div key={index} className={`w-full flex ${block.align === 'center' ? 'justify-center' : block.align === 'right' ? 'justify-end' : 'justify-start'}`} style={containerStyle}>
                  {isVideo ? (
                    <LoopingVideo src={block.src} className="w-full h-auto max-w-full" style={mediaStyle} />
              ) : (
                    <ImageWithFallback src={block.src} alt={`${title} - ${index + 1}`} className="w-full h-auto max-w-full" style={mediaStyle} />
              )}
            </div>
              );
            }
            if (block.type === 'imageCaption') {
              const mediaStyle = block.maxHeight ? { maxHeight: block.maxHeight, objectFit: 'contain' as const } : undefined;
              return (
                <div key={index} className="space-y-3">
                  <div className="w-full flex justify-start">
                    <ImageWithFallback src={block.src} alt={`${title} - ${index + 1}`} className="w-full h-auto max-w-full" style={mediaStyle} />
                  </div>
                  <p className="text-[13px] text-gray-500">{block.caption}</p>
                </div>
              );
            }
            if (block.type === 'externalLink') {
              const alignClass =
                block.align === 'center'
                  ? 'justify-center'
                  : block.align === 'right'
                    ? 'justify-end'
                    : 'justify-start';
              if (block.variant === 'button') {
                return (
                  <div key={index} className={`w-full flex ${alignClass}`}>
                    <a
                      href={block.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-3 border border-[#78716c] text-[#78716c] text-[14px] font-bold hover:bg-[#78716c] hover:text-white transition-colors"
                    >
                      {block.label}
                    </a>
                  </div>
                );
              }
              return (
                <div key={index} className={`w-full flex ${alignClass}`}>
                  <a
                    href={block.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="raseet-inline-link"
                  >
                    {block.label}
                  </a>
                </div>
              );
            }
            if (block.type === 'impactStatsInline') {
              return null;
            }
            if (block.type === 'coyaxHeroStats') {
              return (
                <div
                  key={index}
                  className="w-full coyax-hero-stat-strip"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}
                >
                  <CaseStudyStatStrip brandColor={COYAX_STONE} items={COYAX_HERO_STAT_STRIP_ITEMS} labelMaxWidth={220} />
                </div>
              );
            }
            if (block.type === 'coyaxCaseStudyContent') {
              return (
                <div key={index} className="w-full">
                  <CoyaxCaseStudyContent />
                </div>
              );
            }
            if (block.type === 'colors') {
              return (
                <div key={index} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {block.colors.map((color, i) => (
                    <div key={i} className="aspect-square rounded-lg" style={{ backgroundColor: color }} />
                ))}
              </div>
              );
            }
            return null;
          });
          })()}

          <ExploreMoreSection
            currentProjectId={CURRENT_PROJECT_ID}
            onBack={onBack}
            onProjectClick={onProjectClick}
          />

          <div className="md:hidden pt-8">
            <button 
              onClick={onBack}
              className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              ← Back to Work
            </button>
          </div>
        </div>
          </>
        ) : (
          <ExploreMoreSection
            currentProjectId={CURRENT_PROJECT_ID}
            onBack={onBack}
            onProjectClick={onProjectClick}
          />
        )}

      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12" data-footer>
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 text-[13px] text-gray-500"
        >
          <FooterCreditsRow />
          
          <div className="flex items-center gap-3 md:gap-6">
            <a href="https://www.figma.com/@iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Figma">
              <Figma className="w-[18px] h-[18px]" />
            </a>
            <a href="https://github.com/iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="GitHub">
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.linkedin.com/in/iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.youtube.com/@avlnce" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="YouTube">
              <Youtube className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.instagram.com/hrithiksanyal/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Instagram">
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.facebook.com/Avlnce/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Facebook">
              <Facebook className="w-[18px] h-[18px]" />
            </a>
            <a href="https://x.com/hrithiksanyal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="X (Twitter)">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://soundcloud.com/avlncemusic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="SoundCloud">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 800 348" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M101.875 163.438C99.375 163.438 97.5 165.313 97.1875 168.125L90 255.625L97.1875 340.313C97.5 342.813 99.375 345 101.875 345C104.375 345 106.25 343.125 106.563 340.313L114.687 255.625L106.563 168.125C106.25 165.313 104.063 163.438 101.875 163.438Z" fill="currentColor" />
                <path d="M133.75 169.062C130.938 169.062 128.438 171.25 128.438 174.375L121.875 255.625L128.438 340.937C128.75 344.062 130.938 346.25 133.75 346.25C136.563 346.25 138.75 344.062 139.062 340.937L146.562 255.625L139.062 174.375C138.75 171.25 136.563 169.062 133.75 169.062Z" fill="currentColor" />
                <path d="M38.75 180.312C37.1875 180.312 35.625 181.562 35.3125 183.438L27.5 255.312L35.3125 325.625C35.625 327.5 36.875 328.75 38.75 328.75C40.3125 328.75 41.875 327.5 42.1875 325.625L51.25 255.312L42.1875 183.438C41.5625 181.875 40.3125 180.312 38.75 180.312Z" fill="currentColor" />
                <path d="M9.06248 207.812C7.49998 207.812 5.93748 209.063 5.93748 210.938L0 255.625L5.93748 299.375C6.24998 301.25 7.49998 302.5 9.06248 302.5C10.625 302.5 11.875 301.25 12.1875 299.375L19.0625 255.625L12.1875 211.25C11.875 209.375 10.625 207.812 9.06248 207.812Z" fill="currentColor" />
                <path d="M198.438 86.5625C194.688 86.5625 191.875 89.375 191.563 93.125L185.625 255.625L191.563 340.625C191.875 344.375 194.688 347.187 198.438 347.187C202.188 347.187 205 344.375 205.313 340.625L211.875 255.625L205.313 93.125C205 89.375 201.875 86.5625 198.438 86.5625Z" fill="currentColor" />
                <path d="M70 166.25C67.8125 166.25 66.25 167.812 65.9375 170.312L58.4375 255.625L65.9375 337.812C66.25 340 67.8125 341.875 70 341.875C72.1875 341.875 73.75 340.312 74.0625 338.125L82.5 255.938L74.0625 170.625C73.75 168.125 72.1875 166.25 70 166.25Z" fill="currentColor" />
                <path d="M165.938 117.5C162.813 117.5 160 120 160 123.437L153.75 255.625L160 340.938C160.313 344.375 162.813 346.875 165.938 346.875C169.063 346.875 171.875 344.375 171.875 340.938L179.063 255.625L171.875 123.437C171.875 120 169.063 117.5 165.938 117.5Z" fill="currentColor" />
                <path d="M364.375 42.1875C358.75 42.1875 354.375 46.5625 354.375 52.1875L350.625 255.313L354.375 336.875C354.375 342.5 359.063 346.875 364.375 346.875C370 346.875 374.375 342.188 374.375 336.875L378.75 255.313L374.375 52.1875C374.688 46.875 370 42.1875 364.375 42.1875Z" fill="currentColor" />
                <path d="M230.937 72.1875C226.875 72.1875 223.75 75.3125 223.438 79.6875L217.812 255.625L223.438 339.687C223.438 343.75 226.875 346.875 230.937 346.875C235 346.875 238.125 343.75 238.438 339.375L244.688 255.313L238.438 79.3751C238.438 75.6251 235 72.1875 230.937 72.1875Z" fill="currentColor" />
                <path d="M701.563 150.625C688.125 150.625 675.313 153.438 663.438 158.125C655.625 69.375 581.25 0 490.625 0C468.438 0 446.875 4.37506 427.812 11.8751C420.312 14.6876 418.438 17.8125 418.438 23.4375V335.625C418.438 341.563 423.125 346.563 429.063 347.188C429.375 347.188 700 347.188 701.875 347.188C756.25 347.188 800.313 303.125 800.313 248.75C800 194.688 755.938 150.625 701.563 150.625Z" fill="currentColor" />
                <path d="M398.125 23.125C392.187 23.125 387.5 28.125 387.187 34.0625L382.812 255.625L387.187 335.937C387.187 341.875 392.187 346.562 398.125 346.562C404.062 346.562 408.75 341.562 409.062 335.625L413.75 255L409.062 33.4375C408.75 28.125 404.062 23.125 398.125 23.125Z" fill="currentColor" />
                <path d="M264.062 65.625C259.687 65.625 256.25 69.0625 255.937 73.75L250.938 255.625L255.937 339.063C255.937 343.438 259.687 347.188 264.062 347.188C268.437 347.188 271.875 343.75 272.188 339.063L277.812 255.625L272.188 73.75C271.875 69.0625 268.437 65.625 264.062 65.625Z" fill="currentColor" />
                <path d="M297.188 69.6875C292.5 69.6875 288.438 73.4375 288.438 78.4375L283.75 255.625L288.438 338.438C288.438 343.438 292.5 347.187 297.188 347.187C301.875 347.187 305.937 343.438 305.937 338.438L311.25 255.625L305.937 78.4375C305.937 73.4375 302.188 69.6875 297.188 69.6875Z" fill="currentColor" />
                <path d="M330.625 75.3125C325.313 75.3125 321.25 79.375 321.25 84.6875L316.875 255.625L321.25 337.812C321.25 343.125 325.625 347.188 330.625 347.188C335.938 347.188 340 343.125 340 337.812L344.688 255.625L340 84.6875C340 79.6875 335.938 75.3125 330.625 75.3125Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
