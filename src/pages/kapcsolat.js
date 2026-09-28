'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { renderPageHero } = require('../partials/components');
const { renderQuoteForm } = require('../partials/quoteForm');

function render({ path }) {
  return `
  ${renderPageHero({
    label: 'Kapcsolat',
    path,
    h1: 'Kapcsolat és ajánlatkérés',
    lead: 'A leggyorsabb, ha felhív minket. Ha most nem alkalmas, töltse ki az űrlapot, és visszahívjuk.',
  })}

  <section class="section section--tint">
    <div class="container contact">
      <div class="contact__intro">
        <dl class="contact-list">
          <div>
            <dt>Telefon</dt>
            <dd><a class="contact-list__phone" href="${SITE.phoneHref}" data-track="call" data-location="kapcsolat-oldal">${SITE.phoneDisplay}</a></dd>
          </div>
          <div>
            <dt>Elérhetőség</dt>
            <dd>${SITE.openingHours}</dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd>
          </div>
          <div>
            <dt>Szolgáltatási terület</dt>
            <dd>${SITE.serviceArea}</dd>
          </div>
          <div>
            <dt>Székhely</dt>
            <dd>${SITE.companyAddress}</dd>
          </div>
        </dl>
        <a class="btn btn--call btn--lg" href="${SITE.phoneHref}" data-track="call" data-location="kapcsolat-cta">${icons.phone} Hívás: ${SITE.phoneDisplay}</a>
      </div>

      <div class="form-panel" id="ajanlatkeres">
        <h2 class="form-panel__title">Ajánlatkérő űrlap</h2>
        ${renderQuoteForm({ formId: 'ajanlat-kapcsolat', sourcePath: path })}
      </div>
    </div>
  </section>
  `;
}

module.exports = { render };
