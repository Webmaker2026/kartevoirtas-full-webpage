'use strict';
const { renderHead } = require('./head');
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
  return `<!doctype html>
<html lang="hu">
<head>
${renderHead({ title: opts.title, description: opts.description, path: opts.path, noindex: opts.noindex })}
</head>
<body>
${renderHeader(opts.path)}
<main id="main">
${opts.content}
</main>
${renderFooter()}
${sticky ? renderStickyCta() : ''}
${renderConsent()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}

module.exports = { renderPage };
