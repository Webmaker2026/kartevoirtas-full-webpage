'use strict';

/**
 * Központi konfiguráció (MASTER sablon). Minden ügyfélspecifikus adat
 * szögletes zárójeles placeholderként szerepel, pl. [CÉGNÉV] — ezek a teljes
 * projektben kereshetők. A build.js ezekből az értékekből generálja a
 * statikus HTML/XML fájlokat (canonical, og:url, sitemap stb.), így új
 * ügyfélnél elég ezt a fájlt kitölteni és újra lefuttatni a buildet
 * (`npm run build`).
 *
 * A form backend (Cloudflare Worker) beállításai NEM itt vannak, hanem a
 * wrangler.toml [vars] blokkjában és Cloudflare secretként — lásd
 * CLOUDFLARE-FORM-SETUP.md.
 */
const SITE = {
  // --- Domain / URL ---
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
  email: '[EMAIL]',

  // --- Bizalmi adatok ("Miért minket?" blokk) ---
  // Csak valós, igazolható adat kerülhet ide. Üres string esetén az adott
  // sor NEM jelenik meg az oldalon (pl. ha a vállalkozás nem vállal garanciát).
  trust: {
    qualification: '[SZAKKÉPESÍTÉS / HATÓSÁGI ENGEDÉLY]',
    experience: '[TAPASZTALAT — pl. hány éve dolgozik a szakmában]',
    methods: '[ALKALMAZOTT MÓDSZEREK — pl. gélcsalétek, csapdázás, permetezés]',
    invoice: 'Minden elvégzett munkáról számlát állítunk ki.',
    guarantee: '', // pl. '[GARANCIA FELTÉTELEI]' — CSAK ha ténylegesen vállalják
  },

  // --- Közösségi / egyéb ---
  facebookUrl: '',
  instagramUrl: '',

  // --- Mérés (NE találj ki azonosítót – üresen hagyva, előkészítve) ---
  ga4MeasurementId: '',
  gtmContainerId: '',
  googleAdsConversionId: '',
  googleAdsConversionLabelForm: '',
  googleAdsConversionLabelCall: '',

  // --- Ajánlatkérő űrlap ---
  // A Cloudflare Worker endpointja (lásd worker/index.mjs).
  formEndpoint: '/api/ajanlatkeres',
  formSuccessUrl: '/koszonjuk/',

  // --- Egyéb ---
  currentYear: 2026,
};

module.exports = { SITE };
