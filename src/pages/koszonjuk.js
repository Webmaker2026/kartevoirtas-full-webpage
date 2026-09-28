'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');

/*
 * Köszönőoldal — csak sikeres szerveroldali feldolgozás (validáció, spamszűrés,
 * e-mail továbbítás) után navigál ide a main.js, ezért Google Ads
 * ajánlatkérési konverzió mérésére is használható. A konverziós címkét
 * (GTM-ből vagy gtag-gel) a mérési azonosítók megérkezésekor kell beállítani;
 * a projektben szándékosan nincs kitalált conversion ID.
 */
function render() {
  return `
  <section class="section section--tint status-page">
    <div class="container container--narrow status-page__inner">
      <span class="status-page__icon" aria-hidden="true">${icons.check}</span>
      <h1>Köszönjük, megkaptuk az ajánlatkérését!</h1>
      <p class="status-page__lead">Hamarosan felvesszük Önnel a kapcsolatot a megadott telefonszámon. Ha sürgős a probléma, hívjon minket közvetlenül.</p>
      <div class="status-page__actions">
        <a class="btn btn--call btn--lg" href="${SITE.phoneHref}" data-track="call" data-location="koszonjuk">${icons.phone} ${SITE.phoneDisplay}</a>
        <a class="btn btn--outline" href="/">Vissza a főoldalra</a>
      </div>
    </div>
  </section>
  `;
}

module.exports = { render };
