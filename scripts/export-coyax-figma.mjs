/**
 * Export Coyax case study images from Figma.
 *
 * 1. Figma Desktop (file open in Dev Mode): runs automatically when localhost:3845 responds
 * 2. Figma REST API: FIGMA_ACCESS_TOKEN=your_token node scripts/export-coyax-figma.mjs
 */
import { mkdirSync, createWriteStream, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'coyax', 'components');
const FILE_KEY = 'acgtVQdx5kEZfoAnqAW5i1';

/** All Figma nodes used in the Coyax component showcase + legacy case-study paths. */
const EXPORTS = [
  // Form Controls
  { nodeId: '451:2019', file: 'button-variants.png' },
  { nodeId: '453:9988', file: 'input-field-states.png' },
  { nodeId: '453:10079', file: 'checkbox-states.png' },
  { nodeId: '453:10209', file: 'switch-toggle-states.png' },
  { nodeId: '453:10152', file: 'radio-button-states.png' },
  { nodeId: '503:508', file: 'select-dropdown.png' },
  { nodeId: '503:785', file: 'search-input.png' },
  { nodeId: '453:10286', file: 'text-area.png' },
  { nodeId: '503:604', file: 'segmented-control.png' },
  { nodeId: '453:9987', file: 'field-component.png' },
  { nodeId: '540:1080', file: 'upload-button.png' },
  // Navigation
  { nodeId: '529:7403', file: 'sidebar-full.png' },
  { nodeId: '529:4993', file: 'sidebar-link-states.png' },
  { nodeId: '529:4945', file: 'sidebar-section-label.png' },
  { nodeId: '629:5621', file: 'topbar.png' },
  { nodeId: '519:845', file: 'tabs-notification-panel.png' },
  { nodeId: '519:1148', file: 'tabs-dashboard-panel.png' },
  { nodeId: '529:5687', file: 'breadcrumb-v1.png' },
  { nodeId: '551:15096', file: 'breadcrumb-v2.png' },
  // Feedback
  { nodeId: '397:19508', file: 'badge-variants.png' },
  { nodeId: '397:14182', file: 'notification-dot.png' },
  { nodeId: '451:2115', file: 'progress-bar.png' },
  { nodeId: '451:2174', file: 'progress-bar-with-info.png' },
  { nodeId: '397:17246', file: 'confidence-pill.png' },
  { nodeId: '629:5567', file: 'ai-credit-pill.png' },
  { nodeId: '540:793', file: 'tooltip.png' },
  { nodeId: '540:875', file: 'modal-types.png' },
  // Data Display
  { nodeId: '483:384', file: 'avatar-sizes.png' },
  { nodeId: '397:19438', file: 'monospace-text.png' },
  { nodeId: '632:11597', file: 'stepper.png' },
  { nodeId: '503:669', file: 'status-filter-bar.png' },
  { nodeId: '453:9392', file: 'label-component.png' },
  { nodeId: '453:9986', file: 'menu-items.png' },
  { nodeId: '397:17301', file: 'notification-bell.png' },
];

// Legacy paths at public/coyax/ root (process section + project tiles)
const LEGACY_ALIASES = [
  { nodeId: '529:7403', file: '../sidebar-component.png' },
  { nodeId: '451:2019', file: '../button-component.png' },
  { nodeId: '453:9988', file: '../input-component.png' },
];

mkdirSync(outDir, { recursive: true });
mkdirSync(join(root, 'public', 'coyax'), { recursive: true });

async function exportViaFigmaDesktop(exports) {
  let sessionId;
  const post = async (method, params = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
    };
    if (sessionId) headers['mcp-session-id'] = sessionId;
    const res = await fetch('http://127.0.0.1:3845/mcp', {
      method: 'POST',
      headers,
      body: JSON.stringify({ jsonrpc: '2.0', id: crypto.randomUUID(), method, params }),
    });
    const sid = res.headers.get('mcp-session-id');
    if (sid) sessionId = sid;
    const text = await res.text();
    const dataLine = text.split('\n').find((l) => l.startsWith('data: '));
    if (!dataLine) throw new Error('No MCP response');
    return JSON.parse(dataLine.slice(6));
  };

  await post('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'coyax-export', version: '1.0' },
  });
  await post('notifications/initialized', {});

  for (const { nodeId, file } of exports) {
    const call = await post('tools/call', {
      name: 'get_screenshot',
      arguments: { nodeId },
    });
    const img = call.result?.content?.find((c) => c.type === 'image');
    if (!img?.data) throw new Error(`No image for ${nodeId}`);
    const dest = join(outDir, file);
    writeFileSync(dest, Buffer.from(img.data, 'base64'));
    console.log(`Wrote ${dest} (Figma Desktop)`);
  }
}

async function exportViaRestApi(token, exports) {
  const batchSize = 10;
  for (let i = 0; i < exports.length; i += batchSize) {
    const batch = exports.slice(i, i + batchSize);
    const ids = batch.map((e) => e.nodeId).join(',');
    const metaUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=2`;
    const metaRes = await fetch(metaUrl, { headers: { 'X-Figma-Token': token } });
    if (!metaRes.ok) {
      throw new Error(`Figma API error: ${metaRes.status} ${await metaRes.text()}`);
    }
    const meta = await metaRes.json();
    const images = meta.images ?? {};
    for (const { nodeId, file } of batch) {
      const imageUrl = images[nodeId];
      if (!imageUrl) throw new Error(`No image URL for ${nodeId}`);
      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) throw new Error(`Failed to download ${file}: ${imgRes.status}`);
      const dest = join(outDir, file);
      await pipeline(Readable.fromWeb(imgRes.body), createWriteStream(dest));
      console.log(`Wrote ${dest} (REST API)`);
    }
  }
}

const allExports = [...EXPORTS, ...LEGACY_ALIASES];

try {
  await exportViaFigmaDesktop(allExports);
} catch (desktopErr) {
  const token = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('Figma Desktop export failed:', desktopErr.message);
    console.error('Open the Coyax file in Figma Desktop, or set FIGMA_ACCESS_TOKEN for REST API export.');
    process.exit(1);
  }
  try {
    await exportViaRestApi(token, allExports);
  } catch (apiErr) {
    console.error('Figma REST API export failed:', apiErr.message);
    process.exit(1);
  }
}
