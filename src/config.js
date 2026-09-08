'use strict';

/**
 * Központi konfiguráció. Minden még ismeretlen üzleti/jogi/technikai adat
 * placeholderként szerepel. A build.js ezekből az értékekből generálja
 * a végleges, statikus HTML/XML fájlokat (canonical, og:url, sitemap stb.),
 * így éles domain megadásakor NEM kell minden fájlt kézzel átírni:
 * elég ezt a fájlt frissíteni és újra lefuttatni a buildet (`node src/build.js`).
 */
const SITE = {
  // --- Domain / URL ---
  // Végleges domain hiányában placeholder. A build ebből állítja elő az
  // abszolút URL-eket (canonical, og:url, sitemap, robots). A generált
  // production HTML-ben és XML-ekben MÁR a tényleges (placeholder) érték
  // szerepel — nincs kliensoldali URL-generálás.
  domain: '[DOMAIN]',
  protocol: 'https',

  // --- Cégadatok (NE találj ki adatot – csak placeholder) ---
  companyName: '[CÉGNÉV]',
  companyFormalName: '[CÉGNÉV] (a teljes, cégjegyzék szerinti névvel)',
  companyRegNumber: '[CÉGJEGYZÉKSZÁM]',
  companyTaxNumber: '[ADÓSZÁM]',
  companyAddress: '[SZÉKHELY CÍME]',
  companySeat: '[SZÉKHELY CÍME]',
  serviceArea: '[SZOLGÁLTATÁSI TERÜLET]',
  openingHours: '[NYITVATARTÁS / ELÉRHETŐSÉG]',
  dispatchTime: '[KISZÁLLÁSI IDŐ]',

  // --- Elérhetőség ---
  phoneDisplay: '[TELEFONSZÁM]',
  phoneHref: 'tel:[TELEFONSZÁM]',
  email: '[E-MAIL CÍM]',
  formRecipientEmail: '[FOGADÓ E-MAIL CÍM]',

  // --- Közösségi / egyéb ---
  facebookUrl: '',
  instagramUrl: '',

  // --- Mérés (NE találj ki azonosítót – üresen hagyva, előkészítve) ---
  ga4MeasurementId: '',
  gtmContainerId: '',
  googleAdsConversionId: '',
  googleAdsConversionLabelForm: '',
  googleAdsConversionLabelCall: '',

  // --- Egyéb ---
  currentYear: 2026,
};

module.exports = { SITE };
