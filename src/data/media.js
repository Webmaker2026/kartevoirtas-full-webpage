'use strict';

/**
 * Központi kép-leltár. Amíg nincs valódi, optimalizált fotóanyag, minden
 * kulcs egy egyedi, márka-konform SVG illusztrációra mutat
 * (lásd scripts/generate-service-art.js — a fájlok a
 * public/assets/img/services/ mappában élnek).
 *
 * Éles fotózás megérkezésekor a csere ELÉG ennyi:
 *   1) tedd be a fájlokat pl. public/assets/img/services/<kulcs>.webp
 *      (+ .avif, .jpg fallback) néven,
 *   2) itt írd át az adott bejegyzés `src`-jét (és igény szerint adj hozzá
 *      `sources` tömböt az AVIF/WebP variánsokhoz).
 * A sablonok (media.js partial, landing.js, index.js) NEM változnak.
 */
const MEDIA = {
  homepage: {
    src: '/assets/img/services/homepage.svg',
    alt: 'Szakszerű kártevőirtás — technikus célzott kezelést végez',
  },
  'agyi-poloska-irtas': {
    src: '/assets/img/services/agyi-poloska-irtas.svg',
    alt: 'Ágyi poloska irtás — rejtekhelyek célzott átvizsgálása és kezelése',
  },
  csotanyirtas: {
    src: '/assets/img/services/csotanyirtas.svg',
    alt: 'Csótányirtás — célzott kezelés konyhai és padlómenti rejtekhelyeken',
  },
  darazsirtas: {
    src: '/assets/img/services/darazsirtas.svg',
    alt: 'Darázsirtás — darázsfészek biztonságos eltávolítása tetőtér alatt',
  },
  patkanyirtas: {
    src: '/assets/img/services/patkanyirtas.svg',
    alt: 'Patkányirtás — csapdázás és biztonságos irtószeres kezelés',
  },
  egerirtas: {
    src: '/assets/img/services/egerirtas.svg',
    alt: 'Egérirtás — bejutási pontok felmérése és lezárása',
  },
  hangyairtas: {
    src: '/assets/img/services/hangyairtas.svg',
    alt: 'Hangyairtás — hangyaútvonal és fészek felszámolása',
  },
  bolhairtas: {
    src: '/assets/img/services/bolhairtas.svg',
    alt: 'Bolhairtás — lakástextilben és kertben megtelepedő bolhák kezelése',
  },
  general: {
    src: '/assets/img/services/general.svg',
    alt: 'Egyéb kártevők — egyedi felmérés alapján kínált megoldás',
  },
  commercial: {
    src: '/assets/img/services/commercial.svg',
    alt: 'Kártevőirtás cégeknek — társasházak, éttermek, üzletek, raktárak',
  },
};

module.exports = { MEDIA };
