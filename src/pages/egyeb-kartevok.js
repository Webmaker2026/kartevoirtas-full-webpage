'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render() {
  return renderServiceLanding({
    hero: {
      breadcrumbLabel: 'Egyéb kártevők',
      eyebrow: 'Egyéb kártevők',
      h1: 'Egyéb kártevők irtása — egyedi felmérés alapján',
      intro:
        'Molylepke a szekrényben, pincebogár a fürdőszobában, atkafertőzöttség vagy más, kevésbé gyakori kártevő? Ha nem találja a problémájának megfelelő oldalt, írja le a tapasztalt jeleket — egyedi felmérés alapján javaslunk megoldást.',
      badges: [
        { icon: 'shield', text: 'Egyedi felmérés minden esethez' },
        { icon: 'clock', text: 'Rugalmas időpont-egyeztetés' },
        { icon: 'pin', text: '[SZOLGÁLTATÁSI TERÜLET]' },
      ],
      tagBoxLeft: 'Egyedi felmérés',
      tagBoxRight: 'Célzott megoldás',
      mediaKey: 'general',
    },
    sections: [
      {
        type: 'about',
        bg: 'light',
        eyebrow: 'Milyen kártevőkkel foglalkozunk itt',
        title: 'Ha a nyolc fő kategóriába nem illik a probléma',
        paragraphs: [
          'A leggyakoribb kártevőknek (ágyi poloska, csótány, darázs, hangya, patkány, egér, bolha) külön oldalt készítettünk, mert ezekhez tartozik a legtöbb, jellemzően pontosan beazonosítható probléma.',
          'Ha az Ön esete ezek egyikébe sem illik pontosan — például molylepke, pincebogár, atka, ezüstös pattanó vagy más, ritkábban előforduló kártevő —, ezen az oldalon kérhet ajánlatot: a pontos megoldást minden esetben a konkrét helyzet felmérése alapján határozzuk meg.',
        ],
        sideTitle: 'Néhány példa a kategóriára',
        sideItems: ['Molylepke (textil, élelmiszer)', 'Pincebogár', 'Atkafertőzöttség', 'Ezüstös pattanó és egyéb apró rovarok'],
      },
      {
        type: 'method',
        bg: 'dark',
        id: 'kezeles',
        eyebrow: 'Hogyan dolgozunk',
        title: 'Miért fontos itt különösen a felmérés',
        items: [
          { icon: 'target', title: 'Pontos beazonosítás', body: 'Az egyedi vagy ritkábban jelentkező kártevőknél az első lépés mindig a pontos faj és a fertőzöttség forrásának azonosítása.' },
          { icon: 'spark', title: 'A kártevőhöz igazított kezelés', body: 'A kezelés módját (pl. textilkezelés molylepkénél, résekre fókuszáló kezelés pincebogárnál) az azonosított kártevőhöz igazítjuk.' },
          { icon: 'process', title: 'Egyértelmű visszajelzés', body: 'A felmérés után elmondjuk, milyen megoldást és milyen árat javaslunk az adott helyzetre.' },
        ],
      },
      {
        type: 'pricing',
        bg: 'light',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Egyéb kártevők — irányár kategóriák',
        intro: 'Mivel ez a kategória sokféle kártevőt ölel fel, a végleges árat minden esetben egyedi felmérés alapján adjuk meg.',
        headers: ['Kártevő / szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Molylepke irtás', 'Textil- és/vagy élelmiszer-molylepke kezelése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Pincebogár irtás', 'Nedves helyiségek célzott kezelése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Atkairtás', 'Lakótér célzott kezelése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Egyéb, be nem sorolt kártevő', 'Egyedi felmérés alapján meghatározott kezelés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'Ha nem biztos benne, melyik kategóriába tartozik a problémája, írja le az űrlapon — segítünk beazonosítani.',
      },
      {
        type: 'twoList',
        bg: 'dark',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Mit érdemes leírnia az ajánlatkéréskor',
        leftTitle: 'Hasznos információk',
        leftItems: [
          'Mikor és hol észlelte először a kártevőt',
          'Milyen jeleket tapasztal (rágásnyom, apró rovar, folt, szag)',
          'Érintett-e élelmiszer, textil vagy faszerkezet',
        ],
        rightTitle: 'Ha van róla fotó',
        rightItems: [
          'Egy éles fotó a tapasztalt jelről vagy a kártevőről sokat segít a beazonosításban',
          'A fotót e-mailben vagy a helyszíni felmérés során is meg tudja mutatni',
          'Ez alapján pontosabb előzetes tájékoztatást tudunk adni',
        ],
      },
      {
        type: 'faq',
        bg: 'light',
        id: 'gyik',
        idPrefix: 'egyeb-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Kérdések az egyéb kártevőkkel kapcsolatban',
        items: [
          { q: 'Mi van, ha nem tudom pontosan, milyen kártevőről van szó?', a: 'Nem probléma — írja le, milyen jeleket tapasztal, és ha van róla fotó, csatolja azt is. A felmérés során segítünk pontosan beazonosítani a kártevőt.' },
          { q: 'Ez az oldal ugyanazt a szolgáltatást fedi, mint a főoldali kategóriák?', a: 'Nem — ez a kategória kifejezetten azokra a kártevőkre vonatkozik, amelyekhez nem készítettünk külön, részletes oldalt. A nyolc fő kártevőtípushoz saját, részletes tájékoztató és árlista tartozik.' },
          { q: 'Vállalnak kezelést üzleti ingatlanon is ilyen esetben?', a: 'Igen, ez a kategória is elérhető magánszemélyek és üzleti ügyfelek (pl. üzletek, raktárak) számára egyaránt.' },
        ],
      },
      {
        type: 'contact',
        bg: 'dark',
        id: 'ajanlatkeres',
        eyebrow: 'Ajánlatkérés',
        title: 'Írja le a tapasztalt problémát',
        presetPest: 'egyeb-kartevok',
      },
    ],
    finalCta: {
      eyebrow: 'Nem biztos a kártevő típusában?',
      title: 'Írja le, mit észlelt — segítünk beazonosítani',
      body: 'A felmérés után javaslatot adunk a megfelelő kezelésre és az árra.',
    },
  });
}

module.exports = { render };
