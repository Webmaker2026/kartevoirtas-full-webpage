'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render({ path }) {
  return renderServiceLanding({
    path,
    hero: {
      breadcrumbLabel: 'Ágyi poloska irtás',
      h1: 'Ágyi poloska irtás lakásban és szálláshelyen',
      intro:
        'Sorban álló csípésnyomok reggelente, sötét pöttyök a matrac varrásán? Ezek az ágyi poloska jellemző jelei. Megnézzük, mekkora a fertőzöttség, és elvégezzük a kezelést.',
      mediaKey: 'agyi-poloska-irtas',
    },
    sections: [
      {
        type: 'signs',
        id: 'jelek',
        eyebrow: 'A fertőzöttség jelei',
        title: 'Honnan tudhatja, hogy ágyi poloska van a lakásban?',
        intro: 'A poloska éjszaka táplálkozik, nappal réseken bújik meg, ezért ritkán látni. A nyomai viszont árulkodók.',
        items: [
          { title: 'Csípések sorban vagy csoportban', body: 'Jellemzően két-három csípés egy vonalban, a takaró alól kilógó testrészeken: karon, nyakon, lábszáron. Nem mindenki reagál rájuk egyformán — van, akinél alig látszanak.' },
          { title: 'Sötét pöttyök a matracon', body: 'A poloska ürüléke apró, fekete-barna, tintaszerű folt a matrac varrásán, az ágykeret illesztéseinél és a lepedőn.' },
          { title: 'Vérfoltok a lepedőn', body: 'Apró, elkenődött vérfoltok ott, ahol alvás közben egy jóllakott poloska szétnyomódott.' },
          { title: 'Levedlett bőrök, peték', body: 'Üres, világosbarna vedlési bőrök és rizsszemnél kisebb, fehér peték a búvóhelyek közelében.' },
        ],
      },
      {
        type: 'about',
        eyebrow: 'Miért nehéz egyedül?',
        title: 'A poloska nem csak a matracban él',
        paragraphs: [
          'Az ágyi poloska minden olyan résbe behúzódik, ami az alvóhely közelében van: ágykeret, fejtámla, éjjeliszekrény, szegélyléc, konnektor, képkeret. Ha csak a matracot kezelik, a máshol maradt egyedek és peték néhány hét alatt újra benépesítik a szobát.',
          'A boltban kapható rovarirtó sprayk többnyire csak a közvetlenül eltalált poloskákat pusztítják el, a petéket nem — a többit pedig szétkergethetik a lakás más helyiségeibe. Ezért érdemes már az első jeleknél szakembert hívni.',
        ],
        sideTitle: 'Így kerülhet a lakásba',
        sideItems: [
          'Utazás után, bőröndben, ruhában',
          'Használt bútorral, matraccal',
          'Társasházban a szomszéd lakásból',
          'Használt ruhával, csomaggal',
        ],
      },
      {
        type: 'method',
        id: 'kezeles',
        eyebrow: 'A kezelés menete',
        title: 'Hogyan zajlik az ágyi poloska irtás?',
        items: [
          { title: 'Felmérés', body: 'Megnézzük a hálószobát és a szomszédos helyiségeket, hogy kiderüljön, mennyire terjedt el a poloska, és mely szobákat kell kezelni.' },
          { title: 'Kezelés', body: 'Az ágy, a bútorok, a szegélylécek és a többi búvóhely mentén elvégezzük a rovarirtást. A módszert és a szert a helyszín alapján választjuk ki.' },
          { title: 'Második kör, ha kell', body: 'A kezelés idején lerakott peték egy része később kel ki, ezért ágyi poloskánál gyakran szükség van egy második kezelésre. Ezt a felméréskor megbeszéljük.' },
        ],
      },
      {
        type: 'pricing',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Ágyi poloska irtás árak',
        intro: 'Az ár elsősorban attól függ, hány helyiséget kell kezelni, és mennyire súlyos a fertőzöttség. Pontos árat a felmérés után adunk.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Felmérés', 'A fertőzöttség mértékének és a kezelendő helyiségeknek a megállapítása', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kezelés — 1 hálószoba', 'Ágy, bútorok, szegélylécek és búvóhelyek kezelése egy helyiségben', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kezelés — több helyiség', 'Ha a poloska a lakás több szobájában is megjelent', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Ismételt kezelés', 'Második kör a később kikelő poloskák ellen', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'Szálláshelyek, munkásszállók és kollégiumok részére egyedi ajánlatot adunk.',
      },
      {
        type: 'twoList',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Mit kell tenni a kezelés előtt és után?',
        leftTitle: 'A kezelés előtt',
        leftItems: [
          'Az ágyneműt, a függönyöket és a ruhákat mossa ki legalább 60 °C-on, majd tegye zárt zsákba.',
          'A nem mosható textíliákat zsákolja be, és ne vigye át másik helyiségbe.',
          'Tegye szabaddá az ágy, a szekrények és a szegélylécek környékét.',
          'Ne használjon előtte rovarirtó sprayt, mert szétszórhatja a poloskákat.',
        ],
        rightTitle: 'A kezelés után',
        rightItems: [
          'A kezelt felületeket a megbeszélt ideig ne mossa le és ne porszívózza fel.',
          'Ha nem kérjük másképp, aludjon a megszokott helyén — ha másik szobába költözik, a poloskák is követhetik.',
          'Az első napokban még előfordulhat egy-egy csípés vagy élő poloska.',
          'Ha két-három hét után is új csípéseket tapasztal, jelezze nekünk.',
        ],
      },
      {
        type: 'trust',
        scope: 'Lakás, családi ház, szálláshely, munkásszálló',
      },
      {
        type: 'faq',
        id: 'gyik',
        idPrefix: 'poloska-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Kérdések az ágyi poloska irtásról',
        items: [
          { q: 'Elég egyetlen kezelés?', a: 'Kisebb, korán észrevett fertőzöttségnél előfordul, hogy igen. Ágyi poloskánál azonban gyakran kell egy második kör, mert a peték egy része a kezelés után kel ki. A felméréskor megmondjuk, mire számíthat.' },
          { q: 'Mikor szűnnek meg a csípések?', a: 'Általában a kezelés utáni napokban, hetekben fokozatosan ritkulnak. A régi csípésnyomok gyógyulása ettől függetlenül eltarthat egy ideig.' },
          { q: 'Albérletben is kérhetem a kezelést?', a: 'Igen. Érdemes a bérbeadónak is szólni, mert a szomszédos lakások ellenőrzése vagy a költségek megosztása miatt gyakran vele is egyeztetni kell.' },
          { q: 'Mit csináljak a ruhákkal és a textíliákkal?', a: 'Amit lehet, mosson ki legalább 60 °C-on, vagy szárítsa szárítógépben magas fokozaton, és a kezelés végéig tárolja lezárt zsákban. A tiszta és a még nem kezelt holmikat tartsa külön.' },
          { q: 'Honnan jöhetett a poloska?', a: 'Leggyakrabban utazásból hozzuk haza bőröndben vagy ruhában, illetve használt bútorral, matraccal kerül a lakásba. Társasházban a szomszédból is átjöhet. A poloska nem a kosz jele: tiszta lakásban is megjelenhet.' },
        ],
      },
      {
        type: 'contact',
        id: 'ajanlatkeres',
        title: 'Kérjen ajánlatot ágyi poloska irtásra',
        presetService: 'agyi-poloska-irtas',
      },
    ],
  });
}

module.exports = { render };
