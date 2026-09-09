'use strict';
const { SITE } = require('../config');
const { icons } = require('./icons');
const { SERVICES } = require('../data/services');
const { NAV_ITEMS } = require('./header');

function renderFooter() {
  const serviceLinks = SERVICES.map((s) => `<a href="${s.path}">${s.label}</a>`).join('\n            ');
  const navLinks = NAV_ITEMS.map((item) => `<a href="${item.href}">${item.label}</a>`).join('\n            ');

  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-col footer-brand">
        <a class="brand" href="/">
          <span class="brand__mark">K</span>
          <span class="brand__name">${SITE.companyName}</span>
        </a>
        <p>Szakszerű kártevőirtás magánszemélyeknek és cégeknek. Felmérés, célzott kezelés, érthető visszajelzés — a probléma tényleges megoldásáig.</p>
        <p class="footer-brand__meta">${SITE.serviceArea}<br>${SITE.openingHours}</p>
      </div>
      <div class="footer-col">
        <h4>Szolgáltatások</h4>
        <div>
          ${serviceLinks}
        </div>
      </div>
      <div class="footer-col">
        <h4>Vállalkozás</h4>
        <div>
          ${navLinks}
        </div>
      </div>
      <div class="footer-col">
        <h4>Elérhetőség</h4>
        <a class="footer-col__phone" href="${SITE.phoneHref}" data-track="call" data-location="footer">${SITE.phoneDisplay}</a>
        <a href="mailto:${SITE.email}" style="padding-top:8px">${SITE.email}</a>
        <h4 class="footer-col__legal-head">Jogi</h4>
        <div class="footer-col__legal">
          <a href="/adatkezelesi-tajekoztato/">Adatkezelési tájékoztató</a>
          <a href="/cookie-tajekoztato/">Cookie tájékoztató</a>
          <a href="/jogi-informaciok/">Jogi / üzemeltetői információk</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${SITE.currentYear} ${SITE.companyName}. Minden jog fenntartva.</span>
      <span class="cluster">
        <span>${SITE.companyRegNumber} &middot; ${SITE.companyTaxNumber}</span>
        <button type="button" data-consent-open-settings>Cookie-beállítások</button>
      </span>
    </div>
  </footer>`;
}

module.exports = { renderFooter };
