'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { SERVICES } = require('../data/services');

function render() {
  const links = SERVICES.map((s) => `<li><a href="${s.path}">${s.label}</a></li>`).join('\n        ');
  return `
  <section class="section section--tint status-page">
    <div class="container container--narrow status-page__inner">
      <span class="eyebrow">404-es hiba</span>
      <h1>Ez az oldal nem található</h1>
      <p class="status-page__lead">Lehet, hogy elgépelte a címet, vagy a link már nem érvényes. Válasszon az alábbi szolgáltatások közül, vagy térjen vissza a főoldalra.</p>
      <div class="status-page__actions">
        <a class="btn btn--primary" href="/">Vissza a főoldalra</a>
        <a class="btn btn--call" href="${SITE.phoneHref}" data-track="call" data-location="404">${icons.phone} ${SITE.phoneDisplay}</a>
      </div>
      <ul class="link-list">
        ${links}
      </ul>
    </div>
  </section>
  `;
}

module.exports = { render };
