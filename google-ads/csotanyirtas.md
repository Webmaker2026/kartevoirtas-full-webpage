# Google Ads csomag — Csótányirtás

> Belső marketingdokumentáció. NEM kerül a production FTP csomagba.

## A. Landing

- Szolgáltatás: Csótányirtás
- Cél URL: `[DOMAIN]/csotanyirtas/`
- Landing H1: „Csótányirtás lakásban, társasházban és étteremben”
- Elsődleges konverzió: sikeresen elküldött és szerveroldalon feldolgozott ajánlatkérés (`/koszonjuk/`)
- Másodlagos konverzió: telefon CTA kattintás (`data-track="call"`)

## B. Keresési szándék

- Közvetlen szolgáltatáskeresés: „csótányirtás”
- Ár-orientált keresés: „csótányirtás ár”
- Probléma / tünet alapú: „csótány a konyhában”, „fekete pontok a szekrényben”
- Üzleti / vendéglátóipari keresés: „csótányirtás étterem”, „csótányirtás társasház”
- Lokális keresés: „csótányirtás [SZOLGÁLTATÁSI TERÜLET]”

## C. Kulcsszavak keresési szándék szerint

**Szolgáltatás-központú**
- csótányirtás
- csótány elleni kezelés
- csótánymentesítés

**Ár-központú**
- csótányirtás ár
- csótányirtás ára lakásban
- mennyibe kerül a csótányirtás

**Probléma / tünet alapú**
- csótány a konyhában
- fekete pontok a szekrényben
- csótány a fürdőszobában

**Üzleti / lokális**
- csótányirtás étterem
- csótányirtás társasház
- csótányirtás [SZOLGÁLTATÁSI TERÜLET]

## D. Negatív kulcsszavak

- csótány játék
- csótányfarm játék
- csótány jelmez
- csótány rajzfilm
- csótány jelentése

*Szándékosan nem zártunk ki olyan kifejezéseket, mint „társasházi közös képviselő”, mert ez valós, üzleti
döntéshozói célcsoportot jelenthet.*

## E. RSA Címsorok (15 db, max. 30 karakter)

1. Csótányirtás Gyorsan
2. Csótányirtás Szakszerűen
3. Csótányirtás Ár
4. Csótány a Konyhában?
5. Célzott Csótányirtás
6. Csótányirtás Társasházban
7. Csótányirtás Étteremben
8. Nem Tér Vissza a Csótány
9. Rejtekhely-Térkép, Kezelés
10. Csótányirtás Kontrollal
11. Kérjen Csótányirtás Árat
12. Gyors Kiszállás, Kezelés
13. Csótányirtás Lakásban
14. Csótányirtás Irodában
15. Hívjon Csótányirtóért

## F. RSA Leírások (4 db, max. 90 karakter)

1. Csótányirtás célzott gél csalétekkel. Kérjen ajánlatot, hívjon most.
2. Csótányt látott a konyhában? Felmérjük a rejtekhelyeket, szakszerűen irtunk.
3. Lakás, iroda, vendéglátóhely — gyors időpont-egyeztetés, kontroll látogatással.
4. Társasházi közös terek kezelése is megoldható — kérjen egyedi ajánlatot.

## G. Karakterszám-audit

Lásd: `node scripts/verify-ads.js` — a script minden címsort és leírást ténylegesen lemér, becslés nélkül.

## H. Sitelinkek

| Szöveg | Cél URL | Leírás 1 | Leírás 2 |
|---|---|---|---|
| Csótányirtás árak | `[DOMAIN]/csotanyirtas/#arak` | Részletes árlista | Mit tartalmaz az ár |
| Fertőzöttség jelei | `[DOMAIN]/csotanyirtas/#jelek` | Ismerje fel időben | Ürülék, szag, ooteka |
| Kezelés menete | `[DOMAIN]/csotanyirtas/#kezeles` | Lépésről lépésre | Felmérés, célzott kezelés |
| Előkészületek | `[DOMAIN]/csotanyirtas/#tudnivalok` | Mit tegyen előtte | És a kezelés után |
| GYIK | `[DOMAIN]/csotanyirtas/#gyik` | Gyakori kérdések | Válaszok percek alatt |
| Ajánlatkérés | `[DOMAIN]/csotanyirtas/#ajanlatkeres` | Kérjen ajánlatot | Gyors visszajelzés |

## I. További assetek

**Callout javaslatok (max. 25 karakter)**
1. Célzott gél csalétek
2. Kontroll látogatással
3. Társasház és étterem is
4. Gyors időpont-egyeztetés

**Structured snippet**
- Típus: Szolgáltatások
- Értékek: Felmérés, Célzott kezelés, Kontroll látogatás

**Display Path (max. 15 karakter/szegmens)**
1. Csotanyirtas
2. Arak

**Egyéb javasolt asset**
- Call asset: `[TELEFONSZÁM]` (hívás kiterjesztés)
- Location asset: csak valós, nyilvános üzleti cím esetén állítható be — jelenleg nincs.

## J. Tracking / UTM terv

- Campaign naming: `pest-csotany`
- Ad group naming: `csotany-altalanos`, `csotany-ar`, `csotany-uzleti`
- Landing: `[DOMAIN]/csotanyirtas/`
- Elsődleges konverzió: form_success (`/koszonjuk/` — csak szerveroldali feldolgozás után)
- Másodlagos konverzió: call_click, quote_cta_click
- utm_source: google
- utm_medium: cpc
- utm_campaign: pest-csotany
- utm_content: {ad group szerint, pl. csotany-uzleti}

*Google Ads / GA4 / GTM azonosítók még nincsenek megadva — kitalált érték nélkül a `src/config.js`-ben rögzítendők.*

## K. Landing ↔ Ads audit

| Szempont | Ellenőrzés | Eredmény |
|---|---|---|
| Kulcsszó → H1 | „csótányirtás” szerepel a H1-ben | Megfelel |
| Hirdetési ígéret → tartalom | „célzott”, „nem tér vissza” → rejtekhely-térkép + kontroll szekció alátámasztja | Megfelel |
| Üzleti szegmens | „társasház”, „étterem” címsorok → landing tartalmaz üzleti/társasházi bekezdést és árat | Megfelel |
| Ár | Címsor „Csótányirtás Ár” → #arak szekció, valós placeholderrel | Megfelel |
| Sitelink anchor | Minden URL valóban létező `id`-re mutat a landingen | Megfelel |
| Kitalált üzleti állítás | Nincs garancia-, értékelés- vagy tapasztalatiév-állítás | Megfelel |
