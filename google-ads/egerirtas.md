# Google Ads csomag — Egérirtás

> Belső marketingdokumentáció. NEM kerül a production FTP csomagba.

## A. Landing

- Szolgáltatás: Egérirtás
- Cél URL: `[DOMAIN]/egerirtas/`
- Landing H1: „Egérirtás lakásban, házban és üzletben”
- Elsődleges konverzió: sikeresen elküldött és szerveroldalon feldolgozott ajánlatkérés (`/koszonjuk/`)
- Másodlagos konverzió: telefon CTA kattintás (`data-track="call"`)

## B. Keresési szándék

- Közvetlen szolgáltatáskeresés: „egérirtás”
- Ár-orientált keresés: „egérirtás ár”
- Probléma alapú: „egér a konyhaszekrényben”, „rágásnyomok az élelmiszeren”
- Szezonális keresés: ősszel megnövekedett keresési volumen a hidegebb idő beköszöntével
- Lokális keresés: „egérirtás [SZOLGÁLTATÁSI TERÜLET]”

## C. Kulcsszavak keresési szándék szerint

**Szolgáltatás-központú**
- egérirtás
- egér elleni kezelés
- egérmentesítés

**Ár-központú**
- egérirtás ár
- egérirtás ára lakásban

**Probléma alapú**
- egér a konyhaszekrényben
- rágásnyomok az élelmiszeren
- neszezés a falban

**Lokális**
- egérirtás [SZOLGÁLTATÁSI TERÜLET]
- egérirtás gyorsan

## D. Negatív kulcsszavak

**Kritikus: az „egér” szó a számítógépes eszközzel azonos alakú, ezért ez a lista különösen fontos.**
- vezeték nélküli egér
- gamer egér
- logitech egér
- egér ár (számítástechnikai kontextusban jellemző keresés)
- egér bolt
- egér vásárlás
- bluetooth egér
- egérpad

*A fenti negatívok nélkül a kampány jelentős, irreleváns számítástechnikai forgalmat és költést vonzana.
Emellett szándékosan NEM zártunk ki olyan kifejezéseket, mint „házi egér ellen mit tegyek”, mert ez valós
kártevőirtási problémára utaló, konvertálható keresés lehet.*

## E. RSA Címsorok (15 db, max. 30 karakter)

1. Egérirtás Gyorsan
2. Egérirtás Szakszerűen
3. Egérirtás Ár
4. Egér a Konyhában?
5. Célzott Egérirtás
6. Egérirtás Csapdázással
7. Bejárat-Felmérés is Jár
8. Kérjen Egérirtás Árat
9. Egérirtás Lakásban
10. Gyors Kiszállás, Kezelés
11. Nem Tér Vissza az Egér
12. Egérirtás Pincében
13. Rágcsálómentesítés
14. Egérirtás Üzletben
15. Hívjon Egérirtóért

## F. RSA Leírások (4 db, max. 90 karakter)

1. Egérirtás csapdázással és monitoringgal. Kérjen ajánlatot, hívjon most.
2. Neszezés a falban, rágásnyom az élelmiszeren? Szakszerűen mentesítünk.
3. Lakás, üzlet, telephely — gyors időpont-egyeztetés, bejárat-felméréssel.
4. A visszatérést a bejutási pontok lezárásával előzzük meg. Kérjen ajánlatot.

## G. Karakterszám-audit

Lásd: `node scripts/verify-ads.js` — a script minden címsort és leírást ténylegesen lemér, becslés nélkül.

## H. Sitelinkek

| Szöveg | Cél URL | Leírás 1 | Leírás 2 |
|---|---|---|---|
| Egérirtás árak | `[DOMAIN]/egerirtas/#arak` | Részletes árlista | Mit tartalmaz az ár |
| Fertőzöttség jelei | `[DOMAIN]/egerirtas/#jelek` | Ismerje fel időben | Ürülék, rágásnyom, szag |
| Kezelés menete | `[DOMAIN]/egerirtas/#kezeles` | Lépésről lépésre | Csapdázás, bejárat-lezárás |
| Előkészületek | `[DOMAIN]/egerirtas/#tudnivalok` | Mit tegyen előtte | És a kezelés után |
| GYIK | `[DOMAIN]/egerirtas/#gyik` | Gyakori kérdések | Válaszok percek alatt |
| Ajánlatkérés | `[DOMAIN]/egerirtas/#ajanlatkeres` | Kérjen ajánlatot | Gyors visszajelzés |

## I. További assetek

**Callout javaslatok (max. 25 karakter)**
1. Csapdázás és monitoring
2. Bejárat-felmérés is jár
3. Lakás és üzlet is
4. Gyors időpont-egyeztetés

**Structured snippet**
- Típus: Szolgáltatások
- Értékek: Felmérés, Csapdázás, Megelőzési javaslat

**Display Path (max. 15 karakter/szegmens)**
1. Egerirtas
2. Arak

**Egyéb javasolt asset**
- Call asset: `[TELEFONSZÁM]` (hívás kiterjesztés)
- Location asset: csak valós, nyilvános üzleti cím esetén állítható be — jelenleg nincs.

## J. Tracking / UTM terv

- Campaign naming: `pest-eger`
- Ad group naming: `eger-lakossagi`, `eger-uzleti`, `eger-ar`
- Landing: `[DOMAIN]/egerirtas/`
- Elsődleges konverzió: form_success (`/koszonjuk/` — csak szerveroldali feldolgozás után)
- Másodlagos konverzió: call_click, quote_cta_click
- utm_source: google
- utm_medium: cpc
- utm_campaign: pest-eger
- utm_content: {ad group szerint, pl. eger-lakossagi}

*Google Ads / GA4 / GTM azonosítók még nincsenek megadva — kitalált érték nélkül a `src/config.js`-ben rögzítendők.*

## K. Landing ↔ Ads audit

| Szempont | Ellenőrzés | Eredmény |
|---|---|---|
| Kulcsszó → H1 | „egérirtás” szerepel a H1-ben | Megfelel |
| Homonima-kockázat | Számítástechnikai „egér” negatívokkal kezelve | Megfelel |
| Hirdetési ígéret → tartalom | „bejárat-felmérés”, „csapdázás” → method szekció alátámasztja | Megfelel |
| Ár | Címsor „Egérirtás Ár” → #arak szekció, valós placeholderrel | Megfelel |
| Sitelink anchor | Minden URL valóban létező `id`-re mutat a landingen | Megfelel |
| Kitalált üzleti állítás | Nincs garancia-, értékelés- vagy tapasztalatiév-állítás | Megfelel |
