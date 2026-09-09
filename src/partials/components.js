'use strict';
const { icons } = require('./icons');

function num(i) {
  return (i < 9 ? '0' : '') + (i + 1);
}

function renderPriceTable({ headers, rows, note, ctaLabel = 'Ajánlatot kérek', ctaHref = '/kapcsolat/', ctaLocation = 'price-table' }) {
  const head = `<div class="price-rows__head" role="row">${headers.map((h) => `<span role="columnheader">${h}</span>`).join('')}</div>`;
  const body = rows
    .map(
      (row) => `<div class="price-row" role="row">${row
        .map((cell, i) => {
          if (i === 0) return `<span class="price-row__name" role="cell">${cell}</span>`;
          if (i === row.length - 1) return `<span class="price-row__price" role="cell">${cell}</span>`;
          return `<span class="price-row__incl" role="cell">${cell}</span>`;
        })
        .join('')}</div>`
    )
    .join('\n        ');
  return `<div class="price-rows" role="table">
      ${head}
      ${body}
    </div>
    ${note ? `<p class="price-note">${note}</p>` : ''}
    <a class="btn btn--primary" style="margin-top:26px" href="${ctaHref}" data-track="quote-cta" data-location="${ctaLocation}">${ctaLabel}</a>`;
}

function renderFaq(items, idPrefix = 'faq') {
  return `<div class="faq-list">
    ${items
      .map(
        (item, i) => `<details class="faq-item" id="${idPrefix}-${i + 1}">
      <summary>${item.q}<i class="faq-item__icon" aria-hidden="true"></i></summary>
      <p class="faq-item__body">${item.a}</p>
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
      acceptedAnswer: { '@type': 'Answer', text: item.aPlain || item.a },
    })),
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function renderSteps(steps) {
  return `<div class="ruled-grid ruled-grid--4">
    ${steps
      .map(
        (s, i) => `<div class="step-cell">
      <div class="step-cell__n">${num(i)}</div>
      <h3>${s.title}</h3>
      <p>${s.body}</p>
    </div>`
      )
      .join('\n    ')}
  </div>`;
}

function renderSigns(signs) {
  return signs
    .map(
      (s) => `<div class="sign-row">
      <h3>${s.title}</h3>
      <p>${s.body}</p>
    </div>`
    )
    .join('\n    ');
}

function renderTrustGrid(items) {
  return items
    .map(
      (t, i) => `<div class="trust-row">
      <span class="trust-row__n">${num(i)}</span>
      <div>
        <h3>${t.title}</h3>
        <p>${t.body}</p>
      </div>
    </div>`
    )
    .join('\n    ');
}

function renderCtaBand({ eyebrow, title, body, primaryLabel = 'Ajánlatot kérek', primaryHref = '/kapcsolat/', location = 'cta-band' }) {
  const { SITE } = require('../config');
  return `<div class="container">
    <div class="cta-band">
      <div class="cta-band__text">
        ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
        <h2 style="margin-top:16px">${title}</h2>
        ${body ? `<p class="lead" style="margin-top:18px;font-size:17px">${body}</p>` : ''}
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--onlight" href="${SITE.phoneHref}" data-track="call" data-location="${location}">${icons.phone} ${SITE.phoneDisplay}</a>
        <a class="btn btn--outline" href="${primaryHref}" data-track="quote-cta" data-location="${location}">${primaryLabel}</a>
      </div>
    </div>
  </div>`;
}

module.exports = {
  num,
  renderPriceTable,
  renderFaq,
  renderFaqJsonLd,
  renderSteps,
  renderSigns,
  renderTrustGrid,
  renderCtaBand,
};
