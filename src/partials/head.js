'use strict';
const { SITE } = require('../config');

function absoluteUrl(path) {
  const base = `${SITE.protocol}://${SITE.domain}`;
  if (SITE.domain === '[DOMAIN]') return `${base}${path}`;
  return `${base}${path}`;
}

/**
 * @param {Object} opts
 * @param {string} opts.title
 * @param {string} opts.description
 * @param {string} opts.path - kanonikus útvonal, pl. '/patkanyirtas/'
 * @param {boolean} [opts.noindex]
 * @param {string} [opts.ogImage]
 */
function renderHead(opts) {
  const { title, description, path, noindex } = opts;
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl('/assets/img/social/og-cover.png');
  const robots = noindex ? 'noindex, follow' : 'index, follow';

  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#111315">

<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/assets/img/icons/favicon.svg">
<link rel="apple-touch-icon" href="/assets/img/icons/apple-touch-icon-180.png">
<link rel="manifest" href="/site.webmanifest">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.companyName}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:locale" content="hu_HU">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${ogImage}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/css/style.css">

<!-- GTM / GA4 / Google Ads: a mérési azonosítók megérkezésekor ide kerül a
     Consent Mode v2-t tiszteletben tartó GTM snippet. A consent alapállapotot
     és a felhasználói döntés kezelését a /assets/js/main.js már biztosítja. -->
`;
}

module.exports = { renderHead, absoluteUrl };
