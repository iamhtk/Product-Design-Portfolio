import { PROJECT_ENABLED, PROJECT_SLUGS } from '../components/projects/projectOrder';
import { SITE_CONTENT_PATHS, WORK_PAGE_ENABLED } from '../sitePaths';
import { SITE_URL } from './siteConfig';

export type SitemapEntry = {
  loc: string;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: number;
};

const NOINDEX_PATHS = new Set([SITE_CONTENT_PATHS.analytics]);

export function getSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: 1 },
    ...(WORK_PAGE_ENABLED
      ? [{ loc: `${SITE_URL}${SITE_CONTENT_PATHS.work}`, changefreq: 'weekly' as const, priority: 0.95 }]
      : []),
    { loc: `${SITE_URL}${SITE_CONTENT_PATHS.about}`, changefreq: 'monthly', priority: 0.8 },
    { loc: `${SITE_URL}${SITE_CONTENT_PATHS.resume}`, changefreq: 'monthly', priority: 0.9 },
    { loc: `${SITE_URL}${SITE_CONTENT_PATHS.blog}`, changefreq: 'weekly', priority: 0.7 },
    { loc: `${SITE_URL}${SITE_CONTENT_PATHS.friends}`, changefreq: 'yearly', priority: 0.5 },
    { loc: `${SITE_URL}${SITE_CONTENT_PATHS.favorites}`, changefreq: 'yearly', priority: 0.5 },
  ];

  for (const [projectId, slug] of Object.entries(PROJECT_SLUGS)) {
    if (PROJECT_ENABLED[projectId] === false) continue;
    entries.push({
      loc: `${SITE_URL}/${slug}`,
      changefreq: 'monthly',
      priority: 0.85,
    });
  }

  return entries.filter((e) => !NOINDEX_PATHS.has(new URL(e.loc).pathname));
}

export function sitemapXml(entries: SitemapEntry[] = getSitemapEntries()): string {
  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority.toFixed(2)}</priority>\n  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
