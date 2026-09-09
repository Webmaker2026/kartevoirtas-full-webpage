'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { SERVICES } = require('../data/services');
const { renderMedia } = require('../partials/media');
const { renderSteps, renderTrustGrid, renderCtaBand, num } = require('../partials/components');

function render() {
  const serviceTiles = SERVICES.map(
    (s, i) => `<a class="service-tile" href="${s.path}">
        <span class="service-tile__n">${num(i)}</span>
        <span class="service-tile__label">${s.label}</span>
        <span class="service-tile__desc">${s.shortDesc}</span>
        <span class="service-tile__link">Részletek és árak ${icons.arrowRight}</span>
      </a>`
  ).join('\n        ');

  const proof = [
    { big: SITE.dispatchTime, small: 'kiszállás sürgős bejelentés esetén' },
    { big: 'Nincs rejtett költség', small: 'a felmérés után kap pontos árajánlatot' },
    { big: 'Lakossági és üzleti', small: 'ügyfeleknek egyaránt dolgozunk' },
    { big: SITE.serviceArea, small: 'kártevőirtás a szolgáltatási területünkön' },
  ];

  const trustItems = [
    { title: 'Célzott, nem sablon kezelés', body: 'A kártevő fajtájához és a helyszín adottságaihoz igazított módszert alkalmazunk, nem egy általános eljárást mindenre.' },
    { title: 'Érthető ajánlat, világos folyamat', body: 'Felmérés után pontosan tudja, mi történik, mennyi idő alatt és mi a teendője a kezelés előtt és után.' },
    { title: 'Lakossági és üzleti ügyfeleknek', body: 'Magánlakástól a társasházon át a vendéglátóipari egységig kezeljük a jellemző kártevőproblémákat.' },
    { title: 'Rugalmas időpontok', body: 'A bejelentett probléma sürgősségéhez igazodó időpontot egyeztetünk telefonos vagy online ajánlatkérés után.' },
  ];

  const steps = [
    { title: 'Bejelentés és rövid egyeztetés', body: 'Telefonon vagy az online űrlapon elmondja, milyen kártevőt észlelt, hol és mióta — ez alapján tudjuk beazonosítani a valószínű okot.' },
    { title: 'Felmérés és árajánlat', body: 'Helyszíni vagy fotó/leírás alapú felmérés után pontos, a konkrét helyzetre szabott árajánlatot adunk, rejtett költség nélkül.' },
    { title: 'Szakszerű kezelés', body: 'A kártevőnek és a helyszínnek megfelelő módszerrel végezzük el az irtást, a szükséges óvintézkedések betartásával.' },
    { title: 'Visszajelzés és utókövetés', body: 'Elmondjuk, mire figyeljen a kezelés után, és mikor érdemes esetleges kontrollt vagy ismételt kezelést fontolóra venni.' },
  ];

  return `
  <section class="hero">
    ${renderMedia('homepage', { eager: true, className: 'hero__bg grayscale' })}
    <div class="hero__scrim"></div>
    <div class="container hero__inner">
      <div class="hero__content">
        <span class="tag" style="margin-bottom:22px;border:0;padding:7px 12px;background:var(--color-accent);color:var(--color-bg)">Kártevőirtás magánszemélyeknek és cégeknek</span>
        <h1>Kártevőprobléma?<br>Felmérés, célzott kezelés, tartós megoldás.</h1>
        <p class="lead hero__lead">Ágyi poloska, csótány, rágcsáló, darázs és más kártevők kezelése ${SITE.serviceArea} — célzott módszerrel, a probléma tényleges okára, nem csak a tünetére fókuszálva.</p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="${SITE.phoneHref}" data-track="call" data-location="hero">${icons.phone} Hívás: ${SITE.phoneDisplay}</a>
          <a class="btn btn--outline" href="/kapcsolat/" data-track="quote-cta" data-location="hero">Ingyenes ajánlatot kérek</a>
        </div>
        <p class="hero__note">Válasz ${SITE.dispatchTime} &middot; Nincs rejtett költség &middot; A felmérés után kap pontos árat</p>
      </div>
    </div>
  </section>

  <section class="proof-strip">
    <div class="container">
      <div class="grid">
        ${proof.map((p) => `<div class="proof-strip__item"><div class="proof-strip__big">${p.big}</div><div class="proof-strip__small">${p.small}</div></div>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section--light" id="szolgaltatasok" style="padding-top:clamp(56px,7vw,104px)">
    <div class="container">
      <div class="grid grid--2" style="align-items:end;padding-bottom:34px">
        <div>
          <span class="eyebrow">Szolgáltatások</span>
          <h2 style="margin-top:14px">Melyik kártevővel van gondja?</h2>
        </div>
        <p class="lead" style="margin:0">Válassza ki a problémának megfelelő oldalt — mindegyikhez saját tájékoztatót és árlistát készítettünk.</p>
      </div>
      <div class="ruled-grid ruled-grid--services">
        ${serviceTiles}
      </div>
    </div>
  </section>

  <section class="section--dark">
    <div class="container grid grid--2" style="gap:clamp(32px,4vw,64px)">
      <div>
        <span class="eyebrow">Miért minket válasszon</span>
        <h2 style="margin-top:14px">Szakértelem a tünetkezelés helyett</h2>
        <div class="media-photo" style="aspect-ratio:4/3;margin-top:32px">${renderMedia('home-why-us', { className: 'grayscale' })}</div>
      </div>
      <div class="trust-row-grid">
        ${renderTrustGrid(trustItems)}
      </div>
    </div>
  </section>

  <section class="section--light">
    <div class="container">
      <span class="eyebrow">Folyamat</span>
      <h2 style="margin:14px 0 34px">Hogyan zajlik egy kártevőirtás?</h2>
      ${renderSteps(steps)}
    </div>
  </section>

  <section class="section--surface">
    <div class="container grid grid--2" style="gap:clamp(32px,4vw,64px);align-items:center">
      <div>
        <span class="eyebrow">Üzleti ügyfeleknek</span>
        <h2 style="margin-top:14px">Társasházak, éttermek, üzletek, raktárak</h2>
        <p class="lead" style="margin-top:18px;font-size:16px">Kereskedelmi és intézményi ügyfeleink számára is vállalunk kártevőirtást — a felmerülő igényt egyedi felmérés alapján, a helyszín adottságaihoz igazodva mérjük fel és árazzuk be.</p>
        <ul class="b2b-grid" style="margin-top:26px">
          <li>Társasházak, lépcsőházak</li>
          <li>Éttermek, vendéglátóipari egységek</li>
          <li>Üzletek, irodák</li>
          <li>Raktárak, gazdasági épületek</li>
        </ul>
        <a class="btn btn--frame" style="margin-top:26px" href="/kapcsolat/" data-track="quote-cta" data-location="b2b-teaser">Üzleti ajánlatot kérek</a>
      </div>
      <div class="media-photo media-photo--tall" style="max-height:560px">${renderMedia('commercial', { className: 'grayscale' })}</div>
    </div>
  </section>

  <section class="section--light">
    <div class="container grid grid--2" style="gap:clamp(32px,4vw,64px)">
      <div>
        <span class="eyebrow">Árak</span>
        <h2 style="margin-top:14px">Átlátható árazás, szolgáltatásonként</h2>
        <p class="lead" style="margin-top:18px;font-size:16px">Minden szolgáltatásunkhoz külön, a konkrét kártevőhöz igazított árlistát vezetünk. Az összesített áttekintő az Árak oldalon érhető el, a részletek pedig az adott szolgáltatás aloldalán.</p>
        <a class="btn btn--primary" style="margin-top:26px" href="/arak/">Árak megtekintése</a>
      </div>
      <div>
        <h3 style="margin-bottom:4px">Mitől függ a végleges ár?</h3>
        <ul class="checklist">
          <li>${icons.check} A kártevő típusa és a fertőzöttség mértéke</li>
          <li>${icons.check} A kezelendő terület mérete, típusa</li>
          <li>${icons.check} A szükséges kezelések, kontrollok száma</li>
          <li>${icons.check} A helyszín megközelíthetősége</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section--accent">
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
