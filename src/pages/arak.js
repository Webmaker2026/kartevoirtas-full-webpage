'use strict';
const { icons } = require('../partials/icons');
const { SERVICES } = require('../data/services');
const { renderPageHero, renderSectionHead, renderCtaBand } = require('../partials/components');

function render({ path }) {
  const rows = SERVICES.map(
    (s) => `<tr>
            <th scope="row" class="price-table__name" data-label="Szolgáltatás"><a href="${s.path}">${s.label}</a></th>
            <td class="price-table__desc" data-label="Mire vonatkozik">${s.shortDesc}</td>
            <td class="price-table__price" data-label="Induló ár">[ÁR MEGADÁSA SZÜKSÉGES]</td>
            <td class="price-table__link" data-label="Részletek"><a href="${s.path}#arak">Részletes árlista ${icons.arrowRight}</a></td>
          </tr>`
  ).join('\n          ');

  return `
  ${renderPageHero({
    label: 'Árak',
    path,
    h1: 'Kártevőirtás árak',
    lead: 'A munka menete és időigénye kártevőnként eltér, ezért minden szolgáltatáshoz külön árlista tartozik. Alább az induló árakat látja; a részletes árlistát az adott szolgáltatás oldalán találja.',
  })}

  <section class="section section--white">
    <div class="container">
      <div class="price-table-wrap">
        <table class="price-table price-table--summary">
          <thead><tr><th scope="col">Szolgáltatás</th><th scope="col">Mire vonatkozik</th><th scope="col">Induló ár</th><th scope="col"><span class="visually-hidden">Részletek</span></th></tr></thead>
          <tbody>
          ${rows}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container two-col">
      <div>
        ${renderSectionHead({ title: 'Mitől függ a végleges ár?' })}
        <ul class="checklist">
          <li>${icons.check}<span>A kártevő fajtája és a fertőzöttség mértéke</span></li>
          <li>${icons.check}<span>A kezelendő terület mérete és típusa (lakás, üzlet, telephely)</span></li>
          <li>${icons.check}<span>Hány kezelésre van szükség</span></li>
          <li>${icons.check}<span>A helyszín távolsága, megközelíthetősége és a munka sürgőssége</span></li>
        </ul>
      </div>
      <div>
        ${renderSectionHead({ title: 'Hogyan kap pontos árat?' })}
        <div class="prose">
          <p>Hívjon minket, vagy töltse ki az ajánlatkérő űrlapot. Elmondja, mit tapasztal, mi pedig megmondjuk, szükség van-e helyszíni felmérésre, és ez alapján adunk pontos árat.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--navy section--cta">
    ${renderCtaBand({ title: 'Kérdése van az árakkal kapcsolatban?', body: 'Hívjon, és telefonon elmondjuk, mire számíthat.', location: 'arak-final-cta' })}
  </section>
  `;
}

module.exports = { render };
