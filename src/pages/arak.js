'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { SERVICES } = require('../data/services');
const { renderBreadcrumb } = require('../partials/breadcrumb');

function render() {
  const rows = SERVICES.map(
    (s) => `<div class="price-row price-row--summary" role="row">
      <span class="price-row__name" role="cell">${s.label}</span>
      <span class="price-row__incl" role="cell">${s.shortDesc}</span>
      <span class="price-row__price" role="cell">[ÁR MEGADÁSA SZÜKSÉGES]</span>
      <a class="btn btn--frame btn--sm price-row__cta" role="cell" href="${s.path}#arak">Részletes árlista →</a>
    </div>`
  ).join('\n      ');

  return `
  <section class="hero hero--page" style="background:var(--color-text)">
    <div class="container hero__inner">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: 'Árak' }])}
      <span class="eyebrow">Árak</span>
      <h1 style="margin-top:16px;max-width:900px">Kártevőirtási árak — összesített áttekintő</h1>
      <p class="lead hero__lead">Minden szolgáltatásunkhoz külön, a konkrét kártevőhöz igazított árlista tartozik, mert a munka menete és időigénye kártevőnként eltérő. Alább az egyes szolgáltatások áttekintése található.</p>
    </div>
  </section>

  <section class="section--light">
    <div class="container">
      <div class="price-rows">
        <div class="price-rows__head" role="row"><span role="columnheader">Szolgáltatás</span><span role="columnheader">Mire való</span><span role="columnheader">Induló ár</span><span role="columnheader"></span></div>
        ${rows}
      </div>
    </div>
  </section>

  <section class="section--surface">
    <div class="container grid grid--2" style="gap:clamp(32px,4vw,64px)">
      <div>
        <h2 style="font-size:clamp(23px,2.6vw,32px);padding-bottom:14px;border-bottom:2px solid var(--color-text)">Mitől függ a végleges ár?</h2>
        <ul class="checklist" style="margin-top:0">
          <li>${icons.check} A kártevő típusa és a fertőzöttség mértéke</li>
          <li>${icons.check} A kezelendő terület mérete, típusa (lakás, üzlet, telephely)</li>
          <li>${icons.check} A szükséges kezelések, kontrollok száma</li>
          <li>${icons.check} A helyszín megközelíthetősége, sürgőssége</li>
        </ul>
      </div>
      <div>
        <h2 style="font-size:clamp(23px,2.6vw,32px);padding-bottom:14px;border-bottom:2px solid var(--color-text)">Hogyan kapok pontos árajánlatot?</h2>
        <p style="margin-top:20px;line-height:1.68">Töltse ki az ajánlatkérő űrlapot, vagy hívjon minket telefonon. A bejelentés alapján javaslatot teszünk helyszíni vagy fotó/leírás alapú felmérésre, ami után pontos, rejtett költség nélküli árajánlatot adunk.</p>
        <a class="btn btn--primary" style="margin-top:26px" href="/kapcsolat/">Ajánlatot kérek</a>
      </div>
    </div>
  </section>
  `;
}

module.exports = { render };
