#!/usr/bin/env node
'use strict';

/**
 * Szolgáltatás-illusztrációk generátora — nulla külső függőséggel.
 *
 * A projektnek jelenleg nincs valódi fotóanyaga (lásd design brief 3. pont).
 * Ahelyett hogy generikus "stock photo" hatású, hiteltelen képeket
 * illesztenénk be, minden szolgáltatáshoz egy egyedi, a márka
 * design-rendszerével (navy + sárga) összhangban álló,
 * fotó-arányú (4:5) illusztrációt készítünk. Ezek a fájlok a végleges
 * `public/assets/img/services/<slug>.svg` útvonalon élnek — amikor valódi,
 * optimalizált WebP/AVIF fotók készülnek, ELÉG ugyanide (azonos névvel,
 * .webp/.avif kiterjesztéssel) bemásolni őket és a
 * `src/data/media.js`-ben átírni a kiterjesztést, a HTML/CSS oldal
 * (`.media-photo`) NEM változik.
 *
 * Futtatás: node scripts/generate-service-art.js
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'img', 'services');
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 480;
const H = 600;

const INK = '#EAF1FA';
const ACCENT = '#FFC629';
const ACCENT_SOFT = 'rgba(255,198,41,.35)';

function frame(id, glow, fg) {
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="">
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#17325a"/>
      <stop offset="60%" stop-color="#0e2240"/>
      <stop offset="100%" stop-color="#07162b"/>
    </linearGradient>
    <radialGradient id="glow-${id}" cx="${glow.x}%" cy="${glow.y}%" r="65%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity=".28"/>
      <stop offset="55%" stop-color="${ACCENT}" stop-opacity=".07"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig-${id}" cx="50%" cy="46%" r="75%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity=".45"/>
    </radialGradient>
    <filter id="grain-${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .05 0"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <rect width="${W}" height="${H}" fill="url(#glow-${id})"/>
  <circle cx="${W * 0.5}" cy="${H * 0.46}" r="205" fill="none" stroke="${ACCENT}" stroke-width="1.5" stroke-dasharray="3 11" opacity=".35"/>
  <g>${fg}</g>
  <rect width="${W}" height="${H}" fill="url(#vig-${id})"/>
  <rect width="${W}" height="${H}" filter="url(#grain-${id})"/>
</svg>
`;
}

/* ---------- Egyedi jelenetek szolgáltatásonként ---------- */

