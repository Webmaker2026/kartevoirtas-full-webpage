'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render({ path }) {
  return renderServiceLanding({
    path,
    hero: {
      breadcrumbLabel: 'Csótányirtás',
      h1: 'Csótányirtás lakásban, társasházban és étteremben',
      intro:
        'Csótányt látott a konyhában vagy a fürdőszobában? Minél korábban lépünk, annál kisebb területet kell kezelni. Megnézzük, hol bújnak meg, és elvégezzük az irtást.',
      mediaKey: 'csotanyirtas',
    },
    sections: [
      {
        type: 'signs',
        id: 'jelek',
        eyebrow: 'A fertőzöttség jelei',
        title: 'Mire figyeljen?',
        intro: 'A csótány éjjel mozog, nappal meleg, nyirkos résekben bújik meg. Sokszor előbb a nyomait vesszük észre, mint magát a rovart.',
        items: [
          { title: 'Apró fekete pöttyök', body: 'Borsszemnél kisebb, fekete ürülékszemcsék a szekrények sarkában, a fiókokban, a hűtő és a tűzhely mögött.' },
          { title: 'Áporodott, olajos szag', body: 'Nagyobb fertőzöttségnél a helyiségben jellegzetes, dohos szag érezhető, amely szellőztetés után is visszatér.' },
          { title: 'Tojástokok', body: 'Barna, babszem alakú tokok a bútorok mögött, a csövek mentén és a konyhai gépek alatt.' },
          { title: 'Csótány nappal is', body: 'Ha világosban is lát csótányt, az többnyire azt jelzi, hogy a búvóhelyek megteltek, és a populáció már nagy.' },
        ],
      },
      {
        type: 'about',
        eyebrow: 'Miért jön vissza?',
        title: 'Az egyszeri spray ritkán elég',
        paragraphs: [
          'A csótány a csővezetékek, a konyhai gépek, a szegélylécek és a burkolatok réseiben él, ahová a spray nem jut el. A boltban kapható szerek a látható egyedeket elpusztítják, a búvóhelyen maradtakat viszont nem, így a probléma néhány hét múlva újra jelentkezik.',
          'Társasházban a csótány a közös falakon, a gépészeti aknákon és a szemétledobón keresztül lakásról lakásra jár. Ilyenkor az hozza a legjobb eredményt, ha az érintett lakásokat és a közös tereket egy időben kezeljük.',
        ],
        sideTitle: 'Honnan jut be?',
        sideItems: [
          'Csővezetékek és gépészeti aknák mentén',
          'Társasházi közös terekből, szemétledobóból',
          'Kartondobozokkal, csomagolóanyaggal',
          'Az ajtók és a falak menti réseken',
        ],
      },
      {
        type: 'method',
        id: 'kezeles',
        eyebrow: 'A kezelés menete',
        title: 'Hogyan végezzük a csótányirtást?',
        items: [
          { title: 'Felmérés', body: 'Megnézzük a konyhát, a fürdőszobát és a többi érintett helyiséget: hol a legtöbb csótány, és honnan jöhetnek.' },
          { title: 'Kezelés', body: 'A búvóhelyeken és a csótányok útvonalain elvégezzük az irtást. A módszert (például gélcsalétek vagy permetezés) a helyszín és a fertőzöttség alapján választjuk ki.' },
          { title: 'Második kezelés, ha kell', body: 'A tojástokban lévő peték védve vannak, ezért néhány hét múlva újabb csótányok kelhetnek ki. Hogy szükség van-e második körre, azt a helyzet alapján megbeszéljük.' },
        ],
      },
      {
        type: 'pricing',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Csótányirtás árak',
        intro: 'Az ár az ingatlan típusától és méretétől, valamint a fertőzöttség mértékétől függ.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Felmérés', 'A búvóhelyek és a bejutási pontok megkeresése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Lakás kezelése', 'Konyha, fürdőszoba és a további érintett helyiségek', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Társasház, közös terek', 'Lépcsőház, pince, szemétledobó, gépészeti aknák', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Üzlet, vendéglátóhely', 'Konyha, raktár és vendégtér kezelése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Ismételt kezelés', 'A később kikelő csótányok ellen', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'Vendéglátóhelyeken és élelmiszerüzletekben az időpontot a nyitvatartáshoz igazítva egyeztetjük.',
      },
      {
        type: 'twoList',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Mit kell tenni a kezelés előtt és után?',
        leftTitle: 'A kezelés előtt',
        leftItems: [
          'Az élelmiszereket tegye zárt dobozba vagy a hűtőbe.',
          'Mosogasson el, és törölje le a konyhai felületeket.',
          'Ürítse ki a mosogató alatti szekrényt, hogy hozzáférjünk a csövekhez.',
          'Néhány nappal előtte már ne használjon rovarirtó sprayt a konyhában.',
        ],
        rightTitle: 'A kezelés után',
        rightItems: [
          'A kezelt felületeket és a kihelyezett csalétkeket a megbeszélt ideig ne tisztítsa le.',
          'Az első napokban több csótányt is láthat, mert a szer kicsalja őket a búvóhelyükről.',
          'Gyermeket és háziállatot tartsa távol a kezelt felületektől, amíg azt javasoljuk.',
          'Ne hagyjon kint ételmaradékot, így a csalétek jobban hat.',
        ],
      },
      {
        type: 'trust',
        scope: 'Lakás, társasház, iroda, vendéglátóhely',
      },
      {
        type: 'faq',
        id: 'gyik',
        idPrefix: 'csotany-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Kérdések a csótányirtásról',
        items: [
          { q: 'A szomszédnál is van csótány. Érdemes együtt kezeltetni?', a: 'Igen. Ha csak az egyik lakást kezelik, a csótányok a közös falakon és csöveken át visszajöhetnek a szomszédból. Társasházban az a legjobb, ha az érintett lakásokat és a közös tereket egyszerre kezeljük — ehhez a közös képviselővel is tudunk egyeztetni.' },
          { q: 'Biztonságos a kezelés, ha gyerek vagy háziállat van a lakásban?', a: 'A kezelés előtt jelezze, ha kisgyerek vagy háziállat van a lakásban: ehhez igazítjuk a szerek kihelyezését, és elmondjuk, mire figyeljen utána.' },
          { q: 'Mennyi idő alatt tűnnek el a csótányok?', a: 'Az aktivitás általában néhány napon belül érezhetően csökken. A teljes kiirtás a fertőzöttség mértékétől függően több hetet is igénybe vehet, mert a tojástokokból később is kelhetnek ki csótányok.' },
          { q: 'Ki kell pakolni a konyhát?', a: 'Teljesen nem. Elég, ha az élelmiszerek zárt helyre kerülnek, és a mosogató alatti, illetve a leginkább érintett szekrények hozzáférhetők. Pontos listát az időpont egyeztetésekor adunk.' },
        ],
      },
      {
        type: 'contact',
        id: 'ajanlatkeres',
        title: 'Kérjen ajánlatot csótányirtásra',
        presetService: 'csotanyirtas',
      },
    ],
  });
}

module.exports = { render };
