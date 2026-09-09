'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { renderBreadcrumb } = require('../partials/breadcrumb');
const { renderFaq, renderFaqJsonLd } = require('../partials/components');
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
  <section class="hero hero--page" style="background:var(--color-text)">
    <div class="container hero__inner">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: 'GYIK' }])}
      <span class="eyebrow">Gyakori kérdések</span>
      <h1 style="margin-top:16px;max-width:840px">Amit a kártevőirtásról tudni érdemes</h1>
    </div>
  </section>

  <section class="section--light">
    <div class="container container--narrow">
      ${renderFaq(generalFaq, 'gyik')}
      <div class="faq-callout">
        <h2>Nem találta a választ?</h2>
        <p>Hívjon minket, és elmondjuk, mire számítson a konkrét helyzetében.</p>
        <a class="btn btn--primary" style="margin-top:20px" href="${SITE.phoneHref}" data-track="call" data-location="gyik-final-cta">${SITE.phoneDisplay}</a>
      </div>
    </div>
  </section>
  ${renderFaqJsonLd(generalFaq)}
  `;
}

module.exports = { render };
