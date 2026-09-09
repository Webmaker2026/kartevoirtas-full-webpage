#!/usr/bin/env node
'use strict';

/**
 * Dev-time statikus build.
 * Kimenet: /public — ez a mappa tölthető fel közvetlenül hagyományos
 * FTP/PHP tárhelyre, build lépés nélkül. A Vercel is ezt a mappát
 * szolgálja ki statikus preview-ként (lásd vercel.json).
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
    description: 'Szakszerű kártevőirtás magánszemélyeknek és cégeknek ' + SITE.serviceArea + '. Ágyi poloska, csótány, rágcsáló, darázs és más kártevők kezelése — kérjen ajánlatot.',
    module: './pages/index.js',
  },
  {
    outPath: 'agyi-poloska-irtas/index.html',
    urlPath: '/agyi-poloska-irtas/',
    title: 'Ágyi poloska irtás árak és időpont | ' + SITE.companyName,
    description: 'Ágyi poloska irtás gyors, célzott kezeléssel. Fertőzöttség jelei, kezelés menete, árak és gyakori kérdések egy oldalon.',
    module: './pages/agyi-poloska-irtas.js',
  },
  {
    outPath: 'csotanyirtas/index.html',
    urlPath: '/csotanyirtas/',
    title: 'Csótányirtás lakásban és társasházban | ' + SITE.companyName,
    description: 'Csótányirtás lakás, iroda és vendéglátóipari egység részére. Célzott kezelés, tartós eredmény — nézze meg az árakat és a folyamatot.',
    module: './pages/csotanyirtas.js',
  },
  {
    outPath: 'darazsirtas/index.html',
    urlPath: '/darazsirtas/',
    title: 'Darázsirtás — darázsfészek eltávolítása | ' + SITE.companyName,
    description: 'Darázsfészek biztonságos, szakszerű eltávolítása kertben, tetőtérben, homlokzaton. Gyors kiszállás, védőfelszereléssel végzett beavatkozás.',
    module: './pages/darazsirtas.js',
  },
  {
    outPath: 'hangyairtas/index.html',
    urlPath: '/hangyairtas/',
    title: 'Hangyairtás beltérben és kertben | ' + SITE.companyName,
    description: 'Hangyairtás lakásban és kertben, a fészek felszámolásával a tartós eredményért. Árak, kezelés menete, gyakori kérdések.',
    module: './pages/hangyairtas.js',
  },
  {
    outPath: 'patkanyirtas/index.html',
    urlPath: '/patkanyirtas/',
    title: 'Patkányirtás lakóingatlanban és telephelyen | ' + SITE.companyName,
    description: 'Patkányirtás biztonságos csapdázással és irtószeres kezeléssel, a bejutási pontok felmérésével. Nézze meg az árakat és a folyamatot.',
    module: './pages/patkanyirtas.js',
  },
  {
    outPath: 'egerirtas/index.html',
    urlPath: '/egerirtas/',
    title: 'Egérirtás — fertőzöttség felszámolása | ' + SITE.companyName,
    description: 'Egérirtás csapdázással és monitoringgal, a bejutási pontok lezárására vonatkozó javaslattal. Árak és gyakori kérdések.',
    module: './pages/egerirtas.js',
  },
  {
    outPath: 'bolhairtas/index.html',
    urlPath: '/bolhairtas/',
    title: 'Bolhairtás lakásban és kertben | ' + SITE.companyName,
    description: 'Bolhairtás lakástextilben és kertben megtelepedő bolhák ellen, háziállat-tartók számára. Árak, kezelés menete, gyakori kérdések.',
    module: './pages/bolhairtas.js',
  },
  {
    outPath: 'egyeb-kartevok/index.html',
    urlPath: '/egyeb-kartevok/',
    title: 'Egyéb kártevők irtása egyedi felmérés alapján | ' + SITE.companyName,
    description: 'Molylepke, pincebogár, atka és más kártevők kezelése egyedi felmérés alapján. Kérjen ajánlatot, ha nem találja a problémájának megfelelő oldalt.',
    module: './pages/egyeb-kartevok.js',
  },
  {
    outPath: 'arak/index.html',
    urlPath: '/arak/',
    title: 'Kártevőirtási árak | ' + SITE.companyName,
    description: 'Kártevőirtási szolgáltatásaink összesített árlistája. Minden szolgáltatáshoz saját, részletes árlista tartozik a szolgáltatás oldalán.',
    module: './pages/arak.js',
  },
  {
    outPath: 'rolunk/index.html',
    urlPath: '/rolunk/',
    title: 'Rólunk | ' + SITE.companyName,
    description: 'Ismerje meg, hogyan dolgozunk, és miért fontos a felmérés minden kártevőirtási munka elején.',
    module: './pages/rolunk.js',
  },
  {
    outPath: 'gyik/index.html',
    urlPath: '/gyik/',
    title: 'Gyakori kérdések | ' + SITE.companyName,
    description: 'Válaszok a kártevőirtással, árajánlattal és a kezelés menetével kapcsolatos leggyakoribb kérdésekre.',
    module: './pages/gyik.js',
  },
  {
    outPath: 'kapcsolat/index.html',
    urlPath: '/kapcsolat/',
    title: 'Kapcsolat és ajánlatkérés | ' + SITE.companyName,
    description: 'Kérjen ajánlatot online űrlapon, vagy hívjon minket közvetlenül. Elérhetőségeink és az ajánlatkérő űrlap egy helyen.',
    module: './pages/kapcsolat.js',
  },
  {
    outPath: 'koszonjuk/index.html',
    urlPath: '/koszonjuk/',
    title: 'Köszönjük! | ' + SITE.companyName,
    description: 'Sikeresen elküldte ajánlatkérését, hamarosan felvesszük Önnel a kapcsolatot.',
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
      content: mod.render(),
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
    background_color: '#201e1d',
    theme_color: '#201e1d',
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
