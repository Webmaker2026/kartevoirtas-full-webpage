'use strict';
const { SITE } = require('../config');
const { icons } = require('../partials/icons');
const { renderPageHero, renderFaq, renderFaqJsonLd } = require('../partials/components');
const { SERVICES } = require('../data/services');

function render({ path }) {
  const serviceNames = SERVICES.filter((s) => s.slug !== 'egyeb-kartevok').map((s) => s.label.toLowerCase()).join(', ');

  const generalFaq = [
    { q: 'Hogyan kérhetek árajánlatot?', a: 'Hívjon minket telefonon, vagy töltse ki az ajánlatkérő űrlapot a Kapcsolat oldalon vagy bármelyik szolgáltatásoldal alján. Elmondja, mit tapasztal, és megmondjuk, szükség van-e helyszíni felmérésre.' },
    { q: 'Mennyi idő alatt tudnak kijönni?', a: `Ez a helyszíntől, a munka sürgősségétől és az aktuális beosztásunktól függ. Általában: ${SITE.dispatchTime}. Telefonon megmondjuk a legkorábbi időpontot.` },
    { q: 'Otthon kell lennem a kezelés idején?', a: 'A felméréshez és a kezeléshez valakinek be kell engednie minket, és jó, ha el tudja mondani, hol és mit tapasztalt. A kezelés utáni teendőket is ekkor beszéljük meg.' },
    { q: 'Hogyan készüljek fel a kezelésre?', a: 'Ez kártevőnként eltér. Az adott szolgáltatás oldalán, a „Tudnivalók” részben összefoglaltuk a legfontosabbakat, a pontos teendőket pedig az időpont egyeztetésekor mondjuk el.' },
    { q: 'Milyen fizetési módokat fogadnak el?', a: '[FIZETÉSI MÓDOK MEGADÁSA SZÜKSÉGES]' },
    { q: 'Társasházban ki rendeli meg a kezelést?', a: 'Ha csak egy lakás érintett, a lakó vagy a tulajdonos. Ha a közös terek is érintettek, jellemzően a közös képviselő. Mindkét esetben tudunk ajánlatot adni, és szükség esetén egyeztetünk a közös képviselővel.' },
    { q: 'Mi történik, ha a kezelés után is látok kártevőt?', a: 'Az első napokban ez sok kártevőnél természetes. Ha a megbeszélt idő után is aktivitást tapasztal, jelezze nekünk, és megbeszéljük a további teendőket.' },
    { q: 'Milyen kártevőkkel foglalkoznak?', a: `Külön oldalt talál a következőkről: ${serviceNames}. Ha más kártevővel van gondja (például moly, pincebogár), nézze meg az Egyéb kártevők oldalt, vagy hívjon minket.` },
    { q: 'Cégeknek is dolgoznak?', a: 'Igen. Társasházaknak, éttermeknek, üzleteknek, irodáknak és raktáraknak is adunk ajánlatot, a helyszín felmérése alapján.' },
  ];

  return `
  ${renderPageHero({ label: 'GYIK', path, h1: 'Gyakori kérdések a kártevőirtásról' })}

  <section class="section section--white">
    <div class="container container--narrow">
      ${renderFaq(generalFaq, 'gyik')}
      <div class="callout">
        <div>
          <h2>Nem találta a választ?</h2>
          <p>Hívjon minket, és elmondjuk, mire számíthat az Ön esetében.</p>
        </div>
        <a class="btn btn--call" href="${SITE.phoneHref}" data-track="call" data-location="gyik-final-cta">${icons.phone} ${SITE.phoneDisplay}</a>
      </div>
    </div>
  </section>
  ${renderFaqJsonLd(generalFaq)}
  `;
}

module.exports = { render };
