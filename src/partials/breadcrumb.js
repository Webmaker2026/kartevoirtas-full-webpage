'use strict';
const { absoluteUrl } = require('./head');

/**
 * Látható morzsamenü + BreadcrumbList strukturált adat.
 * @param {{label:string, path?:string}[]} items - utolsó elem az aktuális oldal
 * @param {string} [currentPath] - az aktuális oldal útvonala (JSON-LD-hez)
 */
function renderBreadcrumb(items, currentPath) {
  const parts = items.map((item, i) => {
    const isLast = i === items.length - 1;
    const inner = isLast || !item.path
      ? `<span aria-current="page">${item.label}</span>`
      : `<a href="${item.path}">${item.label}</a>`;
    const sep = i > 0 ? '<span class="breadcrumb__sep" aria-hidden="true">/</span>' : '';
    return `${sep}${inner}`;
  });

  const jsonLd = currentPath
    ? `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.label,
          item: absoluteUrl(item.path || currentPath),
        })),
      })}</script>`
    : '';

  return `<nav class="breadcrumb" aria-label="Morzsamenü">${parts.join('')}</nav>${jsonLd}`;
}

module.exports = { renderBreadcrumb };
