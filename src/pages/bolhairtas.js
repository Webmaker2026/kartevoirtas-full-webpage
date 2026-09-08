'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render() {
  return renderServiceLanding({
    hero: {
      breadcrumbLabel: 'Bolhairtás',
      eyebrow: 'Bolhairtás',
      h1: 'Bolhairtás — lakástextilben és kertben megtelepedő bolhák ellen',
      intro:
        'Ha a háziállat feltűnően sokat vakarózik, vagy Ön is csípésnyomokat vesz észre a boka környékén, a bolha jellemzően már a szőnyegben, kárpitban vagy a kertben is megtelepedett — nem elég csak az állatot kezelni.',
      badges: [
        { icon: 'shield', text: 'Beltéri és kültéri kezelés' },
        { icon: 'clock', text: 'Rugalmas időpont-egyeztetés' },
        { icon: 'pin', text: '[SZOLGÁLTATÁSI TERÜLET]' },
      ],
      tagBoxLeft: 'Textil- és kertfelmérés',
      tagBoxRight: 'Célzott kezelés',
      mediaKey: 'bolhairtas',
    },
    sections: [
      {
        type: 'signs',
        bg: 'light',
        id: 'jelek',
        eyebrow: 'Fertőzöttség jelei',
        title: 'Honnan ismerhető fel a bolhafertőzöttség?',
        items: [
          { title: 'Csípésnyomok a boka, lábszár körül', body: 'A bolha jellemzően a boka és a lábszár magasságában csíp, apró, viszkető, vörös pontokat hagyva.' },
          { title: 'Háziállat fokozott vakarózása', body: 'Ha a kutya vagy macska a szokásosnál jóval többet vakarózik, rágja a szőrét, érdemes bolhára gyanakodni.' },
          { title: 'Apró, sötét pontok a fekhelyen', body: 'A bolhaürülék apró, sötét pontok formájában jelenik meg az állat fekhelyén, szőnyegen, kárpitozott bútoron.' },
          { title: 'Ugráló, apró rovarok szőnyegen', body: 'Erősebb fertőzöttségnél már szabad szemmel is látható, ugráló apró rovarok jelennek meg a padlón, szőnyegen.' },
        ],
      },
      {
        type: 'about',
        bg: 'dark',
        eyebrow: 'Miért nem elég csak a háziállatot kezelni',
        title: 'A bolha életciklusának nagy része a lakásban zajlik',
        paragraphs: [
          'A bolha petéi, lárvái és bábjai jellemzően a szőnyegben, a kárpitban, a padló réseiben és a kertben, árnyékos, nedves területeken találhatók — az állaton élő, kifejlett bolha csak a populáció kisebb részét jelenti.',
          'Emiatt a tartós megoldáshoz a lakástextil és indokolt esetben a kert kezelése is szükséges, az állatorvosi kezeléssel párhuzamosan.',
        ],
        sideTitle: 'Jellemző gócpontok',
        sideItems: ['Szőnyeg, kárpitozott bútor', 'Állat fekhelye, kosara', 'Padlórések, szegélylécek mögött', 'Árnyékos, nedves kerti területek'],
      },
      {
        type: 'method',
        bg: 'light',
        id: 'kezeles',
        eyebrow: 'Kezelés módja',
        title: 'Hogyan végezzük az irtást',
        items: [
          { icon: 'target', title: 'Gócpontok felmérése', body: 'Beazonosítjuk, mely helyiségekben, textíliákban és — szükség esetén — a kert mely részén koncentrálódik a fertőzöttség.' },
          { icon: 'spark', title: 'Célzott beltéri kezelés', body: 'A szőnyegre, kárpitra és a padló réseire kiterjedő kezeléssel számoljuk fel a fejlődési stádiumokat is.' },
          { icon: 'process', title: 'Kültéri kezelés szükség esetén', body: 'Ha a kertben is található gócpont, azt is bevonjuk a kezelésbe a visszafertőződés elkerülése érdekében.' },
        ],
      },
      {
        type: 'pricing',
        bg: 'dark',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Bolhairtás árak',
        intro: 'A végleges ár a kezelendő terület méretétől és attól függ, hogy szükséges-e kültéri kezelés is.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Beltéri alapkezelés', 'Szőnyeg, kárpit, padlórések célzott kezelése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kiterjedt beltéri fertőzöttség', 'Több helyiségre kiterjedő kezelés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kültéri kezelés', 'Kerti gócpontok kezelése', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kontroll látogatás', 'Utókövetés, szükség esetén ismételt kezelés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'A háziállat állatorvosi kezelése nem része a szolgáltatásunknak — ezt javasoljuk a lakáskezeléssel párhuzamosan elvégeztetni.',
      },
      {
        type: 'twoList',
        bg: 'light',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Előkészületek és teendők a kezelés után',
        leftTitle: 'Mit érdemes előkészíteni',
        leftItems: [
          'Alaposan porszívózza fel a szőnyegeket, kárpitokat a kezelés előtt',
          'Az állat fekhelyét, textíliáit mossa ki magas hőfokon',
          'Egyeztessen időpontot a háziállat állatorvosi bolhakezelésére is',
        ],
        rightTitle: 'Teendők a kezelés után',
        rightItems: [
          'A kezelt felületeket a megbeszélt ideig ne porszívózza vagy mossa fel',
          'Néhány napig előfordulhat, hogy még látnak egy-egy egyedet a kikelő lárvák miatt',
          'Tartsa távol a kezelt helyiségtől az állatot a megbeszélt ideig',
        ],
      },
      {
        type: 'trust',
        bg: 'dark',
        eyebrow: 'Miért minket válasszon',
        title: 'Amire számíthat a kezeléstől',
        items: [
          { icon: 'target', title: 'Gócpont-központú megközelítés', body: 'Nem csak felületi kezelést végzünk, hanem a bolha életciklusának fő helyszíneit célozzuk.' },
          { icon: 'house', title: 'Beltér és kert együtt', body: 'Ha a kert is érintett, egy látogatás keretében kezeljük a lakást és a kültéri gócpontokat.' },
          { icon: 'doc', title: 'Érthető tájékoztatás', body: 'Elmondjuk, mire számítson a kezelés után, és mit érdemes egyeztetni az állatorvossal.' },
          { icon: 'clock', title: 'Rugalmas időpont', body: 'A bejelentés alapján igyekszünk mihamarabbi időpontot biztosítani.' },
        ],
      },
      {
        type: 'area',
        bg: 'light',
        id: 'terulet',
        eyebrow: 'Szolgáltatási terület',
        title: 'Hol vállalunk bolhairtást',
        areas: ['[SZOLGÁLTATÁSI TERÜLET]'],
      },
      {
        type: 'faq',
        bg: 'dark',
        id: 'gyik',
        idPrefix: 'bolha-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Bolhairtással kapcsolatos kérdések',
        items: [
          { q: 'Elég, ha csak a háziállatot kezeltetem állatorvosnál?', a: 'Az állatorvosi kezelés fontos, de önmagában nem old meg mindent, mert a bolha életciklusának nagy része (peték, lárvák, bábok) a lakástextilben és a padló réseiben zajlik — ezért javasolt a lakáskezelés is.' },
          { q: 'Honnan kerülhettek a bolhák a lakásba?', a: 'Leggyakrabban háziállat, kerti látogatás vagy másik fertőzött ingatlanból, ruhán, cipőn behozott egyedek révén jutnak be a lakásba.' },
          { q: 'Mennyi idő alatt tűnik el a fertőzöttség?', a: 'A kezelés a kifejlett egyedekre és a lárvákra egyaránt hat, de a kikelő bábokból származó egyedek miatt néhány napig még előfordulhat aktivitás, teljes eredmény jellemzően 1-2 héten belül várható.' },
          { q: 'Szükséges kültéri kezelés is?', a: 'Ha a háziállat sokat tartózkodik árnyékos, nedves kerti területen, ott is kialakulhat gócpont — ezt a felmérés során vizsgáljuk, és szükség esetén javasoljuk a kültéri kezelést.' },
        ],
      },
      {
        type: 'contact',
        bg: 'light',
        id: 'ajanlatkeres',
        eyebrow: 'Ajánlatkérés',
        title: 'Kérjen ajánlatot bolhairtásra',
        presetPest: 'bolhairtas',
      },
    ],
    finalCta: {
      eyebrow: 'Következő lépés',
      title: 'Ne csak az állatot, a lakást is kezeltesse',
      body: 'Írja le, hol tapasztalja a fertőzöttséget, és javaslatot adunk a megfelelő kezelésre.',
    },
  });
}

module.exports = { render };
