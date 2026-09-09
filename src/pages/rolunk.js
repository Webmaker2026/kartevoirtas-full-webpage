'use strict';
const { SITE } = require('../config');
const { renderBreadcrumb } = require('../partials/breadcrumb');
const { renderMedia } = require('../partials/media');
const { renderTrustGrid, renderCtaBand } = require('../partials/components');

function render() {
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

  return `
  <section class="hero">
    ${renderMedia('rolunk-hero', { eager: true, className: 'hero__bg grayscale' })}
    <div class="hero__scrim"></div>
    <div class="container hero__inner">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: 'Rólunk' }])}
      <div class="hero__content">
        <span class="eyebrow">Rólunk</span>
        <h1 style="margin-top:16px;max-width:860px">A kártevőirtás nem permetezés — hanem felmérés, döntés és utókövetés</h1>
        <p class="lead hero__lead">${SITE.companyName} magánszemélyeknek és cégeknek dolgozik ${SITE.serviceArea} területén. Minden munkánk ugyanazzal kezdődik: megnézzük, mi okozza a problémát.</p>
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

  <section class="section--light">
    <div class="container grid grid--2" style="gap:clamp(32px,4vw,64px)">
      <div>
        <h2>Ahogyan dolgozunk</h2>
        <p style="margin-top:18px;line-height:1.68">Nem sablonkezelést adunk el. A kártevő fajtájához és a helyszín adottságaihoz igazított módszert alkalmazunk, és elmondjuk azt is, ha valamit Önnek kell megcsinálnia ahhoz, hogy a kezelés tartós legyen.</p>
        <p style="margin-top:14px;line-height:1.68">Lakossági és üzleti ügyfeleket egyaránt kiszolgálunk: magánlakástól a társasházon át a vendéglátóipari egységig.</p>
        <div class="trust-row-grid" style="margin-top:28px">
          ${renderTrustGrid(trustItems)}
        </div>
      </div>
      <div class="stack">
        <div class="media-photo media-photo--tall">${renderMedia('rolunk-main', { className: 'grayscale' })}</div>
        <div class="grid grid--2">
          <div class="media-photo media-photo--square">${renderMedia('rolunk-side-1', { className: 'grayscale' })}</div>
          <div class="media-photo media-photo--square">${renderMedia('rolunk-side-2', { className: 'grayscale' })}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section--accent">
    ${renderCtaBand({
      title: 'Beszéljünk arról, mit észlelt',
      location: 'rolunk-final-cta',
    })}
  </section>
  `;
}

module.exports = { render };
