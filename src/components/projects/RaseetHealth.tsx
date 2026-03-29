// ═══════════════════════════════════════════════════════════════════════════
// ✏️  EDIT THIS FILE TO CHANGE YOUR PROJECT
// ═══════════════════════════════════════════════════════════════════════════
// 
// This file contains EVERYTHING for this project - both data AND display!
// Just edit the content below and the website will update automatically.
//
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Bell,
  Eye,
  Facebook,
  Figma,
  Github,
  Hand,
  Heart,
  Instagram,
  Linkedin,
  MessageSquare,
  Navigation,
  RefreshCw,
  Smartphone,
  TrendingUp,
  Type,
  Users,
  Youtube,
} from 'lucide-react';
import { ScrollToTop } from '../ScrollToTop';
import { useLightbox } from '../Lightbox';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ExploreMoreSection } from './ExploreMoreSection';
import { SHOW_PROJECT_OVERVIEW } from './projectConfig';
import { getInitialCaseStudyVisible } from './caseStudyRestore';
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

const RASEET_TEAL = '#1A6B8A';

const RASEET_ACCESSIBILITY_FEATURES = [
  {
    Icon: Eye,
    label: 'WCAG 2.2 AA Compliant',
    description:
      'Blue and green color palette chosen specifically for healthcare trust and accessibility. Every screen tested against WCAG 2.2 contrast ratios, not just checked at the end, but built in from the first design token decisions.',
  },
  {
    Icon: Type,
    label: 'Adjustable Font Sizes',
    description:
      'Our first design attempt used compact layouts and smaller fonts following typical SaaS patterns. Usability testing with elderly patients revealed they couldn\'t read critical information like medication names and dosages. We rebuilt the entire information hierarchy with significantly larger text.',
  },
  {
    Icon: Hand,
    label: '44px Minimum Touch Targets',
    description:
      'Every button, link, and interactive element, including the prescription upload trigger and refill buttons, meets the 44px minimum touch target guideline. Especially critical for elderly patients with limited motor control.',
  },
  {
    Icon: Navigation,
    label: 'Simplified Navigation',
    description:
      'Prescription upload reduced from 4 steps to 2. Checkout reduced from 5 steps to 3. Chronic care refill flow redesigned with a step-by-step guided mode after testing revealed elderly patients felt lost in the original linear flow.',
  },
  {
    Icon: MessageSquare,
    label: 'Jargon-Free Language',
    description:
      'Every label, error message, and CTA rewritten in plain language. \'Proceed to pay\' became \'Secure checkout\'. Upload errors say \'Photo is blurry, try again\' instead of generic failure messages. Visual icons accompany every text label.',
  },
  {
    Icon: Smartphone,
    label: 'One-Handed Mobile Use',
    description:
      '70% of users were on smartphones. The prescription camera interface was redesigned for single-hand use with smart document cropping, large capture buttons, and touch-friendly confirmation steps.',
  },
  {
    Icon: Bell,
    label: 'Smart Medication Reminders',
    description:
      'Automated reminders triggered based on prescription end dates, not generic push notifications. \'Time to refill your diabetes medication\' with a one-tap refill from the notification. Designed specifically for chronic patients who were missing doses due to forgetting to reorder.',
  },
  {
    Icon: RefreshCw,
    label: 'Dual-Mode Experience',
    description:
      'Two distinct interaction modes for two distinct users. Tech-savvy users get a Quick Reorder one-tap button with minimal steps. Chronic care patients get a step-by-step guided mode with larger text, high contrast, and confirmation at every step. Same platform, two experiences.',
  },
] as const;

const RASEET_ACCESSIBILITY_METRICS_ITEMS: CaseStudyStatStripItem[] = [
  {
    Icon: Users,
    label: 'Elderly patients in usability testing',
    labelDetail: 'Initial design failed, rebuilt from scratch',
    top: '',
    countEnd: 15,
    prefix: '',
    suffix: '',
  },
  {
    Icon: Heart,
    label: 'Chronic care patients served',
    labelDetail: 'New revenue stream identified through research',
    top: '',
    countEnd: 2000,
    prefix: '',
    suffix: '+',
  },
  {
    Icon: TrendingUp,
    label: 'Retention across all demographics',
    labelDetail: 'Including elderly and chronic care users',
    top: '',
    countEnd: 68,
    prefix: '',
    suffix: '%',
  },
];

function RaseetAccessibilityNativeSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridInView, setGridInView] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setGridInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full space-y-12 md:space-y-16">
      <div>
        <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium mb-6 md:mb-8">
          Design Decisions
        </h3>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RASEET_ACCESSIBILITY_FEATURES.map((item, index) => (
            <div
              key={item.label}
              className="min-w-0"
              style={{
                borderLeft: '3px solid rgba(26, 107, 138, 0.15)',
                paddingTop: 20,
                paddingRight: 20,
                paddingBottom: 20,
                paddingLeft: 16,
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0)' : 'translateY(10px)',
                transition: `opacity 0.55s ease ${index * 80}ms, transform 0.55s ease ${index * 80}ms`,
              }}
            >
              <item.Icon size={24} color={RASEET_TEAL} strokeWidth={2} aria-hidden className="shrink-0" />
              <p
                className="m-0"
                style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111', marginTop: 12 }}
              >
                {item.label}
              </p>
              <p
                className="m-0"
                style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  marginTop: 6,
                  marginBottom: 8,
                  lineHeight: 1.55,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <CaseStudyStatStrip
        brandColor={RASEET_TEAL}
        items={RASEET_ACCESSIBILITY_METRICS_ITEMS}
        labelMaxWidth={280}
      />
    </div>
  );
}

const CURRENT_PROJECT_ID = 'RaseetHealth';
const RASEET_WEBSITE_URL = 'https://raseet.com';
const RASEET_FIGMA_MOBILE_URL = 'https://www.figma.com/proto/XKSlqw5bsQYbJAoudCEzjy/iOS_RaseetHealth_v2?node-id=4628-357&p=f&viewport=369%2C429%2C0.02&t=kg6GHaKkbVY0NcZZ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4628%3A13344&page-id=4628%3A264&show-proto-sidebar=1&hide-ui=1';
const RASEET_FIGMA_PARTNER_DASHBOARD_URL = 'https://www.figma.com/proto/XKSlqw5bsQYbJAoudCEzjy/iOS_RaseetHealth_v2?node-id=6602-4394&p=f&viewport=60%2C472%2C0.09&t=eQG2dOI3a4xSIRlo-1&scaling=scale-down&content-scaling=fixed&page-id=6602%3A2&starting-point-node-id=6602%3A4394&hide-ui=1';
const RASEET_FIGMA_HCP_DASHBOARD_URL = 'https://www.figma.com/proto/XKSlqw5bsQYbJAoudCEzjy/iOS_RaseetHealth_v2?node-id=6602-4&viewport=-2691%2C197%2C0.41&t=mL1Fml7UK3LEasph-1&scaling=scale-down&content-scaling=fixed&page-id=6602%3A3&hide-ui=1';
const RASEET_IMPACT_STATS = [
  { value: '250+', label: 'Pharmacies onboarded', end: 250, prefix: '', suffix: '+' },
  { value: '5 States', label: 'Geographical Reach', end: 5, prefix: '', suffix: ' States' },
  { value: 'Rs. 5Cr+', label: 'Revenue Captured', end: 5, prefix: 'Rs. ', suffix: 'Cr+' },
  { value: '100,000+', label: 'Digital Bills Processed', end: 100000, prefix: '', suffix: '+' },
  { value: '21,000+', label: 'End-Customers Connected', end: 21000, prefix: '', suffix: '+' },
] as const;

