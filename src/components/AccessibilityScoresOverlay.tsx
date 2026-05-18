import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import {
  formatScoresUpdatedAt,
  scoreTone,
  type LighthouseCategory,
  type PageSpeedResult,
} from '../services/pageSpeedScores';

const CATEGORY_LABELS: Record<LighthouseCategory, string> = {
  performance: 'Performance',
  accessibility: 'Accessibility',
  'best-practices': 'Best Practices',
  seo: 'SEO',
};

const TONE_STYLES = {
  good: { ring: 'border-[#216e39]', text: 'text-[#216e39]', bg: 'bg-[#e8f5ec]' },
  ok: { ring: 'border-[#c67600]', text: 'text-[#c67600]', bg: 'bg-[#fff8eb]' },
  poor: { ring: 'border-[#c0392b]', text: 'text-[#c0392b]', bg: 'bg-[#fef2f2]' },
} as const;

type AccessibilityScoresOverlayProps = {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  error: string | null;
  result: PageSpeedResult | null;
  onRetry: () => void;
};

function ScoreRing({ label, score }: { label: string; score: number }) {
  const tone = scoreTone(score);
  const styles = TONE_STYLES[tone];

  return (
    <div className="flex flex-col items-center gap-2 min-w-[4.5rem]">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full border-[3px] ${styles.ring} ${styles.bg}`}
        aria-label={`${label}: ${score} out of 100`}
      >
        <span className={`type-body font-semibold tabular-nums ${styles.text}`}>{score}</span>
      </div>
      <span className="type-caption text-gray-500 text-center leading-snug">{label}</span>
    </div>
  );
}

export function AccessibilityScoresOverlay({
  open,
  onClose,
  loading,
  error,
  result,
  onRetry,
}: AccessibilityScoresOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/25 backdrop-blur-[1px]"
        aria-label="Close scores overlay"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-scores-title"
        className="relative w-full max-w-md rounded-2xl border border-black/[0.06] bg-white shadow-[var(--shadow-depth)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-5 py-4">
          <div>
            <h2 id="accessibility-scores-title" className="type-body-lg text-gray-900 font-semibold">
              Site quality scores
            </h2>
            <p className="type-caption text-gray-500 mt-1">
              Lighthouse metrics for hrithiksanyal.com (mobile)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-6">
          {loading ? (
            <p className="type-body text-gray-500 text-center py-8">Running Lighthouse audit…</p>
          ) : null}

          {!loading && error ? (
            <div className="text-center py-6 space-y-4">
              <p className="type-body text-gray-600">{error}</p>
              <button
                type="button"
                onClick={onRetry}
                className="type-body text-gray-900 underline hover:text-gray-600"
              >
                Try again
              </button>
            </div>
          ) : null}

          {!loading && !error && result ? (
            <>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                {(Object.keys(CATEGORY_LABELS) as LighthouseCategory[]).map((key) => (
                  <ScoreRing key={key} label={CATEGORY_LABELS[key]} score={result.scores[key]} />
                ))}
              </div>
              <p className="type-caption text-gray-400 text-center mt-6 pt-4 border-t border-black/[0.06]">
                Last updated: {formatScoresUpdatedAt(result.fetchedAt)}
              </p>
              <p className="type-caption text-gray-400 text-center mt-2">
                Scores from Google PageSpeed Insights. Results may vary by network and cache.
              </p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
