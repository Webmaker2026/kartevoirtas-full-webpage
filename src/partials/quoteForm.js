'use strict';
const { SERVICES } = require('../data/services');

/**
 * Ajánlatkérő űrlap. A mezőnevek (`name="..."`) PONTOSAN megegyeznek a
 * send-form.php által elfogadott mezőnevekkel — lásd public/send-form.php
 * ALLOWED_FIELDS tömbjét.
 *
 * @param {Object} [opts]
 * @param {string} [opts.presetPest] - services.js slugja, ha a form egy
 *   adott szolgáltatási landingen van, előre kiválasztja a kártevő típusát
 * @param {string} [opts.formId]
 */
function renderQuoteForm(opts = {}) {
  const formId = opts.formId || 'ajanlatkeres';
  const pestOptions = SERVICES.map(
    (s) => `<option value="${s.label}"${opts.presetPest === s.slug ? ' selected' : ''}>${s.label}</option>`
  ).join('\n            ');

  return `<form class="form" id="${formId}" action="/send-form.php" method="POST" novalidate data-quote-form data-success-url="/koszonjuk/">
        <div class="field">
          <label for="field-nev-${formId}">Teljes név <span class="req">*</span></label>
          <input type="text" id="field-nev-${formId}" name="nev" autocomplete="name" maxlength="80" required>
        </div>

        <div class="field">
          <label for="field-telefon-${formId}">Telefonszám <span class="req">*</span></label>
          <input type="tel" id="field-telefon-${formId}" name="telefonszam" autocomplete="tel" maxlength="30" required>
        </div>

        <div class="field">
          <label for="field-email">E-mail cím <span class="req">*</span></label>
          <input type="email" id="field-email" name="email" autocomplete="email" maxlength="120" required>
        </div>

        <div class="field">
          <label for="field-telepules-${formId}">Település</label>
          <input type="text" id="field-telepules-${formId}" name="telepules" autocomplete="address-level2" maxlength="80">
        </div>

        <div class="field">
          <label for="field-kartevo-${formId}">Kártevő típusa <span class="req">*</span></label>
          <select id="field-kartevo-${formId}" name="kartevo_tipusa" required>
            <option value="">Válasszon...</option>
            ${pestOptions}
          </select>
        </div>

        <div class="field">
          <label for="field-uzenet-${formId}">Üzenet</label>
          <textarea id="field-uzenet-${formId}" name="uzenet" maxlength="2000" placeholder="Röviden írja le, mit észlelt, hol és mióta."></textarea>
        </div>

        <div class="hp-field" aria-hidden="true">
          <label for="website-${formId}">Weboldal (hagyja üresen)</label>
          <input type="text" id="website-${formId}" name="website" tabindex="-1" autocomplete="off">
        </div>

        <div class="checkbox-field">
          <input type="checkbox" id="field-adatkezeles-${formId}" name="adatkezeles_elfogadva" value="elfogadva" required>
          <label for="field-adatkezeles-${formId}">Elolvastam és tudomásul vettem az <a href="/adatkezelesi-tajekoztato/" target="_blank" rel="noopener">adatkezelési tájékoztatót</a>. <span class="req">*</span></label>
        </div>

        <div class="form-status" data-form-status role="alert"></div>

        <button class="btn btn--primary btn--block" type="submit" data-form-submit>Ajánlatkérés elküldése</button>
      </form>`;
}

module.exports = { renderQuoteForm };
