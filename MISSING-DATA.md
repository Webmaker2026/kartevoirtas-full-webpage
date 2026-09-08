# Hiányzó adatok — élesítés előtt pótlandó

> Belső dokumentum. **NEM kerül a production FTP csomagba.**
>
> A projektben minden olyan helyen, ahol valós üzleti, jogi vagy technikai adat hiányzott, jól látható
> placeholder szerepel (pl. `[TELEFONSZÁM]`), NEM kitalált érték. Ez a fájl összegyűjti, mit és hol kell
> pótolni éles indulás előtt.

## 1. Központi konfiguráció (`src/config.js`)

Ez a fájl az egyetlen hely, ahol a legtöbb alábbi adatot módosítani kell — utána `npm run build` újragenerálja
az összes statikus HTML-t, XML-t és a `site.webmanifest`-et a helyes értékekkel.

| Kulcs | Jelenlegi placeholder | Hol jelenik meg |
|---|---|---|
| `domain` | `[DOMAIN]` | canonical, og:url, sitemap.xml, robots.txt |
| `companyName` | `[CÉGNÉV]` | header, footer, title tagek, e-mail tárgy |
| `companyFormalName` | `[CÉGNÉV] (a teljes, cégjegyzék szerinti névvel)` | /jogi-informaciok/ |
| `companyRegNumber` | `[CÉGJEGYZÉKSZÁM]` | /jogi-informaciok/, /adatkezelesi-tajekoztato/ |
| `companyTaxNumber` | `[ADÓSZÁM]` | /jogi-informaciok/, /adatkezelesi-tajekoztato/ |
| `companyAddress` / `companySeat` | `[SZÉKHELY CÍME]` | /jogi-informaciok/, /adatkezelesi-tajekoztato/ |
| `serviceArea` | `[SZOLGÁLTATÁSI TERÜLET]` | főoldal hero, minden landing, footer, /rolunk/ |
| `openingHours` | `[NYITVATARTÁS / ELÉRHETŐSÉG]` | footer, /kapcsolat/, /rolunk/ |
| `dispatchTime` | `[KISZÁLLÁSI IDŐ]` | főoldal hero badge, /gyik/ |
| `phoneDisplay` / `phoneHref` | `[TELEFONSZÁM]` | header, footer, sticky CTA, minden landing, `tel:` linkek |
| `email` | `[E-MAIL CÍM]` | footer, /kapcsolat/ |
| `formRecipientEmail` | `[FOGADÓ E-MAIL CÍM]` | dokumentációs célra — a tényleges értéket a `public/send-form.php` |
|  |  | `FORM_RECIPIENT` konstansába kell írni (lásd 3. pont) |

## 2. Jogi / cégadatok

- Cégjegyzékszám, adószám, székhely — lásd fent.
- Nyilvántartó hatóság (cégbíróság) — `/jogi-informaciok/`.
- Tevékenységi engedélyek, szakmai képesítések — `/jogi-informaciok/`. **Kizárólag ténylegesen meglévő,
  igazolható engedély vagy képesítés tüntethető fel.**
- Tárhelyszolgáltató neve és elérhetősége — `/jogi-informaciok/`, `/adatkezelesi-tajekoztato/`.
- Felügyeleti szerv (fogyasztóvédelem / szakhatóság) — `/jogi-informaciok/`.
- Az adatkezelés jogalapjának végleges, jogi felülvizsgálat utáni meghatározása — `/adatkezelesi-tajekoztato/`
  3. pont. Jelenleg NEM állítottuk, hogy minden esetben hozzájárulás a jogalap.
- Adatmegőrzési időtartam — `/adatkezelesi-tajekoztato/` 4. pont.
- NAIH aktuális elérhetősége — `/adatkezelesi-tajekoztato/` 7. pont.

## 3. `send-form.php` — élesítés előtti teendők

Fájl: `public/send-form.php`

