import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';

export const DEFAULT_CASE_STUDY_BRAND = '#1A6B8A';

function useInViewEl<T extends Element>(
  ref: React.RefObject<T | null>,
  rootMargin = '120px',
  threshold = 0.15
): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin, threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin, threshold]);
  return inView;
}

export function CaseStudyQuoteBlock({
  quote,
  brandColor,
  delayMs = 0,
}: {
  quote: string;
  brandColor: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewEl(ref, '120px', 0.15);
  const [quoteMarkSize, setQuoteMarkSize] = useState('8rem');
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 768px)');
    const apply = () => setQuoteMarkSize(mql.matches ? '4rem' : '8rem');
    apply();
    mql.addEventListener('change', apply);
    return () => mql.removeEventListener('change', apply);
  }, []);
  return (
    <div
      ref={ref}
      className="case-study-quote-block w-full"
      style={{
        padding: '24px 0',
        opacity: inView ? 1 : 0,
        transition: `opacity 0.55s ease ${delayMs}ms`,
      }}
    >
      <div className="w-full">
        <div className="flex w-full justify-start">
          <span
            aria-hidden
            style={{
              color: brandColor,
              fontSize: quoteMarkSize,
              lineHeight: 0,
              opacity: 0.15,
            }}
          >
            {'"'}
          </span>
        </div>
        <p
          className="w-full text-center"
          style={{
            fontSize: '1.25rem',
            fontStyle: 'italic',
            fontWeight: 600,
            color: brandColor,
            lineHeight: 1.65,
            margin: '0.75rem 0 0',
          }}
        >
          {quote}
        </p>
      </div>
    </div>
  );
}

export type CaseStudyStatStripItem = {
  Icon: LucideIcon;
  label: string;
  /** Optional muted second line under the label (e.g. supporting context). */
  labelDetail?: string;
  top: string;
  countEnd?: number;
  prefix?: string;
  suffix?: string;
};

