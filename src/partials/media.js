'use strict';
const { MEDIA } = require('../data/media');

// 1x1 átlátszó GIF — a `desktopOnly` képeknél mobilon ezt tölti be a böngésző
// a valódi kép helyett, így a mobilon (CSS-sel) elrejtett hero kép nem
// fogyaszt sávszélességet.
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/**
 * Kép renderelése a src/data/media.js leltárból. Ha egy kulcshoz nincs
 * bejegyzés, üres stringet ad vissza (nem dob hibát build közben).
 *
 * @param {string} key - src/data/media.js kulcsa
 * @param {Object} [opts]
 * @param {string} [opts.alt] - felülírja a leltárban szereplő alt szöveget
 * @param {boolean} [opts.eager] - true esetén nincs loading="lazy" (pl. LCP hero kép)
 * @param {boolean} [opts.desktopOnly] - csak 900px felett tölti be a képet
 * @param {string} [opts.className]
 */
function renderMedia(key, opts = {}) {
  const entry = MEDIA[key];
  if (!entry) return '';
  const alt = opts.alt || entry.alt || '';
  const loading = opts.eager ? ' fetchpriority="high"' : ' loading="lazy"';
  const className = opts.className || 'media__img';
  const img = `<img class="${className}" src="${entry.src}" alt="${alt}" width="${entry.width}" height="${entry.height}"${loading} decoding="async">`;
  if (!opts.desktopOnly) return img;
  return `<picture>
        <source media="(max-width: 899px)" srcset="${BLANK}">
        ${img}
      </picture>`;
}

module.exports = { renderMedia };
