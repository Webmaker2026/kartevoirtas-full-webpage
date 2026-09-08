'use strict';
const { icons } = require('./icons');

function renderPriceTable({ headers, rows, note, ctaLabel = 'Ajánlatot kérek', ctaHref = '/kapcsolat/', ctaLocation = 'price-table' }) {
  const thead = `<tr>${headers.map((h) => `<th scope="col">${h}</th>`).join('')}</tr>`;
  const tbody = rows
    .map((row) => `<tr>${row.map((cell, i) => `<td${i === row.length - 1 ? ' class="price"' : ''}>${cell}</td>`).join('')}</tr>`)
    .join('\n        ');
  return `<div class="price-table-wrap">
      <table class="price-table">
        <thead>${thead}</thead>
        <tbody>
        ${tbody}
        </tbody>
      </table>
    </div>
    ${note ? `<p class="price-note">${note}</p>` : ''}
    <div class="price-cta">
      <a class="btn btn--primary" href="${ctaHref}" data-track="quote-cta" data-location="${ctaLocation}">${ctaLabel}</a>
      <span class="muted">Pontos árajánlatot helyszíni vagy fotó alapú felmérés után adunk.</span>
    </div>`;
}

function renderFaq(items, idPrefix = 'faq') {
  return items
    .map(
      (item, i) => `<details class="faq-item" id="${idPrefix}-${i + 1}">
      <summary>${item.q}<span class="faq-item__icon" aria-hidden="true"></span></summary>
      <div class="faq-item__body"><p>${item.a}</p></div>
    </details>`
    )
    .join('\n    ');
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
  return steps
    .map(
      (s, i) => `<div class="step">
      <span class="step__num">0${i + 1}</span>
      <div class="step__body">
        <h3>${s.title}</h3>
        <p class="muted">${s.body}</p>
      </div>
    </div>`
    )
    .join('\n    ');
}

function renderSigns(signs) {
  return signs
    .map(
      (s) => `<div class="sign-card">
      <h3>${icons.warn} ${s.title}</h3>
      <p class="muted">${s.body}</p>
    </div>`
    )
    .join('\n    ');
}

function renderTrustGrid(items) {
  return items
    .map(
      (t) => `<div class="trust-card">
      <span class="trust-card__icon">${icons[t.icon] || icons.check}</span>
      <div>
        <h3 style="font-size:1rem">${t.title}</h3>
        <p class="muted" style="margin-top:.3rem">${t.body}</p>
      </div>
    </div>`
    )
    .join('\n    ');
}

function renderCtaBand({ eyebrow, title, body, primaryLabel = 'Ajánlatot kérek', primaryHref = '/kapcsolat/', location = 'cta-band' }) {
  const { SITE } = require('../config');
  return `<div class="container">
    <div class="card" style="display:flex;flex-wrap:wrap;gap:1.6rem;align-items:center;justify-content:space-between;padding:2.2rem">
      <div style="max-width:34rem">
        ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
        <h2 style="margin-top:.6rem">${title}</h2>
        ${body ? `<p class="lead" style="margin-top:.7rem;font-size:1rem">${body}</p>` : ''}
      </div>
      <div class="cluster">
        <a class="btn btn--primary" href="${primaryHref}" data-track="quote-cta" data-location="${location}">${primaryLabel}</a>
        <a class="btn btn--outline" href="${SITE.phoneHref}" data-track="call" data-location="${location}">${icons.phone} ${SITE.phoneDisplay}</a>
      </div>
    </div>
  </div>`;
}

module.exports = {
  renderPriceTable,
  renderFaq,
  renderFaqJsonLd,
  renderSteps,
  renderSigns,
  renderTrustGrid,
  renderCtaBand,
};
