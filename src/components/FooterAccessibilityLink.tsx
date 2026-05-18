import { useCallback, useState } from 'react';
import { AccessibilityScoresOverlay } from './AccessibilityScoresOverlay';
import { fetchPageSpeedScores, type PageSpeedResult } from '../services/pageSpeedScores';

export function FooterAccessibilityLink() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PageSpeedResult | null>(null);

  const loadScores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPageSpeedScores();
      setResult(data);
    } catch {
      setError('Could not load scores right now. Please try again in a moment.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
    if (!result && !loading) void loadScores();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="type-caption text-gray-500 underline underline-offset-2 hover:text-gray-900 transition-colors whitespace-nowrap"
      >
        How accessible is this website?
      </button>
      <AccessibilityScoresOverlay
        open={open}
        onClose={() => setOpen(false)}
        loading={loading}
        error={error}
        result={result}
        onRetry={() => void loadScores()}
      />
    </>
  );
}

export function FooterCreditsRow() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="whitespace-nowrap">Designed & Developed by Hrithik Sanyal.</span>
      <span>© 2026</span>
      <FooterAccessibilityLink />
    </div>
  );
}
