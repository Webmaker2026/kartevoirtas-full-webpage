/**
 * Cloudflare Worker — statikus oldal kiszolgálása + ajánlatkérő űrlap backend.
 *
 *   GET  /api/form-config   → { turnstileSiteKey } a frontendnek (nem titkos adat)
 *   POST /api/ajanlatkeres  → validáció → spamvédelem (honeypot + Turnstile)
 *                             → e-mail küldés (Resend API) → siker / hiba
 *   minden más útvonal      → statikus fájlok a public/ mappából (ASSETS binding)
 *
 * Konfiguráció: wrangler.toml [vars] + Cloudflare secretek.
 * Részletek: CLOUDFLARE-FORM-SETUP.md. A kódban NINCS titkos adat.
 *
 * A szolgáltatáslista és a cégnév ugyanabból a forrásból jön, mint a
 * statikus oldalaké (src/data/services.js, src/config.js), így új ügyfélnél
 * a Worker kódját nem kell módosítani.
 */
import { SERVICES } from '../src/data/services.js';
import { SITE } from '../src/config.js';

const FORM_PATH = '/api/ajanlatkeres';
const CONFIG_PATH = '/api/form-config';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_API_URL = 'https://api.resend.com/emails';
const MAX_BODY_BYTES = 32 * 1024;

// Mezőnév → maximális hossz. Csak ezeket a mezőket dolgozzuk fel.
const LIMITS = {
  nev: 100,
  telefonszam: 30,
  email: 150,
  telepules: 100,
  szolgaltatas: 60,
  uzenet: 2000,
  forras_oldal: 300,
  adatkezeles_elfogadva: 10,
};
const HONEYPOT_FIELD = 'kv_hp';
const TURNSTILE_FIELD = 'cf-turnstile-response';

const MSG = {
  generic: 'Az ajánlatkérés elküldése most nem sikerült. Kérjük, próbálja újra, vagy hívjon minket telefonon.',
  invalid: 'Kérjük, ellenőrizze a megadott adatokat.',
  required: 'Kérjük, töltse ki a csillaggal jelölt mezőket.',
  phone: 'Kérjük, adjon meg érvényes telefonszámot.',
  email: 'Kérjük, ellenőrizze az e-mail címet, vagy hagyja üresen a mezőt.',
  consent: 'Az ajánlatkérés elküldéséhez el kell fogadnia az adatkezelési tájékoztatót.',
  captcha: 'A biztonsági ellenőrzés nem sikerült. Kérjük, próbálja újra, vagy hívjon minket telefonon.',
  rate: 'Túl sok próbálkozás rövid idő alatt. Kérjük, próbálja újra később, vagy hívjon minket telefonon.',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === FORM_PATH) return handleLead(request, env, url);
    if (path === CONFIG_PATH) return handleConfig(request, env);
    if (path.startsWith('/api/')) return json({ ok: false, message: 'Nem található.' }, 404);

    return env.ASSETS.fetch(request);
  },
};

/* ------------------------------------------------------------------ */
/* Frontend konfiguráció                                               */
/* ------------------------------------------------------------------ */

function handleConfig(request, env) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return json({ ok: false }, 405, { Allow: 'GET, HEAD' });
  }
  // A Turnstile site key nyilvános adat (a böngészőnek kell), de nem a
  // forráskódban él, hanem a Worker környezeti változójában.
  return json({ turnstileSiteKey: env.TURNSTILE_SITE_KEY || null }, 200, {
    'Cache-Control': 'public, max-age=300',
  });
}

/* ------------------------------------------------------------------ */
/* Ajánlatkérés                                                        */
/* ------------------------------------------------------------------ */

