'use strict';
const { SITE } = require('../config');
const { icons } = require('./icons');
const { SERVICES } = require('../data/services');
const { NAV_ITEMS } = require('./header');

function renderFooter() {
  const serviceLinks = SERVICES.map((s) => `<li><a href="${s.path}">${s.label}</a></li>`).join('\n            ');
  const navLinks = NAV_ITEMS.filter((item) => !item.dropdown)
    .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
    .join('\n            ');

  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="brand brand--light" href="/" aria-label="${SITE.companyName} – főoldal">
          <span class="brand__mark" aria-hidden="true">${icons.brandMark}</span>
          <span class="brand__text">
            <span class="brand__name">${SITE.companyName}</span>
            <span class="brand__sub">Kártevőirtás</span>
          </span>
        </a>
        <p>Kártevőirtás magánszemélyeknek, társasházaknak és cégeknek.</p>
        <a class="footer-phone" href="${SITE.phoneHref}" data-track="call" data-location="footer">${icons.phone} ${SITE.phoneDisplay}</a>
        <p class="footer-meta">${SITE.openingHours}</p>
      </div>
      <div class="footer-col">
        <h2 class="footer-col__title">Szolgáltatások</h2>
        <ul>
            ${serviceLinks}
        </ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-col__title">Információk</h2>
        <ul>
            ${navLinks}
        </ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-col__title">Elérhetőség</h2>
        <ul>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li class="footer-col__text">${SITE.serviceArea}</li>
        </ul>
        <h2 class="footer-col__title footer-col__title--spaced">Jogi információk</h2>
        <ul>
          <li><a href="/adatkezelesi-tajekoztato/">Adatkezelési tájékoztató</a></li>
          <li><a href="/cookie-tajekoztato/">Cookie tájékoztató</a></li>
          <li><a href="/jogi-informaciok/">Jogi / üzemeltetői információk</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>&copy; ${SITE.currentYear} ${SITE.companyName}</span>
      <span>${SITE.companyRegNumber} &middot; ${SITE.companyTaxNumber}</span>
      <button type="button" class="footer-bottom__btn" data-consent-open-settings>Cookie-beállítások</button>
    </div>
  </footer>`;
}

module.exports = { renderFooter };
