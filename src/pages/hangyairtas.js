'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render({ path }) {
  return renderServiceLanding({
    path,
    hero: {
      breadcrumbLabel: 'Hangyairtás',
      h1: 'Hangyairtás lakásban és kertben',
      intro:
        'Visszatérő hangyaút a konyhapulton, boly a terasz járólapjai alatt? A látható hangyák csak a kolónia kis részét jelentik. Megkeressük, honnan jönnek, és a fészket is kezeljük.',
      mediaKey: 'hangyairtas',
    },
    sections: [
      {
        type: 'signs',
        id: 'jelek',
        eyebrow: 'A fertőzöttség jelei',
        title: 'Mire figyeljen?',
        items: [
          { title: 'Visszatérő hangyaút', body: 'Ha takarítás után néhány órán belül újra megjelenik a hangyasor a pulton, az ablakpárkányon vagy a padlón, a fészek a közelben van.' },
          { title: 'Boly a kertben, a járólap alatt', body: 'A burkolat alatti boly kihordja a homokágyat, így a járólapok idővel megsüllyedhetnek, elmozdulhatnak.' },
          { title: 'Finom fűrészpor a faszerkezet mellett', body: 'Gerenda, ajtókeret vagy teraszburkolat mellett megjelenő finom fűrészpor ácshangyára utalhat, amely a fában rágja ki a járatait.' },
          { title: 'Hangyák az élelmiszer körül', body: 'Kamrában, cukortartóban, szemetesnél vagy a háziállat tálja körül rendszeresen feltűnő hangyák.' },
        ],
      },
      {
        type: 'about',
        eyebrow: 'Miért jönnek vissza?',
        title: 'A fészek nélkül a hangyák mindig visszajönnek',
        paragraphs: [
          'A konyhában látott hangyák a kolónia élelmet gyűjtő dolgozói. A királynő és az utódok a fészekben maradnak — falban, padló alatt, a ház körüli talajban —, és amíg a fészek megvan, újabb és újabb dolgozók indulnak útnak.',
          'Ezért a hangyairtásnál a fészket kell elérni. Erre jó a csalétek: a dolgozók hazaviszik, és a hatóanyag a fészekben hat. Kültéri fészeknél közvetlen kezelésre is szükség lehet.',
        ],
        sideTitle: 'Ahol a fészek lenni szokott',
        sideItems: [
          'Járólap, terasz, járda alatt',
          'Falrésekben, a lábazat mentén',
          'Padlószegély, küszöb alatt',
          'Kerti gyepben, virágágyásban',
        ],
      },
      {
        type: 'method',
        id: 'kezeles',
        eyebrow: 'A kezelés menete',
        title: 'Hogyan végezzük a hangyairtást?',
        items: [
          { title: 'A hangyaút követése', body: 'Megnézzük, merre járnak a hangyák, és hol lehet a fészek — a lakásban és a ház körül is.' },
          { title: 'Beltéri kezelés', body: 'A hangyautak mentén és a bejutási pontoknál kihelyezzük a fajnak megfelelő szert, jellemzően csalétket.' },
          { title: 'Kültéri fészek kezelése', body: 'Ha a fészek a kertben, a burkolat alatt vagy a lábazatnál van, ott is elvégezzük a kezelést, hogy a kolónia ne pótolja újra a dolgozókat.' },
        ],
      },
      {
        type: 'pricing',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Hangyairtás árak',
        intro: 'Az ár attól függ, hogy csak beltéren, csak a kertben, vagy mindkét helyen kell-e kezelni.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Beltéri kezelés', 'A lakáson belüli hangyautak és bejutási pontok kezelése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kültéri fészekkezelés', 'Kerti, terasz és járólap alatti bolyok', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Ácshangya', 'Faszerkezetet érintő fertőzöttség, egyedi felmérés alapján', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Ismételt kezelés', 'Ha a kolónia nagy, vagy több fészek van', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'Pontos árat a felmérés után adunk, amikor már látjuk, hol és hány fészek van.',
      },
      {
        type: 'twoList',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Mit kell tenni a kezelés előtt és után?',
        leftTitle: 'A kezelés előtt',
        leftItems: [
          'Az élelmiszereket tegye zárt dobozba.',
          'A hangyautat a felmérés előtt ne mossa fel és ne fújja le — így könnyebb követni.',
          'A kezelendő kerti részt, teraszt tegye szabaddá.',
        ],
        rightTitle: 'A kezelés után',
        rightItems: [
          'A csalétkeket ne mozdítsa el és ne törölje le.',
          'Pár napig több hangyát is láthat: ilyenkor hordják a csalétket a fészekbe, ez a hatás része.',
          'Kültéri kezelés után a megbeszélt ideig ne locsolja a kezelt területet.',
        ],
      },
      {
        type: 'trust',
        scope: 'Lakás, családi ház, kert, üzlet',
      },
      {
        type: 'faq',
        id: 'gyik',
        idPrefix: 'hangya-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Kérdések a hangyairtásról',
        items: [
          { q: 'Miért jönnek vissza a hangyák, ha eltakarítottam őket?', a: 'Mert a fészek megmaradt. A letörölt hangyák helyére a kolónia újakat küld, amíg a királynő él.' },
          { q: 'Veszélyes a csalétek a háziállatra?', a: 'A kezelés előtt jelezze, ha kutya vagy macska van a háznál: ennek megfelelően választjuk meg a szert és a kihelyezés helyét, és elmondjuk, mire figyeljen.' },
          { q: 'Mennyi idő alatt szűnik meg egy boly?', a: 'A csalétek néhány nap alatt kezd hatni, de egy nagyobb kolónia teljes elpusztulása hetekig is eltarthat. Nagy vagy több fészek esetén második kezelésre is szükség lehet.' },
          { q: 'Hol jönnek be a hangyák a lakásba?', a: 'Leggyakrabban az ablak- és ajtókeretek résein, a lábazat repedésein, a csővezetékek és kábelek átvezetésénél. Ezek lezárása sokat segít a megelőzésben.' },
        ],
      },
      {
        type: 'contact',
        id: 'ajanlatkeres',
        title: 'Kérjen ajánlatot hangyairtásra',
        presetService: 'hangyairtas',
      },
    ],
  });
}

module.exports = { render };
