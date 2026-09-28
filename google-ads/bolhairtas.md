# Google Ads csomag — Bolhairtás

> Belső marketingdokumentáció. NEM kerül a production FTP csomagba.

## A. Landing

- Szolgáltatás: Bolhairtás
- Cél URL: `[DOMAIN]/bolhairtas/`
- Landing H1: „Bolhairtás lakásban és kertben”
- Elsődleges konverzió: sikeresen elküldött és szerveroldalon feldolgozott ajánlatkérés (`/koszonjuk/`)
- Másodlagos konverzió: telefon CTA kattintás (`data-track="call"`)

## B. Keresési szándék

- Közvetlen szolgáltatáskeresés: „bolhairtás”
- Ár-orientált keresés: „bolhairtás ár”
- Probléma alapú, gyakran háziállat-tartókhoz köthető: „bolha a szőnyegben”, „kutya sokat vakarózik”
- Kültéri keresés: „bolhairtás kertben”
- Lokális keresés: „bolhairtás [SZOLGÁLTATÁSI TERÜLET]”

## C. Kulcsszavak keresési szándék szerint

**Szolgáltatás-központú**
- bolhairtás
- bolha elleni kezelés
- bolhamentesítés lakásban

**Ár-központú**
- bolhairtás ár
- bolhairtás ára

**Probléma alapú (gyakran háziállat-tartókhoz köthető)**
- bolha a szőnyegben
- csípésnyomok a boka körül
- kutya sokat vakarózik bolha

**Kültéri / lokális**
- bolhairtás kertben
- bolhairtás [SZOLGÁLTATÁSI TERÜLET]

## D. Negatív kulcsszavak

- bolhapiac (a magyar „bolhapiac” kifejezés használtcikk-vásárt jelent, nem kártevőirtást)
- bolha ruha
- bolha jelmez
- bolha zenekar (ismert együttes neve)
- bolha jelentése

*Nem zártunk ki állatorvosi jellegű kereséseket (pl. „bolha elleni kezelés kutyának”), mert ezek gyakran a
lakáskezeléssel párhuzamosan merülnek fel, és a landing kifejezetten kitér az állatorvosi kezeléssel való
együttműködésre.*

## E. RSA Címsorok (15 db, max. 30 karakter)

1. Bolhairtás Gyorsan
2. Bolhairtás Szakszerűen
3. Bolhairtás Ár
4. Bolha a Szőnyegben?
5. Célzott Bolhairtás
6. Kutya Sokat Vakarózik?
7. Bolhairtás Lakásban
8. Bolhairtás Kertben Is
9. Kérjen Bolhairtás Árat
10. Gyors Kiszállás, Kezelés
11. Nem Csak az Állatot Kezelje
12. Bolhairtás Textilben
13. Csípésnyomok a Bokán?
14. Bolhairtás Otthonába
15. Hívjon Bolhairtóért

## F. RSA Leírások (4 db, max. 90 karakter)

1. Bolhairtás szőnyegben, kárpitban és kertben. Kérjen ajánlatot, hívjon most.
2. A háziállat mellett a lakást is kezelni kell — mi a gócpontokat célozzuk.
3. Csípésnyomok a boka körül? Gyors időpont-egyeztetés, célzott kezeléssel.
4. Beltéri és kültéri gócpontok egy látogatás keretében — kérjen ajánlatot.

## G. Karakterszám-audit

Lásd: `node scripts/verify-ads.js` — a script minden címsort és leírást ténylegesen lemér, becslés nélkül.

## H. Sitelinkek

| Szöveg | Cél URL | Leírás 1 | Leírás 2 |
|---|---|---|---|
| Bolhairtás árak | `[DOMAIN]/bolhairtas/#arak` | Részletes árlista | Mit tartalmaz az ár |
| Fertőzöttség jelei | `[DOMAIN]/bolhairtas/#jelek` | Ismerje fel időben | Csípés, vakarózás jelei |
| Kezelés menete | `[DOMAIN]/bolhairtas/#kezeles` | Lépésről lépésre | Gócpontok célzott kezelése |
| Előkészületek | `[DOMAIN]/bolhairtas/#tudnivalok` | Mit tegyen előtte | És a kezelés után |
| GYIK | `[DOMAIN]/bolhairtas/#gyik` | Gyakori kérdések | Válaszok percek alatt |
| Ajánlatkérés | `[DOMAIN]/bolhairtas/#ajanlatkeres` | Kérjen ajánlatot | Gyors visszajelzés |

## I. További assetek

**Callout javaslatok (max. 25 karakter)**
1. Beltéri és kültéri is
2. Gócpont-központú megoldás
3. Kontroll látogatással
4. Gyors időpont-egyeztetés

**Structured snippet**
- Típus: Szolgáltatások
- Értékek: Gócpont-felmérés, Beltéri kezelés, Kültéri kezelés

**Display Path (max. 15 karakter/szegmens)**
1. Bolhairtas
2. Arak

**Egyéb javasolt asset**
- Call asset: `[TELEFONSZÁM]` (hívás kiterjesztés)
- Location asset: csak valós, nyilvános üzleti cím esetén állítható be — jelenleg nincs.

## J. Tracking / UTM terv

- Campaign naming: `pest-bolha`
- Ad group naming: `bolha-lakas`, `bolha-kert`, `bolha-ar`
- Landing: `[DOMAIN]/bolhairtas/`
- Elsődleges konverzió: form_success (`/koszonjuk/` — csak szerveroldali feldolgozás után)
- Másodlagos konverzió: call_click, quote_cta_click
- utm_source: google
- utm_medium: cpc
- utm_campaign: pest-bolha
- utm_content: {ad group szerint, pl. bolha-kert}

*Google Ads / GA4 / GTM azonosítók még nincsenek megadva — kitalált érték nélkül a `src/config.js`-ben rögzítendők.*

## K. Landing ↔ Ads audit

| Szempont | Ellenőrzés | Eredmény |
|---|---|---|
| Kulcsszó → H1 | „bolhairtás” szerepel a H1-ben | Megfelel |
| Hirdetési ígéret → tartalom | „nem csak az állatot” → about szekció kifejezetten kitér erre | Megfelel |
| Kültéri kezelés | RSA „Bolhairtás Kertben Is” → landing method + pricing sor tartalmazza | Megfelel |
| Ár | Címsor „Bolhairtás Ár” → #arak szekció, valós placeholderrel | Megfelel |
| Sitelink anchor | Minden URL valóban létező `id`-re mutat a landingen | Megfelel |
| Kitalált üzleti állítás | Nincs garancia-, értékelés- vagy tapasztalatiév-állítás | Megfelel |
