'use strict';
const { SITE } = require('../config');
const { icons } = require('./icons');
const { SERVICES } = require('../data/services');
const { renderBreadcrumb } = require('./breadcrumb');
const { renderMedia } = require('./media');
const { renderPriceTable, renderFaq, renderFaqJsonLd, renderSteps, renderSigns, renderTrustGrid, renderCtaBand, num } = require('./components');

/*
 * A háttérszín szekciótípusonként FIX (a jóváhagyott design ugyanazt a
 * sablont használja mind a 8 szolgáltatásra) — nem az egyes oldal-fájlok
 * (pl. egyeb-kartevok.js) régi, más vizuális rendszerhez tervezett `bg`
 * mezőjéből jön, azt szándékosan figyelmen kívül hagyjuk.
 */
const SECTION_BG = {
  signs: 'section--light',
  about: 'section--dark',
  method: 'section--light',
  pricing: 'section--surface',
  twoList: 'section--light',
  trust: 'section--dark',
  faq: 'section--light',
  contact: 'section--surface',
};

function renderHeroService(h) {
  const badges = (h.badges || []).map((b) => `<span class="hero__badge">${b.text}</span>`).join('\n          ');
  return `<section class="hero hero--page">
    ${renderMedia(h.mediaKey, { alt: h.mediaAlt, eager: true, className: 'hero__bg grayscale' })}
    <div class="hero__scrim"></div>
    <div class="container hero__inner">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: h.breadcrumbLabel }])}
      <div class="hero__content">
        ${h.tag ? `<span class="hero__tag">${icons.warn} ${h.tag}</span>` : ''}
        <h1>${h.h1}</h1>
        <p class="lead hero__lead">${h.intro}</p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="${SITE.phoneHref}" data-track="call" data-location="service-hero">${icons.phone} Hívás: ${SITE.phoneDisplay}</a>
          <a class="btn btn--outline" href="#ajanlatkeres" data-track="quote-cta" data-location="service-hero">${h.primaryCtaLabel || 'Ingyenes ajánlatot kérek'}</a>
        </div>
      </div>
    </div>
    <div class="hero__badges">
      <div class="container">
        ${badges}
      </div>
    </div>
  </section>`;
}

function renderOtherServices(currentLabel) {
  const others = SERVICES.filter((s) => s.label !== currentLabel);
  return `<section class="other-services">
    <div class="container">
      <span class="other-services__label">Másik kártevő?</span>
      <div class="other-services__list">
        ${others.map((s) => `<a href="${s.path}">${s.label}</a>`).join('\n        ')}
      </div>
    </div>
  </section>`;
}

function renderSectionHead({ eyebrow, title, intro }) {
  return `${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
    <h2 style="margin:14px 0 0">${title}</h2>
    ${intro ? `<p class="lead" style="margin:16px 0 34px;max-width:680px;font-size:16px">${intro}</p>` : '<div style="margin-bottom:34px"></div>'}`;
}

function renderSigns_(s) {
  return `<div class="container">
    ${renderSectionHead(s)}
    <div class="ruled-grid ruled-grid--2">
      ${renderSigns(s.items)}
    </div>
  </div>`;
}

function renderAbout_(s, ctx) {
  const sideItems = s.sideItems
    ? `<div class="plain-list" style="margin-top:12px">${s.sideItems.map((i) => `<div>${i}</div>`).join('')}</div>`
    : '';
  return `<div class="container grid grid--2" style="gap:clamp(32px,4vw,64px)">
    <div>
      <span class="eyebrow">${s.eyebrow}</span>
      <h2 style="margin-top:14px">${s.title}</h2>
      ${(s.paragraphs || []).map((p) => `<p style="font-size:15.5px;line-height:1.68;color:var(--color-neutral-500);margin-top:20px">${p}</p>`).join('\n      ')}
    </div>
    <div>
      <div class="media-photo" style="aspect-ratio:16/10">${renderMedia(`${ctx.mediaKey}-about`, { className: 'grayscale' })}</div>
      ${s.sideTitle ? `<h3 style="margin-top:28px;color:var(--color-bg)">${s.sideTitle}</h3>` : ''}
      ${sideItems}
    </div>
  </div>`;
}

