'use strict';
const { renderHead, assetUrl } = require('./head');
const { renderHeader } = require('./header');
const { renderFooter } = require('./footer');
const { renderConsent } = require('./consent');
const { renderStickyCta } = require('./stickyCta');

/**
 * @param {Object} opts
 * @param {string} opts.title
 * @param {string} opts.description
 * @param {string} opts.path
 * @param {boolean} [opts.noindex]
 * @param {string} opts.content - a <main> tartalma (HTML string)
 * @param {boolean} [opts.sticky=true] - mobil sticky CTA sáv megjelenítése
 */
function renderPage(opts) {
  const sticky = opts.sticky !== false;
  // Ha az oldalon van ajánlatkérő űrlap, a sticky "Ajánlatkérés" gomb oda ugrik.
  const quoteHref = opts.content.includes('id="ajanlatkeres"') ? '#ajanlatkeres' : '/kapcsolat/';
  return `<!doctype html>
<html lang="hu">
<head>
${renderHead({ title: opts.title, description: opts.description, path: opts.path, noindex: opts.noindex })}
</head>
<body${sticky ? ' class="has-sticky-cta"' : ''}>
${renderHeader(opts.path)}
<main id="main">
${opts.content}
</main>
${renderFooter()}
${sticky ? renderStickyCta(quoteHref) : ''}
${renderConsent()}
<script src="${assetUrl('/assets/js/main.js')}" defer></script>
</body>
</html>
`;
}

module.exports = { renderPage };
