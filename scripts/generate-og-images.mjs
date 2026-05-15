import { existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const outDir = join(publicDir, 'og', 'projects');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

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

async function cropOg(src, dest) {
  await sharp(src)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(dest);
}

function isUpToDate(src, dest) {
  if (!existsSync(dest)) return false;
  return statSync(dest).mtimeMs >= statSync(src).mtimeMs;
}

mkdirSync(outDir, { recursive: true });

let written = 0;
let skipped = 0;

for (const [slug, rel] of Object.entries(PROJECT_SOURCES)) {
  const src = join(publicDir, rel.replace(/^\//, ''));
  const dest = join(outDir, `${slug}.jpg`);
  if (!existsSync(src)) {
    console.warn(`Skip ${slug}: missing ${rel}`);
    continue;
  }
  if (isUpToDate(src, dest)) {
    skipped += 1;
    continue;
  }
  await cropOg(src, dest);
  written += 1;
}

console.log(
  `OG images: ${written} written, ${skipped} up to date → public/og/projects/`,
);
