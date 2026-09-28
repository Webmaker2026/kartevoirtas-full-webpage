'use strict';
const { SITE } = require('../config');
const { icons } = require('./icons');
const { SERVICES } = require('../data/services');

const NAV_ITEMS = [
  { label: 'Főoldal', href: '/' },
  { label: 'Szolgáltatások', href: '/#szolgaltatasok', dropdown: true },
  { label: 'Árak', href: '/arak/' },
  { label: 'Rólunk', href: '/rolunk/' },
  { label: 'GYIK', href: '/gyik/' },
  { label: 'Kapcsolat', href: '/kapcsolat/' },
];

function current(href, activePath) {
  return href === activePath ? ' aria-current="page"' : '';
}

function renderDesktopNav(activePath) {
  const isServicePage = SERVICES.some((s) => s.path === activePath);
  return NAV_ITEMS.map((item) => {
    if (!item.dropdown) {
      return `<a class="navlink" href="${item.href}"${current(item.href, activePath)}>${item.label}</a>`;
    }
    const links = SERVICES.map(
      (s) => `<a href="${s.path}"${current(s.path, activePath)}>${s.label}</a>`
    ).join('\n            ');
    return `<div class="has-dropdown">
          <a class="navlink${isServicePage ? ' is-active' : ''}" href="${item.href}" data-dropdown-trigger aria-haspopup="true" aria-expanded="false">${item.label} ${icons.chevronDown}</a>
          <div class="dropdown">
            ${links}
          </div>
        </div>`;
  }).join('\n        ');
}

function renderHeader(activePath) {
  const mobileNavLinks = NAV_ITEMS.filter((item) => !item.dropdown)
    .map((item) => `<a class="mobile-nav__link" href="${item.href}"${current(item.href, activePath)}>${item.label}</a>`)
    .join('\n      ');
  const mobileServiceLinks = SERVICES.map(
    (s) => `<a href="${s.path}"${current(s.path, activePath)}>${s.label}</a>`
  ).join('\n        ');

  return `<a class="skip-link" href="#main">Ugrás a tartalomhoz</a>

  <div class="topbar">
    <div class="container topbar__inner">
      <span class="topbar__item">${icons.pin} ${SITE.serviceArea}</span>
      <span class="topbar__item">${icons.clock} ${SITE.openingHours}</span>
      <a class="topbar__item topbar__mail" href="mailto:${SITE.email}">${icons.mail} ${SITE.email}</a>
    </div>
  </div>

  <header class="site-header">
    <div class="container site-header__bar">
      <a class="brand" href="/" aria-label="${SITE.companyName} – főoldal">
        <span class="brand__mark" aria-hidden="true">${icons.brandMark}</span>
        <span class="brand__text">
          <span class="brand__name">${SITE.companyName}</span>
          <span class="brand__sub">Kártevőirtás</span>
        </span>
      </a>

      <nav class="nav-desktop" aria-label="Fő navigáció">
        ${renderDesktopNav(activePath)}
      </nav>

      <div class="header-cta">
        <a class="btn btn--call btn--sm" href="${SITE.phoneHref}" data-track="call" data-location="header">${icons.phone} ${SITE.phoneDisplay}</a>
        <a class="header-quote" href="/kapcsolat/" data-track="quote-cta" data-location="header">Ajánlatkérés</a>
      </div>

      <div class="header-mobile-actions">
        <a class="icon-btn icon-btn--call" href="${SITE.phoneHref}" data-track="call" data-location="header-mobile" aria-label="Hívás: ${SITE.phoneDisplay}">${icons.phone}</a>
        <button class="icon-btn icon-btn--menu" type="button" data-nav-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Menü">
          <span class="icon-btn__open">${icons.menu}</span>
          <span class="icon-btn__close">${icons.close}</span>
        </button>
      </div>
    </div>
  </header>

  <div class="mobile-nav" id="mobile-nav" data-mobile-nav data-open="false">
    <nav class="mobile-nav__panel" aria-label="Mobil navigáció">
      ${mobileNavLinks}
      <div class="mobile-nav__services">
        <span class="mobile-nav__heading">Szolgáltatások</span>
        ${mobileServiceLinks}
      </div>
      <div class="mobile-nav__actions">
        <a class="btn btn--call btn--block" href="${SITE.phoneHref}" data-track="call" data-location="mobile-menu">${icons.phone} Hívás: ${SITE.phoneDisplay}</a>
        <a class="btn btn--ghost-light btn--block" href="/kapcsolat/" data-track="quote-cta" data-location="mobile-menu">Ajánlatkérés</a>
      </div>
    </nav>
  </div>`;
}

module.exports = { renderHeader, NAV_ITEMS };
