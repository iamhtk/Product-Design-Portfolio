import type { ComponentProps, ReactNode } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";
import "react-activity-calendar/tooltips.css";
import { AnimateIn } from "./AnimateIn";

const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4/";

/** Smaller heatmap cells on narrow viewports so the chart needs less horizontal scroll. */
const NARROW_CHART_QUERY = "(max-width: 639px)";

/** Oldest calendar year shown in the sidebar (matches GitHub profile). */
const YEAR_RANGE_END = 2020;

/** GitHub-style greens on a light background (matches profile heatmap). */
const HEATMAP_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

/** Cap vertical scale so the chart grows toward the year rail height without extreme zoom. */
const CHART_SCALE_MAX = 4.25;

type ContributionsPayload = {
  total: Record<string, number>;
  contributions: Activity[];
  error?: string;
};

/** Rolling 52-week view (GitHub default) vs a calendar year. */
type YearTab = "last" | number;

function buildCalendarYearOptions(nowYear: number): number[] {
  const out: number[] = [];
  for (let y = nowYear; y >= YEAR_RANGE_END; y--) out.push(y);
  return out;
}

function sumContributions(rows: Activity[]): number {
  return rows.reduce((sum, c) => sum + c.count, 0);
}

function totalFromPayload(json: ContributionsPayload, tab: YearTab): number {
  if (tab === "last") {
    const last = json.total.lastYear;
    if (typeof last === "number") return last;
    return sumContributions(json.contributions);
  }
  const key = String(tab);
  const fromApi = json.total[key];
  if (typeof fromApi === "number") return fromApi;
  return sumContributions(json.contributions);
}

