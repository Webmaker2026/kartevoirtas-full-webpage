'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render() {
  return renderServiceLanding({
    hero: {
      breadcrumbLabel: 'Csótányirtás',
      tag: 'Gyorsan szaporodó kártevő — a korai fellépés a legfontosabb',
      eyebrow: 'Csótányirtás',
      h1: 'Csótányirtás lakásban, társasházban és vendéglátóipari egységben',
      intro:
        'A csótány gyorsan szaporodik és nehezen irtható ki felületi permetezéssel — a tartós megoldáshoz a rejtekhelyek célzott kezelésére és a bejutási pontok felmérésére van szükség.',
      badges: [
        { icon: 'shield', text: 'Lakás, iroda, vendéglátóhely' },
        { icon: 'clock', text: 'Rugalmas időpont-egyeztetés' },
        { icon: 'pin', text: '[SZOLGÁLTATÁSI TERÜLET]' },
      ],
      tagBoxLeft: 'Rejtekhely-térkép',
      tagBoxRight: 'Tartós hatás',
      mediaKey: 'csotanyirtas',
    },
    sections: [
      {
        type: 'signs',
        bg: 'light',
        id: 'jelek',
        eyebrow: 'Fertőzöttség jelei',
        title: 'Mire érdemes figyelni?',
        intro: 'A csótány éjszaka aktív, ezért a fertőzöttséget gyakran közvetett jelekből lehet felismerni, mielőtt nappal is látnánk egy-egy egyedet.',
        items: [
          { title: 'Apró fekete pontok', body: 'A csótányürülék apró, fekete, borsszemre emlékeztető pontok formájában jelenik meg szekrények sarkaiban, konyhai résekben.' },
          { title: 'Jellegzetes, áporodott szag', body: 'Erősebb fertőzöttségnél a csótányok mirigyváladéka miatt kellemetlen, olajos-áporodott szag érezhető.' },
          { title: 'Tojástokok (ooteka) rejtekhelyeken', body: 'A barna, kapszulaszerű tojástokok bútorok mögött, csövek mentén, konnektorok környékén bukkanhatnak fel.' },
          { title: 'Nappal is látható egyedek', body: 'Ha nappal, világos helyiségben is csótányt lát, az jellemzően már kiterjedtebb fertőzöttségre utal.' },
        ],
      },
      {
        type: 'about',
        bg: 'dark',
        eyebrow: 'Miért tér vissza a probléma',
        title: 'Az egyszeri permetezés ritkán old meg mindent',
        paragraphs: [
          'A csótányok a csővezetékek mentén, a konyhai gépek alatt, a padlószegélyek résein és a társasházi közös terekben is megbújnak, így egy lakás felületi kezelése önmagában gyakran nem elég — társasházban a szomszédos lakásokból történő visszatelepedés is jellemző.',
          'A tartós eredményhez a rejtekhelyek feltérképezése és a bejutási pontok azonosítása is hozzátartozik a kezeléshez.',
        ],
        sideTitle: 'Tipikus bejutási pontok',
        sideItems: ['Csővezetékek, szellőzők mentén', 'Társasházi közös terekből', 'Csomagolóanyaggal, dobozokkal', 'Nyílászárók, résék a fal mentén'],
      },
      {
        type: 'method',
        bg: 'light',
        id: 'kezeles',
        eyebrow: 'Kezelés módja',
        title: 'Hogyan végezzük az irtást',
        items: [
          { icon: 'target', title: 'Helyszíni felmérés', body: 'Feltérképezzük a rejtekhelyeket és a valószínű bejutási pontokat a konyhában, fürdőszobában és a közös terekben.' },
          { icon: 'spark', title: 'Célzott gél csalétek és reziduális kezelés', body: 'A rejtekhelyeken és a mozgási útvonalakon célzott kezelést végzünk, amely a kolónia felszámolására irányul.' },
          { icon: 'process', title: 'Kontroll és megelőzési javaslat', body: 'Szükség esetén kontroll látogatást tartunk, és javaslatot adunk a visszatérés megelőzésére (pl. rések tömítése).' },
        ],
      },
      {
        type: 'pricing',
        bg: 'dark',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Csótányirtás árak',
        intro: 'A végleges ár a fertőzöttség mértékétől és az ingatlan típusától (lakás, iroda, vendéglátóhely) függ.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Helyszíni felmérés', 'Rejtekhelyek és bejutási pontok feltérképezése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Lakásra szabott alapkezelés', 'Célzott gél csalétek és reziduális kezelés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Társasházi / üzleti kezelés', 'Közös terekre és üzlethelyiségekre kiterjedő kezelés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kontroll látogatás', 'Utókövetés, szükség esetén ismételt kezelés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'Vendéglátóipari és élelmiszeripari egységek esetén a kezelést a nyitvatartáshoz igazodva, egyedi egyeztetés alapján végezzük.',
      },
      {
        type: 'twoList',
        bg: 'light',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Előkészületek és teendők a kezelés után',
        leftTitle: 'Mit érdemes előkészíteni',
        leftItems: [
          'Az élelmiszereket zárt dobozban, edényben tárolja',
          'A konyhai felületek, edények legyenek elmosva',
          'A szekrények alja és a rejtekhelyek legyenek hozzáférhetők',
        ],
        rightTitle: 'Teendők a kezelés után',
        rightItems: [
          'A kezelt felületeket a megbeszélt ideig ne mossa fel',
          'Az első napokban több elhullott vagy mozgó egyed is előfordulhat',
          'Gyermeket és háziállatot tartsa távol a kezelt felületektől',
        ],
      },
      {
        type: 'trust',
        bg: 'dark',
        eyebrow: 'Miért minket válasszon',
        title: 'Amire számíthat a kezeléstől',
        items: [
          { icon: 'target', title: 'Rejtekhely-térkép a kezelés előtt', body: 'Nem vaktában permetezünk: felmérjük, hol koncentrálódik a kolónia.' },
          { icon: 'doc', title: 'Érthető tájékoztatás', body: 'Elmondjuk, mire számítson a kezelés után, és mikor érdemes kontrollt kérni.' },
          { icon: 'building', title: 'Társasház és üzlet is', body: 'Vállalunk kezelést lakóépület közös tereiben és vendéglátóipari, kereskedelmi egységekben is.' },
          { icon: 'clock', title: 'Rugalmas időpont', body: 'Az ingatlan típusához (pl. nyitvatartás) igazodó időpontot egyeztetünk.' },
        ],
      },
      {
        type: 'area',
        bg: 'light',
        id: 'terulet',
        eyebrow: 'Szolgáltatási terület',
        title: 'Hol vállalunk csótányirtást',
        areas: ['[SZOLGÁLTATÁSI TERÜLET]'],
      },
      {
        type: 'faq',
        bg: 'dark',
        id: 'gyik',
        idPrefix: 'csotany-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Csótányirtással kapcsolatos kérdések',
        items: [
          { q: 'Ha a szomszédnál is van csótány, érdemes egyszerre kezeltetni?', a: 'Társasházban ideális esetben az érintett lakásokat egy időben érdemes kezelni, mert a csótány a közös falakon, csöveken keresztül könnyen visszatelepszik egy kezeletlen szomszédos lakásból.' },
          { q: 'Biztonságos a kezelés gyerekek és háziállatok mellett?', a: 'A célzott gél csalétekes és reziduális kezelést a lakott terek biztonságos használatát szem előtt tartva végezzük, a kezelt felületekre vonatkozó időszakos óvintézkedésekről tájékoztatást adunk.' },
          { q: 'Mennyi idő alatt tűnik el teljesen a fertőzöttség?', a: 'A látható aktivitás jellemzően napok alatt csökken, a teljes felszámolás azonban a fertőzöttség mértékétől függően több hetet vehet igénybe, ezért fontos a kontroll látogatás.' },
          { q: 'Mit tegyek, ha a konyhában lesz a kezelés?', a: 'Az élelmiszereket és az edényeket célszerű előzetesen zárt helyre tenni, a kezelt felületeket pedig a megbeszélt ideig nem szükséges lemosni.' },
        ],
      },
      {
        type: 'contact',
        bg: 'light',
        id: 'ajanlatkeres',
        eyebrow: 'Ajánlatkérés',
        title: 'Kérjen ajánlatot csótányirtásra',
        presetPest: 'csotanyirtas',
      },
    ],
    finalCta: {
      eyebrow: 'Ne halogassa',
      title: 'A csótány gyorsan szaporodik — minél előbb érdemes lépni',
      body: 'Írja le, hol és milyen jeleket észlelt, és rövid időn belül visszajelzünk.',
    },
  });
}

module.exports = { render };
