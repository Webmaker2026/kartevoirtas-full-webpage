'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { renderBreadcrumb } = require('../partials/breadcrumb');
const { renderQuoteForm } = require('../partials/quoteForm');

function render() {
  return `
  <section class="hero hero--page" style="background:var(--color-text)">
    <div class="container hero__inner">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: 'Kapcsolat' }])}
      <span class="eyebrow">Kapcsolat</span>
      <h1 style="margin-top:16px;max-width:880px">Kérjen ajánlatot, vagy hívjon minket közvetlenül</h1>
      <p class="lead hero__lead">Írja le, milyen kártevővel áll szemben, és rövid időn belül visszajelzünk. Sürgős esetben a leggyorsabb, ha telefonon keres minket.</p>
    </div>
  </section>

  <section class="section--light">
    <div class="container grid grid--2" style="gap:clamp(32px,4vw,64px);align-items:start">
      <div>
        <div class="info-card">
          <span class="info-card__label">Telefon — leggyorsabb út</span>
          <div class="info-card__value">${SITE.phoneDisplay}</div>
          <p class="info-card__note">${SITE.openingHours}</p>
          <a class="btn btn--primary" style="margin-top:18px" href="${SITE.phoneHref}" data-track="call" data-location="kapcsolat-oldal">${icons.phone} Hívás indítása</a>
        </div>
        <div class="info-card">
          <span class="info-card__label">E-mail</span>
          <div class="info-card__value--sm"><a href="mailto:${SITE.email}">${SITE.email}</a></div>
          <p class="info-card__note">Írjon nekünk, ha nem sürgős vagy részletesebben szeretné leírni a problémát.</p>
        </div>
        <div class="info-card">
          <span class="info-card__label">Szolgáltatási terület</span>
          <p class="info-card__value--body">${SITE.serviceArea}</p>
        </div>
        <div class="info-card">
          <span class="info-card__label">Székhely</span>
          <p class="info-card__value--body">${SITE.companyAddress}</p>
        </div>
      </div>

      <div class="form-panel form-panel--onlight" id="ajanlatkeres">
        <h2>Ajánlatkérő űrlap</h2>
        <p class="form-panel__hint">Négy mező kötelező — a többi segít pontosabb árat adnunk.</p>
        ${renderQuoteForm({ formId: 'kapcsolat' })}
      </div>
    </div>
  </section>
  `;
}

module.exports = { render };
