'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');

function render() {
  return `
  <section class="section--dark" style="min-height:60vh;display:flex;align-items:center">
    <div class="container" style="max-width:38rem;text-align:center;margin-inline:auto">
      <span class="trust-card__icon" style="width:64px;height:64px;margin-inline:auto;background:rgba(242,140,40,.16)">
        <span style="width:1.8rem;height:1.8rem;display:block">${icons.check}</span>
      </span>
      <h1 style="margin-top:1.3rem">Köszönjük, megkaptuk az ajánlatkérését!</h1>
      <p class="lead" style="margin-top:1rem">
        Munkatársaink hamarosan felveszik Önnel a kapcsolatot a megadott elérhetőségen. Ha sürgős a probléma,
        hívjon minket közvetlenül telefonon.
      </p>
      <div class="hero__actions" style="justify-content:center;margin-top:1.8rem">
        <a class="btn btn--primary" href="${SITE.phoneHref}" data-track="call" data-location="koszonjuk">${icons.phone} ${SITE.phoneDisplay}</a>
        <a class="btn btn--outline" href="/">Vissza a főoldalra</a>
      </div>
    </div>
  </section>
  `;
}

module.exports = { render };
