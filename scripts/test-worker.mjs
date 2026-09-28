#!/usr/bin/env node
/**
 * Függőségmentes füstteszt a Cloudflare Worker űrlap-backendhez.
 * A Turnstile és a Resend hívásokat a globális fetch felülírásával
 * szimulálja — valódi hálózati kérés és valódi kulcs nincs benne.
 *
 * Futtatás: node scripts/test-worker.mjs   (Node 18+)
 */
import assert from 'node:assert/strict';
import worker, { escapeHtml } from '../worker/index.mjs';

const ORIGIN = 'https://pelda.hu';
const sent = [];
let turnstileSuccess = true;
let resendStatus = 200;

globalThis.fetch = async (url, init) => {
  if (String(url).includes('turnstile')) {
    return new Response(JSON.stringify({ success: turnstileSuccess, 'error-codes': turnstileSuccess ? [] : ['invalid-input-response'] }));
  }
  if (String(url).includes('resend')) {
    sent.push(JSON.parse(init.body));
    return new Response('{}', { status: resendStatus });
  }
  throw new Error('Váratlan fetch: ' + url);
};

const env = {
  ASSETS: { fetch: async () => new Response('asset') },
  TURNSTILE_SITE_KEY: 'site-key',
  TURNSTILE_SECRET_KEY: 'secret',
  RESEND_API_KEY: 'key',
  MAIL_FROM: 'Weboldal <ajanlat@pelda.hu>',
  LEAD_RECIPIENT_EMAIL: 'iroda@pelda.hu',
  SUCCESS_URL: '/koszonjuk/',
};

function validFields(overrides = {}) {
  return {
    nev: 'Teszt Elek',
    telefonszam: '+36 30 123 4567',
    telepules: 'Budapest XI.',
    email: '',
    szolgaltatas: 'csotanyirtas',
    uzenet: 'A konyhában <b>látok</b> csótányt.',
    forras_oldal: '/csotanyirtas/?utm_source=google',
    adatkezeles_elfogadva: 'igen',
    kv_hp: '',
    'cf-turnstile-response': 'token',
    ...overrides,
  };
}

function post(fields, { accept = 'application/json', origin = ORIGIN, method = 'POST', path = '/api/ajanlatkeres', envOverride = {} } = {}) {
  const body = new FormData();
  for (const [k, v] of Object.entries(fields)) body.append(k, v);
  const headers = { Accept: accept, Referer: ORIGIN + '/csotanyirtas/' };
  if (origin) headers.Origin = origin;
  const req = new Request(ORIGIN + path, { method, headers, body: method === 'GET' ? undefined : body });
  return worker.fetch(req, { ...env, ...envOverride });
}

let passed = 0;
async function test(name, fn) {
  await fn();
  passed++;
  console.log('  ok  ', name);
}

await test('sikeres beküldés → e-mail + ok:true', async () => {
  sent.length = 0;
  const res = await post(validFields());
  const data = await res.json();
  assert.equal(res.status, 200);
  assert.equal(data.ok, true);
  assert.equal(data.redirect, '/koszonjuk/');
  assert.equal(sent.length, 1);
  assert.deepEqual(sent[0].to, ['iroda@pelda.hu']);
  assert.match(sent[0].subject, /Csótányirtás/);
  assert.ok(sent[0].html.includes('&lt;b&gt;látok&lt;/b&gt;'), 'az üzenet HTML-escape-elve kerül az e-mailbe');
  assert.ok(!sent[0].html.includes('<b>látok</b>'));
  assert.ok(sent[0].text.includes('https://pelda.hu/csotanyirtas/?utm_source=google'));
  assert.equal(sent[0].reply_to, undefined, 'e-mail nélkül nincs reply_to');
});

await test('e-mail megadásakor reply_to beállítva', async () => {
  sent.length = 0;
  await post(validFields({ email: 'ugyfel@example.com' }));
  assert.equal(sent[0].reply_to, 'ugyfel@example.com');
});

