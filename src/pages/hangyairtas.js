'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render() {
  return renderServiceLanding({
    hero: {
      breadcrumbLabel: 'Hangyairtás',
      eyebrow: 'Hangyairtás',
      h1: 'Hangyairtás — beltéri és kültéri fészkek felszámolása',
      intro:
        'Konyhában megjelenő hangyaút, teraszon vagy járólap alatt kialakult hangyaboly esetén nem elég a látható egyedeket eltávolítani — a fészek felszámolása hozza a tartós eredményt.',
      badges: [
        { icon: 'shield', text: 'Beltéri és kültéri kezelés' },
        { icon: 'clock', text: 'Rugalmas időpont-egyeztetés' },
        { icon: 'pin', text: '[SZOLGÁLTATÁSI TERÜLET]' },
      ],
      tagBoxLeft: 'Fészek beazonosítása',
      tagBoxRight: 'Tartós megoldás',
      mediaKey: 'hangyairtas',
    },
    sections: [
      {
        type: 'signs',
        bg: 'light',
        id: 'jelek',
        eyebrow: 'Fertőzöttség jelei',
        title: 'Mire érdemes figyelni?',
        items: [
          { title: 'Kitartó hangyaút a lakásban', body: 'Konyhapulton, ablakpárkányon vagy padlón végigfutó, rendszeresen visszatérő hangyaút a fészek közelségére utal.' },
          { title: 'Kültéri hangyaboly a kertben', body: 'Járólapok, kerti terasz vagy pázsit alatt kialakuló hangyaboly idővel a burkolat süllyedését is okozhatja.' },
          { title: 'Apró fűrészpor-szerű nyomok', body: 'Fa szerkezeteknél megjelenő finom fűrészporhoz hasonló nyom ácshangya jelenlétére utalhat, ami a faszerkezetet is károsíthatja.' },
          { title: 'Élelmiszer közelében megjelenő hangyák', body: 'Ha rendszeresen hangyát talál élelmiszer, hulladéktároló vagy háziállateledel közelében, érdemes mielőbb fellépni.' },
        ],
      },
      {
        type: 'about',
        bg: 'dark',
        eyebrow: 'Miért nem elég a látható hangyák eltávolítása',
        title: 'A fészek felszámolása nélkül a probléma visszatér',
        paragraphs: [
          'A hangyák dolgozói csak a kolónia egy részét jelentik — a fészek, benne a királynővel, jellemzően a falban, a talajban vagy egy nehezen elérhető résben van, és amíg ez fennáll, új dolgozók pótolják az eltávolítottakat.',
          'Ezért a beltéri csalétkes kezelés mellett a kültéri fészek felmérése és kezelése is fontos része a tartós megoldásnak.',
        ],
        sideTitle: 'Jellemző fészekhelyek',
        sideItems: ['Járólap, terasz alatt', 'Ablakpárkány, homlokzati rés', 'Fal- és padlószegély mögött', 'Kerti pázsit, virágágyás'],
      },
      {
        type: 'method',
        bg: 'light',
        id: 'kezeles',
        eyebrow: 'Kezelés módja',
        title: 'Hogyan végezzük az irtást',
        items: [
          { icon: 'target', title: 'Útvonal és fészek felmérése', body: 'Beazonosítjuk a hangyaút irányát és a valószínű fészekhelyet, beltéren és kültéren egyaránt.' },
          { icon: 'spark', title: 'Csalétkes és célzott kezelés', body: 'A hangyafaj és a fészek helye alapján csalétkes vagy célzott felületi kezelést alkalmazunk.' },
          { icon: 'process', title: 'Kültéri fészek kezelése', body: 'Kerti, járólap alatti fészek esetén a kolónia felszámolására irányuló kültéri kezelést is elvégezzük.' },
        ],
      },
      {
        type: 'pricing',
        bg: 'dark',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Hangyairtás árak',
        intro: 'A végleges ár attól függ, hogy beltéri, kültéri vagy mindkét típusú kezelésre van szükség.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Beltéri kezelés', 'Csalétkes kezelés a lakáson belüli hangyaút mentén', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kültéri fészekkezelés', 'Kerti, járólap alatti hangyaboly felszámolása', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Ácshangya kezelés', 'Faszerkezetet érintő fertőzöttség kezelése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kontroll látogatás', 'Utókövetés, szükség esetén ismételt kezelés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'A pontos árat a fertőzöttség helyszínének (beltér/kültér) és kiterjedésének felmérése után adjuk meg.',
      },
      {
        type: 'twoList',
        bg: 'light',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Előkészületek és teendők a kezelés után',
        leftTitle: 'Mit érdemes előkészíteni',
        leftItems: [
          'Élelmiszereket zárt dobozban tárolja a kezelés idejére',
          'A megfigyelt hangyaút vonalát ne mossa fel a felmérés előtt',
          'Kültéri kezelésnél a kezelendő terület legyen szabadon hozzáférhető',
        ],
        rightTitle: 'Teendők a kezelés után',
        rightItems: [
          'A csalétkes pontokat ne mozgassa el és ne tisztítsa le',
          'Néhány napig megnövekedett hangyaaktivitás is előfordulhat, ez a csalétek hatásmechanizmusából adódik',
          'Kültéri kezelésnél kerülje a terület intenzív locsolását a megbeszélt ideig',
        ],
      },
      {
        type: 'trust',
        bg: 'dark',
        eyebrow: 'Miért minket válasszon',
        title: 'Amire számíthat a kezeléstől',
        items: [
          { icon: 'target', title: 'Fészekközpontú megközelítés', body: 'Nem csak a látható hangyákat, hanem a fészket célozzuk meg a tartós eredményért.' },
          { icon: 'house', title: 'Beltér és kültér együtt', body: 'Ha a probléma mindkét helyszínt érinti, egy látogatás keretében kezeljük.' },
          { icon: 'doc', title: 'Érthető tájékoztatás', body: 'Elmondjuk, mire számítson a kezelés után, és mennyi idő alatt várható javulás.' },
          { icon: 'clock', title: 'Rugalmas időpont', body: 'A bejelentés alapján igyekszünk mihamarabbi időpontot biztosítani.' },
        ],
      },
      {
        type: 'area',
        bg: 'light',
        id: 'terulet',
        eyebrow: 'Szolgáltatási terület',
        title: 'Hol vállalunk hangyairtást',
        areas: ['[SZOLGÁLTATÁSI TERÜLET]'],
      },
      {
        type: 'faq',
        bg: 'dark',
        id: 'gyik',
        idPrefix: 'hangya-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Hangyairtással kapcsolatos kérdések',
        items: [
          { q: 'Miért térnek vissza a hangyák, ha már eltakarítottam őket?', a: 'A látható hangyák csak a kolónia dolgozói — amíg a fészek és a királynő nincs felszámolva, a kolónia folyamatosan pótolja az eltávolított egyedeket.' },
          { q: 'Veszélyesek a csalétkek a háziállatokra?', a: 'A csalétkes kezelést a lakott terek és a háziállatok biztonságos jelenlétét szem előtt tartva végezzük, a kihelyezett pontokról és az óvintézkedésekről a helyszínen tájékoztatást adunk.' },
          { q: 'Mennyi idő alatt szűnik meg egy kültéri hangyaboly?', a: 'A csalétkes kezelés hatása jellemzően napok alatt jelentkezik, a fészek teljes felszámolása azonban a kolónia méretétől függően hosszabb időt is igénybe vehet.' },
          { q: 'Honnan jönnek be a hangyák a lakásba?', a: 'Leggyakrabban ablak- és ajtórések, homlokzati hézagok, illetve a talaj közeli falszakaszok mentén jutnak be, különösen élelmiszer illata vagy nedvesség közelében.' },
        ],
      },
      {
        type: 'contact',
        bg: 'light',
        id: 'ajanlatkeres',
        eyebrow: 'Ajánlatkérés',
        title: 'Kérjen ajánlatot hangyairtásra',
        presetPest: 'hangyairtas',
      },
    ],
    finalCta: {
      eyebrow: 'Következő lépés',
      title: 'Számoljuk fel a fészket, ne csak a tüneteket',
      body: 'Írja le, hol tapasztalja a hangyákat, és javaslatot adunk a megfelelő kezelésre.',
    },
  });
}

module.exports = { render };
