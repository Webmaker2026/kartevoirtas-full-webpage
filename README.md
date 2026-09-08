# Kártevőirtás — weboldal + Google Ads landing rendszer

Teljes, Google Ads kampányokra optimalizált kártevőirtó weboldal. Statikus HTML/CSS/JS + egyetlen PHP
végpont (`send-form.php`) — hagyományos FTP/PHP tárhelyen build nélkül üzemképes, fejlesztés közben pedig
Vercelen previewzhető.

## Mappastruktúra

```
/src            — fejlesztési forrás (Node, függőség nélkül)
  build.js      — statikus oldalgenerátor: src/pages/*.js → public/*.html
  config.js     — EGYETLEN hely a domain/telefon/e-mail stb. placeholderekhez
  data/         — szolgáltatás-lista (nav, footer, /arak/, sitemap forrása)
  partials/     — fejléc, lábléc, cookie consent, ajánlatkérő form, landing-építő
  pages/        — oldalankénti tartalom (egy .js fájl = egy oldal)
/public         — GENERÁLT + statikus kimenet. Ez a tényleges FTP/Vercel deploy gyökér.
  send-form.php — kézzel írt, nem generált
  .htaccess, robots.txt, sitemap.xml, site.webmanifest — generált/kézzel írt keverék
/scripts        — dev-time segédszkriptek (ikon-, OG kép generátor, Ads karakterszám-ellenőrző)
/google-ads     — Google Ads kampány-dokumentáció szolgáltatásonként (NEM kerül FTP-re)
MISSING-DATA.md — élesítés előtt pótlandó adatok listája (NEM kerül FTP-re)
```

## Fejlesztői parancsok

```bash
npm run build          # legenerálja a public/ alá az összes HTML-t, robots.txt-et, sitemap.xml-t
node scripts/generate-icons.js      # favicon / app ikon készlet (csak ha változik a márkajel)
node scripts/generate-og-image.js   # social share kép (1200x630)
node scripts/verify-ads.js          # Google Ads karakterlimitek programozott ellenőrzése
```

A `public/` mappában semmi nincs kézzel írva, amit a build felülírna, KIVÉVE: `send-form.php`, `.htaccess`,
és a `assets/css/style.css` / `assets/js/main.js` (ezek statikus assetek, nem generáltak).

## Domain beállítása

A végleges domain még nincs kiválasztva. Amíg ez nem történik meg, a `src/config.js`-ben a `domain: '[DOMAIN]'`
placeholder szerepel, és minden canonical/og:url/sitemap URL ebből épül fel. **A végleges domain ismeretében:**

1. Módosítsd a `src/config.js` `domain` mezőjét a valós domainre.
2. Futtasd: `npm run build`.
3. A `public/` mappa ettől kezdve már a helyes abszolút URL-eket tartalmazza — nincs szükség kliensoldali
   URL-generálásra, és a végleges FTP csomag build nélkül feltölthető.

## Tipográfia

- **Sora** (display/heading) — geometrikus, technikai karakterű, jól illeszkedik a grafit + borostyán
  arculathoz, kiválóan skálázódik nagy H1 méretben is.
- **Inter** (body/UI) — kiemelkedő olvashatóság kis méretben is, teljes magyar ékezet-támogatás, ipari
  szabvány UI szövegekhez.

Mindkettő Google Fonts-ról töltődik be (`src/partials/head.js`), nyílt licenc (SIL Open Font License / Apache).
Ha a végleges tárhely CSP-je vagy adatvédelmi elvárása indokolja, mindkét font lokálisan is kiszolgálható —
ehhez a `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` sort kell lecserélni helyi
`@font-face` deklarációkra a letöltött woff2 fájlokkal.

## Google Ads ↔ landing rendszer

Minden fő szolgáltatási landing (`/agyi-poloska-irtas/`, `/csotanyirtas/`, `/darazsirtas/`, `/hangyairtas/`,
`/patkanyirtas/`, `/egerirtas/`, `/bolhairtas/`) rendelkezik:

- saját, stabil szekció-azonosítókkal: `#jelek`, `#kezeles`, `#arak`, `#tudnivalok`, `#gyik`, `#ajanlatkeres`
- saját `/google-ads/<szolgáltatás>.md` kampány-dokumentációval (kulcsszavak, negatívok, 15 RSA címsor,
  4 RSA leírás, sitelinkek, calloutok, UTM terv, landing↔ads audit)

Az `/egyeb-kartevok/` oldalnak van landingje, de — a fő nyolc kategóriától eltérően — nincs önálló Ads
csomagja, mivel gyűjtő-kategória, nem önálló fő kulcsszócsoport.

A karakterlimiteket a `scripts/verify-ads.js` programozottan ellenőrzi (nem becsléssel):

```bash
node scripts/verify-ads.js
```

## Vercel preview vs. FTP production

- **Vercel**: kizárólag fejlesztési/vizuális preview. A `vercel.json` a `public/` mappát szolgálja ki
  statikusan (`npm run build` fut buildCommandként). A `send-form.php` Vercelen nem fut (nincs PHP runtime) —
  ez elvárt; a frontend ilyenkor egyértelmű, magyar hibaüzenetet mutat, hamis sikert nem jelez.
- **FTP/PHP tárhely**: a végleges production cél. A `public/` mappa tartalma közvetlenül feltölthető a domain
  webgyökerébe, `npm install` / build lépés nélkül.

## Cookie consent / Consent Mode v2

Az `assets/js/main.js` a Google Consent Mode v2 elvárásainak megfelelő alapállapotot állít be (minden
nem-szükséges kategória alapból elutasítva), és a felhasználó döntését `localStorage`-ban tárolja. Tényleges
GTM/GA4/Ads mérőkód még nincs beillesztve — ehhez lásd `MISSING-DATA.md` 4. pontját.
