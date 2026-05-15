import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = join(root, 'build');
const PORT = 4173;
const PREVIEW_URL = `http://127.0.0.1:${PORT}`;

const BLOCKED_HOSTS = [
  'googletagmanager.com',
  'google-analytics.com',
  'clarity.ms',
  'umami.is',
  'simpleanalyticscdn.com',
];

function pathsFromSitemap() {
  const xml = readFileSync(join(buildDir, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>https?:\/\/[^<]+\.com([^<]*)<\/loc>/g)].map((m) => {
    const path = m[1] || '/';
    return path === '' ? '/' : path;
  });
}

function startPreview() {
  return new Promise((resolve, reject) => {
    const proc = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--host', '127.0.0.1'], {
      cwd: root,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'production' },
    });

    let ready = false;
    const onData = (chunk) => {
      const text = chunk.toString();
      if (!ready && (text.includes('Local:') || text.includes(`127.0.0.1:${PORT}`))) {
        ready = true;
        resolve(proc);
      }
    };
    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);
    proc.on('error', reject);
    proc.on('exit', (code) => {
      if (!ready) reject(new Error(`vite preview exited with code ${code}`));
    });

    setTimeout(() => {
      if (!ready) {
        ready = true;
        resolve(proc);
      }
    }, 8000);
  });
}

function stopPreview(proc) {
  return new Promise((resolve) => {
    if (!proc || proc.killed) {
      resolve();
      return;
    }
    proc.on('exit', () => resolve());
    proc.kill('SIGTERM');
    setTimeout(() => {
      if (!proc.killed) proc.kill('SIGKILL');
      resolve();
    }, 3000);
  });
}

function outFileForPath(pathname) {
  if (pathname === '/') return join(buildDir, 'index.html');
  const segment = pathname.replace(/^\//, '').replace(/\/$/, '');
  return join(buildDir, segment, 'index.html');
}

async function waitForPageReady(page, pathname) {
  await page.waitForSelector('#root', { timeout: 30_000 });
  await page.waitForFunction(
    () => document.querySelector('#root')?.children.length > 0,
    { timeout: 30_000 },
  );
  await page.waitForSelector('h1', { timeout: 30_000 });
  if (pathname !== '/') {
    await page.waitForFunction(
      () => document.title.includes('—'),
      { timeout: 15_000 },
    );
  }
  await new Promise((r) => setTimeout(r, 400));
}

async function prerenderRoute(browser, pathname) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (BLOCKED_HOSTS.some((host) => url.includes(host))) {
      req.abort();
      return;
    }
    req.continue();
  });

  const url = pathname === '/' ? PREVIEW_URL : `${PREVIEW_URL}${pathname}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await waitForPageReady(page, pathname);

  const html = await page.content();
  const outPath = outFileForPath(pathname);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, 'utf8');
  await page.close();
  return outPath;
}

async function main() {
  const routes = pathsFromSitemap();
  console.log(`Prerendering ${routes.length} routes…`);

  const preview = await startPreview();
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const pathname of routes) {
      const out = await prerenderRoute(browser, pathname);
      console.log(`  ${pathname} → ${out.replace(root, '')}`);
    }
  } finally {
    await browser.close();
    await stopPreview(preview);
  }

  console.log('Prerender complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
