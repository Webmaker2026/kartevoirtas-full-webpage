'use strict';
const { SITE } = require('../config');
const { icons } = require('./icons');

function num(i) {
  return (i < 9 ? '0' : '') + (i + 1);
}

/** Szekciófej: eyebrow + H2 + opcionális bevezető. */
function renderSectionHead({ eyebrow, title, intro }) {
  return `<header class="section-head">
      ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
      <h2>${title}</h2>
      ${intro ? `<p class="section-head__intro">${intro}</p>` : ''}
    </header>`;
}

/**
 * Árlista valódi <table>-ként. Mobilon soronként blokká törik, a cellák
 * előtt a data-label mutatja az oszlop nevét (CSS).
 */
function renderPriceTable({ headers, rows, note, ctaLabel = 'Ajánlatot kérek', ctaHref = '#ajanlatkeres', ctaLocation = 'price-table' }) {
  const body = rows
    .map(
      (row) => `<tr>${row
        .map((cell, i) => {
          const cls = i === 0 ? 'price-table__name' : i === row.length - 1 ? 'price-table__price' : 'price-table__desc';
          const tag = i === 0 ? 'th scope="row"' : 'td';
          return `<${tag} class="${cls}" data-label="${headers[i]}">${cell}</${tag.split(' ')[0]}>`;
        })
        .join('')}</tr>`
    )
    .join('\n          ');
  return `<div class="price-table-wrap">
      <table class="price-table">
        <thead><tr>${headers.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
        <tbody>
          ${body}
        </tbody>
      </table>
    </div>
    ${note ? `<p class="price-note">${note}</p>` : ''}
    <div class="price-cta">
      <a class="btn btn--call" href="${SITE.phoneHref}" data-track="call" data-location="${ctaLocation}">${icons.phone} Árajánlat telefonon</a>
      <a class="btn btn--outline" href="${ctaHref}" data-track="quote-cta" data-location="${ctaLocation}">${ctaLabel}</a>
    </div>`;
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, '');
}

function renderFaq(items, idPrefix = 'faq') {
  return `<div class="faq-list">
    ${items
      .map(
        (item, i) => `<details class="faq-item" id="${idPrefix}-${i + 1}">
      <summary><span>${item.q}</span><i class="faq-item__icon" aria-hidden="true"></i></summary>
      <div class="faq-item__body"><p>${item.a}</p></div>
    </details>`
      )
      .join('\n    ')}
  </div>`;
}

function renderFaqJsonLd(items) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: stripTags(item.a) },
    })),
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function renderSteps(steps) {
  return `<ol class="steps">
    ${steps
      .map(
        (s, i) => `<li class="step">
      <span class="step__n" aria-hidden="true">${num(i)}</span>
      <h3>${s.title}</h3>
      <p>${s.body}</p>
    </li>`
      )
      .join('\n    ')}
  </ol>`;
}

/**
 * "Miért minket?" tények — kizárólag a config.js `trust` és elérhetőségi
 * adataiból. Üres config-érték esetén a sor nem jelenik meg, így nem kerül
 * ki az oldalra kitalált vagy nem vállalt ígéret.
 *
 * @param {Object} [opts]
 * @param {string} [opts.scope] - szolgáltatásspecifikus munkaterület (pl. "lakás, társasház, étterem")
 */
function renderTrustFacts(opts = {}) {
  const t = SITE.trust || {};
  const facts = [
    { label: 'Szakképesítés, engedély', value: t.qualification },
    { label: 'Tapasztalat', value: t.experience },
    { label: 'Alkalmazott módszerek', value: t.methods },
    { label: 'Munkaterület', value: opts.scope ? `${opts.scope} — ${SITE.serviceArea}` : SITE.serviceArea },
    { label: 'Elérhetőség', value: SITE.openingHours },
    { label: 'Számla', value: t.invoice },
    { label: 'Garancia', value: t.guarantee },
  ].filter((f) => f.value);

  return `<dl class="facts">
      ${facts
        .map(
          (f) => `<div class="facts__item">
        <dt>${f.label}</dt>
        <dd>${f.value}</dd>
      </div>`
        )
        .join('\n      ')}
    </dl>`;
}

function renderCtaBand({ title, body, location = 'cta-band', quoteHref = '/kapcsolat/' }) {
  return `<div class="container cta-band">
    <div class="cta-band__text">
      <h2>${title}</h2>
      ${body ? `<p>${body}</p>` : ''}
    </div>
    <div class="cta-band__actions">
      <a class="btn btn--call btn--lg" href="${SITE.phoneHref}" data-track="call" data-location="${location}">${icons.phone} ${SITE.phoneDisplay}</a>
      <a class="btn btn--outline-light" href="${quoteHref}" data-track="quote-cta" data-location="${location}">Ajánlatkérés űrlapon</a>
    </div>
  </div>`;
}

/**
 * Egyszerű (kép nélküli) oldalfejléc az al-oldalakhoz (árak, GYIK, kapcsolat, jogi oldalak).
 * @param {Object} o
 * @param {string} o.label - morzsamenü címke
 * @param {string} o.path - az oldal útvonala
 * @param {string} o.h1
 * @param {string} [o.lead]
 * @param {boolean} [o.callCta] - telefonos CTA megjelenítése
 */
function renderPageHero({ label, path, h1, lead, callCta }) {
  const { renderBreadcrumb } = require('./breadcrumb');
  return `<section class="hero hero--page">
    <div class="container">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label }], path)}
      <h1>${h1}</h1>
      ${lead ? `<p class="hero__lead">${lead}</p>` : ''}
      ${callCta ? `<div class="hero__actions">
        <a class="btn btn--call btn--lg" href="${SITE.phoneHref}" data-track="call" data-location="page-hero">${icons.phone} Hívás: ${SITE.phoneDisplay}</a>
      </div>` : ''}
    </div>
  </section>`;
}

module.exports = {
  num,
  renderPageHero,
  renderSectionHead,
  renderPriceTable,
  renderFaq,
  renderFaqJsonLd,
  renderSteps,
  renderTrustFacts,
  renderCtaBand,
};
