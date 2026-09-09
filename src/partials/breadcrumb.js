'use strict';

/**
 * @param {{label:string, path?:string}[]} items - utolsó elem az aktuális oldal (path nélkül)
 */
function renderBreadcrumb(items) {
  const parts = items.map((item, i) => {
    const isLast = i === items.length - 1;
    const inner = isLast || !item.path
      ? `<span aria-current="page">${item.label}</span>`
      : `<a href="${item.path}">${item.label}</a>`;
    const sep = i > 0 ? '<span aria-hidden="true">/</span>' : '';
    return `${sep}${inner}`;
  });
  return `<nav class="breadcrumb" aria-label="Morzsamenü">${parts.join('')}</nav>`;
}

module.exports = { renderBreadcrumb };
