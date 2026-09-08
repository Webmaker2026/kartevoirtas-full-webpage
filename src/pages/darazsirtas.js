'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render() {
  return renderServiceLanding({
    hero: {
      breadcrumbLabel: 'Darázsirtás',
      tag: 'Allergiaveszély esetén ne kísérletezzen egyedül',
      eyebrow: 'Darázsirtás',
      h1: 'Darázsirtás — darázsfészek biztonságos eltávolítása',
      intro:
        'Tetőtérben, homlokzaton, kerti tárolóban vagy talajban kialakult darázsfészket biztonságosan, a szükséges védőfelszereléssel távolítunk el, csökkentve a csípés kockázatát.',
      badges: [
        { icon: 'shield', text: 'Biztonságos fészekeltávolítás' },
        { icon: 'clock', text: '[KISZÁLLÁSI IDŐ]' },
        { icon: 'pin', text: '[SZOLGÁLTATÁSI TERÜLET]' },
      ],
      tagBoxLeft: 'Fészek felmérése',
      tagBoxRight: 'Biztonságos eltávolítás',
      mediaKey: 'darazsirtas',
    },
    sections: [
      {
        type: 'signs',
        bg: 'light',
        id: 'jelek',
        eyebrow: 'Mikor van szükség azonnali beavatkozásra',
        title: 'Milyen esetben ne várjon a hívással?',
        intro: 'Egy darázsfészek mérete gyorsan nő a szezon során, a beavatkozás pedig annál kockázatosabb, minél nagyobb a kolónia.',
        items: [
          { title: 'Fészek lakott terület közelében', body: 'Ablak, terasz, bejárat vagy gyermekek által használt terület közelében kialakult fészeknél a csípés kockázata jelentősen nő.' },
          { title: 'Allergiás családtag a háztartásban', body: 'Ha a családban allergiás reakció kockázata áll fenn, a fészek szakszerű, gyors eltávolítása különösen fontos.' },
          { title: 'Egyre nagyobb darázsforgalom', body: 'A fészek körüli megnövekedett darázsforgalom arra utal, hogy a kolónia mérete gyorsan nő.' },
          { title: 'Nehezen elérhető fészek', body: 'Tetőtérben, ereszcsatornában vagy magasban lévő fészek eltávolítása szakértelmet és megfelelő felszerelést igényel.' },
        ],
      },
      {
        type: 'about',
        bg: 'dark',
        eyebrow: 'Miért nem javasolt egyedül nekiállni',
        title: 'A fészek típusa meghatározza a beavatkozás módját',
        paragraphs: [
          'A darazsak fészket építhetnek tetőtérben, homlokzati résekben, kerti tárolóban, talajban vagy akár falüregben is — a fészek helye és mérete alapján döntjük el, milyen módszerrel, milyen védőfelszereléssel biztonságos az eltávolítás.',
          'A beavatkozást jellemzően a nap kevésbé meleg szakaszában végezzük, amikor a darazsak nyugodtabbak, így csökken a csípés kockázata a kezelés során.',
        ],
        sideTitle: 'Jellemző fészekhelyek',
        sideItems: ['Tetőtér, ereszcsatorna', 'Homlokzati rések, redőnytok', 'Kerti tároló, pergola', 'Talajban kialakult fészek'],
      },
      {
        type: 'method',
        bg: 'light',
        id: 'kezeles',
        eyebrow: 'Kezelés módja',
        title: 'Hogyan zajlik a fészek eltávolítása',
        items: [
          { icon: 'target', title: 'Fészek beazonosítása', body: 'Felmérjük a fészek pontos helyét, méretét és a megközelíthetőséget, mielőtt a beavatkozás elkezdődne.' },
          { icon: 'shield', title: 'Biztonságos beavatkozás', body: 'A szükséges védőfelszereléssel és célzott szerrel semlegesítjük a kolóniát, majd eltávolítjuk a fészket.' },
          { icon: 'process', title: 'Terület ellenőrzése', body: 'A beavatkozás után ellenőrizzük a területet, és tájékoztatást adunk az esetleges újbóli fészekrakás jeleiről.' },
        ],
      },
      {
        type: 'pricing',
        bg: 'dark',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Darázsirtás árak',
        intro: 'A végleges ár a fészek méretétől, típusától és megközelíthetőségétől függ.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Kisebb, jól elérhető fészek', 'Fészek felmérése és biztonságos eltávolítása', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Nagyobb vagy nehezen elérhető fészek', 'Tetőtéri, magasban lévő fészek kezelése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Talajban lévő fészek', 'Kerti, talajszinti fészek felszámolása', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Sürgősségi kiszállás', 'Rövid határidejű kiszállás allergiaveszély esetén', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'A pontos árat a fészek helyszíni vagy fotó alapján történő felmérése után adjuk meg.',
      },
      {
        type: 'twoList',
        bg: 'light',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Előkészületek és teendők a kezelés után',
        leftTitle: 'Mit érdemes előkészíteni',
        leftItems: [
          'A fészek közvetlen közelét ürítse ki, amennyiben biztonságosan megteheti',
          'Tartsa távol a gyerekeket és a háziállatokat a fészek környékétől',
          'Jelezze előre, ha valakinek allergiája van a családban',
        ],
        rightTitle: 'Teendők a kezelés után',
        rightItems: [
          'A kezelt terület megközelítését a megbeszélt ideig kerülje',
          'Az eltávolított fészek helyén rövid ideig még mozoghatnak visszatérő egyedek',
          'Figyelje, nem alakul-e ki új fészek a közelben a szezon során',
        ],
      },
      {
        type: 'trust',
        bg: 'dark',
        eyebrow: 'Miért minket válasszon',
        title: 'Amire számíthat a beavatkozástól',
        items: [
          { icon: 'shield', title: 'Biztonságos, felszerelt beavatkozás', body: 'A szükséges védőfelszereléssel dolgozunk, csökkentve a csípés kockázatát.' },
          { icon: 'clock', title: 'Gyors kiszállás', body: 'Allergiaveszély vagy lakott terület közelében lévő fészek esetén rövid határidőre törekszünk.' },
          { icon: 'target', title: 'A fészek típusához igazított módszer', body: 'Tetőtéri, homlokzati vagy talajban lévő fészeknél eltérő megközelítést alkalmazunk.' },
          { icon: 'house', title: 'Lakóingatlan és kert is', body: 'Vállaljuk a fészek eltávolítását családi házaknál, társasházaknál és kerti építményeknél is.' },
        ],
      },
      {
        type: 'area',
        bg: 'light',
        id: 'terulet',
        eyebrow: 'Szolgáltatási terület',
        title: 'Hol vállalunk darázsirtást',
        areas: ['[SZOLGÁLTATÁSI TERÜLET]'],
      },
      {
        type: 'faq',
        bg: 'dark',
        id: 'gyik',
        idPrefix: 'darazs-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Darázsirtással kapcsolatos kérdések',
        items: [
          { q: 'Miért veszélyes egyedül eltávolítani a fészket?', a: 'A darazsak veszélyérzet esetén tömegesen támadhatnak, ami különösen allergiás személyeknél komoly egészségügyi kockázatot jelenthet — a szakszerű eltávolításhoz megfelelő védőfelszerelés és tapasztalat szükséges.' },
          { q: 'Ugyanoda épít fészket a darázs a kezelés után?', a: 'Az eltávolított fészek helyére a darazsak jellemzően nem építenek újat egy szezonon belül, de a kedvező adottságú helyeken (pl. tetőtéri rés) új kolónia telepedhet meg a következő szezonban.' },
          { q: 'Mennyi idő alatt érnek ki a helyszínre?', a: 'A kiszállási idő a bejelentés sürgősségétől és a helyszíntől függ — allergiaveszély esetén a lehető legrövidebb időn belüli kiszállásra törekszünk.' },
          { q: 'Milyen napszakban végzik a beavatkozást?', a: 'A fészek eltávolítását jellemzően a nap kevésbé meleg, csendesebb időszakában végezzük, amikor a darazsak kevésbé aktívak.' },
        ],
      },
      {
        type: 'contact',
        bg: 'light',
        id: 'ajanlatkeres',
        eyebrow: 'Ajánlatkérés',
        title: 'Kérjen ajánlatot darázsirtásra',
        presetPest: 'darazsirtas',
      },
    ],
    finalCta: {
      eyebrow: 'Allergiaveszély esetén ne várjon',
      title: 'A fészek mérete a szezon során gyorsan nő',
      body: 'Írja meg, hol található a fészek, és igyekszünk mielőbb időpontot egyeztetni.',
    },
  });
}

module.exports = { render };
