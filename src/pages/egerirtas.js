'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render({ path }) {
  return renderServiceLanding({
    path,
    hero: {
      breadcrumbLabel: 'Egérirtás',
      h1: 'Egérirtás lakásban, házban és üzletben',
      intro:
        'Neszezés a falban, rágott csomagolás és apró ürülék a kamrában? Az egér gyorsan szaporodik, ezért érdemes az első jeleknél lépni. Kihelyezzük a csapdákat, és megmutatjuk, hol jutnak be.',
      mediaKey: 'egerirtas',
    },
    sections: [
      {
        type: 'signs',
        id: 'jelek',
        eyebrow: 'A fertőzöttség jelei',
        title: 'Honnan ismerhető fel az egér?',
        items: [
          { title: 'Apró, sötét ürülék', body: 'Rizsszemnyi, fekete ürülék a konyhaszekrényben, a kamrában, a fiókokban vagy a padló mentén.' },
          { title: 'Megrágott csomagolás', body: 'Kilyukasztott zacskók és kartondobozok, megrágott kenyér vagy gabonapehely a kamrában.' },
          { title: 'Nesz a falban, a mennyezet fölött', body: 'Halk kaparászás, futkosás este és éjjel a falüregből, a gipszkarton mögül vagy az álmennyezet fölül.' },
          { title: 'Szúrós szag', body: 'Az egérvizelet szaga zárt helyen — szekrényben, kamrában, pincében — jól érezhető.' },
        ],
      },
      {
        type: 'about',
        eyebrow: 'Miért kell gyorsan lépni?',
        title: 'Pár egérből hamar sok lesz',
        paragraphs: [
          'Egy nőstény egér évente többször is fialhat, alkalmanként 5–8 utóddal, és a kicsinyek néhány hét alatt maguk is ivaréretté válnak. Ha nem történik beavatkozás, egy-két egérből pár hónap alatt komoly fertőzöttség lesz.',
          'Az egér egy ceruza vastagságú résen is átfér. Ősszel, amikor lehűl az idő, gyakran az ajtók alatti résen, a csővezetékek mellett vagy a lábazat repedésein jut be a házba.',
        ],
        sideTitle: 'Tipikus bejutási pontok',
        sideItems: [
          'Ajtók, ablakok alatti rés',
          'Csővezeték- és kábelátvezetések',
          'Lábazat, alapozás repedései',
          'Szellőzőnyílások, pinceablak',
        ],
      },
      {
        type: 'method',
        id: 'kezeles',
        eyebrow: 'A kezelés menete',
        title: 'Hogyan zajlik az egérirtás?',
        items: [
          { title: 'Felmérés', body: 'Megnézzük, hol mozognak az egerek, merre vannak a nyomok, és honnan jöhetnek be.' },
          { title: 'Csapdák, etetőállomások', body: 'A helyszínnek megfelelően csapdákat, szükség esetén zárt, irtószeres etetőállomásokat helyezünk ki az egerek útvonalára.' },
          { title: 'Megelőzés', body: 'Megmutatjuk, mely réseket, nyílásokat érdemes lezárni, és hogyan tárolja az élelmiszert, hogy az egerek ne jöjjenek vissza.' },
        ],
      },
      {
        type: 'pricing',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Egérirtás árak',
        intro: 'Az ár az ingatlan méretétől és a fertőzöttség mértékétől függ.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Felmérés', 'Nyomok, útvonalak és bejutási pontok megkeresése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Lakás, családi ház', 'Csapdák, szükség esetén etetőállomások kihelyezése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Üzlet, iroda, raktár', 'Nagyobb alapterület, több kihelyezési pont', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Ellenőrző látogatás', 'A csapdák, etetőállomások ellenőrzése és pótlása', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'Pontos árat a felmérés után adunk.',
      },
      {
        type: 'twoList',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Mit kell tenni a kezelés előtt és után?',
        leftTitle: 'A kezelés előtt',
        leftItems: [
          'Az élelmiszereket tegye zárt műanyag vagy fém dobozba.',
          'A konyhaszekrények alja és a kamra legyen hozzáférhető.',
          'Jelezze, ha háziállat is van a lakásban.',
        ],
        rightTitle: 'A kezelés után',
        rightItems: [
          'A csapdákat, etetőállomásokat ne mozdítsa el.',
          'Elhullott egérhez csak kesztyűben nyúljon.',
          'Az ürülékkel szennyezett felületeket fertőtlenítse, ne söpörje fel szárazon.',
          'A megmutatott réseket minél előbb zárja le.',
        ],
      },
      {
        type: 'trust',
        scope: 'Lakás, családi ház, iroda, üzlet',
      },
      {
        type: 'faq',
        id: 'gyik',
        idPrefix: 'eger-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Kérdések az egérirtásról',
        items: [
          { q: 'Miért jönnek be az egerek ősszel?', a: 'Ahogy hűl az idő, meleg és élelemmel teli helyet keresnek. Ilyenkor a legtöbb a bejelentés, és ilyenkor a legfontosabb, hogy a réseket lezárják.' },
          { q: 'Elég, ha csapdát rakok ki?', a: 'Egy-két egérnél a csapda elég lehet. Ha rendszeresen talál ürüléket, vagy több helyiségben is jelen vannak, valószínűleg nagyobb a fertőzöttség — ilyenkor érdemes felméretni.' },
          { q: 'Veszélyes az egér az egészségre?', a: 'Az egér ürüléke és vizelete kórokozókat terjeszthet, és szennyezi az élelmiszert. Az érintett felületeket az irtás után érdemes alaposan kitakarítani és fertőtleníteni.' },
          { q: 'Hogyan előzhető meg, hogy visszajöjjenek?', a: 'A bejutási pontok lezárásával, az élelmiszer zárt tárolásával, és azzal, hogy a ház körül ne maradjon szabadon elérhető élelem (állateledel, madáreleség, komposzt).' },
        ],
      },
      {
        type: 'contact',
        id: 'ajanlatkeres',
        title: 'Kérjen ajánlatot egérirtásra',
        presetService: 'egerirtas',
      },
    ],
  });
}

module.exports = { render };
