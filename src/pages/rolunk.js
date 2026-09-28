'use strict';
const { SITE } = require('../config');
const { renderMedia } = require('../partials/media');
const { renderPageHero, renderSectionHead, renderTrustFacts, renderCtaBand } = require('../partials/components');

function render({ path }) {
  return `
  ${renderPageHero({
    label: 'Rólunk',
    path,
    h1: 'Rólunk',
    lead: `${SITE.companyName} kártevőirtással foglalkozik ${SITE.serviceArea} területén, magánszemélyeknek, társasházaknak és cégeknek.`,
  })}

  <section class="section section--white">
    <div class="container split">
      <div class="split__main">
        ${renderSectionHead({ eyebrow: 'Bemutatkozás', title: 'Kik vagyunk?' })}
        <div class="prose">
          <p>[BEMUTATKOZÁS — néhány mondat a vállalkozásról: ki vezeti, mióta dolgozik a szakmában, milyen munkákat végez leggyakrabban. Ügyfélre szabandó.]</p>
          <p>Lakásokban, családi házakban, társasházakban, irodákban, üzletekben és vendéglátóhelyeken dolgozunk.</p>
        </div>
      </div>
      <div class="split__side split__side--media">
        <div class="media-frame media-frame--photo">${renderMedia('rolunk-main')}</div>
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container container--narrow">
      ${renderSectionHead({ eyebrow: 'Hogyan dolgozunk?', title: 'Amit a munkánkról tudni érdemes' })}
      <div class="prose">
        <p>Minden munka azzal kezdődik, hogy megtudjuk, milyen kártevőről van szó, és mekkora a baj. Ezt sokszor már a telefonos beszélgetés során látjuk, máskor helyszíni felmérésre van szükség.</p>
        <p>A kezelés előtt elmondjuk, mivel dolgozunk, mit kell előkészíteni, és mire számíthat utána. Ha valamit Önnek kell megcsinálnia ahhoz, hogy a kártevő ne jöjjön vissza — például lezárni egy rést vagy máshogy tárolni az élelmiszert —, azt is megmondjuk.</p>
      </div>
    </div>
  </section>

  <section class="section section--white">
    <div class="container split split--top split--facts">
      <div class="split__main">
        ${renderSectionHead({ eyebrow: 'Tények', title: 'Röviden rólunk' })}
      </div>
      <div class="split__side">
        ${renderTrustFacts()}
      </div>
    </div>
  </section>

  <section class="section section--navy section--cta">
    ${renderCtaBand({ title: 'Beszéljük meg, mit tapasztal', body: 'Hívjon, vagy küldjön ajánlatkérést, és visszahívjuk.', location: 'rolunk-final-cta' })}
  </section>
  `;
}

module.exports = { render };
