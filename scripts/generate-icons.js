#!/usr/bin/env node
'use strict';

/**
 * Favicon / app ikon generátor — nulla külső függőséggel.
 * A raszterizáláshoz és PNG kódoláshoz kizárólag Node beépített
 * `zlib` (deflate) és `crypto` (nincs is szükség rá, saját CRC32) modulját
 * használja. A mark egy egyszerű, márkához illő "célkereszt/pontosság"
 * jel — nem bogár-ikon, hanem a "felmérés -> célzott kezelés" gondolatot
 * jelképezi, összhangban a design brief 32. pontjával.
 *
 * Futtatás: node scripts/generate-icons.js
 */
const fs = require('fs');
const path = require('path');
const { encodePNG } = require('./lib/png');

const OUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'img', 'icons');
fs.mkdirSync(OUT_DIR, { recursive: true });

const BG = [0x11, 0x13, 0x15];
const ACCENT = [0xf2, 0x8c, 0x28];

/** Supersampelt "célkereszt" jel rajzolása RGBA bufferbe. */
function drawMark(size) {
  const SS = 4;
  const big = size * SS;
  const px = new Float32Array(big * big * 3); // r,g,b előszámítás
  const cx = big / 2;
  const cy = big / 2;
  const outerR = big * 0.46;
  const ringOuter = big * 0.34;
  const ringInner = big * 0.27;
  const dotR = big * (size < 64 ? 0.16 : 0.09);
  const simple = size < 64;

  for (let y = 0; y < big; y++) {
    for (let x = 0; x < big; x++) {
      const dx = x - cx + 0.5;
      const dy = y - cy + 0.5;
      const d = Math.sqrt(dx * dx + dy * dy);
      let color = BG;
      if (!simple) {
        if (d <= dotR) color = ACCENT;
        else if (d <= ringOuter && d >= ringInner) color = ACCENT;
        else if (d <= outerR * 0.98 && d >= outerR * 0.90) color = ACCENT;
      } else {
        if (d <= dotR) color = ACCENT;
      }
      const idx = (y * big + x) * 3;
      px[idx] = color[0]; px[idx + 1] = color[1]; px[idx + 2] = color[2];
    }
  }

  const out = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const idx = ((y * SS + sy) * big + (x * SS + sx)) * 3;
          r += px[idx]; g += px[idx + 1]; b += px[idx + 2];
        }
      }
      const n = SS * SS;
      const o = (y * size + x) * 4;
      out[o] = Math.round(r / n);
      out[o + 1] = Math.round(g / n);
      out[o + 2] = Math.round(b / n);
      out[o + 3] = 255;
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
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#111315"/>
  <circle cx="32" cy="32" r="22" fill="none" stroke="#F28C28" stroke-width="3"/>
  <circle cx="32" cy="32" r="12" fill="none" stroke="#F28C28" stroke-width="3"/>
  <circle cx="32" cy="32" r="4" fill="#F28C28"/>
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
