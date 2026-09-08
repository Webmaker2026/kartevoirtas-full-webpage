'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { SERVICES } = require('../data/services');
const { renderSteps, renderTrustGrid, renderCtaBand } = require('../partials/components');

function render() {
  const serviceCards = SERVICES.map(
    (s) => `<a class="card service-card" href="${s.path}">
        <span class="service-card__icon">${icons[s.icon]}</span>
        <h3>${s.label}</h3>
        <p class="muted">${s.shortDesc}</p>
        <span class="service-card__link">Részletek és árak ${icons.arrowRight}</span>
      </a>`
  ).join('\n        ');

  const trustItems = [
    { icon: 'target', title: 'Célzott, nem sablon kezelés', body: 'A kártevő fajtájához és a helyszín adottságaihoz igazított módszert alkalmazunk, nem egy általános eljárást mindenre.' },
    { icon: 'doc', title: 'Érthető ajánlat, világos folyamat', body: 'Felmérés után pontosan tudja, mi történik, mennyi idő alatt és mi a teendője a kezelés előtt és után.' },
    { icon: 'shield', title: 'Lakossági és üzleti ügyfeleknek', body: 'Magánlakástól a társasházon át a vendéglátóipari egységig kezeljük a jellemző kártevőproblémákat.' },
    { icon: 'clock', title: 'Rugalmas időpontok', body: 'A bejelentett probléma sürgősségéhez igazodó időpontot egyeztetünk telefonos vagy online ajánlatkérés után.' },
  ];

  const steps = [
    { title: 'Bejelentés és rövid egyeztetés', body: 'Telefonon vagy az online űrlapon elmondja, milyen kártevőt észlelt, hol és mióta — ez alapján tudjuk beazonosítani a valószínű okot.' },
    { title: 'Felmérés és árajánlat', body: 'Helyszíni vagy fotó/leírás alapú felmérés után pontos, a konkrét helyzetre szabott árajánlatot adunk, rejtett költség nélkül.' },
    { title: 'Szakszerű kezelés', body: 'A kártevőnek és a helyszínnek megfelelő módszerrel végezzük el az irtást, a szükséges óvintézkedések betartásával.' },
    { title: 'Visszajelzés és utókövetés', body: 'Elmondjuk, mire figyeljen a kezelés után, és mikor érdemes esetleges kontrollt vagy ismételt kezelést fontolóra venni.' },
  ];

  return `
  <section class="hero section--dark">
    <div class="container hero__grid">
      <div>
        <span class="eyebrow">Kártevőirtás magánszemélyeknek és cégeknek</span>
        <h1>Kártevőprobléma? Felmérés, célzott kezelés, tartós megoldás.</h1>
        <p class="lead" style="margin-top:1.1rem">
          Ágyi poloska, csótány, rágcsáló, darázs és más kártevők kezelése ${SITE.serviceArea} —
          célzott módszerrel, a probléma tényleges okára, nem csak a tünetére fókuszálva.
        </p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="/kapcsolat/" data-track="quote-cta" data-location="hero">Ingyenes ajánlatot kérek</a>
          <a class="btn btn--outline" href="${SITE.phoneHref}" data-track="call" data-location="hero">${icons.phone} ${SITE.phoneDisplay}</a>
        </div>
        <div class="hero__badges">
          <span class="hero__badge">${icons.pin} ${SITE.serviceArea}</span>
          <span class="hero__badge">${icons.clock} ${SITE.dispatchTime}</span>
          <span class="hero__badge">${icons.shield} Lakossági és üzleti ügyfeleknek</span>
        </div>
      </div>
      <div class="hero__visual" aria-hidden="true">
        <svg viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="176" stroke="#2a2e33" stroke-width="1.5"/>
          <circle cx="200" cy="200" r="140" stroke="#F28C28" stroke-width="1.5" stroke-dasharray="4 10"/>
          <circle cx="200" cy="200" r="98" fill="#1A1D21" stroke="#2a2e33"/>
          <circle cx="200" cy="200" r="46" fill="#F28C28" opacity=".14"/>
          <circle cx="200" cy="200" r="46" stroke="#F28C28" stroke-width="2"/>
          <circle cx="200" cy="200" r="10" fill="#F28C28"/>
        </svg>
        <div class="hero__tag hero__tag--1">${icons.target} Célzott felmérés</div>
        <div class="hero__tag hero__tag--2">${icons.check} Szakszerű kezelés</div>
      </div>
    </div>
  </section>

  <section class="section--light" id="szolgaltatasok">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Szolgáltatások</span>
        <h2 style="margin-top:.6rem">Melyik kártevővel van gondja?</h2>
        <p class="lead" style="margin-top:.8rem">Válassza ki a problémának megfelelő oldalt — mindegyikhez saját tájékoztatót és árlistát készítettünk.</p>
      </div>
      <div class="grid grid--4">
        ${serviceCards}
      </div>
    </div>
  </section>

  <section class="section--dark">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Miért minket válasszon</span>
        <h2 style="margin-top:.6rem">Szakértelem a tünetkezelés helyett</h2>
      </div>
      <div class="grid grid--2">
        ${renderTrustGrid(trustItems)}
      </div>
    </div>
  </section>

  <section class="section--light">
    <div class="container">
      <div class="grid" style="grid-template-columns:1fr;gap:2.5rem" >
        <div class="section-head" style="margin-bottom:0">
          <span class="eyebrow">Folyamat</span>
          <h2 style="margin-top:.6rem">Hogyan zajlik egy kártevőirtás?</h2>
        </div>
        <div class="stack" style="gap:0">
          ${renderSteps(steps)}
        </div>
      </div>
    </div>
  </section>

  <section class="section--alt">
    <div class="container grid grid--2" style="align-items:center">
      <div>
        <span class="eyebrow">Üzleti ügyfeleknek</span>
        <h2 style="margin-top:.6rem">Társasházak, éttermek, üzletek, raktárak</h2>
        <p class="lead" style="margin-top:.8rem;font-size:1rem">
          Kereskedelmi és intézményi ügyfeleink számára is vállalunk kártevőirtást — a felmerülő igényt egyedi felmérés
          alapján, a helyszín adottságaihoz igazodva mérjük fel és árazzuk be.
        </p>
        <a class="btn btn--outline" style="margin-top:1.3rem" href="/kapcsolat/" data-track="quote-cta" data-location="b2b-teaser">Üzleti ajánlatot kérek</a>
      </div>
      <ul class="b2b-grid">
        <li>${icons.building} Társasházak, lépcsőházak</li>
        <li>${icons.building} Éttermek, vendéglátóipari egységek</li>
        <li>${icons.building} Üzletek, irodák</li>
        <li>${icons.building} Raktárak, gazdasági épületek</li>
      </ul>
    </div>
  </section>

  <section class="section--light">
    <div class="container grid grid--2" style="align-items:center">
      <div>
        <span class="eyebrow">Árak</span>
        <h2 style="margin-top:.6rem">Átlátható árazás, szolgáltatásonként</h2>
        <p class="lead" style="margin-top:.8rem;font-size:1rem">
          Minden szolgáltatásunkhoz külön, a konkrét kártevőhöz igazított árlistát vezetünk. Az összesített áttekintő
          az Árak oldalon érhető el, a részletek pedig az adott szolgáltatás aloldalán.
        </p>
        <a class="btn btn--primary" style="margin-top:1.3rem" href="/arak/">Árak megtekintése</a>
      </div>
      <div class="card">
        <h3>Mitől függ a végleges ár?</h3>
        <ul class="stack" style="margin-top:1rem">
          <li class="cluster">${icons.check} A kártevő típusa és a fertőzöttség mértéke</li>
          <li class="cluster">${icons.check} A kezelendő terület mérete, típusa</li>
          <li class="cluster">${icons.check} A szükséges kezelések, kontrollok száma</li>
          <li class="cluster">${icons.check} A helyszín megközelíthetősége</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section--dark">
    ${renderCtaBand({
      eyebrow: 'Következő lépés',
      title: 'Írja le a problémát, mi visszajelzünk',
      body: 'Küldjön ajánlatkérést, vagy hívjon minket közvetlenül — mindkét esetben rövid időn belül válaszolunk.',
      location: 'home-final-cta',
    })}
  </section>
  `;
}

module.exports = { render };
