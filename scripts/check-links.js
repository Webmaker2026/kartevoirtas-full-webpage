#!/usr/bin/env node
'use strict';

/**
 * Egyszerű, függőségmentes belső link- és anchor-ellenőrző a public/ kimenetre.
 * Ellenőrzi:
 *  - minden relatív href/src fájlra vagy mappára (index.html) mutat-e ténylegesen
 *  - minden #anchor hivatkozás létező id-re mutat-e (ugyanazon az oldalon)
 * Külső (http/https), tel:, mailto:, és a #ajanlatkeres-szerű, más oldalra mutató
 * anchorokat is kezeli (pl. /agyi-poloska-irtas/#arak → az adott oldal id-jét nézi).
 *
 * Futtatás: node scripts/check-links.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'public');
let errorCount = 0;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function resolveFile(urlPath) {
  const clean = urlPath.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return path.join(ROOT, 'index.html');
  let full = path.join(ROOT, clean);
  if (fs.existsSync(full) && fs.statSync(full).isDirectory()) full = path.join(full, 'index.html');
  return full;
}

const htmlFiles = walk(ROOT);
const idCache = new Map();

function getIds(file) {
  if (idCache.has(file)) return idCache.get(file);
  if (!fs.existsSync(file)) return new Set();
  const content = fs.readFileSync(file, 'utf8');
  const ids = new Set([...content.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  idCache.set(file, ids);
  return ids;
}

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file);
  const hrefs = [...content.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);

  for (const href of hrefs) {
    if (/^(https?:|tel:|mailto:|data:)/.test(href)) continue;
    if (href.startsWith('#')) {
      const ids = getIds(file);
      const targetId = href.slice(1);
      if (targetId && !ids.has(targetId)) {
        console.error(`HIBA [${rel}]: hiányzó anchor "${href}" ugyanazon az oldalon`);
        errorCount++;
      }
      continue;
    }
    const targetFile = resolveFile(href);
    if (!fs.existsSync(targetFile)) {
      console.error(`HIBA [${rel}]: törött link "${href}" -> nem található: ${path.relative(ROOT, targetFile)}`);
      errorCount++;
      continue;
    }
    if (href.includes('#')) {
      const targetId = href.split('#')[1];
      const ids = getIds(targetFile);
      if (targetId && !ids.has(targetId)) {
        console.error(`HIBA [${rel}]: "${href}" -> az anchor "#${targetId}" nem létezik a cél oldalon`);
        errorCount++;
      }
    }
  }
}

if (errorCount === 0) {
  console.log(`Rendben: ${htmlFiles.length} HTML fájl, nincs törött belső link vagy hiányzó anchor.`);
} else {
  console.error(`\n${errorCount} hiba található.`);
  process.exit(1);
}
