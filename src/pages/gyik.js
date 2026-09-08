'use strict';
const { SITE } = require('../config');
const { renderBreadcrumb } = require('../partials/breadcrumb');
const { renderFaq, renderFaqJsonLd, renderCtaBand } = require('../partials/components');
const { SERVICES } = require('../data/services');

function render() {
  const generalFaq = [
    { q: 'Hogyan kérhetek árajánlatot?', a: 'Töltse ki az online ajánlatkérő űrlapot a Kapcsolat oldalon vagy bármelyik szolgáltatási aloldalon, vagy hívjon minket közvetlenül telefonon. A bejelentés alapján javaslatot teszünk a felmérés módjára.' },
    { q: 'Otthon kell lennem a felmérés és a kezelés idején?', a: 'A helyszíni felméréshez és a kezeléshez jellemzően szükséges, hogy valaki beengedjen minket az ingatlanba, illetve tájékoztatást tudjon adni a tapasztalt jelekről.' },
    { q: 'Mennyi idő alatt érnek ki a bejelentés után?', a: `A kiszállási idő a probléma sürgősségétől és a helyszíntől függ: ${SITE.dispatchTime}.` },
    { q: 'Milyen fizetési módokat fogadnak el?', a: '[FIZETÉSI MÓDOK MEGADÁSA SZÜKSÉGES] — a fizetési lehetőségekről az ajánlatadáskor adunk pontos tájékoztatást.' },
    { q: 'Társasházban ki rendeli meg a kezelést?', a: 'Egyéni lakás esetén a lakó, közös terület érintettsége esetén jellemzően a közös képviselő vagy a lakóközösség — mindkét esetben tudunk ajánlatot adni, a megrendelőt előzetesen egyeztetjük.' },
    { q: 'Mi történik, ha a kezelés után is jelentkezik a probléma?', a: 'Ha a kezelés után a megbeszélt időn belül továbbra is aktivitást tapasztal, jelezze felénk — a felmérés alapján javaslatot teszünk a további teendőkre, szükség esetén kontroll látogatásra.' },
    { q: 'Melyik kártevőkkel foglalkoznak?', a: `Az oldalon a leggyakoribb kártevőkhöz (${SERVICES.filter((s) => s.slug !== 'egyeb-kartevok').map((s) => s.label.toLowerCase()).join(', ')}) külön tájékoztatót és árlistát találhat, egyéb kártevő esetén az Egyéb kártevők oldalon kérhet ajánlatot.` },
    { q: 'Vállalnak üzleti ügyfeleket, például éttermeket vagy társasházakat is?', a: 'Igen, magánszemélyek mellett üzleti és intézményi ügyfeleket (társasházak, éttermek, üzletek, raktárak) is kiszolgálunk, egyedi felmérés és ajánlat alapján.' },
  ];

  return `
  <section class="section--dark">
    <div class="container">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: 'GYIK' }])}
      <span class="eyebrow">Gyakori kérdések</span>
      <h1 style="margin-top:.6rem">Kérdések és válaszok</h1>
      <p class="lead" style="margin-top:1rem;max-width:44rem">
        Az alábbiakban az általános, minden szolgáltatásra jellemző kérdéseket gyűjtöttük össze. Kártevő-specifikus
        kérdéseket az adott szolgáltatási oldal GYIK szekciójában talál.
      </p>
      <div class="table-of-contents" style="margin-top:1.3rem">
        ${SERVICES.map((s) => `<a href="${s.path}">${s.label}</a>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section--light">
    <div class="container" style="max-width:52rem">
      ${renderFaq(generalFaq, 'gyik')}
    </div>
  </section>

  <section class="section--alt">
    ${renderCtaBand({
      eyebrow: 'Nem találta a választ?',
      title: 'Kérdezzen tőlünk közvetlenül',
      body: 'Írjon üzenetet az ajánlatkérő űrlapon, vagy hívjon minket telefonon.',
      location: 'gyik-final-cta',
    })}
  </section>
  ${renderFaqJsonLd(generalFaq)}
  `;
}

module.exports = { render };
