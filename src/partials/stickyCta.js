'use strict';
const { SITE } = require('../config');
const { icons } = require('./icons');

/**
 * Mobil alsó sáv: Hívás (elsődleges) + Ajánlatkérés.
 * @param {string} [quoteHref] - ha az oldalon van űrlap, oda ugrik (#ajanlatkeres),
 *   különben a /kapcsolat/ oldalra visz
 */
function renderStickyCta(quoteHref = '/kapcsolat/') {
  return `<div class="sticky-cta" role="region" aria-label="Gyors kapcsolatfelvétel">
    <a class="sticky-cta__call" href="${SITE.phoneHref}" data-track="call" data-location="sticky-bar">${icons.phone} Hívás</a>
    <a class="sticky-cta__quote" href="${quoteHref}" data-track="quote-cta" data-location="sticky-bar">Ajánlatkérés</a>
  </div>`;
}

module.exports = { renderStickyCta };
