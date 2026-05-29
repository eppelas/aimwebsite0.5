#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const caseCodePath = path.join(rootDir, 'src', 'components', 'LabW26PageV3.tsx');
const communityNightSourcePath = '/Users/viola/Downloads/{space}_{cases}_Community_Night_—_Личные_решения_для_продуктивности.md';

const rules = [
  {
    caseTitle: 'TEAM OPERATION SYSTEM',
    sourceName: 'Community Night markdown / Кейс 1',
    backgroundOnlyTools: ['WHOOP', 'WOOP', 'Plaud', 'Plaud Pin'],
    sourceContext: 'WHOOP and Plaud are described as Personal OS prehistory, not as visible Team OS tools.'
  }
];

const source = readFile(caseCodePath);
const failures = [];
const checks = [];

for (const rule of rules) {
  const block = extractCaseBlock(source, rule.caseTitle);
  if (!block) {
    failures.push(`Missing case block: ${rule.caseTitle}`);
    continue;
  }

  const tools = extractStringField(block, 'tools') ?? '';
  const details = extractStringField(block, 'details') ?? '';
  const backgroundOnlyPattern = new RegExp(`\\b(${rule.backgroundOnlyTools.map(escapeRegExp).join('|')})\\b`, 'i');
  const hasPrehistoryCopy = /предыстор|prehistory|background|личн(?:ый|ого) personal os/i.test(details);

  if (backgroundOnlyPattern.test(tools)) {
    failures.push(
      `${rule.caseTitle}: tools contains background-only tool(s): "${tools}". ${rule.sourceContext}`
    );
  }

  if (hasPrehistoryCopy && backgroundOnlyPattern.test(tools)) {
    failures.push(
      `${rule.caseTitle}: prehistory/background copy and background-only tools appear together in visible tools. Move them out of tools or ask the owner.`
    );
  }

  checks.push({
    caseTitle: rule.caseTitle,
    source: rule.sourceName,
    tools,
    backgroundOnlyTools: rule.backgroundOnlyTools,
    status: backgroundOnlyPattern.test(tools) ? 'failed' : 'passed'
  });
}

for (const check of validateProductScreenshots(source)) {
  checks.push(check);
  if (check.status === 'failed') {
    failures.push(check.message);
  }
}

const sourceEvidence = getSourceEvidence(communityNightSourcePath, ['WHOOP', 'Plaud']);

if (failures.length) {
  console.error(JSON.stringify({
    ok: false,
    failures,
    checks,
    sourceEvidence
  }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  checks,
  sourceEvidence
}, null, 2));

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Cannot read ${filePath}: ${error.message}`);
  }
}

function extractCaseBlock(text, title) {
  const titleIndex = text.indexOf(`title: '${title}'`);
  if (titleIndex === -1) return null;

  const objectStart = text.lastIndexOf('{', titleIndex);
  if (objectStart === -1) return null;

  let depth = 0;
  let inString = false;
  let stringQuote = '';
  let escaped = false;

  for (let index = objectStart; index < text.length; index += 1) {
    const char = text[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === stringQuote) {
        inString = false;
        stringQuote = '';
      }
      continue;
    }

    if (char === '\'' || char === '"' || char === '`') {
      inString = true;
      stringQuote = char;
      continue;
    }

    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return text.slice(objectStart, index + 1);
      }
    }
  }

  return null;
}

function extractStringField(block, fieldName) {
  const pattern = new RegExp(`${escapeRegExp(fieldName)}:\\s*(['"\`])([\\s\\S]*?)\\1\\s*,`);
  const match = block.match(pattern);
  return match?.[2] ?? null;
}

function extractProductImageSrc(block) {
  const direct = extractStringField(block, 'productImageSrc');
  if (direct) return direct;
  const helperMatch = block.match(/productImageSrc:\s*getCaseStaticVisualSrcByAssetName\('([^']+)'\)\s*,/);
  return helperMatch?.[1] ?? null;
}

function validateProductScreenshots(text) {
  const results = [];
  const titlePattern = /title:\s*'([^']+)'/g;
  let match;

  while ((match = titlePattern.exec(text))) {
    const caseTitle = match[1];
    const block = extractCaseBlock(text, caseTitle);
    if (!block) continue;

    const productImageSrc = extractProductImageSrc(block);
    if (!productImageSrc) continue;

    const productImageAlt = extractStringField(block, 'productImageAlt') ?? '';
    const productSignals = /скриншот|product|workflow|ui|интерфейс|граф|демо|система|dashboard|task|задач/i;
    const speakerSignals = /рассказ|спикер|портрет|говорит|человек|speaker|portrait|talk/i;
    const maybeRawVideoStill = /video-still|speaker|portrait/i.test(productImageSrc);
    const looksLikeProduct = productSignals.test(productImageAlt);
    const looksLikeSpeaker = speakerSignals.test(productImageAlt) || (maybeRawVideoStill && !looksLikeProduct);
    const status = looksLikeProduct && !looksLikeSpeaker ? 'passed' : 'failed';

    results.push({
      caseTitle,
      source: 'LabW26PageV3.tsx productImage fields',
      productImageSrc,
      productImageAlt,
      status,
      message: status === 'failed'
        ? `${caseTitle}: productImageSrc must be a product/workflow screenshot, not a speaker intro or portrait frame. Alt/src: "${productImageAlt}" / "${productImageSrc}"`
        : undefined
    });
  }

  return results;
}

function getSourceEvidence(filePath, tokens) {
  if (!fs.existsSync(filePath)) {
    return {
      path: filePath,
      available: false,
      matches: []
    };
  }

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  const tokenPattern = new RegExp(tokens.map(escapeRegExp).join('|'), 'i');
  return {
    path: filePath,
    available: true,
    matches: lines
      .map((line, index) => ({ line: index + 1, text: line.trim() }))
      .filter((item) => tokenPattern.test(item.text))
  };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
