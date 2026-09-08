# Google Ads csomag — Hangyairtás

> Belső marketingdokumentáció. NEM kerül a production FTP csomagba.

## A. Landing

- Szolgáltatás: Hangyairtás
- Cél URL: `[DOMAIN]/hangyairtas/`
- Landing H1: „Hangyairtás — beltéri és kültéri fészkek felszámolása”
- Elsődleges konverzió: sikeresen elküldött és szerveroldalon feldolgozott ajánlatkérés (`/koszonjuk/`)
- Másodlagos konverzió: telefon CTA kattintás (`data-track="call"`)

## B. Keresési szándék

- Közvetlen szolgáltatáskeresés: „hangyairtás”
- Ár-orientált keresés: „hangyairtás ár”
- Probléma alapú: „hangyaút a konyhában”, „hangyaboly a teraszon”
- Kültéri / kerti keresés: „kerti hangyairtás”, „hangyaboly a járólap alatt”
- Lokális keresés: „hangyairtás [SZOLGÁLTATÁSI TERÜLET]”

## C. Kulcsszavak keresési szándék szerint

**Szolgáltatás-központú**
- hangyairtás
- hangya elleni kezelés
- hangyamentesítés

**Ár-központú**
- hangyairtás ár
- hangyairtás ára kertben

**Probléma alapú**
- hangyaút a konyhában
- hangyaboly a teraszon
- ácshangya a faszerkezetben

**Kültéri / lokális**
- kerti hangyairtás
- hangyaboly a járólap alatt
- hangyairtás [SZOLGÁLTATÁSI TERÜLET]

## D. Negatív kulcsszavak

- hangyafarm (oktatási/játék terrárium termék, nem kártevőirtás)
- hangya terrárium
- hangya díszállat
- hangya rajzfilm
- hangya jelentése

*Nem zártunk ki olyan kifejezéseket, mint „ácshangya kár”, mert ez valós, sürgető kártevőirtási igényt jelez.*

## E. RSA Címsorok (15 db, max. 30 karakter)

1. Hangyairtás Gyorsan
2. Hangyairtás Szakszerűen
3. Hangyairtás Ár
4. Hangyaút a Konyhában?
5. Kerti Hangyairtás
6. Hangyaboly a Teraszon?
7. Célzott Hangyairtás
8. Fészekfelmérés, Kezelés
9. Ácshangya Kezelés
10. Kérjen Hangyairtás Árat
11. Beltéri és Kültéri Kezelés
12. Nem Tér Vissza a Hangya
13. Hangyairtás Kertben
14. Gyors Időpont-Egyeztetés
15. Hívjon Hangyairtóért

## F. RSA Leírások (4 db, max. 90 karakter)

1. Hangyairtás beltérben és kertben, a fészek felszámolásával. Kérjen ajánlatot.
2. Hangyaút a konyhában? Nem csak a látható egyedeket, a fészket is kezeljük.
3. Kerti hangyaboly, járólap alatti fészek — célzott, tartós megoldással.
4. Ácshangya a faszerkezetben? Hívjon minket, mielőtt nagyobb kár keletkezik.

## G. Karakterszám-audit

Lásd: `node scripts/verify-ads.js` — a script minden címsort és leírást ténylegesen lemér, becslés nélkül.

## H. Sitelinkek

| Szöveg | Cél URL | Leírás 1 | Leírás 2 |
|---|---|---|---|
| Hangyairtás árak | `[DOMAIN]/hangyairtas/#arak` | Részletes árlista | Mit tartalmaz az ár |
| Fertőzöttség jelei | `[DOMAIN]/hangyairtas/#jelek` | Ismerje fel időben | Hangyaút, fészek jelei |
| Kezelés menete | `[DOMAIN]/hangyairtas/#kezeles` | Lépésről lépésre | Beltéri és kültéri kezelés |
| Előkészületek | `[DOMAIN]/hangyairtas/#tudnivalok` | Mit tegyen előtte | És a kezelés után |
| GYIK | `[DOMAIN]/hangyairtas/#gyik` | Gyakori kérdések | Válaszok percek alatt |
| Ajánlatkérés | `[DOMAIN]/hangyairtas/#ajanlatkeres` | Kérjen ajánlatot | Gyors visszajelzés |

## I. További assetek

**Callout javaslatok (max. 25 karakter)**
1. Beltéri és kültéri is
2. Fészekközpontú megoldás
3. Kontroll látogatással
4. Gyors időpont-egyeztetés

**Structured snippet**
- Típus: Szolgáltatások
- Értékek: Útvonal-felmérés, Csalétkes kezelés, Kültéri fészekkezelés

**Display Path (max. 15 karakter/szegmens)**
1. Hangyairtas
2. Kert-Lakas

**Egyéb javasolt asset**
- Call asset: `[TELEFONSZÁM]` (hívás kiterjesztés)
- Location asset: csak valós, nyilvános üzleti cím esetén állítható be — jelenleg nincs.

## J. Tracking / UTM terv

- Campaign naming: `pest-hangya`
- Ad group naming: `hangya-beltéri`, `hangya-kulteri`, `hangya-ar`
- Landing: `[DOMAIN]/hangyairtas/`
- Elsődleges konverzió: form_success (`/koszonjuk/` — csak szerveroldali feldolgozás után)
- Másodlagos konverzió: call_click, quote_cta_click
- utm_source: google
- utm_medium: cpc
- utm_campaign: pest-hangya
- utm_content: {ad group szerint, pl. hangya-kulteri}

*Google Ads / GA4 / GTM azonosítók még nincsenek megadva — kitalált érték nélkül a `src/config.js`-ben rögzítendők.*

## K. Landing ↔ Ads audit

| Szempont | Ellenőrzés | Eredmény |
|---|---|---|
| Kulcsszó → H1 | „hangyairtás” szerepel a H1-ben | Megfelel |
| Hirdetési ígéret → tartalom | „fészekközpontú”, „beltéri és kültéri” → about + kezelés szekció alátámasztja | Megfelel |
| Ár | Címsor „Hangyairtás Ár” → #arak szekció, valós placeholderrel | Megfelel |
| Ácshangya említés | Külön RSA és leírás → landing method szekció külön kitér az ácshangyára | Megfelel |
| Sitelink anchor | Minden URL valóban létező `id`-re mutat a landingen | Megfelel |
| Kitalált üzleti állítás | Nincs garancia-, értékelés- vagy tapasztalatiév-állítás | Megfelel |
