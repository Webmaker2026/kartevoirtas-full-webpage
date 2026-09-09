'use strict';
const { MEDIA } = require('../data/media');

/**
 * Fotó-arányú (4:5) képkeret renderelése a src/data/media.js leltárból.
 * Ha egy kulcshoz nincs bejegyzés, a hívó oldal simán kép nélkül marad
 * (nem dob hibát build közben).
 *
 * @param {string} key - src/data/media.js kulcsa
 * @param {Object} [opts]
 * @param {string} [opts.alt] - felülírja a leltárban szereplő alt szöveget
 * @param {boolean} [opts.eager] - true esetén nincs loading="lazy" (pl. LCP hero kép)
 * @param {string} [opts.className] - felülírja az alapértelmezett 'media-photo__img' osztályt
 */
function renderMedia(key, opts = {}) {
  const entry = MEDIA[key];
  if (!entry) return '';
  const alt = opts.alt || entry.alt || '';
  const loading = opts.eager ? '' : ' loading="lazy"';
  const className = opts.className || 'media-photo__img';
  return `<img class="${className}" src="${entry.src}" alt="${alt}" width="480" height="600"${loading} decoding="async">`;
}

module.exports = { renderMedia };
