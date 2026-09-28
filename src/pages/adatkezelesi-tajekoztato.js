'use strict';
const { SITE } = require('../config');
const { renderPageHero } = require('../partials/components');

function render({ path }) {
  return `
  ${renderPageHero({
    label: 'Adatkezelési tájékoztató',
    path,
    h1: 'Adatkezelési tájékoztató',
    lead: 'Ez a tájékoztató a weboldal üzemeltetése és az ajánlatkérő űrlap használata során megvalósuló adatkezelést mutatja be. A végleges szöveget a tényleges adatkezelési gyakorlat és jogi felülvizsgálat alapján kell véglegesíteni — a placeholderrel jelölt részek élesítés előtt pótlandók.',
  })}

  <section class="section section--white">
    <div class="container legal-content">
      <nav class="toc" aria-label="Tartalomjegyzék">
        <a href="#adatkezelo">1. Adatkezelő</a>
        <a href="#kezelt-adatok">2. Kezelt adatok</a>
        <a href="#celok">3. Cél és jogalap</a>
        <a href="#idotartam">4. Tárolás időtartama</a>
        <a href="#feldolgozok">5. Adatfeldolgozók</a>
        <a href="#jogok">6. Érintetti jogok</a>
        <a href="#panasz">7. Jogorvoslat</a>
      </nav>

      <h2 id="adatkezelo">1. Adatkezelő</h2>
      <p><strong>Adatkezelő neve:</strong> ${SITE.companyName}</p>
      <p><strong>Székhely:</strong> ${SITE.companyAddress}</p>
      <p><strong>Cégjegyzékszám:</strong> ${SITE.companyRegNumber}</p>
      <p><strong>Adószám:</strong> ${SITE.companyTaxNumber}</p>
      <p><strong>E-mail:</strong> ${SITE.email}</p>
      <p><strong>Telefon:</strong> ${SITE.phoneDisplay}</p>

      <h2 id="kezelt-adatok">2. Kezelt adatok köre</h2>
      <p>Az ajánlatkérő űrlap kitöltésekor az alábbi adatokat kezeljük:</p>
      <ul>
        <li>Név</li>
        <li>Telefonszám</li>
        <li>Település / kerület</li>
        <li>E-mail cím (ha megadja)</li>
        <li>A megjelölt szolgáltatás, kártevő típusa</li>
        <li>Az üzenet mezőben megadott szöveg (ha megadja)</li>
        <li>Az oldal címe, ahonnan az ajánlatkérést elküldte, és a beküldés időpontja</li>
      </ul>
      <p>Az űrlapon megadott adatokat a weboldal nem tárolja adatbázisban: a beküldés után e-mailben továbbítjuk az adatkezelő részére.</p>
      <p>A weboldal böngészése során, hozzájárulás esetén, analitikai és hirdetési célú sütik útján további
        adatkezelés valósulhat meg — ennek részletei a <a href="/cookie-tajekoztato/">cookie tájékoztatóban</a>
        találhatók.</p>

      <h2 id="celok">3. Az adatkezelés célja és jogalapja</h2>
      <p>Az adatkezelés célja az ajánlatkérésben foglalt kártevőirtási szolgáltatás iránti érdeklődés kezelése,
        a kapcsolatfelvétel és az árajánlat elkészítése.</p>
      <p><strong>Jogalap:</strong> [JOGALAP MEGADÁSA SZÜKSÉGES — az adatkezelés tényleges körülményeinek (pl. szerződéskötést
        megelőző lépés a GDPR 6. cikk (1) bekezdés b) pontja alapján, vagy önkéntes hozzájárulás a 6. cikk (1)
        bekezdés a) pontja alapján) jogi felülvizsgálat utáni pontos meghatározása szükséges.]</p>

      <h2 id="idotartam">4. Az adatok tárolásának időtartama</h2>
      <p>[MEGŐRZÉSI IDŐTARTAM MEGADÁSA SZÜKSÉGES] — a végleges időtartamot az adatkezelés tényleges céljához és a
        vonatkozó jogszabályi előírásokhoz igazodva kell meghatározni.</p>

      <h2 id="feldolgozok">5. Adatfeldolgozók, címzettek</h2>
      <p>A weboldal üzemeltetéséhez és az űrlap feldolgozásához az alábbi adatfeldolgozókat vesszük igénybe:</p>
      <ul>
        <li>Tárhely, űrlapfeldolgozás és spamvédelem (Cloudflare Workers, Cloudflare Turnstile): [TÁRHELYSZOLGÁLTATÓ NEVE ÉS ELÉRHETŐSÉGE MEGADÁSA SZÜKSÉGES]</li>
        <li>E-mail továbbítás: [E-MAIL KÜLDŐ SZOLGÁLTATÓ NEVE ÉS ELÉRHETŐSÉGE MEGADÁSA SZÜKSÉGES]</li>
      </ul>

      <h2 id="jogok">6. Érintetti jogok</h2>
      <p>A GDPR alapján Önt megilleti a hozzáférés, a helyesbítés, a törlés, az adatkezelés korlátozásának, az
        adathordozhatóságnak és a tiltakozásnak a joga. Jogai gyakorlásához keressen minket a fenti elérhetőségeken.</p>

      <h2 id="panasz">7. Jogorvoslati lehetőségek</h2>
      <p>Amennyiben úgy ítéli meg, hogy adatkezelésünk jogsértő, panasszal fordulhat a Nemzeti Adatvédelmi és
        Információszabadság Hatósághoz (NAIH), vagy bírósághoz fordulhat. A NAIH elérhetőségei: [NAIH ELÉRHETŐSÉG /
        AKTUÁLIS HONLAPCÍM MEGADÁSA SZÜKSÉGES].</p>
    </div>
  </section>
  `;
}

module.exports = { render };
