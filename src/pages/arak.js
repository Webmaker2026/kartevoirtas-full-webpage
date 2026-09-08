'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { SERVICES } = require('../data/services');
const { renderBreadcrumb } = require('../partials/breadcrumb');
const { renderCtaBand } = require('../partials/components');

function render() {
  const cards = SERVICES.map(
    (s) => `<div class="price-summary-card">
      <span class="service-card__icon">${icons[s.icon]}</span>
      <h3>${s.label}</h3>
      <p class="muted" style="flex:1">${s.shortDesc}</p>
      <div class="price-summary-card__from">[ÁR MEGADÁSA SZÜKSÉGES]<small>induló ár, felmérés alapján</small></div>
      <a class="btn btn--outline btn--block" href="${s.path}#arak">Részletes árlista ${icons.arrowRight}</a>
    </div>`
  ).join('\n      ');

  return `
  <section class="section--dark">
    <div class="container">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: 'Árak' }])}
      <span class="eyebrow">Árak</span>
      <h1 style="margin-top:.6rem">Kártevőirtási árak — összesített áttekintő</h1>
      <p class="lead" style="margin-top:1rem;max-width:44rem">
        Minden szolgáltatásunkhoz külön, a konkrét kártevőhöz igazított árlista tartozik, mert a munka menete és
        időigénye kártevőnként eltérő. Alább az egyes szolgáltatások áttekintése található — a részletes árlista
        és a mit tartalmaz az ár információk a szolgáltatás saját oldalán érhetők el.
      </p>
    </div>
  </section>

  <section class="section--light">
    <div class="container">
      <div class="grid grid--4">
        ${cards}
      </div>
    </div>
  </section>

  <section class="section--dark">
    <div class="container grid grid--2">
      <div class="card">
        <h3>${icons.doc} Mitől függ a végleges ár?</h3>
        <ul class="stack" style="margin-top:1rem">
          <li class="cluster">${icons.check} A kártevő típusa és a fertőzöttség mértéke</li>
          <li class="cluster">${icons.check} A kezelendő terület mérete, típusa (lakás, üzlet, telephely)</li>
          <li class="cluster">${icons.check} A szükséges kezelések, kontrollok száma</li>
          <li class="cluster">${icons.check} A helyszín megközelíthetősége, sürgőssége</li>
        </ul>
      </div>
      <div class="card">
        <h3>${icons.process} Hogyan kapok pontos árajánlatot?</h3>
        <p class="muted" style="margin-top:1rem">
          Töltse ki az ajánlatkérő űrlapot, vagy hívjon minket telefonon. A bejelentés alapján javaslatot teszünk
          helyszíni vagy fotó/leírás alapú felmérésre, ami után pontos, rejtett költség nélküli árajánlatot adunk.
        </p>
        <a class="btn btn--primary" style="margin-top:1rem" href="/kapcsolat/">Ajánlatot kérek</a>
      </div>
    </div>
  </section>

  <section class="section--alt">
    ${renderCtaBand({
      eyebrow: 'Nem találja a szolgáltatását?',
      title: 'Egyéb kártevő esetén is adunk árajánlatot',
      body: 'Molylepke, pincebogár, atka és más kártevők esetén egyedi felmérés alapján határozzuk meg a megoldást és az árat.',
      primaryLabel: 'Egyéb kártevő oldal',
      primaryHref: '/egyeb-kartevok/',
      location: 'arak-egyeb',
    })}
  </section>
  `;
}

module.exports = { render };
