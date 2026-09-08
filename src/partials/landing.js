'use strict';
const { SITE } = require('../config');
const { icons } = require('./icons');
const { renderBreadcrumb } = require('./breadcrumb');
const { renderPriceTable, renderFaq, renderFaqJsonLd, renderSteps, renderSigns, renderTrustGrid, renderCtaBand } = require('./components');

function sectionClass(bg) {
  if (bg === 'light') return 'section--light';
  if (bg === 'alt') return 'section--alt';
  return 'section--dark';
}

function renderHeroService(h) {
  const badges = (h.badges || [])
    .map((b) => `<span class="hero__badge">${icons[b.icon] || icons.check} ${b.text}</span>`)
    .join('\n          ');
  return `<section class="hero section--dark">
    <div class="container">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: h.breadcrumbLabel }])}
      <div class="hero__grid">
        <div>
          ${h.tag ? `<span class="tag" style="margin-bottom:.9rem">${icons.warn} ${h.tag}</span>` : ''}
          <span class="eyebrow">${h.eyebrow}</span>
          <h1 style="margin-top:.6rem">${h.h1}</h1>
          <p class="lead" style="margin-top:1.1rem">${h.intro}</p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="#ajanlatkeres" data-track="quote-cta" data-location="service-hero">${h.primaryCtaLabel || 'Ingyenes ajánlatot kérek'}</a>
            <a class="btn btn--outline" href="${SITE.phoneHref}" data-track="call" data-location="service-hero">${icons.phone} ${SITE.phoneDisplay}</a>
          </div>
          <div class="hero__badges">
            ${badges}
          </div>
        </div>
        <div class="hero__visual" aria-hidden="true">
          <svg viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="176" stroke="#2a2e33" stroke-width="1.5"/>
            <circle cx="200" cy="200" r="132" stroke="#F28C28" stroke-width="1.5" stroke-dasharray="4 10"/>
            <circle cx="200" cy="200" r="92" fill="#1A1D21" stroke="#2a2e33"/>
            <path d="M200 140v40M200 260v-40M140 200h40M260 200h-40" stroke="#F28C28" stroke-width="2"/>
            <circle cx="200" cy="200" r="14" fill="#F28C28"/>
          </svg>
          <div class="hero__tag hero__tag--1">${icons.target} ${h.tagBoxLeft || 'Pontos beazonosítás'}</div>
          <div class="hero__tag hero__tag--2">${icons.check} ${h.tagBoxRight || 'Célzott kezelés'}</div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderSectionHead({ eyebrow, title, intro }, light) {
  return `<div class="section-head">
      ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
      <h2 style="margin-top:.6rem">${title}</h2>
      ${intro ? `<p class="lead" style="margin-top:.8rem;font-size:1rem">${intro}</p>` : ''}
    </div>`;
}

function renderSigns_(s) {
  return `<div class="container">
    ${renderSectionHead(s)}
    <div class="grid grid--2">
      ${renderSigns(s.items)}
    </div>
  </div>`;
}

function renderAbout_(s) {
  const bullets = s.bullets
    ? `<ul class="stack" style="margin-top:1.2rem">${s.bullets.map((b) => `<li class="cluster">${icons.check} ${b}</li>`).join('')}</ul>`
    : '';
  return `<div class="container grid grid--2" style="align-items:center">
    <div>
      ${renderSectionHead(s)}
      ${(s.paragraphs || []).map((p) => `<p class="muted" style="margin-top:.9rem">${p}</p>`).join('\n      ')}
      ${bullets}
    </div>
    <div class="card">
      <h3>${s.sideTitle || 'Röviden'}</h3>
      <ul class="stack" style="margin-top:1rem">
        ${(s.sideItems || []).map((i) => `<li class="cluster">${icons.check} ${i}</li>`).join('\n        ')}
      </ul>
    </div>
  </div>`;
}

function renderMethod_(s) {
  const cards = s.items
    .map(
      (i) => `<div class="card">
      <span class="service-card__icon">${icons[i.icon] || icons.spark}</span>
      <h3 style="margin-top:.9rem">${i.title}</h3>
      <p class="muted" style="margin-top:.5rem">${i.body}</p>
    </div>`
    )
    .join('\n      ');
  return `<div class="container">
    ${renderSectionHead(s)}
    <div class="grid grid--3">
      ${cards}
    </div>
  </div>`;
}

function renderProcess_(s) {
  return `<div class="container">
    <div class="grid" style="grid-template-columns:1fr">
      ${renderSectionHead(s)}
      <div class="stack" style="gap:0">
        ${renderSteps(s.steps)}
      </div>
    </div>
  </div>`;
}

function renderPricing_(s) {
  return `<div class="container">
    ${renderSectionHead(s)}
    ${renderPriceTable({ headers: s.headers, rows: s.rows, note: s.note, ctaLabel: s.ctaLabel, ctaLocation: 'service-pricing' })}
  </div>`;
}

function renderTwoList_(s) {
  const colA = `<div class="card">
      <h3>${icons.doc} ${s.leftTitle}</h3>
      <ul class="stack" style="margin-top:1rem">
        ${s.leftItems.map((i) => `<li class="cluster">${icons.check} ${i}</li>`).join('\n        ')}
      </ul>
    </div>`;
  const colB = `<div class="card">
      <h3>${icons.process} ${s.rightTitle}</h3>
      <ul class="stack" style="margin-top:1rem">
        ${s.rightItems.map((i) => `<li class="cluster">${icons.check} ${i}</li>`).join('\n        ')}
      </ul>
    </div>`;
  return `<div class="container">
    ${renderSectionHead(s)}
    <div class="grid grid--2">
      ${colA}
      ${colB}
    </div>
  </div>`;
}

function renderTrust_(s) {
  return `<div class="container">
    ${renderSectionHead(s)}
    <div class="grid grid--2">
      ${renderTrustGrid(s.items)}
    </div>
  </div>`;
}

function renderArea_(s) {
  return `<div class="container">
    ${renderSectionHead(s)}
    <ul class="area-list">
      ${(s.areas || [SITE.serviceArea]).map((a) => `<li>${a}</li>`).join('\n      ')}
    </ul>
  </div>`;
}

function renderFaq_(s) {
  return `<div class="container" style="max-width:52rem">
    ${renderSectionHead(s)}
    ${renderFaq(s.items, s.idPrefix)}
  </div>${renderFaqJsonLd(s.items)}`;
}

function renderContactForm_(s) {
  const { renderQuoteForm } = require('./quoteForm');
  return `<div class="container grid grid--2" style="align-items:flex-start">
    <div>
      ${renderSectionHead(s)}
      <div class="stack">
        <a class="btn btn--outline btn--block" href="${SITE.phoneHref}" data-track="call" data-location="service-contact">${icons.phone} Hívom most: ${SITE.phoneDisplay}</a>
        <p class="muted">Vagy töltse ki az űrlapot, és rövid időn belül visszahívjuk / válaszolunk.</p>
      </div>
    </div>
    <div class="card">
      ${renderQuoteForm({ presetPest: s.presetPest, formId: 'ajanlatkeres-' + (s.presetPest || 'altalanos') })}
    </div>
  </div>`;
}

const RENDERERS = {
  signs: renderSigns_,
  about: renderAbout_,
  method: renderMethod_,
  process: renderProcess_,
  pricing: renderPricing_,
  twoList: renderTwoList_,
  trust: renderTrust_,
  area: renderArea_,
  faq: renderFaq_,
  contact: renderContactForm_,
};

/**
 * @param {Object} data
 * @param {Object} data.hero
 * @param {Array}  data.sections - [{ type, bg, ...opts }]
 * @param {Object} [data.finalCta]
 */
function renderServiceLanding(data) {
  const body = data.sections
    .map((s) => {
      const renderer = RENDERERS[s.type];
      if (!renderer) return '';
      return `<section class="${sectionClass(s.bg)}"${s.id ? ` id="${s.id}"` : ''}>
    ${renderer(s)}
  </section>`;
    })
    .join('\n\n  ');

  const finalCta = data.finalCta
    ? `<section class="section--alt">
    ${renderCtaBand({ ...data.finalCta, location: 'service-final-cta' })}
  </section>`
    : '';

  return `${renderHeroService(data.hero)}

  ${body}

  ${finalCta}`;
}

module.exports = { renderServiceLanding };
