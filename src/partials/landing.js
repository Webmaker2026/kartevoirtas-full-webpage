'use strict';
const { SITE } = require('../config');
const { icons } = require('./icons');
const { renderBreadcrumb } = require('./breadcrumb');
const { renderMedia } = require('./media');
const { renderQuoteForm } = require('./quoteForm');
const { renderSectionHead, renderPriceTable, renderFaq, renderFaqJsonLd, renderSteps, renderTrustFacts } = require('./components');

/*
 * Szolgáltatásoldal-sablon — mind a 8 kártevő-oldal ugyanezt használja.
 * A szekciók háttere szekciótípusonként fix, hogy a világos és sötét
 * blokkok ritmusa minden oldalon azonos legyen.
 *
 * Az Ads sitelinkek által használt szekció-azonosítók (#jelek, #kezeles,
 * #arak, #tudnivalok, #gyik, #ajanlatkeres) az oldal-fájlokban vannak
 * megadva — ezeket ne nevezd át.
 */
const SECTION_BG = {
  signs: 'section section--white',
  about: 'section section--tint',
  method: 'section section--white',
  pricing: 'section section--tint',
  twoList: 'section section--white',
  trust: 'section section--navy',
  faq: 'section section--white',
  contact: 'section section--tint',
};

function renderHero(h, path) {
  return `<section class="hero hero--service">
    <div class="container hero__grid">
      <div class="hero__content">
        ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: h.breadcrumbLabel }], path)}
        <h1>${h.h1}</h1>
        <p class="hero__lead">${h.intro}</p>
        <div class="hero__actions">
          <a class="btn btn--call btn--lg" href="${SITE.phoneHref}" data-track="call" data-location="service-hero">${icons.phone} Hívás: ${SITE.phoneDisplay}</a>
          <a class="btn btn--outline-light" href="#ajanlatkeres" data-track="quote-cta" data-location="service-hero">Ajánlatkérés</a>
        </div>
        <p class="hero__meta">${icons.pin} ${SITE.serviceArea}</p>
      </div>
      <div class="hero__media">
        ${renderMedia(h.mediaKey, { eager: true, desktopOnly: true, className: 'hero__img' })}
      </div>
    </div>
  </section>`;
}

function renderSigns(s) {
  return `<div class="container">
    ${renderSectionHead(s)}
    <div class="info-grid">
      ${s.items.map((i) => `<div class="info-grid__item">
        <h3>${i.title}</h3>
        <p>${i.body}</p>
      </div>`).join('\n      ')}
    </div>
  </div>`;
}

function renderAbout(s) {
  return `<div class="container split">
    <div class="split__main">
      ${renderSectionHead({ eyebrow: s.eyebrow, title: s.title })}
      <div class="prose">
        ${s.paragraphs.map((p) => `<p>${p}</p>`).join('\n        ')}
      </div>
    </div>
    <aside class="split__side">
      <h3 class="side-list__title">${s.sideTitle}</h3>
      <ul class="checklist">
        ${s.sideItems.map((i) => `<li>${icons.check}<span>${i}</span></li>`).join('\n        ')}
      </ul>
    </aside>
  </div>`;
}

function renderMethod(s) {
  return `<div class="container">
    ${renderSectionHead(s)}
    ${renderSteps(s.items)}
  </div>`;
}

function renderPricing(s) {
  return `<div class="container">
    ${renderSectionHead(s)}
    ${renderPriceTable({ headers: s.headers, rows: s.rows, note: s.note, ctaLocation: 'service-pricing' })}
  </div>`;
}

function renderTwoList(s) {
  const col = (title, items) => `<div>
        <h3 class="side-list__title">${title}</h3>
        <ul class="checklist">
          ${items.map((i) => `<li>${icons.check}<span>${i}</span></li>`).join('\n          ')}
        </ul>
      </div>`;
  return `<div class="container">
    ${renderSectionHead(s)}
    <div class="two-col">
      ${col(s.leftTitle, s.leftItems)}
      ${col(s.rightTitle, s.rightItems)}
    </div>
  </div>`;
}

function renderTrust(s) {
  return `<div class="container split split--top split--facts">
    <div class="split__main">
      ${renderSectionHead({ eyebrow: 'Kivel dolgozik?', title: s.title || 'Miért minket?', intro: s.intro })}
      <a class="btn btn--call" href="${SITE.phoneHref}" data-track="call" data-location="service-trust">${icons.phone} ${SITE.phoneDisplay}</a>
    </div>
    <div class="split__side">
      ${renderTrustFacts({ scope: s.scope })}
    </div>
  </div>`;
}

function renderFaqSection(s) {
  return `<div class="container container--narrow">
    ${renderSectionHead(s)}
    ${renderFaq(s.items, s.idPrefix)}
  </div>${renderFaqJsonLd(s.items)}`;
}

function renderContact(s, ctx) {
  return `<div class="container contact">
    <div class="contact__intro">
      ${renderSectionHead({ eyebrow: 'Ajánlatkérés', title: s.title })}
      <p class="contact__text">A leggyorsabb, ha felhív minket: telefonon rögtön meg tudjuk beszélni, mire van szükség. Ha most nem alkalmas, hagyja meg az adatait, és visszahívjuk.</p>
      <a class="btn btn--call btn--lg" href="${SITE.phoneHref}" data-track="call" data-location="service-contact">${icons.phone} ${SITE.phoneDisplay}</a>
      <dl class="contact__meta">
        <div><dt>Elérhetőség</dt><dd>${SITE.openingHours}</dd></div>
        <div><dt>Szolgáltatási terület</dt><dd>${SITE.serviceArea}</dd></div>
      </dl>
    </div>
    <div class="form-panel">
      <h3 class="form-panel__title">Ajánlatkérés — ${ctx.serviceLabel}</h3>
      ${renderQuoteForm({ formId: 'ajanlat-' + s.presetService, presetService: s.presetService, sourcePath: ctx.path })}
    </div>
  </div>`;
}

const RENDERERS = {
  signs: renderSigns,
  about: renderAbout,
  method: renderMethod,
  pricing: renderPricing,
  twoList: renderTwoList,
  trust: renderTrust,
  faq: renderFaqSection,
  contact: renderContact,
};

/**
 * @param {Object} data
 * @param {string} data.path - az oldal útvonala, pl. '/csotanyirtas/'
 * @param {Object} data.hero
 * @param {Array}  data.sections - [{ type, id?, ...opts }]
 */
function renderServiceLanding(data) {
  const ctx = { path: data.path, serviceLabel: data.hero.breadcrumbLabel };
  const body = data.sections
    .map((s) => {
      const renderer = RENDERERS[s.type];
      if (!renderer) throw new Error(`Ismeretlen szekciótípus: ${s.type}`);
      return `<section class="${SECTION_BG[s.type]}"${s.id ? ` id="${s.id}"` : ''}>
    ${renderer(s, ctx)}
  </section>`;
    })
    .join('\n\n  ');

  return `${renderHero(data.hero, data.path)}

  ${body}`;
}

module.exports = { renderServiceLanding };
