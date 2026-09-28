'use strict';

/**
 * Központi szolgáltatás-lista. Ez táplálja a navigációt, a footert,
 * a főoldali szolgáltatáslistát, az /arak/ áttekintőt, a sitemap.xml-t,
 * az általános ajánlatkérő űrlap választólistáját ÉS a Cloudflare Worker
 * szerveroldali validációját (worker/index.mjs a `slug` alapján fogadja el
 * a beküldött szolgáltatást). Új szolgáltatás felvételekor elég ide írni.
 */
const SERVICES = [
  {
    slug: 'agyi-poloska-irtas',
    path: '/agyi-poloska-irtas/',
    label: 'Ágyi poloska irtás',
    shortDesc: 'Éjszakai csípések, barna foltok a matracon: a hálószoba és a bútorok kezelése.',
    inAds: true,
  },
  {
    slug: 'csotanyirtas',
    path: '/csotanyirtas/',
    label: 'Csótányirtás',
    shortDesc: 'Lakásban, társasházban, irodában és vendéglátóhelyen.',
    inAds: true,
  },
  {
    slug: 'darazsirtas',
    path: '/darazsirtas/',
    label: 'Darázsirtás',
    shortDesc: 'Darázsfészek eltávolítása ereszről, tetőtérből, redőnytokból, kertből.',
    inAds: true,
  },
  {
    slug: 'hangyairtas',
    path: '/hangyairtas/',
    label: 'Hangyairtás',
    shortDesc: 'Konyhában megjelenő hangyák, terasz és járólap alatti bolyok.',
    inAds: true,
  },
  {
    slug: 'patkanyirtas',
    path: '/patkanyirtas/',
    label: 'Patkányirtás',
    shortDesc: 'Családi ház, társasház, telephely és gazdasági épület.',
    inAds: true,
  },
  {
    slug: 'egerirtas',
    path: '/egerirtas/',
    label: 'Egérirtás',
    shortDesc: 'Egerek a kamrában, a falban vagy az álmennyezet fölött.',
    inAds: true,
  },
  {
    slug: 'bolhairtas',
    path: '/bolhairtas/',
    label: 'Bolhairtás',
    shortDesc: 'Szőnyeg, kárpit, padlórések és szükség szerint a kert kezelése.',
    inAds: true,
  },
  {
    slug: 'egyeb-kartevok',
    path: '/egyeb-kartevok/',
    label: 'Egyéb kártevők',
    shortDesc: 'Molylepke, pincebogár, ezüstös pikkelyke és más rovarok.',
    inAds: false,
  },
];

module.exports = { SERVICES };
