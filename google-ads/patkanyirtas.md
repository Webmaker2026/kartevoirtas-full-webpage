# Google Ads csomag — Patkányirtás

> Belső marketingdokumentáció. NEM kerül a production FTP csomagba.

## A. Landing

- Szolgáltatás: Patkányirtás
- Cél URL: `[DOMAIN]/patkanyirtas/`
- Landing H1: „Patkányirtás lakóingatlanban, telephelyen és gazdasági épületben”
- Elsődleges konverzió: sikeresen elküldött és szerveroldalon feldolgozott ajánlatkérés (`/koszonjuk/`)
- Másodlagos konverzió: telefon CTA kattintás (`data-track="call"`)

## B. Keresési szándék

- Közvetlen szolgáltatáskeresés: „patkányirtás”
- Ár-orientált keresés: „patkányirtás ár”
- Probléma alapú: „kaparászás a padláson”, „rágásnyomok a fal mentén”
- Üzleti keresés: „patkányirtás telephely”, „patkányirtás gazdasági épület”
- Lokális keresés: „patkányirtás [SZOLGÁLTATÁSI TERÜLET]”

## C. Kulcsszavak keresési szándék szerint

**Szolgáltatás-központú**
- patkányirtás
- patkány elleni kezelés
- rágcsálómentesítés

**Ár-központú**
- patkányirtás ár
- patkányirtás ára

**Probléma alapú**
- kaparászás a padláson
- rágásnyomok a fal mentén
- patkányürülék a pincében

**Üzleti / lokális**
- patkányirtás telephely
- patkányirtás gazdasági épület
- patkányirtás [SZOLGÁLTATÁSI TERÜLET]

## D. Negatív kulcsszavak

- díszpatkány
- patkány kalitka
- patkány eledel
- patkány játék
- patkány jelentése

*Nem zártunk ki olyan kifejezéseket, mint „patkánylyuk a kertben”, mert ez valós, azonnali kártevőirtási
igényt jelez.*

## E. RSA Címsorok (15 db, max. 30 karakter)

1. Patkányirtás Gyorsan
2. Patkányirtás Szakszerűen
3. Patkányirtás Ár
4. Zaj a Padláson Éjjel?
5. Biztonságos Rágcsálóirtás
6. Patkányirtás Telephelyen
7. Bejárat-Felmérés is Jár
8. Csapdázás és Kezelés
9. Kérjen Patkányirtás Árat
10. Patkányirtás Pincében
11. Gyors Kiszállás, Kezelés
12. Nem Tér Vissza a Patkány
13. Patkányirtás Kertben
14. Gazdasági Épület Kezelés
15. Hívjon Patkányirtóért

## F. RSA Leírások (4 db, max. 90 karakter)

1. Patkányirtás biztonságos csapdázással és kezeléssel. Kérjen ajánlatot most.
2. Éjszakai zajok, rágásnyomok? Felmérjük a bejáratot, szakszerűen mentesítünk.
3. Lakóház, telephely, gazdasági épület — gyors időpont-egyeztetés, kontrollal.
4. Higiéniai kockázat — minél előbb lép, annál kisebb a kár. Hívjon minket.

## G. Karakterszám-audit

Lásd: `node scripts/verify-ads.js` — a script minden címsort és leírást ténylegesen lemér, becslés nélkül.

## H. Sitelinkek

| Szöveg | Cél URL | Leírás 1 | Leírás 2 |
|---|---|---|---|
| Patkányirtás árak | `[DOMAIN]/patkanyirtas/#arak` | Részletes árlista | Mit tartalmaz az ár |
| Fertőzöttség jelei | `[DOMAIN]/patkanyirtas/#jelek` | Ismerje fel időben | Zaj, rágásnyom, ürülék |
| Kezelés menete | `[DOMAIN]/patkanyirtas/#kezeles` | Lépésről lépésre | Csapdázás, bejárat-lezárás |
| Előkészületek | `[DOMAIN]/patkanyirtas/#tudnivalok` | Mit tegyen előtte | És a kezelés után |
| GYIK | `[DOMAIN]/patkanyirtas/#gyik` | Gyakori kérdések | Válaszok percek alatt |
| Ajánlatkérés | `[DOMAIN]/patkanyirtas/#ajanlatkeres` | Kérjen ajánlatot | Gyors visszajelzés |

## I. További assetek

**Callout javaslatok (max. 25 karakter)**
1. Biztonságos módszerek
2. Bejárat-felmérés is jár
3. Lakóház és telephely is
4. Gyors időpont-egyeztetés

**Structured snippet**
- Típus: Szolgáltatások
- Értékek: Helyszíni felmérés, Csapdázás, Bejárat-lezárási javaslat

**Display Path (max. 15 karakter/szegmens)**
1. Patkanyirtas
2. Arak

**Egyéb javasolt asset**
- Call asset: `[TELEFONSZÁM]` (hívás kiterjesztés)
- Location asset: csak valós, nyilvános üzleti cím esetén állítható be — jelenleg nincs.

## J. Tracking / UTM terv

- Campaign naming: `pest-patkany`
- Ad group naming: `patkany-lakossagi`, `patkany-uzleti`, `patkany-ar`
- Landing: `[DOMAIN]/patkanyirtas/`
- Elsődleges konverzió: form_success (`/koszonjuk/` — csak szerveroldali feldolgozás után)
- Másodlagos konverzió: call_click, quote_cta_click
- utm_source: google
- utm_medium: cpc
- utm_campaign: pest-patkany
- utm_content: {ad group szerint, pl. patkany-uzleti}

*Google Ads / GA4 / GTM azonosítók még nincsenek megadva — kitalált érték nélkül a `src/config.js`-ben rögzítendők.*

## K. Landing ↔ Ads audit

| Szempont | Ellenőrzés | Eredmény |
|---|---|---|
| Kulcsszó → H1 | „patkányirtás” szerepel a H1-ben | Megfelel |
| Hirdetési ígéret → tartalom | „biztonságos”, „bejárat-felmérés” → method szekció alátámasztja | Megfelel |
| Üzleti szegmens | „telephely”, „gazdasági épület” → landing pricing sorban is szerepel | Megfelel |
| Ár | Címsor „Patkányirtás Ár” → #arak szekció, valós placeholderrel | Megfelel |
| Sitelink anchor | Minden URL valóban létező `id`-re mutat a landingen | Megfelel |
| Kitalált üzleti állítás | Nincs garancia-, értékelés- vagy tapasztalatiév-állítás | Megfelel |
