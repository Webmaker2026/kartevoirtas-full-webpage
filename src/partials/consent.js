'use strict';

function renderConsent() {
  return `<div class="consent-banner" data-consent-banner data-visible="false" role="region" aria-label="Cookie tájékoztatás">
    <p>A weboldal működéséhez szükséges sütiket mindig használjuk. Analitikai és hirdetési sütiket csak az Ön
      hozzájárulásával kapcsolunk be. Részletek a <a href="/cookie-tajekoztato/">cookie tájékoztatóban</a>.</p>
    <div class="consent-banner__actions">
      <button class="btn btn--light btn--sm" type="button" data-consent-accept-all>Mindet elfogadom</button>
      <button class="btn btn--light btn--sm" type="button" data-consent-reject>Csak a szükséges</button>
      <button class="btn btn--text-light btn--sm" type="button" data-consent-open-settings>Beállítások</button>
    </div>
  </div>

  <div class="consent-modal" data-consent-modal data-visible="false" role="dialog" aria-modal="true" aria-labelledby="consent-modal-title">
    <div class="consent-modal__scrim" data-consent-close-modal></div>
    <div class="consent-modal__panel">
      <h2 id="consent-modal-title" class="consent-modal__title">Cookie-beállítások</h2>
      <p class="consent-modal__intro">Válassza ki, mely kategóriákat engedélyezi. A döntését bármikor módosíthatja a lábléc „Cookie-beállítások” gombjával.</p>

      <div class="consent-row">
        <div>
          <h3>Szükséges</h3>
          <p>A weboldal alapműködéséhez (pl. navigáció, cookie-döntés megjegyzése) elengedhetetlen. Nem kapcsolható ki.</p>
        </div>
        <span class="switch"><input type="checkbox" checked disabled aria-label="Szükséges sütik, mindig aktív"><span class="switch__track"></span></span>
      </div>

      <div class="consent-row">
        <div>
          <h3 id="consent-analytics-label">Analitika</h3>
          <p>Segít megérteni, hogyan használják a látogatók az oldalt (pl. GA4). Csak hozzájárulással aktiválódik.</p>
        </div>
        <span class="switch"><input type="checkbox" id="consent-analytics" aria-labelledby="consent-analytics-label"><span class="switch__track"></span></span>
      </div>

      <div class="consent-row">
        <div>
          <h3 id="consent-ads-label">Hirdetés / mérés</h3>
          <p>Google Ads konverziómérés és hirdetési személyre szabás. Csak hozzájárulással aktiválódik.</p>
        </div>
        <span class="switch"><input type="checkbox" id="consent-ads" aria-labelledby="consent-ads-label"><span class="switch__track"></span></span>
      </div>

      <div class="consent-modal__actions">
        <button class="btn btn--primary" type="button" data-consent-save>Beállítások mentése</button>
        <button class="btn btn--outline" type="button" data-consent-close-modal>Mégse</button>
      </div>
    </div>
  </div>`;
}

module.exports = { renderConsent };
