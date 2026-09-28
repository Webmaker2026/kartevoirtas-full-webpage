'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render({ path }) {
  return renderServiceLanding({
    path,
    hero: {
      breadcrumbLabel: 'Patkányirtás',
      h1: 'Patkányirtás lakóházban és telephelyen',
      intro:
        'Kaparászás a padláson, rágásnyomok, ürülék a pincében? A patkány betegségeket terjeszthet, kábelt és szigetelést rág, ezért nem érdemes várni. Kihelyezzük a csapdákat vagy etetőállomásokat, és megmutatjuk, hol jutnak be.',
      mediaKey: 'patkanyirtas',
    },
    sections: [
      {
        type: 'signs',
        id: 'jelek',
        eyebrow: 'A fertőzöttség jelei',
        title: 'Honnan ismerhető fel a patkány?',
        items: [
          { title: 'Zaj éjszaka', body: 'Kaparászás, futkosás este és éjjel a padláson, az álmennyezet fölött vagy a falban.' },
          { title: 'Rágásnyomok', body: 'Megrágott csomagolás, faszerkezet, kábel vagy műanyag cső. A megrágott kábel tűzveszélyes is lehet.' },
          { title: 'Ürülék és nyomvonal', body: 'Sötét, 1–2 cm-es, orsó alakú ürülék, és zsíros, sötét csík a fal mentén, ahol a patkány rendszeresen közlekedik.' },
          { title: 'Járatok, lyukak', body: 'Friss, kikopott szélű lyuk a lábazaton, a kerti tároló alatt vagy a földben, túrásnyomok a kerítés mentén.' },
        ],
      },
      {
        type: 'about',
        eyebrow: 'Miért fontos a bejutási pont?',
        title: 'Nem elég az irtás, a bejáratot is le kell zárni',
        paragraphs: [
          'A patkány jól mászik, úszik, és a keményebb anyagokat is átrágja. Csatornán, lefolyón, alapozási résen, sérült szellőzőrácson vagy nyitva hagyott pinceajtón is bejut. Ha csak az épületben lévő állatokat irtjuk ki, ugyanazon az úton újak érkezhetnek.',
          'A kezelés módját — csapda vagy zárt, irtószeres etetőállomás — a helyszín alapján választjuk ki. Ha gyerek, háziállat vagy haszonállat van a közelben, azt is figyelembe vesszük.',
        ],
        sideTitle: 'Gyakori bejutási pontok',
        sideItems: [
          'Csatorna, lefolyó, aknafedél',
          'Alapozási rések, pinceablak',
          'Csővezetékek, szellőzőnyílások',
          'Ajtók alatti rés, sérült kerítés',
        ],
      },
      {
        type: 'method',
        id: 'kezeles',
        eyebrow: 'A kezelés menete',
        title: 'Hogyan zajlik a patkányirtás?',
        items: [
          { title: 'Felmérés', body: 'Megkeressük a nyomvonalakat, a járatokat és a valószínű bejutási pontokat, és megnézzük, mekkora a fertőzöttség.' },
          { title: 'Csapdák, etetőállomások', body: 'A helyszínnek megfelelően csapdákat vagy zárt etetőállomásokat helyezünk ki a patkányok útvonalára.' },
          { title: 'Ellenőrzés, lezárás', body: 'Megbeszéljük, mikor kell ellenőrizni a kihelyezett eszközöket, és megmutatjuk, mely réseket, nyílásokat érdemes lezárni.' },
        ],
      },
      {
        type: 'pricing',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Patkányirtás árak',
        intro: 'Az ár az ingatlan típusától és méretétől, valamint a fertőzöttség mértékétől függ.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Felmérés', 'Nyomvonalak, járatok és bejutási pontok megkeresése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Családi ház, lakás', 'Csapdák vagy zárt etetőállomások kihelyezése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Telephely, gazdasági épület', 'Nagyobb terület, több kihelyezési pont', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Ellenőrző látogatás', 'A kihelyezett eszközök ellenőrzése, szükség szerint pótlása', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'Élelmiszeres és gazdasági telephelyek részére egyedi ajánlatot adunk.',
      },
      {
        type: 'twoList',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Mit kell tenni a kezelés előtt és után?',
        leftTitle: 'A kezelés előtt',
        leftItems: [
          'Az élelmiszert, a takarmányt és az állateledelt tegye zárt, rágásálló tárolóba.',
          'A padlás, a pince és a melléképületek legyenek hozzáférhetők.',
          'Jelezze, ha gyerek, háziállat vagy haszonállat van a területen.',
        ],
        rightTitle: 'A kezelés után',
        rightItems: [
          'A kihelyezett csapdákat, etetőállomásokat ne mozdítsa el és ne nyissa ki.',
          'Elhullott állathoz csak kesztyűben nyúljon, és zárt zacskóban dobja ki.',
          'A megmutatott réseket, nyílásokat minél előbb zárja le.',
        ],
      },
      {
        type: 'trust',
        scope: 'Családi ház, társasház, telephely, gazdasági épület',
      },
      {
        type: 'faq',
        id: 'gyik',
        idPrefix: 'patkany-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Kérdések a patkányirtásról',
        items: [
          { q: 'Biztonságos a kezelés, ha gyerek vagy háziállat van a háznál?', a: 'Ezt a kezelés előtt mindig megbeszéljük. Ahol gyerek vagy háziállat is jár, zárt etetőállomást vagy csapdát használunk, és olyan helyre tesszük, ahol nem férnek hozzá.' },
          { q: 'Mennyi idő alatt tűnnek el a patkányok?', a: 'Az aktivitás általában egy-két héten belül érezhetően csökken. A végeredmény azon is múlik, hogy sikerül-e lezárni a bejutási pontokat.' },
          { q: 'Honnan jönnek a patkányok?', a: 'Leggyakrabban a csatornából, a szomszédos telkekről, komposztból vagy szemétgyűjtőből. Ősszel, a hideg beálltával gyakrabban húzódnak be az épületekbe.' },
          { q: 'Visszajönnek a kezelés után?', a: 'Ha a bejutási pontok nyitva maradnak, új patkányok jöhetnek. Ezért mutatjuk meg, mely réseket érdemes lezárni, és mit érdemes rendbe tenni a ház körül (komposzt, szemét, állateledel).' },
        ],
      },
      {
        type: 'contact',
        id: 'ajanlatkeres',
        title: 'Kérjen ajánlatot patkányirtásra',
        presetService: 'patkanyirtas',
      },
    ],
  });
}

module.exports = { render };