function formatImpactCount(value: number) {
  return value.toLocaleString('en-US');
}

function RaseetImpactStatsAnimatedBlock({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState<number[]>(() => RASEET_IMPACT_STATS.map(() => 0));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frameIds: (number | undefined)[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const durationMs = 1200;

    if (!inView) {
      setCounts(RASEET_IMPACT_STATS.map(() => 0));
      return () => {
        frameIds.forEach((id) => id && cancelAnimationFrame(id));
        timeouts.forEach((t) => clearTimeout(t));
      };
    }

    setCounts(RASEET_IMPACT_STATS.map(() => 0));

    RASEET_IMPACT_STATS.forEach((stat, index) => {
      const timeout = setTimeout(() => {
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const nextValue = Math.round(stat.end * eased);
          setCounts((prev) => {
            const clone = [...prev];
            clone[index] = nextValue;
            return clone;
          });
          if (progress < 1) {
            frameIds[index] = requestAnimationFrame(animate);
          }
        };
        frameIds[index] = requestAnimationFrame(animate);
      }, index * 100);
      timeouts.push(timeout);
    });

    return () => {
      frameIds.forEach((id) => id && cancelAnimationFrame(id));
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`raseet-impact-stats${inView ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
    >
      <div className="hidden md:flex items-start justify-between gap-6">
        {RASEET_IMPACT_STATS.map((stat, index) => (
          <div key={stat.label} className="text-center flex-1 min-w-0">
            <p className="raseet-impact-stat-value">
              {stat.prefix}
              {formatImpactCount(counts[index])}
              {stat.suffix}
            </p>
            <p className="raseet-impact-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="md:hidden">
        <div className="raseet-impact-mobile-grid">
          {RASEET_IMPACT_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`raseet-impact-mobile-item ${index === 4 ? 'raseet-impact-mobile-item-last' : ''}`}
            >
              <p className="raseet-impact-stat-value">
                {stat.prefix}
                {formatImpactCount(counts[index])}
                {stat.suffix}
              </p>
              <p className="raseet-impact-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface RaseetHealthProjectProps {
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

const PROGRESS_BAR_HIDE_DELAY_MS = 400;

export function RaseetHealthProject({ onBack, onProjectClick }: RaseetHealthProjectProps) {
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
  
  const title = 'Raseet Health';
  const company = 'Raseet Health';
  const subtitle = 'An intuitive platform for pharmacies, catering to users of all ages and tech levels, with a focus on a broad audience.';
  const headerColor = '#1A6B8A';
  const progressBarColor = '#1A6B8A';
  const arrowColor = '#1A6B8A';
  const icon = 'raseet/raseet_logo2.png'; // Sidebar icon (left column) - Add image/video path here
  const headerIcon = '/raseet/test5.png'; // Header section icon (top banner) - Add image/video path here (e.g., '/path/to/header-icon.png' or '/path/to/header-icon.mp4')
  const role = 'UX Research, End to end Product Design, UX/UI Design, Design Systems';
  const team = 'Solo Designer with Cross-functional Collaboration';
  const when = '2019 - 2022';
  /** Optional: set to undefined to hide overview on this project. Hidden for all when SHOW_PROJECT_OVERVIEW is false in projectConfig.ts */
  // const overview: string | undefined = 'Raseet Health is a comprehensive platform designed to digitize local pharmacies, helping them evolve into e-commerce-ready, one-stop-shops for customers\' health and wellness needs. The platform connects pharmacies, healthcare providers, and customers by offering features like electronic medical records (EMRs), inventory management, and a seamless e-commerce experience. Through Raseet, pharmacies can offer trusted healthcare and wellness services such as doctor consultations, lab tests, and health insurance, all while reducing operational inefficiencies.';
  const overview: string | undefined = '';
  const speedReadChallenge = 'The goal was to create a digital platform that empowers local pharmacies to transition into e-commerce-ready, one-stop health and wellness hubs. The key challenges included ensuring seamless collaboration among stakeholders, simplifying technical adoption for pharmacies, and providing a frictionless customer experience while prioritizing data security and compliance.';
  const speedReadProcess = "I conducted in-depth user research, including interviews, contextual inquiries, and competitor analysis, to uncover pain points and opportunities. The design process involved three phases: Created role-specific dashboards for pharmacists, customers, and healthcare providers. Built high-fidelity prototypes to test user flows and interactions. Conducted usability tests and incorporated feedback to refine navigation, onboarding, and checkout processes.";
  const speedReadTakeaways = 'This project enhanced my ability to design for diverse user needs within a highly regulated healthcare domain. I honed skills in simplifying complex workflows, fostering user trust, and designing accessible, scalable systems. Collaborating with stakeholders taught me the value of iterative feedback loops in delivering impactful solutions.';
  const speedReadImpact = 'The platform improved operational efficiency for pharmacies, reducing manual tasks by 30%. Customer engagement increased, with cart abandonment rates dropping by 25% and repeat orders growing by 35%. Raseet Health successfully positioned itself as a leading platform, driving a 20% revenue increase for partner pharmacies within three months.';

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
    // DEFAULT CONTENT  BLOCKS
    // { type: 'text', header: "User Research", content: "Before embarking on the redesign of the BMW iDrive 8 screens, I conducted initial research to gain a deeper understanding of the vehicle. This included studying BMW's brand styling guide and reviewing various articles on the car's development and target audience. Two particularly informative resources were:" },
    
    // { type: 'text', header: "Exploring iDrive 8: Part One", content: "This exploration highlighted BMW's dedication to a sophisticated and minimalist aesthetic. This design ethos not only resonates with the preferences of BMW's customer base but also reflects the company's desired image. Personally, I am drawn to this minimalist approach and aim to integrate it into my redesign efforts.", indent: true },
    // { type: 'image', src: '/bmw/bmw1.jpg' },

    // { type: 'textBullets', header: "Mass Market cars", items: [
    //   "Large center display accessible to the front passenger is a fundamental requirement.",
    //   "Optional driver displays to provide cost-saving options for customers.",
    //   "Emphasis on easy navigation and functionality tailored to essential features.",
    //   "Prioritized functions are Audio, Maps, and Clean content options.",
    // ], indent: true, indentLevel: 2 },

    // { type: 'textImageRow', header: '2022, BMW i7', content: "BMW i7's Adaptive Cruise Control (ACC) interface, showcases a clear, user-friendly and intuitive interface. It allows users to customize following distances, following distance and enabling/disabling ACC and intervention thresholds making it more user-centric user-friendly for ease of interaction during driving.", src: '/bmw/bmw2.jpg' },

    // { type: 'text', header: "Takeaways & Considerations", content: "We conducted user interviews, surveys, and analyzed in-app analytics to understand the pain points and user needs. We also studied competitor apps and industry trends to gather insights", indent: true },
    // { type: 'image', src: '/bmw/bmw6.jpeg' },

    // { type: 'text', header: "Screens with content blocks", content: "I began by crafting frames for each of the screens within the BMW iDrive 8 system using Figma. I opted not to redesign the small climate control screen located in the back seat, deeming it unnecessary for this project due to its simplicity. This decision was more intuitive than based on specific rationale; it felt unnecessary to alter something so straightforward." },
    // { type: 'text', content: "Once the frames were set up, I began placing labeled content blocks within them to outline a potential layout. These placements weren't final but served as a preliminary step to visualize potential design directions. This phase was crucial for generating initial ideas and exploring how to approach the overall redesign."},
    
    // { type: 'image', src: '/bmw/Frame1.png' },
    // { type: 'image', src: '/bmw/center display landing page_v2png' },

    // { type: 'textTextRow', headerLeft: 'For pharmacists', contentLeft: "Manage inventory, orders, and prescriptions in one place. Clear dashboards and workflows designed for pharmacy staff with varying levels of digital experience.", headerRight: 'For customers', contentRight: "Order refills, view health records, and get reminders. The interface prioritizes clarity and trust so customers feel confident managing their health online." },
    // Intro
    // { type: 'image', src: '/raseet/cover.png', maxHeight: '800px' },
    // { type: 'video', src: '/raseet/vids/onboarding-1.mp4', maxHeight: '400px', group: 'mosaic4' },  // iphone screen 1
  
    // { type: 'video', src: '/raseet/vids/PP-demo.mp4', maxHeight: '400px', group: 'mosaic4' }, // ipad screen 1
    // { type: 'video', src: '/raseet/vids/HP-demo.mp4', maxHeight: '400px', group: 'mosaic4' }, // ipad screen 2
    // { type: 'video', src: '/raseet/vids/onboarding-2.mp4', maxHeight: '400px', group: 'mosaic4' }, // iphone screen 2
    // { type: 'externalLink', label: 'View in Figma ↗', href: RASEET_FIGMA_URL, variant: 'button' },
    
  
    { type: 'video', src: '/raseet/vids/2/PP-demo.mp4', maxHeight: '400px', group: 'row3' }, // ipad screen 1
    { type: 'video', src: '/raseet/vids/2/HP-demo.mp4', maxHeight: '400px', group: 'row3' }, // ipad screen 2
    { type: 'video', src: '/raseet/vids/2/onboarding-2.mp4', maxHeight: '400px', group: 'row3' }, // iphone screen 2
    { type: 'imageCaption', src: '/raseet/vids/website-cover.png', caption: 'Product in Context, Raseet Health website homepage.' },
    { type: 'externalLink', label: 'View Mobile App Prototype ↗', href: RASEET_FIGMA_MOBILE_URL, variant: 'button' },
    
    { type: 'text', header: 'Project Statement', content: 'Empower local pharmacies to compete with e‑pharmacy giants by delivering a simpler, more trustworthy way to manage prescriptions, health records, and orders, across in‑store and mobile experiences.' },

    // Mission + Vision
    // { type: 'text', header: 'Mission', content: 'Make quality healthcare more accessible by empowering local pharmacies with a digital system that increases revenue, improves customer lifetime value, and reduces out-of-pocket cost through better access and follow-through.', indent: true },
    // { type: 'text', header: 'Vision', content: "Build a “Vocal for Local” ecosystem where credible providers, pharmacies, and customers collaborate seamlessly, turning the pharmacy into a one‑stop health and wellness hub.", indent: true },

    // Summary / Overview
    // { type: 'text', header: 'Overview / Summary', content: "Raseet Health digitizes local pharmacies so they can offer modern services like refills, orders, delivery tracking, and health record access, while keeping the human trust loop that makes local pharmacies valuable. The platform is designed to work for a broad audience (all ages and tech comfort levels) and for multiple stakeholders (pharmacists, customers, and providers).", indent: true },

    // Audience + Value
    
    /* { type: 'textBullets', header: 'Target Audience', items: [
      'Pharmacies: Owners and staff who need simple tooling, minimal training overhead, and reliable day-to-day workflows.',
      'Customers: People who want transparency, reminders, refills, and trusted support without complicated apps.',
      'Healthcare providers: Partners who need clear coordination and secure access to relevant records and updates.',
    ],listIndent: 1 }, */
    
    /* { type: 'textBullets', header: 'Value Proposition', items: [
      'For pharmacies: higher retention + repeat orders via better follow-ups, reminders, and digital presence.',
      'For customers: less friction for refills, orders, and record access; more clarity and trust.',
      'For the ecosystem: fewer manual errors and a more consistent handoff between people and systems.',
    ],listIndent: 1 }, */

    // Problem
    { type: 'text', header: 'Design Process', content: "Designing Raseet Health’s digital experience required a structured yet flexible design process, rooted in Agile methodologies and Design Sprints. Our goal was to create an intuitive, scalable, and accessible pharmacy platform while balancing business goals and technical feasibility. To achieve this, I followed a user-centered iterative design approach with rapid prototyping, continuous feedback loops, and close cross-functional collaboration" },
   
    { type: 'text', header: 'Lean UX & Agile Approach', content: "The design process followed a dual-track Agile framework, where design and development ran in parallel to ensure continuous iteration and refinement", indent: true },
    
    { type: 'textBullets', header: '', items: [
      "Design Sprints: Rapid 5-day sprints to ideate, prototype, and validate concepts.",
      "Agile UX: Weekly stand-ups with the product and development teams to align design deliverables with sprint cycles.",
      "Cross-functional Collaboration: Close coordination with engineers, marketers, and business stakeholders.",
      "Data-Driven Decision-Making: A/B testing and usability research informed key iterations.",
    ], indent: true, indentLevel: 2},

    { type: 'text', header: '', content: "This framework enabled fast iterations, allowing the team to validate hypotheses early and avoid costly design changes later", indent: true },

    { type: 'image', src: '/raseet/6.png', maxHeight: '600px' },
    
    
    { type: 'text', header: 'User Research', content: 'To ground the product in real-world needs, I conducted interviews, surveys, contextual inquiries, and competitor analysis across pharmacists, patients, and providers.'},
    
    // { type: 'text', header: 'Background', content: "To design a solution that meets the needs of pharmacies, healthcare providers, and customers, it was essential to understand their existing workflows, pain points, and expectations. Through a mix of qualitative and quantitative research, we identified gaps in the current ecosystem and opportunities to create a more streamlined, user-friendly platform.", indent: true },

    // { type: 'text', header: 'Research Objectives', content: 'Clarify where existing pharmacy workflows break down, why digital tools are underused, and how we can design a platform that feels trustworthy and simple for all stakeholders.', indent: true },

    /* { type: 'textBullets', header: '', items: [
      "Identify inefficiencies in pharmacy operations and customer engagement.",
      "Understand barriers to digital adoption for pharmacies and customers.",
      "Explore how healthcare providers and pharmacies collaborate to manage patient data and prescriptions",
      "Data-Driven Decision-Making: A/B testing and usability research informed key iterations.",
    ], indent: true, indentLevel: 2}, */

    { type: 'text', header: 'Research', content: 'I used four methods across 30+ participants, user interviews with pharmacists, patients, and providers; surveys for quantitative validation; contextual inquiries shadowing pharmacy staff; and competitive analysis of PharmEasy, Netmeds, and 1mg.' },

    { type: 'text', header: 'Key Findings', content: 'Five patterns emerged consistently across all research methods: pharmacy workflows were manual and fragmented; digital adoption was blocked by fear of complexity; customers dropped off during navigation and checkout; rejected prescriptions left users with no clear path forward; and trust, in medicine authenticity, data security, and platform reliability, was the single biggest barrier across all user groups.' },

    /* { type: 'text', header: '1.User Interviews:', subheader: 'Participants:', content: "", indent: true },

    { type: 'image', src: '/raseet/final/1.png', indent: true, maxHeight: '200px'  },
    { type: 'image', src: '/raseet/final/2.png', indent: true, maxHeight: '150px'  },

    { type: 'textBullets', header: 'Process:', items: [
      "Conducted 1-hour interviews focusing on workflows, challenges, and expectations.",
      "Open-ended questions encouraged participants to share detailed experiences.",
    ], headerIndent: 1, listIndent: 2},




    { type: 'text', header: '2.Surveys:', subheader: 'Participants:', content: "", indent: true, subheaderIndent: 1 },

    { type: 'image', src: '/raseet/final/3.png', indent: true },
    { type: 'text', header: 'key insights:', content: "", indent: true, headerIndent: 1 },

    { type: 'image', src: '/raseet/final/4.png', indent: true },

    { type: 'text', header: '3.Contextual Inquiries:', subheader: '', content: "", indent: true },

    { type: 'image', src: '/raseet/final/5.png', indent: true },
    
    { type: 'textBullets', header: 'Process:', items: [
      "Shadowed pharmacy staff during inventory updates, order management, and customer interactions.",
      "Documented pain points, bottlenecks, and opportunities for digital intervention",
    ], headerIndent: 1, listIndent: 2},
    
    { type: 'image', src: '/raseet/final/6.png', indent: true },



    { type: 'text', header: '4. Competitor Analysis:', subheader: '', content: "Platforms studied: Leading e-pharmacy apps in the market", indent: true },

    { type: 'text', header: 'Focused on:', subheader: '', content: "", headerIndent: 1 },


    { type: 'image', src: '/raseet/final/7.png', indent: true },
    
    { type: 'textBullets', header: 'Process:', items: [
      "Shadowed pharmacy staff during inventory updates, order management, and customer interactions.",
      "Documented pain points, bottlenecks, and opportunities for digital intervention",
    ], headerIndent: 1, listIndent: 2},
    
    { type: 'image', src: '/raseet/final/8.png', maxHeight: '300px', indent: true },
   */
  
// { type: 'textTextRow', headerLeft: 'For pharmacists', contentLeft: "Manage inventory, orders, and prescriptions in one place. Clear dashboards and workflows designed for pharmacy staff with varying levels of digital experience.", headerRight: 'For customers', contentRight: "Order refills, view health records, and get reminders. The interface prioritizes clarity and trust so customers feel confident managing their health online." },


{ type: 'textImageRow', header: 'Tata 1 mg', subheader: '', content: "1mg is a pharmacy application that provides specialized and generic medicines along with branded medicines", items: ['Wide medicine catalog and delivery.', 'Prescription upload and refill flows.', 'Health content and lab tests.'], src: '/raseet/tata.png', itemsIndent: 1, maxHeight: '400px', maxWidth: '400px' },

{ type: 'textImageRow', header: 'PharmEasy', subheader: '', content: "Pharmeasy is another famous online pharmacy & medical store offering pharmaceutical and healthcare products.", items: ['Home delivery of medicines', 'Prescription upload and refill flows.', 'Health content and lab tests.'], src: '/raseet/pharm.png', itemsIndent: 1, imageSide: 'left', maxHeight: '400px', maxWidth: '400px' },

{ type: 'textImageRow', header: 'Zeno Health', subheader: '', content: "Zeno Health is a Mumbai-based pharmacy application that provides generic medicines and branded medicines.", items: ['Home delivery of medicines', 'Provides doctor consultations.'], src: '/raseet/zeno.png', itemsIndent: 1, imageSide: 'right', maxHeight: '400px', maxWidth: '400px' },

// { type: 'text', header: 'To summarize all the problems….', subheader: '', content: "", align: 'center'},

{ type: 'image', src: '/raseet/final/9.png', },

{ type: 'image', src: '/raseet/final/10.png' },



// { type: 'text', header: 'Key Findings', subheader: '1. Pharmacy Workflows Are Inefficient:', content: "", },

// { type: 'image', src: '/raseet/final/11.png'},

// { type: 'image', src: '/raseet/final/12.png' },


// { type: 'text', header: '', subheader: '2. Digital Adoption Barriers for Pharmacies:', content: "", },

// { type: 'image', src: '/raseet/final/13.png'},

// { type: 'image', src: '/raseet/final/14.png' },


// { type: 'text', header: '', subheader: '3. Customers Struggle With Navigation:', content: "", },

// { type: 'image', src: '/raseet/final/15.png'},

// { type: 'image', src: '/raseet/final/16.png' },

// { type: 'text', header: '', subheader: '4. Lack of Guidance Post-Rejection:', content: "", },

// { type: 'image', src: '/raseet/final/17.png'},

// { type: 'image', src: '/raseet/final/18.png' },

// { type: 'text', header: '', subheader: '5. Trust Issues With Digital Platforms:', content: "", },

// { type: 'image', src: '/raseet/final/19.png'},

// { type: 'image', src: '/raseet/final/20.png' },


/* { type: 'text', header: 'Insights at a Glance', subheader: '', content: "", align: 'center'},

{ type: 'image', src: '/raseet/final/21.png'},

 

{ type: 'text', header: '', subheader: '', content: "These insights served as a valuable tool to identify opportunities for introducing a potential solution.", align: 'center'}, */

// { type: 'text', header: 'User Persona', subheader: '', content: 'A primary persona captures the needs of a pharmacy owner balancing walk‑in traffic, digital orders, and coordination with doctors and patients.', },

// { type: 'text', header: 'Empathy Map', subheader: '', content: 'The empathy map helped align the team on what pharmacies and patients say, think, feel, and do across the medication journey.', },

// { type: 'text', header: 'User Journey', subheader: '', content: 'End‑to‑end journeys highlighted moments of confusion, drop‑offs, and trust gaps in ordering, refilling, and tracking medicines.', },

{ type: 'text', header: 'Research Artifacts', content: 'User persona, empathy map, and user journey developed from interviews with 30+ pharmacists, patients, and healthcare providers.' },

{ type: 'video', src: '/raseet/PERSONA.mp4', maxHeight: '500px', group: 'row3' },

{ type: 'video', src: '/raseet/EM.mp4', maxHeight: '500px', group: 'row3' },

{ type: 'video', src: '/raseet/UJ.mp4', maxHeight: '500px', group: 'row3' },


{ type: 'text', header: 'Impact of Research', subheader: '', content: "The insights from user research directly informed the design goals and solutions for Raseet Health:", items: ['User-Centric Onboarding', 'Enhanced Navigation', 'Privacy Assurance'] },

{ type: 'keyDesignDecisions' },

{ type: 'text', header: 'Product Goals: Sort Qualitative Feedback', subheader: '', content: "The success of Raseet Health depended on aligning business objectives with user needs, ensuring a seamless and scalable experience for all stakeholders. By analyzing research insights and market trends, we defined three core product goals:" },

{ type: 'text', header: 'Business Goals', subheader: '', content: 'Increase repeat orders, improve inventory turns, and grow lifetime value without overwhelming small pharmacy teams.', headerIndent: 1 },
{ type: 'image', src: '/raseet/final/22.png', indent: true },

{ type: 'text', header: 'User Goals', subheader: '', content: 'Make it effortless for customers and caregivers to manage prescriptions, understand status, and trust digital channels.', headerIndent: 1 },
{ type: 'image', src: '/raseet/final/23.png', indent: true },

{ type: 'text', header: 'Shared Goals (User + Business)', subheader: '', content: 'Design flows that are sustainable for pharmacy operations and genuinely useful for patients, so better care also drives better business.', headerIndent: 1 },
{ type: 'image', src: '/raseet/final/24.png', indent: true },


{ type: 'text', header: '', subheader: '', content: "These goals shaped the design decisions, guiding the development of a frictionless user experience that balanced operational efficiency with user-centric healthcare services.", headerIndent: 1 },

// { type: 'image', src: '/raseet/bsu.png', maxHeight: '400px'},

{ type: 'goalsVenn' },

////////////////////////////////////////////////////////////

{ type: 'text', header: 'Solutions', subheader: '1. Seamless integration of stakeholder systems', content: 'A three‑sided platform connects pharmacies, healthcare providers, and customers so information flows reliably instead of being trapped in silos.', },


// { type: 'textTextRow', headerLeft: 'Problem', contentLeft: "Disconnected systems for pharmacies, doctors, and customers led to inefficiencies, missed opportunities, and frustration.", headerRight: 'Solution', contentRight: "Unified Dashboards and Secure Collaboration Tools." },

{ type: 'text', header: 'Features', subheader: 'Role-based dashboards', content: 'Each role sees only what they need to act with confidence, reducing clutter and cognitive load.', },

{ type: 'textBullets', header: 'Pharmacists', items: [
  'A centralized dashboard consolidates inventory levels, order statuses, and customer data.',
  'Real-time alerts for stock depletion and order processing streamline daily operations.',
],listIndent: 1 },


{ type: 'textBullets', header: 'Doctors', items: [
  'Secure access to patient prescriptions and medical records enables informed decision-making.',
  'Real-time updates ensure accurate and timely care for patients.',
],listIndent: 1 },

{ type: 'video', src: '/raseet/vids/2/HP-demo.mp4', maxHeight: '500px', group: 'row3' },
{ type: 'externalLink', label: 'Healthcare Provider Dashboard ↗', href: RASEET_FIGMA_HCP_DASHBOARD_URL, variant: 'inline' },

{ type: 'textBullets', header: 'Patients', items: [
  'A personal dashboard allows users to manage prescriptions, view health records, and track orders seamlessly.',
],listIndent: 1 },

{ type: 'onboardingStory' },

{ type: 'video', src: '/raseet/vids/2/PP-demo.mp4', maxHeight: '500px', group: 'row3' },

{ type: 'externalLink', label: 'Partner Pharmacy Dashboard ↗', href: RASEET_FIGMA_PARTNER_DASHBOARD_URL, variant: 'inline' },

{ type: 'textTextRow', headerLeft: 'Three-way platform Integration', contentLeft: "Three way platform connect pharmacies, healthcare providers, and customers, ensuring real-time data flow and consistency.", headerRight: 'Secure Data Sharing', contentRight: "Implemented end-to-end encryption and role-based access control to safeguard sensitive data like medical records and prescriptions." },


{ type: 'image', src: '/raseet/final/25.png', },

{ type: 'image', src: '/raseet/final/26.png', },


////////////////////////////////////////////////////////////

{ type: 'text', header: '', subheader: '2. Simplifying complex onboarding for pharmacies', content: 'Onboarding flows are broken into guided steps so non‑technical teams can go digital without feeling overwhelmed.', },


// { type: 'textTextRow', headerLeft: 'Problem', contentLeft: "Small pharmacies struggled with the technical barriers of going digital, including setting up online catalogs and training staff.", headerRight: 'Solution', contentRight: "Automated Onboarding Workflows." },

{ type: 'text', header: 'Features', subheader: 'Bulk catalog uploads', content: 'Pharmacies can upload existing catalogs instead of re‑entering data, dramatically reducing setup time.', },

{ type: 'textBullets', header: '', items: [
  'Pharmacies upload product catalogs via .xls files, saving time on manual data entry',
  'The system automatically flags and corrects errors, ensuring clean data.',
  "Example: A pharmacy with 500+ SKUs onboarded in under 30 minutes.",
],listIndent: 1 },


// { type: 'textTextRow', headerLeft: 'Step-by-Step Onboarding Guides', contentLeft: "Interactive walkthroughs guide pharmacy owners through system setup, from uploading inventories to customizing their storefront. Progress trackers provide visibility into onboarding milestones.", headerRight: 'Dedicated Support', contentRight: "24/7 live chat support for troubleshooting during setup. On-call assistance for pharmacies with specific needs or technical challenges." },


{ type: 'image', src: '/raseet/final/27.png', },

{ type: 'image', src: '/raseet/final/28.png', },

////////////////////////////////////////////////////////////


{ type: 'text', header: '', subheader: '3. Enhancing UX in e‑commerce', content: 'We redesigned navigation, search, and checkout to reduce friction and increase completed orders.', },


// { type: 'textTextRow', headerLeft: 'Problem', contentLeft: "Customers struggled with poor navigation, complex checkout processes, and lack of real-time updates, leading to high drop-off rates.", headerRight: 'Solution', contentRight: "Intuitive Navigation and Streamlined Checkout." },

{ type: 'text', header: 'Features', subheader: 'Advanced search and filters', content: 'Search supports natural queries and filters that match how people actually shop for medicines and health products.', },

{ type: 'textBullets', header: '', items: [
  'Voice-enabled search for faster discovery of products.',
  'AI-driven recommendations based on purchase history and customer preferences.',
  "Filters for categories, price range, and availability reduce frustration during browsing.",
],listIndent: 1 },


{ type: 'textTextRow', headerLeft: 'Streamlined Checkout', contentLeft: "Auto-fill forms for returning users reduce the time required to complete a purchase. Multiple payment options, including UPI, credit/debit cards, and cash on delivery, cater to diverse user needs. Example: A returning customer completed their order in under 2 minutes.", headerRight: 'Real-Time Order Tracking', contentRight: "Push notifications inform users at every stage: order confirmation, processing, dispatch, and delivery. A visual progress tracker provides transparency and reduces customer anxiety." },


{ type: 'image', src: '/raseet/final/29.png', },

{ type: 'image', src: '/raseet/final/30.png', },

////////////////////////////////////////////////////////////



// { type: 'text', header: 'Design Goals & Considerations', subheader: 'Information Architecture', content: "To create a seamless and efficient user experience, the information architecture was carefully designed to cater to different user roles, including pharmacists, healthcare providers, and customers. The goal was to structure the platform in a way that improves discoverability, usability, and accessibility while ensuring smooth navigation for all stakeholders.", },

/* { type: 'textBullets', header: 'Key Considerations', items: [
  'Role-Specific Navigation: Tailored dashboards for pharmacies, customers, and healthcare providers to minimize cognitive load and present relevant information.',
  'E-Commerce & Healthcare Services: A clear distinction between shopping for medications, managing prescriptions, and accessing healthcare services.',
  "Search & Filtering: Robust search functionality and category-based navigation to enhance product and service discovery.",
  "Support & Accessibility: Dedicated help sections, including FAQs, live chat, and feedback options, ensuring users can easily seek assistance.",
  "Security & Privacy: Profile management with role-based access control to safeguard sensitive user and medical data.",
],listIndent: 1 },

{ type: 'textBullets', header: 'Structure Breakdown', items: [
  'Pharmacies: Inventory management, order tracking, CRM integration, and analytics.',
  'Healthcare Providers: Patient records, collaboration tools, and prescription management.',
  "Customers: Dashboard for health records, shopping, and order tracking.",
  "Global Components: Header (search, filters, profile), footer (privacy policies, support), and system notifications.",
],listIndent: 1 }, */

// { type: 'text', header: '', subheader: '', content: "By designing a hierarchical yet intuitive structure, we ensured that users could quickly access the most relevant features, resulting in a smoother and more efficient experience for all stakeholders.", },

{ type: 'text', header: 'Information Architecture', content: 'The IA was structured around three distinct user roles, pharmacists, customers, and healthcare providers, each with tailored navigation and dashboards. E-commerce, prescription management, and healthcare services were kept clearly separated to reduce cognitive load, with a global search and role-based access control connecting everything.' },

{ type: 'image', src: '/raseet/IA.png', },


{ type: 'text', header: 'Task Flows', subheader: 'Scenario 1: Pharmacy staff managing stock and placing bulk orders', content: "", },

{ type: 'image', src: '/raseet/3.png', maxHeight: '500px'},


{ type: 'text', header: '', subheader: 'Scenario 2: Customer ordering medicines for the first time', content: "", },

{ type: 'image', src: '/raseet/4.png', maxHeight: '500px'},

{ type: 'text', header: '', subheader: 'Scenario 3: Reordering medicines for elderly patients', content: "", },

{ type: 'image', src: '/raseet/5.png', maxHeight: '500px'},


{ type: 'text', header: 'Feature Highlight', subheader: '', content: 'Bringing the most critical pharmacy, provider, and customer actions into a single, easy-to-scan experience reduces cognitive load and speeds up everyday tasks.', align: 'center' },

{ type: 'image', src: '/raseet/final/31.png', },



// { type: 'text', header: 'Impact of Solutions', subheader: '', content: '', align: 'center' },

// { type: 'image', src: '/raseet/final/32.png', },

// { type: 'text', header: '', subheader: '', content: "", align: 'center' },


{ type: 'image', src: '/raseet/kpi.png', maxHeight: '640px' },
{ type: 'impactStatsInline' },

{ type: 'beforeAfter' },

{ type: 'text', header: 'MedScope Design System', content: 'Six months in, design inconsistencies and repeated engineering work made it clear we needed a shared system. I built MedScope from scratch using Atomic Design principles, 60+ components across atoms, molecules, organisms, and templates. Design tokens exported as JSON mapped directly to React components, so Figma updates cascaded through the codebase. Development cycle dropped from 3 weeks to 10 days.' },

// { type: 'text', header: 'MedScope: A Scalable & Systematic Design System', subheader: 'The Challenge', content: "As Raseet Health expanded, maintaining design consistency, efficiency, and scalability became a challenge. A fragmented UI led to inconsistencies in components, longer design cycles, and increased development overhead. The need for a unified design system became evident to streamline collaboration, reduce redundancy, and enhance the user experience across all touchpoints.", },

/* { type: 'textBullets', header: 'The Goal', items: [
  'Establish a scalable design system following Atomic Design Principles.',
  'Ensure cross-platform consistency while allowing flexibility for future expansions',
  "Improve efficiency by reducing time spent on repetitive UI decisions.",
  "Enable a structured decision-making process to govern component usage and modifications.",
],listIndent: 1 }, */

// { type: 'image', src: '/raseet/DS.png', },


// { type: 'text', header: 'Structuring MedScope: Design System Architecture', subheader: '', content: "", },

/* { type: 'textBullets', header: 'MedScope was built using:', items: [
  'Atomic Design Principles – Breaking down components into atoms, molecules, organisms, templates, and pages for modular reusability.',
  'A Reusable Component Library – Standardizing UI elements to ensure consistency across different features.',
  "Scalability Standards – Creating a foundation for future expansion without compromising usability.",
],listIndent: 1 },

{ type: 'textBullets', header: 'The design system encompassed:', items: [
  'Typography & Color Systems – Ensuring accessibility and brand alignment.',
  'Spacing & Grid Systems – Providing a structured layout framework.',
  "Component Library – Predefined UI elements for seamless design iteration.",
  "Interactive Patterns & States – Standardizing hover states, transitions, and user feedback mechanisms.",
],listIndent: 1 }, */


// { type: 'text', header: 'MedScope Design System Decision-Making Process: How We Built It', subheader: '', content: "A structured decision-making framework was implemented to maintain consistency and prevent design fragmentation:", },


/* { type: 'textBullets', header: '1. Assess the Need - Does a similar component exist in MedScope?', items: [
  'Yes → Use the existing component.',
  'No → Proceed to the next step.',
],listIndent: 1 },

{ type: 'textBullets', header: '2. Modify vs. Create - Can an existing component be adapted for this use case?', items: [
  'Yes → Modify and document changes in the system.',
  'No → Move to prototyping.',
],listIndent: 1 },

{ type: 'textBullets', header: '3. Prototype & Validation - If the component cannot be generalized:', items: [
  'It is added as a one-off to the repository.',
],listIndent: 1 },

{ type: 'textBullets', header: 'If it can be standardized:', items: [
  'It is documented and integrated into MedScope for global reuse.',
],listIndent: 1 },

{ type: 'textBullets', header: '4. Integration & Documentation - The new/updated component is', items: [
  'Incorporated into the design system.',
  'Guidelines and best practices are documented for seamless adoption.',
],listIndent: 1 }, */


{ type: 'image', src: '/raseet/2.png', },


// { type: 'text', header: 'Key Outcomes & Impact', subheader: '', content: "", },

// { type: 'image', src: '/bmw/Frame1.png', },


{ type: 'text', header: 'Accessibility: Designing for an inclusive experience', subheader: 'The goal', content: "Given that a significant portion of Raseet Health’s target audience includes chronic and geriatric patients, accessibility was a core consideration in the design process. The goal was to create an intuitive and frictionless experience that accommodates users with varying levels of digital literacy and physical limitations.", },

{ type: 'accessibilityContrast' },

{ type: 'raseetAccessibilitySection' },



// { type: 'text', header: 'Key Outcomes & Impact', subheader: '', content: "", align: 'center' },

// { type: 'image', src: '/raseet/final/32.png', },


{ type: 'text', header: 'Wireframes', subheader: '', content: 'Early wireframes explored multiple layout options for onboarding, home, and cart flows before we committed to high‑fidelity designs.', },
{ type: 'externalLink', label: 'Explore Figma File ↗', href: RASEET_FIGMA_MOBILE_URL, variant: 'inline' },

{ type: 'image', src: '/raseet/vids/Frame.png', maxHeight: '500px'},
// { type: 'image', src: '/raseet/vids/img-1.png', maxHeight: '500px',group: 'row'  },


{ type: 'text', header: 'UI Design', subheader: '', content: "Once the usability issues were resolved, I moved on to design the final screens in Figma. My goal was to create a visual identity aligned with the brand’s values of trust, clarity, and accessibility. I studied competitors and drew from a curated reference library to balance familiarity with differentiation.", },

{ type: 'productShowcase' },

// { type: 'text', header: 'UI Design', subheader: '', content: "Once the usability issues were resolved, I moved on to design the final screens in Figma. My goal was to create a visual identity that’s aligned with the brand’s values and message, which is: “brand motto”. Also, I’ve checked the competition and took a deep dive into my catalog of references for inspiration.", },


// { type: 'image', src: '/raseet/ui/onboarding_1.png', maxHeight: '700px' },
// { type: 'image', src: '/raseet/ui/sign_1.png', maxHeight: '700px' },
// { type: 'image', src: '/raseet/ui/home_1.png', maxHeight: '700px' },
// { type: 'image', src: '/raseet/ui/cart_1.png', maxHeight: '500px' },
// { type: 'image', src: '/raseet/ui/support_1.png', maxHeight: '700px' },


    // { type: 'video', src: '/raseet/vids/onboarding-1.mp4', maxHeight: '400px', group: 'row' },
    { type: 'video', src: '/raseet/vids/2/onboarding-2.mp4', maxHeight: '400px', group: 'row3' },
    { type: 'video', src: '/raseet/vids/2/homepage-nav.mp4', maxHeight: '640px', group: 'row3' },
    { type: 'video', src: '/raseet/vids/2/homepage-features.mp4', maxHeight: '640px', group: 'row3' },
    { type: 'video', src: '/raseet/vids/2/search.mp4', maxHeight: '500px', group: 'row3' },
    { type: 'video', src: '/raseet/vids/2/order-cart.mp4', maxHeight: '500px', group: 'row3' },
    { type: 'video', src: '/raseet/vids/2/profile.mp4', maxHeight: '500px', group: 'row3' },
   


{ type: 'text', header: 'Retrospectives', subheader: '1. Empathy-Driven Design', content: "The iterative design process, grounded in user feedback, ensured that the platform met the unique needs of pharmacists, healthcare providers, and customers.", },

// { type: 'image', src: '/raseet/final/33.png', },


// { type: 'textBullets', header: '2. Importance of Simplicity', items: [
//   'Simplified workflows and intuitive interfaces reduced onboarding barriers and user frustration.',
//   'Streamlined experiences, like the improved checkout process, significantly boosted user satisfaction and engagement.',
// ],listIndent: 1 },

// { type: 'textBullets', header: '3. Leveraging Ecosystem Synergy', items: [
//   'Integrating tools and features within the Raseet Health ecosystem enhanced its value proposition for both users and the business.',
//   'Example: The seamless connection between inventory management and customer-facing features created a cohesive experience.',
// ],listIndent: 1 },



// { type: 'image', src: '/raseet/final/33.png', },


// { type: 'text', header: 'Collaboration at Raseet Health', subheader: '', content: "At Raseet Health, collaboration was a fundamental part of the design process. As the Product/UX Designer, I worked closely with cross-functional teams, ensuring that design decisions were aligned with business goals, technical feasibility, and user needs.", },

{ type: 'text', header: 'Collaboration', content: 'Worked directly with co-founders on product strategy, engineers in daily sprints during critical launches, pharmacy partners for operational validation, and support teams for post-launch iteration. Every major design decision was tested against real operational constraints before shipping.' },

{ type: 'image', src: '/raseet/1.png', maxHeight: '640px' },

// { type: 'text', header: 'How collaboration shaped the final product', subheader: '', content: 'Regular touchpoints with founders, engineers, pharmacists, and support teams ensured that each iteration reflected both user insight and operational reality.', },

// { type: 'image', src: '/raseet/final/34.png', },

{ type: 'text', header: 'Lessons learned', subheader: '', content: 'Designing in healthcare means designing for trust, patience, and clarity. Small details, like copy, empty states, and recovery paths, have outsized impact on whether people feel safe using the product.', },

// { type: 'textTextRow', headerLeft: 'Continuous Feedback Is Key', contentLeft: "", headerRight: '', contentRight: "Regular usability testing and feedback loops were instrumental in identifying areas for improvement and driving iterative changes." },

// { type: 'textTextRow', headerLeft: 'Localized Solutions Matter', contentLeft: "", headerRight: '', contentRight: "Localized onboarding guides and multilingual support helped expand adoption in diverse regions." },


// { type: 'textTextRow', headerLeft: 'Trust Is Foundational', contentLeft: "", headerRight: '', contentRight: "Transparent communication about data privacy and security built confidence among users, addressing one of the biggest barriers to digital adoption." },

{ type: 'image', src: '/raseet/7.png', maxHeight: '640px' },


// { type: 'text', header: 'Closing Reflections', subheader: '', content: "The success of Raseet Health lies in its ability to empower local pharmacies, improve healthcare accessibility for customers, and foster seamless collaboration across stakeholders. By continuously iterating based on user feedback and leveraging technology to solve real-world problems, Raseet Health achieved its mission to make quality healthcare accessible and equitable.", },

{ type: 'text', header: 'Reflections', content: '' },
{ type: 'textBullets', header: '', items: [
  'Involving engineers from day one changed how I design. Early at Raseet I handed off designs that required costly rework. After building a habit of daily syncs during sprints, implementation surprises dropped significantly and the final product matched the intent.',
  'Designing for elderly users taught me that accessibility constraints make everything better. The first chronic care design was modern and clean, and completely unusable for the people who needed it most. Rebuilding it under the constraint of clarity over aesthetics produced a stronger product for every user group, not just elderly patients.',
  'Data without session recordings is just numbers. The prescription upload drop-off was visible in Mixpanel for weeks. The real insight, that users were confused about which documents to upload and worried about privacy, only came from watching actual session recordings. The fix was messaging and trust, not the upload interface itself.',
], listIndent: 0 },

  ];

  // ═══════════════════════════════════════════════════════════════════════
  // DISPLAY CODE BELOW - Don't edit unless you know what you're doing
  // ═══════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-white" style={{ overflowX: 'hidden', paddingBottom: 0 }}>
      <style>{`
        .raseet-hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          border: 1px solid #1A6B8A;
          background: #1A6B8A;
          color: #ffffff;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .raseet-hero-cta:hover {
          background: #155A74;
          border-color: #155A74;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(26, 107, 138, 0.28);
        }
        .raseet-hero-cta:active {
          background: #124E65;
          border-color: #124E65;
          transform: translateY(0px);
          box-shadow: 0 6px 14px rgba(18, 78, 101, 0.24);
        }
        .raseet-hero-cta:focus-visible {
          outline: 2px solid #1A6B8A;
          outline-offset: 2px;
        }
        .raseet-hero-cta-arrow {
          transition: transform 0.2s ease;
        }
        .raseet-hero-cta:hover .raseet-hero-cta-arrow {
          transform: translate(2px, -2px);
        }
        .raseet-sidebar-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #1A6B8A;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.5;
          transition: color 0.2s ease;
          text-decoration: none;
        }
        .raseet-sidebar-link-label {
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-color: rgba(26, 107, 138, 0.45);
          transition: text-decoration-color 0.2s ease;
        }
        .raseet-inline-link {
          color: #1A6B8A;
          font-size: 15px;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-color: rgba(26, 107, 138, 0.45);
          transition: color 0.2s ease, text-decoration-color 0.2s ease;
        }
        .raseet-inline-link:hover {
          color: #155A74;
          text-decoration-color: rgba(21, 90, 116, 0.95);
        }
        .raseet-inline-link:active {
          color: #124E65;
        }
        .raseet-sidebar-link-arrow {
          transition: transform 0.2s ease;
        }
        .raseet-sidebar-link:hover {
          color: #155A74;
        }
        .raseet-sidebar-link:hover .raseet-sidebar-link-label {
          text-decoration-color: rgba(21, 90, 116, 0.95);
        }
        .raseet-sidebar-link:hover .raseet-sidebar-link-arrow {
          transform: translate(2px, -2px);
        }
        .raseet-sidebar-link:active {
          color: #124E65;
        }
        .raseet-impact-stats {
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          padding: 48px clamp(40px, 5vw, 72px);
          border-top: 1px solid rgba(26, 107, 138, 0.35);
          border-bottom: 1px solid rgba(26, 107, 138, 0.35);
          opacity: 1;
          transition: opacity 0.5s ease;
        }
        .raseet-impact-stats.is-visible {
          opacity: 1;
        }
        .raseet-impact-stat-value {
          color: #1A6B8A;
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
        @media (max-width: 768px) {
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
          #case-study-start div:has(> div > video[src*='/raseet/vids/']) {
            gap: 16px !important;
            align-items: center !important;
            height: auto !important;
          }
          #case-study-start div:has(> div > video[src*='/raseet/vids/']) > div {
            width: auto !important;
            max-width: 100% !important;
            justify-content: center !important;
          }
          #case-study-start video[src*='/raseet/vids/'] {
            max-height: 300px !important;
            width: auto !important;
            height: auto !important;
            max-width: 100% !important;
          }
          #case-study-start video[src*='PP-demo'],
          #case-study-start video[src*='HP-demo'] {
            max-height: 200px !important;
          }
          #case-study-start video[src*='PERSONA'],
          #case-study-start video[src*='/raseet/EM'],
          #case-study-start video[src*='/raseet/UJ'] {
            max-height: 400px !important;
            width: auto !important;
            height: auto !important;
            max-width: 100% !important;
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
        className="w-full flex items-center justify-center overflow-hidden"
        style={{ height: 'clamp(300px, 42vw, 500px)', backgroundColor: headerColor }}
      >
        <div className="h-full w-full flex items-center justify-center p-4">
          {headerIcon ? (
            <div className="h-full w-full flex items-center justify-center min-h-0">
              {(() => {
                const iconPath = headerIcon;
                if (!iconPath) return null;
                const isVideo = iconPath.endsWith('.mp4') || iconPath.endsWith('.webm');
                const sizeClasses = 'max-h-full max-w-full object-contain';
                if (isVideo) {
                  return (
                    <LoopingVideo src={iconPath} className={sizeClasses} />
                  );
                }
                return (
                  <ImageWithFallback src={iconPath} alt={`${title} icon`} className={sizeClasses} priority enableLightbox={false} />
                );
              })()}
            </div>
        ) : (
          <svg className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]" viewBox="0 0 24 24" fill="white">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
        )}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 md:gap-16">
          <div className="space-y-8 order-2 md:order-none">
            {icon ? (
              <div className="block" style={{ width: 48, height: 48 }}>
                <ImageWithFallback
                  src={icon.startsWith('/') ? icon : `/${icon}`}
                  alt={`${title} icon`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            ) : (
              <div className="block">
                <svg className="w-[48px] h-[48px]" viewBox="0 0 24 24" fill="currentColor">
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
                  <a
                    href={RASEET_WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="raseet-sidebar-link"
                  >
                    <span className="raseet-sidebar-link-label">Live Website</span>
                    <span className="raseet-sidebar-link-arrow">↗</span>
                  </a>
                  <a
                    href={RASEET_FIGMA_MOBILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="raseet-sidebar-link"
                  >
                    <span className="raseet-sidebar-link-label">Mobile App Prototype</span>
                    <span className="raseet-sidebar-link-arrow">↗</span>
                  </a>
                  <a
                    href={RASEET_FIGMA_PARTNER_DASHBOARD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="raseet-sidebar-link"
                  >
                    <span className="raseet-sidebar-link-label">Partner Pharmacy Dashboard</span>
                    <span className="raseet-sidebar-link-arrow">↗</span>
                  </a>
                  <a
                    href={RASEET_FIGMA_HCP_DASHBOARD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="raseet-sidebar-link"
                  >
                    <span className="raseet-sidebar-link-label">Healthcare Provider Dashboard</span>
                    <span className="raseet-sidebar-link-arrow">↗</span>
                  </a>
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
              <div>
                <a
                  href={RASEET_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="raseet-hero-cta"
                >
                  <span>Visit Raseet Health</span>
                  <span className="raseet-hero-cta-arrow">↗</span>
                </a>
              </div>
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
          style={{ scrollMarginTop: 'var(--nav-height, 80px)', paddingBottom: 0 }}
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
              if (block.header === 'Project Statement') {
                return (
                  <div key={index} className="space-y-16">
                    <RaseetImpactStatsAnimatedBlock />
                    <div className={`space-y-6 ${getAlignClass(block.align)}`}>
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
                      <p
                        className="text-[18px] leading-[1.85] text-gray-700"
                        style={contentMargin ? { marginLeft: contentMargin } : undefined}
                      >
                        {block.content}
                      </p>
                      {block.items && block.items.length > 0 && (
                        <ul
                          className="list-disc text-[18px] leading-[1.85] text-gray-700 space-y-2 pl-6"
                          style={{
                            marginLeft: getListIndentMargin(block.itemsIndent ?? 0),
                          }}
                        >
                          {block.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              }
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
                  <p
                    className="text-[18px] leading-[1.85] text-gray-700"
                    style={contentMargin ? { marginLeft: contentMargin } : undefined}
                  >
                    {block.content}
                  </p>
                  {block.items && block.items.length > 0 && (
                    <ul
                      className="list-disc text-[18px] leading-[1.85] text-gray-700 space-y-2 pl-6"
                      style={{
                        marginLeft: getListIndentMargin(block.itemsIndent ?? 0),
                      }}
                    >
                      {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
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
                    className="space-y-2 text-[18px] leading-[1.85] text-gray-700 pl-6"
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
              return (
                <div key={index} className="w-full">
                  <RaseetAccessibilityNativeSection />
                </div>
              );
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
                        fill="#1A6B8A"
                        fillOpacity="0.12"
                        stroke="#1A6B8A"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                      />
                      {/* User circle */}
                      <circle
                        cx="380"
                        cy="160"
                        r="130"
                        fill="#1A6B8A"
                        fillOpacity="0.12"
                        stroke="#1A6B8A"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                      />
                      {/* Shared overlap highlight */}
                      <ellipse cx="300" cy="160" rx="55" ry="95" fill="#1A6B8A" fillOpacity="0.25" />

                      {/* Business label */}
                      <text x="165" y="120" textAnchor="middle" fill="#1A6B8A" fontSize="13" fontWeight="700" fontFamily="inherit">
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
                      <text x="300" y="143" textAnchor="middle" fill="#1A6B8A" fontSize="12" fontWeight="700" fontFamily="inherit">
                        Shared
                      </text>
                      <text x="300" y="160" textAnchor="middle" fill="#1A6B8A" fontSize="10" fontFamily="inherit">
                        Trust
                      </text>
                      <text x="300" y="175" textAnchor="middle" fill="#1A6B8A" fontSize="10" fontFamily="inherit">
                        Simplicity
                      </text>
                      <text x="300" y="190" textAnchor="middle" fill="#1A6B8A" fontSize="10" fontFamily="inherit">
                        Access
                      </text>

                      {/* User label */}
                      <text x="435" y="120" textAnchor="middle" fill="#1A6B8A" fontSize="13" fontWeight="700" fontFamily="inherit">
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
                          borderTop: '3px solid #1A6B8A',
                          padding: '24px',
                          background: 'rgba(26, 107, 138, 0.03)',
                          borderRadius: '0 0 8px 8px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#1A6B8A',
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
                            color: '#1A6B8A',
                            fontWeight: 600,
                            lineHeight: 1.6,
                            paddingTop: '8px',
                            borderTop: '1px solid rgba(26, 107, 138, 0.15)',
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
                            color: '#1A6B8A',
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
                              color: '#1A6B8A',
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
                                <span style={{ fontSize: '11px', color: '#1A6B8A', fontWeight: 600 }}>
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
                            borderTop: '3px solid #1A6B8A',
                            borderRadius: '0 0 8px 8px',
                            padding: '20px',
                            background: 'rgba(26,107,138,0.02)',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#1A6B8A',
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
                                    color: '#1A6B8A',
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
                              color: '#1A6B8A',
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
                          color: '#1A6B8A',
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
                                color: '#1A6B8A',
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
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1A6B8A', marginBottom: '8px' }}>
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
                      className="inline-flex items-center justify-center px-4 py-3 border border-[#1A6B8A] text-[#1A6B8A] text-[14px] font-bold hover:bg-[#1A6B8A] hover:text-white transition-colors"
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
              return <RaseetImpactStatsAnimatedBlock key={index} />;
            }
            if (block.type === 'colors') {
              return (
                <div key={index} className="grid grid-cols-4 gap-4">
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
          <div className="flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap">
              Designed and Developed.
            </span>
            <span>© 2026</span>
          </div>
          
          <div className="flex items-center gap-3 md:gap-5">
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
