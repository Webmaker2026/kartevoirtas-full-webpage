'use strict';
const { SITE } = require('../config');
const { icons } = require('./icons');
const { SERVICES } = require('../data/services');

function isActive(path, current) {
  return path === current ? ' aria-current="page"' : '';
}

function renderHeader(activePath) {
  const serviceLinks = SERVICES.map(
    (s) => `<a href="${s.path}">${s.label}</a>`
  ).join('\n              ');

  const mobileServiceLinks = SERVICES.map(
    (s) => `<a class="navlink" style="font-weight:600;font-size:.95rem;border-bottom:none;padding:.5rem .25rem" href="${s.path}">${s.label}</a>`
  ).join('\n            ');

  return `<a class="skip-link" href="#main">Ugrás a tartalomhoz</a>
  <header class="site-header">
    <div class="container site-header__bar">
      <a class="brand" href="/">
        <span class="brand__mark">${icons.logoMark}</span>
        <span class="brand__name">${SITE.companyName}</span>
      </a>

      <nav class="nav-desktop" aria-label="Fő navigáció">
        <ul>
          <li><a class="navlink" href="/"${isActive('/', activePath)}>Főoldal</a></li>
          <li class="has-dropdown">
            <a class="navlink" href="/#szolgaltatasok" aria-haspopup="true" aria-expanded="false" data-dropdown-trigger>Szolgáltatások ${icons.chevronDown}</a>
            <div class="dropdown">
              <div class="dropdown__panel">
                ${serviceLinks}
              </div>
            </div>
          </li>
          <li><a class="navlink" href="/arak/"${isActive('/arak/', activePath)}>Árak</a></li>
          <li><a class="navlink" href="/rolunk/"${isActive('/rolunk/', activePath)}>Rólunk</a></li>
          <li><a class="navlink" href="/gyik/"${isActive('/gyik/', activePath)}>GYIK</a></li>
          <li><a class="navlink" href="/kapcsolat/"${isActive('/kapcsolat/', activePath)}>Kapcsolat</a></li>
        </ul>
      </nav>

      <div class="header-cta">
        <a class="header-phone" href="${SITE.phoneHref}" data-track="call" data-location="header">
          ${icons.phone} ${SITE.phoneDisplay}
        </a>
        <a class="btn btn--primary btn--sm" href="/kapcsolat/" data-track="quote-cta" data-location="header">Ajánlatkérés</a>
      </div>

      <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Menü megnyitása">
        ${icons.menu}
      </button>
    </div>
  </header>

  <div class="mobile-nav" id="mobile-nav" data-mobile-nav data-open="false">
    <div class="mobile-nav__scrim" data-nav-scrim></div>
    <nav class="mobile-nav__panel" aria-label="Mobil navigáció">
      <div class="mobile-nav__top">
        <a class="brand" href="/">
          <span class="brand__mark">${icons.logoMark}</span>
          <span class="brand__name">${SITE.companyName}</span>
        </a>
        <button class="mobile-nav__close" type="button" data-nav-close aria-label="Menü bezárása">${icons.close}</button>
      </div>
      <div>
        <a class="navlink" href="/"${isActive('/', activePath)}>Főoldal</a>
        <div class="mobile-nav__sub">
          <div class="eyebrow" style="margin:.6rem 0">Szolgáltatások</div>
          ${mobileServiceLinks}
        </div>
        <a class="navlink" href="/arak/"${isActive('/arak/', activePath)}>Árak</a>
        <a class="navlink" href="/rolunk/"${isActive('/rolunk/', activePath)}>Rólunk</a>
        <a class="navlink" href="/gyik/"${isActive('/gyik/', activePath)}>GYIK</a>
        <a class="navlink" href="/kapcsolat/"${isActive('/kapcsolat/', activePath)}>Kapcsolat</a>
      </div>
      <a class="btn btn--primary btn--block" href="${SITE.phoneHref}" data-track="call" data-location="mobile-menu">${icons.phone} Hívás: ${SITE.phoneDisplay}</a>
      <a class="btn btn--outline btn--block" href="/kapcsolat/" data-track="quote-cta" data-location="mobile-menu">Ajánlatkérés</a>
    </nav>
  </div>`;
}

module.exports = { renderHeader };
