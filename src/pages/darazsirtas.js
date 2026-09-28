'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render({ path }) {
  return renderServiceLanding({
    path,
    hero: {
      breadcrumbLabel: 'Darázsirtás',
      h1: 'Darázsirtás, darázsfészek eltávolítása',
      intro:
        'Fészek az eresz alatt, a redőnytokban vagy a kerti fészerben? Ne próbálja leverni vagy lefújni: a megzavart darazsak tömegesen támadhatnak. Hívjon, és megbeszéljük, mikor tudunk menni.',
      mediaKey: 'darazsirtas',
    },
    sections: [
      {
        type: 'signs',
        id: 'jelek',
        eyebrow: 'Mikor sürgős?',
        title: 'Mikor ne várjon a hívással?',
        intro: 'A darázsfészek a nyár folyamán gyorsan nő: egy tavasszal még apró fészekben augusztusra több száz darázs is lehet.',
        items: [
          { title: 'Fészek a bejárat, ablak, terasz közelében', body: 'Ahol naponta járnak, ott nagy az esélye, hogy valaki véletlenül megzavarja a darazsakat.' },
          { title: 'Allergiás családtag', body: 'Darázscsípésre allergiás embernél egyetlen csípés is komoly reakciót okozhat. Ilyenkor ne halogassa az eltávolítást.' },
          { title: 'Gyerekek, háziállatok a kertben', body: 'A földben vagy alacsonyan lévő fészket egy játszó gyerek vagy a kutya könnyen megbolygathatja.' },
          { title: 'Nehezen elérhető fészek', body: 'Tetőtérben, falüregben vagy magasban lévő fészekhez létra, védőruha és megfelelő eszköz kell — ezt ne kockáztassa egyedül.' },
        ],
      },
      {
        type: 'about',
        eyebrow: 'Miért ne egyedül?',
        title: 'Minden fészek más beavatkozást kíván',
        paragraphs: [
          'Darazsak fészkelhetnek az eresz alá, a redőnytokba, a tetőcserép alá, falüregbe, kerti tárolóba vagy a földbe. A fészek helye és mérete határozza meg, milyen szerrel, milyen eszközzel és milyen védőfelszereléssel lehet biztonságosan hozzáférni.',
          'A beavatkozást lehetőleg reggel vagy este végezzük, amikor a darazsak többsége a fészekben van, és kevésbé aktívak.',
        ],
        sideTitle: 'Gyakori fészekhelyek',
        sideItems: [
          'Eresz, tetőszegély',
          'Redőnytok, homlokzati rés',
          'Tetőtér, padlás',
          'Kerti tároló, fészer, pergola',
          'Üreg a földben, a gyepben',
        ],
      },
      {
        type: 'method',
        id: 'kezeles',
        eyebrow: 'A beavatkozás menete',
        title: 'Hogyan zajlik a fészek eltávolítása?',
        items: [
          { title: 'Felmérés', body: 'Megnézzük, hol van a fészek, mekkora, és hogyan lehet biztonságosan megközelíteni.' },
          { title: 'A darazsak elpusztítása', body: 'Védőfelszerelésben, erre alkalmas szerrel kezeljük a fészket, hogy a benne lévő darazsak elpusztuljanak.' },
          { title: 'A fészek eltávolítása', body: 'Ha a fészek hozzáférhető, eltávolítjuk. Falüregben vagy tetőszerkezetben lévő fészeknél ez nem mindig lehetséges — ilyenkor elmondjuk, mi a teendő.' },
        ],
      },
      {
        type: 'pricing',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Darázsirtás árak',
        intro: 'Az ár a fészek helyétől, méretétől és attól függ, mennyire nehéz hozzáférni.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Könnyen elérhető fészek', 'Eresz, ablak, kerti tároló, földszinti magasság', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Magasan lévő vagy nehezen elérhető fészek', 'Tetőtér, tetőszegély, redőnytok, emeleti magasság', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Földben lévő fészek', 'Kertben, gyepben, járda mellett', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Sürgős kiszállás', 'Soron kívüli időpont, például allergiás családtag esetén', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'Pontos árat akkor tudunk mondani, ha tudjuk, hol és milyen magasan van a fészek — ezt telefonon vagy az űrlap üzenet mezőjében írja le.',
      },
      {
        type: 'twoList',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Mit tegyen a beavatkozás előtt és után?',
        leftTitle: 'Amíg megérkezünk',
        leftItems: [
          'Ne próbálja meg leverni, lefújni vagy eltömni a fészket.',
          'Tartsa távol a gyerekeket és a háziállatokat a fészek környékétől.',
          'Csukja be a fészek felőli ablakokat.',
          'Jelezze, ha valaki allergiás a családban.',
        ],
        rightTitle: 'A beavatkozás után',
        rightItems: [
          'A kezelt terület környékét a megbeszélt ideig kerülje.',
          'Egy-két napig még repkedhetnek darazsak a fészek helyén — ezek a kint lévő egyedek, amelyek visszatérnek.',
          'Ha a szezon során új fészket lát, szóljon időben: a kis fészket könnyebb eltávolítani.',
        ],
      },
      {
        type: 'trust',
        scope: 'Családi ház, társasház, kert, üzlet',
      },
      {
        type: 'faq',
        id: 'gyik',
        idPrefix: 'darazs-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Kérdések a darázsirtásról',
        items: [
          { q: 'Miért ne távolítsam el én a fészket?', a: 'A megzavart darazsak riasztják egymást és tömegesen támadnak. Allergiás embernél ez életveszélyes is lehet, de allergia nélkül is nagyon fájdalmas több tucat csípés. Magasban, létráról a leesés veszélye is fennáll.' },
          { q: 'Visszajönnek a darazsak ugyanoda?', a: 'Ugyanabba a fészekbe nem költöznek vissza, de ha a hely kedvező — például egy rés az eresz alatt —, a következő években új fészek épülhet a közelben. Ezt a nyílás lezárásával lehet megelőzni.' },
          { q: 'Milyen gyorsan tudnak kijönni?', a: 'Ez a helyszíntől és az aktuális munkáinktól függ; telefonon megmondjuk a legkorábbi időpontot. Ha allergiás családtag is érintett, ezt jelezze a hívásnál.' },
          { q: 'Milyen napszakban végzik a beavatkozást?', a: 'Lehetőleg kora reggel vagy este, amikor a darazsak többsége a fészekben van, és kevésbé aktívak. Az időpontot telefonon egyeztetjük.' },
          { q: 'A méheket is kiirtják?', a: 'Nem. A méhek hasznos, védett rovarok — méhrajhoz vagy méhfészekhez méhészt érdemes hívni. Ha nem biztos benne, hogy darázsról vagy méhről van szó, telefonon segítünk eldönteni.' },
        ],
      },
      {
        type: 'contact',
        id: 'ajanlatkeres',
        title: 'Kérjen ajánlatot darázsirtásra',
        presetService: 'darazsirtas',
      },
    ],
  });
}

module.exports = { render };
