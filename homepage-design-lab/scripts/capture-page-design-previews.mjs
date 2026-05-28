#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const labDir = path.resolve(scriptDir, '..');
const siteDir = path.resolve(labDir, '..');
const paymentLabDir = path.join(siteDir, 'payment-page-design-lab');
const previewDir = path.join(labDir, 'assets', 'previews');
const baseUrl = process.env.AIM_PREVIEW_BASE || 'http://127.0.0.1:5123';
const chromePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const homepagePreviewBase = `${baseUrl}/preview/v3-site-repo-aimwebsite0-5-homepage-design-lab/`;
const paymentPreviewBase = `${baseUrl}/preview/v3-site-repo-aimwebsite0-5-payment-page-design-lab/`;

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const safeId = (value) => String(value).replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();

const resolveHomepageUrl = (variant) => new URL(variant.path, homepagePreviewBase).toString();

const resolvePaymentUrl = (variant) => {
  if (variant.artifact && variant.artifact.includes('?')) {
    return new URL(variant.artifact, paymentPreviewBase).toString();
  }
  if (variant.artifact && variant.artifact.includes('/')) {
    return new URL(variant.artifact, paymentPreviewBase).toString();
  }
  const url = new URL('index.html', paymentPreviewBase);
  url.searchParams.set('variant', variant.id);
  return url.toString();
};

const makeItems = () => {
  const homepageManifest = readJson(path.join(labDir, 'manifest.json'));
  const paymentManifest = readJson(path.join(paymentLabDir, 'manifest.json'));
  if (!paymentManifest.sourceOfTruth?.includes('payment-page-design-lab')) {
    throw new Error('Payment preview capture must read payment-page-design-lab only. Do not point it at payment popup compare manifests.');
  }

  const homepageItems = (homepageManifest.variants || []).map((variant) => ({
    id: `${variant.lane === 'elements' ? 'element' : 'homepage'}-${safeId(variant.id)}`,
    title: variant.title,
    url: resolveHomepageUrl(variant),
  }));

  const paymentItems = (paymentManifest.variants || []).map((variant) => ({
    id: `payment-${safeId(variant.id)}`,
    title: variant.title,
    url: resolvePaymentUrl(variant),
  }));

  return [...homepageItems, ...paymentItems];
};

const capture = async ({ id, title, url }) => {
  const output = path.join(previewDir, `${id}.png`);
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aim-page-preview-chrome-'));
  const result = spawnSync(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-background-networking',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-extensions',
    '--disable-features=AutofillServerCommunication,MediaRouter,OptimizationHints',
    '--disable-sync',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    '--force-device-scale-factor=1',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=3000',
    '--timeout=5000',
    '--window-size=1280,820',
    `--screenshot=${output}`,
    url,
  ], {
    encoding: 'utf8',
    timeout: 65000,
  });
  fs.rmSync(profileDir, { recursive: true, force: true });

  if (result.status !== 0) {
    throw new Error(`Failed to capture ${title} (${url})\nstatus=${result.status} signal=${result.signal || ''} error=${result.error?.message || ''}\n${result.stderr || result.stdout}`);
  }

  const resize = spawnSync('/usr/bin/sips', ['-Z', '920', output], {
    encoding: 'utf8',
    timeout: 15000,
  });

  if (resize.status !== 0) {
    throw new Error(`Failed to resize ${output}\n${resize.stderr || resize.stdout}`);
  }

  return {
    id,
    title,
    url,
    path: path.relative(labDir, output),
  };
};

await fsp.mkdir(previewDir, { recursive: true });

const generated = [];
for (const item of makeItems()) {
  generated.push(await capture(item));
  console.log(`captured ${item.id}`);
}

await fsp.writeFile(
  path.join(previewDir, 'preview-index.json'),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), previews: generated }, null, 2)}\n`,
  'utf8',
);

console.log(`captured ${generated.length} previews`);
