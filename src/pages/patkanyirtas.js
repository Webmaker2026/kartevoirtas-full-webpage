'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render() {
  return renderServiceLanding({
    hero: {
      breadcrumbLabel: 'Patkányirtás',
      tag: 'Higiéniai kockázat — érdemes gyorsan lépni',
      eyebrow: 'Patkányirtás',
      h1: 'Patkányirtás lakóingatlanban, telephelyen és gazdasági épületben',
      intro:
        'Éjszakai kaparászás a padláson, rágásnyomok, ürülék vagy bejáratként szolgáló lyuk a fal mentén — a patkányfertőzöttség higiéniai kockázata miatt a gyors, szakszerű beavatkozás a legfontosabb.',
      badges: [
        { icon: 'shield', text: 'Csapdázás és biztonságos irtószeres kezelés' },
        { icon: 'clock', text: 'Rugalmas időpont-egyeztetés' },
        { icon: 'pin', text: '[SZOLGÁLTATÁSI TERÜLET]' },
      ],
      tagBoxLeft: 'Bejárat-felmérés',
      tagBoxRight: 'Biztonságos mentesítés',
      mediaKey: 'patkanyirtas',
    },
    sections: [
      {
        type: 'signs',
        bg: 'light',
        id: 'jelek',
        eyebrow: 'Fertőzöttség jelei',
        title: 'Honnan ismerhető fel a patkányfertőzöttség?',
        items: [
          { title: 'Éjszakai zajok a padláson, falban', body: 'Kaparászó, futkosó hangok jellemzően este és éjszaka, a padlástérből vagy a fal üregeiből.' },
          { title: 'Rágásnyomok', body: 'Csomagoláson, faszerkezeten, kábeleken megjelenő rágásnyomok komoly kockázatot és kárt is jelenthetnek.' },
          { title: 'Ürülék és nyomvonalak', body: 'Sötét, rizsszem méretű ürülék, valamint zsíros nyomvonal a fal mentén, ahol a patkány rendszeresen közlekedik.' },
          { title: 'Bejáratként szolgáló lyukak', body: 'Alapozáson, falszerkezeten vagy ajtók alatt talált friss, kikopott szélű lyuk gyakori bejárati pont.' },
        ],
      },
      {
        type: 'about',
        bg: 'dark',
        eyebrow: 'Miért fontos a szakszerű megközelítés',
        title: 'Nem csak az irtás, a bejárat lezárása is számít',
        paragraphs: [
          'A patkány kiváló mászó- és rágóképessége miatt szinte bármilyen rést, csővezetéket vagy alapozási hézagot bejáratként tud használni — a fertőzöttség tartós felszámolásához a jelenlegi egyedek eltávolítása mellett a bejutási pontok azonosítása is szükséges.',
          'A kezelés módját (csapdázás, biztonságos irtószeres pontok) mindig a helyszín adottságaihoz — lakott terület közelsége, gyerekek, háziállatok jelenléte — igazítjuk.',
        ],
        sideTitle: 'Tipikus bejutási pontok',
        sideItems: ['Alapozási rések, pincelejáró', 'Csővezetékek, szellőzőnyílások', 'Ajtók, kapuk alatti rés', 'Kerti hulladék, tárolók közelében'],
      },
      {
        type: 'method',
        bg: 'light',
        id: 'kezeles',
        eyebrow: 'Kezelés módja',
        title: 'Hogyan végezzük a mentesítést',
        items: [
          { icon: 'target', title: 'Helyszíni felmérés', body: 'Feltérképezzük a nyomvonalakat, a bejutási pontokat és a fertőzöttség kiterjedését.' },
          { icon: 'shield', title: 'Csapdázás és biztonságos irtószeres pontok', body: 'A helyszín adottságaihoz igazodva csapdákat és zárt, biztonságos méregpontokat helyezünk ki.' },
          { icon: 'process', title: 'Bejárat lezárására vonatkozó javaslat', body: 'Tájékoztatást adunk az azonosított bejutási pontok lezárásához szükséges teendőkről.' },
        ],
      },
      {
        type: 'pricing',
        bg: 'dark',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Patkányirtás árak',
        intro: 'A végleges ár az ingatlan típusától (lakóház, telephely, gazdasági épület) és a fertőzöttség mértékétől függ.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Helyszíni felmérés', 'Nyomvonalak és bejutási pontok feltérképezése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Lakóingatlan mentesítése', 'Csapdázás és/vagy biztonságos irtószeres kezelés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Telephely / gazdasági épület', 'Nagyobb alapterületre kiterjedő mentesítés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kontroll látogatás', 'Csapdák ellenőrzése, utókövetés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'Ismétlődő fertőzöttség esetén rendszeres monitoring szolgáltatást is tudunk ajánlani — erről egyedi egyeztetés alapján adunk tájékoztatást.',
      },
      {
        type: 'twoList',
        bg: 'light',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Előkészületek és teendők a kezelés után',
        leftTitle: 'Mit érdemes előkészíteni',
        leftItems: [
          'Élelmiszert és takarmányt rágcsálóbiztos, zárt tárolóban tartson',
          'A padlástér és a pince legyen hozzáférhető a felméréshez',
          'Jelezze, ha kisgyermek vagy háziállat használja rendszeresen az érintett teret',
        ],
        rightTitle: 'Teendők a kezelés után',
        rightItems: [
          'A kihelyezett csapdákat, méregpontokat ne mozdítsa el',
          'Elhullott egyedet ne puszta kézzel távolítson el',
          'A javasolt bejárat-lezárási teendőket érdemes mielőbb elvégezni',
        ],
      },
      {
        type: 'trust',
        bg: 'dark',
        eyebrow: 'Miért minket válasszon',
        title: 'Amire számíthat a mentesítéstől',
        items: [
          { icon: 'shield', title: 'Biztonságos módszerek', body: 'A helyszín adottságaihoz (gyerek, háziállat) igazított, biztonságos megoldásokat alkalmazunk.' },
          { icon: 'target', title: 'Bejárat-felmérés is a folyamat része', body: 'Nem csak irtunk, hanem a visszatérés okát is igyekszünk azonosítani.' },
          { icon: 'building', title: 'Lakóingatlan és telephely is', body: 'Családi háztól a gazdasági épületig vállaljuk a mentesítést.' },
          { icon: 'clock', title: 'Rugalmas időpont', body: 'A probléma sürgősségéhez igazodó időpontot egyeztetünk.' },
        ],
      },
      {
        type: 'area',
        bg: 'light',
        id: 'terulet',
        eyebrow: 'Szolgáltatási terület',
        title: 'Hol vállalunk patkányirtást',
        areas: ['[SZOLGÁLTATÁSI TERÜLET]'],
      },
      {
        type: 'faq',
        bg: 'dark',
        id: 'gyik',
        idPrefix: 'patkany-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Patkányirtással kapcsolatos kérdések',
        items: [
          { q: 'Veszélyes a kezelés gyerekek és háziállatok mellett?', a: 'A kihelyezett csapdák és méregpontok elhelyezésénél mindig figyelembe vesszük, ha gyermek vagy háziállat is használja a területet, és ennek megfelelő, biztonságos megoldást alkalmazunk.' },
          { q: 'Mennyi idő alatt szűnik meg a fertőzöttség?', a: 'A látható aktivitás jellemzően a kezelést követő napokban csökken, a teljes felszámolás azonban a fertőzöttség mértékétől és a bejárat lezárásától függően eltarthat néhány hétig.' },
          { q: 'Honnan jönnek be a patkányok az épületbe?', a: 'Leggyakrabban alapozási réseken, csővezetékek mentén, pincelejárón vagy ajtók alatti hézagon keresztül jutnak be, különösen ősszel, amikor hideg elől keresnek menedéket.' },
          { q: 'Visszatérnek a patkányok a mentesítés után?', a: 'Ha a bejutási pontok nincsenek lezárva, új egyedek is bejuthatnak — ezért javasoljuk az azonosított rések, nyílások mielőbbi lezárását a kezelés után.' },
        ],
      },
      {
        type: 'contact',
        bg: 'light',
        id: 'ajanlatkeres',
        eyebrow: 'Ajánlatkérés',
        title: 'Kérjen ajánlatot patkányirtásra',
        presetPest: 'patkanyirtas',
      },
    ],
    finalCta: {
      eyebrow: 'Higiéniai kockázat',
      title: 'Minél tovább áll fenn, annál nagyobb a kár és a kockázat',
      body: 'Írja le, milyen jeleket észlelt, és rövid időn belül visszajelzünk a lehetséges időpontról.',
    },
  });
}

module.exports = { render };
