'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { renderBreadcrumb } = require('../partials/breadcrumb');
const { renderTrustGrid, renderCtaBand } = require('../partials/components');

function render() {
  const values = [
    { icon: 'target', title: 'A probléma okára fókuszálunk', body: 'Nem a tünetet, hanem a fertőzöttség forrását és a visszatérés okát igyekszünk megszüntetni.' },
    { icon: 'doc', title: 'Érthető kommunikáció', body: 'Elmondjuk, mit és miért csinálunk, mire számítson a kezelés előtt, alatt és után.' },
    { icon: 'shield', title: 'Biztonságos megoldások', body: 'A háztartás vagy a helyszín adottságaihoz (gyerek, háziállat, élelmiszer közelség) igazítjuk a módszert.' },
    { icon: 'building', title: 'Lakossági és üzleti ügyfelek', body: 'Magánlakásoktól a társasházakon át a vendéglátóipari egységekig dolgozunk.' },
  ];

  return `
  <section class="section--dark">
    <div class="container">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: 'Rólunk' }])}
      <span class="eyebrow">Rólunk</span>
      <h1 style="margin-top:.6rem">${SITE.companyName}</h1>
      <p class="lead" style="margin-top:1rem;max-width:44rem">
        Kártevőirtással foglalkozunk ${SITE.serviceArea} — a cél minden esetben ugyanaz: pontosan beazonosítani a
        problémát, és a helyzethez illő, tartós megoldást adni rá, nem csak egy általános, mindenre alkalmazott kezelést.
      </p>
    </div>
  </section>

  <section class="section--light">
    <div class="container grid grid--2" style="align-items:center">
      <div>
        <span class="eyebrow">Szemléletünk</span>
        <h2 style="margin-top:.6rem">Miért fontos a felmérés minden munka elején</h2>
        <p class="muted" style="margin-top:.9rem">
          A legtöbb kártevőprobléma nem azért tér vissza, mert a kezelés rossz volt, hanem mert a fertőzöttség forrása
          — egy rejtekhely, egy bejutási pont, egy fészek — nem lett teljesen felszámolva. Ezért minden munkát alapos
          felméréssel kezdünk, és csak ez után adunk pontos árajánlatot és javaslatot a kezelés módjára.
        </p>
        <p class="muted" style="margin-top:.9rem">
          Fontosnak tartjuk, hogy Ön is értse, mi történik a lakásában vagy az ingatlanján: elmagyarázzuk a kezelés
          menetét, az előkészületeket és az utólagos teendőket is.
        </p>
      </div>
      <div class="card">
        <h3>${icons.pin} Szolgáltatási terület</h3>
        <p class="muted" style="margin-top:.8rem">${SITE.serviceArea}</p>
        <hr class="divider">
        <h3>${icons.clock} Elérhetőség</h3>
        <p class="muted" style="margin-top:.8rem">${SITE.openingHours}</p>
      </div>
    </div>
  </section>

  <section class="section--dark">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Amit fontosnak tartunk</span>
        <h2 style="margin-top:.6rem">Így dolgozunk</h2>
      </div>
      <div class="grid grid--2">
        ${renderTrustGrid(values)}
      </div>
    </div>
  </section>

  <section class="section--light">
    <div class="container grid grid--2" style="align-items:center">
      <div>
        <span class="eyebrow">Üzleti ügyfeleknek</span>
        <h2 style="margin-top:.6rem">Társasházak, éttermek, üzletek, raktárak</h2>
        <p class="muted" style="margin-top:.9rem">
          Kereskedelmi és intézményi ügyfeleink esetében is a helyszíni felmérés az első lépés — az igényt, az
          ingatlan típusát és a nyitvatartási szempontokat figyelembe véve adunk egyedi ajánlatot.
        </p>
      </div>
      <ul class="b2b-grid">
        <li>${icons.building} Társasházak, lépcsőházak</li>
        <li>${icons.building} Éttermek, vendéglátóipari egységek</li>
        <li>${icons.building} Üzletek, irodák</li>
        <li>${icons.building} Raktárak, gazdasági épületek</li>
      </ul>
    </div>
  </section>

  <section class="section--alt">
    ${renderCtaBand({
      eyebrow: 'Beszéljünk a problémáról',
      title: 'Írja le, milyen kártevővel áll szemben',
      body: 'Ajánlatkérés vagy telefonhívás után rövid időn belül visszajelzünk.',
      location: 'rolunk-final-cta',
    })}
  </section>
  `;
}

module.exports = { render };
