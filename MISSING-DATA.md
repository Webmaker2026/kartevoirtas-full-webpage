# Hiányzó adatok — élesítés előtt pótlandó (ügyfelenként)

> Belső dokumentum, nem kerül ki a weboldalra.
>
> Minden helyen, ahol valós üzleti, jogi vagy technikai adat hiányzik, szögletes zárójeles placeholder szerepel
> (pl. `[TELEFONSZÁM]`), NEM kitalált érték. Keresés: `grep -rn "\[[A-ZÁÉÍÓÖŐÚÜŰ]" src`.

## 1. Központi konfiguráció (`src/config.js`)

A kitöltés után `npm run build` újragenerálja az összes HTML-t, a sitemap-et és a manifestet.

| Kulcs | Placeholder | Hol jelenik meg |
|---|---|---|
| `domain` | `[DOMAIN]` | canonical, og:url, sitemap.xml, robots.txt, BreadcrumbList |
| `companyName` | `[CÉGNÉV]` | fejléc, lábléc, title tagek, lead e-mail |
| `companyFormalName` | `[CÉGNÉV] (a teljes, cégjegyzék szerinti névvel)` | /jogi-informaciok/ |
| `companyRegNumber` / `companyTaxNumber` | `[CÉGJEGYZÉKSZÁM]` / `[ADÓSZÁM]` | lábléc, jogi oldalak |
| `companyAddress` / `companySeat` | `[SZÉKHELY CÍME]` | /kapcsolat/, jogi oldalak |
| `serviceArea` | `[SZOLGÁLTATÁSI TERÜLET]` | hero-k, „Miért minket?”, lábléc, topbar |
| `openingHours` | `[NYITVATARTÁS / ELÉRHETŐSÉG]` | topbar, főoldali hero, lábléc, kapcsolat |
| `dispatchTime` | `[KISZÁLLÁSI IDŐ]` | /gyik/ („Mennyi idő alatt tudnak kijönni?”) |
| `phoneDisplay` / `phoneHref` | `[TELEFONSZÁM]` / `tel:[TELEFONSZÁM]` | minden CTA (`phoneHref` nemzetközi formátumban: `tel:+36…`) |
| `email` | `[EMAIL]` | topbar, lábléc, kapcsolat, jogi oldalak |

### „Miért minket?” blokk (`SITE.trust`)

Kizárólag valós, igazolható adat kerülhet ide. Üres string esetén a sor nem jelenik meg.

| Kulcs | Placeholder | Megjegyzés |
|---|---|---|
| `qualification` | `[SZAKKÉPESÍTÉS / HATÓSÁGI ENGEDÉLY]` | pl. a képesítés / nyilvántartási szám |
| `experience` | `[TAPASZTALAT — …]` | pl. „2012 óta dolgozunk a szakmában” — csak ha igaz |
| `methods` | `[ALKALMAZOTT MÓDSZEREK — …]` | az ügyfél tényleges módszerei |
| `invoice` | kitöltve | törlendő, ha nem releváns |
| `guarantee` | üres | CSAK ha a vállalkozás ténylegesen vállal garanciát |

## 2. Tartalmi placeholderek

- **Árak:** `[ÁR MEGADÁSA SZÜKSÉGES]` — minden szolgáltatásoldal (`src/pages/<szolgáltatás>.js`) és `/arak/`.
- **Bemutatkozás:** `[BEMUTATKOZÁS — …]` — `src/pages/rolunk.js`.
- **Fizetési módok:** `[FIZETÉSI MÓDOK MEGADÁSA SZÜKSÉGES]` — `src/pages/gyik.js`.
- **Módszerek, munkafolyamat:** a szolgáltatásoldalak „A kezelés menete” és „Tudnivalók” részei általános, a
  szakmában bevett lépéseket írnak le (felmérés, kezelés, szükség esetén ismételt kezelés). Ha az ügyfél
  másképp dolgozik (pl. nem végez második kezelést, nem használ gélcsalétket), a `src/pages/*.js` fájlokban
  igazítsd hozzá.

## 3. Jogi / cégadatok

- Nyilvántartó hatóság, tevékenységi engedélyek, tárhelyszolgáltató, felügyeleti szervek — `/jogi-informaciok/`.
  **Kizárólag ténylegesen meglévő engedély vagy képesítés tüntethető fel.**
- Adatkezelés jogalapja, megőrzési idő, adatfeldolgozók (Cloudflare, e-mail szolgáltató), NAIH elérhetőség —
  `/adatkezelesi-tajekoztato/`.
- Tényleges sütilista a mérőkódok beállítása után — `/cookie-tajekoztato/`.

## 4. Ajánlatkérő űrlap (Cloudflare Worker)

Lásd `CLOUDFLARE-FORM-SETUP.md`. Összefoglalva: `LEAD_RECIPIENT_EMAIL`, `MAIL_FROM`, `TURNSTILE_SITE_KEY`
(`wrangler.toml`), valamint `RESEND_API_KEY` és `TURNSTILE_SECRET_KEY` (secret). Resend domain-hitelesítés
(SPF/DKIM) szükséges.

## 5. Mérés (Google Ads / GA4 / GTM)

Egyik azonosító sincs megadva, kitalált érték sehol nem szerepel: `ga4MeasurementId`, `gtmContainerId`,
`googleAdsConversionId`, `googleAdsConversionLabelForm`, `googleAdsConversionLabelCall` (`src/config.js`).

Előkészítve: Consent Mode v2 alapállapot, `data-track="call"` / `data-track="quote-cta"` attribútumok
`data-location`-nel, `generate_lead` esemény csak sikeres szerveroldali feldolgozás után, `/koszonjuk/` oldal
(noindex) a form-konverzióhoz.

**Figyelem:** a consent alapállapotot jelenleg a `main.js` állítja be (`defer`), a body végén. Ha a GTM snippet a
`<head>`-be kerül, a consent default parancsot egy inline `<script>`-ben a GTM elé kell tenni, különben a GTM
a consent beállítás előtt indulhat.

## 6. Domain és deploy

- `src/config.js` `domain` → `npm run build`.
- `wrangler.toml` → `name`, `routes` (custom domain), `[vars]`.
- A www / non-www kanonikus host döntése a domain kiválasztásakor (Cloudflare Redirect Rule-lal).

## 7. Bizalmi elemek — szándékosan hiányoznak

Ügyfélvélemények, Google-értékelés, garancia, tapasztalati évszám, ügyfélszám, reakcióidő, eredményességi
százalék. Csak valós adattal pótolhatók. Valós cégadatok ismeretében érdemes LocalBusiness schema-t is
hozzáadni (`src/partials/head.js`).

## 8. Képek, logó

- Fotó: jelenleg egyetlen (`public/assets/img/services/kartevoirto-szakember.webp`), a szolgáltatásoldalak
  generált illusztrációt használnak. Ügyfélfotóknál a `src/data/media.js`-ben elég átírni az útvonalat és a
  méretet.
- Logó / favicon: a `scripts/generate-icons.js` egy semleges pajzs-jelet generál; saját logó esetén a
  `public/assets/img/icons/` fájlokat és a `src/partials/icons.js` `brandMark` ikonját kell cserélni.

## 9. Google Ads dokumentáció

A `google-ads/*.md` fájlokban a landing H1-ek frissítve vannak. A hirdetésszövegekben (címsorok, leírások,
calloutok) maradtak olyan állítások, amelyeket ügyfelenként ellenőrizni kell (pl. „Gyors kiszállás”,
„Kontroll látogatással”, „Célzott …”), mert a landing oldalak már nem ígérnek ilyet konkrétan.
