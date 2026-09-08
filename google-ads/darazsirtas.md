# Google Ads csomag — Darázsirtás

> Belső marketingdokumentáció. NEM kerül a production FTP csomagba.

## A. Landing

- Szolgáltatás: Darázsirtás
- Cél URL: `[DOMAIN]/darazsirtas/`
- Landing H1: „Darázsirtás — darázsfészek biztonságos eltávolítása”
- Elsődleges konverzió: sikeresen elküldött és szerveroldalon feldolgozott ajánlatkérés (`/koszonjuk/`)
- Másodlagos konverzió: telefon CTA kattintás (`data-track="call"`) — ennél a szolgáltatásnál kiemelten
  fontos, mert a sürgős esetek jelentős része telefonon indul.

## B. Keresési szándék

- Sürgősségi keresés: „darázsfészek eltávolítás azonnal”, „darázsirtás sürgős”
- Közvetlen szolgáltatáskeresés: „darázsirtás”, „darázsfészek irtás”
- Ár-orientált keresés: „darázsirtás ár”
- Probléma alapú: „darázsfészek a tetőtérben”, „darázsfészek a redőnyben”
- Lokális keresés: „darázsirtás [SZOLGÁLTATÁSI TERÜLET]”

## C. Kulcsszavak keresési szándék szerint

**Sürgősségi**
- darázsirtás sürgős
- darázsfészek eltávolítás azonnal
- darázsirtás gyors kiszállás

**Szolgáltatás-központú**
- darázsirtás
- darázsfészek irtás
- darázsfészek eltávolítás

**Ár-központú**
- darázsirtás ár
- darázsfészek eltávolítás ára

**Probléma alapú / lokális**
- darázsfészek a tetőtérben
- darázsfészek a redőnyben
- darázsirtás [SZOLGÁLTATÁSI TERÜLET]

## D. Negatív kulcsszavak

- darázsfészek dekoráció
- darázs jelmez
- darázsfészek eladó (dekortárgy-keresés, nem kártevőirtás)
- darázs rajzfilm
- darázs jelentése

*Nem zártunk ki olyan kifejezéseket, mint „darázscsípés kezelése”, mert ez a látogató gyakran a fészek
eltávolítását keresi a csípés elkerülése érdekében.*

## E. RSA Címsorok (15 db, max. 30 karakter)

1. Darázsirtás Gyorsan
2. Darázsfészek Eltávolítás
3. Darázsirtás Ár
4. Darázsfészek a Háznál?
5. Biztonságos Fészekirtás
6. Darázsirtás Sürgősen
7. Allergia? Hívjon Minket
8. Darázsirtás Tetőtérben
9. Gyors Kiszállás, Kezelés
10. Kérjen Darázsirtás Árat
11. Védőfelszereléssel Dolgozunk
12. Darázsfészek a Kertben?
13. Darázsirtás Homlokzaton
14. Ma Kiszállunk, Ha Lehet
15. Hívjon Darázsirtóért

## F. RSA Leírások (4 db, max. 90 karakter)

1. Darázsfészek biztonságos eltávolítása. Kérjen ajánlatot, hívjon most.
2. Allergiaveszély? A fészket szakszerűen, védőfelszereléssel távolítjuk el.
3. Tetőtér, homlokzat, kert — gyors időpont-egyeztetés, célzott beavatkozás.
4. Nehezen elérhető fészek is megoldható — kérjen egyedi ajánlatot most.

## G. Karakterszám-audit

Lásd: `node scripts/verify-ads.js` — a script minden címsort és leírást ténylegesen lemér, becslés nélkül.

## H. Sitelinkek

| Szöveg | Cél URL | Leírás 1 | Leírás 2 |
|---|---|---|---|
| Darázsirtás árak | `[DOMAIN]/darazsirtas/#arak` | Részletes árlista | Mit tartalmaz az ár |
| Mikor sürgős? | `[DOMAIN]/darazsirtas/#jelek` | Allergiaveszély jelei | Mikor ne várjon |
| Kezelés menete | `[DOMAIN]/darazsirtas/#kezeles` | Lépésről lépésre | Biztonságos eltávolítás |
| Előkészületek | `[DOMAIN]/darazsirtas/#tudnivalok` | Mit tegyen előtte | És a kezelés után |
| GYIK | `[DOMAIN]/darazsirtas/#gyik` | Gyakori kérdések | Válaszok percek alatt |
| Ajánlatkérés | `[DOMAIN]/darazsirtas/#ajanlatkeres` | Kérjen ajánlatot | Gyors visszajelzés |

## I. További assetek

**Callout javaslatok (max. 25 karakter)**
1. Védőfelszereléssel jövünk
2. Biztonságos eltávolítás
3. Tetőtér és kert is
4. Gyors időpont-egyeztetés

**Structured snippet**
- Típus: Szolgáltatások
- Értékek: Fészekfelmérés, Biztonságos eltávolítás, Terület-ellenőrzés

**Display Path (max. 15 karakter/szegmens)**
1. Darazsirtas
2. Surgos

**Egyéb javasolt asset**
- Call asset: `[TELEFONSZÁM]` (hívás kiterjesztés) — ennél a szolgáltatásnál különösen javasolt, mivel a
  sürgősségi keresések jelentős része közvetlenül telefonhívásba torkollik.
- Location asset: csak valós, nyilvános üzleti cím esetén állítható be — jelenleg nincs.

## J. Tracking / UTM terv

- Campaign naming: `pest-darazs`
- Ad group naming: `darazs-surgos`, `darazs-altalanos`, `darazs-ar`
- Landing: `[DOMAIN]/darazsirtas/`
- Elsődleges konverzió: form_success (`/koszonjuk/` — csak szerveroldali feldolgozás után)
- Másodlagos konverzió: call_click (ennél a kampánynál kiemelt súllyal kezelendő), quote_cta_click
- utm_source: google
- utm_medium: cpc
- utm_campaign: pest-darazs
- utm_content: {ad group szerint, pl. darazs-surgos}

*Google Ads / GA4 / GTM azonosítók még nincsenek megadva — kitalált érték nélkül a `src/config.js`-ben rögzítendők.*

## K. Landing ↔ Ads audit

| Szempont | Ellenőrzés | Eredmény |
|---|---|---|
| Kulcsszó → H1 | „darázsirtás” szerepel a H1-ben | Megfelel |
| Hirdetési ígéret → tartalom | „biztonságos”, „gyors kiszállás” → hero badge + kezelés szekció alátámasztja | Megfelel |
| Sürgősségi ígéret | Címsorok „ma kiszállunk” jellegű állítása → landing `[KISZÁLLÁSI IDŐ]` placeholderrel jelzi, nincs konkrét idő kitalálva | Megfelel |
| Ár | Címsor „Darázsirtás Ár” → #arak szekció, valós placeholderrel | Megfelel |
| Sitelink anchor | Minden URL valóban létező `id`-re mutat a landingen | Megfelel |
| Kitalált üzleti állítás | Nincs garancia-, értékelés- vagy tapasztalatiév-állítás | Megfelel |
