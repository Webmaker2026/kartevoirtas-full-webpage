#!/usr/bin/env node
'use strict';

/**
 * Programozott karakterszám-ellenőrzés a /google-ads/*.md fájlokhoz.
 * NEM becslés — a tényleges string hosszát (JS string length, ami a magyar
 * ékezetes karaktereket is 1 karakternek számolja, megegyezően a Google Ads
 * karakterszámlálásával) ellenőrzi az alábbi limitek szerint:
 *   - RSA címsor: pontosan 15 db, egyenként <= 30 karakter
 *   - RSA leírás: pontosan 4 db, egyenként <= 90 karakter
 *   - Sitelink szöveg: <= 25 karakter
 *   - Callout: <= 25 karakter
 *   - Display path szegmens: <= 15 karakter
 *
 * Futtatás: node scripts/verify-ads.js
 * Kilépési kód: 0 ha minden fájl megfelel, 1 ha bármelyik limit sérül.
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'google-ads');
const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'));

let hasError = false;

// Egy szakasz kezdete lehet "## ..." heading VAGY "**...**" félkövér al-címke.
// A szakasz addig tart, amíg a következő ilyen sorba nem ütközünk.
function extractSectionBody(content, sectionTitle) {
  const startRegex = new RegExp(`^(?:#{1,3}|\\*\\*)[^\\n]*${sectionTitle}[^\\n]*$`, 'm');
  const startMatch = content.match(startRegex);
  if (!startMatch) return null;
  const startIdx = startMatch.index + startMatch[0].length;
  const rest = content.slice(startIdx + 1);
  const nextHeadingMatch = rest.match(/^(?:#{1,3}\s|\*\*[^\n]+\*\*\s*$)/m);
  const endIdx = nextHeadingMatch ? nextHeadingMatch.index : rest.length;
  return rest.slice(0, endIdx);
}

function extractNumberedList(content, sectionTitle) {
  const body = extractSectionBody(content, sectionTitle);
  if (!body) return [];
  const lines = body.split('\n');
  const items = [];
  for (const line of lines) {
    const m = line.match(/^\s*\d+\.\s+(.*)$/);
    if (m) items.push(m[1].trim());
  }
  return items;
}

function extractTableColumn(content, sectionTitle, columnIndex) {
  const body = extractSectionBody(content, sectionTitle);
  if (!body) return [];
  const lines = body.split('\n').filter((l) => l.trim().startsWith('|'));
  const rows = lines.slice(2); // fejléc + elválasztó sor kihagyása
  return rows
    .map((line) => {
      const cells = line.split('|').map((c) => c.trim()).filter((c, i, arr) => !(i === 0 && c === '') && !(i === arr.length - 1 && c === ''));
      return cells[columnIndex];
    })
    .filter(Boolean);
}

for (const file of files) {
  // CRLF (Windows checkout) → LF, különben a sor-alapú regexek nem illeszkednek
  const content = fs.readFileSync(path.join(DIR, file), 'utf8').replace(/\r\n/g, '\n');
  console.log(`\n=== ${file} ===`);

  const headlines = extractNumberedList(content, 'RSA Címsorok \\(15 db, max\\. 30 karakter\\)');
  const descriptions = extractNumberedList(content, 'RSA Leírások \\(4 db, max\\. 90 karakter\\)');
  const sitelinks = extractTableColumn(content, 'Sitelinkek', 0);
  const callouts = extractNumberedList(content, 'Callout javaslatok \\(max\\. 25 karakter\\)');
  const displayPaths = extractNumberedList(content, 'Display Path \\(max\\. 15 karakter/szegmens\\)');

  if (headlines.length !== 15) {
    console.error(`  HIBA: ${headlines.length} címsor található, 15 szükséges.`);
    hasError = true;
  }
  headlines.forEach((h, i) => {
    if (h.length > 30) {
      console.error(`  HIBA: címsor #${i + 1} "${h}" (${h.length} karakter) > 30`);
      hasError = true;
    }
  });

  if (descriptions.length !== 4) {
    console.error(`  HIBA: ${descriptions.length} leírás található, 4 szükséges.`);
    hasError = true;
  }
  descriptions.forEach((d, i) => {
    if (d.length > 90) {
      console.error(`  HIBA: leírás #${i + 1} "${d}" (${d.length} karakter) > 90`);
      hasError = true;
    }
  });

  if (sitelinks.length < 6) {
    console.error(`  HIBA: ${sitelinks.length} sitelink található, legalább 6 szükséges.`);
    hasError = true;
  }
  sitelinks.forEach((s, i) => {
    if (s.length > 25) {
      console.error(`  HIBA: sitelink #${i + 1} "${s}" (${s.length} karakter) > 25`);
      hasError = true;
    }
  });

  callouts.forEach((c, i) => {
    if (c.length > 25) {
      console.error(`  HIBA: callout #${i + 1} "${c}" (${c.length} karakter) > 25`);
      hasError = true;
    }
  });

  displayPaths.forEach((d, i) => {
    if (d.length > 15) {
      console.error(`  HIBA: display path #${i + 1} "${d}" (${d.length} karakter) > 15`);
      hasError = true;
    }
  });

  console.log(`  Címsorok: ${headlines.length}/15, max hossz: ${Math.max(...headlines.map((h) => h.length), 0)}`);
  console.log(`  Leírások: ${descriptions.length}/4, max hossz: ${Math.max(...descriptions.map((d) => d.length), 0)}`);
  console.log(`  Sitelinkek: ${sitelinks.length}, max hossz: ${Math.max(...sitelinks.map((s) => s.length), 0)}`);
  console.log(`  Calloutok: ${callouts.length}, max hossz: ${Math.max(...callouts.map((c) => c.length), 0)}`);
  console.log(`  Display path szegmensek: ${displayPaths.length}, max hossz: ${Math.max(...displayPaths.map((d) => d.length), 0)}`);
}

if (hasError) {
  console.error('\nEllenőrzés SIKERTELEN — javítsd a fenti hibákat.');
  process.exit(1);
} else {
  console.log('\nMinden fájl megfelel a karakterlimiteknek.');
}
