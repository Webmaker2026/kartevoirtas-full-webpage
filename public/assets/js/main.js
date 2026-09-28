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
    if (!toggle || !panel) return;

    function isOpen() { return panel.getAttribute('data-open') === 'true'; }
    function open() {
      panel.setAttribute('data-open', 'true');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var firstLink = panel.querySelector('a,button');
      if (firstLink) firstLink.focus({ preventScroll: true });
    }
    function close(returnFocus) {
      panel.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (returnFocus) toggle.focus({ preventScroll: true });
    }
    toggle.addEventListener('click', function () {
      isOpen() ? close(true) : open();
    });
    // Linkre kattintva (pl. oldalon belüli horgony) a menü bezárul
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) close(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) close(true);
    });
    // Asztali szélességre váltáskor ne maradjon zárolva a görgetés
    window.addEventListener('resize', function () {
      if (isOpen() && window.innerWidth >= 1080) close(false);
    });
  }

  /* ============================================================
     Asztali "Szolgáltatások" legördülő menü
     - CSS-hover/focus-within nyitja-zárja a menüt, ez a blokk csak
       az aria-expanded állapotot és az Escape-kilépést kezeli
     ============================================================ */
  function initDesktopDropdowns() {
    document.querySelectorAll('.has-dropdown').forEach(function (li) {
      var trigger = li.querySelector('[data-dropdown-trigger]');
      if (!trigger) return;
      var suppressReopen = false;

      function setExpanded(open) {
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      }

      li.addEventListener('mouseenter', function () {
        li.removeAttribute('data-closed');
        setExpanded(true);
      });
      li.addEventListener('mouseleave', function () { setExpanded(false); });
      li.addEventListener('focusin', function () {
        // Escape után a trigger.focus() is 'focusin'-t vált ki — ezt az
        // egy alkalmat kihagyjuk, különben azonnal újranyitná a menüt.
        if (suppressReopen) { suppressReopen = false; return; }
        li.removeAttribute('data-closed');
        setExpanded(true);
      });
      li.addEventListener('focusout', function (e) {
        if (!li.contains(e.relatedTarget)) setExpanded(false);
      });
      li.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          li.setAttribute('data-closed', 'true');
          setExpanded(false);
          suppressReopen = true;
          trigger.focus();
        }
      });
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
     Ajánlatkérő űrlap → Cloudflare Worker (POST /api/ajanlatkeres)
     - kliensoldali előellenőrzés (a Worker szerveroldalon is validál)
     - honeypot + időzített kitöltés-ellenőrzés (bot-védelem)
     - Cloudflare Turnstile: csak akkor töltődik be, ha a Worker
       (/api/form-config) visszaad site key-t, és csak amikor az űrlap
       a képernyő közelébe ér — így nem lassítja az oldalbetöltést
     - CSAK tényleges szerveroldali siker (validáció + spamszűrés +
       e-mail továbbítás) után navigál a /koszonjuk/ oldalra
     ============================================================ */
  var MSG_SEND_FAILED = 'Az ajánlatkérés elküldése most nem sikerült. Kérjük, próbálja újra, vagy hívjon minket telefonon.';
  var MSG_REQUIRED = 'Kérjük, töltse ki a csillaggal jelölt mezőket.';

  var turnstileConfig = null; // Promise<{siteKey:string|null}>
  var turnstileScript = null; // Promise<void>

  function getFormConfig() {
    if (!turnstileConfig) {
      turnstileConfig = fetch('/api/form-config', { headers: { Accept: 'application/json' } })
        .then(function (res) { return res.ok ? res.json() : {}; })
        .then(function (data) { return { siteKey: (data && data.turnstileSiteKey) || null }; })
        .catch(function () { return { siteKey: null }; });
    }
    return turnstileConfig;
  }

  function loadTurnstileScript() {
    if (!turnstileScript) {
      turnstileScript = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        s.async = true;
        s.onload = function () { resolve(); };
        s.onerror = function () { reject(new Error('turnstile-load')); };
        document.head.appendChild(s);
      });
    }
    return turnstileScript;
  }

  function setupTurnstile(form) {
    var slot = form.querySelector('[data-turnstile]');
    if (!slot) return;
    var started = false;

    function start() {
      if (started) return;
      started = true;
      getFormConfig().then(function (cfg) {
        if (!cfg.siteKey) return;
        form.setAttribute('data-turnstile-required', 'true');
        return loadTurnstileScript().then(function () {
          if (!window.turnstile) return;
          var widgetId = window.turnstile.render(slot, {
            sitekey: cfg.siteKey,
            language: 'hu',
            // 300px alatti szélességen a kompakt widget fér ki vízszintes görgetés nélkül
            size: slot.clientWidth && slot.clientWidth < 300 ? 'compact' : 'flexible',
            'refresh-expired': 'auto'
          });
          form._turnstileWidgetId = widgetId;
        });
      }).catch(function () {
        // A script nem töltődött be — a beküldéskor a Worker jelez hibát,
        // a látogató pedig a telefonszámot kapja alternatívaként.
      });
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); start(); }
      }, { rootMargin: '600px 0px' });
      io.observe(form);
    } else {
      start();
    }
    form.addEventListener('focusin', start);
  }

  function initQuoteForms() {
    document.querySelectorAll('[data-quote-form]').forEach(initQuoteForm);
  }

  function initQuoteForm(form) {
    var loadedAt = Date.now();
    var statusEl = form.querySelector('[data-form-status]');
    var submitBtn = form.querySelector('[data-form-submit]');
    var sourceField = form.querySelector('[data-source-field]');

    // Forrásoldal: útvonal + query string (pl. utm_*, gclid) — az Ads
    // kampányok visszakövetéséhez. A Worker hosszra vágja és ellenőrzi.
    if (sourceField) {
      sourceField.value = (window.location.pathname + window.location.search).slice(0, 300);
    }

    setupTurnstile(form);

    function setStatus(state, message) {
      if (!statusEl) return;
      statusEl.textContent = message || '';
      if (state) statusEl.setAttribute('data-state', state);
      else statusEl.removeAttribute('data-state');
    }

    function markInvalid(field, invalid) {
      if (invalid) field.setAttribute('aria-invalid', 'true');
      else field.removeAttribute('aria-invalid');
    }

    function resetTurnstile() {
      if (window.turnstile && form._turnstileWidgetId !== undefined) {
        try { window.turnstile.reset(form._turnstileWidgetId); } catch (e) { /* nem kritikus */ }
      }
    }

    // JavaScript nélküli (vagy hibás) beküldés után a Worker ?hiba=1 paraméterrel irányít vissza
    if (/[?&]hiba=1(&|$)/.test(window.location.search)) {
      setStatus('error', MSG_SEND_FAILED);
    }

    form.addEventListener('input', function (e) {
      if (e.target && e.target.getAttribute('aria-invalid') === 'true') markInvalid(e.target, false);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setStatus(null, '');

      if (Date.now() - loadedAt < 2500) {
        setStatus('error', 'Kérjük, egy pillanat múlva próbálja újra a küldést.');
        return;
      }

      var firstInvalid = null;
      form.querySelectorAll('[required]').forEach(function (field) {
        var empty = field.type === 'checkbox' ? !field.checked : !field.value.trim();
        markInvalid(field, empty);
        if (empty && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        setStatus('error', MSG_REQUIRED);
        firstInvalid.focus();
        return;
      }

      var phoneField = form.querySelector('[name="telefonszam"]');
      if (phoneField && (phoneField.value.replace(/\D/g, '').length < 6 || !/^[0-9+()\/\-.\s]+$/.test(phoneField.value.trim()))) {
        markInvalid(phoneField, true);
        setStatus('error', 'Kérjük, adjon meg érvényes telefonszámot.');
        phoneField.focus();
        return;
      }

      var emailField = form.querySelector('[name="email"]');
      if (emailField && emailField.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        markInvalid(emailField, true);
        setStatus('error', 'Kérjük, ellenőrizze az e-mail címet, vagy hagyja üresen a mezőt.');
        emailField.focus();
        return;
      }

      var formData = new FormData(form);
      if (form.getAttribute('data-turnstile-required') === 'true' && !formData.get('cf-turnstile-response')) {
        setStatus('error', 'Kérjük, várja meg, amíg a biztonsági ellenőrzés lefut az űrlap alján, majd küldje el újra.');
        return;
      }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.setAttribute('aria-busy', 'true'); }

      fetch(form.getAttribute('action'), {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        return res.json().catch(function () { return { ok: false }; });
      }).then(function (data) {
        if (data && data.ok) {
          gtag('event', 'generate_lead', { method: 'form', form_id: form.id || 'ajanlatkeres' });
          window.location.href = form.getAttribute('data-success-url') || '/koszonjuk/';
          return;
        }
        if (data && data.field) {
          var bad = form.querySelector('[name="' + data.field + '"]');
          if (bad) { markInvalid(bad, true); bad.focus(); }
        }
        setStatus('error', (data && data.message) || MSG_SEND_FAILED);
        resetTurnstile();
        if (submitBtn) { submitBtn.disabled = false; submitBtn.removeAttribute('aria-busy'); }
      }).catch(function () {
        setStatus('error', MSG_SEND_FAILED);
        resetTurnstile();
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

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initDesktopDropdowns();
    initConsent();
    initQuoteForms();
    initMicroConversions();
  });
})();
