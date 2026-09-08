'use strict';

function renderConsent() {
  return `<div class="consent-banner" data-consent-banner data-visible="false" role="region" aria-label="Cookie tájékoztatás">
    <p>Weboldalunkon a működéshez szükséges sütiket mindig használjuk. Az analitikai és hirdetési célú sütiket csak
      az Ön hozzájárulása alapján aktiváljuk. Részletek a <a href="/cookie-tajekoztato/">cookie tájékoztatóban</a>.</p>
    <div class="consent-banner__actions">
      <button class="btn btn--primary btn--sm" type="button" data-consent-accept-all>Mindet elfogadom</button>
      <button class="btn btn--outline btn--sm" type="button" data-consent-reject>Csak a szükséges</button>
      <button class="btn btn--ghost btn--sm" type="button" data-consent-open-settings>Beállítások</button>
    </div>
  </div>

  <div class="consent-modal" data-consent-modal data-visible="false" role="dialog" aria-modal="true" aria-labelledby="consent-modal-title">
    <div class="consent-modal__scrim" data-consent-close-modal></div>
    <div class="consent-modal__panel">
      <h3 id="consent-modal-title">Cookie-beállítások</h3>
      <p class="muted" style="margin-top:.5rem">Válassza ki, mely kategóriákat engedélyezi. A döntését bármikor módosíthatja a lábléc "Cookie-beállítások" gombjával.</p>

      <div class="consent-row">
        <div>
          <h4>Szükséges</h4>
          <p>A weboldal alapműködéséhez (pl. navigáció, cookie-döntés megjegyzése) elengedhetetlen. Nem kapcsolható ki.</p>
        </div>
        <span class="switch"><input type="checkbox" checked disabled aria-label="Szükséges sütik, mindig aktív"><span class="switch__track"></span></span>
      </div>

      <div class="consent-row">
        <div>
          <h4>Analitika</h4>
          <p>Segít megérteni, hogyan használják a látogatók az oldalt (pl. GA4). Csak hozzájárulással aktiválódik.</p>
        </div>
        <span class="switch"><input type="checkbox" id="consent-analytics"><span class="switch__track"></span></span>
      </div>

      <div class="consent-row">
        <div>
          <h4>Hirdetés / mérés</h4>
          <p>Google Ads konverziómérés és hirdetési személyre szabás. Csak hozzájárulással aktiválódik.</p>
        </div>
        <span class="switch"><input type="checkbox" id="consent-ads"><span class="switch__track"></span></span>
      </div>

      <div class="consent-modal__actions">
        <button class="btn btn--primary" type="button" data-consent-save>Beállítások mentése</button>
        <button class="btn btn--outline" type="button" data-consent-close-modal>Mégse</button>
      </div>
    </div>
  </div>`;
}

module.exports = { renderConsent };
