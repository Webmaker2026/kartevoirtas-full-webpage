# Kártevőirtás — MASTER weboldal sablon

Többoldalas, magyar nyelvű kártevőirtó weboldal, Google Ads forgalomra optimalizálva (elsődleges cél: telefonhívás,
másodlagos: ajánlatkérő űrlap, harmadlagos: organikus SEO). Statikus HTML/CSS/JS, függőség nélküli Node build,
és egy Cloudflare Worker, amely kiszolgálja az oldalt és fogadja az ajánlatkéréseket.

Új ügyfélnél a teendők listája: `MISSING-DATA.md`. Az űrlap-backend beállítása: `CLOUDFLARE-FORM-SETUP.md`.

## Mappastruktúra

```
/src            — fejlesztési forrás (Node, függőség nélkül)
  build.js      — statikus oldalgenerátor: src/pages/*.js → public/**/index.html, sitemap, robots
  config.js     — EGYETLEN hely a cégadatok / placeholderek számára ([CÉGNÉV], [TELEFONSZÁM] …)
  data/         — szolgáltatáslista (nav, footer, űrlap, Worker-validáció), kép-leltár
  partials/     — fejléc, lábléc, sticky CTA, űrlap, szolgáltatásoldal-sablon (landing.js), komponensek
  pages/        — oldalankénti tartalom (egy .js fájl = egy oldal)
/public         — GENERÁLT + statikus kimenet, ezt szolgálja ki a Worker
  assets/css/style.css, assets/js/main.js — kézzel írt (nem generált)
  _headers      — Cloudflare válaszfejlécek
/worker         — Cloudflare Worker (index.mjs): /api/ajanlatkeres, /api/form-config, statikus assetek
wrangler.toml   — Worker konfiguráció (titok nélkül)
/scripts        — ikon / OG kép / illusztráció generátor, linkellenőrző, Ads-ellenőrző, Worker-teszt
/google-ads     — Google Ads kampány-dokumentáció szolgáltatásonként (belső, nem kerül ki)
```

## Parancsok

```bash
npm run build          # oldalak + ikonok + OG kép + illusztrációk generálása a public/ alá
npm run check          # belső linkek, Ads karakterlimitek, Worker füstteszt
npm run cf:dev         # helyi futtatás a Workers runtime-mal (npx wrangler dev)
npm run cf:deploy      # build + npx wrangler deploy (csak ellenőrzés után!)
```

## Design rendszer

- Színek (`style.css` `:root`): navy `#0e2240` (alap, sötét szekciók), mély navy `#07162b` (topbar, footer),
  kék `#1d5cb8` (linkek, eyebrow), világos háttér `#f3f6fa`, fehér, sárga `#ffc629` — kizárólag hívás-CTA-hoz és
  apró kiemelésekhez.
- Tipográfia: Archivo 400/600/700 (Google Fonts). Mobil H1: 26 px-től, `clamp()`-pel skálázva.
- Töréspontok: 560 / 640 / 900 / 1080 px. 1080 px alatt: hamburger menü, nincs topbar, látszik az alsó sticky CTA.
- A telefonos linkek mindig `tel:` linkek, `data-track="call"` + `data-location` attribútummal (mérés).

## Placeholderek

Minden ügyfélspecifikus adat szögletes zárójelben szerepel (`[CÉGNÉV]`, `[TELEFONSZÁM]`, `[EMAIL]`,
`[SZOLGÁLTATÁSI TERÜLET]`, `[NYITVATARTÁS / ELÉRHETŐSÉG]`, `[KISZÁLLÁSI IDŐ]`, `[ÁR MEGADÁSA SZÜKSÉGES]` …).
A legtöbb a `src/config.js`-ben állítható; az árak a `src/pages/*.js` fájlokban. Keresés:

```bash
grep -rn "\[[A-ZÁÉÍÓÖŐÚÜŰ]" src
```

## Google Ads ↔ landing rendszer

Minden fő szolgáltatásoldal stabil szekció-azonosítókkal rendelkezik (Ads sitelinkekhez):
`#jelek`, `#kezeles`, `#arak`, `#tudnivalok`, `#gyik`, `#ajanlatkeres`. A szolgáltatásoldalakon az űrlap a
szolgáltatást rejtett mezőben küldi, a mobil sticky „Ajánlatkérés” gomb az oldalon lévő űrlapra ugrik.

## Mérés, cookie consent

Az `assets/js/main.js` Google Consent Mode v2 alapállapotot állít be (minden nem-szükséges kategória elutasítva),
a döntést `localStorage`-ban tárolja. Események: `call_click`, `quote_cta_click`, és a `generate_lead` — ez utóbbi
csak sikeres szerveroldali feldolgozás után. GTM/GA4/Ads azonosító nincs beállítva (lásd `MISSING-DATA.md`).

## Hosting

- **Production:** Cloudflare Worker + Static Assets (`wrangler.toml`). Lásd `CLOUDFLARE-FORM-SETUP.md`.
- **Vercel:** csak statikus preview (`vercel.json`); ott az `/api/*` nem fut, az űrlap hibaüzenetet ad.
