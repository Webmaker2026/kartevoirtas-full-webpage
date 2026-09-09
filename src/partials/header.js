'use strict';
const { SITE } = require('../config');
const { icons } = require('./icons');
const { SERVICES } = require('../data/services');

const NAV_ITEMS = [
  { label: 'Főoldal', href: '/' },
  { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
  { label: 'Árak', href: '/arak/' },
  { label: 'Rólunk', href: '/rolunk/' },
  { label: 'GYIK', href: '/gyik/' },
  { label: 'Kapcsolat', href: '/kapcsolat/' },
];

function isActive(path, current) {
  return path === current ? ' aria-current="page"' : '';
}

function renderHeader(activePath) {
  const navLinks = NAV_ITEMS.map(
    (item) => `<a class="navlink" href="${item.href}"${isActive(item.href, activePath)}>${item.label}</a>`
  ).join('\n          ');

  const mobileNavLinks = NAV_ITEMS.map(
    (item) => `<a class="navlink" href="${item.href}"${isActive(item.href, activePath)}>${item.label}</a>`
  ).join('\n        ');

  const mobileServiceLinks = SERVICES.map((s) => `<a href="${s.path}">${s.label}</a>`).join('\n          ');

  return `<a class="skip-link" href="#main">Ugrás a tartalomhoz</a>

  <div class="topbar">
    <div class="container">
      <span class="topbar__item">${icons.pin} ${SITE.serviceArea}</span>
      <span class="topbar__item">${icons.clock} ${SITE.openingHours}</span>
      <span class="topbar__dispatch">Kiszállás: ${SITE.dispatchTime}</span>
    </div>
  </div>

  <header class="site-header">
    <div class="container site-header__bar">
      <a class="brand" href="/">
        <span class="brand__mark">K</span>
        <span class="brand__name-wrap">
          <span class="brand__name">${SITE.companyName}</span>
          <span class="brand__sub">Kártevőirtás</span>
        </span>
      </a>

      <nav class="nav-desktop" aria-label="Fő navigáció">
        ${navLinks}
      </nav>

      <div class="header-cta">
        <a class="header-phone" href="${SITE.phoneHref}" data-track="call" data-location="header">
          <span class="header-phone__label">Hívjon most</span>
          <span class="header-phone__num">${SITE.phoneDisplay}</span>
        </a>
        <a class="btn btn--primary btn--sm" href="/kapcsolat/" data-track="quote-cta" data-location="header">Ajánlatkérés</a>
      </div>

      <div class="header-mobile-actions">
        <a class="icon-btn icon-btn--call" href="${SITE.phoneHref}" data-track="call" data-location="header-mobile" aria-label="Hívás: ${SITE.phoneDisplay}">${icons.phone}</a>
        <button class="icon-btn icon-btn--menu" type="button" data-nav-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Menü megnyitása">
          ${icons.menu}
        </button>
      </div>
    </div>
  </header>

  <div class="mobile-nav" id="mobile-nav" data-mobile-nav data-open="false">
    <nav class="mobile-nav__panel" aria-label="Mobil navigáció">
      ${mobileNavLinks}
      <div class="mobile-nav__sub">
        <span class="eyebrow">Szolgáltatások</span>
        ${mobileServiceLinks}
      </div>
      <div class="mobile-nav__actions">
        <a class="btn btn--primary" href="${SITE.phoneHref}" data-track="call" data-location="mobile-menu">${icons.phone} Hívás: ${SITE.phoneDisplay}</a>
        <a class="btn btn--outline" href="/kapcsolat/" data-track="quote-cta" data-location="mobile-menu">Ajánlatkérés</a>
      </div>
    </nav>
  </div>`;
}

module.exports = { renderHeader, NAV_ITEMS };
