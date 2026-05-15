import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const outDir = join(publicDir, 'og', 'projects');

/** slug → source image path under public/ */
const PROJECT_SOURCES = {
  'cwpc-prism-design-system': '/main_title/main_cwpc.png',
  'cwpc-ds-case-study': '/DS/prism-tile.png',
  'automotive-ux-cadillac-escalade': '/main_title/main_gm.png',
  'raseet-health': '/main_title/main_raseet.png',
  'raseet-health-ds-case-study': '/DS/medscope-tile-2.png',
  'bmw-idrive-redesign': '/main_title/main_bmw.png',
  'portfolio-design-system': '/miniapps/f3.png',
  calmiring: '/main_title/main_calmi.png',
};

function cropOg(src, dest) {
  const tmp = `${dest}.tmp.png`;
  execSync(`sips --resampleWidth 1200 "${src}" --out "${tmp}"`, { stdio: 'pipe' });
  execSync(
    `sips --cropToHeightWidth 630 1200 "${tmp}" --out "${dest}" -s format jpeg -s formatOptions 88`,
    { stdio: 'pipe' },
  );
  rmSync(tmp, { force: true });
}

mkdirSync(outDir, { recursive: true });

let count = 0;
for (const [slug, rel] of Object.entries(PROJECT_SOURCES)) {
  const src = join(publicDir, rel.replace(/^\//, ''));
  const dest = join(outDir, `${slug}.jpg`);
  if (!existsSync(src)) {
    console.warn(`Skip ${slug}: missing ${rel}`);
    continue;
  }
  cropOg(src, dest);
  count += 1;
}

console.log(`Wrote ${count} project OG images to public/og/projects/`);