const COUNT_UP_DURATION_MS = 1200;
const COUNT_UP_STAGGER_MS = 100;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Parse a display string for count-up: leading number animates; ranges and non-numeric text stay static. */
export function parseStatValueString(raw: string):
  | { kind: 'static'; text: string }
  | { kind: 'animate'; end: number; prefix: string; suffix: string } {
  const s = raw.trim();
  if (!s) return { kind: 'static', text: '' };
  if (/^\d+\s*-\s*\d+/.test(s)) {
    return { kind: 'static', text: s };
  }
  const m = s.match(/^(\D*)(\d{1,3}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { kind: 'static', text: s };
  const prefix = m[1] ?? '';
  const suffix = m[3] ?? '';
  if (/^\s*-\s*\d/.test(suffix)) {
    return { kind: 'static', text: s };
  }
  const end = parseFloat(m[2].replace(/,/g, ''));
  if (Number.isNaN(end)) return { kind: 'static', text: s };
  return { kind: 'animate', end, prefix, suffix };
}

function resolveStripItem(item: CaseStudyStatStripItem):
  | { kind: 'static'; text: string }
  | { kind: 'animate'; end: number; prefix: string; suffix: string } {
  if (item.countEnd !== undefined) {
    return {
      kind: 'animate',
      end: item.countEnd,
      prefix: item.prefix ?? '',
      suffix: item.suffix ?? '',
    };
  }
  return parseStatValueString(item.top);
}

function formatAnimatedNumber(end: number, current: number): string {
  const rounded = Math.round(current);
  if (end >= 1000 || rounded >= 1000) {
    return rounded.toLocaleString('en-US');
  }
  return String(rounded);
}

function formatStripValue(
  resolved: ReturnType<typeof resolveStripItem>,
  value: number,
  inView: boolean
): string {
  if (resolved.kind === 'static') return resolved.text;
  const v = inView ? value : 0;
  return `${resolved.prefix}${formatAnimatedNumber(resolved.end, v)}${resolved.suffix}`;
}

export function CaseStudyStatStrip({
  brandColor,
  items,
  labelMaxWidth = 160,
}: {
  brandColor: string;
  items: CaseStudyStatStripItem[];
  /** Wider labels for insight-style rows (px). */
  labelMaxWidth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const [statsInView, setStatsInView] = useState(false);
  const [values, setValues] = useState<number[]>(() => items.map(() => 0));

  const resolved = useMemo(() => items.map(resolveStripItem), [items]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setStatsInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frameIds: (number | undefined)[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    if (!statsInView) {
      setValues(itemsRef.current.map(() => 0));
      return () => {
        frameIds.forEach((id) => id && cancelAnimationFrame(id));
        timeouts.forEach((t) => clearTimeout(t));
      };
    }

    const currentResolved = itemsRef.current.map(resolveStripItem);
    setValues(itemsRef.current.map(() => 0));

    currentResolved.forEach((cfg, index) => {
      if (cfg.kind !== 'animate') return;
      const end = cfg.end;
      const timeout = setTimeout(() => {
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / COUNT_UP_DURATION_MS, 1);
          const eased = easeOutCubic(progress);
          const nextValue = Math.round(end * eased);
          setValues((prev) => {
            const clone = [...prev];
            clone[index] = nextValue;
            return clone;
          });
          if (progress < 1) {
            frameIds[index] = requestAnimationFrame(animate);
          }
        };
        frameIds[index] = requestAnimationFrame(animate);
      }, index * COUNT_UP_STAGGER_MS);
      timeouts.push(timeout);
    });

    return () => {
      frameIds.forEach((id) => id && cancelAnimationFrame(id));
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [statsInView]);

  const stripStyle: CSSProperties = {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100vw',
    padding: '24px clamp(40px, 5vw, 72px)',
  };

  const valueStyle: CSSProperties = {
    color: brandColor,
    fontSize: '3rem',
    fontWeight: 800,
    lineHeight: 1.1,
  };

  const labelStyle: CSSProperties = {
    color: '#6b7280',
    fontSize: '0.8rem',
    lineHeight: 1.45,
    maxWidth: labelMaxWidth,
  };

  const labelDetailStyle: CSSProperties = {
    fontSize: '0.75rem',
    color: '#9ca3af',
    marginTop: '2px',
    lineHeight: 1.45,
    maxWidth: labelMaxWidth,
  };

  return (
    <div ref={ref} className="case-study-stat-strip w-full" style={stripStyle}>
      <div
        className="hidden md:flex items-start justify-between gap-6"
        style={{
          opacity: statsInView ? 1 : 0,
          transform: statsInView ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${item.top}-${index}`}
            className="text-center flex-1 min-w-0 flex flex-col items-center"
            style={{
              opacity: statsInView ? 1 : 0,
              transform: statsInView ? 'translateY(0)' : 'translateY(14px)',
              transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
            }}
          >
            <p className="m-0" style={valueStyle}>
              {formatStripValue(resolved[index], values[index], statsInView)}
            </p>
            <item.Icon
              size={52}
              color={brandColor}
              strokeWidth={2}
              className="shrink-0"
              style={{ marginTop: '12px' }}
              aria-hidden
            />
            <p className="m-0" style={{ ...labelStyle, marginTop: '8px' }}>
              {item.label}
            </p>
            {item.labelDetail ? (
              <p className="m-0" style={labelDetailStyle}>
                {item.labelDetail}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <div className="md:hidden">
        <div
          className="grid grid-cols-2 gap-3"
          style={{
            opacity: statsInView ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          {items.map((item, index) => (
            <div
              key={`m-${item.top}-${index}`}
              className={
                items.length === 3 && index === 2
                  ? 'col-span-2 text-center'
                  : items.length === 1
                    ? 'col-span-2 text-center'
                    : 'text-center'
              }
              style={{
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? 'translateY(0)' : 'translateY(14px)',
                transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
              }}
            >
              <p className="m-0 flex justify-center" style={valueStyle}>
                {formatStripValue(resolved[index], values[index], statsInView)}
              </p>
              <div className="flex justify-center">
                <item.Icon
                  size={52}
                  color={brandColor}
                  strokeWidth={2}
                  className="shrink-0"
                  style={{ marginTop: '12px' }}
                  aria-hidden
                />
              </div>
              <p className="m-0 mx-auto" style={{ ...labelStyle, marginTop: '8px' }}>
                {item.label}
              </p>
              {item.labelDetail ? (
                <p className="m-0 mx-auto text-center" style={labelDetailStyle}>
                  {item.labelDetail}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Single centered stat: optional prefix line, large %/number, icon, label. */
export function CaseStudyHighlightStat({
  brandColor,
  prefix,
  main,
  label,
  Icon,
}: {
  brandColor: string;
  prefix?: string;
  main: string;
  label: string;
  Icon: LucideIcon;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  const [value, setValue] = useState(0);
  const parsed = useMemo(() => parseStatValueString(main), [main]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setStatsInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const frameIds: number[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    if (!statsInView) {
      if (parsed.kind === 'animate') setValue(0);
      return () => {
        cancelled = true;
        frameIds.forEach((id) => cancelAnimationFrame(id));
        timeouts.forEach((t) => clearTimeout(t));
      };
    }

    if (parsed.kind !== 'animate') {
      return () => {
        cancelled = true;
        frameIds.forEach((id) => cancelAnimationFrame(id));
        timeouts.forEach((t) => clearTimeout(t));
      };
    }

    setValue(0);
    const end = parsed.end;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const animate = (now: number) => {
        if (cancelled) return;
        const progress = Math.min((now - start) / COUNT_UP_DURATION_MS, 1);
        const eased = easeOutCubic(progress);
        setValue(Math.round(end * eased));
        if (progress < 1) {
          frameIds.push(requestAnimationFrame(animate));
        }
      };
      frameIds.push(requestAnimationFrame(animate));
    }, 0);
    timeouts.push(timeout);

    return () => {
      cancelled = true;
      frameIds.forEach((id) => cancelAnimationFrame(id));
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [statsInView, parsed]);

  const mainDisplay =
    parsed.kind === 'static'
      ? main
      : `${parsed.prefix}${formatAnimatedNumber(parsed.end, statsInView ? value : 0)}${parsed.suffix}`;

  return (
    <div
      ref={ref}
      className="w-full flex flex-col items-center text-center"
      style={{
        padding: '24px 0',
        opacity: statsInView ? 1 : 0,
        transform: statsInView ? 'translateY(0)' : 'translateY(14px)',
        transition: 'opacity 0.55s ease, transform 0.55s ease',
      }}
    >
      {prefix ? (
        <p className="m-0 text-[15px] font-medium text-gray-900 mb-1">{prefix}</p>
      ) : null}
      <p className="m-0" style={{ color: brandColor, fontSize: '3rem', fontWeight: 800, lineHeight: 1.1 }}>
        {mainDisplay}
      </p>
      <Icon size={52} color={brandColor} strokeWidth={2} className="shrink-0" style={{ marginTop: '12px' }} aria-hidden />
      <p
        className="m-0 mx-auto"
        style={{
          color: '#6b7280',
          fontSize: '0.8rem',
          lineHeight: 1.45,
          maxWidth: 280,
          marginTop: '8px',
        }}
      >
        {label}
      </p>
    </div>
  );
}
