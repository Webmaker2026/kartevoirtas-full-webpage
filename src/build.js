#!/usr/bin/env node
'use strict';

/**
 * Dev-time statikus build.
 * Kimenet: /public — ezt a mappát szolgálja ki a Cloudflare Worker statikus
 * assetként (lásd wrangler.toml), illetve a Vercel preview (vercel.json).
 *
 * Futtatás: node src/build.js
 */
const fs = require('fs');
const path = require('path');
const { SITE } = require('./config');
const { renderPage } = require('./partials/layout');
const { SERVICES } = require('./data/services');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public');

const PAGES = [
  {
    outPath: 'index.html',
    urlPath: '/',
    title: 'Kártevőirtás | ' + SITE.companyName,
    description: 'Kártevőirtás magánszemélyeknek, társasházaknak és cégeknek ' + SITE.serviceArea + ' területén. Csótány, ágyi poloska, egér, patkány, darázs, hangya és bolha irtása.',
    module: './pages/index.js',
  },
  {
    outPath: 'agyi-poloska-irtas/index.html',
    urlPath: '/agyi-poloska-irtas/',
    title: 'Ágyi poloska irtás – jelek, kezelés, árak | ' + SITE.companyName,
    description: 'Ágyi poloska irtás lakásban és szálláshelyen. A fertőzöttség jelei, a kezelés menete, teendők a kezelés előtt és után, árak.',
    module: './pages/agyi-poloska-irtas.js',
  },
  {
    outPath: 'csotanyirtas/index.html',
    urlPath: '/csotanyirtas/',
    title: 'Csótányirtás lakásban, társasházban, étteremben | ' + SITE.companyName,
    description: 'Csótányirtás lakásban, társasházban, irodában és vendéglátóhelyen. A csótány jelei, a kezelés menete, előkészületek és árak.',
    module: './pages/csotanyirtas.js',
  },
  {
    outPath: 'darazsirtas/index.html',
    urlPath: '/darazsirtas/',
    title: 'Darázsirtás, darázsfészek eltávolítása | ' + SITE.companyName,
    description: 'Darázsfészek eltávolítása ereszről, tetőtérből, redőnytokból és kertből. Mikor sürgős, hogyan zajlik a beavatkozás, mennyibe kerül.',
    module: './pages/darazsirtas.js',
  },
  {
    outPath: 'hangyairtas/index.html',
    urlPath: '/hangyairtas/',
    title: 'Hangyairtás lakásban és kertben | ' + SITE.companyName,
    description: 'Hangyairtás konyhában, lakásban, teraszon és kertben. Miért jönnek vissza a hangyák, hogyan zajlik a kezelés, mennyibe kerül.',
    module: './pages/hangyairtas.js',
  },
  {
    outPath: 'patkanyirtas/index.html',
    urlPath: '/patkanyirtas/',
    title: 'Patkányirtás lakóházban és telephelyen | ' + SITE.companyName,
    description: 'Patkányirtás családi háznál, társasházban, telephelyen és gazdasági épületben. A patkány jelei, a kezelés menete, előkészületek és árak.',
    module: './pages/patkanyirtas.js',
  },
  {
    outPath: 'egerirtas/index.html',
    urlPath: '/egerirtas/',
    title: 'Egérirtás lakásban, házban és üzletben | ' + SITE.companyName,
    description: 'Egérirtás lakásban, családi házban, irodában és üzletben. Az egér jelei, a kezelés menete, a visszatérés megelőzése és árak.',
    module: './pages/egerirtas.js',
  },
  {
    outPath: 'bolhairtas/index.html',
    urlPath: '/bolhairtas/',
    title: 'Bolhairtás lakásban és kertben | ' + SITE.companyName,
    description: 'Bolhairtás lakásban, szőnyegben, kárpitban és kertben. A bolha jelei, miért nem elég az állatot kezelni, a kezelés menete és árak.',
    module: './pages/bolhairtas.js',
  },
  {
    outPath: 'egyeb-kartevok/index.html',
    urlPath: '/egyeb-kartevok/',
    title: 'Egyéb kártevők: moly, pincebogár és más rovarok | ' + SITE.companyName,
    description: 'Molylepke, pincebogár, ezüstös pikkelyke és kamrai bogarak irtása. Írja le, mit tapasztal, és javaslatot adunk a kezelésre.',
    module: './pages/egyeb-kartevok.js',
  },
  {
    outPath: 'arak/index.html',
    urlPath: '/arak/',
    title: 'Kártevőirtás árak | ' + SITE.companyName,
    description: 'Kártevőirtás árak szolgáltatásonként: ágyi poloska, csótány, darázs, hangya, patkány, egér, bolha. Mitől függ az ár, hogyan kap pontos ajánlatot.',
    module: './pages/arak.js',
  },
  {
    outPath: 'rolunk/index.html',
    urlPath: '/rolunk/',
    title: 'Rólunk | ' + SITE.companyName,
    description: 'Bemutatkozás: kik vagyunk, hol dolgozunk, és hogyan zajlik nálunk egy kártevőirtás a bejelentéstől a kezelés utáni teendőkig.',
    module: './pages/rolunk.js',
  },
  {
    outPath: 'gyik/index.html',
    urlPath: '/gyik/',
    title: 'Gyakori kérdések a kártevőirtásról | ' + SITE.companyName,
    description: 'Válaszok a kártevőirtással kapcsolatos gyakori kérdésekre: ajánlatkérés, kiszállás, előkészületek, fizetés, társasházi kezelés.',
    module: './pages/gyik.js',
  },
  {
    outPath: 'kapcsolat/index.html',
    urlPath: '/kapcsolat/',
    title: 'Kapcsolat és ajánlatkérés | ' + SITE.companyName,
    description: 'Hívjon minket, vagy kérjen ajánlatot az űrlapon. Elérhetőség, szolgáltatási terület és ajánlatkérés egy helyen.',
    module: './pages/kapcsolat.js',
  },
  {
    outPath: 'koszonjuk/index.html',
    urlPath: '/koszonjuk/',
    title: 'Köszönjük! | ' + SITE.companyName,
    description: 'Megkaptuk az ajánlatkérését.',
    module: './pages/koszonjuk.js',
    noindex: true,
    sticky: false,
    sitemap: false,
  },
  {
    outPath: 'adatkezelesi-tajekoztato/index.html',
    urlPath: '/adatkezelesi-tajekoztato/',
    title: 'Adatkezelési tájékoztató | ' + SITE.companyName,
    description: 'A weboldal és az ajánlatkérő űrlap üzemeltetése során megvalósuló adatkezelés bemutatása.',
    module: './pages/adatkezelesi-tajekoztato.js',
  },
  {
    outPath: 'cookie-tajekoztato/index.html',
    urlPath: '/cookie-tajekoztato/',
    title: 'Cookie tájékoztató | ' + SITE.companyName,
    description: 'Tájékoztató a weboldalon használt sütikről és a hozzájárulás kezeléséről.',
    module: './pages/cookie-tajekoztato.js',
  },
  {
    outPath: 'jogi-informaciok/index.html',
    urlPath: '/jogi-informaciok/',
    title: 'Jogi és üzemeltetői információk | ' + SITE.companyName,
    description: 'A weboldal üzemeltetőjének jogi és üzemeltetői adatai.',
    module: './pages/jogi-informaciok.js',
  },
  {
    outPath: '404.html',
    urlPath: '/404.html',
    title: 'Az oldal nem található (404) | ' + SITE.companyName,
    description: 'A keresett oldal nem található.',
    module: './pages/404.js',
    noindex: true,
    sitemap: false,
  },
];

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function buildPages() {
  for (const page of PAGES) {
    const mod = require(page.module);
    const html = renderPage({
      title: page.title,
      description: page.description,
      path: page.urlPath,
      noindex: !!page.noindex,
      content: mod.render({ path: page.urlPath }),
      sticky: page.sticky !== false,
    });
    const outFile = path.join(OUT_DIR, page.outPath);
    ensureDir(outFile);
    fs.writeFileSync(outFile, html, 'utf8');
    console.log('  wrote', page.outPath);
  }
}

function buildRobots() {
  const sitemapUrl = `${SITE.protocol}://${SITE.domain}/sitemap.xml`;
  const content = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${sitemapUrl}
`;
  fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), content, 'utf8');
  console.log('  wrote robots.txt');
}

function buildSitemap() {
  const urls = PAGES.filter((p) => p.sitemap !== false).map((p) => {
    const loc = `${SITE.protocol}://${SITE.domain}${p.urlPath}`;
    const priority = p.urlPath === '/' ? '1.0' : SERVICES.some((s) => s.path === p.urlPath) ? '0.9' : '0.6';
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml, 'utf8');
  console.log('  wrote sitemap.xml');
}

function buildManifest() {
  const manifest = {
    name: SITE.companyName,
    short_name: SITE.companyName.length > 20 ? 'Kártevőirtás' : SITE.companyName,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0e2240',
    icons: [
      { src: '/assets/img/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/img/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
  fs.writeFileSync(path.join(OUT_DIR, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('  wrote site.webmanifest');
}

console.log('Build indul...');
buildPages();
buildRobots();
buildSitemap();
buildManifest();
console.log('Build kész — kimenet: /public');
