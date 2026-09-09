'use strict';
const { SITE } = require('../config');
const { icons } = require('./icons');

function renderStickyCta() {
  return `<div class="sticky-cta" role="region" aria-label="Gyors kapcsolatfelvétel">
    <a class="sticky-cta__call" href="${SITE.phoneHref}" data-track="call" data-location="sticky-bar">
      ${icons.phone} Hívás
    </a>
    <a class="sticky-cta__quote" href="/kapcsolat/" data-track="quote-cta" data-location="sticky-bar">Ajánlatkérés</a>
  </div>`;
}

module.exports = { renderStickyCta };
