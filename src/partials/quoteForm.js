'use strict';
const { SITE } = require('../config');
const { SERVICES } = require('../data/services');

/**
 * Ajánlatkérő űrlap. A mezőnevek (`name="..."`) PONTOSAN megegyeznek a
 * Cloudflare Worker által elfogadott mezőnevekkel — lásd worker/index.mjs.
 *
 * - Szolgáltatásoldalon (`presetService` megadva) a szolgáltatás rejtett
 *   mezőben megy át, a látogatónak nem kell újra kiválasztania.
 * - Az általános (kapcsolat) oldalon választólista jelenik meg.
 * - A Turnstile widget helyét a `[data-turnstile]` elem jelöli; a
 *   main.js csak akkor tölti be, ha a Worker visszaad egy site key-t.
 *
 * @param {Object} opts
 * @param {string} opts.formId - egyedi azonosító (mező id-k előtagja)
 * @param {string} opts.sourcePath - az oldal útvonala (forrásoldal alapértéke)
 * @param {string} [opts.presetService] - services.js slugja
 */
function renderQuoteForm(opts) {
  const id = opts.formId;
  const preset = opts.presetService ? SERVICES.find((s) => s.slug === opts.presetService) : null;
  if (opts.presetService && !preset) throw new Error(`Ismeretlen szolgáltatás: ${opts.presetService}`);

  const serviceField = preset
    ? `<input type="hidden" name="szolgaltatas" value="${preset.slug}">`
    : `<div class="field">
          <label for="${id}-szolgaltatas">Milyen kártevővel van gondja? <span class="field__opt">(nem kötelező)</span></label>
          <select id="${id}-szolgaltatas" name="szolgaltatas">
            <option value="">Nem tudom / válasszon…</option>
            ${SERVICES.map((s) => `<option value="${s.slug}">${s.label}</option>`).join('\n            ')}
          </select>
        </div>`;

  return `<form class="form" id="${id}" action="${SITE.formEndpoint}" method="POST" data-quote-form data-success-url="${SITE.formSuccessUrl}" novalidate>
        <div class="form__row">
          <div class="field">
            <label for="${id}-nev">Név <span class="req" aria-hidden="true">*</span></label>
            <input type="text" id="${id}-nev" name="nev" autocomplete="name" maxlength="100" required>
          </div>
          <div class="field">
            <label for="${id}-telefon">Telefonszám <span class="req" aria-hidden="true">*</span></label>
            <input type="tel" id="${id}-telefon" name="telefonszam" autocomplete="tel" inputmode="tel" maxlength="30" required>
          </div>
        </div>

        <div class="form__row">
          <div class="field">
            <label for="${id}-telepules">Település / kerület <span class="req" aria-hidden="true">*</span></label>
            <input type="text" id="${id}-telepules" name="telepules" autocomplete="address-level2" maxlength="100" required>
          </div>
          <div class="field">
            <label for="${id}-email">E-mail cím <span class="field__opt">(nem kötelező)</span></label>
            <input type="email" id="${id}-email" name="email" autocomplete="email" maxlength="150">
          </div>
        </div>

        ${serviceField}

        <div class="field">
          <label for="${id}-uzenet">Mit tapasztalt? <span class="field__opt">(nem kötelező)</span></label>
          <textarea id="${id}-uzenet" name="uzenet" rows="4" maxlength="2000" placeholder="Pl. hol és mióta látja a kártevőt, lakás vagy üzlet, sürgős-e."></textarea>
        </div>

        <input type="hidden" name="forras_oldal" value="${opts.sourcePath}" data-source-field>

        <div class="hp-field" aria-hidden="true">
          <label for="${id}-hp">Ezt a mezőt hagyja üresen</label>
          <input type="text" id="${id}-hp" name="kv_hp" tabindex="-1" autocomplete="off">
        </div>

        <div class="checkbox-field">
          <input type="checkbox" id="${id}-adatkezeles" name="adatkezeles_elfogadva" value="igen" required>
          <label for="${id}-adatkezeles">Elolvastam és tudomásul vettem az <a href="/adatkezelesi-tajekoztato/" target="_blank" rel="noopener">adatkezelési tájékoztatót</a>. <span class="req" aria-hidden="true">*</span></label>
        </div>

        <div class="turnstile-slot" data-turnstile></div>

        <div class="form-status" data-form-status role="alert" aria-live="assertive"></div>

        <button class="btn btn--primary btn--block" type="submit" data-form-submit>Ajánlatkérés elküldése</button>
        <p class="form__note">A <span class="req" aria-hidden="true">*</span> jelölt mezők kitöltése szükséges. Sürgős esetben hívjon: <a href="${SITE.phoneHref}" data-track="call" data-location="form-note">${SITE.phoneDisplay}</a></p>
        <noscript><p class="form__note">Az űrlap küldéséhez engedélyezett JavaScript szükséges. Kérjük, hívjon minket telefonon.</p></noscript>
      </form>`;
}

module.exports = { renderQuoteForm };
