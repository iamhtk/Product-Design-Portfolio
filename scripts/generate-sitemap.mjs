import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const SITE_URL = 'https://hrithiksanyal.com';

/** Keep in sync with src/sitePaths.ts */
const WORK_PAGE_ENABLED = false;

const CONTENT_PATHS = [
  '/',
  ...(WORK_PAGE_ENABLED ? ['/work'] : []),
  '/about-me',
  '/resume-experience',
  '/blog',
  '/friends',
  '/myfavorites',
];

/** Keep in sync with src/components/projects/projectOrder.ts */
const PROJECT_SLUGS_ENABLED = [
  'cwpc-prism-design-system',
  'cwpc-ds-case-study',
  'automotive-ux-cadillac-escalade',
  'raseet-health',
  'raseet-health-ds-case-study',
  'coyax-design-system',
  'bmw-idrive-redesign',
  'portfolio-design-system',
  'calmiring',
];

function entry(loc, changefreq, priority) {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority.toFixed(2)}</priority>\n  </url>`;
}

const urls = [
  entry(`${SITE_URL}/`, 'weekly', 1),
  ...(WORK_PAGE_ENABLED ? [entry(`${SITE_URL}/work`, 'weekly', 0.95)] : []),
  entry(`${SITE_URL}/about-me`, 'monthly', 0.8),
  entry(`${SITE_URL}/resume-experience`, 'monthly', 0.9),
  entry(`${SITE_URL}/blog`, 'weekly', 0.7),
  entry(`${SITE_URL}/friends`, 'yearly', 0.5),
  entry(`${SITE_URL}/myfavorites`, 'yearly', 0.5),
  ...PROJECT_SLUGS_ENABLED.map((slug) =>
    entry(`${SITE_URL}/${slug}`, 'monthly', 0.85),
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

const out = join(root, 'public', 'sitemap.xml');
writeFileSync(out, xml, 'utf8');
console.log(`Wrote ${out} (${CONTENT_PATHS.length + PROJECT_SLUGS_ENABLED.length} URLs)`);
