// Auto-generated. Main page HTML fragments.
// Rewritten 2026-09 to implement the Mirror Advisors messaging rebuild brief:
//   - homepage: one-system positioning, solutions overview, Mirror Scope steps
//   - solutions (what we sell): AI Custom Solutions, Zoho, AI on Zoho,
//     Odoo + Avalara (coming soon). Restructured 2026-10 per Paul.
//   - services (how we deliver): overview + five service pages
//   - platforms: where we build + "works with" list
//   - how-we-work: dedicated page for the delivery model and Mirror Scope
//   - about: US-led systems integrator, founded Dec 2023
// All copy comes from the approved rebuild brief. Do not rewrite in place;
// any change to visible copy needs an updated brief from Paul.
// Contact form + Turnstile + honeypot preserved verbatim so Zoho integration
// keeps working.

import { FOOTER_HTML } from '../lib/footer';
import { SOLUTION_OPTIONS, SYSTEM_OPTIONS } from '../lib/contact-options';

function _escAttr(v) {
  return String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
// Contact form chip rows. The checkbox values are what the submit handler
// reads, so they must match lib/contact-options.js exactly.
const _SOLUTION_CHIPS = SOLUTION_OPTIONS.map(function (o) {
  return '<label class="cf-chip"><input type="checkbox" data-svc value="' + _escAttr(o.value) + '"><span>' + _escAttr(o.value) + '</span></label>';
}).join('\n              ');
const _SYSTEM_CHIPS = SYSTEM_OPTIONS.map(function (v) {
  return '<label class="cf-chip cf-chip-sm"><input type="checkbox" data-sys value="' + _escAttr(v) + '"><span>' + _escAttr(v) + '</span></label>';
}).join('\n              ');

const _FOOTER_HTML = FOOTER_HTML;

export const pages = {
  'home': `<div class="brf-page ws-page">

  <!-- ── SECTION 1 · HERO ── -->
  <section class="ws-hero">
    <div class="ws-wrap ws-hero-in">
      <h1 class="ws-display">One system your whole business runs on.</h1>
      <p class="ws-hero-lead">Most growing companies end up with six tools that don't talk to each other and the same data entered three times. We consolidate them, with custom AI applications, Zoho, integration and data migration. Every project starts with a Mirror Scope, delivered by our US team, so you know exactly what you're getting before anyone builds.</p>
      <div class="ws-actions">
        <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
        <a class="ws-textlink" href="/how-we-work" onclick="go('how-we-work')">See how we work</a>
      </div>
      <div class="ws-tag">US-led. Global delivery. The same lead from your first call to go-live.</div>
    </div>
    <div class="ws-globe" aria-hidden="true">
      <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMin slice" focusable="false">
        <circle class="ws-g-dome" cx="600" cy="640" r="580"/>
        <g class="ws-g-grid">
          <ellipse cx="600" cy="640" rx="580" ry="170"/>
          <ellipse cx="600" cy="640" rx="580" ry="360"/>
          <ellipse cx="600" cy="640" rx="150" ry="580"/>
          <ellipse cx="600" cy="640" rx="330" ry="580"/>
          <ellipse cx="600" cy="640" rx="470" ry="580"/>
        </g>
        <g class="ws-g-links">
          <path d="M600 214 L262 318"/><path d="M600 214 L396 150"/><path d="M600 214 L482 352"/>
          <path d="M600 214 L718 352"/><path d="M600 214 L804 150"/><path d="M600 214 L938 318"/>
        </g>
        <g class="ws-g-coins">
          <g class="ws-g-c1"><circle class="ws-g-coin" cx="262" cy="318" r="26"/><circle class="ws-g-ring" cx="262" cy="318" r="15"/></g>
          <g class="ws-g-c2"><circle class="ws-g-coin" cx="396" cy="150" r="20"/><circle class="ws-g-ring" cx="396" cy="150" r="11"/></g>
          <g class="ws-g-c3"><circle class="ws-g-coin" cx="482" cy="352" r="17"/><circle class="ws-g-ring" cx="482" cy="352" r="9"/></g>
          <g class="ws-g-c3"><circle class="ws-g-coin" cx="718" cy="352" r="17"/><circle class="ws-g-ring" cx="718" cy="352" r="9"/></g>
          <g class="ws-g-c2"><circle class="ws-g-coin" cx="804" cy="150" r="20"/><circle class="ws-g-ring" cx="804" cy="150" r="11"/></g>
          <g class="ws-g-c1"><circle class="ws-g-coin" cx="938" cy="318" r="26"/><circle class="ws-g-ring" cx="938" cy="318" r="15"/></g>
        </g>
        <circle class="ws-g-halo" cx="600" cy="214" r="78"/>
        <circle class="ws-g-hub" cx="600" cy="214" r="52"/>
        <circle class="ws-g-ring" cx="600" cy="214" r="32"/>
      </svg>
    </div>
  </section>

  <!-- ── SECTION 2 · THE PROBLEM ── -->
  <section class="ws-sec ws-sec-fog">
    <div class="ws-wrap ws-split">
      <div class="ws-split-head ws-sticky">
        <h2 class="ws-h2">If this sounds familiar, it usually is.</h2>
      </div>
      <div class="ws-split-body">
        <ol class="ws-numlist">
          <li>Your CRM doesn't know what your accounting system knows.</li>
          <li>The same customer record lives in three places, and two of them are out of date.</li>
          <li>Someone on your team spends half a day every week moving data between tools by hand.</li>
          <li>You bought software that does eighty percent of what you need, and nobody ever built the other twenty.</li>
          <li>Getting a straight answer about the business means exporting to a spreadsheet first.</li>
        </ol>
        <p class="ws-bodylg">None of this comes from bad decisions. It comes from growth. Companies buy the tool they need at the moment they need it, and nobody is ever responsible for how the whole thing fits together. <strong>That is the job we do.</strong></p>
      </div>
    </div>
  </section>

  <!-- ── SECTION 3 · WHAT WE BUILD ── -->
  <section class="ws-sec">
    <div class="ws-wrap">
      <h2 class="ws-h2 ws-center">What we build for you.</h2>
      <div class="brf-cards ws-cards">
        <a class="brf-card brf-card-featured" href="/solutions/ai-custom-solutions" onclick="go('solutions/ai-custom-solutions')">
          <div class="brf-card-title">AI Custom Solutions</div>
          <p class="brf-card-desc">Fully built applications designed around how your team works, with AI where it saves real time.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
        <a class="brf-card" href="/solutions/zoho" onclick="go('solutions/zoho')">
          <div class="brf-card-title">Zoho Implementation</div>
          <p class="brf-card-desc">Zoho set up properly, from selection and migration through go-live and support.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
        <a class="brf-card" href="/solutions/ai-on-zoho" onclick="go('solutions/ai-on-zoho')">
          <div class="brf-card-title">AI on Zoho</div>
          <p class="brf-card-desc">Applications and AI that sit on top of Zoho, read from it and write back to it.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
      </div>
      <p class="ws-note">Coming soon: <a class="ws-inline-link" href="/solutions/odoo" onclick="go('solutions/odoo')">Odoo implementation</a> and <a class="ws-inline-link" href="/solutions/avalara" onclick="go('solutions/avalara')">Avalara sales tax</a>.</p>
      <p class="ws-note">Every project is delivered through the same five services.</p>
      <ul class="ws-pills ws-center">
        <li><a href="/services/software-implementation" onclick="go('services/software-implementation')">Software Implementation</a></li>
        <li><a href="/services/data-migration" onclick="go('services/data-migration')">Data Migration</a></li>
        <li><a href="/services/systems-integration" onclick="go('services/systems-integration')">Systems Integration</a></li>
        <li><a href="/services/custom-development" onclick="go('services/custom-development')">Custom Development</a></li>
        <li><a href="/services/consulting-support" onclick="go('services/consulting-support')">Consulting &amp; Support</a></li>
      </ul>
    </div>
  </section>

  <!-- ── SECTION 4 · HOW WE WORK ── -->
  <section class="ws-sec ws-sec-dark">
    <div class="ws-wrap">
      <h2 class="ws-h2 ws-h2-xl ws-h2-wide">Every project starts with a Mirror Scope.</h2>
      <div class="ws-cols2">
        <p class="ws-body">Before we build anything, we spend time inside your business. We map how your processes actually run today, document what the new system has to do, and produce an implementation plan with timelines and costs attached. That document is the Mirror Scope, and it is yours.</p>
        <p class="ws-body">It is a paid phase, and that is deliberate. Discovery done for free is discovery done quickly, and quick discovery is where implementations go wrong. By the time you approve a build with us, there are no surprises left to find.</p>
      </div>
      <ol class="ws-steps">
        <li class="ws-step">
          <div class="ws-step-num">01</div>
          <div class="ws-step-name">Mirror Scope</div>
          <div class="ws-step-desc">We map your processes, define the requirements, and write the implementation plan.</div>
        </li>
        <li class="ws-step">
          <div class="ws-step-num">02</div>
          <div class="ws-step-name">Approval</div>
          <div class="ws-step-desc">We walk you through the scope. You decide whether to build, and with whom.</div>
        </li>
        <li class="ws-step">
          <div class="ws-step-num">03</div>
          <div class="ws-step-name">Build</div>
          <div class="ws-step-desc">Development runs in stages, with a project meeting every week so you always know where things stand.</div>
        </li>
        <li class="ws-step">
          <div class="ws-step-num">04</div>
          <div class="ws-step-name">Training</div>
          <div class="ws-step-desc">We train your team on what we built, not on generic software documentation.</div>
        </li>
        <li class="ws-step">
          <div class="ws-step-num">05</div>
          <div class="ws-step-name">Live and supported</div>
          <div class="ws-step-desc">You go live, and we stay reachable.</div>
        </li>
      </ol>
      <div class="ws-actions">
        <a class="ws-pill-outline" href="/how-we-work" onclick="go('how-we-work')">More on how we work</a>
      </div>
    </div>
  </section>

  <!-- ── SECTION 5 · WHY COMPANIES CHOOSE US ── -->
  <section class="ws-sec">
    <div class="ws-wrap">
      <h2 class="ws-h2 ws-center">Why companies choose us.</h2>
      <div class="ws-features">
        <div class="ws-feature">
          <div class="ws-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
          <div class="ws-feature-title">US-led from the first call.</div>
          <p class="ws-feature-body">Your sales conversation, your consulting and your Mirror Scope are handled by our US team. Paul Trinidad, our founder, stays on your project from the first call through go-live. Development and day-to-day project management run across our teams in the Philippines and India, so you get senior US ownership without paying for a fully US build team.</p>
        </div>
        <div class="ws-feature">
          <div class="ws-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg></div>
          <div class="ws-feature-title">We scope before we build.</div>
          <p class="ws-feature-body">Most firms will quote you a price on a thirty minute call. We won't, because nobody can price a system they haven't seen.</p>
        </div>
        <div class="ws-feature">
          <div class="ws-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z"/></svg></div>
          <div class="ws-feature-title">We answer.</div>
          <p class="ws-feature-body">Our clients tell us the reason they stayed was that we picked up, replied quickly, and answered every question they had. That is not a feature. It is just how we work.</p>
        </div>
        <div class="ws-feature">
          <div class="ws-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></div>
          <div class="ws-feature-title">You can see the work.</div>
          <p class="ws-feature-body">Every client gets a portal where they can track progress, see what's in flight, and know what's coming next.</p>
        </div>
        <div class="ws-feature">
          <div class="ws-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16"/></svg></div>
          <div class="ws-feature-title">We build software, not just configure it.</div>
          <p class="ws-feature-body">We run our own platform, Mirror, which we designed and built ourselves to run this company. When a client needs something that doesn't exist off the shelf, we're not guessing at whether it can be done.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── SECTION 6 · PROOF ── -->
  <section class="ws-sec">
    <div class="ws-wrap">
      <h2 class="ws-h2 ws-center">What this looks like in practice.</h2>
      <a class="brf-case" href="/case-studies/plastics-products-mfg" onclick="go('case-studies/plastics-products-mfg')">
        <div class="brf-case-text">
          <div class="brf-eyebrow">Case study · Plastics Products Mfg</div>
          <div class="brf-case-title">Quote to label in one screen, on top of Zoho Inventory.</div>
          <p class="brf-case-desc">A custom shipping app that packs orders into stock boxes, compares every FedEx rate, prints labels to the warehouse Zebra and writes everything back to Zoho. Live in 13 days; 87% of PPM's shipments now run through it.</p>
          <div class="brf-card-learn">Read the case study →</div>
        </div>
        <img class="brf-case-img" src="/images/case-studies/ppm/order-boxes.jpg" alt="The PPM shipping app with a Zoho sales order auto-packed into a stock box" loading="lazy" width="1600" height="1000" />
      </a>
    </div>
  </section>

  <!-- ── SECTION 7 · CLOSING CTA ── -->
  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'how-we-work': `<div class="brf-page ws-page">

  <!-- HERO -->
  <section class="ws-hero ws-hero-plain">
    <div class="ws-wrap ws-hero-in">
      <h1 class="ws-display">No surprises. That's the whole idea.</h1>
      <p class="ws-hero-lead">Software projects fail in predictable ways. The requirements were never written down properly. The price was quoted before anyone understood the work. The team that sold it disappeared after the contract was signed. Everything about how we run projects is built to prevent those three things.</p>
    </div>
    <div class="ws-pillband" aria-hidden="true">
      <span class="ws-pb ws-pb-1"></span><span class="ws-pb ws-pb-2"></span><span class="ws-pb ws-pb-3"></span><span class="ws-pb ws-pb-4"></span><span class="ws-pb ws-pb-5"></span>
    </div>
  </section>

  <!-- MIRROR SCOPE -->
  <section class="ws-sec">
    <div class="ws-wrap ws-split ws-split-top">
      <div class="ws-split-head ws-sticky">
        <h2 class="ws-h2 ws-h2-xl">The Mirror Scope</h2>
        <p class="ws-bodylg">Every engagement begins here. The Mirror Scope is a paid discovery phase where we sit inside your business and work out what the system actually has to do.</p>
      </div>
      <div class="ws-split-body">
        <p class="ws-label">It covers four things:</p>
        <ul class="ws-tiles">
          <li class="ws-tile"><strong>Business requirements.</strong> What the system needs to do, in writing, agreed by you.</li>
          <li class="ws-tile"><strong>Process capture.</strong> How your operation runs today, documented step by step, including the parts that only live in someone's head.</li>
          <li class="ws-tile"><strong>Best practice recommendations.</strong> Where your current process should change, and where the software should bend to fit you instead.</li>
          <li class="ws-tile"><strong>The implementation plan.</strong> Phases, sequence, timeline and cost.</li>
        </ul>
        <p class="ws-body">At the end, you have a document you can act on. If you build with us, it becomes the project plan. If you decide to build with someone else, you take it with you.</p>
        <div class="ws-callout">
          <p class="ws-body">We charge for it because free discovery is shallow discovery. A scope that costs us nothing to produce is a scope that gets rushed, and rushed scopes are the single most reliable predictor of a failed implementation.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW A PROJECT RUNS -->
  <section class="ws-sec ws-sec-dark">
    <div class="ws-wrap">
      <h2 class="ws-h2 ws-h2-xl">How a project runs</h2>
      <ol class="ws-rows">
        <li class="ws-row">
          <div class="ws-row-title">Scope.</div>
          <p class="ws-row-body">We map, document and plan.</p>
        </li>
        <li class="ws-row">
          <div class="ws-row-title">Presentation and approval.</div>
          <p class="ws-row-body">We walk you through what we found and what we recommend. You approve it before anything gets built.</p>
        </li>
        <li class="ws-row">
          <div class="ws-row-title">Build.</div>
          <p class="ws-row-body">Development happens in stages. You get a project meeting every week, and a client portal where you can see progress between meetings.</p>
        </li>
        <li class="ws-row">
          <div class="ws-row-title">Training.</div>
          <p class="ws-row-body">We train your team on the system we built for you, using your data and your processes.</p>
        </li>
        <li class="ws-row">
          <div class="ws-row-title">Go-live and support.</div>
          <p class="ws-row-body">You go live with us alongside you, and we stay available afterward.</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- WHO DOES THE WORK -->
  <section class="ws-sec">
    <div class="ws-wrap ws-split ws-split-top">
      <div class="ws-split-head">
        <h2 class="ws-h2">Who does the work</h2>
      </div>
      <div class="ws-split-body">
        <p class="ws-statement">We're a US-led firm with a global delivery team.</p>
        <div class="ws-duo">
          <div class="ws-duo-card">
            <p class="ws-body">Sales, consulting and the Mirror Scope are handled entirely by our US team. Paul Trinidad, our founder, is involved in every project from the first call through go-live. He was at Zoho before founding Mirror Advisors, and he is the person accountable for your project.</p>
          </div>
          <div class="ws-duo-card">
            <p class="ws-body">Project management and development run across our teams in the Philippines and India. This is how we deliver senior US-led consulting at a price that makes sense for a company your size. It is also why our response times are what they are, since there is someone on your project across most of the working day.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- WHO WE WORK WITH -->
  <section class="ws-sec ws-sec-mist">
    <div class="ws-wrap">
      <div class="ws-split ws-split-top">
        <div class="ws-split-head">
          <h2 class="ws-h2">Who we work with</h2>
        </div>
        <div class="ws-split-body">
          <p class="ws-bodylg">We do our best work with companies that have outgrown their current setup and have leadership ready to commit to fixing it.</p>
          <p class="ws-label">In practice that means:</p>
        </div>
      </div>
      <ul class="ws-checkcards">
        <li>An established team rather than a founder and a laptop</li>
        <li>Executive involvement, because system decisions are business decisions</li>
        <li>A real budget for the work, since the projects we take on run for months rather than days</li>
      </ul>
      <p class="ws-body ws-center ws-after">If that isn't you yet, tell us anyway. We'd rather point you somewhere useful than sell you something that won't work.</p>
    </div>
  </section>

  <!-- CLOSING CTA -->
  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'about': `<div class="brf-page">

  <!-- HERO -->
  <section class="brf-hero brf-hero-navy">
    <div class="brf-container">
      <h1 class="brf-h1">We started this firm to do implementations properly.</h1>
      <p class="brf-lead">Our founder, Paul Trinidad, spent three years at Zoho watching companies buy good software and then struggle to make it work. The product was rarely the problem. What they needed was someone to understand their operation first and configure the system second, and almost nobody was doing it in that order.</p>
    </div>
  </section>

  <!-- BODY -->
  <section class="brf-section">
    <div class="brf-container-narrow">
      <p class="brf-body">He went to work for a Zoho partner after that and saw the same thing from the other side. Clients handed off after signature. Scopes written in an afternoon. Projects sold on a price rather than an understanding.</p>
      <p class="brf-body">Mirror Advisors was founded in December 2023 to do it differently.</p>
    </div>
  </section>

  <!-- WHERE THE NAME COMES FROM -->
  <section class="brf-section brf-section-cream">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Where the name comes from</h2>
      <p class="brf-body">A mirror is for looking closely at something you thought you already knew. That is what the first phase of every project is: a clear look at how your business actually runs, including the parts that have never been written down. Everything we build comes out of what that look turns up.</p>
    </div>
  </section>

  <!-- HOW WE'RE BUILT -->
  <section class="brf-section">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">How we're built</h2>
      <p class="brf-body">We're a US-led systems integrator based in The Woodlands, Texas, working with clients across the United States.</p>
      <p class="brf-body">Sales, consulting and scoping are handled by our US team. Project management and development run across our teams in the Philippines and India. Paul is on every project from the first call through go-live.</p>
      <p class="brf-body">We also build our own software. Mirror is the platform we designed and built to run this company, and it is the reason that when a client asks whether something can be built, they get an answer rather than a maybe.</p>
    </div>
  </section>

  <!-- CREDENTIALS -->
  <section class="brf-section brf-section-cream">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Credentials</h2>
      <p class="brf-body">Zoho Authorized Partner. In our first year as a partner we reached Premium tier, the first partner to do so that fast. Our team holds certifications across Zoho Creator, Zoho Workplace and Zoho CRM.</p>
    </div>
  </section>

  <!-- TEAM PLACEHOLDER · do not fill; see rebuild brief §8 -->
  <!--
  <section class="brf-section">
    <div class="brf-container">
      Team section reserved for photographs from Paul.
      Do NOT populate with stock photography or generated avatars.
    </div>
  </section>
  -->

  <!-- CLOSING CTA -->
  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'systems-integration': `<div class="brf-page ws-page">

  <section class="ws-hero ws-hero-split">
    <div class="ws-wrap ws-hero-grid">
      <div class="ws-hero-copy">
        <a class="brf-back-link" href="/services" onclick="go('services')">← All services</a>
        <h1 class="ws-display ws-display-md">Your software should talk to itself.</h1>
        <p class="ws-hero-lead">Most businesses don't have a software problem. They have a connection problem. The CRM is fine. The accounting system is fine. The issue is that they have never been introduced, so your team does the introducing by hand, every day, forever.</p>
      </div>
      <div class="ws-hero-art" aria-hidden="true">
        <svg viewBox="0 0 480 480" focusable="false">
          <circle class="ws-a-disc" cx="240" cy="240" r="232"/>
          <g class="ws-a-lines">
            <path d="M240 240 L120 120"/><path d="M240 240 L360 120"/><path d="M240 240 L120 360"/><path d="M240 240 L360 360"/>
            <path d="M120 120 L360 120"/><path d="M120 360 L360 360"/><path d="M120 120 L120 360"/><path d="M360 120 L360 360"/>
          </g>
          <g class="ws-a-nodes">
            <rect class="ws-a-node" x="72" y="96" width="96" height="48" rx="24"/>
            <rect class="ws-a-node" x="312" y="96" width="96" height="48" rx="24"/>
            <rect class="ws-a-node" x="72" y="336" width="96" height="48" rx="24"/>
            <rect class="ws-a-node" x="312" y="336" width="96" height="48" rx="24"/>
          </g>
          <circle class="ws-a-hub" cx="240" cy="240" r="44"/>
          <circle class="ws-a-hubring" cx="240" cy="240" r="24"/>
          <g class="ws-a-pulses">
            <circle class="ws-a-pulse" r="7"><animateMotion dur="3.2s" repeatCount="indefinite" path="M120 120 L240 240 L360 360"/></circle>
            <circle class="ws-a-pulse" r="7"><animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" path="M360 120 L240 240 L120 360"/></circle>
            <circle class="ws-a-pulse" r="6"><animateMotion dur="4.4s" begin="0.8s" repeatCount="indefinite" path="M120 120 L360 120 L360 360 L120 360 Z"/></circle>
          </g>
        </svg>
      </div>
    </div>
  </section>

  <section class="ws-sec ws-sec-tight ws-sec-mist">
    <div class="ws-wrap">
      <p class="ws-statement ws-statement-wide">Systems integration ends that. We connect the tools you already own so information moves between them automatically, in the right direction, without anyone copying and pasting.</p>
    </div>
  </section>

  <section class="ws-sec">
    <div class="ws-wrap">
      <h2 class="ws-h2">What this looks like in practice</h2>
      <ul class="ws-flowcards">
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span><span>Sales activity flows into accounting without re-entry</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/></svg></span><span>A record created in one system appears everywhere it's needed</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg></span><span>Reporting pulls from one source instead of four exports</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4M21 17H3"/></svg></span><span>The manual handoffs between departments stop being manual</span></li>
      </ul>
    </div>
  </section>

  <section class="ws-sec ws-sec-dark">
    <div class="ws-wrap ws-split ws-split-top">
      <div class="ws-split-head">
        <h2 class="ws-h2 ws-h2-xl">How we approach it</h2>
      </div>
      <div class="ws-split-body">
        <p class="ws-bodylg">We start by mapping where your data actually lives and how it moves today, including the spreadsheet workarounds nobody wants to admit to. Then we design the connections, build them, and test them against your real data before anything goes live.</p>
        <p class="ws-body">Sometimes the answer is a straightforward connection between two platforms. Sometimes it means building a custom integration because no off-the-shelf connector does what you need. <strong>We do both.</strong></p>
      </div>
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'data-migration': `<div class="brf-page">

  <section class="brf-hero brf-hero-navy">
    <div class="brf-container">
      <a class="brf-back-link" href="/services" onclick="go('services')">← All services</a>
      <h1 class="brf-h1">Bring your history with you.</h1>
      <p class="brf-lead">The fastest way to lose faith in a new system is to open it on day one and find that half your records came across wrong. Migration is the least visible part of an implementation and the part most likely to sink it.</p>
    </div>
  </section>

  <section class="brf-section">
    <div class="brf-service-body">
      <p class="brf-body">We move your data carefully: mapped, cleaned where it needs cleaning, validated before go-live, and reconciled after.</p>

      <h2 class="brf-h2">What we handle</h2>
      <ul class="brf-list">
        <li>Migration from legacy ERP and CRM platforms</li>
        <li>Consolidating records from multiple systems into one</li>
        <li>Mapping fields and data structures that were never designed to match</li>
        <li>Validation and reconciliation, so you can prove the numbers tie out</li>
        <li>Historical records, not just active ones</li>
      </ul>

      <h2 class="brf-h2">Where this comes up</h2>
      <p class="brf-body">Usually alongside an ERP implementation or a platform change, but not always. Some companies come to us because a previous migration went badly and they've been living with the consequences.</p>
      <p class="brf-body">We'll tell you honestly what can come across, what shouldn't, and what will take real work. That assessment happens during the Mirror Scope, before you've committed to anything.</p>
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'custom-development': `<div class="brf-page">

  <section class="brf-hero brf-hero-navy">
    <div class="brf-container">
      <a class="brf-back-link" href="/services" onclick="go('services')">← All services</a>
      <h1 class="brf-h1">When the software doesn't do it, we build it.</h1>
      <p class="brf-lead">Every business has a process that no vendor has ever built for. A workflow specific to your industry. An approval chain that doesn't match anyone's template. A report your team needs that the platform simply doesn't produce.</p>
    </div>
  </section>

  <section class="brf-section">
    <div class="brf-service-body">
      <p class="brf-body">Most consultants will tell you to change your process to fit the software. Sometimes that's the right answer, and we'll tell you when it is. When it isn't, we build.</p>

      <h2 class="brf-h2">What we build</h2>
      <ul class="brf-list">
        <li>Custom modules and objects inside your platform</li>
        <li>Client and vendor portals</li>
        <li>Custom API integrations where no connector exists</li>
        <li>Workflow and approval logic built to your rules</li>
        <li>Reporting and dashboards built from scratch</li>
        <li>Standalone applications where a platform isn't the right home</li>
      </ul>

      <h2 class="brf-h2">Why this is unusual</h2>
      <p class="brf-body">Plenty of firms implement software. Fewer of them write it. We do both, and we built our own operating platform to prove it, so when you ask whether something is possible you get an answer rather than a maybe.</p>
      <p class="brf-body">Custom work is defined during the Mirror Scope and priced before it starts, the same as everything else we do.</p>
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'services': `<div class="brf-page">

  <!-- HERO -->
  <section class="brf-hero brf-hero-navy">
    <div class="brf-container">
      <h1 class="brf-h1">How we deliver.</h1>
      <p class="brf-lead">Every solution we sell is delivered through the same five services. Most projects use several of them at once, which is why we do all five under one roof rather than handing you between vendors.</p>
    </div>
  </section>

  <!-- FIVE SERVICE CARDS -->
  <section class="brf-section">
    <div class="brf-container">
      <div class="brf-cards brf-cards-lg">
        <a class="brf-card" href="/services/software-implementation" onclick="go('services/software-implementation')">
          <div class="brf-card-title">Software Implementation</div>
          <p class="brf-card-desc">Deploy the system your operation runs on, from planning through go-live.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
        <a class="brf-card" href="/services/data-migration" onclick="go('services/data-migration')">
          <div class="brf-card-title">Data Migration</div>
          <p class="brf-card-desc">Move your history into the new system cleanly, with nothing lost and nothing duplicated.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
        <a class="brf-card" href="/services/systems-integration" onclick="go('services/systems-integration')">
          <div class="brf-card-title">Systems Integration</div>
          <p class="brf-card-desc">Connect the software you already own so your data moves on its own.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
        <a class="brf-card" href="/services/custom-development" onclick="go('services/custom-development')">
          <div class="brf-card-title">Custom Development</div>
          <p class="brf-card-desc">Build the parts your business needs that no vendor sells off the shelf.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
        <a class="brf-card" href="/services/consulting-support" onclick="go('services/consulting-support')">
          <div class="brf-card-title">Consulting &amp; Support</div>
          <p class="brf-card-desc">Senior advice before you buy, and a team that stays reachable after you go live.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
      </div>
    </div>
  </section>

  <!-- LOOKING FOR A PLATFORM -->
  <section class="brf-section brf-section-cream">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Looking for a specific platform?</h2>
      <p class="brf-body">If you already know you want a custom AI application, a Zoho implementation or AI built on top of Zoho, start with our solutions. Each one lists the services it includes.</p>
      <div class="brf-btn-row">
        <a class="brf-cta-secondary" href="/solutions" onclick="go('solutions')">See our solutions</a>
        <a class="brf-cta-secondary" href="/how-we-work" onclick="go('how-we-work')">How we work</a>
      </div>
    </div>
  </section>

  <!-- CLOSING CTA -->
  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'software-implementation': `<div class="brf-page">

  <section class="brf-hero brf-hero-navy">
    <div class="brf-container">
      <a class="brf-back-link" href="/services" onclick="go('services')">← All services</a>
      <h1 class="brf-h1">The system your operation runs on.</h1>
      <p class="brf-lead">Implementing an ERP, a CRM or any core business system touches every part of a business, which is why it's the project companies most often get wrong. It's rarely a technology failure. It's a failure to understand the operation before configuring the software.</p>
    </div>
  </section>

  <section class="brf-section">
    <div class="brf-service-body">
      <p class="brf-body">We do it in the other order.</p>

      <h2 class="brf-h2">What we do</h2>
      <ul class="brf-list">
        <li>Platform selection, if you haven't chosen yet</li>
        <li>Process mapping across finance, sales, operations and inventory</li>
        <li>Configuration built around how your business actually runs</li>
        <li>Data migration from your existing systems</li>
        <li>Integration with the tools you're keeping</li>
        <li>Training for your team, on your data</li>
        <li>Go-live support and beyond</li>
      </ul>

      <h2 class="brf-h2">How it goes</h2>
      <p class="brf-body">Every implementation starts with a Mirror Scope, because this is the type of work where a surprise in month four is expensive. The scope tells you what the implementation involves, how long it takes, and what it costs, before you commit to the build.</p>
      <p class="brf-body">From there we work in phases with a weekly project meeting, so the project never disappears into a black box between kickoff and launch.</p>

      <h2 class="brf-h2">Platforms we implement</h2>
      <p class="brf-body">Zoho is our home ground, and Odoo and Avalara are coming soon. See <a class="brf-inline-link" href="/platforms" onclick="go('platforms')">the platforms we work with</a>.</p>
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'consulting-support': `<div class="brf-page">

  <section class="brf-hero brf-hero-navy">
    <div class="brf-container">
      <a class="brf-back-link" href="/services" onclick="go('services')">← All services</a>
      <h1 class="brf-h1">Someone who picks up after go-live.</h1>
      <p class="brf-lead">Systems keep changing after launch. People leave, processes shift, and a vendor update breaks a workflow nobody remembers building. Consulting &amp; Support keeps a senior team on hand for the questions, fixes and improvements that come up once the project is over.</p>
    </div>
  </section>

  <section class="brf-section">
    <div class="brf-service-body">
      <h2 class="brf-h2">What we help with</h2>
      <ul class="brf-list">
        <li>Advice before you buy: which platform, which edition, and whether you need new software at all</li>
        <li>Reviews of an existing setup, with a plain list of what to fix first</li>
        <li>Fixes and troubleshooting when something stops working</li>
        <li>Small enhancements: a new field, a report, an automation, a change to a workflow</li>
        <li>Admin training for the people who look after the system day to day</li>
        <li>Taking over implementations someone else left behind</li>
      </ul>

      <h2 class="brf-h2">Why it works</h2>
      <p class="brf-body">You talk to people who know your system, not a ticket queue. Our teams cover most of the working day, so questions get answered quickly. Our clients tell us that responsiveness is the reason they stay.</p>
      <p class="brf-body">Larger changes go through a short scope first, the same as everything else we do, so you know the cost before the work starts.</p>
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'solutions': `<div class="brf-page ws-page">

  <section class="ws-hero ws-hero-plain">
    <div class="ws-wrap ws-hero-in">
      <h1 class="ws-display">What we build for you.</h1>
      <p class="ws-hero-lead">We sell a small number of things and do them well: custom AI applications built around your business, Zoho implementations, and AI that runs on top of Zoho. Odoo and Avalara are coming soon.</p>
      <div class="ws-actions">
        <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
        <a class="ws-textlink" href="/case-studies/plastics-products-mfg" onclick="go('case-studies/plastics-products-mfg')">Read a case study</a>
      </div>
    </div>
  </section>

  <section class="ws-sec ws-sec-tight">
    <div class="ws-wrap">
      <div class="brf-cards ws-cards">
        <a class="brf-card brf-card-featured" href="/solutions/ai-custom-solutions" onclick="go('solutions/ai-custom-solutions')">
          <div class="brf-card-title">AI Custom Solutions</div>
          <p class="brf-card-desc">Fully built applications designed around how your team works, with AI where it saves real time.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
        <a class="brf-card" href="/solutions/zoho" onclick="go('solutions/zoho')">
          <div class="brf-card-title">Zoho Implementation</div>
          <p class="brf-card-desc">Zoho set up properly, from selection and migration through go-live and support.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
        <a class="brf-card" href="/solutions/ai-on-zoho" onclick="go('solutions/ai-on-zoho')">
          <div class="brf-card-title">AI on Zoho</div>
          <p class="brf-card-desc">Applications and AI that sit on top of Zoho, read from it and write back to it.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
      </div>
      <div class="brf-cards brf-cards-2 ws-cards-sub">
        <a class="brf-card brf-card-soon" href="/solutions/odoo" onclick="go('solutions/odoo')">
          <div class="brf-card-title">Odoo Implementation</div>
          <p class="brf-card-desc">The same scope-first approach, on Odoo.</p>
          <div class="brf-card-learn">Find out more →</div>
        </a>
        <a class="brf-card brf-card-soon" href="/solutions/avalara" onclick="go('solutions/avalara')">
          <div class="brf-card-title">Avalara Sales Tax</div>
          <p class="brf-card-desc">Sales tax calculated automatically inside the systems you sell through.</p>
          <div class="brf-card-learn">Find out more →</div>
        </a>
      </div>
    </div>
  </section>

  <section class="ws-sec ws-sec-dark">
    <div class="ws-wrap ws-split ws-split-top">
      <div class="ws-split-head">
        <h2 class="ws-h2 ws-h2-xl">One team, five services.</h2>
      </div>
      <div class="ws-split-body">
        <p class="ws-bodylg">Every solution is delivered through the same five services. A Zoho project might use all five. A custom application might use three. Either way, it's one team from the first call to go-live.</p>
      <ul class="ws-pills">
        <li><a href="/services/software-implementation" onclick="go('services/software-implementation')">Software Implementation</a></li>
        <li><a href="/services/data-migration" onclick="go('services/data-migration')">Data Migration</a></li>
        <li><a href="/services/systems-integration" onclick="go('services/systems-integration')">Systems Integration</a></li>
        <li><a href="/services/custom-development" onclick="go('services/custom-development')">Custom Development</a></li>
        <li><a href="/services/consulting-support" onclick="go('services/consulting-support')">Consulting &amp; Support</a></li>
      </ul>
      </div>
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'ai-custom-solutions': `<div class="brf-page ws-page">

  <section class="ws-hero ws-hero-split">
    <div class="ws-wrap ws-hero-grid">
      <div class="ws-hero-copy">
        <a class="brf-back-link" href="/solutions" onclick="go('solutions')">← All solutions</a>
        <div class="brf-eyebrow">Featured solution</div>
        <h1 class="ws-display ws-display-md">Software built around your business.</h1>
        <p class="ws-hero-lead">Off-the-shelf software gets most companies eighty percent of the way. The other twenty percent is where your team loses hours every week. We build complete applications for that work, designed around how your operation actually runs, with AI where it genuinely saves time.</p>
        <div class="ws-actions" style="justify-content:flex-start">
          <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
          <a class="ws-textlink" href="/case-studies/plastics-products-mfg" onclick="go('case-studies/plastics-products-mfg')">See a real example</a>
        </div>
      </div>
      <div class="ws-hero-art" aria-hidden="true">
        <svg viewBox="0 0 480 480" focusable="false">
          <circle class="ws-a-disc" cx="240" cy="240" r="232"/>
          <circle class="ws-a-ring" cx="240" cy="240" r="186"/>
          <rect class="ws-a-win" x="96" y="132" width="288" height="216" rx="22"/>
          <circle class="ws-a-bar-gold" cx="124" cy="160" r="7"/>
          <rect class="ws-a-bar" x="142" y="154" width="70" height="12" rx="6"/>
          <rect class="ws-a-bar" x="124" y="196" width="120" height="16" rx="8"/>
          <rect class="ws-a-bar" x="124" y="226" width="96" height="16" rx="8"/>
          <rect class="ws-a-bar" x="124" y="256" width="132" height="16" rx="8"/>
          <rect class="ws-a-bar-gold" x="124" y="300" width="96" height="24" rx="12"/>
          <rect class="ws-a-bar" x="272" y="196" width="84" height="112" rx="14"/>
          <g class="ws-g-c1"><circle class="ws-a-spark" cx="372" cy="128" r="30"/><path d="M372 110 l5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 13 -5z" fill="#0d1233"/></g>
        </svg>
      </div>
    </div>
  </section>

  <section class="ws-sec ws-sec-tight ws-sec-mist">
    <div class="ws-wrap">
      <p class="ws-statement ws-statement-wide">Built with Claude, Anthropic's AI, so a fully custom application now ships in weeks, at a price that used to buy a spreadsheet macro.</p>
    </div>
  </section>

  <section class="ws-sec">
    <div class="ws-wrap">
      <h2 class="ws-h2">What we build</h2>
      <ul class="ws-flowcards">
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></svg></span><span>Operational apps on top of the systems you already run: quoting, shipping, scheduling, inventory</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/></svg></span><span>Client and vendor portals</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M10 3v18"/></svg></span><span>Internal tools that replace the spreadsheets your team works around</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg></span><span>AI that reads documents, invoices and forms so nobody types them in</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></span><span>AI that turns calls and meetings into records inside your system</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4M21 17H3"/></svg></span><span>Classification, routing and drafting for the repetitive work your team does constantly</span></li>
      </ul>
    </div>
  </section>

  <section class="ws-sec ws-sec-dark">
    <div class="ws-wrap ws-split ws-split-top">
      <div class="ws-split-head">
        <h2 class="ws-h2 ws-h2-xl">Clean data first, then AI</h2>
      </div>
      <div class="ws-split-body">
        <p class="ws-bodylg">AI applied to disconnected, messy data produces confident nonsense. So every application we build connects properly to your systems of record first, and the AI works on clean data with a specific job to do.</p>
        <p class="ws-body">We use Claude both to write the software faster and, where it helps, inside the software itself. If AI isn't the right answer for what you're describing, <strong>we'll say so.</strong></p>
      </div>
    </div>
  </section>

  <section class="ws-sec">
    <div class="ws-wrap">
      <a class="brf-case" href="/case-studies/plastics-products-mfg" onclick="go('case-studies/plastics-products-mfg')">
        <div class="brf-case-text">
          <div class="brf-eyebrow">Case study · Plastics Products Mfg</div>
          <div class="brf-case-title">Quote to label in one screen, on top of Zoho Inventory.</div>
          <p class="brf-case-desc">A custom shipping app that packs orders into stock boxes, compares every FedEx rate, prints labels to the warehouse Zebra and writes everything back to Zoho. Live in 13 days; 87% of PPM's shipments now run through it.</p>
          <div class="brf-card-learn">Read the case study →</div>
        </div>
        <img class="brf-case-img" src="/images/case-studies/ppm/order-boxes.jpg" alt="The PPM shipping app with a Zoho sales order auto-packed into a stock box" loading="lazy" width="1600" height="1000" />
      </a>
    </div>
  </section>

  <section class="ws-sec ws-sec-fog">
    <div class="ws-wrap ws-split">
      <div class="ws-split-head ws-sticky">
        <h2 class="ws-h2">We run on our own software.</h2>
      </div>
      <div class="ws-split-body">
        <p class="ws-bodylg">Mirror is the platform we designed and built to run this company: CRM, time tracking, resource allocation, client portals and billing in one place.</p>
        <p class="ws-body">It includes Mirror Intelligence, which turns our meeting recordings into summaries, action items and updated records automatically. We didn't buy that. <strong>We built it, and we use it every day.</strong></p>
        <p class="ws-body">Custom work starts with a Mirror Scope, the same as everything else we do. You see exactly what will be built and what it costs before development starts, then we build in stages with a weekly check-in.</p>
      </div>
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Tell us what your team does by hand.</h2>
      <p class="brf-body">Describe the work that eats your week and we'll tell you honestly whether a custom application is the right fix.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'ai-on-zoho': `<div class="brf-page ws-page">

  <section class="ws-hero ws-hero-split">
    <div class="ws-wrap ws-hero-grid">
      <div class="ws-hero-copy">
        <a class="brf-back-link" href="/solutions" onclick="go('solutions')">← All solutions</a>
        <h1 class="ws-display ws-display-md">Zoho, with the missing pieces built in.</h1>
        <p class="ws-hero-lead">Zoho covers a lot of ground. The work that's specific to your business, the step your team still does by hand or in a spreadsheet next to Zoho, is where we come in.</p>
      </div>
      <div class="ws-hero-art" aria-hidden="true">
        <svg viewBox="0 0 480 480" focusable="false">
          <circle class="ws-a-disc" cx="240" cy="240" r="232"/>
          <g class="ws-a-lines">
            <path d="M240 290 L130 150"/><path d="M240 290 L240 120"/><path d="M240 290 L350 150"/>
          </g>
          <rect class="ws-a-node" x="78" y="124" width="104" height="52" rx="26"/>
          <rect class="ws-a-node" x="188" y="94" width="104" height="52" rx="26"/>
          <rect class="ws-a-node" x="298" y="124" width="104" height="52" rx="26"/>
          <rect class="ws-a-hub" x="140" y="252" width="200" height="88" rx="44"/>
          <text class="ws-a-label" x="240" y="307" text-anchor="middle">ZOHO</text>
          <g class="ws-a-pulses">
            <circle class="ws-a-pulse" r="7"><animateMotion dur="2.6s" repeatCount="indefinite" path="M240 290 L130 150"/></circle>
            <circle class="ws-a-pulse" r="7"><animateMotion dur="2.6s" begin=".9s" repeatCount="indefinite" path="M240 120 L240 290"/></circle>
            <circle class="ws-a-pulse" r="7"><animateMotion dur="2.6s" begin="1.7s" repeatCount="indefinite" path="M240 290 L350 150"/></circle>
          </g>
        </svg>
      </div>
    </div>
  </section>

  <section class="ws-sec ws-sec-tight ws-sec-mist">
    <div class="ws-wrap">
      <p class="ws-statement ws-statement-wide">We build applications and AI that sit on top of Zoho, read from it and write back to it, so Zoho stays your system of record.</p>
    </div>
  </section>

  <section class="ws-sec">
    <div class="ws-wrap">
      <h2 class="ws-h2">What that looks like</h2>
      <ul class="ws-flowcards">
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></svg></span><span>A purpose-built screen for one job, like shipping, quoting or receiving, that pulls orders, items and customers straight from Zoho</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-15.5 6.3M3 12a9 9 0 0 1 15.5-6.3"/><path d="M21 4v5h-5M3 20v-5h5"/></svg></span><span>Records, documents and status updates written back to Zoho automatically, so nobody re-keys anything</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg></span><span>AI that reads incoming documents and emails and files them against the right Zoho record</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/></svg></span><span>Bulk tools that fix data Zoho's own screens make slow to fix one record at a time</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg></span><span>Connections from Zoho to the carriers, tax engines and other systems your process depends on</span></li>
      </ul>
    </div>
  </section>

  <section class="ws-sec ws-sec-dark">
    <div class="ws-wrap ws-split ws-split-top">
      <div class="ws-split-head">
        <h2 class="ws-h2 ws-h2-xl">A real example</h2>
      </div>
      <div class="ws-split-body">
        <p class="ws-bodylg">For Plastics Products Mfg we built a shipping app on top of Zoho Inventory. Staff open a sales order, the app packs it into stock boxes, compares every FedEx rate on their account and prints the labels.</p>
        <p class="ws-body">Then it writes the packages, tracking numbers, shipping charge and packing slip back onto the Zoho order. It went live in 13 days, and <strong>87% of PPM's shipments now run through it.</strong></p>
        <div class="ws-actions" style="justify-content:flex-start">
          <a class="ws-pill-outline" href="/case-studies/plastics-products-mfg" onclick="go('case-studies/plastics-products-mfg')">Read the case study</a>
        </div>
      </div>
    </div>
  </section>

  <section class="ws-sec">
    <div class="ws-wrap ws-split">
      <div class="ws-split-head">
        <h2 class="ws-h2">When this fits</h2>
      </div>
      <div class="ws-split-body">
        <p class="ws-bodylg">You already run Zoho, or you're implementing it with us, and there's a part of your process Zoho doesn't quite cover.</p>
        <p class="ws-body">If Zoho can do the job with configuration alone, <strong>we'll tell you that first.</strong> New to Zoho? Start with <a class="ws-inline-link" href="/solutions/zoho" onclick="go('solutions/zoho')">Zoho implementation</a>.</p>
      </div>
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what your team does next to Zoho and we'll tell you honestly whether it's worth building.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'zoho': `<div class="brf-page">

  <section class="brf-hero brf-hero-navy">
    <div class="brf-container">
      <a class="brf-back-link" href="/solutions" onclick="go('solutions')">← All solutions</a>
      <h1 class="brf-h1">We know this platform inside out.</h1>
      <p class="brf-lead">Mirror Advisors was founded by a former Zoho employee, and Zoho remains the platform we've implemented more than any other. If you're evaluating it, running it, or struggling with an implementation someone else left behind, this is our home ground.</p>
    </div>
  </section>

  <section class="brf-section">
    <div class="brf-service-body">
      <h2 class="brf-h2">What we do</h2>
      <ul class="brf-list">
        <li>Platform and edition selection, including whether Zoho is the right choice at all</li>
        <li>Implementation across the Zoho suite</li>
        <li>Migration from other platforms into Zoho</li>
        <li>Custom development, including custom modules, functions and portals</li>
        <li>Integration between Zoho and the systems you're keeping</li>
        <li>Fixing implementations that didn't go well the first time</li>
        <li>Ongoing consulting and support</li>
      </ul>

      <!-- PLACEHOLDER · HelloSend. Paul listed HelloSend as a sub-product
           under Zoho. Add a short paragraph here once he confirms how it
           should be described. -->

      <h2 class="brf-h2">Go further with AI on Zoho</h2>
      <p class="brf-body">When there's a part of your process Zoho doesn't cover, we build it on top: applications and AI that read from Zoho and write back to it. <a class="brf-inline-link" href="/solutions/ai-on-zoho" onclick="go('solutions/ai-on-zoho')">See AI on Zoho</a>.</p>

      <h2 class="brf-h2">Why clients come to us specifically</h2>
      <p class="brf-body">Our founder worked at Zoho before founding this firm, so we know how the platform is built, where it's strong, and where it will fight you. In our first year as a partner we reached Premium tier, the first partner to do so that fast.</p>
      <p class="brf-body">Our team holds certifications across Zoho Creator, Zoho Workplace and Zoho CRM.</p>

      <h2 class="brf-h2">An honest note</h2>
      <p class="brf-body">We'll tell you when Zoho isn't the right fit. We work across platforms, and recommending software that doesn't suit your operation is a fast way to lose a client we'd rather keep for years.</p>

      <!-- PLACEHOLDER · do not fill; see rebuild brief §7.6 -->
      <!--
      <h2 class="brf-h2">Zoho applications we implement</h2>
      Application list reserved. Pending from Paul.
      Do NOT populate with a generic list of Zoho apps.
      -->
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'odoo': `<div class="brf-page">

  <section class="brf-hero brf-hero-navy">
    <div class="brf-container">
      <a class="brf-back-link" href="/solutions" onclick="go('solutions')">← All solutions</a>
      <div class="brf-eyebrow">Coming soon</div>
      <h1 class="brf-h1">Odoo implementation.</h1>
      <p class="brf-lead">We're adding Odoo to the platforms we implement, with the same approach we use for everything else: understand the operation first, configure the software second. If you're evaluating Odoo now, tell us about your project and we'll tell you where we can help today.</p>
      <div class="brf-btn-row">
        <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Get in touch</a>
        <a class="brf-cta-secondary" href="/services/software-implementation" onclick="go('services/software-implementation')">How we implement</a>
      </div>
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'avalara': `<div class="brf-page">

  <section class="brf-hero brf-hero-navy">
    <div class="brf-container">
      <a class="brf-back-link" href="/solutions" onclick="go('solutions')">← All solutions</a>
      <div class="brf-eyebrow">Coming soon</div>
      <h1 class="brf-h1">Avalara sales tax.</h1>
      <p class="brf-lead">We're adding Avalara implementation, connecting it to the systems you sell through so sales tax is calculated on every order instead of worked out by hand. If sales tax is a headache for you right now, tell us about it and we'll tell you where we can help today.</p>
      <div class="brf-btn-row">
        <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Get in touch</a>
        <a class="brf-cta-secondary" href="/services/systems-integration" onclick="go('services/systems-integration')">How we integrate</a>
      </div>
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what's broken and we'll tell you honestly whether we're the right firm to fix it. If we're not, we'll say so.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,

  'platforms': `<div class="brf-page ws-page">

  <section class="ws-hero ws-hero-plain">
    <div class="ws-wrap ws-hero-in">
      <h1 class="ws-display">The platforms we work with.</h1>
      <p class="ws-hero-lead">We implement a few platforms deeply, and we connect them to dozens more. Here's where we build, and a sample of the systems we've integrated along the way.</p>
    </div>
  </section>

  <section class="ws-sec ws-sec-tight">
    <div class="ws-wrap">
      <h2 class="ws-h2">Where we build</h2>
      <div class="brf-cards brf-cards-2">
        <a class="brf-card brf-card-featured" href="/solutions/ai-custom-solutions" onclick="go('solutions/ai-custom-solutions')">
          <div class="brf-card-title">Custom applications, built with Claude</div>
          <p class="brf-card-desc">Fully custom software for the work your other systems don't cover.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
        <a class="brf-card" href="/solutions/zoho" onclick="go('solutions/zoho')">
          <div class="brf-card-title">Zoho</div>
          <p class="brf-card-desc">Zoho Authorized Partner. Implementation, migration, custom development and support across the suite.</p>
          <div class="brf-card-learn">Learn more →</div>
        </a>
        <a class="brf-card brf-card-soon" href="/solutions/odoo" onclick="go('solutions/odoo')">
          <div class="brf-card-title">Odoo</div>
          <p class="brf-card-desc">Odoo implementation, scope first.</p>
          <div class="brf-card-learn">Find out more →</div>
        </a>
        <a class="brf-card brf-card-soon" href="/solutions/avalara" onclick="go('solutions/avalara')">
          <div class="brf-card-title">Avalara</div>
          <p class="brf-card-desc">Automated sales tax, connected to the systems you sell through.</p>
          <div class="brf-card-learn">Find out more →</div>
        </a>
      </div>
    </div>
  </section>

  <!-- WORKS WITH · PROVISIONAL LIST. Confirm every name with Paul before
       launch; he has the full list of systems we've integrated. -->
  <section class="ws-sec ws-sec-fog">
    <div class="ws-wrap">
      <h2 class="ws-h2 ws-center">Works with</h2>
      <p class="ws-hero-lead ws-center">A sample of the systems we've connected, migrated from or built on top of.</p>
      <ul class="ws-logos" aria-label="Systems we work with">
        <li>QuickBooks</li>
        <li>NetSuite</li>
        <li>Salesforce</li>
        <li>HubSpot</li>
        <li>Shopify</li>
        <li>Xero</li>
        <li>Microsoft 365</li>
        <li>Google Workspace</li>
        <li>Slack</li>
        <li>DocuSign</li>
        <li>FedEx</li>
        <li>EasyPost</li>
        <li>Zebra printers</li>
        <li>Supabase</li>
        <li>Claude</li>
      </ul>
      <p class="ws-note">Don't see yours? If it has an API, we can usually connect it. <a class="ws-inline-link" href="/contact" onclick="go('contact')">Ask us.</a></p>
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Start with a conversation.</h2>
      <p class="brf-body">Tell us what you run today and what isn't talking to what. We'll tell you honestly whether we can fix it.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,


  // Case study. Numbers come from PPM's EasyPost and Zoho Inventory data,
  // read 2026-10-08 (go-live 2026-09-22). Client approved naming, results
  // and screenshots. Screenshots have customer data replaced; pricing and
  // markup screens are deliberately not shown.
  'case-ppm': `<div class="brf-page ws-page">

  <section class="ws-hero ws-hero-plain">
    <div class="ws-wrap ws-hero-in">
      <a class="brf-back-link" href="/solutions/ai-on-zoho" onclick="go('solutions/ai-on-zoho')" style="display:table;margin-left:auto;margin-right:auto">← AI on Zoho</a>
      <div class="brf-eyebrow">Case study · Plastics Products Mfg</div>
      <h1 class="ws-display">Quote to label in one screen.</h1>
      <p class="ws-hero-lead">Plastics Products Mfg runs its orders and inventory in Zoho Inventory. Shipping was the gap. We built them a shipping app that sits on top of Zoho, prices every FedEx option, prints the labels and writes the whole shipment back onto the order.</p>
      <div class="ws-meta">
        <span><strong>Solution:</strong> AI on Zoho</span>
        <span><strong>Built on:</strong> Zoho Inventory, EasyPost, FedEx</span>
        <span><strong>Live since:</strong> September 2026</span>
      </div>
    </div>
  </section>

  <section class="ws-sec ws-sec-tight">
    <div class="ws-wrap">
      <figure class="ws-shot">
        <img src="/images/case-studies/ppm/order-boxes.jpg" alt="An open Zoho sales order in the shipping app, with three lines auto-packed into a small stock box and a 3D packing preview" width="1600" height="1000" />
        <figcaption>An open Zoho sales order, auto-packed into a stock box. Customer details replaced for this page.</figcaption>
      </figure>
    </div>
  </section>

  <section class="ws-sec ws-sec-dark">
    <div class="ws-wrap">
      <h2 class="ws-h2 ws-h2-xl ws-h2-wide">The first three weeks.</h2>
      <ul class="ws-stats">
        <li class="ws-stat"><div class="ws-stat-num">13 days</div><div class="ws-stat-label">from the first line of code to live FedEx labels</div></li>
        <li class="ws-stat"><div class="ws-stat-num">199</div><div class="ws-stat-label">labels on 118 shipments in the first 11 shipping days</div></li>
        <li class="ws-stat"><div class="ws-stat-num">87%</div><div class="ws-stat-label">of PPM's Zoho shipments now go through the app</div></li>
        <li class="ws-stat"><div class="ws-stat-num">1 in 4</div><div class="ws-stat-label">shipments are multi-box, up to 10 boxes, on one screen</div></li>
      </ul>
    </div>
  </section>

  <section class="ws-sec ws-sec-fog">
    <div class="ws-wrap ws-split">
      <div class="ws-split-head ws-sticky">
        <h2 class="ws-h2">The problem</h2>
      </div>
      <div class="ws-split-body">
        <p class="ws-bodylg">Every FedEx shipment meant working across separate tools: look up the order in Zoho, work out which box it fits in, price it on the carrier account, buy the label, then go back into Zoho to record the package, the tracking number and the shipping charge.</p>
        <p class="ws-body">On a multi-box order, that's the same steps again for every box. And the catalogue made it harder: of 5,978 active items, 4,443 were missing at least one measurement, and Zoho won't save an item's weight until all three dimensions are filled in.</p>
      </div>
    </div>
  </section>

  <section class="ws-sec">
    <div class="ws-wrap">
      <h2 class="ws-h2">What we built</h2>
      <ul class="ws-flowcards">
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></svg></span><span><strong>One screen from order to label.</strong> Open a Zoho sales order, choose what ships now, and the app packs it into stock boxes with a 3D preview of how it fits.</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg></span><span><strong>Every FedEx option, sorted by price.</strong> Rates from PPM's own FedEx account, with delivery dates and the cheapest and fastest marked.</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-15.5 6.3M3 12a9 9 0 0 1 15.5-6.3"/><path d="M21 4v5h-5M3 20v-5h5"/></svg></span><span><strong>Everything written back to Zoho.</strong> Packages, shipment, tracking, the FedEx charge and a packing slip land on the order, and it's marked delivered when FedEx delivers.</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/></svg></span><span><strong>Built for the warehouse floor.</strong> Labels print straight to the Zebra printer, in bulk if needed, in English or Spanish.</span></li>
        <li class="ws-flowcard"><span class="ws-flow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span><span><strong>Safe to retry.</strong> If anything fails halfway, a retry picks up where it stopped. It never buys a second label or creates a duplicate order.</span></li>
      </ul>
    </div>
  </section>

  <section class="ws-sec ws-sec-fog">
    <div class="ws-wrap ws-split ws-split-top">
      <div class="ws-split-head">
        <h2 class="ws-h2">Fixing the data along the way</h2>
        <p class="ws-body">Zoho's own screens won't save a weight without all three dimensions, so fixing thousands of items one at a time wasn't realistic. We added a bulk editor: pick a gap and a product family, type one measurement, and the app writes it to every selected item in Zoho, then checks each one actually saved.</p>
      </div>
      <div class="ws-split-body">
        <figure class="ws-shot">
          <img src="/images/case-studies/ppm/item-dimensions.jpg" alt="The item dimensions screen showing gap filters such as Missing length and No dimensions, with a bulk fill panel" loading="lazy" width="1600" height="1000" />
          <figcaption>Gap filters across the whole catalogue, and one fill for a whole product family.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="ws-sec">
    <div class="ws-wrap ws-split ws-split-top">
      <div class="ws-split-head">
        <h2 class="ws-h2">The result</h2>
      </div>
      <div class="ws-split-body">
        <p class="ws-bodylg">PPM went live on September 22, 2026. In the first 11 shipping days the team shipped 118 FedEx shipments, 199 labels, through the app, and 87% of all shipments recorded in Zoho now come from it.</p>
        <p class="ws-body">Zoho stays the system of record. <strong>The app is simply the fastest way to get an order out of the door and back into Zoho.</strong></p>
        <p class="ws-label" style="margin-top:32px">Services used</p>
        <ul class="ws-pills">
          <li><a href="/services/custom-development" onclick="go('services/custom-development')">Custom Development</a></li>
          <li><a href="/services/systems-integration" onclick="go('services/systems-integration')">Systems Integration</a></li>
          <li><a href="/services/data-migration" onclick="go('services/data-migration')">Data cleanup</a></li>
        </ul>
      </div>
    </div>
  </section>

  <section class="brf-cta-block">
    <div class="brf-container-narrow">
      <h2 class="brf-h2">Is there a job your team does next to Zoho?</h2>
      <p class="brf-body">Tell us about it and we'll tell you honestly whether it's worth building.</p>
      <a class="brf-cta-primary" href="/contact" onclick="go('contact')">Book a call</a>
    </div>
  </section>

</div>`,


  'contact': `<div class="page-wrap">
  <div class="contact-left">
    <div class="cl-grid"></div>
    <div class="cl-glow"></div>
    <div class="cl-inner">
      <div class="badge">Let&#39;s Talk</div>
      <h1 style="font-size:clamp(36px,4vw,54px);line-height:1.08;letter-spacing:-.03em">Tell us<br><span style="color:var(--t)">what&#39;s broken.</span></h1>
      <p class="cl-sub">Describe what&#39;s going on with your systems and we&#39;ll tell you honestly whether we&#39;re the right firm to fix it. If we&#39;re not, we&#39;ll point you toward someone who is.</p>
      <p class="cl-sub" style="margin-top:14px">We reply quickly. Our clients tell us it&#39;s one of the reasons they chose us.</p>
      <div class="alt-contacts">
        <a class="ac-item" href="mailto:info@mirroradvisors.com" style="text-decoration:none;color:inherit"><div class="ac-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div><div class="ac-title">Email</div><div class="ac-val">info@mirroradvisors.com</div></div></a>
        <a class="ac-item" href="https://www.linkedin.com/company/mirroradvisors/" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit"><div class="ac-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></div><div><div class="ac-title">LinkedIn</div><div class="ac-val">linkedin.com/company/mirroradvisors</div></div></a>
        <div class="ac-item" style="cursor:default"><div class="ac-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div><div class="ac-title">Office</div><div class="ac-val">The Woodlands, Texas</div></div></div>
      </div>
    </div>
  </div>
  <div class="contact-right">
    <div class="cr-inner">
      <div id="formWrap">
        <div class="cf-steps" aria-hidden="true">
          <span class="cf-step-dot is-on" data-step-dot="1">1</span><span class="cf-step-line"></span><span class="cf-step-dot" data-step-dot="2">2</span>
          <span class="cf-step-label" id="cfStepLabel">Step 1 of 2 &middot; Your project</span>
        </div>
        <form id="contactForm" onsubmit="submitForm(event)" novalidate>

          <!-- ── STEP 1 · THE PROJECT ── -->
          <div class="cf-step" data-step="1">
            <div class="form-title">What are you looking for?</div>
            <p class="form-sub">Two quick steps. The more you share, the more useful our first conversation will be.</p>
            <div class="fg">
              <label id="svcLabel">Pick any that apply *</label>
              <!-- Values come from lib/contact-options.js. The server maps
                   them onto the Zoho form's own option list. -->
              <div class="cf-chips" id="svcChips" role="group" aria-labelledby="svcLabel">
              ${_SOLUTION_CHIPS}
              </div>
              <div class="fg-err" data-for="svcChips"></div>
            </div>
            <div class="fg">
              <label id="sysLabel">What do you use today? <span style="opacity:.55;font-weight:400">(optional)</span></label>
              <div class="cf-chips" id="sysChips" role="group" aria-labelledby="sysLabel">
              ${_SYSTEM_CHIPS}
              </div>
              <input type="text" id="sysOther" maxlength="120" placeholder="Anything else? e.g. Excel, Sage, a custom database" autocomplete="off" style="margin-top:10px">
            </div>
            <div class="fg">
              <label for="message">What's going on? *</label>
              <textarea id="message" placeholder="What you're trying to solve, what you've tried, and what success looks like..." required oninput="updateChar(this)"></textarea>
              <div class="char-count" id="charCount">0 / 1000</div>
              <div class="fg-err" data-for="message"></div>
            </div>
            <div class="fg">
              <label for="timeline">Timeline *</label>
              <select id="timeline" required>
                <option value="">When are you looking to start?</option>
                <option>As soon as possible</option>
                <option>Within 1 month</option>
                <option>1&#8211;3 months</option>
                <option>3&#8211;6 months</option>
                <option>Just exploring</option>
              </select>
              <div class="fg-err" data-for="timeline"></div>
            </div>
            <button type="button" class="bp" id="cfNextBtn" onclick="contactNextStep()" style="width:100%;justify-content:center;margin-top:4px">
              Next: your details <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          <!-- ── STEP 2 · CONTACT DETAILS ── -->
          <div class="cf-step" data-step="2" style="display:none">
            <div class="form-title">How do we reach you?</div>
            <p class="form-sub">A real person reads every message. We reply by email to set up a call.</p>
            <div class="form-grid">
              <div class="fg"><label for="fname">First Name *</label><input type="text" id="fname" placeholder="Alex" autocomplete="given-name" required><div class="fg-err" data-for="fname"></div></div>
              <div class="fg"><label for="lname">Last Name *</label><input type="text" id="lname" placeholder="Johnson" autocomplete="family-name" required><div class="fg-err" data-for="lname"></div></div>
            </div>
            <div class="fg"><label for="email">Work Email *</label><input type="email" id="email" placeholder="alex@company.com" autocomplete="email" required><div class="fg-err" data-for="email"></div></div>
            <div class="fg"><label for="company">Company *</label><input type="text" id="company" placeholder="Acme Corp" autocomplete="organization" required><div class="fg-err" data-for="company"></div></div>
            <div class="form-grid">
              <div class="fg"><label for="phone">Phone <span style="opacity:.55;font-weight:400">(optional)</span></label><input type="tel" id="phone" placeholder="555-123-4567" autocomplete="tel"><div class="fg-err" data-for="phone"></div></div>
              <div class="fg">
                <label for="size">Team Size <span style="opacity:.55;font-weight:400">(optional)</span></label>
                <input type="number" id="size" min="1" max="100000" step="1" inputmode="numeric" placeholder="e.g. 42" autocomplete="off">
                <div class="fg-err" data-for="size"></div>
              </div>
            </div>
            <!-- Honeypot. Hidden from real users via display:none and
                 aria-hidden, tabindex="-1" so keyboard users skip it,
                 autocomplete="off" so browsers don't autofill it. Bots
                 that blindly scrape and fill every input will populate
                 this. The API returns 200 OK silently on any submission
                 with a value here, so the bot thinks it succeeded and
                 doesn't retry with a smarter payload. -->
            <div class="fg hp-fg" aria-hidden="true" style="display:none">
              <label for="website_url">Website (leave blank)</label>
              <input type="text" id="website_url" name="website_url" tabindex="-1" autocomplete="off" />
            </div>
            <!-- Cloudflare Turnstile widget. Turnstile's api.js (loaded via
                 pages/contact.js) auto-renders every .cf-turnstile div on
                 the page and, on success, populates a hidden input named
                 cf-turnstile-response with the verification token. The
                 submit handler reads that token and forwards it as
                 payload.turnstileToken to /api/contact, which verifies it
                 server-side before the Zoho forward. -->
            <div class="fg cf-fg" style="align-items:center">
              <div class="cf-turnstile"
                   data-sitekey="0x4AAAAAAES1viXZkZvIHoPY"
                   data-action="contact"
                   data-theme="light"></div>
              <div class="fg-err" data-for="cfTurnstile"></div>
            </div>
            <div class="privacy-note">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(236,169,52,.6)" stroke-width="2" style="flex-shrink:0;margin-top:1px"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Your information is never shared or sold. We use it only to prepare for our conversation with you.
            </div>
            <!-- Top-level submit status. Shown on send failure (server error or
                 Zoho rejection). Hidden by default; populated by submitForm. -->
            <div class="form-error" id="formErr" role="alert" aria-live="polite" style="display:none"></div>
            <div class="cf-actions">
              <button type="button" class="cf-back" onclick="contactPrevStep()">&larr; Back</button>
              <button type="submit" class="bp" id="submitBtn" style="flex:1;justify-content:center">
                Send <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="success-state" id="successState" style="display:none">
        <div class="success-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
        <div class="success-title" id="successTitle">Thanks, we've got it.</div>
        <p class="success-sub">Here's what happens next:</p>
        <ol class="cf-next">
          <li><strong>We read it.</strong> A real person on our team reviews what you sent, not a bot.</li>
          <li><strong>We reply by email</strong> to set up a short call, usually with a couple of questions so the call is useful.</li>
          <li><strong>On the call,</strong> we'll tell you honestly whether we're the right firm, and what a Mirror Scope would cover.</li>
        </ol>
        <a class="bp" id="cfBookBtn" href="#" target="_blank" rel="noopener noreferrer" style="display:none;width:100%;justify-content:center;margin:6px 0 18px">Pick a time now</a>
        <div style="padding:14px 18px;border-radius:10px;background:rgba(236,169,52,.07);border:1px solid rgba(236,169,52,.2);font-size:13px;color:var(--mid)"><strong style="color:var(--t)">While you wait:</strong> Read <a href="#" onclick="go('case-studies/plastics-products-mfg')" style="color:var(--t)">how we built a shipping app on Zoho</a> or see <a href="#" onclick="go('how-we-work')" style="color:var(--t)">how we work</a>.</div>
      </div>
    </div>
  </div>
</div>
`,

  'privacy': `<div class="ph" style="position:relative">
  <div class="ph-grid"></div>
  <div class="ph-glow" style="bottom:0;right:0;width:600px;height:400px;background:radial-gradient(ellipse at 80% 80%,rgba(236,169,52,.06),transparent 65%)"></div>
  <div class="ph-in">
    <div class="badge">Legal</div>
    <h1>Privacy<br><span style="color:var(--t)">Policy.</span></h1>
    <p class="ph-sub">How Mirror Advisors collects, uses, and protects information you share with us through this website and the Infinity Portal.</p>
  </div>
</div>

<section class="sec">
  <div class="legal-wrap">
    <div class="legal-meta">
      <span class="legal-meta-dot"></span>
      <span class="legal-meta-label">Last Updated</span>
      <span>May 27, 2026</span>
    </div>

    <p class="legal-intro">Mirror Advisors values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect data you share when visiting our website (mirroradvisors.com), engaging with our services, or signing in to the Infinity Portal at app.mirroradvisors.com.</p>

    <h2 class="legal-h2">Information We Collect</h2>
    <p class="legal-p">We collect information to provide better services to our clients and visitors. The data we collect includes:</p>
    <ul class="legal-ul">
      <li><strong>Personal Information</strong> ,  Name, email address, company name, phone number, and any other details you voluntarily provide through our contact form, consultation bookings, or direct inquiries.</li>
      <li><strong>Website Usage Data</strong> ,  IP address, browser type, device information, referral source, and pages visited. This data is collected automatically through cookies and similar technologies when you browse mirroradvisors.com.</li>
      <li><strong>Infinity Portal Data</strong> ,  If you are an active client with access to our Infinity Portal at app.mirroradvisors.com, we collect authentication credentials, session information, and the work product, documents, and project data you generate or upload while using the portal.</li>
      <li><strong>Project &amp; Engagement Data</strong> ,  Information you share with us during Scope engagements, project delivery, or support work ,  including system access credentials, business data, and configurations ,  handled under our standard engagement agreements.</li>
    </ul>

    <h2 class="legal-h2">How We Use Your Information</h2>
    <p class="legal-p">We use the information we collect to:</p>
    <ul class="legal-ul">
      <li>Respond to inquiries, service requests, and consultation bookings submitted through this website.</li>
      <li>Deliver, configure, and support the Zoho One and Claude AI systems we build for clients.</li>
      <li>Operate and improve the Infinity Portal experience for active clients.</li>
      <li>Send relevant updates and communications ,  only if you have opted in or have an active engagement with us.</li>
      <li>Conduct internal analytics to understand how our website performs and where we can improve it.</li>
      <li>Maintain compliance with applicable laws, tax obligations, and partner agreements (including Zoho and Anthropic).</li>
    </ul>

    <h2 class="legal-h2">How We Share Your Information</h2>
    <p class="legal-p">We do not sell or rent your personal information. We share data only with trusted third parties when necessary to operate our business, namely:</p>
    <ul class="legal-ul">
      <li><strong>Infrastructure Providers</strong> ,  Web hosting and email services we use to keep mirroradvisors.com and our communications running.</li>
      <li><strong>Zoho Corporation</strong> ,  As an authorised Zoho partner, certain client and engagement information is shared with Zoho when required to provision licences, register partner deals, or coordinate support.</li>
      <li><strong>Anthropic (Claude AI)</strong> ,  When we build custom Claude AI integrations for clients, data flows through Anthropic&#39;s API under their data processing terms. This applies only to active client systems, not to general website visitors.</li>
      <li><strong>Legal Compliance</strong> ,  When required by law, court order, or to protect our legal rights and property.</li>
    </ul>
    <p class="legal-p">All third-party partners we work with are required to handle your data securely and in a manner consistent with this Privacy Policy.</p>

    <h2 class="legal-h2">Cookies and Tracking Technologies</h2>
    <p class="legal-p">Our website uses a small set of cookies to remember your preferences (such as your cookie consent choice) and to help us understand basic site usage. You can control cookie preferences through your browser settings or by using the cookie consent banner that appears on your first visit. We do not use third-party advertising cookies or cross-site tracking pixels.</p>

    <h2 class="legal-h2">Data Retention</h2>
    <p class="legal-p">We retain personal data only as long as necessary to fulfill the purposes outlined in this policy ,  or as required by law, contract, or our professional obligations. Once no longer needed, your data is securely deleted or anonymised. Infinity Portal data is retained for the duration of your engagement plus a reasonable archival period.</p>

    <h2 class="legal-h2">Your Rights &amp; Global Compliance</h2>
    <p class="legal-p">Depending on your location (including the US, EU, UK, and Canada), you have specific rights regarding your data. You have the right to:</p>
    <ul class="legal-ul">
      <li><strong>Access, Correct, or Delete</strong> your personal data.</li>
      <li><strong>Opt-Out</strong> of targeted communications, data sharing, or automated profiling.</li>
      <li><strong>Data Portability</strong> ,  request a copy of your data in a usable format.</li>
      <li><strong>Non-Discrimination</strong> for exercising your privacy rights.</li>
    </ul>
    <p class="legal-p">To exercise any of these rights, please contact us at <a href="mailto:info@mirroradvisors.com">info@mirroradvisors.com</a>. We will respond within the legally mandated timeframe (typically 30 to 45 days).</p>

    <h2 class="legal-h2">Data Security</h2>
    <p class="legal-p">We take appropriate technical and organisational measures to protect your information from unauthorised access, alteration, or disclosure. The Infinity Portal uses authenticated sessions, encrypted connections, and access controls scoped to your engagement. While no system is entirely secure, we implement industry-standard practices to safeguard the data you entrust to us.</p>

    <h2 class="legal-h2">Links to Other Websites</h2>
    <p class="legal-p">Our website may contain links to external sites (including Zoho, Anthropic, and partner documentation). We are not responsible for the content or privacy practices of those sites and encourage you to review their privacy policies separately.</p>

    <h2 class="legal-h2">Updates to This Policy</h2>
    <p class="legal-p">We may update this Privacy Policy from time to time to reflect new legal requirements or changes to how we operate. Any changes will be posted on this page with a revised &ldquo;Last Updated&rdquo; date.</p>

    <div class="legal-contact-block">
      <div class="legal-h3">Questions About This Policy?</div>
      <p class="legal-p">Email us at <a href="mailto:info@mirroradvisors.com">info@mirroradvisors.com</a> or call <a href="tel:+17138877492">713-887-7492</a>. You can also write to us at 2002 Timberloch Pl, Suite 200, The Woodlands, TX 77380.</p>
    </div>
  </div>
</section>
`,

  'accessibility': `<div class="ph" style="position:relative">
  <div class="ph-grid"></div>
  <div class="ph-glow" style="bottom:0;right:0;width:600px;height:400px;background:radial-gradient(ellipse at 80% 80%,rgba(236,169,52,.06),transparent 65%)"></div>
  <div class="ph-in">
    <div class="badge">Legal</div>
    <h1>Accessibility<br><span style="color:var(--t)">Statement.</span></h1>
    <p class="ph-sub">Mirror Advisors is committed to making mirroradvisors.com usable for everyone, and we continually work to improve the experience for visitors with disabilities.</p>
  </div>
</div>

<section class="sec">
  <div class="legal-wrap">
    <div class="legal-meta">
      <span class="legal-meta-dot"></span>
      <span class="legal-meta-label">Last Updated</span>
      <span>May 27, 2026</span>
    </div>

    <p class="legal-intro">Mirror Advisors is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and working toward the relevant accessibility standards to ensure an inclusive online experience.</p>

    <h2 class="legal-h2">Our Commitment &amp; Standards</h2>
    <p class="legal-p">Mirror Advisors strives to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA standards. These guidelines explain how to make web content more accessible to people with various disabilities, and conforming to them helps make the web more usable for everyone. We treat WCAG 2.1 AA as a target we work toward continuously, not a one-time certification.</p>

    <h2 class="legal-h2">Measures to Support Accessibility</h2>
    <p class="legal-p">As part of our ongoing commitment, we apply the following practices across our digital experience:</p>
    <ul class="legal-ul">
      <li>Maintaining a clear heading structure and consistent navigation across pages.</li>
      <li>Providing descriptive alt-text for meaningful images, and marking decorative images so screen readers can skip them.</li>
      <li>Ensuring text-to-background colour contrast meets or exceeds standard thresholds for our dark theme.</li>
      <li>Designing for keyboard navigation throughout the site, with focus indicators on interactive elements.</li>
      <li>Working toward compatibility with common screen-reading technologies (NVDA, JAWS, VoiceOver).</li>
      <li>Including ARIA labels and live-region announcements on interactive components such as the integration map on our homepage.</li>
    </ul>

    <h2 class="legal-h2">Known Limitations</h2>
    <p class="legal-p">We want to be transparent about areas where we are still working toward full accessibility:</p>
    <ul class="legal-ul">
      <li><strong>Hero integration puzzle</strong> ,  The interactive puzzle on our homepage uses visual cues (colour, animation, snapping pieces) to communicate how Zoho and AI tools connect. The same information is described in plain text on our Services, Technology, and Capabilities pages.</li>
      <li><strong>Animated transitions</strong> ,  Some pages include subtle animations on scroll or hover. We are working to ensure all motion respects the operating system&#39;s &ldquo;reduced motion&rdquo; preference.</li>
      <li><strong>Embedded media</strong> ,  A small number of case study background images do not have descriptive alt-text because they are purely decorative; we are reviewing these on an ongoing basis.</li>
    </ul>

    <h2 class="legal-h2">Technical Specifications</h2>
    <p class="legal-p">Accessibility of mirroradvisors.com relies on the following technologies working in combination with your web browser and any assistive technologies you have installed:</p>
    <ul class="legal-ul">
      <li>HTML5</li>
      <li>CSS3</li>
      <li>JavaScript (ES2015+)</li>
      <li>WAI-ARIA where appropriate for interactive elements</li>
      <li>SVG for diagrams, icons, and the integration map</li>
    </ul>

    <h2 class="legal-h2">Feedback, Support &amp; Contact Information</h2>
    <p class="legal-p">We welcome your feedback on the accessibility of our website. If you encounter accessibility barriers, have difficulty navigating our content, or simply want to share a suggestion, please reach out:</p>

    <div class="legal-contact-block">
      <div class="legal-h3">Accessibility Contact</div>
      <p class="legal-p"><strong>Email:</strong> <a href="mailto:info@mirroradvisors.com">info@mirroradvisors.com</a></p>
      <p class="legal-p"><strong>Phone:</strong> <a href="tel:+17138877492">713-887-7492</a></p>
      <p class="legal-p"><strong>Response Time:</strong> We aim to respond to accessibility feedback within 2&ndash;3 business days and propose a solution within a reasonable timeframe.</p>
    </div>
  </div>
</section>
`,

  'ph-team': `
<div class="ph" style="position:relative">
  <div class="ph-grid"></div>
  <div class="ph-glow"></div>
  <div class="ph-in" style="text-align:center">
    <div class="badge" style="margin-left:auto;margin-right:auto">Mirror Advisors</div>
    <h1 class="ph-h" style="font-size:clamp(36px,4.5vw,52px);letter-spacing:-.03em;line-height:1.05">The Operations<br><span style="color:var(--t)">Team.</span></h1>
    <p class="ph-sub" style="margin-left:auto;margin-right:auto">The people who make everything run behind the scenes.</p>
  </div>
</div>

<section class="sec">
  <div class="si" style="max-width:860px">
    <div class="pht-grid">

      <!-- Janna · Operations Manager -->
      <div class="pht-card">
        <div class="pht-photo">
          <img src="/images/team/janna-malicad.jpg" alt="Janna Binea Malicad" loading="lazy" />
        </div>
        <div class="pht-name">Janna Binea Malicad</div>
        <div class="pht-title">Operations Manager</div>
        <div class="pht-contacts">
          <a href="tel:+639241152681" class="pht-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.92 3.33A2 2 0 0 1 3.9 1.17h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.94 5.94l1.2-1.17a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>+63 924 115 2681</span>
          </a>
          <a href="mailto:Janna@mirroradvisors.com" class="pht-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>Janna@mirroradvisors.com</span>
          </a>
          <a href="/team/janna.vcf" download="Janna-Binea-Malicad.vcf" class="pht-vcard-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Save to Contacts</span>
          </a>
        </div>
      </div>

      <!-- Mark · Operations Assistant -->
      <div class="pht-card">
        <div class="pht-photo">
          <img src="/images/team/mark-atienza.png" alt="Mark Adam Atienza" width="800" height="800" loading="lazy" decoding="async" />
        </div>
        <div class="pht-name">Mark Adam Atienza</div>
        <div class="pht-title">Operations Assistant</div>
        <div class="pht-contacts">
          <a href="tel:+639688511430" class="pht-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.92 3.33A2 2 0 0 1 3.9 1.17h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.94 5.94l1.2-1.17a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>+63 968 851 1430</span>
          </a>
          <a href="mailto:Sythe@mirroradvisors.com" class="pht-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>Sythe@mirroradvisors.com</span>
          </a>
          <a href="/team/mark.vcf" download="Mark-Adam-Atienza.vcf" class="pht-vcard-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Save to Contacts</span>
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

<section class="sec pht-social-sec" style="background:#0C0F22;border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08);padding-top:64px;padding-bottom:64px">
  <div class="pht-social-glow" aria-hidden="true"></div>
  <div class="si" style="max-width:640px;text-align:center;position:relative;z-index:1">
    <div class="sl" style="justify-content:center;display:flex">Follow Us</div>
    <div class="sh" style="font-size:clamp(24px,3vw,36px);margin-bottom:36px">Mirror Advisors, <em style="font-style:italic;color:var(--t)">everywhere</em>.</div>
    <!-- pft-social class is what _renderSocialIcons() targets. When the
         page mounts, _INIT.ph_team calls that renderer and fills this
         container with the currently-enabled social icons from the
         same source-of-truth the footer uses (window._SOCIAL_LINKS). -->
    <div class="pft-social pht-socials" role="list" aria-label="Mirror Advisors social channels"></div>
  </div>
</section>
`,

};
