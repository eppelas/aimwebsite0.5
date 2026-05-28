#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const root = dirname(dirname(__filename));
const dist = join(root, "dist");

const reviewLabs = [
  "homepage-design-lab",
  "payment-page-design-lab"
];

if (!existsSync(dist)) {
  throw new Error("dist does not exist. Run vite build before copying review labs.");
}

const copied = [];
for (const lab of reviewLabs) {
  const source = join(root, lab);
  if (!existsSync(source)) continue;
  const target = join(dist, lab);
  mkdirSync(dirname(target), { recursive: true });
  cpSync(source, target, {
    recursive: true,
    force: true,
    errorOnExist: false
  });
  copied.push(lab);
}

console.log(JSON.stringify({
  status: "copied-review-labs",
  copied,
  output: "dist"
}, null, 2));
