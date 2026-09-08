'use strict';
const { renderBreadcrumb } = require('../partials/breadcrumb');

function render() {
  return `
  <section class="section--dark">
    <div class="container">
      ${renderBreadcrumb([{ label: 'Főoldal', path: '/' }, { label: 'Cookie tájékoztató' }])}
      <span class="eyebrow">Jogi tájékoztató</span>
      <h1 style="margin-top:.6rem">Cookie (süti) tájékoztató</h1>
      <p class="lead" style="margin-top:1rem;max-width:44rem">
        A weboldal sütiket (cookie-kat) használ. Az alábbiakban bemutatjuk a süti-kategóriákat, és azt, hogyan
        módosíthatja a hozzájárulását bármikor.
      </p>
    </div>
  </section>

  <section class="section--light">
    <div class="container legal-content" style="max-width:52rem">
      <h2>Mik azok a sütik?</h2>
      <p>A sütik kisméretű szövegfájlok, amelyeket a böngészője tárol a weboldal működéséhez, illetve a látogatottság
        méréséhez és a hirdetések hatékonyságának méréséhez.</p>

      <h2>Süti-kategóriák</h2>
      <p><strong>Szükséges sütik</strong> — a weboldal alapműködéséhez (pl. a cookie-döntés megjegyzéséhez,
        navigációhoz) elengedhetetlenek, ezek nem kapcsolhatók ki.</p>
      <p><strong>Analitikai sütik</strong> — a látogatottság és a felhasználói viselkedés megértését szolgálják
        (pl. Google Analytics / GA4). Kizárólag hozzájárulás esetén aktiválódnak.</p>
      <p><strong>Hirdetési / mérési sütik</strong> — a Google Ads konverziómérést és a hirdetési személyre szabást
        szolgálják. Kizárólag hozzájárulás esetén aktiválódnak.</p>

      <h2>Consent Mode v2</h2>
      <p>A weboldal Google Consent Mode v2 kezelésre van előkészítve: az Ön döntéséig az <code>ad_storage</code>,
        <code>analytics_storage</code>, <code>ad_user_data</code> és <code>ad_personalization</code> alapértelmezett
        állapota elutasított. A hozzájárulását követően ezek az állapotok a döntésének megfelelően frissülnek.
        A weboldalon jelenleg nincs éles Google Analytics, Google Tag Manager vagy Google Ads mérőkód beállítva —
        ezek hozzáadása után ez a tájékoztató a tényleges mérőkódok és sütik listájával egészítendő ki.</p>

      <h2>Konkrét sütik listája</h2>
      <div class="price-table-wrap">
        <table class="price-table">
          <thead><tr><th>Süti neve</th><th>Kategória</th><th>Cél</th><th>Élettartam</th></tr></thead>
          <tbody>
            <tr><td>kv_consent_v1</td><td>Szükséges</td><td>A cookie-döntés megjegyzése</td><td>Böngésző local storage, visszavonásig</td></tr>
            <tr><td>[SÜTINÉV MEGADÁSA SZÜKSÉGES]</td><td>Analitikai</td><td>[CÉL MEGADÁSA SZÜKSÉGES]</td><td>[ÉLETTARTAM MEGADÁSA SZÜKSÉGES]</td></tr>
            <tr><td>[SÜTINÉV MEGADÁSA SZÜKSÉGES]</td><td>Hirdetési</td><td>[CÉL MEGADÁSA SZÜKSÉGES]</td><td>[ÉLETTARTAM MEGADÁSA SZÜKSÉGES]</td></tr>
          </tbody>
        </table>
      </div>

      <h2>A hozzájárulás módosítása</h2>
      <p>Döntését bármikor módosíthatja a weboldal láblécében található „Cookie-beállítások” gombra kattintva.</p>
    </div>
  </section>
  `;
}

module.exports = { render };
