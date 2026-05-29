#!/usr/bin/env node

import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    return require('/Users/viola/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
  }
}

const { chromium } = await loadPlaywright();

const base = process.env.AIM_PREVIEW_BASE || 'http://127.0.0.1:5123';
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const variants = (process.env.AIM_DESIGN_VARIANTS || 'aim-ai-mindset-morph-contrast,aim-ai-mindset-morph,aim-x26-practice-direct')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

const viewports = [
  { name: 'desktop', width: 1280, height: 820 },
  { name: 'iphone-11-pro', width: 375, height: 812 },
  { name: 'iphone-11', width: 414, height: 896 },
];

const dangerToken = '#ff4f42';
const oldDangerTokens = [
  '#ff6a55',
  '#d23b2e',
  '#4a120e',
  '#d93025',
  'rgba(255, 106, 85',
  'rgba(255, 86, 62',
  'rgba(255, 62, 40',
];

function checkStaticNegativeTokenUsage() {
  const indexSource = readFileSync(new URL('../payment-page-design-lab/index.html', import.meta.url), 'utf8');
  const retrySvgSource = readFileSync(new URL('../payment-page-design-lab/assets/payment-popups/ascii-aim-retry.svg', import.meta.url), 'utf8');
  const lowerIndex = indexSource.toLowerCase();
  const lowerSvg = retrySvgSource.toLowerCase();
  const leaked = oldDangerTokens.filter((token) => lowerIndex.includes(token) || lowerSvg.includes(token));

  assert(!leaked.length, 'failed-state contains legacy hard-coded red tokens instead of the shared danger token', {
    leaked,
    expected: dangerToken,
  });

  const svgHexColors = [...new Set((retrySvgSource.match(/#[0-9a-fA-F]{6}/g) || []).map((color) => color.toLowerCase()))];
  assert(svgHexColors.length === 1 && svgHexColors[0] === dangerToken, 'failed retry SVG must use exactly the shared danger token', {
    colors: svgHexColors,
    expected: dangerToken,
  });
}

function parseColor(value) {
  const srgb = String(value).match(/color\(srgb\s+([^)]+)\)/);
  if (srgb) {
    const [channels, alpha = '1'] = srgb[1].split('/').map((part) => part.trim());
    const [r, g, b] = channels.split(/\s+/).map((part) => Number.parseFloat(part.trim()));
    const a = Number.parseFloat(alpha);
    return { r: r * 255, g: g * 255, b: b * 255, a };
  }
  const match = String(value).match(/rgba?\(([^)]+)\)/);
  if (!match) return { r: 0, g: 0, b: 0, a: 1 };
  const [r, g, b, a = '1'] = match[1].split(',').map((part) => Number.parseFloat(part.trim()));
  return { r, g, b, a };
}

function isNegativeColor(value) {
  const { r, g, b, a } = parseColor(value);
  return a >= 0.55 && r >= 170 && r > g * 1.25 && r > b * 1.15;
}

function isPositiveColor(value) {
  const { r, g, b, a } = parseColor(value);
  return a >= 0.55 && g >= 145 && g > r * 0.9 && g > b * 1.35;
}

function assert(pass, message, details = {}) {
  if (!pass) {
    const suffix = Object.keys(details).length ? ` ${JSON.stringify(details)}` : '';
    throw new Error(`${message}${suffix}`);
  }
}

async function checkVariantViewport(page, variant, viewport) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  const url = `${base}/preview/v3-site-repo-aimwebsite0-5-payment-page-design-lab/index.html?variant=${encodeURIComponent(variant)}&clean=1`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.locator('[data-action="pay"]').click();
  await page.waitForTimeout(120);

  const data = await page.evaluate(() => {
    const color = (selector, pseudo) => getComputedStyle(document.querySelector(selector), pseudo).color;
    const background = (selector, pseudo) => getComputedStyle(document.querySelector(selector), pseudo).backgroundColor;
    const borderBottom = (selector) => getComputedStyle(document.querySelector(selector)).borderBottomColor;
    const rect = (selector) => {
      const box = document.querySelector(selector).getBoundingClientRect();
      return {
        top: box.top,
        bottom: box.bottom,
        left: box.left,
        right: box.right,
        width: box.width,
        height: box.height,
      };
    };
    const usdt = document.querySelector('[data-method="usdt"]');
    const selectedMethod = document.querySelector('.method[aria-pressed="true"]');
    const inactiveMethod = document.querySelector('.method[aria-pressed="false"]:not([data-discount-label])');
    const before = getComputedStyle(usdt, '::before').content;
    const overflowX = Math.max(0, document.documentElement.scrollWidth - window.innerWidth);
    return {
      overflowX,
      card: rect('.payment-card'),
      telegramStatusText: document.querySelector('#telegramStatus')?.textContent.trim() || '',
      telegramStatusClass: document.querySelector('#telegramStatus')?.className || '',
      telegramStatusColor: color('#telegramStatus'),
      telegramBorder: borderBottom('#telegram'),
      telegramReqColor: color('.field.has-error .req'),
      telegramPlaceholderColor: color('#telegram', '::placeholder'),
      telegramBackground: background('#telegram'),
      promoBackground: background('#promo'),
      promoPlaceholderColor: color('#promo', '::placeholder'),
      promoBorder: borderBottom('#promo'),
      usdtText: usdt?.textContent.trim() || '',
      usdtBadge: before,
      usdtBadgeBackground: getComputedStyle(usdt, '::before').backgroundColor,
      usdtBadgeBorder: getComputedStyle(usdt, '::before').borderTopColor,
      selectedMethodText: selectedMethod?.textContent.trim() || '',
      selectedMethodBackground: selectedMethod ? getComputedStyle(selectedMethod).backgroundColor : '',
      selectedMethodBorder: selectedMethod ? getComputedStyle(selectedMethod).borderTopColor : '',
      selectedMethodColor: selectedMethod ? getComputedStyle(selectedMethod).color : '',
      inactiveMethodText: inactiveMethod?.textContent.trim() || '',
      inactiveMethodBackground: inactiveMethod ? getComputedStyle(inactiveMethod).backgroundColor : '',
      inactiveMethodBorder: inactiveMethod ? getComputedStyle(inactiveMethod).borderTopColor : '',
      inactiveMethodColor: inactiveMethod ? getComputedStyle(inactiveMethod).color : '',
    };
  });

  assert(data.overflowX === 0, 'horizontal overflow in target viewport', { variant, viewport: viewport.name, overflowX: data.overflowX });
  assert(data.telegramStatusClass.includes('is-error'), 'required-field validation did not enter error state', {
    variant,
    viewport: viewport.name,
    className: data.telegramStatusClass,
    text: data.telegramStatusText,
  });
  assert(isNegativeColor(data.telegramStatusColor), 'required-field error text is not visually negative', {
    variant,
    viewport: viewport.name,
    color: data.telegramStatusColor,
  });
  assert(isNegativeColor(data.telegramBorder), 'required-field error line is not visually negative', {
    variant,
    viewport: viewport.name,
    border: data.telegramBorder,
  });
  assert(isNegativeColor(data.telegramReqColor), 'required marker is not visually negative in error state', {
    variant,
    viewport: viewport.name,
    color: data.telegramReqColor,
  });
  assert(!isNegativeColor(data.telegramBackground), 'required-field error uses a red filled background instead of a neutral field surface', {
    variant,
    viewport: viewport.name,
    background: data.telegramBackground,
  });

  const telegramPlaceholder = parseColor(data.telegramPlaceholderColor);
  const promoPlaceholder = parseColor(data.promoPlaceholderColor);
  const telegramBackground = parseColor(data.telegramBackground);
  const promoBackground = parseColor(data.promoBackground);
  assert(promoPlaceholder.a <= telegramPlaceholder.a + 0.02, 'optional placeholder is stronger than required-field placeholder', {
    variant,
    viewport: viewport.name,
    promo: data.promoPlaceholderColor,
    telegram: data.telegramPlaceholderColor,
  });
  assert(promoBackground.a <= telegramBackground.a + 0.02, 'optional field surface is stronger than required-field surface', {
    variant,
    viewport: viewport.name,
    promo: data.promoBackground,
    telegram: data.telegramBackground,
  });
  assert(data.usdtText === 'USDT', 'contextual discount text leaked into method button label', {
    variant,
    viewport: viewport.name,
    text: data.usdtText,
  });
  assert(data.usdtBadge && data.usdtBadge !== 'none' && data.usdtBadge.includes('скидка'), 'USDT discount badge is not attached to the USDT control', {
    variant,
    viewport: viewport.name,
    badge: data.usdtBadge,
  });
  assert(parseColor(data.usdtBadgeBackground).a >= 0.88 || parseColor(data.usdtBadgeBorder).a >= 0.45, 'contextual discount badge lacks a visible badge container', {
    variant,
    viewport: viewport.name,
    background: data.usdtBadgeBackground,
    border: data.usdtBadgeBorder,
  });
  const selectedBg = parseColor(data.selectedMethodBackground);
  const inactiveBg = parseColor(data.inactiveMethodBackground);
  const selectedBorder = parseColor(data.selectedMethodBorder);
  const inactiveBorder = parseColor(data.inactiveMethodBorder);
  const selectedText = parseColor(data.selectedMethodColor);
  const inactiveText = parseColor(data.inactiveMethodColor);
  assert(selectedBg.a >= inactiveBg.a + 0.04 || selectedBorder.g >= inactiveBorder.g + 28, 'selected method state is not visually stronger than inactive methods', {
    variant,
    viewport: viewport.name,
    selected: data.selectedMethodText,
    selectedBackground: data.selectedMethodBackground,
    inactiveBackground: data.inactiveMethodBackground,
    selectedBorder: data.selectedMethodBorder,
    inactiveBorder: data.inactiveMethodBorder,
  });
  assert(selectedText.a >= inactiveText.a + 0.08 || selectedText.g >= inactiveText.g + 20, 'selected method text does not outrank inactive method text', {
    variant,
    viewport: viewport.name,
    selected: data.selectedMethodText,
    selectedColor: data.selectedMethodColor,
    inactive: data.inactiveMethodText,
    inactiveColor: data.inactiveMethodColor,
  });

  await page.locator('#promo').fill('ponchik');
  await page.waitForTimeout(520);
  const promoApplied = await page.evaluate(() => ({
    text: document.querySelector('#promoStatus')?.textContent.trim() || '',
    className: document.querySelector('#promoStatus')?.className || '',
    color: getComputedStyle(document.querySelector('#promoStatus')).color,
  }));
  assert(promoApplied.className.includes('is-success'), 'applied optional discount did not enter success state', {
    variant,
    viewport: viewport.name,
    className: promoApplied.className,
    text: promoApplied.text,
  });
  assert(isPositiveColor(promoApplied.color), 'applied optional discount is not visually positive', {
    variant,
    viewport: viewport.name,
    color: promoApplied.color,
    text: promoApplied.text,
  });
}

async function checkStatusViewport(page, variant, viewport, status) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  const url = `${base}/preview/v3-site-repo-aimwebsite0-5-payment-page-design-lab/index.html?variant=${encodeURIComponent(variant)}&clean=1&status=${status}`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(120);

  const data = await page.evaluate((currentStatus) => {
    const rect = (selector) => {
      const node = document.querySelector(selector);
      if (!node) return null;
      const box = node.getBoundingClientRect();
      return {
        top: box.top,
        bottom: box.bottom,
        left: box.left,
        right: box.right,
        width: box.width,
        height: box.height,
        centerX: box.left + box.width / 2,
        centerY: box.top + box.height / 2,
      };
    };
    const view = document.querySelector(`.status-view[data-view="${currentStatus}"]`);
    const computed = (selector, pseudo) => {
      const node = document.querySelector(selector);
      return node ? getComputedStyle(node, pseudo) : null;
    };
    return {
      overflowX: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
      isActive: view?.classList.contains('is-active') || false,
      card: rect('.payment-card'),
      h2: rect(`.status-view[data-view="${currentStatus}"] h2`),
      body: rect(`.status-view[data-view="${currentStatus}"] .status-body`),
      animation: rect(`.status-view[data-view="${currentStatus}"] .state-animation`),
      actions: rect(`.status-view[data-view="${currentStatus}"] .status-actions`),
      primary: rect(`.status-view[data-view="${currentStatus}"] .primary`),
      rootDanger: getComputedStyle(document.documentElement).getPropertyValue('--danger').trim().toLowerCase(),
      statusLabelColor: computed(`.status-view[data-view="${currentStatus}"] .status-label`)?.color || '',
      heartbeatBackground: computed('.heartbeat-dot')?.backgroundImage || '',
      viewport: { width: window.innerWidth, height: window.innerHeight },
    };
  }, status);

  assert(data.isActive, 'requested payment status is not active', { variant, viewport: viewport.name, status });
  assert(data.overflowX === 0, 'horizontal overflow in payment status viewport', {
    variant,
    viewport: viewport.name,
    status,
    overflowX: data.overflowX,
  });
  assert(data.card && data.h2 && data.body && data.animation && data.actions && data.primary, 'payment status layout is missing expected nodes', {
    variant,
    viewport: viewport.name,
    status,
  });

  const cardCenter = data.card.left + data.card.width / 2;
  const buttonDrift = Math.abs(data.primary.centerX - cardCenter);
  const animationDrift = Math.abs(data.animation.centerX - cardCenter);
  const animationAfterCopy = data.animation.top - data.body.bottom;
  const buttonAfterAnimation = data.primary.top - data.animation.bottom;
  const maxButtonGap = viewport.width <= 620 ? 132 : 172;

  assert(data.card.top >= -1 && data.card.bottom <= data.viewport.height + 1, 'payment status card does not fit inside the tested viewport', {
    variant,
    viewport: viewport.name,
    status,
    card: data.card,
    viewportSize: data.viewport,
  });
  assert(animationAfterCopy >= 4, 'payment status animation is crowding or floating above the copy block', {
    variant,
    viewport: viewport.name,
    status,
    gap: animationAfterCopy,
  });
  assert(buttonAfterAnimation >= 10 && buttonAfterAnimation <= maxButtonGap, 'payment status CTA is not visually attached to the animation flow', {
    variant,
    viewport: viewport.name,
    status,
    gap: buttonAfterAnimation,
    maxButtonGap,
  });
  assert(buttonDrift <= Math.max(14, data.card.width * 0.08), 'payment status CTA is not centered in the card', {
    variant,
    viewport: viewport.name,
    status,
    buttonDrift,
    cardWidth: data.card.width,
  });
  assert(animationDrift <= Math.max(28, data.card.width * 0.18), 'payment status animation is not centered enough to belong to the card', {
    variant,
    viewport: viewport.name,
    status,
    animationDrift,
    cardWidth: data.card.width,
  });

  if (status === 'failed') {
    assert(data.rootDanger === dangerToken, 'root danger token changed without updating failed-state QA expectations', {
      variant,
      viewport: viewport.name,
      status,
      rootDanger: data.rootDanger,
      expected: dangerToken,
    });
    assert(data.statusLabelColor === 'rgb(255, 79, 66)', 'failed status label does not use the shared danger token', {
      variant,
      viewport: viewport.name,
      status,
      color: data.statusLabelColor,
      expected: dangerToken,
    });
    assert(data.heartbeatBackground.includes('rgb(255, 79, 66)'), 'failed heartbeat dot is not derived from the shared danger token', {
      variant,
      viewport: viewport.name,
      status,
      background: data.heartbeatBackground,
      expected: dangerToken,
    });
  }
}

const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath,
});

const failures = [];
try {
  checkStaticNegativeTokenUsage();
  console.log('ok static negative-token usage');
} catch (error) {
  failures.push(error.message);
  console.error(`fail static negative-token usage: ${error.message}`);
}

const page = await browser.newPage();
for (const variant of variants) {
  for (const viewport of viewports) {
    try {
      await checkVariantViewport(page, variant, viewport);
      console.log(`ok ${variant} ${viewport.name}`);
    } catch (error) {
      failures.push(error.message);
      console.error(`fail ${variant} ${viewport.name}: ${error.message}`);
    }
    for (const status of ['paid', 'failed']) {
      try {
        await checkStatusViewport(page, variant, viewport, status);
        console.log(`ok ${variant} ${viewport.name} ${status}`);
      } catch (error) {
        failures.push(error.message);
        console.error(`fail ${variant} ${viewport.name} ${status}: ${error.message}`);
      }
    }
  }
}

await browser.close();

if (failures.length) {
  console.error(`\nDesign hierarchy QA failed: ${failures.length} issue(s).`);
  process.exit(1);
}

console.log('\nDesign hierarchy QA passed.');
