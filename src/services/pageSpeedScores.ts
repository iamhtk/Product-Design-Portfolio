import { SITE_URL } from '../seo/siteConfig';

export type LighthouseCategory =
  | 'performance'
  | 'accessibility'
  | 'best-practices'
  | 'seo';

export type LighthouseScores = Record<LighthouseCategory, number>;

export type PageSpeedResult = {
  scores: LighthouseScores;
  fetchedAt: number;
  strategy: 'mobile' | 'desktop';
  url: string;
};

const CACHE_KEY = 'portfolio_pagespeed_scores_v1';
const CACHE_TTL_MS = 60 * 60 * 1000;

const PSI_CATEGORIES: Record<LighthouseCategory, string> = {
  performance: 'PERFORMANCE',
  accessibility: 'ACCESSIBILITY',
  'best-practices': 'BEST_PRACTICES',
  seo: 'SEO',
};

function readCache(url: string, strategy: 'mobile' | 'desktop'): PageSpeedResult | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PageSpeedResult;
    if (parsed.url !== url || parsed.strategy !== strategy) return null;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(result: PageSpeedResult) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(result));
  } catch {
    // ignore quota errors
  }
}

export async function fetchPageSpeedScores(
  url: string = SITE_URL,
  strategy: 'mobile' | 'desktop' = 'mobile',
): Promise<PageSpeedResult> {
  const cached = readCache(url, strategy);
  if (cached) return cached;

  const api = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  api.searchParams.set('url', url);
  api.searchParams.set('strategy', strategy);
  Object.values(PSI_CATEGORIES).forEach((category) => {
    api.searchParams.append('category', category);
  });

  const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY;
  if (apiKey) api.searchParams.set('key', apiKey);

  const response = await fetch(api.toString());
  if (!response.ok) {
    throw new Error(`PageSpeed API error (${response.status})`);
  }

  const data = (await response.json()) as {
    lighthouseResult?: {
      categories?: Record<string, { score?: number | null }>;
    };
  };

  const categories = data.lighthouseResult?.categories ?? {};
  const scores: LighthouseScores = {
    performance: Math.round((categories.performance?.score ?? 0) * 100),
    accessibility: Math.round((categories.accessibility?.score ?? 0) * 100),
    'best-practices': Math.round((categories['best-practices']?.score ?? 0) * 100),
    seo: Math.round((categories.seo?.score ?? 0) * 100),
  };

  const result: PageSpeedResult = {
    scores,
    fetchedAt: Date.now(),
    strategy,
    url,
  };

  writeCache(result);
  return result;
}

export function scoreTone(score: number): 'good' | 'ok' | 'poor' {
  if (score >= 90) return 'good';
  if (score >= 50) return 'ok';
  return 'poor';
}

export function formatScoresUpdatedAt(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
