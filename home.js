// Build the portrait-led homepage hero from the existing content and profile asset.
(() => {
 const hero = document.querySelector('main > .hero');
 if (!hero) return;
 hero.classList.add('hero-profile');
 hero.innerHTML = `<div class="hero-profile__grid">
  <div class="hero-profile__copy">
   <div class="eyebrow">ANURAG YADAV / GURUGRAM, INDIA</div>
   <h1>Designed to feel.<br><span>Built to perform.</span></h1>
   <div class="hero-bottom">
    <div><h2 class="role">Senior Visual Designer <span>·</span> UI/UX Designer</h2><p>I connect brand thinking, thoughtful experiences,<br class="desktop"> and performance-driven creative.</p></div>
    <a class="round-link" href="portfolio/"><span>Explore my work</span><span class="circle" aria-hidden="true">↓</span></a>
   </div>
  </div>
  <a class="profile-card" href="about/" aria-label="More information about Anurag Yadav">
   <div class="profile-card__glow" aria-hidden="true"></div>
   <div class="profile-card__identity"><strong>Anurag Yadav</strong><span>Senior Associate · Graphics</span></div>
   <span class="profile-card__status"><i aria-hidden="true"></i> Open to ideas</span>
   <img src="assets/anurag-outdoors.jpg" alt="Anurag Yadav" width="1024" height="1536" decoding="async">
   <div class="profile-card__glass"><div><span>Creative direction</span><strong>Ideas built with intent.</strong></div><span class="profile-card__action">More info <b aria-hidden="true">↗</b></span></div>
  </a>
 </div>
 <div class="career-grid" aria-label="Career highlights">
 <article class="career-card" tabindex="0"><span class="career-kicker">Experience</span><strong class="career-number">4+</strong><h3>Years in design</h3><p class="career-description">From textile design to digital experiences.</p><div class="career-reveal"><div class="career-reveal-inner"><ul class="career-list"><li>Impulse International</li><li>Radiaant Expovision</li><li>Shah Narayan Das &amp; Co.</li><li>Dressfolk</li><li>Celebrity Fashion / Indian Terrain</li></ul></div></div></article>
 <article class="career-card" tabindex="0"><span class="career-kicker">Collaborations</span><strong class="career-number">15+</strong><h3>Clients &amp; collaborators</h3><p class="career-description">Selected brands I’ve worked with.</p><div class="career-reveal"><div class="career-reveal-inner"><div class="career-brands"><span>Somersault</span><span>FAURA</span><span>Tottimod</span><span>Sky Capital Advisory</span><span>Nuumaaish</span><span>Surma</span><span>Tribes of Jaipur (TOJ)</span><span>PRRATHAA Weddings</span><span>The Bihar’s Pride</span><span>Tisse Travel</span><span>Zavops</span><span>Atulya Facility &amp; Security Services</span><span>Metro Intelligence Security</span><span>Tripplis</span><span>Shubham Singh Influencer</span><span>Prettymuchfinance Influencer</span><span>Unicus Associates</span><span>VM Design Works</span><span>Coppu</span><span>ORGIZA ORGANIC INDIA</span><span>Humans of Hustle</span><span>Misra Sports</span></div></div></div></article>
 <article class="career-card" tabindex="0"><span class="career-kicker">Projects</span><strong class="career-number">20+</strong><h3>Market-ready projects</h3><p class="career-description">Ideas developed into work that’s live.</p><div class="career-reveal"><div class="career-reveal-inner"><ul class="career-list"><li>Brand identity &amp; campaigns</li><li>Website UI &amp; UX</li><li>Website banners</li><li>Performance ad creatives</li><li>AI imagery &amp; workflows</li><li>Marketing videos</li></ul></div></div></article>
 <article class="career-card career-card--roas" tabindex="0"><span class="career-kicker">Performance</span><strong class="career-number">2.5–3.5×</strong><h3>Paid ad ROAS achieved</h3><p class="career-description">Creative strategy informed by ad performance.</p><div class="career-reveal"><div class="career-reveal-inner"><div class="growth-visual"><svg viewBox="0 0 280 140" role="img" aria-label="Illustrative ROAS growth from 0.1 to 3.5 times"><path class="growth-grid" d="M15 20H265M15 65H265M15 110H265"/><path class="growth-line" pathLength="1" d="M15 110C55 108 64 95 95 89S142 80 165 58S221 45 258 17"/><path class="growth-arrow" d="m248 17 12-2-1 12"/><text x="15" y="136">0.1×</text><text x="230" y="136">3.5×</text></svg><span class="career-result-note">Illustrative growth trajectory</span></div><div class="career-results"><div><span>Before</span><strong>0.7–1.0×</strong></div><div class="career-result-current"><span>After</span><strong>2.5–3.5×</strong></div></div><span class="career-result-note">Return on ad spend</span></div></div></article>
 </div>`;
})();

(() => {
 const image = document.querySelector('.scroll-portrait');
 const section = document.querySelector('.home-about');
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
 if (!image || !section) return;
 let scheduled = false;
 const update = () => {
  scheduled = false;
  if (reduced.matches) { image.style.removeProperty('--portrait-y'); return; }
  const rect = section.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > innerHeight) return;
  const progress = (innerHeight / 2 - (rect.top + rect.height / 2)) / (innerHeight + rect.height);
  const range = innerWidth < 701 ? 28 : 70;
  image.style.setProperty('--portrait-y', `${Math.max(-range / 2, Math.min(range / 2, progress * range))}px`);
 };
 const queue = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
 addEventListener('scroll', queue, { passive: true });
 addEventListener('resize', queue, { passive: true });
 reduced.addEventListener('change', queue);
 image.addEventListener('load', queue);
 update();
})();

// Keep the service accordion exclusive, including browsers without details name support.
(() => {
 const sections = [...document.querySelectorAll('.service-list details.service')];
 sections.forEach(section => section.addEventListener('toggle', () => {
  if (section.open) sections.forEach(other => { if (other !== section) other.open = false; });
 }));
})();
