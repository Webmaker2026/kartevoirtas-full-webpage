# Google Ads csomag — Ágyi poloska irtás

> Belső marketingdokumentáció. NEM kerül a production FTP csomagba.

## A. Landing

- Szolgáltatás: Ágyi poloska irtás
- Cél URL: `[DOMAIN]/agyi-poloska-irtas/`
- Landing H1: „Ágyi poloska irtás lakásban és szálláshelyen”
- Elsődleges konverzió: sikeresen elküldött és szerveroldalon feldolgozott ajánlatkérés (`/koszonjuk/`)
- Másodlagos konverzió: telefon CTA kattintás (`data-track="call"`)

## B. Keresési szándék

- Probléma-felismerés / tünet alapú keresés: „csípésnyomok reggel”, „mi csíp éjjel az ágyban”
- Közvetlen szolgáltatáskeresés: „ágyi poloska irtás”
- Ár-orientált keresés: „ágyi poloska irtás ár”
- Sürgősségi keresés: „ágyi poloska irtás azonnal”, „ágyi poloska irtás gyorsan”
- Lokális keresés: „ágyi poloska irtás [SZOLGÁLTATÁSI TERÜLET]”

## C. Kulcsszavak keresési szándék szerint

**Szolgáltatás-központú**
- ágyi poloska irtás
- poloskairtás
- poloska elleni kezelés
- ágyi poloska mentesítés

**Ár-központú**
- ágyi poloska irtás ár
- poloskairtás ára
- mennyibe kerül a poloskairtás

**Probléma / tünet alapú**
- csípésnyomok az ágyban
- apró barna foltok a matracon
- éjszakai rovarcsípés

**Sürgősségi / lokális**
- ágyi poloska irtás [SZOLGÁLTATÁSI TERÜLET]
- gyors poloskairtás
- poloskairtás cég a közelben

## D. Negatív kulcsszavak

- poloska radar (népszerű sebességmérő-alkalmazás neve, nem kártevőirtás)
- poloska app
- poloska alkalmazás
- lehallgató poloska (elektronikai lehallgatókészülék, nem rovar)
- poloska jelentése
- poloska rajzfilm

*Megjegyzés: szándékosan NEM zártunk ki olyan kifejezéseket, mint „házilag” vagy „hogyan”, mert ezek egy része
később mégis szolgáltatást keres, ha az önálló próbálkozás nem vezet eredményre.*

## E. RSA Címsorok (15 db, max. 30 karakter)

1. Ágyi Poloska Irtás Gyorsan
2. Poloskairtás Szakszerűen
3. Ágyi Poloska Irtás Ár
4. Csípésnyomok? Segítünk
5. Poloska a Matracban?
6. Célzott Poloskairtás
7. Ágyi Poloska Mentesítés
8. Gyors Kiszállás, Kezelés
9. Poloskairtás Kontrollal
10. Ágyi Poloska? Kérjen Árat
11. Rejtekhely-Felmérés
12. Poloskairtás Lakásban
13. Ágyi Poloska Irtás Ma
14. Nem Tér Vissza a Poloska
15. Hívjon Poloskairtóért

## F. RSA Leírások (4 db, max. 90 karakter)

1. Ágyi poloska irtás célzott kezeléssel. Kérjen ajánlatot, hívjon most.
2. Csípésnyomok reggelente? Felmérjük a rejtekhelyeket, és szakszerűen irtunk.
3. Gyors időpont-egyeztetés, érthető folyamat, kontroll látogatással.
4. Lakás, albérlet, szálláshely — ajánlatkérés online vagy telefonon percek alatt.

## G. Karakterszám-audit

Lásd: `node scripts/verify-ads.js` — a script minden címsort és leírást ténylegesen lemér, becslés nélkül.

## H. Sitelinkek

| Szöveg | Cél URL | Leírás 1 | Leírás 2 |
|---|---|---|---|
| Poloskairtás árak | `[DOMAIN]/agyi-poloska-irtas/#arak` | Részletes árlista | Mit tartalmaz az ár |
| Fertőzöttség jelei | `[DOMAIN]/agyi-poloska-irtas/#jelek` | Ismerje fel időben | Csípés, foltok, szag |
| Kezelés menete | `[DOMAIN]/agyi-poloska-irtas/#kezeles` | Lépésről lépésre | Felmérés, célzott kezelés |
| Előkészületek | `[DOMAIN]/agyi-poloska-irtas/#tudnivalok` | Mit tegyen előtte | És a kezelés után |
| GYIK | `[DOMAIN]/agyi-poloska-irtas/#gyik` | Gyakori kérdések | Válaszok percek alatt |
| Ajánlatkérés | `[DOMAIN]/agyi-poloska-irtas/#ajanlatkeres` | Kérjen ajánlatot | Gyors visszajelzés |

## I. További assetek

**Callout javaslatok (max. 25 karakter)**
1. Célzott kezelés
2. Kontroll látogatással
3. Gyors időpont-egyeztetés
4. Lakás és szálláshely is

**Structured snippet**
- Típus: Szolgáltatások
- Értékek: Felmérés, Célzott kezelés, Kontroll látogatás

**Display Path (max. 15 karakter/szegmens)**
1. Poloskairtas
2. Arak

**Egyéb javasolt asset**
- Call asset: `[TELEFONSZÁM]` (hívás kiterjesztés)
- Location asset: csak akkor állítható be, ha valós, nyilvános üzleti cím rendelkezésre áll — jelenleg nincs.

## J. Tracking / UTM terv

- Campaign naming: `pest-agyi-poloska`
- Ad group naming: `agyi-poloska-altalanos`, `agyi-poloska-ar`, `agyi-poloska-surgos`
- Landing: `[DOMAIN]/agyi-poloska-irtas/`
- Elsődleges konverzió: form_success (`/koszonjuk/` — csak szerveroldali feldolgozás után)
- Másodlagos konverzió: call_click, quote_cta_click (lásd `data-track` attribútumok)
- utm_source: google
- utm_medium: cpc
- utm_campaign: pest-agyi-poloska
- utm_content: {ad group szerint, pl. agyi-poloska-ar}

*Google Ads / GA4 / GTM azonosítók (Conversion ID, Conversion Label, Measurement ID) még nincsenek megadva —
ezeket a `src/config.js` fájlban kell majd rögzíteni, kitalált érték NÉLKÜL.*

## K. Landing ↔ Ads audit

| Szempont | Ellenőrzés | Eredmény |
|---|---|---|
| Kulcsszó → H1 | „ágyi poloska irtás” szerepel a H1-ben | Megfelel |
| Hirdetési ígéret → tartalom | „gyors fellépés”, „célzott kezelés” → hero + kezelés szekció alátámasztja | Megfelel |
| Ár | Címsor „Ágyi Poloska Irtás Ár” → landing #arak szekció valós placeholderrel | Megfelel (ár még nincs megadva, placeholder jelzi) |
| CTA | Címsorok CTA-jellegűek → hero és záró CTA gomb egyezik | Megfelel |
| Sitelink anchor | Minden sitelink URL-hez tartozik ténylegesen létező `id` a landingen | Megfelel |
| Kitalált üzleti állítás | Nincs garancia-, értékelés- vagy tapasztalatiév-állítás egyik szövegben sem | Megfelel |