function renderMethod_(s) {
  const cells = s.items
    .map((i, idx) => `<div class="method-cell">
      <div class="method-cell__n">${num(idx)}</div>
      <h3>${i.title}</h3>
      <p>${i.body}</p>
    </div>`)
    .join('\n      ');
  return `<div class="container">
    ${renderSectionHead(s)}
    <div class="ruled-grid ruled-grid--3">
      ${cells}
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
  const colA = `<div class="checklist-col">
      <h3>${s.leftTitle}</h3>
      <ul class="checklist">
        ${s.leftItems.map((i) => `<li>${icons.check} ${i}</li>`).join('\n        ')}
      </ul>
    </div>`;
  const colB = `<div class="checklist-col">
      <h3>${s.rightTitle}</h3>
      <ul class="checklist">
        ${s.rightItems.map((i) => `<li>${icons.check} ${i}</li>`).join('\n        ')}
      </ul>
    </div>`;
  return `<div class="container">
    <span class="eyebrow">${s.eyebrow}</span>
    <h2 style="margin:14px 0 34px">${s.title}</h2>
    <div class="grid grid--2" style="gap:clamp(28px,4vw,64px)">
      ${colA}
      ${colB}
    </div>
  </div>`;
}

function renderTrust_(s) {
  return `<div class="container">
    <span class="eyebrow">Miért minket válasszon</span>
    <h2 style="margin:14px 0 28px;color:var(--color-bg)">${s.title}</h2>
    <div class="trust-row-grid trust-row-grid--2">
      ${renderTrustGrid(s.items)}
    </div>
  </div>`;
}

function renderFaq_(s) {
  return `<div class="container container--narrow">
    <span class="eyebrow">Gyakori kérdések</span>
    <h2 style="margin:14px 0 30px">${s.title}</h2>
    ${renderFaq(s.items, s.idPrefix)}
  </div>${renderFaqJsonLd(s.items)}`;
}

function renderContactForm_(s) {
  const { renderQuoteForm } = require('./quoteForm');
  return `<div class="container grid grid--2" style="gap:clamp(32px,4vw,64px);align-items:start">
    <div>
      <span class="eyebrow">Ajánlatkérés</span>
      <h2 style="margin-top:14px">${s.title}</h2>
      <p class="lead" style="margin-top:18px;font-size:16px">Sürgős esetben a leggyorsabb, ha telefonon keres minket — az űrlapra rövid időn belül visszajelzünk.</p>
      <a class="btn btn--onlight" style="margin-top:24px" href="${SITE.phoneHref}" data-track="call" data-location="service-contact">${icons.phone} Hívom most: ${SITE.phoneDisplay}</a>
      <div class="info-card" style="border-top:1px solid var(--color-divider);border-bottom:0;margin-top:24px;padding-top:16px">
        <span class="info-card__label">Szolgáltatási terület</span>
        <p class="info-card__value--body">${SITE.serviceArea}</p>
      </div>
    </div>
    <div class="form-panel">
      <h3>Ajánlatkérő űrlap</h3>
      <p class="form-panel__hint">Négy mező kötelező — a többi segít pontosabb árat adnunk.</p>
      ${renderQuoteForm({ presetPest: s.presetPest, formId: 'ajanlatkeres-' + (s.presetPest || 'altalanos') })}
    </div>
  </div>`;
}

const RENDERERS = {
  signs: renderSigns_,
  about: renderAbout_,
  method: renderMethod_,
  pricing: renderPricing_,
  twoList: renderTwoList_,
  trust: renderTrust_,
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
  const ctx = { mediaKey: data.hero.mediaKey };
  const body = data.sections
    .map((s) => {
      const renderer = RENDERERS[s.type];
      if (!renderer) return '';
      return `<section class="${SECTION_BG[s.type] || 'section--light'}"${s.id ? ` id="${s.id}"` : ''}>
    ${renderer(s, ctx)}
  </section>`;
    })
    .join('\n\n  ');

  const finalCta = data.finalCta
    ? `<section class="section--accent">
    ${renderCtaBand({ ...data.finalCta, location: 'service-final-cta' })}
  </section>`
    : '';

  return `${renderHeroService(data.hero)}

  ${renderOtherServices(data.hero.eyebrow)}

  ${body}

  ${finalCta}`;
}

module.exports = { renderServiceLanding };
