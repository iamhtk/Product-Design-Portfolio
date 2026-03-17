// Cloudflare Worker: Analytics proxy for portfolio dashboard
//
// Usage:
// - Deploy this worker in your Cloudflare account.
// - Bind environment variables:
//   - CF_API_TOKEN: Cloudflare API token with Analytics_READ permission
//   - CF_ZONE_ID:   Zone ID for hrithiksanyal.com
//
// - Route it at something like:
//   https://hrithiksanyal.com/api/analytics/*
//
// The React dashboard calls:
//   /api/analytics/summary?range=7d|30d

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    if (pathname.endsWith('/summary')) {
      return handleSummary(searchParams, env);
    }

    return new Response('Not found', { status: 404 });
  },
};

async function handleSummary(searchParams, env) {
  const range = searchParams.get('range') === '30d' ? '30d' : '7d';

  const now = new Date();
  const until = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const since = new Date(until);
  since.setUTCDate(until.getUTCDate() - (range === '30d' ? 29 : 6));

  const sinceStr = since.toISOString().slice(0, 10);
  const untilStr = until.toISOString().slice(0, 10);

  const query = `
    query GetAnalytics($zoneTag: String!, $since: Time!, $until: Time!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequests1dGroups(
            limit: 31,
            filter: { date_geq: $since, date_leq: $until },
            orderBy: [date_ASC]
          ) {
            sum {
              requests
              threats
              bytes
              pageViews: requests
            }
            uniq {
              uniques
            }
            dimensions {
              date
            }
          }
          topPaths: httpRequests1dGroups(
            limit: 10,
            orderBy: [sum_requests_DESC]
          ) {
            sum {
              requests
            }
            dimensions {
              clientRequestPath
            }
          }
          topCountries: httpRequests1dGroups(
            limit: 10,
            orderBy: [sum_requests_DESC]
          ) {
            sum {
              requests
            }
            dimensions {
              clientCountryName
            }
          }
        }
      }
    }
  `;

  const body = JSON.stringify({
    query,
    variables: {
      zoneTag: env.CF_ZONE_ID,
      since: sinceStr,
      until: untilStr,
    },
  });

  const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.CF_API_TOKEN}`,
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    return new Response(text || 'Cloudflare API error', { status: res.status });
  }

  const json = await res.json();
  const zones = json?.data?.viewer?.zones ?? [];
  const zone = zones[0];

  if (!zone) {
    return new Response('No analytics data for this zone', { status: 500 });
  }

  const groups = zone.httpRequests1dGroups ?? [];

  let totalRequests = 0;
  let totalPageViews = 0;
  let uniqueVisitors = 0;
  let threats = 0;
  let bandwidthBytes = 0;

  const timeseries = groups.map((g) => {
    const reqs = g.sum?.requests ?? 0;
    const pvs = g.sum?.pageViews ?? reqs;
    const date = g.dimensions?.date ?? '';
    totalRequests += reqs;
    totalPageViews += pvs;
    uniqueVisitors += g.uniq?.uniques ?? 0;
    threats += g.sum?.threats ?? 0;
    bandwidthBytes += g.sum?.bytes ?? 0;
    return {
      date,
      requests: reqs,
      pageViews: pvs,
    };
  });

  const topPaths = (zone.topPaths ?? [])
    .map((g) => ({
      path: g.dimensions?.clientRequestPath ?? '/',
      requests: g.sum?.requests ?? 0,
    }))
    .filter((item) => item.requests > 0);

  const topCountries = (zone.topCountries ?? [])
    .map((g) => ({
      country: g.dimensions?.clientCountryName ?? 'Unknown',
      requests: g.sum?.requests ?? 0,
    }))
    .filter((item) => item.requests > 0);

  const summary = {
    range,
    totalRequests,
    totalPageViews,
    uniqueVisitors,
    threats,
    bandwidth: formatBytes(bandwidthBytes),
    bandwidthBytes,
    topPaths,
    topCountries,
    timeseries,
  };

  return new Response(JSON.stringify(summary), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
    },
  });
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(1)} ${sizes[i]}`;
}