/** Scales only the contribution SVG upward so its height aligns with the stretched flex row (year rail height). */
function ScaledContributionCalendar(props: ComponentProps<typeof ActivityCalendar>) {
  const slotRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<{ scale: number; cw: number; ch: number } | null>(null);

  useLayoutEffect(() => {
    const slot = slotRef.current;
    const content = contentRef.current;
    if (!slot || !content) return;

    const update = () => {
      const availH = slot.clientHeight;
      const cw = content.offsetWidth;
      const ch = content.offsetHeight;
      if (ch < 4 || availH < 4) return;
      const raw = availH / ch;
      const scale = Math.min(Math.max(raw, 0.75), CHART_SCALE_MAX);
      setLayout((prev) => {
        if (
          prev &&
          Math.abs(prev.scale - scale) < 0.004 &&
          prev.cw === cw &&
          prev.ch === ch
        ) {
          return prev;
        }
        return { scale, cw, ch };
      });
    };

    const ro = new ResizeObserver(() => requestAnimationFrame(update));
    ro.observe(slot);
    ro.observe(content);
    requestAnimationFrame(update);
    return () => ro.disconnect();
  }, [props.data, props.loading, props.blockSize, props.blockMargin, props.fontSize]);

  const box = layout;

  return (
    <div ref={slotRef} className="flex min-h-0 min-w-0 max-w-full flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 min-w-0 max-w-full flex-1 flex-col overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
        <div
          className="mx-auto"
          style={
            box
              ? {
                  width: box.cw * box.scale,
                  height: box.ch * box.scale,
                  overflow: "hidden",
                }
              : undefined
          }
        >
          <div
            ref={contentRef}
            style={
              box
                ? {
                    transform: `scale(${box.scale})`,
                    transformOrigin: "top left",
                  }
                : undefined
            }
          >
            <ActivityCalendar {...props} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Explicit colors avoid `button { color: inherit }` (globals) fighting Tailwind on active state. */
function YearTabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      style={
        active
          ? { backgroundColor: "#000000", color: "#ffffff" }
          : undefined
      }
      className={`w-full rounded-md px-2 py-1.5 text-left text-sm font-semibold transition-colors md:px-3 ${
        active
          ? "shadow-sm"
          : "text-gray-600 hover:bg-black/[0.04] hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );
}

export function GitHubActivity({ username }: { username: string }) {
  const calendarYears = useMemo(() => buildCalendarYearOptions(new Date().getFullYear()), []);

  const [narrowChart, setNarrowChart] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(NARROW_CHART_QUERY);
    const apply = () => setNarrowChart(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const [tab, setTab] = useState<YearTab>("last");
  const [contributions, setContributions] = useState<Activity[] | null>(null);
  const [displayTotal, setDisplayTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const yParam = tab === "last" ? "last" : String(tab);

    fetch(`${CONTRIBUTIONS_API}${encodeURIComponent(username)}?y=${yParam}`, {
      headers: {
        // Avoid stale CDN/API cache (~1h) so totals match github.com when comparing side-by-side.
        "Cache-Control": "no-cache",
      },
    })
      .then(async (res) => {
        const json = (await res.json()) as ContributionsPayload;
        if (!res.ok) {
          throw new Error(json.error ?? "Could not load contribution data.");
        }
        return json;
      })
      .then((json) => {
        if (cancelled) return;
        setContributions(json.contributions);
        setDisplayTotal(totalFromPayload(json, tab));
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username, tab]);

  const labels = useMemo(
    () => ({
      legend: { less: "Less", more: "More" },
    }),
    [],
  );

  const headline =
    !loading && !error && displayTotal !== null
      ? tab === "last"
        ? `${displayTotal.toLocaleString()} contribution${displayTotal === 1 ? "" : "s"} in the last year`
        : `${displayTotal.toLocaleString()} contribution${displayTotal === 1 ? "" : "s"} in ${tab}`
      : null;

  const blockSize = narrowChart ? 10 : 12;
  const blockMargin = narrowChart ? 3 : 4;
  const fontSize = narrowChart ? 10 : 11;

  return (
    <AnimateIn variant="up" rootMargin="0px 0px -80px 0px" className="mb-32 min-w-0">
      <div className="flex min-w-0 flex-col">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h2 className="type-overline mb-2 text-gray-400">GitHub activity</h2>
          {headline ? (
            <p className="type-overline max-w-[min(100%,24rem)] text-right leading-snug text-gray-400">
              {headline}
            </p>
          ) : null}
        </div>

        {error ? (
          <p className="type-body text-gray-500">{error}</p>
        ) : (
          <div className="flex min-h-[18rem] w-full min-w-0 flex-row flex-nowrap items-stretch gap-4 sm:min-h-[20rem] sm:gap-6 md:gap-8 lg:gap-10">
            <div className="flex min-h-0 min-w-0 max-w-full flex-1 flex-col overflow-hidden pb-1">
              <ScaledContributionCalendar
                data={contributions ?? []}
                loading={loading || contributions === null}
                theme={HEATMAP_THEME}
                colorScheme="light"
                blockSize={blockSize}
                blockMargin={blockMargin}
                blockRadius={2}
                fontSize={fontSize}
                labels={labels}
                maxLevel={4}
                showTotalCount={false}
                showWeekdayLabels={["sun", "wed", "fri"]}
                weekStart={0}
                tooltips={{
                  activity: {
                    text: (a) =>
                      `${a.count} contribution${a.count === 1 ? "" : "s"} on ${a.date}`,
                  },
                }}
              />
            </div>

            <nav
              className="flex w-[5.25rem] shrink-0 flex-none flex-col gap-1 self-stretch border-l border-black/[0.06] pl-3 md:w-[6rem] md:pl-4"
              aria-label="Contribution period"
            >
              <YearTabButton active={tab === "last"} onClick={() => setTab("last")}>
                Last year
              </YearTabButton>
              {calendarYears.map((y) => (
                <YearTabButton key={y} active={tab === y} onClick={() => setTab(y)}>
                  {y}
                </YearTabButton>
              ))}
            </nav>
          </div>
        )}
      </div>
    </AnimateIn>
  );
}
