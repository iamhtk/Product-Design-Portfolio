import { useEffect, useState } from 'react';
import { ScrollToTop } from './ScrollToTop';
import { AnimateIn } from './AnimateIn';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Range = '7d' | '30d';

type AnalyticsSummary = {
  range: Range;
  totalRequests: number;
  totalPageViews: number;
  uniqueVisitors: number;
  threats: number;
  bandwidth: string;
  bandwidthBytes: number;
  timeseries: { date: string; requests: number; pageViews: number }[];
};

export function AnalyticsDashboard() {
  const [range, setRange] = useState<Range>('7d');
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Debug: confirm fetch is being reached
        // eslint-disable-next-line no-console
        console.log('fetching analytics...', { range });
        const res = await fetch(`/api/analytics/summary?range=${range}`);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const json = (await res.json()) as AnalyticsSummary;
        if (!cancelled) {
          setData(json);
        }
      } catch (e) {
        if (!cancelled) {
          setError('Unable to load analytics data. Please try again later.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    void fetchData();
    return () => {
      cancelled = true;
    };
  }, [range]);

  const formatNumber = (value: number) =>
    value.toLocaleString('en-US', { maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen pt-20 bg-[#050816] text-gray-100">
      <ScrollToTop />
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <AnimateIn variant="up" rootMargin="0px" className="mb-10 md:mb-12">
          <h1 className="type-h1 text-gray-100 mb-2">Analytics</h1>
          <p className="type-body text-gray-400 max-w-[640px]">
            Internal dashboard powered by Cloudflare Analytics. Data is proxied
            through a secure server-side endpoint so tokens never live in the
            browser.
          </p>
        </AnimateIn>

        <AnimateIn variant="up" rootMargin="0px 0px -40px 0px" className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="type-overline text-gray-500">Overview</h2>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
              {(['7d', '30d'] as Range[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRange(option)}
                  className={`px-3 py-1.5 text-[13px] rounded-full cursor-pointer transition-colors ${
                    range === option
                      ? 'bg-white text-gray-900'
                      : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {option === '7d' ? 'Last 7 days' : 'Last 30 days'}
                </button>
              ))}
            </div>
          </div>
        </AnimateIn>

        {loading && (
          <div className="mb-10">
            <div className="h-2 w-32 bg-white/10 rounded-full animate-pulse" />
          </div>
        )}
        {error && (
          <div className="mb-10 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-[14px] text-red-200">
            {error}
          </div>
        )}

        {data && (
          <>
            {/* KPI cards */}
            <AnimateIn
              variant="up"
              rootMargin="0px 0px -40px 0px"
              className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 mb-12"
            >
              <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.55)]">
                <p className="type-caption text-gray-400 mb-1">Total Requests</p>
                <p className="text-[24px] md:text-[28px] font-semibold text-white">
                  {formatNumber(data.totalRequests)}
                </p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.55)]">
                <p className="type-caption text-gray-400 mb-1">Page Views</p>
                <p className="text-[24px] md:text-[28px] font-semibold text-white">
                  {formatNumber(data.totalPageViews)}
                </p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.55)]">
                <p className="type-caption text-gray-400 mb-1">Unique Visitors</p>
                <p className="text-[24px] md:text-[28px] font-semibold text-white">
                  {formatNumber(data.uniqueVisitors)}
                </p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.55)]">
                <p className="type-caption text-gray-400 mb-1">Threats</p>
                <p className="text-[24px] md:text-[28px] font-semibold text-white">
                  {formatNumber(data.threats)}
                </p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.55)]">
                <p className="type-caption text-gray-400 mb-1">Bandwidth</p>
                <p className="text-[24px] md:text-[28px] font-semibold text-white">
                  {data.bandwidth}
                </p>
              </div>
            </AnimateIn>

            <AnimateIn
              variant="up"
              rootMargin="0px 0px -40px 0px"
              className="mb-12"
            >
              <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-white/[0.02] shadow-[0_24px_60px_rgba(15,23,42,0.75)] px-4 py-4 md:px-6 md:py-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="type-overline text-gray-400">Traffic over time</h3>
                  <p className="type-caption text-gray-500">
                    Requests vs page views ({data.range})
                  </p>
                </div>
                <div className="h-[260px] md:h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data.timeseries}
                      margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis
                        dataKey="date"
                        stroke="#9ca3af"
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#020617',
                          border: '1px solid #1f2937',
                          borderRadius: 8,
                          padding: '8px 10px',
                        }}
                        labelStyle={{ color: '#e5e7eb', fontSize: 12 }}
                      />
                      <Legend
                        wrapperStyle={{
                          paddingTop: 8,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="requests"
                        name="Requests"
                        stroke="#60a5fa"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="pageViews"
                        name="Page Views"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </AnimateIn>
          </>
        )}
      </div>
    </div>
  );
}