await test('GET kérés → 405, nincs feldolgozás', async () => {
  sent.length = 0;
  const res = await post({}, { method: 'GET' });
  assert.equal(res.status, 405);
  assert.equal(sent.length, 0);
});

await test('hiányzó telefonszám → 400 + mezőnév', async () => {
  const res = await post(validFields({ telefonszam: '' }));
  const data = await res.json();
  assert.equal(res.status, 400);
  assert.equal(data.field, 'telefonszam');
});

await test('érvénytelen telefonszám → 400', async () => {
  const res = await post(validFields({ telefonszam: 'hívjon' }));
  assert.equal(res.status, 400);
});

await test('hiányzó település → 400', async () => {
  const res = await post(validFields({ telepules: '   ' }));
  assert.equal((await res.json()).field, 'telepules');
});

await test('hibás e-mail → 400', async () => {
  const res = await post(validFields({ email: 'nem-email' }));
  assert.equal((await res.json()).field, 'email');
});

await test('adatkezelés elfogadása nélkül → 400', async () => {
  const res = await post(validFields({ adatkezeles_elfogadva: '' }));
  assert.equal((await res.json()).field, 'adatkezeles_elfogadva');
});

await test('manipulált szolgáltatás → 400', async () => {
  const res = await post(validFields({ szolgaltatas: '<script>' }));
  assert.equal(res.status, 400);
});

await test('túl hosszú üzenet → 400', async () => {
  const res = await post(validFields({ uzenet: 'x'.repeat(2001) }));
  assert.equal(res.status, 400);
});

await test('kitöltött honeypot → 400, nincs e-mail', async () => {
  sent.length = 0;
  const res = await post(validFields({ kv_hp: 'http://spam.example' }));
  assert.equal(res.status, 400);
  assert.equal(sent.length, 0);
});

await test('sikertelen Turnstile → 400, nincs e-mail', async () => {
  sent.length = 0;
  turnstileSuccess = false;
  const res = await post(validFields());
  turnstileSuccess = true;
  assert.equal(res.status, 400);
  assert.equal(sent.length, 0);
});

await test('hiányzó Turnstile secret → 500 (biztonságos alapállapot)', async () => {
  const res = await post(validFields(), { envOverride: { TURNSTILE_SECRET_KEY: '' } });
  assert.equal(res.status, 500);
});

await test('idegen Origin → 403', async () => {
  const res = await post(validFields(), { origin: 'https://gonosz.example' });
  assert.equal(res.status, 403);
});

await test('e-mail szolgáltató hiba → 502, nincs hamis siker', async () => {
  resendStatus = 500;
  const res = await post(validFields());
  resendStatus = 200;
  const data = await res.json();
  assert.equal(res.status, 502);
  assert.equal(data.ok, false);
  assert.ok(!/resend|500|error/i.test(data.message), 'technikai részlet nem jut a látogatóhoz');
});

await test('JS nélküli beküldés → 303 a köszönőoldalra', async () => {
  const res = await post(validFields(), { accept: 'text/html' });
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('Location'), '/koszonjuk/');
});

await test('JS nélküli hibás beküldés → 303 vissza az űrlaphoz', async () => {
  const res = await post(validFields({ nev: '' }), { accept: 'text/html' });
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('Location'), '/csotanyirtas/?hiba=1#ajanlatkeres');
});

await test('/api/form-config → site key', async () => {
  const res = await worker.fetch(new Request(ORIGIN + '/api/form-config'), env);
  assert.deepEqual(await res.json(), { turnstileSiteKey: 'site-key' });
});

await test('statikus útvonal → ASSETS', async () => {
  const res = await worker.fetch(new Request(ORIGIN + '/csotanyirtas/'), env);
  assert.equal(await res.text(), 'asset');
});

await test('escapeHtml', async () => {
  assert.equal(escapeHtml(`<a href="x">'&`), '&lt;a href=&quot;x&quot;&gt;&#39;&amp;');
});

console.log(`\n${passed} teszt sikeres.`);
