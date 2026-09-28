'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { SERVICES } = require('../data/services');
const { renderMedia } = require('../partials/media');
const { renderSectionHead, renderSteps, renderTrustFacts, renderCtaBand } = require('../partials/components');

function render() {
  const serviceItems = SERVICES.map(
    (s) => `<li>
          <a class="service-link" href="${s.path}">
            <span class="service-link__text">
              <span class="service-link__title">${s.label}</span>
              <span class="service-link__desc">${s.shortDesc}</span>
            </span>
            <span class="service-link__arrow" aria-hidden="true">${icons.arrowRight}</span>
          </a>
        </li>`
  ).join('\n        ');

  const steps = [
    { title: 'Telefon vagy ajánlatkérés', body: 'Elmondja, milyen kártevőt látott, hol és mióta. Ebből sokszor már kiderül, mire lesz szükség.' },
    { title: 'Felmérés és ár', body: 'A helyzettől függően a helyszínen vagy a kapott információk alapján megmondjuk, mit javaslunk, és mennyibe kerül.' },
    { title: 'Kezelés', body: 'Egyeztetett időpontban elvégezzük a kezelést. Előtte elmondjuk, mit kell előkészíteni.' },
    { title: 'Utána', body: 'Elmondjuk, mire figyeljen a kezelés után, és mikor jelezzen, ha újra kártevőt lát.' },
  ];

  return `
  <section class="hero hero--home">
    <div class="container hero__grid">
      <div class="hero__content">
        <span class="hero__eyebrow">Lakossági és céges megrendelőknek</span>
        <h1>Kártevőirtás magánszemélyeknek és cégeknek</h1>
        <p class="hero__lead">Csótány, ágyi poloska, egér, patkány, darázs, hangya és bolha irtása ${SITE.serviceArea} területén. Hívjon, és telefonon megbeszéljük, mi a teendő, mennyibe kerül, és mikor tudunk menni.</p>
        <div class="hero__actions">
          <a class="btn btn--call btn--lg" href="${SITE.phoneHref}" data-track="call" data-location="hero">${icons.phone} Hívás: ${SITE.phoneDisplay}</a>
          <a class="btn btn--outline-light" href="/kapcsolat/" data-track="quote-cta" data-location="hero">Ajánlatkérés űrlapon</a>
        </div>
        <p class="hero__meta">${icons.clock} ${SITE.openingHours}</p>
      </div>
      <div class="hero__media hero__media--photo">
        ${renderMedia('homepage', { eager: true, desktopOnly: true, className: 'hero__img' })}
      </div>
    </div>
  </section>

  <section class="section section--white" id="szolgaltatasok">
    <div class="container">
      ${renderSectionHead({
        eyebrow: 'Szolgáltatások',
        title: 'Milyen kártevővel van gondja?',
        intro: 'Minden kártevőhöz külön oldalt készítettünk a jelekről, a kezelés menetéről és az árakról.',
      })}
      <ul class="service-list">
        ${serviceItems}
      </ul>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      ${renderSectionHead({ eyebrow: 'Hogyan dolgozunk?', title: 'A bejelentéstől a kezelésig' })}
      ${renderSteps(steps)}
    </div>
  </section>

  <section class="section section--navy">
    <div class="container split split--top split--facts">
      <div class="split__main">
        ${renderSectionHead({
          eyebrow: 'Miért minket?',
          title: 'Amit rólunk tudni érdemes',
          intro: `${SITE.companyName} kártevőirtással foglalkozik ${SITE.serviceArea} területén. Lakásban, családi házban, társasházban és üzleti ingatlanban is dolgozunk.`,
        })}
        <a class="btn btn--outline-light" href="/rolunk/">Bemutatkozás</a>
      </div>
      <div class="split__side">
        ${renderTrustFacts()}
      </div>
    </div>
  </section>

  <section class="section section--white">
    <div class="container split">
      <div class="split__main">
        ${renderSectionHead({
          eyebrow: 'Cégeknek',
          title: 'Társasházaknak, vendéglátóhelyeknek, üzleteknek',
          intro: 'Közös képviselők, üzemeltetők és cégek részére is dolgozunk. Az ajánlatot a helyszín, a kezelendő terület és a szükséges kezelések száma alapján állítjuk össze.',
        })}
        <ul class="checklist checklist--cols">
          <li>${icons.check}<span>Társasházak, lépcsőházak, pincék</span></li>
          <li>${icons.check}<span>Éttermek, konyhák, élelmiszerüzletek</span></li>
          <li>${icons.check}<span>Irodák, üzlethelyiségek</span></li>
          <li>${icons.check}<span>Raktárak, telephelyek, gazdasági épületek</span></li>
        </ul>
        <a class="btn btn--primary" href="/kapcsolat/" data-track="quote-cta" data-location="b2b">Céges ajánlatkérés</a>
      </div>
      <div class="split__side split__side--media hide-mobile">
        <div class="media-frame media-frame--wide">${renderMedia('commercial')}</div>
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container split">
      <div class="split__main">
        ${renderSectionHead({
          eyebrow: 'Árak',
          title: 'Mennyibe kerül a kártevőirtás?',
          intro: 'Az ár kártevőnként eltér, ezért minden szolgáltatásoldalon külön árlistát talál. A végleges árat a felmérés után mondjuk meg.',
        })}
        <a class="btn btn--primary" href="/arak/">Árak megtekintése</a>
      </div>
      <div class="split__side">
        <h3 class="side-list__title">Mitől függ az ár?</h3>
        <ul class="checklist">
          <li>${icons.check}<span>A kártevő fajtája és a fertőzöttség mértéke</span></li>
          <li>${icons.check}<span>A kezelendő terület mérete és típusa</span></li>
          <li>${icons.check}<span>Hány kezelésre van szükség</span></li>
          <li>${icons.check}<span>A helyszín távolsága és megközelíthetősége</span></li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section section--navy section--cta">
    ${renderCtaBand({
      title: 'Kártevőt észlelt? Hívjon, és megbeszéljük a teendőket.',
      body: 'Ha most nem tud beszélni, küldjön ajánlatkérést, és visszahívjuk.',
      location: 'home-final-cta',
    })}
  </section>
  `;
}

module.exports = { render };
