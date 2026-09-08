'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render() {
  return renderServiceLanding({
    hero: {
      breadcrumbLabel: 'Ágyi poloska irtás',
      tag: 'Rejtőzködő kártevő — minél előbb érdemes fellépni',
      eyebrow: 'Ágyi poloska irtás',
      h1: 'Ágyi poloska irtás — gyors fellépés az éjszakai csípések ellen',
      intro:
        'Ha reggelente sorban álló csípésnyomokkal ébred, vagy apró barna foltokat talált a matrac varrásában, valószínűleg ágyi poloska fertőzöttséggel áll szemben. Felmérjük a rejtekhelyeket, és célzott kezeléssel számoljuk fel a problémát.',
      badges: [
        { icon: 'shield', text: 'Rejtett fertőzöttség felderítése' },
        { icon: 'clock', text: 'Rugalmas időpont-egyeztetés' },
        { icon: 'pin', text: '[SZOLGÁLTATÁSI TERÜLET]' },
      ],
      tagBoxLeft: 'Rejtekhely-felmérés',
      tagBoxRight: 'Célzott kezelés',
      mediaKey: 'agyi-poloska-irtas',
    },
    sections: [
      {
        type: 'signs',
        bg: 'light',
        id: 'jelek',
        eyebrow: 'Fertőzöttség jelei',
        title: 'Honnan ismerhető fel az ágyi poloska?',
        intro: 'Az ágyi poloska éjszaka aktív és nappal jól rejtőzik, ezért a fertőzöttséget gyakran csak közvetett jelekből lehet felismerni.',
        items: [
          { title: 'Sorban álló csípésnyomok', body: 'Jellemzően 2-3 csípés egy vonalban, a bőr fedetlen részein, amelyek reggelre jelentkeznek és viszketnek.' },
          { title: 'Apró barna pontok az ágyneműn', body: 'A poloska ürüléke sötétbarna, pontszerű foltként jelenik meg a matracon, a matracvarrásban vagy a lepedőn.' },
          { title: 'Apró vérfoltok a lepedőn', body: 'Az éjszakai táplálkozás után visszamaradó, kis méretű, elmosódott vérfoltok is árulkodó jelek lehetnek.' },
          { title: 'Édeskés, jellegzetes szag', body: 'Erősebb fertőzöttségnél a poloskák mirigyváladéka miatt jellegzetes, édeskés szag érezhető a hálótérben.' },
        ],
      },
      {
        type: 'about',
        bg: 'dark',
        eyebrow: 'Miért nehéz egyedül megoldani',
        title: 'A rejtőzködés miatt egyetlen permetezés ritkán elég',
        paragraphs: [
          'Az ágyi poloska nem csak a matracban, hanem az ágykeretben, a szegélylécek mögött, a konnektorokban és a bútorok illesztéseiben is megbújik, ezért a felületi, célzás nélküli kezelés gyakran csak a láthatóan érintett részt kezeli, a rejtekhelyeken maradó egyedek pedig újratelepítik a lakást.',
          'Éppen ezért a felmérés a kezelés legfontosabb lépése: minden lehetséges rejtekhelyet átvizsgálunk, mielőtt a tényleges irtás megkezdődne.',
        ],
        sideTitle: 'Gyakori terjedési útvonalak',
        sideItems: ['Használt bútor, matrac beszerzése', 'Utazás, szállodai szállás', 'Társasházi szomszédos lakásból', 'Használt ruhanemű, csomagolóanyag'],
      },
      {
        type: 'method',
        bg: 'light',
        id: 'kezeles',
        eyebrow: 'Kezelés módja',
        title: 'Hogyan végezzük az irtást',
        items: [
          { icon: 'target', title: 'Helyszíni felmérés', body: 'Átvizsgáljuk az ágyneműt, a bútorokat, a szegélyléceket és az egyéb tipikus rejtekhelyeket a fertőzöttség kiterjedésének megállapításához.' },
          { icon: 'spark', title: 'Célzott inszekticides kezelés', body: 'A feltárt rejtekhelyeken végzünk célzott kezelést, a lakott terek biztonságos használatát szem előtt tartva.' },
          { icon: 'process', title: 'Kontroll és ismételt kezelés', body: 'Az ágyi poloska életciklusa miatt gyakran szükség van kontroll látogatásra vagy egy második kezelésre a teljes felszámoláshoz.' },
        ],
      },
      {
        type: 'pricing',
        bg: 'dark',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Ágyi poloska irtás árak',
        intro: 'A végleges ár a fertőzöttség mértékétől és a kezelendő terület méretétől függ — az alábbi táblázat a szolgáltatás felépítését mutatja.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Helyszíni felmérés', 'Rejtekhelyek átvizsgálása, fertőzöttség felmérése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Alapkezelés (1 hálószoba)', 'Célzott inszekticides kezelés a fő rejtekhelyeken', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kiterjedt fertőzöttség kezelése', 'Több helyiségre kiterjedő kezelés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kontroll látogatás', 'Utókövetés, szükség esetén ismételt kezelés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'A pontos árat helyszíni vagy fotó alapú felmérés után adjuk meg, a fertőzöttség mértékének ismeretében.',
      },
      {
        type: 'twoList',
        bg: 'light',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Előkészületek és teendők a kezelés után',
        leftTitle: 'Mit érdemes előkészíteni',
        leftItems: [
          'Ágynemű, függöny és textília mosógépben, magas hőfokon mosandó',
          'A szekrények tartalmának átvizsgálása, zsákolása javasolt',
          'A padló és a bútorok alá is legyen bejárás a kezeléshez',
        ],
        rightTitle: 'Teendők a kezelés után',
        rightItems: [
          'A kezelt felületeket a megbeszélt ideig ne mossa le',
          'Az első napokban előfordulhat, hogy még látnak egy-egy egyedet',
          'Tartós eredményhez a javasolt kontroll időpont betartása fontos',
        ],
      },
      {
        type: 'trust',
        bg: 'dark',
        eyebrow: 'Miért minket válasszon',
        title: 'Amire számíthat a kezeléstől',
        items: [
          { icon: 'target', title: 'Alapos rejtekhely-felmérés', body: 'Nem csak a matracot, hanem az összes tipikus rejtekhelyet átvizsgáljuk a kezelés előtt.' },
          { icon: 'doc', title: 'Érthető tájékoztatás', body: 'Elmondjuk, mire számítson a kezelés után, és mikor szükséges kontroll.' },
          { icon: 'shield', title: 'Lakás és üzleti helyiség is', body: 'Magánlakások mellett szállások, munkásszállók és vendéglátóipari egységek esetén is vállaljuk a kezelést.' },
          { icon: 'clock', title: 'Gyors időpont-egyeztetés', body: 'A bejelentés sürgősségéhez igazodó időpontot próbálunk biztosítani.' },
        ],
      },
      {
        type: 'area',
        bg: 'light',
        id: 'terulet',
        eyebrow: 'Szolgáltatási terület',
        title: 'Hol vállalunk ágyi poloska irtást',
        areas: ['[SZOLGÁLTATÁSI TERÜLET]'],
      },
      {
        type: 'faq',
        bg: 'dark',
        id: 'gyik',
        idPrefix: 'poloska-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Ágyi poloska irtással kapcsolatos kérdések',
        items: [
          { q: 'Elég egyetlen kezelés az ágyi poloska teljes felszámolásához?', a: 'A poloska életciklusa miatt gyakran szükség van egy kontroll látogatásra vagy második kezelésre, mert a peték a kezelés idején nem feltétlenül pusztulnak el egyszerre.' },
          { q: 'Mennyi idő alatt látszik eredmény a kezelés után?', a: 'A csípések száma jellemzően a kezelést követő napokban csökken érzékelhetően, a teljes felszámolás azonban a fertőzöttség mértékétől függően több hetet is igénybe vehet.' },
          { q: 'Bérelt lakásban is elvégezhető a kezelés?', a: 'Igen, bérelt ingatlanban is vállaljuk a kezelést — érdemes előzetesen tájékoztatni a bérbeadót, mivel a probléma megelőzése és elhárítása gyakran közös érdek.' },
          { q: 'Mi legyen a ruhákkal és a textíliákkal a kezelés előtt?', a: 'A textíliákat érdemes magas hőfokon kimosni és a kezelésig lezárt zsákban tárolni, hogy ne terjedjen tovább a fertőzöttség.' },
          { q: 'Honnan kerülhetett a lakásba ágyi poloska?', a: 'Leggyakrabban utazás, szállodai szállás, használt bútor vagy matrac, illetve társasházban szomszédos lakásból történő átterjedés áll a fertőzöttség hátterében.' },
        ],
      },
      {
        type: 'contact',
        bg: 'light',
        id: 'ajanlatkeres',
        eyebrow: 'Ajánlatkérés',
        title: 'Kérjen ajánlatot ágyi poloska irtásra',
        presetPest: 'agyi-poloska-irtas',
      },
    ],
    finalCta: {
      eyebrow: 'Ne várjon tovább',
      title: 'Minél tovább áll fenn, annál nehezebb felszámolni',
      body: 'Írja le, mit észlelt, és rövid időn belül visszajelzünk a lehetséges időpontról.',
    },
  });
}

module.exports = { render };
