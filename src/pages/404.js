'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { SERVICES } = require('../data/services');

function render() {
  const links = SERVICES.map((s) => `<a class="btn btn--outline btn--sm" href="${s.path}">${s.label}</a>`).join('\n        ');
  return `
  <section class="section--dark not-found">
    <div class="container" style="max-width:40rem;text-align:center;margin-inline:auto">
      <span class="eyebrow" style="justify-content:center">404 — Az oldal nem található</span>
      <h1 style="margin-top:.8rem">Ez az oldal nem létezik, vagy elköltözött</h1>
      <p class="lead" style="margin-top:1rem">
        Előfordulhat, hogy elgépelt egy címet, vagy egy régebbi link már nem érvényes. Válasszon az alábbi
        szolgáltatások közül, vagy térjen vissza a főoldalra.
      </p>
      <div class="hero__actions" style="justify-content:center;margin-top:1.6rem">
        <a class="btn btn--primary" href="/">Vissza a főoldalra</a>
        <a class="btn btn--outline" href="${SITE.phoneHref}" data-track="call" data-location="404">${icons.phone} ${SITE.phoneDisplay}</a>
      </div>
      <div class="cluster" style="justify-content:center;margin-top:2rem">
        ${links}
      </div>
    </div>
  </section>
  `;
}

module.exports = { render };
