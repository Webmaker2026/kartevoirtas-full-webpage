# Cloudflare Worker — ajánlatkérő űrlap beállítása

> Belső dokumentum. A weboldal egyetlen Cloudflare Workerként fut: a Worker szolgálja ki a `public/` mappa
> statikus fájljait, és ugyanez a Worker fogadja az ajánlatkérő űrlapot. PHP nincs.

```
HTML form (minden szolgáltatásoldal + /kapcsolat/)
  → POST /api/ajanlatkeres            (worker/index.mjs)
  → szerveroldali validáció           (kötelező mezők, telefonszám, hosszak, hozzájárulás, szolgáltatás-slug)
  → spamvédelem                       (Origin-ellenőrzés, honeypot, Cloudflare Turnstile, opcionális rate limit)
  → e-mail küldés                     (Resend API)
  → siker: JSON { ok: true } → a böngésző a /koszonjuk/ oldalra navigál
  → hiba:  JSON { ok: false, message } → magyar hibaüzenet az űrlapon, telefonos alternatívával
```

Érintett fájlok:

| Fájl | Szerep |
|---|---|
| `wrangler.toml` | Worker + statikus assetek konfigurációja, nem titkos változók (`[vars]`) |
| `worker/index.mjs` | Az endpoint kódja (validáció, Turnstile, e-mail) |
| `src/partials/quoteForm.js` | Az űrlap HTML-je (mezőnevek = a Worker által várt nevek) |
| `public/assets/js/main.js` | Kliensoldali ellenőrzés, Turnstile betöltés, beküldés, átirányítás |
| `src/data/services.js` | Szolgáltatáslista — a Worker ebből validálja a `szolgaltatas` mezőt |
| `.dev.vars.example` | Minta a helyi fejlesztéshez (`.dev.vars`, NEM kerül Gitbe) |
| `scripts/test-worker.mjs` | Függőségmentes füstteszt (mockolt Turnstile / Resend) |
| `public/_headers` | Biztonsági és cache fejlécek a statikus fájlokra (a régi `.htaccess` utódja) |

---

## 1. Cloudflare beállítás

1. Cloudflare fiók, a domain hozzáadva a Cloudflare-hez (DNS a Cloudflare-en).
2. Wrangler (Cloudflare CLI) — nem kell telepíteni a projektbe, `npx`-szel fut (Node 18+):
   ```bash
   npx wrangler login
   ```
3. `wrangler.toml` → `name`: ügyfelenként egyedi név (ebből lesz a `*.workers.dev` cím is).
4. Élesítéskor az egyedi domaint a `wrangler.toml` `routes` blokkjában (custom_domain) vagy a dashboardon
   (Workers & Pages → a Worker → Settings → Domains & Routes) kell hozzárendelni.
5. Account ID-t nem kell a fájlba írni: a wrangler a bejelentkezett fiókot használja. CI-ből a
   `CLOUDFLARE_ACCOUNT_ID` és `CLOUDFLARE_API_TOKEN` környezeti változókkal.

## 2. Környezeti változók és secretek

| Név | Típus | Hol állítjuk | Példa / megjegyzés |
|---|---|---|---|
| `LEAD_RECIPIENT_EMAIL` | var | `wrangler.toml [vars]` | `ajanlat@ugyfeldomain.hu` — több cím vesszővel |
| `MAIL_FROM` | var | `wrangler.toml [vars]` | `Weboldal <ajanlat@ugyfeldomain.hu>` — Resendben hitelesített domainről |
| `COMPANY_NAME` | var | `wrangler.toml [vars]` | Üresen a `src/config.js` `companyName` értéke |
| `TURNSTILE_SITE_KEY` | var | `wrangler.toml [vars]` | Nyilvános kulcs; a frontend a `/api/form-config` végponton kapja meg |
| `SUCCESS_URL` | var | `wrangler.toml [vars]` | Alapból `/koszonjuk/` |
| `ALLOWED_ORIGINS` | var | `wrangler.toml [vars]` | Opcionális, pl. `https://www.ugyfeldomain.hu` ha www és non-www is él |
| `RESEND_API_KEY` | **secret** | `npx wrangler secret put RESEND_API_KEY` | Soha ne kerüljön fájlba |
| `TURNSTILE_SECRET_KEY` | **secret** | `npx wrangler secret put TURNSTILE_SECRET_KEY` | Soha ne kerüljön fájlba |
| `TURNSTILE_DISABLED` | var | csak `.dev.vars` | `true` = Turnstile nélküli helyi teszt. Élesben NE |

Secretek beállítása (interaktívan kéri az értéket, nem kerül a shell history-ba):