const SCENES = {
  /* Ágyi poloska: matrac + nagyító alatt a rejtőzködő kártevő */
  'agyi-poloska-irtas': {
    glow: { x: 50, y: 70 },
    fg: `
      <g transform="translate(70,400)">
        <rect x="0" y="20" width="340" height="80" rx="14" fill="#1b3a66" stroke="${INK}" stroke-width="4"/>
        <rect x="0" y="0" width="340" height="26" rx="13" fill="#22467a" stroke="${INK}" stroke-width="4"/>
        <g fill="${INK}" opacity=".5">
          <circle cx="40" cy="13" r="3.5"/><circle cx="100" cy="13" r="3.5"/><circle cx="160" cy="13" r="3.5"/>
          <circle cx="220" cy="13" r="3.5"/><circle cx="280" cy="13" r="3.5"/>
        </g>
      </g>
      <g transform="translate(150,150)">
        <circle cx="90" cy="90" r="88" fill="rgba(255,198,41,.05)" stroke="${ACCENT}" stroke-width="5"/>
        <rect x="150" y="150" width="20" height="70" rx="9" transform="rotate(45 150 150)" fill="${ACCENT}"/>
        <g transform="translate(56,50)">
          <ellipse cx="34" cy="46" rx="30" ry="40" fill="#241b12" stroke="${ACCENT}" stroke-width="4"/>
          <path d="M34 10v72" stroke="${ACCENT}" stroke-width="2" opacity=".6"/>
          <path d="M10 25 0 15M58 25l10-10M8 46H-6M60 46h14M10 67 0 77M58 67l10 10" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M22 6 12 -8M46 6l10-14" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
        </g>
      </g>
    `,
  },

  /* Csótányirtás: konyhai padlósor mentén haladó csótány, célzott kezelés jelzéssel */
  csotanyirtas: {
    glow: { x: 55, y: 60 },
    fg: `
      <g stroke="${INK}" stroke-width="3" opacity=".22">
        <path d="M0 340h480M0 380h480M0 420h480M60 300v320M180 300v320M300 300v320M420 300v320"/>
      </g>
      <rect x="0" y="440" width="480" height="18" fill="#1b3a66"/>
      <g transform="translate(140,300) scale(1.15)">
        <ellipse cx="60" cy="90" rx="46" ry="72" fill="#241b12" stroke="${ACCENT}" stroke-width="5"/>
        <path d="M60 24v132M28 40 96 40" stroke="${ACCENT}" stroke-width="2" opacity=".5"/>
        <path d="M20 50 -20 30M100 50l40-20M14 90h-40M106 90h40M20 130l-40 20M100 130l40 20" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M38 20 10 -30M82 20l28-50" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
      </g>
      <g transform="translate(300,150)" stroke="${ACCENT}" stroke-width="6" fill="none" stroke-linecap="round">
        <circle cx="40" cy="40" r="38"/>
        <path d="M14 14 66 66"/>
      </g>
    `,
  },

  /* Darázsirtás: tetőeresz alatt lévő fészek + darázs */
  darazsirtas: {
    glow: { x: 65, y: 25 },
    fg: `
      <path d="M-20 130 240 20 500 130 Z" fill="#1b3a66" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <g transform="translate(190,120)" fill="#241b12" stroke="${ACCENT}" stroke-width="3.5">
        <path d="M60 0 88 16v32L60 64 32 48V16Z"/>
        <path d="M0 40 28 56v32L0 104l-28-16V56Z" transform="translate(28,0)"/>
        <path d="M100 40 128 56v32l-28 16-28-16V56Z" transform="translate(-8,0)"/>
      </g>
      <g transform="translate(240,260) rotate(-8)">
        <ellipse cx="0" cy="55" rx="30" ry="46" fill="#1b3a66" stroke="${ACCENT}" stroke-width="5"/>
        <path d="M-30 30h60M-27 55h54M-22 82h44" stroke="${ACCENT}" stroke-width="7"/>
        <circle cx="0" cy="-4" r="20" fill="#1b3a66" stroke="${INK}" stroke-width="4"/>
        <path d="M-14 -10 -34 -22M14 -10l20-12" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
        <ellipse cx="-34" cy="16" rx="30" ry="14" fill="rgba(234,241,250,.12)" stroke="${INK}" stroke-width="2.5" transform="rotate(-18 -34 16)"/>
        <ellipse cx="34" cy="16" rx="30" ry="14" fill="rgba(234,241,250,.12)" stroke="${INK}" stroke-width="2.5" transform="rotate(18 34 16)"/>
      </g>
    `,
  },

  /* Patkányirtás: csőnyomvonal mentén elhelyezett csapdaállomás */
  patkanyirtas: {
    glow: { x: 40, y: 65 },
    fg: `
      <rect x="0" y="430" width="480" height="60" fill="#163258"/>
      <rect x="-20" y="400" width="520" height="34" rx="17" fill="#1d3f70" stroke="${INK}" stroke-width="4"/>
      <g transform="translate(70,340)">
        <rect x="0" y="0" width="90" height="60" rx="10" fill="#1b3a66" stroke="${ACCENT}" stroke-width="5"/>
        <circle cx="45" cy="30" r="12" fill="#07162b"/>
      </g>
      <g transform="translate(230,300)">
        <ellipse cx="70" cy="90" rx="72" ry="46" fill="#241b12" stroke="${ACCENT}" stroke-width="5"/>
        <circle cx="10" cy="60" r="26" fill="#241b12" stroke="${ACCENT}" stroke-width="5"/>
        <path d="M-14 42 -46 26" stroke="${ACCENT}" stroke-width="5" stroke-linecap="round"/>
        <path d="M-2 40 -10 20" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="0" cy="52" r="3" fill="${INK}"/>
        <path d="M130 96 C180 92 210 60 208 20" fill="none" stroke="${ACCENT}" stroke-width="6" stroke-linecap="round"/>
        <g stroke="${INK}" stroke-width="4" stroke-linecap="round">
          <path d="M40 128 30 150M60 132 55 155M85 130 88 153M108 122 118 143"/>
        </g>
      </g>
    `,
  },

  /* Egérirtás: bejutási pont a szegélylécnél, lezárás jelzéssel */
  egerirtas: {
    glow: { x: 42, y: 68 },
    fg: `
      <rect x="0" y="450" width="480" height="40" fill="#163258"/>
      <rect x="-20" y="410" width="520" height="46" fill="#1d3f70" stroke="${INK}" stroke-width="4"/>
      <path d="M175 456 225 456 210 410 190 410Z" fill="#07162b"/>
      <g stroke="${ACCENT}" stroke-width="5" stroke-linecap="round">
        <path d="M180 432 220 432"/>
        <path d="M186 415 214 449"/>
      </g>
      <g transform="translate(230,300)">
        <ellipse cx="60" cy="90" rx="52" ry="34" fill="#241b12" stroke="${ACCENT}" stroke-width="5"/>
        <circle cx="8" cy="66" r="22" fill="#241b12" stroke="${ACCENT}" stroke-width="5"/>
        <circle cx="-8" cy="46" r="13" fill="#241b12" stroke="${ACCENT}" stroke-width="4"/>
        <circle cx="16" cy="42" r="13" fill="#241b12" stroke="${ACCENT}" stroke-width="4"/>
        <circle cx="-2" cy="60" r="3" fill="${INK}"/>
        <path d="M110 100 C150 104 175 88 182 60" fill="none" stroke="${ACCENT}" stroke-width="5" stroke-linecap="round"/>
      </g>
      <g fill="${INK}" opacity=".5">
        <circle cx="150" cy="470" r="4"/><circle cx="170" cy="465" r="4"/><circle cx="190" cy="472" r="4"/>
      </g>
    `,
  },

  /* Hangyairtás: nyomvonal a fészekig */
  hangyairtas: {
    glow: { x: 40, y: 65 },
    fg: `
      <path d="M40 520 C120 460 160 430 190 400 C230 360 260 330 300 300" fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-dasharray="1 16" stroke-linecap="round" opacity=".7"/>
      <path d="M20 560 L90 500 L-10 500 Z" fill="#1b3a66" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <g stroke="${INK}" stroke-width="2.5" opacity=".5">
        <path d="M30 540h50M40 555h30"/>
      </g>
      <g transform="translate(260,230) rotate(18)">
        <circle cx="0" cy="0" r="20" fill="#241b12" stroke="${ACCENT}" stroke-width="5"/>
        <ellipse cx="4" cy="40" rx="24" ry="20" fill="#241b12" stroke="${ACCENT}" stroke-width="5"/>
        <ellipse cx="10" cy="92" rx="34" ry="42" fill="#241b12" stroke="${ACCENT}" stroke-width="5"/>
        <path d="M-16 -10 -44 -26M16 -10l28-16" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
        <g stroke="${INK}" stroke-width="4" stroke-linecap="round">
          <path d="M-14 30 -46 18M18 30l32-12"/>
          <path d="M-18 48 -50 48M22 48l32 0"/>
          <path d="M-14 66 -46 78M18 66l32 12"/>
        </g>
      </g>
    `,
  },

  /* Bolhairtás: háziállat mancsnyom + textil/szőnyeg motívum */
  bolhairtas: {
    glow: { x: 45, y: 60 },
    fg: `
      <g stroke="${INK}" stroke-width="2" opacity=".18">
        <path d="M0 460h480M0 480h480M0 500h480M0 520h480"/>
      </g>
      <g transform="translate(90,420)" fill="${ACCENT}" opacity=".9">
        <ellipse cx="30" cy="30" rx="20" ry="16"/>
        <ellipse cx="4" cy="4" rx="8" ry="10"/>
        <ellipse cx="24" cy="-8" rx="8" ry="10"/>
        <ellipse cx="48" cy="-6" rx="8" ry="10"/>
        <ellipse cx="60" cy="8" rx="8" ry="10"/>
      </g>
      <g transform="translate(230,240)">
        <circle cx="30" cy="30" r="26" fill="#241b12" stroke="${ACCENT}" stroke-width="5"/>
        <path d="M14 16 -10 -14M46 16l24-30" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M52 44 C100 40 110 90 150 96" fill="none" stroke="${ACCENT}" stroke-width="7" stroke-linecap="round"/>
        <path d="M8 44 C-30 60 -30 110 -60 130" fill="none" stroke="${ACCENT}" stroke-width="7" stroke-linecap="round"/>
      </g>
      <g stroke="${ACCENT}" stroke-width="2.5" stroke-dasharray="1 10" fill="none" opacity=".6">
        <path d="M260 240 C320 190 350 150 360 100"/>
      </g>
    `,
  },

  /* Egyéb kártevők: egyedi felmérés — nagyító + célkereszt, kártevőtől függetlenül */
  general: {
    glow: { x: 50, y: 45 },
    fg: `
      <g transform="translate(140,180)">
        <circle cx="90" cy="90" r="88" fill="rgba(255,198,41,.05)" stroke="${ACCENT}" stroke-width="5"/>
        <circle cx="90" cy="90" r="46" fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-dasharray="2 9" opacity=".7"/>
        <circle cx="90" cy="90" r="10" fill="${ACCENT}"/>
        <path d="M90 30v28M90 122v28M30 90h28M122 90h28" stroke="${INK}" stroke-width="3" opacity=".6"/>
        <rect x="150" y="150" width="20" height="76" rx="9" transform="rotate(45 150 150)" fill="${ACCENT}"/>
      </g>
    `,
  },

  /* Kártevőirtás cégeknek / B2B: épület + szakember ellenőrzőlistával */
  commercial: {
    glow: { x: 60, y: 35 },
    fg: `
      <g transform="translate(230,120)">
        <rect x="0" y="0" width="200" height="380" fill="#183760" stroke="${INK}" stroke-width="4"/>
        <g fill="${ACCENT}" opacity=".5">
          <rect x="20" y="26" width="26" height="30"/><rect x="60" y="26" width="26" height="30"/>
          <rect x="100" y="26" width="26" height="30"/><rect x="140" y="26" width="26" height="30"/>
          <rect x="20" y="70" width="26" height="30"/><rect x="60" y="70" width="26" height="30"/>
          <rect x="100" y="70" width="26" height="30"/><rect x="140" y="70" width="26" height="30"/>
          <rect x="20" y="114" width="26" height="30"/><rect x="60" y="114" width="26" height="30"/>
          <rect x="100" y="114" width="26" height="30"/><rect x="140" y="114" width="26" height="30"/>
        </g>
        <rect x="70" y="300" width="60" height="80" fill="#07162b" stroke="${INK}" stroke-width="3"/>
      </g>
      <g transform="translate(70,260)">
        <circle cx="46" cy="30" r="26" fill="#1b3a66" stroke="${INK}" stroke-width="4"/>
        <path d="M20 100 C20 66 30 56 46 56 C62 56 72 66 72 100 L78 190 L52 190 L48 130 L44 190 L18 190 Z" fill="#1b3a66" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
        <rect x="72" y="90" width="46" height="60" rx="4" fill="${ACCENT}" opacity=".14" stroke="${ACCENT}" stroke-width="3.5"/>
        <g stroke="${ACCENT}" stroke-width="3" stroke-linecap="round">
          <path d="M80 104h30M80 116h30M80 128h22"/>
        </g>
      </g>
    `,
  },
};

function build() {
  Object.keys(SCENES).forEach((key) => {
    const scene = SCENES[key];
    const svg = frame(key, scene.glow, scene.fg);
    fs.writeFileSync(path.join(OUT_DIR, `${key}.svg`), svg, 'utf8');
    console.log('  wrote services/' + key + '.svg');
  });
}

build();
console.log('Szolgáltatás-illusztrációk kész — kimenet: /public/assets/img/services');
