(function () {
  'use strict';

  /* ============================================================
     Consent Mode v2 előkészítés
     Nincs valós GA4/GTM/Ads azonosító a projektben — ez a blokk
     kizárólag a jogszabályi alapállapotot és a tárolt felhasználói
     döntés visszaolvasását/alkalmazását végzi. A tényleges GTM
     snippet a mérési azonosítók megérkezésekor ide illeszthető,
     a consent parancsok UTÁN.
     ============================================================ */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var CONSENT_KEY = 'kv_consent_v1';

  function defaultConsent() {
    return {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functional: true
    };
  }

  function readConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(consent) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch (e) { /* privát böngészés esetén nem kritikus */ }
  }

  function applyConsent(consent) {
    gtag('consent', 'update', {
      ad_storage: consent.ad_storage,
      analytics_storage: consent.analytics_storage,
      ad_user_data: consent.ad_user_data,
      ad_personalization: consent.ad_personalization
    });
    document.dispatchEvent(new CustomEvent('kv:consent-updated', { detail: consent }));
  }

  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  /* ============================================================
     Mobil navigáció
     ============================================================ */
  function initMobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var panel = document.querySelector('[data-mobile-nav]');
    var closeBtn = document.querySelector('[data-nav-close]');
    var scrim = panel ? panel.querySelector('[data-nav-scrim]') : null;
    if (!toggle || !panel) return;

    function open() {
      panel.setAttribute('data-open', 'true');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var firstLink = panel.querySelector('a,button');
      if (firstLink) firstLink.focus({ preventScroll: true });
    }
    function close() {
      panel.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus({ preventScroll: true });
    }
    toggle.addEventListener('click', function () {
      var isOpen = panel.getAttribute('data-open') === 'true';
      isOpen ? close() : open();
    });
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (scrim) scrim.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.getAttribute('data-open') === 'true') close();
    });
  }

  /* ============================================================
     Cookie consent banner + preferencia modal
     ============================================================ */
  function initConsent() {
    var banner = document.querySelector('[data-consent-banner]');
    var modal = document.querySelector('[data-consent-modal]');
    if (!banner || !modal) return;

    var acceptAllBtns = document.querySelectorAll('[data-consent-accept-all]');
    var rejectBtns = document.querySelectorAll('[data-consent-reject]');
    var openSettingsBtns = document.querySelectorAll('[data-consent-open-settings]');
    var saveBtn = modal.querySelector('[data-consent-save]');
    var closeModalBtns = modal.querySelectorAll('[data-consent-close-modal]');
    var analyticsToggle = modal.querySelector('#consent-analytics');
    var adsToggle = modal.querySelector('#consent-ads');

    var stored = readConsent();
    if (!stored) {
      banner.setAttribute('data-visible', 'true');
    } else {
      applyConsent(stored);
    }

    function showBanner(v) { banner.setAttribute('data-visible', v ? 'true' : 'false'); }
    function showModal(v) {
      modal.setAttribute('data-visible', v ? 'true' : 'false');
      if (v) {
        var current = readConsent() || defaultConsent();
        if (analyticsToggle) analyticsToggle.checked = current.analytics_storage === 'granted';
        if (adsToggle) adsToggle.checked = current.ad_storage === 'granted';
      }
    }

    acceptAllBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var consent = {
          ad_storage: 'granted', analytics_storage: 'granted',
          ad_user_data: 'granted', ad_personalization: 'granted', functional: true
        };
        writeConsent(consent); applyConsent(consent); showBanner(false); showModal(false);
      });
    });
    rejectBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var consent = defaultConsent();
        writeConsent(consent); applyConsent(consent); showBanner(false); showModal(false);
      });
    });
    openSettingsBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        showModal(true);
      });
    });
    closeModalBtns.forEach(function (btn) { btn.addEventListener('click', function () { showModal(false); }); });
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        var consent = {
          ad_storage: adsToggle && adsToggle.checked ? 'granted' : 'denied',
          analytics_storage: analyticsToggle && analyticsToggle.checked ? 'granted' : 'denied',
          ad_user_data: adsToggle && adsToggle.checked ? 'granted' : 'denied',
          ad_personalization: adsToggle && adsToggle.checked ? 'granted' : 'denied',
          functional: true
        };
        writeConsent(consent); applyConsent(consent); showBanner(false); showModal(false);
      });
    }
  }

  /* ============================================================
     Ajánlatkérő űrlap
     - honeypot + időzített kitöltés-ellenőrzés (bot-védelem)
     - fetch a send-form.php felé, csak tényleges siker esetén
       navigál a /koszonjuk/ oldalra
     - Vercel previewn a PHP nem fut: ekkor barátságos hibaüzenet,
       de NEM hamis siker
     ============================================================ */
  function initQuoteForm() {
    var form = document.querySelector('[data-quote-form]');
    if (!form) return;
    var loadedAt = Date.now();
    var statusEl = form.querySelector('[data-form-status]');
    var submitBtn = form.querySelector('[data-form-submit]');

    function setStatus(state, message) {
      if (!statusEl) return;
      statusEl.textContent = message || '';
      if (state) statusEl.setAttribute('data-state', state);
      else statusEl.removeAttribute('data-state');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setStatus(null, '');

      if (Date.now() - loadedAt < 2500) {
        setStatus('error', 'Kérjük, egy pillanat múlva próbálja újra a küldést.');
        return;
      }

      var required = form.querySelectorAll('[required]');
      var firstInvalid = null;
      required.forEach(function (field) {
        if (!field.value || (field.type === 'checkbox' && !field.checked)) {
          if (!firstInvalid) firstInvalid = field;
        }
      });
      if (firstInvalid) {
        setStatus('error', 'Kérjük, töltse ki a csillaggal jelölt kötelező mezőket.');
        firstInvalid.focus();
        return;
      }

      var emailField = form.querySelector('#field-email');
      if (emailField && emailField.value) {
        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value);
        if (!emailOk) {
          setStatus('error', 'Kérjük, adjon meg érvényes e-mail címet.');
          emailField.focus();
          return;
        }
      }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.setAttribute('aria-busy', 'true'); }

      var formData = new FormData(form);

      fetch(form.getAttribute('action') || 'send-form.php', {
        method: 'POST',
        body: formData,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      }).then(function (res) {
        if (!res.ok) throw new Error('server-error');
        return res.json().catch(function () { throw new Error('bad-response'); });
      }).then(function (data) {
        if (data && data.success) {
          gtag('event', 'generate_lead', { method: 'form', form_id: form.id || 'ajanlatkeres' });
          window.location.href = form.getAttribute('data-success-url') || '/koszonjuk/';
        } else {
          setStatus('error', (data && data.message) || 'A küldés sikertelen volt. Kérjük, próbálja meg telefonon felvenni velünk a kapcsolatot.');
        }
      }).catch(function () {
        setStatus('error', 'A küldés jelenleg nem elérhető (pl. előnézeti környezetben a PHP nem fut). Éles tárhelyen a form működik — addig kérjük, hívjon minket telefonon.');
      }).finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.removeAttribute('aria-busy'); }
      });
    });
  }

  /* ============================================================
     Mikrokonverzió-jelölés: telefon és CTA kattintások
     ============================================================ */
  function initMicroConversions() {
    document.querySelectorAll('[data-track="call"]').forEach(function (el) {
      el.addEventListener('click', function () {
        gtag('event', 'call_click', { link_location: el.getAttribute('data-location') || 'unknown' });
      });
    });
    document.querySelectorAll('[data-track="quote-cta"]').forEach(function (el) {
      el.addEventListener('click', function () {
        gtag('event', 'quote_cta_click', { link_location: el.getAttribute('data-location') || 'unknown' });
      });
    });
  }

  function initStickyBodyPadding() {
    if (document.querySelector('.sticky-cta')) {
      document.body.classList.add('has-sticky-cta');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initConsent();
    initQuoteForm();
    initMicroConversions();
    initStickyBodyPadding();
  });
})();
