'use strict';

/**
 * Központi szolgáltatás-lista. Ez táplálja a navigációt, a footert,
 * a főoldali szolgáltatáskártyákat, az /arak/ áttekintőt és a sitemap.xml-t.
 */
const SERVICES = [
  {
    slug: 'agyi-poloska-irtas',
    path: '/agyi-poloska-irtas/',
    label: 'Ágyi poloska irtás',
    icon: 'bug',
    shortDesc: 'Gyors, alapos kezelés éjszakai csípések és rejtőzködő fertőzöttség esetén.',
    inAds: true,
  },
  {
    slug: 'csotanyirtas',
    path: '/csotanyirtas/',
    label: 'Csótányirtás',
    icon: 'bug',
    shortDesc: 'Tartós megoldás lakásban, társasházban és vendéglátóipari egységekben.',
    inAds: true,
  },
  {
    slug: 'darazsirtas',
    path: '/darazsirtas/',
    label: 'Darázsirtás',
    icon: 'drop',
    shortDesc: 'Darázsfészek biztonságos eltávolítása kertben, tetőtérben, homlokzaton.',
    inAds: true,
  },
  {
    slug: 'hangyairtas',
    path: '/hangyairtas/',
    label: 'Hangyairtás',
    icon: 'bug',
    shortDesc: 'Beltéri és kültéri hangyaútvonalak, fészkek szakszerű felszámolása.',
    inAds: true,
  },
  {
    slug: 'patkanyirtas',
    path: '/patkanyirtas/',
    label: 'Patkányirtás',
    icon: 'shield',
    shortDesc: 'Rágcsálómentesítés lakóingatlanban, telephelyen, gazdasági épületben.',
    inAds: true,
  },
  {
    slug: 'egerirtas',
    path: '/egerirtas/',
    label: 'Egérirtás',
    icon: 'shield',
    shortDesc: 'Egérfertőzöttség felszámolása és a visszatérés megelőzése.',
    inAds: true,
  },
  {
    slug: 'bolhairtas',
    path: '/bolhairtas/',
    label: 'Bolhairtás',
    icon: 'bug',
    shortDesc: 'Lakástextilben, kertben megtelepedő bolhák szakszerű irtása.',
    inAds: true,
  },
  {
    slug: 'egyeb-kartevok',
    path: '/egyeb-kartevok/',
    label: 'Egyéb kártevők',
    icon: 'target',
    shortDesc: 'Molylepke, pincebogár, atka és más kártevők egyedi felmérés alapján.',
    inAds: false,
  },
];

module.exports = { SERVICES };
