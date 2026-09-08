'use strict';
const { SITE } = require('../config');
const { renderBreadcrumb } = require('../partials/breadcrumb');

function render() {
  return `
  <section class="section--dark">
    <div class="container">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: 'Jogi / üzemeltetői információk' }])}
      <span class="eyebrow">Jogi tájékoztató</span>
      <h1 style="margin-top:.6rem">Jogi és üzemeltetői információk</h1>
    </div>
  </section>

  <section class="section--light">
    <div class="container legal-content" style="max-width:52rem">
      <h2>Üzemeltető</h2>
      <p><strong>Cégnév:</strong> ${SITE.companyFormalName}</p>
      <p><strong>Székhely:</strong> ${SITE.companySeat}</p>
      <p><strong>Cégjegyzékszám:</strong> ${SITE.companyRegNumber}</p>
      <p><strong>Adószám:</strong> ${SITE.companyTaxNumber}</p>
      <p><strong>Nyilvántartó hatóság:</strong> [CÉGBÍRÓSÁG / NYILVÁNTARTÓ HATÓSÁG MEGADÁSA SZÜKSÉGES]</p>

      <h2>Elérhetőség</h2>
      <p><strong>Telefon:</strong> ${SITE.phoneDisplay}</p>
      <p><strong>E-mail:</strong> ${SITE.email}</p>

      <h2>Tevékenységi engedélyek, képesítések</h2>
      <p>[TEVÉKENYSÉGI ENGEDÉLY / KÉPESÍTÉS MEGADÁSA SZÜKSÉGES — kizárólag ténylegesen meglévő, igazolható engedély
        vagy képesítés tüntethető fel.]</p>

      <h2>Tárhelyszolgáltató</h2>
      <p>[TÁRHELYSZOLGÁLTATÓ NEVE, SZÉKHELYE, ELÉRHETŐSÉGE MEGADÁSA SZÜKSÉGES]</p>

      <h2>Felügyeleti szervek</h2>
      <p>[ILLETÉKES FOGYASZTÓVÉDELMI / SZAKHATÓSÁGI FELÜGYELETI SZERV MEGADÁSA SZÜKSÉGES]</p>

      <h2>Szerzői jog</h2>
      <p>A weboldalon található tartalmak (szövegek, grafikai elemek) szerzői jogi védelem alatt állnak, azok
        engedély nélküli felhasználása tilos.</p>
    </div>
  </section>
  `;
}

module.exports = { render };
