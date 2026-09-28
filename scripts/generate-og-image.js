#!/usr/bin/env node
'use strict';

/**
 * Egyszerű, márkaszínekkel dolgozó social share kép (1200x630) generálása,
 * kizárólag Node beépített moduljaival (lásd scripts/lib/png.js).
 * Szöveget NEM renderelünk (nincs beágyazott fontrenderelő), helyette
 * a márka geometriai jelét és a paletta ritmusát használjuk.
 */
const fs = require('fs');
const path = require('path');
const { encodePNG } = require('./lib/png');

const OUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'img', 'social');
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 1200, H = 630;
const BG = [0x0e, 0x22, 0x40];
const BG_ALT = [0x17, 0x32, 0x5a];
const ACCENT = [0xff, 0xc6, 0x29];

const buf = Buffer.alloc(W * H * 4);
function setPx(x, y, c, a = 255) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const o = (y * W + x) * 4;
  buf[o] = c[0]; buf[o + 1] = c[1]; buf[o + 2] = c[2]; buf[o + 3] = a;
}

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) setPx(x, y, BG);
}

// Jobb oldali sötétebb sáv finom kontrasztként
for (let y = 0; y < H; y++) {
  for (let x = Math.round(W * 0.62); x < W; x++) setPx(x, y, BG_ALT);
}

// Koncentrikus "célkereszt" jel a jobb oldalon
const cx = Math.round(W * 0.82);
const cy = Math.round(H * 0.5);
const rings = [
  { r: 190, w: 2, color: [0x23, 0x46, 0x7a] },
  { r: 140, w: 3, color: ACCENT },
  { r: 90, w: 0, color: BG, fill: true },
  { r: 46, w: 3, color: ACCENT },
  { r: 10, w: 0, color: ACCENT, fill: true },
];
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const dx = x - cx, dy = y - cy;
    const d = Math.sqrt(dx * dx + dy * dy);
    for (const ring of rings) {
      if (ring.fill) {
        if (d <= ring.r) setPx(x, y, ring.color);
      } else if (Math.abs(d - ring.r) <= ring.w) {
        setPx(x, y, ring.color);
      }
    }
  }
}

// Alsó sárga csík (brand kontraszt)
for (let y = H - 10; y < H; y++) {
  for (let x = 0; x < W; x++) setPx(x, y, ACCENT);
}

const png = encodePNG(W, H, buf);
fs.writeFileSync(path.join(OUT_DIR, 'og-cover.png'), png);
console.log('wrote assets/img/social/og-cover.png (1200x630)');