async function handleLead(request, env, url) {
  if (request.method !== 'POST') {
    return json({ ok: false, message: 'Ez a végpont csak POST kérést fogad.' }, 405, { Allow: 'POST' });
  }

  const wantsJson = (request.headers.get('Accept') || '').includes('application/json');
  const fail = (status, message, field) =>
    wantsJson
      ? json({ ok: false, message, ...(field ? { field } : {}) }, status)
      : redirect(backToForm(request, url));

  // 1) Eredet ellenőrzése — más oldalról küldött (cross-site) kérést nem fogadunk.
  const origin = request.headers.get('Origin');
  if (origin && !isAllowedOrigin(origin, url, env)) {
    return fail(403, MSG.generic);
  }

  // 2) Tartalomtípus és méret
  const contentType = request.headers.get('Content-Type') || '';
  if (!/^(multipart\/form-data|application\/x-www-form-urlencoded)/i.test(contentType)) {
    return fail(415, MSG.invalid);
  }
  const declaredLength = Number(request.headers.get('Content-Length') || 0);
  if (declaredLength > MAX_BODY_BYTES) return fail(413, MSG.invalid);

  // 3) Opcionális rate limit (wrangler.toml [[ratelimits]] binding: RATE_LIMITER)
  if (env.RATE_LIMITER) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    try {
      const { success } = await env.RATE_LIMITER.limit({ key: `lead:${ip}` });
      if (!success) return fail(429, MSG.rate);
    } catch (err) {
      console.error('rate_limiter_error', err && err.name);
    }
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return fail(400, MSG.invalid);
  }

  // 4) Honeypot — ha ki van töltve, bot küldte. NEM jelzünk sikert, mert a
  //    köszönőoldal konverziót mérhet; semleges hibával válaszolunk.
  const honeypot = form.get(HONEYPOT_FIELD);
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return fail(400, MSG.generic);
  }

  // 5) Mezők beolvasása, tisztítása és validálása (szerveroldalon is!)
  const parsed = parseLead(form);
  if (!parsed.ok) return fail(400, parsed.message, parsed.field);
  const lead = parsed.lead;
  lead.forrasOldal = resolveSourcePath(lead.forrasOldal, request, url);

  // 6) Turnstile ellenőrzés
  const captcha = await verifyTurnstile(form.get(TURNSTILE_FIELD), request, env);
  if (captcha === 'config-error') return fail(500, MSG.generic);
  if (captcha !== 'ok') return fail(400, MSG.captcha);

  // 7) E-mail továbbítás — csak ennek sikere után tekintjük sikeresnek a beküldést
  const sent = await sendLeadEmail(lead, env, url);
  if (!sent) return fail(502, MSG.generic);

  const successUrl = safeLocalPath(env.SUCCESS_URL || SITE.formSuccessUrl || '/koszonjuk/');
  return wantsJson ? json({ ok: true, redirect: successUrl }, 200) : redirect(successUrl);
}

/** @returns {{ok:true, lead:Object} | {ok:false, message:string, field?:string}} */
export function parseLead(form) {
  const raw = {};
  for (const [name, limit] of Object.entries(LIMITS)) {
    const value = form.get(name);
    if (value !== null && typeof value !== 'string') return { ok: false, message: MSG.invalid }; // fájl feltöltés stb.
    const text = name === 'uzenet' ? cleanMultiline(value || '') : cleanSingleLine(value || '');
    if (text.length > limit) return { ok: false, message: MSG.invalid, field: name };
    raw[name] = text;
  }

  if (!raw.nev) return { ok: false, message: MSG.required, field: 'nev' };
  if (!raw.telefonszam) return { ok: false, message: MSG.required, field: 'telefonszam' };
  if (!raw.telepules) return { ok: false, message: MSG.required, field: 'telepules' };
  if (!/^[0-9+()/\-.\s]+$/.test(raw.telefonszam) || raw.telefonszam.replace(/\D/g, '').length < 6) {
    return { ok: false, message: MSG.phone, field: 'telefonszam' };
  }
  if (raw.email && !/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(raw.email)) {
    return { ok: false, message: MSG.email, field: 'email' };
  }
  if (raw.adatkezeles_elfogadva !== 'igen') {
    return { ok: false, message: MSG.consent, field: 'adatkezeles_elfogadva' };
  }

  let service = null;
  if (raw.szolgaltatas) {
    service = SERVICES.find((s) => s.slug === raw.szolgaltatas);
    if (!service) return { ok: false, message: MSG.invalid }; // manipulált érték
  }

  return {
    ok: true,
    lead: {
      nev: raw.nev,
      telefonszam: raw.telefonszam,
      email: raw.email,
      telepules: raw.telepules,
      szolgaltatas: service ? service.label : 'Nincs megadva',
      uzenet: raw.uzenet,
      forrasOldal: raw.forras_oldal,
    },
  };
}

function cleanSingleLine(value) {
  // Vezérlőkarakterek (CR/LF is) eltávolítása, szóközök összevonása
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim();
}

function cleanMultiline(value) {
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();
}

/** Forrásoldal: csak saját oldalon belüli relatív útvonal fogadható el. */
function resolveSourcePath(value, request, url) {
  if (value && value.startsWith('/') && !value.startsWith('//')) return value;
  const referer = request.headers.get('Referer');
  if (referer) {
    try {
      const ref = new URL(referer);
      if (ref.host === url.host) return (ref.pathname + ref.search).slice(0, LIMITS.forras_oldal);
    } catch { /* érvénytelen Referer */ }
  }
  return '';
}

function isAllowedOrigin(origin, url, env) {
  if (origin === url.origin) return true;
  const extra = (env.ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);
  return extra.includes(origin);
}

function safeLocalPath(path) {
  return typeof path === 'string' && path.startsWith('/') && !path.startsWith('//') ? path : '/koszonjuk/';
}

function backToForm(request, url) {
  let path = '/kapcsolat/';
  const referer = request.headers.get('Referer');
  if (referer) {
    try {
      const ref = new URL(referer);
      if (ref.host === url.host) path = ref.pathname;
    } catch { /* marad az alapértelmezett */ }
  }
  return `${path}?hiba=1#ajanlatkeres`;
}

/* ------------------------------------------------------------------ */
/* Turnstile                                                           */
/* ------------------------------------------------------------------ */

