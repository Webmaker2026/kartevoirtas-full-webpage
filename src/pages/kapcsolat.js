'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { renderBreadcrumb } = require('../partials/breadcrumb');
const { renderQuoteForm } = require('../partials/quoteForm');

function render() {
  return `
  <section class="section--dark">
    <div class="container">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: 'Kapcsolat' }])}
      <span class="eyebrow">Kapcsolat</span>
      <h1 style="margin-top:.6rem">Kérjen ajánlatot, vagy hívjon minket közvetlenül</h1>
      <p class="lead" style="margin-top:1rem;max-width:44rem">
        Írja le, milyen kártevővel áll szemben, és rövid időn belül visszajelzünk. Sürgős esetben a leggyorsabb, ha
        telefonon keres minket.
      </p>
    </div>
  </section>

  <section class="section--light">
    <div class="container grid grid--2" style="align-items:flex-start">
      <div class="stack">
        <div class="card">
          <h3>${icons.phone} Telefon</h3>
          <p class="muted" style="margin-top:.6rem">${SITE.openingHours}</p>
          <a class="btn btn--primary btn--block" style="margin-top:1rem" href="${SITE.phoneHref}" data-track="call" data-location="kapcsolat-oldal">${SITE.phoneDisplay}</a>
        </div>
        <div class="card">
          <h3>${icons.mail} E-mail</h3>
          <p class="muted" style="margin-top:.6rem">Írjon nekünk, ha nem sürgős vagy részletesebben szeretné leírni a problémát.</p>
          <a class="btn btn--outline btn--block" style="margin-top:1rem" href="mailto:${SITE.email}">${SITE.email}</a>
        </div>
        <div class="card">
          <h3>${icons.pin} Szolgáltatási terület</h3>
          <p class="muted" style="margin-top:.6rem">${SITE.serviceArea}</p>
        </div>
      </div>

      <div class="card" id="ajanlatkeres">
        <h2 style="font-size:1.3rem">Ajánlatkérő űrlap</h2>
        <p class="muted" style="margin-top:.5rem">A csillaggal jelölt mezők kitöltése kötelező.</p>
        <div style="margin-top:1.3rem">
          ${renderQuoteForm({ formId: 'kapcsolat' })}
        </div>
      </div>
    </div>
  </section>
  `;
}

module.exports = { render };