- `FORM_RECIPIENT` — a fogadó e-mail cím (jelenleg `[FOGADÓ E-MAIL CÍM]`).
- `FROM_EMAIL` — saját, valós domaines feladó cím (jelenleg `noreply@[DOMAIN]`). Amíg ez a két konstans
  placeholdert tartalmaz, a szkript **szándékosan nem próbál levelet küldeni**, és ezt egyértelmű hibaüzenettel
  jelzi — így nem keletkezik hamis siker vagy néma levélvesztés.
- Ajánlott (nem kötelező): átállás saját domaines SMTP-re a jobb kézbesíthetőség érdekében. Ehhez szükséges,
  még nem megadott adatok: SMTP host, port, felhasználónév, jelszó / API kulcs. **Ezeket soha ne kerüljön
  frontendbe vagy publikus repóba.**
- SPF / DKIM / DMARC rekordok beállítása a domainen — ez a levelek kézbesíthetőségét javítja, DNS szinten,
  a végleges domain kiválasztása után végezhető el.

## 4. Mérés (Google Ads / GA4 / GTM)

Egyik azonosító sincs megadva, és a projektben sehol nem szerepel kitalált érték:

- `ga4MeasurementId`
- `gtmContainerId`
- `googleAdsConversionId`
- `googleAdsConversionLabelForm` (elsődleges konverzió: sikeres ajánlatkérés)
- `googleAdsConversionLabelCall` (másodlagos konverzió: telefon CTA kattintás)

A mérés műszaki előkészítése megtörtént: Consent Mode v2 alapállapot, stabil `data-track` attribútumok
(`call`, `quote-cta`), a `generate_lead` esemény csak sikeres szerveroldali feldolgozás után tüzel
(`assets/js/main.js`). Az azonosítók megérkezésekor a GTM snippet a `src/partials/head.js` fájlban jelzett
helyre illesztendő be.

## 5. Domain és FTP élesítés

- A `src/config.js` `domain` értékének módosítása után futtatandó: `npm run build` (majd `node
  scripts/generate-icons.js` és `node scripts/generate-og-image.js`, ha a favicon/OG kép még nem készült el).
- A `public/.htaccess`-ben két, alapból kikommentezett blokk van: HTTPS-redirect és www/non-www egységesítés.
  Ezeket csak a végleges domain és aktív SSL tanúsítvány birtokában szabad bekapcsolni (redirect loop
  elkerülése végett).
- A www / non-www kanonikus host kérdésében még nem született döntés — ez a domain kiválasztásával együtt
  dől el.

## 6. Bizalmi elemek — szándékosan hiányoznak

A következőket a projekt **szándékosan** nem tartalmazza, mert nincs mögöttük valós adat:

- Ügyfélvélemények, referenciák
- Google-értékelés / csillagszám
- Garancia ígéret
- Konkrét tapasztalati évszám
- Structured data (schema.org LocalBusiness/Review) — amint rendelkezésre áll valós cégadat, cím, nyitvatartás,
  érdemes LocalBusiness schema-t hozzáadni a `src/partials/head.js`-hez.

**Ha ezek bármelyikéhez lesz valós adat, a megfelelő oldalon (elsősorban `/rolunk/`, footer) hozzáadható —
kitalált adattal viszont soha ne töltsük fel.**

## 7. Favicon / OG kép

A `scripts/generate-icons.js` és `scripts/generate-og-image.js` egy egyszerű, márkaszínekkel dolgozó,
programozottan generált célkereszt-jelet állít elő (lásd `public/assets/img/icons/` és
`public/assets/img/social/og-cover.png`). Ha később egyedi, grafikustól származó logó készül, ezek a fájlok
lecserélendők — a HTML-ben semmit nem kell módosítani, ha a fájlnevek és méretek megegyeznek.

## 8. B2B tartalom

A `/rolunk/` és a főoldal tartalmaz egy B2B szekciót (társasházak, éttermek, üzletek, raktárak). Ez jelenleg
általános, nem konkrét referenciát vagy ügyfélszámot állító szöveg. Ha van tényleges B2B referencia vagy
ügyfélkör-adat, érdemes konkretizálni.
