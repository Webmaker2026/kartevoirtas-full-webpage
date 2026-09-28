'use strict';

/**
 * Központi kép-leltár. Amíg nincs valódi, optimalizált fotóanyag minden
 * kulcshoz, a szolgáltatásoldalak egy márka-konform SVG illusztrációt
 * kapnak (lásd scripts/generate-service-art.js — a fájlok a
 * public/assets/img/services/ mappában élnek), a főoldal és a Rólunk oldal
 * pedig az egyetlen meglévő fotót (kartevoirto-szakember.webp) használja.
 *
 * Ügyfélfotók cseréje: tedd be a fájlt a public/assets/img/services/ alá,
 * majd itt írd át a `src`-t és a valós `width`/`height` értéket (ez utóbbi a
 * layout shift elkerüléséhez kell). A sablonokat nem kell módosítani.
 */
const PHOTO = { src: '/assets/img/services/kartevoirto-szakember.webp', width: 1536, height: 1024 };
const ART = (slug) => ({ src: `/assets/img/services/${slug}.svg`, width: 480, height: 600 });

const MEDIA = {
  homepage: { ...PHOTO, alt: 'Kártevőirtó szakember permetezővel, a háttérben a szolgáltató autója' },
  'rolunk-main': { ...PHOTO, alt: 'Kártevőirtó szakember munkaruhában, permetezővel' },
  commercial: { ...ART('commercial'), alt: 'Illusztráció: kártevőirtó szakember ellenőrzőlistával egy üzleti épület előtt' },

  'agyi-poloska-irtas': { ...ART('agyi-poloska-irtas'), alt: 'Illusztráció: matrac nagyítóval vizsgálva, ágyi poloska keresése' },
  csotanyirtas: { ...ART('csotanyirtas'), alt: 'Illusztráció: csótány a konyhai padlószegély mentén' },
  darazsirtas: { ...ART('darazsirtas'), alt: 'Illusztráció: darázsfészek a tetőeresz alatt' },
  patkanyirtas: { ...ART('patkanyirtas'), alt: 'Illusztráció: rágcsálócsapda-állomás a csővezeték mentén' },
  egerirtas: { ...ART('egerirtas'), alt: 'Illusztráció: egér bejutási pontja a szegélylécnél' },
  hangyairtas: { ...ART('hangyairtas'), alt: 'Illusztráció: hangyaút a fészekig' },
  bolhairtas: { ...ART('bolhairtas'), alt: 'Illusztráció: háziállat mancsnyoma szőnyegen' },
  general: { ...ART('general'), alt: 'Illusztráció: nagyító és célkereszt, a kártevő beazonosítása' },
};

module.exports = { MEDIA };