```bash
npx wrangler secret put RESEND_API_KEY
```

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
```

> Biztonságos alapállapot: ha a `TURNSTILE_SECRET_KEY` nincs beállítva (és a `TURNSTILE_DISABLED` sem `true`),
> a Worker **nem fogad el** ajánlatkérést, és a naplóba `config_error` kerül. Ugyanígy, ha az e-mail
> beállítás hiányos, a látogató hibaüzenetet kap — hamis siker és konverzió nem keletkezik.

## 3. Turnstile beállítása

1. Cloudflare dashboard → **Turnstile** → *Add widget*.
2. Widget neve: az ügyfél neve. Hostnames: az éles domain (és ha kell, a `www` változat, valamint a
   `*.workers.dev` cím tesztelésre).
3. Widget mode: **Managed** (ajánlott).
4. A kapott **Site Key** → `wrangler.toml` `TURNSTILE_SITE_KEY`.
5. A kapott **Secret Key** → `npx wrangler secret put TURNSTILE_SECRET_KEY`.

A widget csak az űrlapot tartalmazó oldalakon, és csak akkor töltődik be, amikor az űrlap a képernyő közelébe
ér (nem lassítja a mobil első betöltést). 300 px-nél keskenyebb helyen kompakt méretben jelenik meg.

## 4. E-mail küldés beállítása (Resend)

A Worker a [Resend](https://resend.com) HTTP API-ját használja (egyetlen `fetch` hívás, nincs SDK /
függőség). Ingyenes csomaggal is működik alacsony lead-számnál.

1. Resend fiók → **Domains** → *Add domain* → az ügyfél domainje (ajánlott aldomain, pl. `mail.ugyfeldomain.hu`).
2. A Resend által megadott DNS rekordokat (SPF/DKIM, opcionálisan DMARC) fel kell venni a Cloudflare DNS-be,
   majd megvárni a *Verified* állapotot.
3. **API Keys** → *Create API key* → jogosultság: *Sending access*, lehetőleg csak erre a domainre.
4. A kulcs → `npx wrangler secret put RESEND_API_KEY`.
5. `MAIL_FROM` a hitelesített domainről: pl. `Weboldal <ajanlat@mail.ugyfeldomain.hu>`.
6. `LEAD_RECIPIENT_EMAIL`: ahová a leadek érkeznek.

A lead e-mail tartalma: név, telefonszám (kattintható), e-mail (ha megadta — ilyenkor a *Válasz* gomb neki
válaszol), település, szolgáltatás, üzenet, forrásoldal (útvonal + `utm_*` / `gclid` paraméterek) és a beküldés
időpontja (Europe/Budapest). Minden felhasználói érték HTML-escape-elve kerül a levélbe.

Másik szolgáltatóra váltás (pl. Postmark, Brevo, SendGrid): a `worker/index.mjs` `sendLeadEmail()`
függvényében csak az API URL-t, a fejlécet és a payload formátumát kell átírni.

## 5. Mit kell ügyfelenként megváltoztatni?

- `src/config.js` — cégnév, telefonszám, e-mail, szolgáltatási terület, nyitvatartás, bizalmi adatok (`trust`),
  domain. Ezután `npm run build`.
- `src/data/services.js` — ha az ügyfél más szolgáltatásokat kínál (a Worker is ebből validál).
- `wrangler.toml` — `name`, `[vars]` blokk, `routes` (domain).
- Secretek — `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`.
- Resend — domain hitelesítés.
- Turnstile — új widget az ügyfél domainjére.
- Árak — `[ÁR MEGADÁSA SZÜKSÉGES]` placeholderek a `src/pages/*.js` fájlokban.

A Worker kódját ügyfelenként **nem** kell módosítani.

## 6. Tesztelés

**Automatikus füstteszt** (nincs hálózat, nincs valódi kulcs):

```bash
node scripts/test-worker.mjs
```

**Helyi futtatás a valódi Workers runtime-mal:**

1. `.dev.vars.example` → másold `.dev.vars` néven (Turnstile teszt kulcsok benne vannak; a Resend kulcsot
   írd be, ha valódi levelet akarsz kapni).
2. Futtasd:
   ```bash
   npm run cf:dev
   ```
3. Nyisd meg a kiírt `http://localhost:8787` címet, küldj be egy űrlapot.

**Élesítés után (ellenőrzőlista):**

- [ ] Szolgáltatásoldalról beküldve → átirányít a `/koszonjuk/` oldalra, a levélben a szolgáltatás helyes.
- [ ] `/kapcsolat/` oldalról beküldve, választólistával → a levélben a kiválasztott szolgáltatás szerepel.
- [ ] Kötelező mező nélkül → magyar hibaüzenet, nincs levél.
- [ ] Rossz Turnstile / hiányzó token → hibaüzenet, nincs levél.
- [ ] `GET /api/ajanlatkeres` → 405.
- [ ] Hibás `RESEND_API_KEY` mellett → hibaüzenet a látogatónak, `email_send_failed` a naplóban
      (`npx wrangler tail`), nincs átirányítás.

## 7. Deploy

```bash
npm run cf:deploy
```

Ez lefuttatja a statikus buildet (`npm run build`), majd `npx wrangler deploy`-jal feltölti a Workert és a
`public/` mappát. Naplók élőben: `npx wrangler tail`.

---

### Opcionális: rate limit

A `wrangler.toml` végén kikommentezett `[[ratelimits]]` blokk bekapcsolásával IP-címenként percenként 5
beküldés engedélyezett. Alternatíva: Cloudflare WAF rate limiting szabály a `/api/ajanlatkeres` útvonalra.

### Adatkezelés

A Worker a leadet nem tárolja, csak továbbítja e-mailben. A naplóba csak technikai hibakód kerül (pl.
`email_send_failed 401`), a lead tartalma nem. Az adatkezelési tájékoztatóban a Cloudflare-t és az e-mail
szolgáltatót adatfeldolgozóként fel kell tüntetni (placeholder: `/adatkezelesi-tajekoztato/` 5. pont).

### Vercel preview

A `vercel.json` továbbra is kiszolgálja a statikus oldalt previewhoz, de ott a `/api/*` végpontok nem
futnak — az űrlap ilyenkor a „nem sikerült elküldeni” hibaüzenetet mutatja (hamis siker nincs).
