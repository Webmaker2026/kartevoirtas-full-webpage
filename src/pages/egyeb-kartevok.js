'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render({ path }) {
  return renderServiceLanding({
    path,
    hero: {
      breadcrumbLabel: 'Egyéb kártevők',
      h1: 'Egyéb kártevők: moly, pincebogár és más rovarok',
      intro:
        'Molylepke a ruhásszekrényben vagy a kamrában, pincebogár a fürdőszobában, ezüstös pikkelyke a csempe mögött? Írja le vagy mondja el, mit tapasztal, és megmondjuk, mit tudunk tenni.',
      mediaKey: 'general',
    },
    sections: [
      {
        type: 'about',
        eyebrow: 'Milyen kártevőkről van szó?',
        title: 'Ritkább, de ugyanolyan bosszantó kártevők',
        paragraphs: [
          'Ezen az oldalon azokat a kártevőket gyűjtöttük össze, amelyek ritkábban fordulnak elő, vagy amelyeknél a kezelés nagyon az adott helyzettől függ: ruha- és élelmiszermoly, pincebogár, ezüstös pikkelyke, lisztbogár, gabonazsizsik és más kamrai bogarak.',
          'Ezeknél különösen fontos, hogy pontosan tudjuk, miről van szó. A molylepkét egészen másképp kell kezelni, mint a nedves helyeket kedvelő pincebogarat — ezért az első lépés mindig a kártevő beazonosítása.',
        ],
        sideTitle: 'Néhány példa',
        sideItems: [
          'Ruhamoly és élelmiszermoly',
          'Pincebogár (ászkarák)',
          'Ezüstös pikkelyke',
          'Lisztbogár, gabonazsizsik a kamrában',
        ],
      },
      {
        type: 'method',
        id: 'kezeles',
        eyebrow: 'Hogyan dolgozunk?',
        title: 'Először beazonosítjuk a kártevőt',
        items: [
          { title: 'Beazonosítás', body: 'A leírás, egy fotó vagy a helyszíni felmérés alapján megállapítjuk, milyen kártevőről van szó, és honnan származik.' },
          { title: 'A kártevőhöz illő kezelés', body: 'Molynál a fertőzött textíliák vagy élelmiszerek, pincebogárnál a nedves helyiségek és a rések, kamrai bogaraknál a fertőzött készletek a fontosak.' },
          { title: 'Ajánlat', body: 'A felmérés után elmondjuk, mit javaslunk, és mennyibe kerül.' },
        ],
      },
      {
        type: 'pricing',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Egyéb kártevők irtásának árai',
        intro: 'Mivel ez sokféle kártevőt jelent, az árat minden esetben a felmérés után adjuk meg. Az alábbi sorok tájékoztató jellegűek.',
        headers: ['Kártevő', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Molyirtás', 'Ruha- vagy élelmiszermoly elleni kezelés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Pincebogár-irtás', 'Pince, fürdőszoba és más nedves helyiségek kezelése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Ezüstös pikkelyke', 'Fürdőszoba, konyha, rések kezelése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Egyéb kártevő', 'Egyedi felmérés alapján', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'Ha nem biztos benne, milyen kártevőről van szó, írja le az ajánlatkérésben, mit lát — segítünk beazonosítani.',
      },
      {
        type: 'twoList',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Mit írjon az ajánlatkérésbe?',
        leftTitle: 'Hasznos információk',
        leftItems: [
          'Mikor és hol vette észre először a kártevőt.',
          'Mekkora, milyen színű, repül vagy mászik.',
          'Mit károsít: ruhát, élelmiszert, vagy csak zavaró.',
        ],
        rightTitle: 'Ha van fotója vagy mintája',
        rightItems: [
          'Egy éles, közeli fotó sokat segít a beazonosításban — az ajánlatkérés után e-mailben elküldheti.',
          'Ha tud, tegyen el egy elpusztult példányt zárt zacskóba vagy dobozba.',
        ],
      },
      {
        type: 'trust',
        scope: 'Lakás, családi ház, üzlet, raktár',
      },
      {
        type: 'faq',
        id: 'gyik',
        idPrefix: 'egyeb-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Kérdések az egyéb kártevőkről',
        items: [
          { q: 'Mi van, ha nem tudom, milyen kártevőről van szó?', a: 'Nem baj. Írja le, amit lát, vagy küldjön róla fotót, és segítünk beazonosítani.' },
          { q: 'Mit tegyek, ha molyos a kamra?', a: 'Nézze át a lisztet, a rizst, a müzlit és a fűszereket, a fertőzött csomagokat zárt zacskóban dobja ki, a polcokat porszívózza ki. Ha a moly ezután is megjelenik, kérjen felmérést.' },
          { q: 'Üzlethelyiségben, raktárban is vállalják?', a: 'Igen, magánszemélyeknek és cégeknek egyaránt.' },
        ],
      },
      {
        type: 'contact',
        id: 'ajanlatkeres',
        title: 'Írja le, milyen kártevőt észlelt',
        presetService: 'egyeb-kartevok',
      },
    ],
  });
}

module.exports = { render };
