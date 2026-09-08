'use strict';
const { renderServiceLanding } = require('../partials/landing');

function render() {
  return renderServiceLanding({
    hero: {
      breadcrumbLabel: 'Egérirtás',
      eyebrow: 'Egérirtás',
      h1: 'Egérirtás — fertőzöttség felszámolása és megelőzés',
      intro:
        'Konyhaszekrény mögött hallott apró neszezés, rágásnyomok az élelmiszer csomagolásán vagy apró ürülék a kamrában — az egérfertőzöttséget minél előbb érdemes kezelni, mielőtt a kolónia tovább szaporodik.',
      badges: [
        { icon: 'shield', text: 'Csapdázás és monitoring' },
        { icon: 'clock', text: 'Rugalmas időpont-egyeztetés' },
        { icon: 'pin', text: '[SZOLGÁLTATÁSI TERÜLET]' },
      ],
      tagBoxLeft: 'Bejárat-felmérés',
      tagBoxRight: 'Tartós mentesítés',
      mediaKey: 'egerirtas',
    },
    sections: [
      {
        type: 'signs',
        bg: 'light',
        id: 'jelek',
        eyebrow: 'Fertőzöttség jelei',
        title: 'Honnan ismerhető fel az egérfertőzöttség?',
        items: [
          { title: 'Apró, sötét ürülék', body: 'Rizsszemnél kisebb, sötét ürülék a konyhaszekrényben, kamrában vagy a padló mentén gyakori jel.' },
          { title: 'Rágásnyomok élelmiszer csomagoláson', body: 'Papír, karton vagy műanyag csomagoláson megjelenő apró rágásnyomok élelmiszer-fertőzöttségre utalnak.' },
          { title: 'Neszezés a falban, mennyezet felett', body: 'Halk kaparászás, futkosás jellemzően este vagy éjszaka, a fal üregeiből vagy az álmennyezet fölül.' },
          { title: 'Jellegzetes szag', body: 'Erősebb fertőzöttségnél az egerek vizelete jellegzetes, kellemetlen szagot okozhat zárt terekben.' },
        ],
      },
      {
        type: 'about',
        bg: 'dark',
        eyebrow: 'Miért szaporodik gyorsan a probléma',
        title: 'Az egér gyorsan szaporodik és apró réseken is bejut',
        paragraphs: [
          'Az egér mindössze néhány milliméteres résen is átfér, így ajtók alatt, csővezetékek mentén vagy a lábazat repedésein könnyen bejut az épületbe — hidegebb hónapokban ez a kockázat tovább nő.',
          'Mivel az egér rövid idő alatt szaporodik, egy kezdeti, kis létszámú fertőzöttség is gyorsan komolyabbá válhat, ha nem történik időben beavatkozás.',
        ],
        sideTitle: 'Tipikus bejutási pontok',
        sideItems: ['Ajtók, ablakok alatti rés', 'Csővezetékek, kábelátvezetések', 'Lábazat, alapozás repedései', 'Kamra, éléskamra szellőzői'],
      },
      {
        type: 'method',
        bg: 'light',
        id: 'kezeles',
        eyebrow: 'Kezelés módja',
        title: 'Hogyan végezzük a mentesítést',
        items: [
          { icon: 'target', title: 'Felmérés és nyomkövetés', body: 'Azonosítjuk a mozgási útvonalakat és a valószínű bejutási pontokat a lakásban vagy a helyiségben.' },
          { icon: 'shield', title: 'Csapdázás, szükség esetén irtószeres pont', body: 'A helyszín adottságaihoz igazodva csapdákat, indokolt esetben biztonságosan elhelyezett irtószeres pontokat alkalmazunk.' },
          { icon: 'process', title: 'Megelőzési javaslat', body: 'Tájékoztatást adunk a bejutási pontok lezárásáról a visszatérés elkerülése érdekében.' },
        ],
      },
      {
        type: 'pricing',
        bg: 'dark',
        id: 'arak',
        eyebrow: 'Árak',
        title: 'Egérirtás árak',
        intro: 'A végleges ár az ingatlan méretétől és a fertőzöttség mértékétől függ.',
        headers: ['Szolgáltatás', 'Mit tartalmaz', 'Ár'],
        rows: [
          ['Helyszíni felmérés', 'Nyomvonalak, bejutási pontok azonosítása', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Lakás / családi ház mentesítése', 'Csapdázás, szükség esetén irtószeres kezelés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Nagyobb alapterület (üzlet, telephely)', 'Kiterjedt mentesítés és monitoring', '[ÁR MEGADÁSA SZÜKSÉGES]'],
          ['Kontroll látogatás', 'Csapdák ellenőrzése, utókövetés', '[ÁR MEGADÁSA SZÜKSÉGES]'],
        ],
        note: 'A pontos árat a helyszín méretének és a fertőzöttség kiterjedésének felmérése után adjuk meg.',
      },
      {
        type: 'twoList',
        bg: 'light',
        id: 'tudnivalok',
        eyebrow: 'Tudnivalók',
        title: 'Előkészületek és teendők a kezelés után',
        leftTitle: 'Mit érdemes előkészíteni',
        leftItems: [
          'Élelmiszereket zárt, rágcsálóbiztos dobozban tárolja',
          'A konyhaszekrények és a kamra legyenek hozzáférhetők a felméréshez',
          'Jelezze, ha háziállat is használja az érintett helyiséget',
        ],
        rightTitle: 'Teendők a kezelés után',
        rightItems: [
          'A kihelyezett csapdákat rendszeresen, de óvatosan ellenőrizze',
          'Elhullott egyedet ne puszta kézzel távolítson el',
          'A javasolt bejárat-lezárási teendőket érdemes mielőbb elvégezni',
        ],
      },
      {
        type: 'trust',
        bg: 'dark',
        eyebrow: 'Miért minket válasszon',
        title: 'Amire számíthat a mentesítéstől',
        items: [
          { icon: 'target', title: 'Bejutási pontok azonosítása', body: 'Nem csak irtunk, hanem a visszatérés okát is igyekszünk feltárni.' },
          { icon: 'shield', title: 'Biztonságos módszerek', body: 'A háztartás adottságaihoz (gyerek, háziállat) igazított megoldást alkalmazunk.' },
          { icon: 'house', title: 'Lakás és üzlethelyiség is', body: 'Családi háztól a kisebb üzletig vállaljuk a mentesítést.' },
          { icon: 'clock', title: 'Rugalmas időpont', body: 'A bejelentés alapján igyekszünk mihamarabbi időpontot biztosítani.' },
        ],
      },
      {
        type: 'area',
        bg: 'light',
        id: 'terulet',
        eyebrow: 'Szolgáltatási terület',
        title: 'Hol vállalunk egérirtást',
        areas: ['[SZOLGÁLTATÁSI TERÜLET]'],
      },
      {
        type: 'faq',
        bg: 'dark',
        id: 'gyik',
        idPrefix: 'eger-faq',
        eyebrow: 'Gyakori kérdések',
        title: 'Egérirtással kapcsolatos kérdések',
        items: [
          { q: 'Miért jelennek meg egerek ősszel a lakásban?', a: 'A hidegebb időjárás közeledtével az egerek melegebb, élelemben gazdag helyet keresnek, ezért ilyenkor gyakoribb a lakóépületekbe történő bejutás.' },
          { q: 'Elég csak csapdát kihelyezni?', a: 'Kisebb fertőzöttségnél a csapdázás önmagában is hatékony lehet, kiterjedtebb esetben azonban célszerű kiegészíteni biztonságosan elhelyezett irtószeres ponttal és a bejutási utak lezárásával.' },
          { q: 'Veszélyes az egérfertőzöttség az egészségre?', a: 'Az egerek ürüléke és vizelete higiéniai kockázatot jelenthet, ezért az érintett felületek megfelelő tisztítása a mentesítés után javasolt.' },
          { q: 'Hogyan előzhető meg a visszatérés?', a: 'A korábban azonosított bejutási pontok (rések, csővezeték-átvezetések) lezárása és az élelmiszerek rágcsálóbiztos tárolása jelentősen csökkenti az újbóli fertőzöttség kockázatát.' },
        ],
      },
      {
        type: 'contact',
        bg: 'light',
        id: 'ajanlatkeres',
        eyebrow: 'Ajánlatkérés',
        title: 'Kérjen ajánlatot egérirtásra',
        presetPest: 'egerirtas',
      },
    ],
    finalCta: {
      eyebrow: 'Következő lépés',
      title: 'Minél előbb lép, annál kisebb a fertőzöttség mértéke',
      body: 'Írja le, milyen jeleket észlelt, és javaslatot adunk a megfelelő kezelésre.',
    },
  });
}

module.exports = { render };
