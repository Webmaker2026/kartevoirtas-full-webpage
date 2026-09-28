#!/usr/bin/env node
'use strict';

/**
 * Favicon / app ikon generátor — nulla külső függőséggel.
 * A raszterizáláshoz és PNG kódoláshoz kizárólag Node beépített
 * moduljait használja (lásd scripts/lib/png.js). A jel a fejlécben is
 * használt pajzs + pipa ikon (src/partials/icons.js → brandMark):
 * navy alapon sárga vonal. Ha az ügyfélnek saját logója van, ezeket a
 * fájlokat azonos néven és méretben kell lecserélni.
 *
 * Futtatás: node scripts/generate-icons.js
 */
const fs = require('fs');
const path = require('path');
const { encodePNG } = require('./lib/png');

const OUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'img', 'icons');
fs.mkdirSync(OUT_DIR, { recursive: true });

const BG = [0x0e, 0x22, 0x40];
const ACCENT = [0xff, 0xc6, 0x29];

// A 24 egységes SVG ikon pontjai (a görbéket mintavételezzük).
function cubic(p0, p1, p2, p3, steps) {
  const pts = [];
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    pts.push([
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ]);
  }
  return pts;
}
const SHIELD = [
  [12, 3], [4.5, 6], [4.5, 12],
  ...cubic([4.5, 12], [4.5, 16.4], [7.7, 19.6], [12, 21], 16),
  ...cubic([12, 21], [16.3, 19.6], [19.5, 16.4], [19.5, 12], 16),
  [19.5, 6], [12, 3],
];
const CHECK = [[8.8, 12.2], [11.1, 14.5], [15.4, 9.7]];

function distToSeg(px, py, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = dx * dx + dy * dy;
  let t = len ? ((px - a[0]) * dx + (py - a[1]) * dy) / len : 0;
  t = Math.max(0, Math.min(1, t));
  const x = a[0] + t * dx - px;
  const y = a[1] + t * dy - py;
  return Math.sqrt(x * x + y * y);
}
function distToLine(px, py, pts) {
  let d = Infinity;
  for (let i = 1; i < pts.length; i++) d = Math.min(d, distToSeg(px, py, pts[i - 1], pts[i]));
  return d;
}

/** Supersamplelt jel RGBA bufferbe: lekerekített navy négyzet, sárga pajzs. */
function drawMark(size) {
  const SS = 4;
  const out = Buffer.alloc(size * size * 4);
  const half = (size < 64 ? 2.8 : 2.2) / 2; // vonalvastagság fele, ikon-egységben
  const radius = size * 0.22;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, hits = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const fx = x + (sx + 0.5) / SS;
          const fy = y + (sy + 0.5) / SS;
          const cx = Math.min(Math.max(fx, radius), size - radius);
          const cy = Math.min(Math.max(fy, radius), size - radius);
          if ((fx - cx) ** 2 + (fy - cy) ** 2 > radius * radius) continue; // lekerekített sarok
          const ix = (fx / size) * 30 - 3; // 24-es ikon a 30 egységes vászon közepén
          const iy = (fy / size) * 30 - 3;
          const c = distToLine(ix, iy, SHIELD) <= half || distToLine(ix, iy, CHECK) <= half ? ACCENT : BG;
          r += c[0]; g += c[1]; b += c[2]; hits++;
        }
      }
      const o = (y * size + x) * 4;
      out[o] = hits ? Math.round(r / hits) : 0;
      out[o + 1] = hits ? Math.round(g / hits) : 0;
      out[o + 2] = hits ? Math.round(b / hits) : 0;
      out[o + 3] = Math.round((hits / (SS * SS)) * 255);
    }
  }
  return out;
}

function writePNG(size, filename) {
  const rgba = drawMark(size);
  const buf = encodePNG(size, size, rgba);
  fs.writeFileSync(path.join(OUT_DIR, filename), buf);
  console.log('  wrote', filename, `(${size}x${size})`);
  return buf;
}

function buildIco(png32) {
  // Minimális ICO konténer, egyetlen PNG-formátumú képpel (modern böngészők támogatják).
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry[0] = 32; // width
  entry[1] = 32; // height
  entry[2] = 0; // color palette
  entry[3] = 0; // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png32.length, 8); // size of image data
  entry.writeUInt32LE(6 + 16, 12); // offset

  return Buffer.concat([header, entry, png32]);
}

function writeSVG() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
  <rect width="30" height="30" rx="6.6" fill="#0e2240"/>
  <g transform="translate(3 3)" fill="none" stroke="#ffc629" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3 4.5 6v6c0 4.4 3.2 7.6 7.5 9 4.3-1.4 7.5-4.6 7.5-9V6L12 3Z"/>
    <path d="m8.8 12.2 2.3 2.3 4.3-4.8"/>
  </g>
</svg>
`;
  fs.writeFileSync(path.join(OUT_DIR, 'favicon.svg'), svg, 'utf8');
  console.log('  wrote favicon.svg');
}

console.log('Ikonok generálása...');
writePNG(16, 'favicon-16.png');
const png32 = writePNG(32, 'favicon-32.png');
writePNG(180, 'apple-touch-icon-180.png');
writePNG(192, 'icon-192.png');
writePNG(512, 'icon-512.png');
writeSVG();

const ico = buildIco(png32);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), ico);
console.log('  wrote favicon.ico');
console.log('Ikonok kész.');
