'use strict';
const { SITE } = require('../config');
const { icons } = require('./icons');
const { SERVICES } = require('../data/services');

function renderFooter() {
  const serviceLinks = SERVICES.map((s) => `<li><a href="${s.path}">${s.label}</a></li>`).join('\n            ');

  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-col footer-brand">
        <a class="brand" href="/">
          <span class="brand__mark">${icons.logoMark}</span>
          <span class="brand__name">${SITE.companyName}</span>
        </a>
        <p>Szakszerű kártevőirtás magánszemélyeknek és cégeknek. Felmérés, célzott kezelés, érthető visszajelzés — a probléma tényleges megoldásáig.</p>
        <ul style="margin-top:1.1rem;gap:.5rem">
          <li class="cluster"><span style="color:var(--c-accent)">${icons.pin}</span> ${SITE.serviceArea}</li>
          <li class="cluster"><span style="color:var(--c-accent)">${icons.clock}</span> ${SITE.openingHours}</li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Szolgáltatások</h4>
        <ul>
          ${serviceLinks}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Vállalkozás</h4>
        <ul>
          <li><a href="/arak/">Árak</a></li>
          <li><a href="/rolunk/">Rólunk</a></li>
          <li><a href="/gyik/">GYIK</a></li>
          <li><a href="/kapcsolat/">Kapcsolat</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Elérhetőség</h4>
        <ul>
          <li><a href="${SITE.phoneHref}" data-track="call" data-location="footer">${icons.phone} ${SITE.phoneDisplay}</a></li>
          <li><a href="mailto:${SITE.email}">${icons.mail} ${SITE.email}</a></li>
        </ul>
        <h4 style="margin-top:1.5rem">Jogi</h4>
        <ul>
          <li><a href="/adatkezelesi-tajekoztato/">Adatkezelési tájékoztató</a></li>
          <li><a href="/cookie-tajekoztato/">Cookie tájékoztató</a></li>
          <li><a href="/jogi-informaciok/">Jogi / üzemeltetői információk</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>&copy; ${SITE.currentYear} ${SITE.companyName}. Minden jog fenntartva.</span>
      <button class="cookie-settings-link" type="button" data-consent-open-settings>Cookie-beállítások</button>
    </div>
  </footer>`;
}

module.exports = { renderFooter };
