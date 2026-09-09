'use strict';

/**
 * Központi kép-leltár. Amíg nincs valódi, optimalizált fotóanyag minden
 * kulcshoz, egy részük egy márka-konform SVG illusztrációra mutat (lásd
 * scripts/generate-service-art.js — a fájlok a public/assets/img/services/
 * mappában élnek), a többi interim megoldásként az egyetlen meglévő valódi
 * fotót (kartevoirto-szakember.webp) újrahasznosítja.
 *
 * Éles fotózás megérkezésekor a csere ELÉG ennyi:
 *   1) tedd be a fájlokat pl. public/assets/img/services/<kulcs>.webp
 *      (+ .avif, .jpg fallback) néven,
 *   2) itt írd át az adott bejegyzés `src`-jét (és igény szerint adj hozzá
 *      `sources` tömböt az AVIF/WebP variánsokhoz).
 * A sablonok (media.js partial, landing.js, index.js, rolunk.js) NEM változnak.
 */
const REAL_PHOTO = '/assets/img/services/kartevoirto-szakember.webp';

const MEDIA = {
  homepage: {
    src: REAL_PHOTO,
    alt: 'Szakszerű kártevőirtás — technikus célzott kezelést végez',
  },
  'home-why-us': {
    src: REAL_PHOTO,
    alt: 'Védőfelszerelésben dolgozó technikus',
  },
  commercial: {
    src: '/assets/img/services/commercial.svg',
    alt: 'Technikus felszereléssel egy ingatlan előtt',
  },

  'agyi-poloska-irtas': {
    src: '/assets/img/services/agyi-poloska-irtas.svg',
    alt: 'Ágyi poloska irtás — rejtekhelyek célzott átvizsgálása és kezelése',
  },
  'agyi-poloska-irtas-about': {
    src: '/assets/img/services/agyi-poloska-irtas.svg',
    alt: 'Matrac és ágynemű közeli felvétele',
  },
  csotanyirtas: {
    src: '/assets/img/services/csotanyirtas.svg',
    alt: 'Csótányirtás — célzott kezelés konyhai és padlómenti rejtekhelyeken',
  },
  'csotanyirtas-about': {
    src: '/assets/img/services/csotanyirtas.svg',
    alt: 'Célzott kezelés permetezővel',
  },
  darazsirtas: {
    src: '/assets/img/services/darazsirtas.svg',
    alt: 'Darázsirtás — darázsfészek biztonságos eltávolítása tetőtér alatt',
  },
  'darazsirtas-about': {
    src: '/assets/img/services/darazsirtas.svg',
    alt: 'Darázs egy szerkezeti elemen',
  },
  patkanyirtas: {
    src: '/assets/img/services/patkanyirtas.svg',
    alt: 'Patkányirtás — csapdázás és biztonságos irtószeres kezelés',
  },
  'patkanyirtas-about': {
    src: '/assets/img/services/patkanyirtas.svg',
    alt: 'Védőfelszerelésben dolgozó szakember',
  },
  egerirtas: {
    src: '/assets/img/services/egerirtas.svg',
    alt: 'Egérirtás — bejutási pontok felmérése és lezárása',
  },
  'egerirtas-about': {
    src: '/assets/img/services/egerirtas.svg',
    alt: 'Kezelőfelszerelés részlete',
  },
  hangyairtas: {
    src: '/assets/img/services/hangyairtas.svg',
    alt: 'Hangyairtás — hangyaútvonal és fészek felszámolása',
  },
  'hangyairtas-about': {
    src: '/assets/img/services/hangyairtas.svg',
    alt: 'Kezelőszerelvény közeli részlete',
  },
  bolhairtas: {
    src: '/assets/img/services/bolhairtas.svg',
    alt: 'Bolhairtás — lakástextilben és kertben megtelepedő bolhák kezelése',
  },
  'bolhairtas-about': {
    src: '/assets/img/services/bolhairtas.svg',
    alt: 'Lakástextil közeli felvételen',
  },
  general: {
    src: '/assets/img/services/general.svg',
    alt: 'Egyéb kártevők — egyedi felmérés alapján kínált megoldás',
  },
  'general-about': {
    src: '/assets/img/services/general.svg',
    alt: 'Monitorozó csapda tartalma',
  },

  'rolunk-hero': {
    src: REAL_PHOTO,
    alt: 'Technikus felszereléssel',
  },
  'rolunk-main': {
    src: REAL_PHOTO,
    alt: 'Védőruhás szakember',
  },
  'rolunk-side-1': {
    src: '/assets/img/services/general.svg',
    alt: 'Permetező szerelvény',
  },
  'rolunk-side-2': {
    src: '/assets/img/services/general.svg',
    alt: 'Monitorozó csapda tartalma',
  },
};

module.exports = { MEDIA };
