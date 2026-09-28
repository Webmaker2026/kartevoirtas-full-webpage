'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render({ path }) {
  return renderServiceLanding({
    path,
    hero: {
      breadcrumbLabel: 'Bolhairtás',
      h1: 'Bolhairtás lakásban és kertben',
      intro:
        'Sokat vakarózik a kutya vagy a macska, és Önt is csípik a bokáján? A bolhák nagy része nem az állaton, hanem a szőnyegben, a kárpitban és a padló réseiben él, ezért a lakást is kezelni kell.',
      mediaKey: 'bolhairtas',
    },
    sections: [
      {
        type: 'signs',
        id: 'jelek',
        eyebrow: 'A fertőzöttség jelei',
        title: 'Honnan ismerhető fel a bolha?',
        items: [
          { title: 'Csípések a bokán, lábszáron', body: 'Apró, erősen viszkető piros pöttyök, gyakran csoportosan, főleg a boka és a lábszár környékén.' },
          { title: 'Vakarózó háziállat', body: 'A kutya vagy a macska a szokásosnál sokkal többet vakarózik, rágja a szőrét, nyugtalan.' },
          { title: 'Fekete morzsák a fekhelyen', body: 'Apró fekete szemcsék az állat fekhelyén, a szőnyegen. Ha nedves papírra teszi, vörösesbarnára színeződnek — ez bolhaürülék.' },
          { title: 'Ugráló apró rovarok', body: 'Erősebb fertőzöttségnél a szőnyegen, a padlón vagy a zoknin is látni az ugráló, 2–3 mm-es bolhákat.' },
        ],
      },
      {
        type: 'about',
        eyebrow: 'Miért nem elég az állatot kezelni?',
        title: 'A bolhák nagy része a lakásban él',
        paragraphs: [
          'Az állaton élő kifejlett bolhák csak kis részét adják a populációnak. A peték leesnek a szőrből, a lárvák és a bábok a szőnyegben, a kárpitban, a padló réseiben és az állat fekhelyén fejlődnek. A bábokból hetekkel később is kelhetnek ki új bolhák.',
          'Ezért egyszerre kell kezelni az állatot — ezt az állatorvos végzi — és a lakást. Ha az állat sokat van kint, a kert árnyékos, nedves részein is lehet fertőzött terület.',
        ],
        sideTitle: 'Ahol a bolha fejlődik',
        sideItems: [
          'Szőnyeg, kárpitozott bútor',
          'Az állat fekhelye, kosara, takarója',
          'Padlórések, szegélylécek mentén',
          'Árnyékos, nedves kerti részek',
        ],
      },
      {
        type: 'method',
        id: 'kezeles',
        eyebrow: 'A kezelés menete',
        title: 'Hogyan zajlik a bolhairtás?',
        items: [
          { title: 'Felmérés', body: 'Megnézzük, mely helyiségek, textíliák és kerti részek érintettek.' },
          { title: 'Beltéri kezelés', body: 'Kezeljük a szőnyegeket, a kárpitot, a padlóréseket és az állat fekhelyének környékét úgy, hogy a lárvák ellen is hasson.' },
          { title: 'A kert, ha szükséges', body: 'Ha az állat sokat tartózkodik kint, a kert érintett részeit is kezeljük, hogy ne onnan fertőződjön újra.' },
        ],
      },
      {
        type: 'pricing',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Bolhairtás árak',
        intro: 'Az ár a kezelendő terület méretétől és attól függ, hogy a kertet is kezelni kell-e.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Lakás kezelése', 'Szőnyeg, kárpit, padlórések, fekhely környéke', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Nagyobb ház, több helyiség', 'Ha a bolha a ház több részén is jelen van', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kert kezelése', 'Árnyékos, nedves kerti részek, kutyaház környéke', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Ismételt kezelés', 'A bábokból később kikelő bolhák ellen', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'Az állat bolhátlanítása nem része a szolgáltatásnak — ezt az állatorvossal egyeztesse, lehetőleg a lakás kezelésével egy időben.',
      },
      {
        type: 'twoList',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Mit kell tenni a kezelés előtt és után?',
        leftTitle: 'A kezelés előtt',
        leftItems: [
          'Porszívózza fel alaposan a szőnyegeket, a kárpitot és a padlóréseket, a porzsákot dobja ki.',
          'Az állat fekhelyét és takaróit mossa ki a legmagasabb megengedett hőfokon.',
          'Egyeztessen az állatorvossal az állat kezeléséről.',
          'Szedje fel a padlóról a játékokat, ruhákat.',
        ],
        rightTitle: 'A kezelés után',
        rightItems: [
          'A kezelt felületeket a megbeszélt ideig ne porszívózza és ne mossa fel.',
          'Egy-két hétig még láthat bolhát: a bábokból kikelő egyedek így kerülnek a kezelt felületre.',
          'A megbeszélt ideig ne engedje az állatot a kezelt helyiségbe.',
        ],
      },
      {
        type: 'trust',
        scope: 'Lakás, családi ház, kert',
      },
      {
        type: 'faq',
        id: 'gyik',
        idPrefix: 'bolha-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Kérdések a bolhairtásról',
        items: [
          { q: 'Elég, ha az állatorvos kezeli a kutyát vagy a macskát?', a: 'Önmagában ritkán. A bolhák fejlődése nagyrészt a lakásban zajlik, ezért ha csak az állatot kezelik, a szőnyegből és a kárpitból újra fertőződik.' },
          { q: 'Honnan jöhettek a bolhák?', a: 'Leggyakrabban a háziállat hozza be sétáról, a kertből vagy más állattal érintkezve. Előfordul, hogy egy korábbi lakó állata után maradnak a lakásban.' },
          { q: 'Mennyi idő alatt tűnnek el?', a: 'A kifejlett bolhák a kezelés után gyorsan elpusztulnak, de a bábokból még egy-két hétig kelhetnek ki újak. Ha ezután is sok bolhát lát, szükség lehet egy második kezelésre.' },
          { q: 'A kertet is kezelni kell?', a: 'Csak ha ott is van fertőzött terület — jellemzően árnyékos, nedves helyeken, ahol az állat pihenni szokott. Ezt a felméréskor megnézzük.' },
        ],
      },
      {
        type: 'contact',
        id: 'ajanlatkeres',
        title: 'Kérjen ajánlatot bolhairtásra',
        presetService: 'bolhairtas',
      },
    ],
  });
}

module.exports = { render };