/** @returns {Promise<'ok'|'failed'|'config-error'>} */
async function verifyTurnstile(token, request, env) {
  if (!env.TURNSTILE_SECRET_KEY) {
    // Biztonságos alapállapot: Turnstile nélkül csak kifejezett kikapcsolás
    // esetén fogadunk el ajánlatkérést (pl. helyi fejlesztés).
    if (env.TURNSTILE_DISABLED === 'true') return 'ok';
    console.error('config_error: TURNSTILE_SECRET_KEY hiányzik');
    return 'config-error';
  }
  if (typeof token !== 'string' || !token || token.length > 2048) return 'failed';

  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET_KEY);
  body.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) body.append('remoteip', ip);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body, signal: AbortSignal.timeout(8000) });
    const outcome = await res.json();
    if (outcome && outcome.success === true) return 'ok';
    console.warn('turnstile_failed', (outcome && outcome['error-codes'] || []).join(','));
    return 'failed';
  } catch (err) {
    console.error('turnstile_verify_error', err && err.name);
    return 'failed';
  }
}

/* ------------------------------------------------------------------ */
/* E-mail (Resend)                                                     */
/* ------------------------------------------------------------------ */

async function sendLeadEmail(lead, env, url) {
  const recipients = (env.LEAD_RECIPIENT_EMAIL || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!env.RESEND_API_KEY || !env.MAIL_FROM || recipients.length === 0) {
    console.error('config_error: RESEND_API_KEY / MAIL_FROM / LEAD_RECIPIENT_EMAIL hiányzik');
    return false;
  }

  const company = env.COMPANY_NAME || SITE.companyName;
  const submittedAt = formatDate(new Date());
  const sourceUrl = lead.forrasOldal ? url.origin + lead.forrasOldal : '(ismeretlen)';
  const subject = cleanSingleLine(`Új ajánlatkérés: ${lead.szolgaltatas} – ${lead.telepules}`).slice(0, 200);

  const rows = [
    ['Név', lead.nev],
    ['Telefonszám', lead.telefonszam],
    ['E-mail', lead.email || '(nincs megadva)'],
    ['Település', lead.telepules],
    ['Szolgáltatás', lead.szolgaltatas],
    ['Üzenet', lead.uzenet || '(nincs megadva)'],
    ['Forrásoldal', sourceUrl],
    ['Beküldés időpontja', submittedAt],
  ];

  const text = [
    `Új ajánlatkérés érkezett a(z) ${company} weboldaláról.`,
    '',
    ...rows.map(([k, v]) => (k === 'Üzenet' ? `${k}:\n${v}\n` : `${k}: ${v}`)),
  ].join('\n');

  const telHref = lead.telefonszam.replace(/[^0-9+]/g, '');
  const html = `<!doctype html><html lang="hu"><body style="margin:0;padding:24px;background:#f3f6fa;font-family:Arial,Helvetica,sans-serif;color:#0f1d33">
<table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin:0 auto;background:#ffffff;border-radius:8px;border-top:4px solid #ffc629">
<tr><td style="padding:24px 24px 8px"><h1 style="margin:0;font-size:20px">Új ajánlatkérés — ${escapeHtml(lead.szolgaltatas)}</h1>
<p style="margin:8px 0 0;color:#4a5a71;font-size:14px">${escapeHtml(company)} weboldal</p></td></tr>
<tr><td style="padding:8px 24px 24px"><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:15px">
${rows
  .map(([k, v]) => {
    let value = escapeHtml(v).replace(/\n/g, '<br>');
    if (k === 'Telefonszám' && telHref) value = `<a href="tel:${escapeHtml(telHref)}" style="color:#1d5cb8;font-weight:bold">${value}</a>`;
    return `<tr><th align="left" valign="top" style="padding:10px 12px 10px 0;border-bottom:1px solid #dbe3ee;color:#4a5a71;font-weight:normal;white-space:nowrap">${escapeHtml(k)}</th><td style="padding:10px 0;border-bottom:1px solid #dbe3ee">${value}</td></tr>`;
  })
  .join('\n')}
</table></td></tr></table></body></html>`;

  const payload = {
    from: env.MAIL_FROM,
    to: recipients,
    subject,
    text,
    html,
    ...(lead.email ? { reply_to: lead.email } : {}),
  };

  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      // Csak a státuszkódot naplózzuk — a lead tartalmát nem.
      console.error('email_send_failed', res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error('email_send_error', err && err.name);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Segédfüggvények                                                     */
/* ------------------------------------------------------------------ */

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(date) {
  try {
    return new Intl.DateTimeFormat('hu-HU', { timeZone: 'Europe/Budapest', dateStyle: 'long', timeStyle: 'short' }).format(date);
  } catch {
    return date.toISOString();
  }
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });
}

function redirect(location) {
  return new Response(null, { status: 303, headers: { Location: location, 'Cache-Control': 'no-store' } });
}
