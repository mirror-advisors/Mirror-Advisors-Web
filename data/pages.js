// Auto-generated. Main page HTML fragments.

import { FOOTER_HTML } from '../lib/footer';

const _FOOTER_HTML = FOOTER_HTML;

export const pages = {
  'home': `<!-- ============================================================
     NAV
============================================================ -->


<!-- ============================================================
     HERO  (centered, single-column — v2)
============================================================ -->
<section id="hero" class="hero-v2">
  <div class="hero-v2-vignette"></div>

  <div class="hero-v2-inner">
    <div class="hero-v2-badge hero-v2-badge-left">
      <span class="hero-v2-badge-dot"></span>
      NOW ACCEPTING NEW CLIENTS
    </div>

    <h1 class="hero-v2-h1">
      <span class="word">We</span> <span class="word">build</span> <span class="word">technology</span><br>
      <span class="word">that</span> <span class="word word-accent">scales.</span>
    </h1>

    <p class="hero-v2-p">
      Enterprise ERP deployments, custom Claude AI apps, Zoho consulting &amp; support, and deep systems integration &mdash; built for businesses that are serious about growth.
    </p>

    <div class="hero-v2-btns">
      <button class="btn-primary hero-v2-cta" onclick="go('contact')">
        Book a Strategy Session
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
      <button class="btn-secondary" onclick="document.getElementById('cases').scrollIntoView({behavior:'smooth'})">
        See Case Studies
      </button>
    </div>

    <!-- =====================================================
         INTEGRATION PUZZLE — interactive jigsaw
    ===================================================== -->
    <div class="hero-puzzle" id="heroPuzzle" aria-label="Interactive integration map">
      <div class="hero-puzzle-header">
        <div class="hero-puzzle-header-pill" id="heroPuzzleHeader">
          <span class="hp-hint-dot"></span>
          <span id="heroPuzzleHeaderText">Tap a piece to explore</span>
          <span class="hp-cycle" id="heroPuzzleCycle" style="display:none;">
            <span class="hp-cycle-current" id="hpCycleCurrent">1</span><span class="hp-cycle-sep">/</span><span class="hp-cycle-total" id="hpCycleTotal">1</span>
          </span>
        </div>
      </div>
      <div class="hero-puzzle-stage" id="heroPuzzleStage" aria-live="polite">
        <div class="hero-puzzle-label" id="heroPuzzleLabel"></div>
        <!-- Pieces injected by _INIT.home -->
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     SCREENS
============================================================ -->
<section id="screens">
  <div class="section-wrap">
    <div class="sec-label">Live in Production</div>
    <div class="sec-h">Systems That Actually<br>Work in the Real World</div>
    <p class="sec-sub">Real deployments running daily across sales, operations, and finance teams.</p>

    <div class="screens-grid">
      <!-- CRM Screen -->
      <div class="screen-wrap">
        <div class="screen-frame">
          <div class="scan-overlay"></div>
          <div class="screen-bar">
            <div class="screen-dot" style="background:#ff5f57;"></div>
            <div class="screen-dot" style="background:#ffbd2e;"></div>
            <div class="screen-dot" style="background:#28c840;"></div>
            <div class="url-pill">app.mirroradvisors.io/crm/pipeline</div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <div class="screen-body">
            <div style="font-size:10px;font-family:'Montserrat',sans-serif;font-weight:700;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">AI-Scored Pipeline — Q2 2025</div>
            <div class="crm-table-head">
              <span class="crm-th">Company</span>
              <span class="crm-th">Value</span>
              <span class="crm-th">Stage</span>
              <span class="crm-th">Status</span>
            </div>
            <div class="crm-row">
              <div class="crm-company">
                <div class="crm-avatar" style="background:rgba(236,169,52,0.2);color:#ECA934;">NC</div>
                <span class="crm-name-text">Nexus Corp</span>
              </div>
              <span class="crm-value">\$124k</span>
              <span class="crm-stage">Proposal</span>
              <span class="crm-badge" style="background:rgba(236,169,52,0.15);color:#ECA934;">hot</span>
            </div>
            <div class="crm-row">
              <div class="crm-company">
                <div class="crm-avatar" style="background:rgba(236,169,52,0.2);color:#ECA934;">AD</div>
                <span class="crm-name-text">Apex Dynamics</span>
              </div>
              <span class="crm-value">\$87k</span>
              <span class="crm-stage">Discovery</span>
              <span class="crm-badge" style="background:rgba(236,169,52,0.15);color:#ECA934;">warm</span>
            </div>
            <div class="crm-row">
              <div class="crm-company">
                <div class="crm-avatar" style="background:rgba(107,159,212,0.2);color:#6B9FD4;">OS</div>
                <span class="crm-name-text">Orbital Systems</span>
              </div>
              <span class="crm-value">\$210k</span>
              <span class="crm-stage">Contract</span>
              <span class="crm-badge" style="background:rgba(107,159,212,0.15);color:#6B9FD4;">closing</span>
            </div>
            <div class="crm-row">
              <div class="crm-company">
                <div class="crm-avatar" style="background:rgba(139,159,212,0.2);color:#8B9FD4;">PM</div>
                <span class="crm-name-text">Pulse Media</span>
              </div>
              <span class="crm-value">\$45k</span>
              <span class="crm-stage">Nurture</span>
              <span class="crm-badge" style="background:rgba(139,159,212,0.15);color:#8B9FD4;">cool</span>
            </div>
            <div class="ai-insight">
              <div class="ai-insight-label">⚡ AI Insight</div>
              <div class="ai-insight-text">3 deals show engagement decay — follow-up recommended within 48h to prevent pipeline loss.</div>
            </div>
          </div>
        </div>
        <div class="screen-caption">
          <div class="screen-caption-title">AI-Augmented CRM</div>
          <div class="screen-caption-text">Custom Claude agents that score leads, draft follow-ups, and flag pipeline risk — all inside your existing Zoho CRM.</div>
        </div>
      </div>

      <!-- Analytics Screen -->
      <div class="screen-wrap" style="animation-delay:-3s;">
        <div class="screen-frame" style="animation-delay:-3s;">
          <div class="screen-bar">
            <div class="screen-dot" style="background:#ff5f57;"></div>
            <div class="screen-dot" style="background:#ffbd2e;"></div>
            <div class="screen-dot" style="background:#28c840;"></div>
            <div class="url-pill">analytics.mirroradvisors.io/revenue</div>
            <span style="font-size:9px;padding:2px 7px;border-radius:100px;background:rgba(236,169,52,0.15);color:#ECA934;font-weight:700;font-family:'Montserrat',sans-serif;">LIVE</span>
          </div>
          <div class="screen-body">
            <div class="analytics-kpis">
              <div class="kpi-box">
                <div class="kpi-label">Monthly Revenue</div>
                <div class="kpi-value">\$284k</div>
                <div class="kpi-change" style="color:#ECA934;">↑ 18.4%</div>
              </div>
              <div class="kpi-box">
                <div class="kpi-label">Open Pipeline</div>
                <div class="kpi-value">\$1.2M</div>
                <div class="kpi-change" style="color:#6B9FD4;">+6 deals</div>
              </div>
              <div class="kpi-box">
                <div class="kpi-label">Win Rate</div>
                <div class="kpi-value">64%</div>
                <div class="kpi-change" style="color:#8B9FD4;">↑ 7pts</div>
              </div>
            </div>
            <div class="chart-area">
              <div class="chart-label">12-Month Revenue Trend</div>
              <div class="chart-bars" id="chartBars"></div>
            </div>
            <div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <div style="padding:8px 10px;border-radius:7px;background:rgba(236,169,52,0.05);border:1px solid rgba(236,169,52,0.15);">
                <div style="font-size:9px;color:rgba(255,255,255,0.3);margin-bottom:2px;">Zoho Books Sync</div>
                <div style="font-size:11px;color:#ECA934;font-weight:600;font-family:'Montserrat',sans-serif;">● Real-time</div>
              </div>
              <div style="padding:8px 10px;border-radius:7px;background:rgba(107,159,212,0.05);border:1px solid rgba(107,159,212,0.15);">
                <div style="font-size:9px;color:rgba(255,255,255,0.3);margin-bottom:2px;">CRM Pipeline</div>
                <div style="font-size:11px;color:#6B9FD4;font-weight:600;font-family:'Montserrat',sans-serif;">● Connected</div>
              </div>
            </div>
          </div>
        </div>
        <div class="screen-caption">
          <div class="screen-caption-title">Unified Analytics Layer</div>
          <div class="screen-caption-text">Cross-system dashboards pulling from CRM, ERP, and third-party APIs into a single live intelligence view.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     CAPABILITIES
============================================================ -->
<section id="capabilities">
  <div class="section-wrap">
    <div class="sec-label">What We Build</div>
    <div class="sec-h">Four Disciplines.<br>One Practice.</div>
    <p class="sec-sub">Every engagement draws from all four. We don't silo our expertise — your problem gets the full picture.</p>

    <div class="cap-grid">
      <!-- Card 1 -->
      <div class="cap-card" onclick="go('services')" style="cursor:pointer">
        <div class="cap-card-accent" style="background:linear-gradient(90deg,#ECA934,transparent);"></div>
        
        <div class="cap-icon-box" style="background:rgba(236,169,52,0.09);border:1px solid rgba(236,169,52,0.2);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="1.7"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/><path d="M7 17a5 5 0 0 1 10 0"/></svg>
        </div>
        <div class="cap-title">AI-Powered Apps</div>
        <div class="cap-desc">We build AI agents that live inside your existing tools &mdash; scoring leads, drafting documents, answering internal questions, and flagging problems before you see them. No new software to learn. No humans in the loop.</div>
        <div class="cap-arrow-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
      <!-- Card 2 -->
      <div class="cap-card" onclick="go('services')" style="cursor:pointer">
        <div class="cap-card-accent" style="background:linear-gradient(90deg,#6B9FD4,transparent);"></div>
        
        <div class="cap-icon-box" style="background:rgba(107,159,212,0.09);border:1px solid rgba(107,159,212,0.2);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B9FD4" stroke-width="1.7"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
        </div>
        <div class="cap-title">Business Consulting</div>
        <div class="cap-desc">Before we build anything, we map what you actually have, what&rsquo;s broken, and what&rsquo;s costing you. Then we give you a technology plan that we&rsquo;re accountable for executing &mdash; not a deck that sits in a drawer.</div>
        <div class="cap-arrow-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B9FD4" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
      <!-- Card 3 -->
      <div class="cap-card" onclick="go('services')" style="cursor:pointer">
        <div class="cap-card-accent" style="background:linear-gradient(90deg,#8B9FD4,transparent);"></div>
        
        <div class="cap-icon-box" style="background:rgba(139,159,212,0.09);border:1px solid rgba(139,159,212,0.2);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B9FD4" stroke-width="1.7"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v3M8.5 15.5l6.5-3.5M7.4 17.5l-1.9-3.3M16.6 17.5l1.9-3.3"/></svg>
        </div>
        <div class="cap-title">Systems Integration</div>
        <div class="cap-desc">Most businesses run 8&ndash;14 tools that don&rsquo;t share data. We build the connections that make your stack behave like one system &mdash; so a deal closed in CRM becomes an invoice in accounting without anyone touching a keyboard.</div>
        <div class="cap-arrow-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B9FD4" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
      <!-- Card 4 -->
      <div class="cap-card" onclick="go('services')" style="cursor:pointer">
        <div class="cap-card-accent" style="background:linear-gradient(90deg,#ECA934,transparent);"></div>
        
        <div class="cap-icon-box" style="background:rgba(236,169,52,0.09);border:1px solid rgba(236,169,52,0.2);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="1.7"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
        </div>
        <div class="cap-title">ERP Implementation</div>
        <div class="cap-desc">ERP projects have a notorious failure rate. Ours don&rsquo;t miss. We handle the full cycle &mdash; blueprint, migration, configuration, training &mdash; and we don&rsquo;t hand you off to a support queue when it goes live.</div>
        <div class="cap-arrow-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     CASE STUDIES
============================================================ -->
<section id="cases">
  <div class="cases-header">
    <div class="sec-label">Case Studies</div>
    <div class="sec-h">Results That Compound</div>
    <p class="sec-sub">Real work. Real numbers. Hover to pause.</p>
  </div>
  <div class="cases-track-wrap">
    <div class="cases-track" id="casesTrack"></div>
  </div>
</section>

<!-- ============================================================
     SERVICE MODELS
============================================================ -->
<section id="services">
  <div class="section-wrap">
    <div class="svc-header-row">
      <div class="svc-header-left">
        <div class="sec-label">Engagement Models</div>
        <div class="sec-h">Five Ways to Work<br>With Us</div>
      </div>
      <p class="sec-sub svc-header-sub">Every client situation is different. We structured our engagements to match your risk tolerance and growth stage.</p>
    </div>

    <div class="services-layout">
      <div class="svc-tab-list" id="svcTabList"></div>
      <div class="svc-panel" id="svcPanel">
        <div class="svc-panel-glow"></div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     ZOHO
============================================================ -->
<section id="zoho">
  <div class="section-wrap">
    <div class="zoho-grid">
      <div>
        <div class="sec-label">Foundation Layer</div>
        <div class="sec-h">Deep Zoho Expertise.<br><span style="color:var(--bluegray);">Not Our Whole Story.</span></div>
        <p style="font-size:15px;color:var(--text-mid);line-height:1.78;margin-bottom:24px;font-weight:300;">Zoho's platform is one of the most capable business operating systems available — and we've achieved expert-level depth across its entire suite. But Zoho is our instrument, not our identity.</p>
        <p style="font-size:15px;color:var(--text-mid);line-height:1.78;font-weight:300;">The real value comes when we extend it with custom Claude AI, bespoke integrations, and business logic the native platform alone can't handle.</p>
        <div class="zoho-tags">
          <span class="zoho-tag">Zoho One</span>
          <span class="zoho-tag">Advanced CRM</span>
          <span class="zoho-tag">Books + Finance</span>
          <span class="zoho-tag">Custom Functions</span>
          <span class="zoho-tag">Claude Extensions</span>
        </div>
      </div>
      <div>
        <div style="font-size:10px;font-family:'Montserrat',sans-serif;font-weight:700;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;">Apps We Deploy — Hover Any</div>
        <div class="zoho-app-grid" onclick="go('technology')" style="cursor:pointer">
          <div class="zoho-chip"><div class="zoho-chip-prefix">Zoho</div><div class="zoho-chip-name">CRM</div></div>
          <div class="zoho-chip"><div class="zoho-chip-prefix">Zoho</div><div class="zoho-chip-name">Books</div></div>
          <div class="zoho-chip"><div class="zoho-chip-prefix">Zoho</div><div class="zoho-chip-name">Projects</div></div>
          <div class="zoho-chip"><div class="zoho-chip-prefix">Zoho</div><div class="zoho-chip-name">Desk</div></div>
          <div class="zoho-chip"><div class="zoho-chip-prefix">Zoho</div><div class="zoho-chip-name">Analytics</div></div>
          <div class="zoho-chip"><div class="zoho-chip-prefix">Zoho</div><div class="zoho-chip-name">Sign</div></div>
          <div class="zoho-chip"><div class="zoho-chip-prefix">Zoho</div><div class="zoho-chip-name">Flow</div></div>
          <div class="zoho-chip"><div class="zoho-chip-prefix">Zoho</div><div class="zoho-chip-name">People</div></div>
          <div class="zoho-chip"><div class="zoho-chip-prefix">Zoho</div><div class="zoho-chip-name">Inventory</div></div>
          <div class="zoho-chip"><div class="zoho-chip-prefix">Zoho</div><div class="zoho-chip-name">Recruit</div></div>
          <div class="zoho-chip"><div class="zoho-chip-prefix">Zoho</div><div class="zoho-chip-name">Expense</div></div>
          <div class="zoho-chip"><div class="zoho-chip-prefix">Zoho</div><div class="zoho-chip-name">Creator</div></div>
        </div>
        <div class="zoho-note">
          <div class="zoho-note-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <div class="zoho-note-text">
            <strong>The real power</strong> comes when we extend Zoho with custom Claude AI apps, automated workflows, and third-party integrations — building capabilities the native platform alone cannot deliver.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     FOOTER
============================================================ -->


<!-- ============================================================
     JAVASCRIPT
============================================================ -->
`,
  'about': `<div class="ph" style="position:relative">
  <div class="ph-grid"></div>
  <div class="ph-glow" style="bottom:0;right:0;width:600px;height:400px;background:radial-gradient(ellipse at 80% 80%,rgba(236,169,52,.06),transparent 65%)"></div>
  <div class="ph-in">
    <div class="badge">About Mirror Advisors</div>
    <h1>The firm built by<br><span style="color:var(--t)">someone who was inside Zoho.</span></h1>
    <p class="ph-sub">A US-based Zoho premium partner with a former Zoho Account Executive running the business and a 25-year enterprise CTO at the architecture table. Built to do Zoho the way Zoho does Zoho &mdash; with the seniority most partners can&#39;t bring.</p>
  </div>
</div>

<section class="ab-section">
  <div class="ab-inner">
    <div class="sl">Who We Are</div>
    <div class="sh">A Texas-based Zoho premium partner.<br><span style="color:var(--t)">With nearly a decade inside the ecosystem.</span></div>
    <div class="ab-origin">
      <p>Mirror Advisors is a <strong>Texas-based Zoho premium partner</strong> with leadership and development talent that collectively brings nearly a decade inside the Zoho ecosystem. Our founder is a former Zoho Account Executive &mdash; CRM and Zoho One, Canada market &mdash; and our developers come out of Zappy Works, Zoho&#39;s own India-based partner.</p>
      <p>We are not learning Zoho on our clients&#39; time. We sell and deploy Zoho the way Zoho itself does &mdash; with inside knowledge of the product, the value proposition, and the sales motion. The result: deals close faster, implementations land cleaner, and customers stay longer.</p>
    </div>
  </div>
</section>

<section class="ab-section alt">
  <div class="ab-inner">
    <div class="sl">Why Mirror Exists</div>
    <div class="sh">Zoho is powerful.<br><span style="color:var(--t)">Most partners don&#39;t know how to make it work for you.</span></div>

    <p class="ab-thesis">Most partners are <em>developers with a logo</em>. They write code, send an invoice, and disappear. Zoho&#39;s own support funnels to India, ticket by ticket, with no memory of your account. The freelancer market underprices the work and overdelivers confusion. <span>Mirror Advisors is what happens when someone who sold Zoho from the inside decides to do it right.</span></p>

    <div class="ab-compare-wrap">
      <table class="ab-compare">
        <thead>
          <tr>
            <th style="width:32%">What Clients Actually Need</th>
            <th style="width:17%">Offshore Freelancer</th>
            <th style="width:17%">Typical US Partner</th>
            <th style="width:17%">Zoho Direct Support</th>
            <th style="width:17%" class="ab-ma-col">Mirror Advisors</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ab-criterion">Strategic consulting on feature overlap</td>
            <td><span class="ab-badge ab-badge-bad">No</span></td>
            <td><span class="ab-badge ab-badge-part">Some</span></td>
            <td><span class="ab-badge ab-badge-bad">No</span></td>
            <td class="ab-ma-cell"><span class="ab-badge ab-badge-good">Yes</span></td>
          </tr>
          <tr>
            <td class="ab-criterion">Former Zoho employee leading the firm</td>
            <td><span class="ab-badge ab-badge-bad">No</span></td>
            <td><span class="ab-badge ab-badge-bad">Rarely</span></td>
            <td><span class="ab-compare-dash">&mdash;</span></td>
            <td class="ab-ma-cell"><span class="ab-badge ab-badge-good">Yes</span></td>
          </tr>
          <tr>
            <td class="ab-criterion">US-based English-speaking project management</td>
            <td><span class="ab-badge ab-badge-bad">No</span></td>
            <td><span class="ab-badge ab-badge-part">Varies</span></td>
            <td><span class="ab-badge ab-badge-bad">No</span></td>
            <td class="ab-ma-cell"><span class="ab-badge ab-badge-good">Texas</span></td>
          </tr>
          <tr>
            <td class="ab-criterion">Account-specific support (not ticket roulette)</td>
            <td><span class="ab-badge ab-badge-bad">No</span></td>
            <td><span class="ab-badge ab-badge-part">Sometimes</span></td>
            <td><span class="ab-badge ab-badge-bad">No</span></td>
            <td class="ab-ma-cell"><span class="ab-badge ab-badge-good">Always</span></td>
          </tr>
          <tr>
            <td class="ab-criterion">Long-term retainer mentality (not churn-and-burn)</td>
            <td><span class="ab-badge ab-badge-bad">No</span></td>
            <td><span class="ab-badge ab-badge-bad">No</span></td>
            <td><span class="ab-compare-dash">&mdash;</span></td>
            <td class="ab-ma-cell"><span class="ab-badge ab-badge-good">Yes</span></td>
          </tr>
          <tr>
            <td class="ab-criterion">Real AI integration &mdash; not just talk</td>
            <td><span class="ab-badge ab-badge-bad">No</span></td>
            <td><span class="ab-badge ab-badge-part">Talk</span></td>
            <td><span class="ab-badge ab-badge-bad">No</span></td>
            <td class="ab-ma-cell"><span class="ab-badge ab-badge-good">In practice</span></td>
          </tr>
          <tr>
            <td class="ab-criterion">Accountability tied to vendor referrals</td>
            <td><span class="ab-badge ab-badge-bad">None</span></td>
            <td><span class="ab-badge ab-badge-bad">None</span></td>
            <td><span class="ab-compare-dash">&mdash;</span></td>
            <td class="ab-ma-cell"><span class="ab-badge ab-badge-good">Direct</span></td>
          </tr>
          <tr>
            <td class="ab-criterion">Full implementation + support for small clients</td>
            <td><span class="ab-badge ab-badge-part">Piecemeal</span></td>
            <td><span class="ab-badge ab-badge-bad">Too expensive</span></td>
            <td><span class="ab-badge ab-badge-bad">No</span></td>
            <td class="ab-ma-cell"><span class="ab-badge ab-badge-good">\$2K/mo</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="ab-section">
  <div class="ab-inner">
    <div class="sl">Founder &amp; CEO</div>
    <div class="sh">The inside view of Zoho.<br><span style="color:var(--t)">Turned into a firm that works.</span></div>
    <p class="ab-intro-p">Paul Trinidad spent nearly three years selling Zoho from inside the company before starting Mirror Advisors. He saw every pattern &mdash; the partners who churn and burn, the support tickets lost in transit, the implementations that stall because nobody owns the outcome. Mirror Advisors is the firm he wished existed when he was referring deals out.</p>

    <div class="ab-leader">
      <div class="ab-leader-bio">
        <h3>Paul Trinidad<span>Founder &amp; CEO</span></h3>
        <p>Founded Mirror Advisors as a premier RevOps consultancy specializing in end-to-end business process automation on the Zoho platform. Architected and launched the &ldquo;Infinity Mirror&rdquo; framework &mdash; a productized recurring subscription model that gives mid-market firms a fractional Revenue Operations team for a flat monthly fee.</p>
        <p>Before Mirror Advisors, Paul was a Mid-Market Account Executive at Zoho Corporation selling CRM and Zoho One into the Canadian market &mdash; promoted within the region to handle companies of 30+ users as Zoho expanded its mid-market motion. He trained the Account Executives and SDRs who took over his territory, hit quarterly targets of \$150K, and ran monthly sales targets of \$75K on 2&ndash;3 month cycles.</p>
        <p>He carries that operator&#39;s view into every engagement. Mirror Advisors maintains a 70%+ profit margin offshore delivery model, top-tier channel partner status, and the long-term client retainers that come from actually solving the problem the first time.</p>
        <div class="ab-credit">BBA &middot; The University of Texas at Austin &mdash; McCombs School of Business &middot; Based in Greater Houston, Texas</div>
      </div>

      <div class="ab-stats">
        <div class="ab-stat-row">
          <div class="ab-stat-val">3 yrs</div>
          <div class="ab-stat-lbl">Inside Zoho &mdash; Mid-Market AE, Canada market</div>
        </div>
        <div class="ab-stat-row">
          <div class="ab-stat-val">2017</div>
          <div class="ab-stat-lbl">Selling Zoho One since launch year</div>
        </div>
        <div class="ab-stat-row">
          <div class="ab-stat-val">70%+</div>
          <div class="ab-stat-lbl">Profit margin on offshore delivery team</div>
        </div>
        <div class="ab-stat-row">
          <div class="ab-stat-val">\$150K</div>
          <div class="ab-stat-lbl">Quarterly quota carried and hit at Zoho</div>
        </div>
        <div class="ab-stat-row">
          <div class="ab-stat-val">3,000+</div>
          <div class="ab-stat-lbl">LinkedIn followers &mdash; active RevOps voice</div>
        </div>
      </div>
    </div>

    <div class="sl">Signature Moves</div>
    <div class="sh" style="font-size:clamp(22px,2.6vw,32px)">How Paul <span style="color:var(--t)">built the firm.</span></div>

    <div class="ab-moves">
      <div class="ab-move-card">
        <div class="ab-move-tag">Product</div>
        <div class="ab-move-headline">Infinity Mirror</div>
        <h4>Productized RevOps framework</h4>
        <p>Designed and launched the Infinity Mirror service &mdash; a flat-rate recurring model that replaces the one-off implementation cycle with a long-term RevOps partnership.</p>
      </div>
      <div class="ab-move-card blue">
        <div class="ab-move-tag">Margin</div>
        <div class="ab-move-headline">70%+</div>
        <h4>Offshore delivery, enterprise quality</h4>
        <p>Built and currently leads a cross-functional India and Philippines delivery team that holds a 70%+ profit margin while shipping enterprise-grade Zoho and custom software work.</p>
      </div>
      <div class="ab-move-card purple">
        <div class="ab-move-tag">Sales</div>
        <div class="ab-move-headline">\$75K/mo</div>
        <h4>Monthly quota at Zoho, consistently hit</h4>
        <p>Mid-Market Account Executive for the Canada territory. Ran 2&ndash;3 month sales cycles on Zoho CRM and Zoho One against a \$75K monthly target. Trained the AEs and SDRs who replaced him.</p>
      </div>
      <div class="ab-move-card">
        <div class="ab-move-tag">Channel</div>
        <div class="ab-move-headline">Premium</div>
        <h4>Partner status earned, not bought</h4>
        <p>Reached top-tier status in the Zoho ecosystem &mdash; driven by client satisfaction scores and technical delivery, not by marketing theatrics.</p>
      </div>
      <div class="ab-move-card blue">
        <div class="ab-move-tag">Trust</div>
        <div class="ab-move-headline">5&#9733;</div>
        <h4>Client reviews and Zoho referral flow</h4>
        <p>Secures long-term retainers with 5-star reviews and receives inbound deal referrals directly from Zoho &mdash; integrity most partners can&#39;t match because they&#39;ve never been inside the vendor.</p>
      </div>
      <div class="ab-move-card purple">
        <div class="ab-move-tag">Stack</div>
        <div class="ab-move-headline">Full-Stack</div>
        <h4>Lead-to-cash automation</h4>
        <p>Designed and deployed complex tech stacks for clients across industries &mdash; CRM, marketing automation, ERP &mdash; unified into single, automated sources of truth with executive-grade reporting.</p>
      </div>
    </div>
  </div>
</section>

<section class="ab-section alt">
  <div class="ab-inner">
    <div class="ab-divider"></div>
    <div class="sl">Managing Partner &amp; CTO</div>
    <div class="sh">Mirror Advisors brings something no other partner has:<br><span style="color:var(--t)">the enterprise buyer at the table.</span></div>
    <p class="ab-intro-p">Most Zoho partners have never sat on the other side of the desk. Mark Alberto has &mdash; for 25+ years. SVP of Technology at a \$2B insurance brokerage through IPO prep. Two decades running IT at a top-tier Philadelphia brokerage. The exact CIO/CTO profile most enterprise software vendors are trying to reach. Now he&#39;s on your side of the table &mdash; architecting your Zoho deployment with the seniority and judgment most partners can&#39;t bring.</p>

    <div class="ab-leader">
      <div class="ab-leader-bio">
        <h3>Mark Alberto<span>Managing Partner &amp; CTO</span></h3>
        <p>25+ years as the buyer Zoho sells to. Career CIO/CTO/VP profile &mdash; the exact persona Zoho&#39;s mid-market and enterprise AEs are trying to reach. Now on your side of the pitch.</p>
        <p>Most recently SVP of Technology at TWFG, a \$2B insurance brokerage where he led aggressive acquisition growth and IPO prep &mdash; unifying 200+ franchise branches and 20 corporate stores across 40 states onto a single SaaS, security, and management stack with 2,000 users. Exactly where Zoho shines and most partners fail.</p>
        <p>Mark speaks the SaaS P&amp;L. He partnered with the CEO and CFO on an 80% user-fee revenue lift and software capitalization, and delivered SOC 2 Type 1 and NYDFS compliance under live IPO pressure &mdash; an asset for any push into regulated verticals like financial services and insurance.</p>
        <div class="ab-credit">MBA Finance &middot; BA Computer Science &mdash; La Salle University &middot; Post-Grad, Generative AI for Business Applications &mdash; UT Austin, May 2026</div>
      </div>

      <div class="ab-stats">
        <div class="ab-stat-row">
          <div class="ab-stat-val">25+ yrs</div>
          <div class="ab-stat-lbl">CTO as the enterprise buyer</div>
        </div>
        <div class="ab-stat-row">
          <div class="ab-stat-val">\$2B</div>
          <div class="ab-stat-lbl">Brokerage scale led to IPO prep</div>
        </div>
        <div class="ab-stat-row">
          <div class="ab-stat-val">200+</div>
          <div class="ab-stat-lbl">Franchise branches unified onto one stack</div>
        </div>
        <div class="ab-stat-row">
          <div class="ab-stat-val">2,000</div>
          <div class="ab-stat-lbl">Users across 40 states</div>
        </div>
        <div class="ab-stat-row">
          <div class="ab-stat-val">4,000</div>
          <div class="ab-stat-lbl">Independent agents served via carrier portal</div>
        </div>
        <div class="ab-stat-row">
          <div class="ab-stat-val">+80%</div>
          <div class="ab-stat-lbl">SaaS user-fee revenue lift &mdash; alongside CEO &amp; CFO</div>
        </div>
        <div class="ab-stat-row">
          <div class="ab-stat-val">SOC 2</div>
          <div class="ab-stat-lbl">Type 1 &middot; NYDFS &mdash; delivered under IPO pressure</div>
        </div>
      </div>
    </div>

    <div class="sl">Why the CTO Profile Matters</div>
    <div class="sh" style="font-size:clamp(22px,2.6vw,32px)">Four reasons it changes <span style="color:var(--t)">how your project goes.</span></div>

    <div class="ab-edge-grid-4">
      <div class="ab-edge-card">
        <div class="ab-edge-num">A &middot; Enterprise Access</div>
        <h4>A partner who <span>gets into the CIO&#39;s calendar.</span></h4>
        <p>Most consultancies are strong with operators and ops leads. Moving the conversation upmarket requires leadership that can credibly walk into a CIO or CTO meeting. Mark has lived in those rooms for 25 years &mdash; so your project gets sponsorship at the level where decisions actually get made.</p>
        <div class="ab-edge-kicker">&rarr; Boardroom-grade conversations, not just integrations</div>
      </div>
      <div class="ab-edge-card">
        <div class="ab-edge-num">B &middot; M&amp;A Ready</div>
        <h4>Integration muscle for <span>fast-growing businesses.</span></h4>
        <p>Mark has unified 200+ franchise branches and 20 corporate stores into a single SaaS, security, and management stack through live IPO prep. If your business is acquiring, consolidating, or scaling fast, that&#39;s the exact playbook he&#39;s already run.</p>
        <div class="ab-edge-kicker">&rarr; A consolidation playbook, executed before</div>
      </div>
      <div class="ab-edge-card">
        <div class="ab-edge-num">C &middot; Revenue-Model Fluency</div>
        <h4>A partner that speaks <span>subscription economics.</span></h4>
        <p>Mark partnered with his CEO to redesign a national SaaS platform&#39;s fee structure &mdash; an 80% user-fee revenue lift &mdash; and implemented software capitalization with the CFO. Most partners can&#39;t have that conversation. This one can.</p>
        <div class="ab-edge-kicker">&rarr; Speaks SaaS &middot; speaks CFO &middot; speaks ops</div>
      </div>
      <div class="ab-edge-card">
        <div class="ab-edge-num">D &middot; Compliance &amp; Trust</div>
        <h4>SOC 2, NYDFS, <span>and the vocabulary of regulated industries.</span></h4>
        <p>Mark delivered SOC 2 Type 1 under IPO-prep pressure and designed a cyber risk program aligned with NYDFS 23 NYCRR 500. If you operate in financial services, insurance, healthcare, or any regulated vertical, having a CTO who has actually written these programs from the inside is a real asset.</p>
        <div class="ab-edge-kicker">&rarr; Enterprise trust credentials, not marketing claims</div>
      </div>
    </div>

    <div class="sl" style="margin-top:48px">Signature Achievements</div>
    <div class="sh" style="font-size:clamp(22px,2.6vw,32px)">Outcomes <span style="color:var(--t)">that moved the business.</span></div>

    <div class="ab-moves ab-moves-4">
      <div class="ab-move-card">
        <div class="ab-move-tag">Revenue</div>
        <div class="ab-move-headline">+80%</div>
        <h4>User fee-based revenue lift</h4>
        <p>Partnered with CEO to redesign fee structure on a national SaaS platform &mdash; 80% increase in user-fee revenue. Also implemented software capitalization with the CFO.</p>
      </div>
      <div class="ab-move-card green">
        <div class="ab-move-tag">Cost</div>
        <div class="ab-move-headline">\$200K/yr</div>
        <h4>Vendor cost reduction, permanent</h4>
        <p>Transitioned IP in-house and reduced near-shore contractor dependency. \$200K in annual savings and materially improved delivery resilience.</p>
      </div>
      <div class="ab-move-card blue">
        <div class="ab-move-tag">Cloud</div>
        <div class="ab-move-headline">Azure</div>
        <h4>Tenant established from scratch</h4>
        <p>Stood up enterprise Azure environment using Microsoft Cloud Adoption Framework. Secure by default, IaC-based DR, built to scale with national operations.</p>
      </div>
      <div class="ab-move-card red">
        <div class="ab-move-tag">Compliance</div>
        <div class="ab-move-headline">SOC 2</div>
        <h4>Type 1 compliance achieved</h4>
        <p>Modern identity controls, governance program, DR/BCP planning, and Information Security Program reviews &mdash; all delivered under IPO-prep pressure.</p>
      </div>
      <div class="ab-move-card purple">
        <div class="ab-move-tag">M&amp;A</div>
        <div class="ab-move-headline">200+ / 20</div>
        <h4>Branches and corporate stores integrated</h4>
        <p>Designed and executed post-merger integration &mdash; 200+ franchise branches and 20 corporate-owned stores unified into single SaaS, security, and management systems.</p>
      </div>
      <div class="ab-move-card">
        <div class="ab-move-tag">Analytics</div>
        <div class="ab-move-headline">\$1M</div>
        <h4>Proprietary claims platform delivered</h4>
        <p>Led strategic initiative at USI Insurance Services to build claims loss analytics &mdash; data ingestion, dashboards, carrier data-sharing agreements, legacy system retirement.</p>
      </div>
      <div class="ab-move-card blue">
        <div class="ab-move-tag">Delivery</div>
        <div class="ab-move-headline">Monthly</div>
        <h4>Release cadence with zero-downtime deploys</h4>
        <p>Revitalized stalled SaaS initiatives, instituted agile sprints, and rebuilt QA integration. Monthly release cadence, reduced defects, improved estimation accuracy.</p>
      </div>
      <div class="ab-move-card green">
        <div class="ab-move-tag">Ops</div>
        <div class="ab-move-headline">&minus;25%</div>
        <h4>Staffing reduction via loss analytics</h4>
        <p>Built proprietary loss analytics platform at The Graham Company &mdash; streamlined workflows reduced staffing needs 25%; client portal improved retention and engagement.</p>
      </div>
    </div>
  </div>
</section>

<section class="ab-section">
  <div class="ab-inner">
    <div class="sl">What Makes Us Different</div>
    <div class="sh">Eight edges. <span style="color:var(--t)">No filler.</span></div>
    <p class="ab-intro-p">Each one is a decision we made on purpose &mdash; and each one translates directly into an outcome for the client.</p>

    <div class="ab-edge-grid-8">
      <div class="ab-edge-card">
        <div class="ab-edge-num">01 &middot; Expertise</div>
        <h4>Led by a <span>former Zoho employee.</span></h4>
        <p>Paul spent nearly three years inside Zoho as an account executive selling CRM and Zoho One. Developers averaging six years of Zoho knowledge, with prior tours at Zoho&#39;s own partner company in India. You get product knowledge most partners fake.</p>
        <div class="ab-edge-kicker">&rarr; Strategy from someone who knows the roadmap</div>
      </div>
      <div class="ab-edge-card">
        <div class="ab-edge-num">02 &middot; US-Based</div>
        <h4>English-speaking PM <span>in Texas.</span></h4>
        <p>Someone you can actually call. Someone who picks up. Fires put out in business hours you recognize. That&#39;s what separates us from &ldquo;a team of developers&rdquo; &mdash; we run the project, not just write the code.</p>
        <div class="ab-edge-kicker">&rarr; Real accountability, real time zone</div>
      </div>
      <div class="ab-edge-card">
        <div class="ab-edge-num">03 &middot; Consulting</div>
        <h4>We tell you the <span>right way.</span></h4>
        <p>Zoho has massive feature overlap. Email campaigns in CRM or Zoho Campaigns? Invoices in CRM or Zoho Books? The wrong call compounds for years. We make the strategic decisions that keep your stack clean and your reporting honest.</p>
        <div class="ab-edge-kicker">&rarr; Architecture, not just implementation</div>
      </div>
      <div class="ab-edge-card">
        <div class="ab-edge-num">04 &middot; Insider View</div>
        <h4>I sold this product. <span>I know how it works.</span></h4>
        <p>Most partners don&#39;t understand that successful Zoho outcomes require both vendor and implementation partner pulling in sync. Paul ran the sales motion from inside Zoho and built Mirror Advisors on what he wished partners did differently.</p>
        <div class="ab-edge-kicker">&rarr; A perspective most partners can&#39;t copy</div>
      </div>
      <div class="ab-edge-card">
        <div class="ab-edge-num">05 &middot; Support</div>
        <h4>Support that <span>knows your account.</span></h4>
        <p>Zoho&#39;s support ships straight to India, ticket by ticket, with no memory of who you are. Most US partners aren&#39;t much better. We own support. We know your build. You call, we answer, we fix it.</p>
        <div class="ab-edge-kicker">&rarr; Nobody asking &ldquo;what account again?&rdquo;</div>
      </div>
      <div class="ab-edge-card">
        <div class="ab-edge-num">06 &middot; Affordable + Transparent</div>
        <h4>Premium-partner work, <span>without the premium ego.</span></h4>
        <p>Competitive rates for the level of experience on the team. And when Zoho sends us a deal, we protect that relationship &mdash; our name, our reputation, and yours. No sleazy internet-tag games. Real partnership. Real integrity.</p>
        <div class="ab-edge-kicker">&rarr; Referred by Zoho, accountable to you</div>
      </div>
      <div class="ab-edge-card">
        <div class="ab-edge-num">07 &middot; Infinity Mirror</div>
        <h4>Full Zoho One support <span>for \$2K a month.</span></h4>
        <p>Unheard of in the industry. Small and mid-size clients who want to use every app in Zoho One get complete implementation and ongoing support on a flat monthly retainer. No churn-and-burn project invoices. Just outcomes.</p>
        <div class="ab-edge-kicker">&rarr; The industry&#39;s &ldquo;game breaker&rdquo;</div>
      </div>
      <div class="ab-edge-card">
        <div class="ab-edge-num">08 &middot; AI in Practice</div>
        <h4>On the AI wave &mdash; <span>not talking about it.</span></h4>
        <p>We spend real hours in Claude every day. Building our own apps. Rewriting our pre-sales process. Shipping integrations. Everyone says &ldquo;we&#39;re using AI.&rdquo; We&#39;re actually doing the work &mdash; and clients feel the difference in speed, clarity, and cost.</p>
        <div class="ab-edge-kicker">&rarr; Prompts, proofs of concept, and production</div>
      </div>
    </div>
  </div>
</section>

<div class="ctas">
  <div class="ctasg"></div>
  <h2 class="ctash">Want to work with the firm Zoho refers to?</h2>
  <p class="ctasp">Book a 30-minute call. We&#39;ll tell you honestly whether we&#39;re the right partner for what you&#39;re trying to do.</p>
  <div class="ctasb">
    <a href="#" onclick="go('contact')"><button class="bp" style="padding:14px 34px;font-size:15px">Book a Strategy Session <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a>
    <a href="#" onclick="go('cases')"><button class="bs" style="padding:13px 26px">See Case Studies</button></a>
  </div>
</div>
`,
  'services': `
<div class="ph">
  <div class="ph-grid"></div>
  <div class="ph-glow" style="top:30%;right:10%;width:500px;height:400px;background:radial-gradient(ellipse,rgba(236,169,52,.07),transparent 65%)"></div>
  <div class="ph-in ph-in-split">
    <div>
      <div class="badge">Our Practice</div>
      <h1 style="font-family:'Montserrat',sans-serif;font-size:clamp(42px,5vw,68px);font-weight:800;line-height:1.06;letter-spacing:-.035em;margin-bottom:24px">Every Engagement<br><span style="color:var(--t)">Starts With Scope.</span></h1>
      <p class="ph-sub">Four disciplines, one practice. Before any build begins, we understand your systems, your logic, and your goals. Scope is the fixed-fee discovery that makes everything else possible.</p>
    </div>
    <div class="svc-hero-right">
      <div class="inf3d-wrap">
        <div class="inf3d-glow"></div>
        <div class="inf3d-ring"></div>
        <div class="inf3d-ring"></div>
<svg class="inf3d-svg" width="220" height="110" viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M110 55 C110 55 90 10 55 10 C25 10 5 30 5 55 C5 80 25 100 55 100 C90 100 110 55 110 55 C110 55 130 10 165 10 C195 10 215 30 215 55 C215 80 195 100 165 100 C130 100 110 55 110 55 Z" stroke="#ECA934" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M110 55 C110 55 94 26 68 20 C50 16 32 26 22 40" stroke="rgba(255,220,120,.5)" stroke-width="3" stroke-linecap="round"/><path d="M110 55 C110 55 126 26 152 20 C170 16 188 26 198 40" stroke="rgba(255,220,120,.5)" stroke-width="3" stroke-linecap="round"/><path d="M110 55 C110 55 91 84 65 90 C47 94 28 84 18 70" stroke="rgba(180,110,0,.4)" stroke-width="3" stroke-linecap="round"/><path d="M110 55 C110 55 129 84 155 90 C173 94 192 84 202 70" stroke="rgba(180,110,0,.4)" stroke-width="3" stroke-linecap="round"/></svg>
      </div>
    </div>
  </div>
</div>
<section class="sec" style="background:#0C0F22;border-bottom:1px solid rgba(255,255,255,.08)">
  <div class="si">
    <div class="sl">Step One — Always</div>
    <div class="sh">The Scope Engagement</div>
    <p class="sp">Everything starts here. No exceptions.</p>
    <div class="scope-gateway">
      <div class="scope-card-main">
        <div class="scope-card-inner">
          <div class="scope-top"><div class="scope-badge-pill">Starting Point</div></div>
          <div class="scope-title">Scope <span class="scope-sub-title">/ Blueprinting</span></div>
          <p class="scope-desc">A fixed-fee discovery engagement. We audit your systems, interview stakeholders, map your business logic, and deliver a comprehensive technical blueprint — before a single line of code is written.</p>
          <div class="scope-meta-row">
            <div><div class="scope-meta-lbl">Duration</div><div class="scope-meta-val">2&ndash;4 weeks</div></div>
            <div><div class="scope-meta-lbl">Pricing</div><div class="scope-meta-val">Fixed Fee</div></div>
            <div><div class="scope-meta-lbl">Best for</div><div class="scope-meta-val">Every new client</div></div>
          </div>
          <div class="scope-delivers">
            <div class="scope-delivers-label">What you get</div>
            <div class="scope-delivers-grid">
              <div class="scope-deliver-item"><span class="scope-check">&#10003;</span> System &amp; process audit</div>
              <div class="scope-deliver-item"><span class="scope-check">&#10003;</span> Stakeholder interviews</div>
              <div class="scope-deliver-item"><span class="scope-check">&#10003;</span> Technical blueprint doc</div>
              <div class="scope-deliver-item"><span class="scope-check">&#10003;</span> Automation opportunity map</div>
              <div class="scope-deliver-item"><span class="scope-check">&#10003;</span> Recommended service path</div>
              <div class="scope-deliver-item"><span class="scope-check">&#10003;</span> ROI estimates per item</div>
            </div>
          </div>
          <a href="#" onclick="go(&#39;contact&#39;)"><button class="bp">Start With Scope <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a>
        </div>
      </div>
      <div class="scope-arrow-col">
        <div class="scope-arrow-line"></div>
        <div class="scope-arrow-label">Scope reveals which path fits</div>
        <div style="color:rgba(255,255,255,.3)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>
      </div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="si">
    <div class="sl">What We Build</div>
    <div class="sh">Four Disciplines, One Practice</div>
    <p class="sp">We don&#39;t silo our expertise. Every engagement draws from all four disciplines &mdash; AI, consulting, integration, and ERP &mdash; to solve your actual problem.</p>

    <!-- AI Apps -->
    <div class="cap-detail">
      <div class="cap-d-left">
        <div class="cap-d-label" style="background:rgba(236,169,52,.1);border:1px solid rgba(236,169,52,.2);color:#ECA934">01 &mdash; AI-Powered Apps</div>
        <div class="cap-d-h">Your Business Generates Data All Day. Most of It Never Gets Used.</div>
        <p class="cap-d-p">We build AI systems that actually work inside your existing tools &mdash; not standalone demos. Claude-powered agents connected to your CRM, your docs, your data, doing real work without needing a human in the loop.</p>
        <div class="use-cases">
          <div class="uc"><div class="uc-dot" style="background:#ECA934"></div><div class="uc-text">Lead scoring &amp; qualification agents that analyze engagement signals and rank pipeline automatically</div></div>
          <div class="uc"><div class="uc-dot" style="background:#ECA934"></div><div class="uc-text">Document generation bots &mdash; proposals, contracts, SOWs &mdash; trained on your templates</div></div>
          <div class="uc"><div class="uc-dot" style="background:#ECA934"></div><div class="uc-text">Internal Q&amp;A assistants that answer questions from your knowledge base</div></div>
          <div class="uc"><div class="uc-dot" style="background:#ECA934"></div><div class="uc-text">Automated reporting that narrates your data in plain language every week</div></div>
        </div>
        <div class="tech-tags"><span class="tt">Claude API</span><span class="tt">Zoho Deluge</span><span class="tt">Webhooks</span><span class="tt">Custom RAG</span><span class="tt">MCP Servers</span></div>
        <a href="#" onclick="go(&#39;contact&#39;)"><button class="bp" style="font-size:13px;padding:11px 22px">Add AI to Your Business <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a>
      </div>
      <div class="cap-d-right">
        <div class="vis-panel">
          <div class="vis-glow" style="background:radial-gradient(circle,rgba(236,169,52,.08),transparent 70%)"></div>
          <div class="vis-title">Claude CRM Agent &mdash; Live</div>
          <div class="ai-chat">
            <div class="msg user">Summarize the Nexus Corp deal and draft a follow-up email for tomorrow.</div>
            <div class="msg ai"><strong>Nexus Corp &mdash; \$124k Proposal</strong><br><br>Last contact: 5 days ago. Engagement score dropped 18% this week. They opened your proposal 3 times but haven&#39;t replied.<br><br>&#128231; Draft follow-up ready &mdash; references their Q3 go-live goal and the specific integration they asked about. Want me to send it or adjust tone?</div>
            <div class="msg user">Send it, and flag any other deals with similar decay patterns.</div>
            <div class="ai-typing"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Consulting -->
    <div class="cap-detail rev">
      <div class="cap-d-left">
        <div class="cap-d-label" style="background:rgba(107,159,212,.1);border:1px solid rgba(107,159,212,.2);color:#6B9FD4">02 &mdash; Business Consulting</div>
        <div class="cap-d-h">Most Technology Problems Are Actually Process Problems in Disguise.</div>
        <p class="cap-d-p">We map your processes, challenge your assumptions, and build a technology roadmap you&#39;ll actually execute. Strategy without implementation is just a document. We do both.</p>
        <div class="use-cases">
          <div class="uc"><div class="uc-dot" style="background:#6B9FD4"></div><div class="uc-text">Full technology audits &mdash; what you have, what you&#39;re paying, what&#39;s redundant, what&#39;s missing</div></div>
          <div class="uc"><div class="uc-dot" style="background:#6B9FD4"></div><div class="uc-text">Automation opportunity mapping with ROI estimates for each identified workflow</div></div>
          <div class="uc"><div class="uc-dot" style="background:#6B9FD4"></div><div class="uc-text">Pre-ERP blueprinting to avoid the most common implementation failure modes</div></div>
          <div class="uc"><div class="uc-dot" style="background:#6B9FD4"></div><div class="uc-text">Vendor selection &mdash; independent advice on the right tools for your actual use case</div></div>
        </div>
        <div class="tech-tags"><span class="tt">Process Mapping</span><span class="tt">ROI Analysis</span><span class="tt">Tech Audit</span><span class="tt">Gap Analysis</span></div>
        <a href="#" onclick="go(&#39;contact&#39;)"><button class="bp" style="font-size:13px;padding:11px 22px;background:#6B9FD4">Start with a Scope <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a>
      </div>
      <div class="cap-d-right">
        <div class="vis-panel" style="animation-delay:-3s">
          <div class="vis-glow" style="background:radial-gradient(circle,rgba(107,159,212,.08),transparent 70%)"></div>
          <div class="vis-title">Scope Deliverable &mdash; Sample</div>
          <div style="display:flex;flex-direction:column;gap:14px">
            <div style="padding:12px 14px;border-radius:9px;background:rgba(107,159,212,.07);border:1px solid rgba(107,159,212,.2)">
              <div style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;color:#6B9FD4;margin-bottom:4px">AUTOMATION OPPORTUNITY #1</div>
              <div style="font-size:12px;color:var(--tx);font-weight:500;margin-bottom:3px">Invoice &rarr; CRM &rarr; Project Creation</div>
              <div style="font-size:11px;color:var(--dim)">Currently: 45 min manual. Automatable in: 3 days. Est. annual saving: \$18,400</div>
            </div>
            <div style="padding:12px 14px;border-radius:9px;background:rgba(236,169,52,.06);border:1px solid rgba(236,169,52,.15)">
              <div style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;color:var(--t);margin-bottom:4px">AUTOMATION OPPORTUNITY #2</div>
              <div style="font-size:12px;color:var(--tx);font-weight:500;margin-bottom:3px">Support Ticket &rarr; AI Triage &rarr; Assign</div>
              <div style="font-size:11px;color:var(--dim)">Currently: 2-4h SLA breach risk. Automatable in: 5 days. Est. saving: \$31,200</div>
            </div>
            <div style="padding:12px 14px;border-radius:9px;background:rgba(139,159,212,.06);border:1px solid rgba(139,159,212,.15)">
              <div style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;color:#8B9FD4;margin-bottom:4px">AUTOMATION OPPORTUNITY #3</div>
              <div style="font-size:12px;color:var(--tx);font-weight:500;margin-bottom:3px">Contract Generation from Deal Close</div>
              <div style="font-size:11px;color:var(--dim)">Currently: 90 min legal review. Automatable in: 2 weeks. Est. saving: \$54,000</div>
            </div>
            <div style="text-align:right;font-family:'Montserrat',sans-serif;font-size:13px;font-weight:700;color:var(--t)">Total identified: \$103,600/yr &rarr;</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Integration -->
    <div class="cap-detail">
      <div class="cap-d-left">
        <div class="cap-d-label" style="background:rgba(139,159,212,.1);border:1px solid rgba(139,159,212,.2);color:#8B9FD4">03 &mdash; Systems Integration</div>
        <div class="cap-d-h">You Have the Tools. They Just Don&rsquo;t Know Each Other Exists.</div>
        <p class="cap-d-p">Most businesses run 8&ndash;14 software tools that were never designed to talk to each other. Every manual export, copy-paste, and re-entry is a tax on your team&rsquo;s time. We build the connections that make your stack behave like one system.</p>
        <div class="use-cases">
          <div class="uc"><div class="uc-dot" style="background:#8B9FD4"></div><div class="uc-text">CRM &harr; Accounting sync &mdash; deals closed in Zoho flow automatically into Books as invoices</div></div>
          <div class="uc"><div class="uc-dot" style="background:#8B9FD4"></div><div class="uc-text">E-commerce &harr; ERP &harr; 3PL &mdash; orders, inventory, and fulfillment in a single real-time loop</div></div>
          <div class="uc"><div class="uc-dot" style="background:#8B9FD4"></div><div class="uc-text">Legacy system migrations &mdash; extract, transform, and load from any old system into your new one</div></div>
          <div class="uc"><div class="uc-dot" style="background:#8B9FD4"></div><div class="uc-text">Webhook architectures that trigger actions across tools the moment an event happens</div></div>
        </div>
        <div class="tech-tags"><span class="tt">REST APIs</span><span class="tt">Webhooks</span><span class="tt">Zoho Flow</span><span class="tt">Custom ETL</span><span class="tt">iPaaS</span></div>
      </div>
      <div class="cap-d-right">
        <div class="vis-panel">
          <div class="vis-glow" style="background:radial-gradient(circle,rgba(139,159,212,.08),transparent 70%)"></div>
          <div class="vis-title">Live Integration Map</div>
          <div class="int-flow">
            <div class="int-row"><div class="int-box" style="border-color:rgba(107,159,212,.3);color:#6B9FD4">Shopify</div><div class="int-arrow">&rarr;</div><div class="int-box" style="border-color:rgba(236,169,52,.3);color:var(--t)">Zoho Inventory</div></div>
            <div class="int-row"><div class="int-box" style="border-color:rgba(236,169,52,.3);color:var(--t)">Zoho CRM</div><div class="int-arrow">&harr;</div><div class="int-box" style="border-color:rgba(236,169,52,.3);color:var(--t)">Zoho Books</div></div>
            <div class="int-row"><div class="int-box" style="border-color:rgba(236,169,52,.3);color:#ECA934">3PL Warehouse</div><div class="int-arrow">&larr;</div><div class="int-box" style="border-color:rgba(236,169,52,.3);color:var(--t)">Zoho Inventory</div></div>
            <div class="int-row"><div class="int-box" style="border-color:rgba(139,159,212,.3);color:#8B9FD4">HubSpot</div><div class="int-arrow">&rarr;</div><div class="int-box" style="border-color:rgba(236,169,52,.3);color:var(--t)">Zoho Desk</div></div>
          </div>
          <div style="margin-top:14px;padding:10px 12px;border-radius:8px;background:rgba(236,169,52,.06);border:1px solid rgba(236,169,52,.15);font-size:11px;color:var(--t)">&#9889; All flows real-time via webhooks &mdash; avg latency &lt;200ms</div>
        </div>
      </div>
    </div>

    <!-- ERP -->
    <div class="cap-detail rev">
      <div class="cap-d-left">
        <div class="cap-d-label" style="background:rgba(236,169,52,.1);border:1px solid rgba(236,169,52,.2);color:#ECA934">04 &mdash; ERP Implementation</div>
        <div class="cap-d-h">Your Current System Is Holding the Business Back. Here&rsquo;s How You Replace It Without Breaking Everything.</div>
        <p class="cap-d-p">ERP implementations have a notorious failure rate. Ours don&#39;t miss. We&#39;ve deployed Zoho One across complex multi-entity organizations, migrated from legacy ERPs, and trained teams to actually use what we build.</p>
        <div class="use-cases">
          <div class="uc"><div class="uc-dot" style="background:#ECA934"></div><div class="uc-text">Zoho One full-suite rollouts for companies with 20&ndash;500 employees across multiple entities</div></div>
          <div class="uc"><div class="uc-dot" style="background:#ECA934"></div><div class="uc-text">Legacy ERP migrations &mdash; data extraction, cleansing, transformation, and import</div></div>
          <div class="uc"><div class="uc-dot" style="background:#ECA934"></div><div class="uc-text">Custom Zoho Creator apps that extend standard modules with your unique business logic</div></div>
          <div class="uc"><div class="uc-dot" style="background:#ECA934"></div><div class="uc-text">User training, documentation, and a dedicated post-go-live support window &mdash; so your team is confident on day one, not figuring things out on their own</div></div>
        </div>
        <div class="tech-tags"><span class="tt">Zoho One</span><span class="tt">Zoho Creator</span><span class="tt">Data Migration</span><span class="tt">Multi-entity</span><span class="tt">Change Mgmt</span></div>
      </div>
      <div class="cap-d-right">
        <div class="vis-panel" style="animation-delay:-5s">
          <div class="vis-glow" style="background:radial-gradient(circle,rgba(236,169,52,.08),transparent 70%)"></div>
          <div class="vis-title">ERP Rollout Progress</div>
          <div class="phase-list">
            <div class="phase-row"><div class="phase-label">Discovery</div><div class="phase-bar-track"><div class="phase-bar-fill" style="--w:100%;width:100%;background:#ECA934"></div></div><div class="phase-pct">100%</div></div>
            <div class="phase-row"><div class="phase-label">Architecture</div><div class="phase-bar-track"><div class="phase-bar-fill" style="--w:100%;width:100%;background:#ECA934"></div></div><div class="phase-pct">100%</div></div>
            <div class="phase-row"><div class="phase-label">Configuration</div><div class="phase-bar-track"><div class="phase-bar-fill" style="--w:87%;width:87%;background:#6B9FD4"></div></div><div class="phase-pct">87%</div></div>
            <div class="phase-row"><div class="phase-label">Data Migration</div><div class="phase-bar-track"><div class="phase-bar-fill" style="--w:60%;width:60%;background:#8B9FD4"></div></div><div class="phase-pct">60%</div></div>
            <div class="phase-row"><div class="phase-label">UAT</div><div class="phase-bar-track"><div class="phase-bar-fill" style="--w:20%;width:20%;background:rgba(255,255,255,.2)"></div></div><div class="phase-pct" style="color:var(--dim)">20%</div></div>
            <div class="phase-row"><div class="phase-label">Training</div><div class="phase-bar-track"><div class="phase-bar-fill" style="--w:0%;width:0%"></div></div><div class="phase-pct" style="color:var(--dim)">&mdash;</div></div>
          </div>
          <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">
            <span style="font-size:10px;padding:3px 9px;border-radius:100px;background:rgba(236,169,52,.1);color:var(--t);font-family:'Montserrat',sans-serif;font-weight:700">On Track</span>
            <span style="font-size:10px;padding:3px 9px;border-radius:100px;background:rgba(255,255,255,.06);color:var(--mid);font-family:'Montserrat',sans-serif;font-weight:700">7 entities</span>
            <span style="font-size:10px;padding:3px 9px;border-radius:100px;background:rgba(255,255,255,.06);color:var(--mid);font-family:'Montserrat',sans-serif;font-weight:700">Go-live: Week 14</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

<section class="sec" style="background:#0C0F22;border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08)">
  <div class="si">
    <div class="sl">How We Engage</div>
    <div class="sh">Your Four Paths Forward</div>
    <p class="sp">Once Scope is complete, we will know exactly which of these fits your situation.</p>
    <div class="paths-grid" id="pathsGrid"></div>
  </div>
</section>
<section class="sec">
  <div class="si">
    <div class="sl">The Full Journey</div>
    <div class="sh">From First Call to Go-Live</div>
    <p class="sp">Every engagement follows the same proven sequence.</p>
    <div class="journey-track">
      <div class="journey-step"><div class="js-node js-node-gold"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.92 3.33A2 2 0 0 1 3.9 1.17h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.94 5.94l1.2-1.17a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div class="js-content"><div class="js-tag">Day 1</div><div class="js-title">Discovery Call</div><div class="js-desc">30 minutes. We listen. You ask anything.</div></div></div>
      <div class="journey-connector"></div>
      <div class="journey-step"><div class="js-node js-node-gold"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></div><div class="js-content"><div class="js-tag">Week 1-4</div><div class="js-title">Scope Engagement</div><div class="js-desc">Audit, blueprint, recommendations. Fixed fee. Required for all new clients.</div></div></div>
      <div class="journey-connector"></div>
      <div class="journey-step"><div class="js-node js-node-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6l4-4 4 4M12 2v10.3M4 12c0 4.4 3.6 8 8 8s8-3.6 8-8"/></svg></div><div class="js-content"><div class="js-tag" style="color:var(--dim)">Post-Scope</div><div class="js-title">Path Selection</div><div class="js-desc">We present our recommendation. You choose your path.</div></div></div>
      <div class="journey-connector journey-connector-branch"></div>
      <div class="journey-paths-row">
        <div class="journey-path-mini" style="border-color:rgba(107,159,212,.3)"><div class="jpm-icon" style="color:var(--bl)">&#9670;</div><div class="jpm-name">ERP Projects</div><div class="jpm-time">3-18 months</div></div>
        <div class="journey-path-mini" style="border-color:rgba(236,169,52,.28)"><div class="jpm-icon" style="color:var(--t)">&#8734;</div><div class="jpm-name">Infinity Mirror</div><div class="jpm-time">Rolling monthly</div></div>
        <div class="journey-path-mini" style="border-color:rgba(255,255,255,.15)"><div class="jpm-icon" style="color:rgba(255,255,255,.6)">&#9201;</div><div class="jpm-name">Bank of Hours</div><div class="jpm-time">Flexible</div></div>
        <div class="journey-path-mini" style="border-color:rgba(255,255,255,.15)"><div class="jpm-icon" style="color:rgba(255,255,255,.6)">&#9881;</div><div class="jpm-name">Support Only</div><div class="jpm-time">Ongoing SLA</div></div>
      </div>
    </div>
  </div>
</section>
<section class="sec">
  <div class="si" style="max-width:780px">
    <div class="sl">Common Questions</div>
    <div class="sh">Frequently Asked</div>
    <div class="faq-list" id="faqList"></div>
  </div>
</section>
<div class="ctas"><div class="ctas-glow"></div><h2>Ready to Start With Scope?</h2><p>Book a free 30-minute call. We will confirm Scope is the right first step and explain what you will get.</p><div class="ctas-btns"><a href="#" onclick="go(&#39;contact&#39;)"><button class="bp" style="padding:14px 34px;font-size:15px">Book a Strategy Session</button></a><a href="#" onclick="go(&#39;cases&#39;)"><button class="bs" style="padding:13px 26px">See Case Studies</button></a></div></div>
`,
  'erp': `<div class="sd-hero" style="background:radial-gradient(ellipse at 70% 30%,rgba(107,159,212,.09) 0%,transparent 60%),#080B1A"><div class="sd-hero-grid"></div><div class="sd-hero-inner"><div><div class="sd-hero-nav"><div class="sd-hero-back" onclick="go('services')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to Services</div><div class="sd-tag" style="background:rgba(107,159,212,.12);border:1px solid rgba(107,159,212,.25);color:#6B9FD4"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> ERP Projects</div></div><h1 class="sd-h1">Enterprise Builds<br><span style="color:#6B9FD4">That Actually Go Live.</span></h1><p class="sd-lead">Full-lifecycle ERP project delivery with defined milestones, a dedicated team, and a go-live commitment. For complex, multi-phase Zoho One deployments that demand serious architectural thinking.</p><div class="sd-meta-row"><div class="sd-meta-item"><div class="sd-meta-k">Timeline</div><div class="sd-meta-v" style="color:#6B9FD4">3-18 months</div></div><div class="sd-meta-item"><div class="sd-meta-k">Pricing</div><div class="sd-meta-v" style="color:#6B9FD4">Project-Based</div></div><div class="sd-meta-item"><div class="sd-meta-k">Starts With</div><div class="sd-meta-v" style="color:var(--t)">Scope</div></div></div><div style="display:flex;gap:12px;flex-wrap:wrap"><a href="#" onclick="go('contact')"><button class="bp" style="padding:13px 28px">Start With Scope</button></a><a href="#" onclick="go('cases')"><button class="bs" style="padding:12px 22px">View Case Studies</button></a></div></div><div><div style="background:rgba(255,255,255,.04);border:1px solid rgba(107,159,212,.2);border-radius:20px;padding:32px"><div style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;color:rgba(107,159,212,.8);text-transform:uppercase;letter-spacing:.09em;margin-bottom:20px">ERP Rollout Progress</div><div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:12px;color:var(--mid)">Discovery & Scope</span><span style="font-size:11px;font-weight:700;color:#ECA934">100%</span></div><div style="height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden"><div style="height:100%;width:100%;background:#ECA934;border-radius:3px"></div></div></div><div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:12px;color:var(--mid)">Architecture Design</span><span style="font-size:11px;font-weight:700;color:#ECA934">100%</span></div><div style="height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden"><div style="height:100%;width:100%;background:#ECA934;border-radius:3px"></div></div></div><div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:12px;color:var(--mid)">Configuration</span><span style="font-size:11px;font-weight:700;color:#6B9FD4">85%</span></div><div style="height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden"><div style="height:100%;width:85%;background:#6B9FD4;border-radius:3px"></div></div></div><div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:12px;color:var(--mid)">Data Migration</span><span style="font-size:11px;font-weight:700;color:#6B9FD4">62%</span></div><div style="height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden"><div style="height:100%;width:62%;background:#6B9FD4;border-radius:3px"></div></div></div><div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:12px;color:var(--mid)">UAT</span><span style="font-size:11px;font-weight:700;color:#8B9FD4">24%</span></div><div style="height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden"><div style="height:100%;width:24%;background:#8B9FD4;border-radius:3px"></div></div></div><div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:12px;color:var(--mid)">Training & Handoff</span><span style="font-size:11px;font-weight:700;color:rgba(255,255,255,.15)">0%</span></div><div style="height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden"><div style="height:100%;width:0%;background:rgba(255,255,255,.15);border-radius:3px"></div></div></div></div></div></div></div><div class="sd-stats-row" style="max-width:1180px;margin:0 auto;padding:60px 40px 0"><div class="sd-stat" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)"><div class="sd-stat-val" style="color:#6B9FD4">40+</div><div class="sd-stat-lbl">ERP Deployments Delivered</div></div><div class="sd-stat" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)"><div class="sd-stat-val" style="color:#6B9FD4">12M+</div><div class="sd-stat-lbl">Records Migrated</div></div><div class="sd-stat" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)"><div class="sd-stat-val" style="color:#6B9FD4">98%</div><div class="sd-stat-lbl">On-Time Delivery Rate</div></div></div><section class="sd-section"><div class="sd-inner"><div class="sd-2col sd-2col-center"><div><div class="sl">What We Deliver</div><div class="sh">Everything You Need.</div><div class="sd-feature-list" style="margin-top:28px"><div class="sd-feature"><div class="sd-feature-icon" style="background:rgba(107,159,212,.1);border:1px solid rgba(107,159,212,.2)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B9FD4" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div><div><div class="sd-feature-t">Architecture Design</div><div class="sd-feature-d">We map your entire data model before touching the platform. No guesswork, no rebuilds.</div></div></div><div class="sd-feature"><div class="sd-feature-icon" style="background:rgba(107,159,212,.1);border:1px solid rgba(107,159,212,.2)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B9FD4" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div><div><div class="sd-feature-t">Multi-Entity Deployment</div><div class="sd-feature-d">Single or multi-entity — we handle consolidation, inter-company transactions, and shared workflows.</div></div></div><div class="sd-feature"><div class="sd-feature-icon" style="background:rgba(107,159,212,.1);border:1px solid rgba(107,159,212,.2)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B9FD4" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div><div><div class="sd-feature-t">Data Migration</div><div class="sd-feature-d">We extract, clean, transform, and load your historical data with full verification and zero loss.</div></div></div><div class="sd-feature"><div class="sd-feature-icon" style="background:rgba(107,159,212,.1);border:1px solid rgba(107,159,212,.2)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B9FD4" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div><div><div class="sd-feature-t">Training & Hypercare</div><div class="sd-feature-d">User training, documentation, and a dedicated hypercare window so your team hits the ground running.</div></div></div></div></div><div><div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:32px"><div style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.09em;margin-bottom:20px">Project Phases</div><div style="display:flex;gap:14px;padding-bottom:20px"><div style="width:32px;height:32px;border-radius:50%;background:rgba(236,169,52,.15);border:2px solid rgba(236,169,52,.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;color:#ECA934">1</div><div><div style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:700;color:var(--tx);margin-bottom:2px">Scope & Blueprint</div><div style="font-size:12px;color:var(--dim);line-height:1.55">Systems audit, data model, architecture doc</div></div></div><div style="display:flex;gap:14px;padding-bottom:20px"><div style="width:32px;height:32px;border-radius:50%;background:rgba(107,159,212,.12);border:2px solid rgba(107,159,212,.35);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;color:#6B9FD4">2</div><div><div style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:700;color:var(--tx);margin-bottom:2px">Configuration</div><div style="font-size:12px;color:var(--dim);line-height:1.55">Platform build, workflows, automations</div></div></div><div style="display:flex;gap:14px;padding-bottom:20px"><div style="width:32px;height:32px;border-radius:50%;background:rgba(107,159,212,.12);border:2px solid rgba(107,159,212,.35);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;color:#6B9FD4">3</div><div><div style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:700;color:var(--tx);margin-bottom:2px">Migration</div><div style="font-size:12px;color:var(--dim);line-height:1.55">Data extract, transform, clean, load</div></div></div><div style="display:flex;gap:14px;padding-bottom:20px"><div style="width:32px;height:32px;border-radius:50%;background:rgba(139,159,212,.1);border:2px solid rgba(139,159,212,.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;color:#8B9FD4">4</div><div><div style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:700;color:var(--tx);margin-bottom:2px">UAT</div><div style="font-size:12px;color:var(--dim);line-height:1.55">User acceptance testing, bug fixes, sign-off</div></div></div><div style="display:flex;gap:14px;padding-bottom:20px"><div style="width:32px;height:32px;border-radius:50%;background:rgba(236,169,52,.15);border:2px solid rgba(236,169,52,.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;color:#ECA934">5</div><div><div style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:700;color:var(--tx);margin-bottom:2px">Go-Live</div><div style="font-size:12px;color:var(--dim);line-height:1.55">Cutover, hypercare, training, documentation</div></div></div></div></div></div></div></section><div class="sd-cta-banner"><div><div class="sd-cta-h">Ready to Start Your ERP Project?</div><p class="sd-cta-p">Every project starts with Scope. Book a call and we will walk you through exactly what your deployment would look like.</p></div><a href="#" onclick="go('contact')"><button class="bp" style="padding:14px 32px;font-size:15px;white-space:nowrap">Start With Scope <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a></div>`,
  'infinity': `<div class="sd-hero" style="background:radial-gradient(ellipse at 60% 40%,rgba(139,159,212,.08) 0%,transparent 60%),#080B1A"><div class="sd-hero-grid"></div><div class="sd-hero-inner"><div><div class="sd-hero-nav"><div class="sd-hero-back" onclick="go('services')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to Services</div><div class="sd-tag" style="background:rgba(236,169,52,.12);border:1px solid rgba(236,169,52,.3);color:var(--t)">Infinity Mirror</div></div><h1 class="sd-h1">Your Technology,<br><span style="color:var(--t)">Always Evolving.</span></h1><p class="sd-lead">A continuous development partnership that never ends. Monthly retainer, rolling priorities, no SOW friction. We become your embedded technology team.</p><div class="sd-meta-row"><div class="sd-meta-item"><div class="sd-meta-k">Commitment</div><div class="sd-meta-v" style="color:var(--t)">Month-to-Month</div></div><div class="sd-meta-item"><div class="sd-meta-k">Pricing</div><div class="sd-meta-v" style="color:var(--t)">Monthly Retainer</div></div><div class="sd-meta-item"><div class="sd-meta-k">Cancel</div><div class="sd-meta-v" style="color:var(--t)">Anytime, 30 days</div></div></div><div style="display:flex;gap:12px;flex-wrap:wrap"><a href="#" onclick="go('contact')"><button class="bp" style="padding:13px 28px">Get Started</button></a><a href="#" onclick="go('cases')"><button class="bs" style="padding:12px 22px">See Results</button></a></div></div><div style="position:relative;height:320px;display:flex;align-items:center;justify-content:center"><div style="position:absolute;width:220px;height:220px;border-radius:50%;border:1px solid rgba(236,169,52,.15);animation:imRingPulse 4s ease-in-out infinite;top:50%;left:50%;transform:translate(-50%,-50%)"></div><div style="position:absolute;width:300px;height:300px;border-radius:50%;border:1px solid rgba(139,159,212,.12);animation:imRingPulse 4s ease-in-out infinite;animation-delay:-1.3s;top:50%;left:50%;transform:translate(-50%,-50%)"></div><div style="position:absolute;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(236,169,52,.25),rgba(236,169,52,.05) 60%,transparent);animation:imGlowPulse 3s ease-in-out infinite"></div><div style="font-size:64px;color:var(--t);text-shadow:0 0 40px rgba(236,169,52,.6);animation:imSymbolFloat 5s ease-in-out infinite;position:relative;z-index:2;font-family:Montserrat,sans-serif;font-weight:900">&#8734;</div><div style="position:absolute;top:18%;right:14%;background:rgba(8,11,26,.92);border:1px solid rgba(236,169,52,.3);border-radius:10px;padding:6px 12px;font-size:10px;font-family:Montserrat,sans-serif;font-weight:800;color:var(--t);animation:imTagFloat 6s ease-in-out infinite">Always Shipping</div><div style="position:absolute;bottom:22%;left:4%;background:rgba(8,11,26,.92);border:1px solid rgba(107,159,212,.3);border-radius:10px;padding:6px 12px;font-size:10px;font-family:Montserrat,sans-serif;font-weight:800;color:#6B9FD4;animation:imTagFloat 6s ease-in-out infinite;animation-delay:-4s">Rolling Priorities</div></div></div></div><div class="sd-stats-row" style="max-width:1180px;margin:0 auto;padding:60px 40px 0">
  <div class="sd-stat" style="background:rgba(236,169,52,.06);border:1px solid rgba(236,169,52,.2)">
    <div class="sd-stat-val" style="color:var(--t)">&#8734;</div>
    <div class="sd-stat-lbl">Unlimited Tasks</div>
  </div>
  <div class="sd-stat" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)">
    <div class="sd-stat-val" style="color:var(--t)">0</div>
    <div class="sd-stat-lbl">Scope Change Fees</div>
  </div>
  <div class="sd-stat" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)">
    <div class="sd-stat-val" style="color:var(--t)">100%</div>
    <div class="sd-stat-lbl">Dedicated Team</div>
  </div>
  <div class="sd-stat" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)">
    <div class="sd-stat-val" style="color:var(--t)">85%</div>
    <div class="sd-stat-lbl">Lower Cost vs In-House</div>
  </div>
</div>

<!-- The Problem -->

<!-- P3: Why Zoho Fails Post-Implementation -->
<section class="sd-section" style="background:rgba(255,80,80,.02)">
  <div class="sd-inner">
    <div class="sl">Root Cause</div>
    <div class="sh">Why Zoho Fails Post-Implementation</div>
    <p class="sp" style="margin-bottom:40px">Why CRM Systems Stop Working Over Time — it's not the software, it's what happens after go-live.</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,80,80,.12);border-left:3px solid rgba(255,80,80,.4);border-radius:12px;padding:22px">
        <div style="font-size:26px;margin-bottom:10px">🏗</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:6px">Built but Not Maintained</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">Systems go live and are immediately abandoned. No one owns ongoing improvement.</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,80,80,.12);border-left:3px solid rgba(255,80,80,.4);border-radius:12px;padding:22px">
        <div style="font-size:26px;margin-bottom:10px">🔁</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:6px">Teams Revert to Old Habits</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">Without support, teams default back to spreadsheets and manual processes.</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,80,80,.12);border-left:3px solid rgba(255,80,80,.4);border-radius:12px;padding:22px">
        <div style="font-size:26px;margin-bottom:10px">👥</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:6px">Staff Changes Internally</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">New hires don't know the system. Tribal knowledge walks out the door with departing staff.</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,80,80,.12);border-left:3px solid rgba(255,80,80,.4);border-radius:12px;padding:22px">
        <div style="font-size:26px;margin-bottom:10px">📋</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:6px">Workflows Become Outdated</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">Business processes change. Automations built 12 months ago no longer reflect reality.</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,80,80,.12);border-left:3px solid rgba(255,80,80,.4);border-radius:12px;padding:22px">
        <div style="font-size:26px;margin-bottom:10px">👻</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:6px">Consultants Disappear After Setup</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">The people who built it are gone. When something breaks, there's no one to call.</div>
      </div>
      <div style="background:rgba(236,169,52,.07);border:1px solid rgba(236,169,52,.25);border-radius:12px;padding:22px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center">
        <div style="font-size:32px;margin-bottom:10px;color:var(--t)">∞</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--t)">Infinity Mirror™ fixes every single one of these.</div>
      </div>
    </div>
  </div>
</section>

<!-- P2: The Gap in Traditional Implementations -->
<section class="sd-section">
  <div class="sd-inner">
    <div class="sl">The Problem</div>
    <div class="sh">The Gap in Traditional Implementations</div>
    <p class="sp" style="margin-bottom:40px">Projects are planned linearly — but operations aren't. Here's where the cracks form.</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:22px">
        <div style="font-size:26px;margin-bottom:10px">⚙️</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:6px">Needs Constant Adjustment</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">SOWs can't capture everything upfront. Mid-project discoveries derail timelines and budgets.</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:22px">
        <div style="font-size:26px;margin-bottom:10px">🔗</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:6px">Integrations Break</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">Third-party apps update. APIs deprecate. What worked at launch stops working months later.</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:22px">
        <div style="font-size:26px;margin-bottom:10px">🔄</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:6px">Processes Evolve</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">The business you were when you started is not the business you are six months later.</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:22px">
        <div style="font-size:26px;margin-bottom:10px">📱</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:6px">New Apps Get Added</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">Every new tool creates new integration debt. The stack grows but the support doesn't.</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:22px">
        <div style="font-size:26px;margin-bottom:10px">🎯</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:6px">Real Requirements Surface Mid-Project</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">You only know what you need once you start using it. Traditional projects penalise you for that.</div>
      </div>
      <div style="background:rgba(236,169,52,.07);border:1px solid rgba(236,169,52,.25);border-radius:14px;padding:22px;display:flex;align-items:center;gap:14px">
        <div style="font-size:32px;flex-shrink:0">💡</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--t);line-height:1.5">Infinity Mirror™ was built specifically for this reality.</div>
      </div>
    </div>
  </div>
</section>

<!-- P5: How It Works -->
<section class="sd-section" style="background:rgba(236,169,52,.03)">
  <div class="sd-inner">
    <div class="sl">The Model</div>
    <div class="sh">Introducing Infinity Mirror™</div>
    <p class="sp" style="margin-bottom:48px">A continuous development loop. You submit tasks, we prioritize and build — one at a time, forever.</p>
    <div style="display:flex;flex-direction:column;gap:12px;max-width:680px;margin:0 auto">
      <div style="display:flex;align-items:center;gap:18px;background:rgba(236,169,52,.08);border:1px solid rgba(236,169,52,.25);border-radius:14px;padding:20px 24px">
        <div style="width:44px;height:44px;border-radius:50%;background:var(--t);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:16px;color:#0D1232">1</div>
        <div><div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:var(--tx);margin-bottom:3px">You Submit Unlimited Tasks</div><div style="font-size:13px;color:var(--dim)">No limit on requests. Fixes, features, integrations, automations — all go into your queue anytime.</div></div>
      </div>
      <div style="display:flex;justify-content:center;color:var(--dim);font-size:20px;margin:-2px 0">↓</div>
      <div style="display:flex;align-items:center;gap:18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:20px 24px">
        <div style="width:44px;height:44px;border-radius:50%;background:rgba(107,159,212,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:16px;color:#6B9FD4">2</div>
        <div><div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:var(--tx);margin-bottom:3px">Project Manager Reviews &amp; Prioritizes</div><div style="font-size:13px;color:var(--dim)">Your dedicated PM triages every request, scopes it, and sequences it for maximum impact.</div></div>
      </div>
      <div style="display:flex;justify-content:center;color:var(--dim);font-size:20px;margin:-2px 0">↓</div>
      <div style="display:flex;align-items:center;gap:18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:20px 24px">
        <div style="width:44px;height:44px;border-radius:50%;background:rgba(139,159,212,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:16px;color:#8B9FD4">3</div>
        <div><div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:var(--tx);margin-bottom:3px">One Active Task at a Time</div><div style="font-size:13px;color:var(--dim)">Focused execution. Your active task gets full developer attention until it's completed right.</div></div>
      </div>
      <div style="display:flex;justify-content:center;color:var(--dim);font-size:20px;margin:-2px 0">↓</div>
      <div style="display:flex;align-items:center;gap:18px;background:rgba(76,175,80,.06);border:1px solid rgba(76,175,80,.2);border-radius:14px;padding:20px 24px">
        <div style="width:44px;height:44px;border-radius:50%;background:rgba(76,175,80,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:20px">✓</div>
        <div><div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:var(--tx);margin-bottom:3px">Completed → Next Task Begins</div><div style="font-size:13px;color:var(--dim)">The loop never stops. Done means the next one starts immediately. Predictable progress every month.</div></div>
      </div>
    </div>
  </div>
</section>

<!-- P6: Queue System -->
<section class="sd-section">
  <div class="sd-inner">
    <div class="sl">Queue System</div>
    <div class="sh">What Your Queue Might Look Like</div>
    <p class="sp" style="margin-bottom:36px">Full visibility into your task pipeline at all times — what's done, what's in progress, and what's coming next.</p>
    <div style="max-width:780px;margin:0 auto;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.1)">
      <div style="display:grid;grid-template-columns:48px 1fr 140px;background:rgba(255,255,255,.08);padding:14px 20px;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.09em;color:var(--dim)">
        <div>#</div><div>Task</div><div>Status</div>
      </div>
      <div style="display:grid;grid-template-columns:48px 1fr 140px;padding:14px 20px;border-top:1px solid rgba(255,255,255,.06);align-items:center">
        <div style="font-family:'Montserrat',sans-serif;font-size:12px;color:var(--dim)">1</div>
        <div style="font-size:13px;color:#4CAF50;font-weight:600">Update lead conversion workflow</div>
        <div style="font-size:11px;font-family:'Montserrat',sans-serif;font-weight:800;color:#4CAF50">✓ Completed</div>
      </div>
      <div style="display:grid;grid-template-columns:48px 1fr 140px;padding:14px 20px;border-top:1px solid rgba(255,255,255,.06);align-items:center;background:rgba(236,169,52,.05)">
        <div style="font-family:'Montserrat',sans-serif;font-size:12px;color:var(--dim)">2</div>
        <div style="font-size:13px;color:var(--t);font-weight:600">Build proposal template</div>
        <div style="font-size:11px;font-family:'Montserrat',sans-serif;font-weight:800;color:var(--t)">⟳ In Progress</div>
      </div>
      <div style="display:grid;grid-template-columns:48px 1fr 140px;padding:14px 20px;border-top:1px solid rgba(255,255,255,.06);align-items:center">
        <div style="font-family:'Montserrat',sans-serif;font-size:12px;color:var(--dim)">3</div>
        <div style="font-size:13px;color:var(--mid)">API sync CRM ↔ Books</div>
        <div style="font-size:11px;font-family:'Montserrat',sans-serif;font-weight:800;color:var(--mid)">Approved</div>
      </div>
      <div style="display:grid;grid-template-columns:48px 1fr 140px;padding:14px 20px;border-top:1px solid rgba(255,255,255,.06);align-items:center">
        <div style="font-family:'Montserrat',sans-serif;font-size:12px;color:var(--dim)">4</div>
        <div style="font-size:13px;color:var(--mid)">Add new user permissions</div>
        <div style="font-size:11px;font-family:'Montserrat',sans-serif;font-weight:800;color:var(--mid)">Approved</div>
      </div>
      <div style="display:grid;grid-template-columns:48px 1fr 140px;padding:14px 20px;border-top:1px solid rgba(255,255,255,.06);align-items:center">
        <div style="font-family:'Montserrat',sans-serif;font-size:12px;color:var(--dim)">5</div>
        <div style="font-size:13px;color:rgba(236,169,52,.7)">Auto-assign leads by territory</div>
        <div style="font-size:11px;font-family:'Montserrat',sans-serif;font-weight:800;color:rgba(236,169,52,.7)">Under Review</div>
      </div>
      <div style="display:grid;grid-template-columns:48px 1fr 140px;padding:14px 20px;border-top:1px solid rgba(255,255,255,.06);align-items:center">
        <div style="font-family:'Montserrat',sans-serif;font-size:12px;color:var(--dim)">6</div>
        <div style="font-size:13px;color:rgba(236,169,52,.7)">Multi-step validation rule</div>
        <div style="font-size:11px;font-family:'Montserrat',sans-serif;font-weight:800;color:rgba(236,169,52,.7)">Under Review</div>
      </div>
    </div>
    <p style="text-align:center;font-size:12px;color:var(--dim);margin-top:20px">Your queue is live, visible, and always moving forward.</p>
  </div>
</section>

<!-- P4: Freedom & Flexibility -->
<section class="sd-section" style="background:rgba(236,169,52,.03)">
  <div class="sd-inner">
    <div class="sl">Freedom &amp; Flexibility</div>
    <div class="sh">Support That Adapts With You</div>
    <p class="sp" style="margin-bottom:40px">No hourly billing. No scope change fees. No surprises. Just a team that moves at the exact pace your business demands.</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
      <div class="im-feature"><div class="im-feature-num">01</div><div class="im-feature-t">No Hourly Billing</div><div class="im-feature-d">One flat monthly rate. Build as much as you want. The meter never runs.</div></div>
      <div class="im-feature"><div class="im-feature-num">02</div><div class="im-feature-t">No Scope Change Fees</div><div class="im-feature-d">Requirements shift? Fine. Submit a new task. Nothing costs extra.</div></div>
      <div class="im-feature"><div class="im-feature-num">03</div><div class="im-feature-t">Submit Tasks Anytime</div><div class="im-feature-d">Day or night, whenever an idea or issue surfaces — it goes straight into your queue.</div></div>
      <div class="im-feature"><div class="im-feature-num">04</div><div class="im-feature-t">Stable Long-Term Team</div><div class="im-feature-d">The same people every month. They know your system inside and out.</div></div>
      <div class="im-feature"><div class="im-feature-num">05</div><div class="im-feature-t">CRM Evolves as You Grow</div><div class="im-feature-d">As your business changes, your systems keep pace. No more frozen implementations.</div></div>
      <div class="im-feature"><div class="im-feature-num">06</div><div class="im-feature-t">Predictable Progress</div><div class="im-feature-d">Every month you see what shipped, what's in progress, and what's queued next.</div></div>
    </div>
  </div>
</section>

<!-- P7: Why It's a Game Changer -->
<section class="sd-section">
  <div class="sd-inner">
    <div class="sl">Why It's Different</div>
    <div class="sh">Why Infinity Mirror™ Is a Game Changer.</div>
    <p class="sp" style="margin-bottom:40px">A model designed for continuous growth — not a project that ends.</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:24px;text-align:center">
        <div style="font-size:36px;margin-bottom:12px">🔄</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:var(--tx);margin-bottom:8px">Ongoing Support &amp; Improvements</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">Not a project — a permanent embedded team continuously improving your systems.</div>
      </div>
      <div style="background:rgba(236,169,52,.08);border:1px solid rgba(236,169,52,.25);border-radius:14px;padding:24px;text-align:center">
        <div style="font-size:36px;margin-bottom:12px">∞</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:var(--t);margin-bottom:8px">Unlimited Task Submissions</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">Submit as many requests as your business generates. There is no cap.</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:24px;text-align:center">
        <div style="font-size:36px;margin-bottom:12px">📈</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:var(--tx);margin-bottom:8px">Adjusts as Your Business Evolves</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">Priorities change monthly. The retainer adjusts to match your current reality.</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:24px;text-align:center">
        <div style="font-size:36px;margin-bottom:12px">📅</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:var(--tx);margin-bottom:8px">Predictable Progress Every Month</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">Bi-weekly meetings. A live dashboard. Full visibility on everything in flight.</div>
      </div>
      <div style="background:rgba(236,169,52,.08);border:1px solid rgba(236,169,52,.25);border-radius:14px;padding:24px;text-align:center">
        <div style="font-size:36px;margin-bottom:12px">👥</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:var(--t);margin-bottom:8px">Dedicated Team That Knows Your System</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">The same developers, PM, and architects — month after month. No re-onboarding.</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:24px;text-align:center">
        <div style="font-size:36px;margin-bottom:12px">💰</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:var(--tx);margin-bottom:8px">No Hourly Billing, No Scope Changes</div>
        <div style="font-size:13px;color:var(--dim);line-height:1.6">Flat monthly rate. No surprise invoices. No change-order negotiations.</div>
      </div>
    </div>
  </div>
</section>

<!-- P10: Value Comparison (no pricing) -->
<section class="sd-section" style="background:rgba(236,169,52,.03)">
  <div class="sd-inner">
    <div class="sl">The Value</div>
    <div class="sh">A Full Team. No Hiring. No Downtime.</div>
    <p class="sp" style="margin-bottom:40px">Compare what you get with Infinity Mirror™ versus building an in-house Zoho capability.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:800px;margin:0 auto">
      <div style="background:rgba(236,169,52,.08);border:2px solid rgba(236,169,52,.35);border-radius:16px;padding:28px">
        <div style="font-family:'Montserrat',sans-serif;font-size:16px;font-weight:900;color:var(--t);margin-bottom:6px">Infinity Mirror™ Provides</div>
        <div style="font-size:12px;color:var(--dim);margin-bottom:20px">Everything included, from day one</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--mid)"><span style="color:#4CAF50;font-weight:800;flex-shrink:0">✓</span>A full team — developer, PM, architect</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--mid)"><span style="color:#4CAF50;font-weight:800;flex-shrink:0">✓</span>Up to 85% lower cost than in-house</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--mid)"><span style="color:#4CAF50;font-weight:800;flex-shrink:0">✓</span>No hiring, recruiting, or onboarding</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--mid)"><span style="color:#4CAF50;font-weight:800;flex-shrink:0">✓</span>No training time or knowledge ramp</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--mid)"><span style="color:#4CAF50;font-weight:800;flex-shrink:0">✓</span>No downtime from staff turnover</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--mid)"><span style="color:#4CAF50;font-weight:800;flex-shrink:0">✓</span>Business analysis included</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--mid)"><span style="color:#4CAF50;font-weight:800;flex-shrink:0">✓</span>Bi-weekly alignment meetings</div>
        </div>
      </div>
      <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:28px">
        <div style="font-family:'Montserrat',sans-serif;font-size:16px;font-weight:900;color:var(--dim);margin-bottom:6px">In-House Zoho Employee</div>
        <div style="font-size:12px;color:var(--dim);margin-bottom:20px">\$110k–\$140k/year + benefits — and still needs more</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--dim)"><span style="color:rgba(255,80,80,.6);font-weight:800;flex-shrink:0">✗</span>Months to hire the right person</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--dim)"><span style="color:rgba(255,80,80,.6);font-weight:800;flex-shrink:0">✗</span>Benefits, payroll, overhead on top</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--dim)"><span style="color:rgba(255,80,80,.6);font-weight:800;flex-shrink:0">✗</span>Still needs a PM and architect</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--dim)"><span style="color:rgba(255,80,80,.6);font-weight:800;flex-shrink:0">✗</span>Integration &amp; architecture support gaps</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--dim)"><span style="color:rgba(255,80,80,.6);font-weight:800;flex-shrink:0">✗</span>Vulnerable to turnover and sick days</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--dim)"><span style="color:rgba(255,80,80,.6);font-weight:800;flex-shrink:0">✗</span>Limited to one person's knowledge</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--dim)"><span style="color:rgba(255,80,80,.6);font-weight:800;flex-shrink:0">✗</span>Business analysis rarely done</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- P11: What It Solves -->
<section class="sd-section">
  <div class="sd-inner">
    <div class="sl">Coverage</div>
    <div class="sh">What Infinity Mirror™ Solves</div>
    <p class="sp" style="margin-bottom:40px">Covers 99% of Zoho needs — from quick fixes to full multi-app architecture.</p>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
      <div style="display:flex;align-items:center;gap:12px;padding:16px 20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:12px">
        <div style="width:36px;height:36px;border-radius:9px;background:rgba(236,169,52,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px">⚡</div>
        <div><div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx)">Quick Fixes</div><div style="font-size:12px;color:var(--dim)">Same-sprint resolution for bugs and breaks</div></div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;padding:16px 20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:12px">
        <div style="width:36px;height:36px;border-radius:9px;background:rgba(107,159,212,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px">📊</div>
        <div><div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx)">Reporting &amp; Automation</div><div style="font-size:12px;color:var(--dim)">Custom dashboards, workflows, and triggers</div></div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;padding:16px 20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:12px">
        <div style="width:36px;height:36px;border-radius:9px;background:rgba(139,159,212,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px">🧠</div>
        <div><div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx)">Architecture Planning</div><div style="font-size:12px;color:var(--dim)">Strategic decisions built for long-term scalability</div></div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;padding:16px 20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:12px">
        <div style="width:36px;height:36px;border-radius:9px;background:rgba(76,175,80,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px">🔄</div>
        <div><div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx)">Continuous Optimization</div><div style="font-size:12px;color:var(--dim)">Monthly improvements aligned to business goals</div></div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;padding:16px 20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:12px">
        <div style="width:36px;height:36px;border-radius:9px;background:rgba(236,169,52,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px">🌐</div>
        <div><div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx)">Third-Party Integrations</div><div style="font-size:12px;color:var(--dim)">Shopify, HubSpot, Slack, Amazon, and more</div></div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;padding:16px 20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:12px">
        <div style="width:36px;height:36px;border-radius:9px;background:rgba(107,159,212,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px">🗄</div>
        <div><div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx)">Multi-App Deployments</div><div style="font-size:12px;color:var(--dim)">CRM, Books, Desk, Projects, Inventory and beyond</div></div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;padding:16px 20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:12px;grid-column:span 2">
        <div style="width:36px;height:36px;border-radius:9px;background:rgba(139,159,212,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px">🛡</div>
        <div><div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx)">Daily Operational Support</div><div style="font-size:12px;color:var(--dim)">Your dedicated team is always available — for questions, issues, and improvements as they arise</div></div>
      </div>
    </div>
  </div>
</section>

<!-- P12: Testimonials -->
<section class="sd-section" style="background:rgba(236,169,52,.03)">
  <div class="sd-inner">
    <div class="sl">Client Results</div>
    <div class="sh">Success, Straight From Our Clients.</div>
    <p class="sp" style="margin-bottom:40px">Real businesses. Real outcomes. Hear directly from the teams we work with every day.</p>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px">
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:28px">
        <div style="color:#ECA934;font-size:14px;margin-bottom:16px">★★★★★</div>
        <p style="font-size:14px;color:var(--mid);line-height:1.8;margin-bottom:16px;font-style:italic">"Simply put — our company could not have implemented our custom Zoho CRM without Mirror Advisors. They are responsive, patient and extremely knowledgeable. Paul and his team to this day continue to help us refine and perfect our system."</p>
        <div style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:800;color:var(--dim);text-transform:uppercase;letter-spacing:.08em">Calco Commercial Inc.</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:28px">
        <div style="color:#ECA934;font-size:14px;margin-bottom:16px">★★★★★</div>
        <p style="font-size:14px;color:var(--mid);line-height:1.8;margin-bottom:16px;font-style:italic">"Working with Mirror Advisors — especially Paul, Aadrika, and their team — has been an absolutely incredible experience."</p>
        <div style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:800;color:var(--dim);text-transform:uppercase;letter-spacing:.08em">Jeanes Mental Health Services</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:28px">
        <div style="color:#ECA934;font-size:14px;margin-bottom:16px">★★★★★</div>
        <p style="font-size:14px;color:var(--mid);line-height:1.8;margin-bottom:16px;font-style:italic">"They take the time to fully understand requirements before starting any work, ensuring a smooth and efficient process."</p>
        <div style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:800;color:var(--dim);text-transform:uppercase;letter-spacing:.08em">Quality Foundation Repair</div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:28px">
        <div style="color:#ECA934;font-size:14px;margin-bottom:16px">★★★★★</div>
        <p style="font-size:14px;color:var(--mid);line-height:1.8;margin-bottom:16px;font-style:italic">"Mirror Advisors has been essential to our operations as we transitioned from an assortment of business applications and subscriptions into one comprehensive platform."</p>
        <div style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:800;color:var(--dim);text-transform:uppercase;letter-spacing:.08em">Supreme E-Com</div>
      </div>
    </div>
  </div>
</section>

<!-- P13: Next Steps -->
<section class="sd-section">
  <div class="sd-inner">
    <div class="sl">Next Steps</div>
    <div class="sh">Get Started Today.</div>
    <p class="sp" style="margin-bottom:40px">The future of implementation is infinite. Here's how to move forward.</p>
    <div style="max-width:560px;margin:0 auto;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden">
      <div style="background:var(--t);padding:16px 24px;display:flex;align-items:center;gap:12px">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D1232" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        <span style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:900;color:#0D1232;text-transform:uppercase;letter-spacing:.08em">Next Steps</span>
      </div>
      <div style="padding:24px;display:flex;flex-direction:column;gap:16px">
        <div style="display:flex;align-items:flex-start;gap:16px">
          <div style="width:32px;height:32px;border-radius:50%;border:2px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </div>
          <div><div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:3px">Book a Strategy Call</div><div style="font-size:13px;color:var(--dim)">Start with a no-commitment conversation. We'll walk you through what Infinity Mirror™ would look like for your specific business.</div></div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:16px">
          <div style="width:32px;height:32px;border-radius:50%;border:2px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </div>
          <div><div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:3px">All Existing Agreements Honoured</div><div style="font-size:13px;color:var(--dim)">Any active project or hourly agreement will be completed in full before transitioning.</div></div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:16px">
          <div style="width:32px;height:32px;border-radius:50%;border:2px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </div>
          <div><div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:3px">Starts With Scope</div><div style="font-size:13px;color:var(--dim)">Every Infinity Mirror™ engagement begins with a Scope audit — so we hit the ground running from day one.</div></div>
        </div>
        <div style="margin-top:8px">
          <a href="#" onclick="go('contact')"><button class="bp" style="width:100%;justify-content:center;padding:13px 24px;font-size:14px">Book a Strategy Session →</button></a>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="sd-cta-banner"><div><div class="sd-cta-h">Ready to Never Stop Shipping?</div><p class="sd-cta-p">Infinity Mirror starts with Scope. Book a call and we will show you what the first 90 days would look like.</p></div><a href="#" onclick="go('contact')"><button class="bp" style="padding:14px 32px;font-size:15px;white-space:nowrap">Start With Scope <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a></div>`,
  'bankhours': `<div class="sd-hero" style="background:radial-gradient(ellipse at 30% 60%,rgba(255,255,255,.03) 0%,transparent 50%),#080B1A"><div class="sd-hero-grid"></div><div class="sd-hero-inner"><div><div class="sd-hero-nav"><div class="sd-hero-back" onclick="go('services')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to Services</div><div class="sd-tag" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);color:var(--tx)">Bank of Hours</div></div><h1 class="sd-h1">Expert Hours.<br><span style="color:var(--t)">Locked Rate.</span></h1><p class="sd-lead">Pre-purchase a block of senior development hours at a locked rate. No expiry pressure, no SOW friction. Use them for the exact tasks Scope identified.</p><div class="sd-meta-row"><div class="sd-meta-item"><div class="sd-meta-k">Format</div><div class="sd-meta-v" style="color:var(--t)">Prepaid Blocks</div></div><div class="sd-meta-item"><div class="sd-meta-k">Rate</div><div class="sd-meta-v" style="color:var(--t)">Fixed at Purchase</div></div><div class="sd-meta-item"><div class="sd-meta-k">Expires</div><div class="sd-meta-v" style="color:var(--t)">Never</div></div></div><a href="#" onclick="go('contact')"><button class="bp" style="padding:13px 28px">Get a Quote</button></a></div><div><div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:32px"><div style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.09em;margin-bottom:24px">How Hours Get Used</div><div style="display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.05)"><div style="width:36px;height:36px;border-radius:9px;background:rgba(236,169,52,.1);border:1px solid rgba(236,169,52,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg></div><div><div style="font-size:12px;font-weight:600;color:var(--tx)">Zoho integration build</div><div style="font-size:11px;color:var(--dim)">8-12 hrs typical</div></div></div><div style="display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.05)"><div style="width:36px;height:36px;border-radius:9px;background:rgba(236,169,52,.1);border:1px solid rgba(236,169,52,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/></svg></div><div><div style="font-size:12px;font-weight:600;color:var(--tx)">Claude AI automation</div><div style="font-size:11px;color:var(--dim)">4-8 hrs typical</div></div></div><div style="display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.05)"><div style="width:36px;height:36px;border-radius:9px;background:rgba(107,159,212,.1);border:1px solid rgba(107,159,212,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B9FD4" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div><div><div style="font-size:12px;font-weight:600;color:var(--tx)">Custom Zoho Creator app</div><div style="font-size:11px;color:var(--dim)">16-24 hrs typical</div></div></div><div style="display:flex;gap:12px;align-items:center;padding:12px 0"><div style="width:36px;height:36px;border-radius:9px;background:rgba(107,159,212,.1);border:1px solid rgba(107,159,212,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B9FD4" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg></div><div><div style="font-size:12px;font-weight:600;color:var(--tx)">API / webhook setup</div><div style="font-size:11px;color:var(--dim)">4-6 hrs typical</div></div></div></div></div></div></div><section class="sd-section"><div class="sd-inner"><div class="sd-2col"><div><div class="sl">How It Works</div><div class="sh">Simple. Clean. Flexible.</div><div class="sd-feature-list" style="margin-top:32px"><div class="sd-feature"><div class="sd-feature-icon" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12)"><span style="font-size:18px">&#128274;</span></div><div><div class="sd-feature-t">Rate locked at purchase</div><div class="sd-feature-d">Your hourly rate is fixed the day you buy. No increases, no surprises.</div></div></div><div class="sd-feature"><div class="sd-feature-icon" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12)"><span style="font-size:18px">&#8987;</span></div><div><div class="sd-feature-t">Hours never expire</div><div class="sd-feature-d">Use them this month, next quarter, or next year. They are yours until used.</div></div></div><div class="sd-feature"><div class="sd-feature-icon" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12)"><span style="font-size:18px">&#9889;</span></div><div><div class="sd-feature-t">Fast to start</div><div class="sd-feature-d">No project plan needed. Brief us, we size it in hours, you approve, we build.</div></div></div></div></div><div><div class="sl">Best Fit Check</div><div class="sh">Is It Right For You?</div><div style="margin-top:28px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;gap:10px;align-items:flex-start;padding:11px 14px;border-radius:9px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);margin-bottom:8px"><span style="color:var(--t);flex-shrink:0;font-weight:700">&#10003;</span><span style="font-size:13px;color:var(--mid);line-height:1.6">You have a Scope deliverable with specific items to execute</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:11px 14px;border-radius:9px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);margin-bottom:8px"><span style="color:var(--t);flex-shrink:0;font-weight:700">&#10003;</span><span style="font-size:13px;color:var(--mid);line-height:1.6">You need flexibility with no fixed schedule</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:11px 14px;border-radius:9px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);margin-bottom:8px"><span style="color:var(--t);flex-shrink:0;font-weight:700">&#10003;</span><span style="font-size:13px;color:var(--mid);line-height:1.6">You want a locked rate with no escalation risk</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:11px 14px;border-radius:9px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);margin-bottom:8px"><span style="color:rgba(255,100,100,.7);flex-shrink:0;font-weight:700">&#10007;</span><span style="font-size:13px;color:var(--mid);line-height:1.6">You have ongoing continuous development needs (use Infinity Mirror)</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:11px 14px;border-radius:9px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);margin-bottom:8px"><span style="color:rgba(255,100,100,.7);flex-shrink:0;font-weight:700">&#10007;</span><span style="font-size:13px;color:var(--mid);line-height:1.6">You need a full ERP deployment (use ERP Projects)</span></div></div></div></div></div></section><div class="sd-cta-banner"><div><div class="sd-cta-h">Ready to Purchase a Block?</div><p class="sd-cta-p">Tell us what you need to build. We will scope it in hours and send a quote within 24 hours.</p></div><a href="#" onclick="go('contact')"><button class="bp" style="padding:14px 32px;font-size:15px;white-space:nowrap">Start With Scope <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a></div>`,
  'support': `<div class="sd-hero" style="background:radial-gradient(ellipse at 50% 30%,rgba(255,255,255,.03) 0%,transparent 55%),#080B1A"><div class="sd-hero-grid"></div><div class="sd-hero-inner"><div><div class="sd-hero-nav"><div class="sd-hero-back" onclick="go('services')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to Services</div><div class="sd-tag" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);color:var(--tx)">Support Only</div></div><h1 class="sd-h1">Your Systems,<br><span style="color:var(--t)">Always Running Clean.</span></h1><p class="sd-lead">A dedicated SLA for systems already live. Monitoring, bug fixes, minor enhancements, and proactive uptime management.</p><div class="sd-meta-row"><div class="sd-meta-item"><div class="sd-meta-k">Model</div><div class="sd-meta-v" style="color:var(--t)">SLA Retainer</div></div><div class="sd-meta-item"><div class="sd-meta-k">Response</div><div class="sd-meta-v" style="color:var(--t)">Same Day (Critical)</div></div><div class="sd-meta-item"><div class="sd-meta-k">For</div><div class="sd-meta-v" style="color:var(--t)">Post-Implementation</div></div></div><a href="#" onclick="go('contact')"><button class="bp" style="padding:13px 28px">Enquire About SLA</button></a></div><div><div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:32px"><div style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.09em;margin-bottom:20px">SLA Dashboard</div><div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.05)"><div style="width:8px;height:8px;border-radius:50%;background:#4CAF50;flex-shrink:0"></div><div style="flex:1;font-size:13px;color:var(--tx)">Zoho CRM Integration</div><span style="font-size:11px;font-family:Montserrat,sans-serif;font-weight:700;color:#4CAF50">Online</span></div><div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.05)"><div style="width:8px;height:8px;border-radius:50%;background:#4CAF50;flex-shrink:0"></div><div style="flex:1;font-size:13px;color:var(--tx)">Inventory Sync</div><span style="font-size:11px;font-family:Montserrat,sans-serif;font-weight:700;color:#4CAF50">Online</span></div><div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.05)"><div style="width:8px;height:8px;border-radius:50%;background:#4CAF50;flex-shrink:0"></div><div style="flex:1;font-size:13px;color:var(--tx)">Reporting Pipelines</div><span style="font-size:11px;font-family:Montserrat,sans-serif;font-weight:700;color:#4CAF50">Online</span></div><div style="display:flex;align-items:center;gap:12px;padding:12px 0"><div style="width:8px;height:8px;border-radius:50%;background:#ECA934;flex-shrink:0"></div><div style="flex:1;font-size:13px;color:var(--tx)">API Webhooks</div><span style="font-size:11px;font-family:Montserrat,sans-serif;font-weight:700;color:#ECA934">Monitoring</span></div><div style="margin-top:16px;padding:12px 14px;border-radius:9px;background:rgba(76,175,80,.08);border:1px solid rgba(76,175,80,.2)"><div style="font-size:12px;color:#4CAF50;font-family:Montserrat,sans-serif;font-weight:700;margin-bottom:2px">All Systems Operational</div><div style="font-size:11px;color:var(--dim)">99.97% uptime this month</div></div></div></div></div></div><section class="sd-section"><div class="sd-inner"><div class="sd-2col"><div><div class="sl">What Is Included</div><div class="sh">Everything Covered.</div><div class="sd-feature-list" style="margin-top:32px"><div class="sd-feature"><div class="sd-feature-icon" style="background:rgba(236,169,52,.1);border:1px solid rgba(236,169,52,.2)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--t)" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div><div><div class="sd-feature-t">Proactive Monitoring</div><div class="sd-feature-d">We watch your systems before things break. Automated alerts and regular health checks.</div></div></div><div class="sd-feature"><div class="sd-feature-icon" style="background:rgba(236,169,52,.1);border:1px solid rgba(236,169,52,.2)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--t)" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg></div><div><div class="sd-feature-t">Bug Fixes & Patches</div><div class="sd-feature-d">Any bugs in production are fixed promptly within your SLA window — no extra charges.</div></div></div><div class="sd-feature"><div class="sd-feature-icon" style="background:rgba(236,169,52,.1);border:1px solid rgba(236,169,52,.2)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--t)" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></div><div><div class="sd-feature-t">Minor Enhancements</div><div class="sd-feature-d">Small improvements and workflow tweaks handled within the retainer.</div></div></div></div></div><div><div class="sl">Response Times</div><div class="sh">SLA Tiers</div><div style="margin-top:32px;display:flex;flex-direction:column;gap:12px"><div style="padding:18px 20px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,100,100,.25)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><span style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:800;color:#FF6464">Critical</span><span style="font-family:Montserrat,sans-serif;font-size:12px;font-weight:700;color:#FF6464">Same Day</span></div><div style="font-size:12px;color:var(--dim)">System down, data loss risk, business blocked</div></div><div style="padding:18px 20px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(236,169,52,.2)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><span style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:800;color:#ECA934">High</span><span style="font-family:Montserrat,sans-serif;font-size:12px;font-weight:700;color:#ECA934">24 Hours</span></div><div style="font-size:12px;color:var(--dim)">Major feature broken, significant operational impact</div></div><div style="padding:18px 20px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(107,159,212,.2)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><span style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:800;color:#6B9FD4">Medium</span><span style="font-family:Montserrat,sans-serif;font-size:12px;font-weight:700;color:#6B9FD4">48 Hours</span></div><div style="font-size:12px;color:var(--dim)">Feature degraded, workaround exists</div></div><div style="padding:18px 20px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><span style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:800;color:var(--dim)">Low</span><span style="font-family:Montserrat,sans-serif;font-size:12px;font-weight:700;color:var(--dim)">1 Week</span></div><div style="font-size:12px;color:var(--dim)">Minor issue, cosmetic, enhancement request</div></div></div></div></div></div></section><div class="sd-cta-banner"><div><div class="sd-cta-h">Ready for Peace of Mind?</div><p class="sd-cta-p">Tell us about your current systems. We will propose an SLA that fits your setup and criticality.</p></div><a href="#" onclick="go('contact')"><button class="bp" style="padding:14px 32px;font-size:15px;white-space:nowrap">Start With Scope <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a></div>`,
  'cases': `<div class="ph" style="position:relative">
  <div class="ph-grid"></div><div class="ph-glow" style="bottom:0;right:0;width:600px;height:400px;background:radial-gradient(ellipse at 80% 80%,rgba(236,169,52,.06),transparent 65%)"></div>
  <div class="ph-in">
    <div class="badge">Real Work</div>
    <h1>Results That<br><span style="color:var(--t)">Compound.</span></h1>
    <p class="ph-sub">Real projects. Real numbers. No inflated metrics, no vague "improved efficiency" claims — just what we actually built and what it actually did.</p>
  </div>
  <div class="cases-hero-mark"><div class="chm-cards"><div class="chm-card chm-card-1"><div class="chm-card-tag"></div><div class="chm-card-title"></div><div class="chm-card-title-2"></div><div class="chm-card-metrics"><div class="chm-metric"><div class="chm-metric-val"></div><div class="chm-metric-lbl"></div></div><div class="chm-metric"><div class="chm-metric-val"></div><div class="chm-metric-lbl"></div></div></div></div><div class="chm-card chm-card-2"><div class="chm-card-tag"></div><div class="chm-card-title"></div><div class="chm-card-title-2"></div><div class="chm-card-metrics"><div class="chm-metric"><div class="chm-metric-val"></div><div class="chm-metric-lbl"></div></div><div class="chm-metric"><div class="chm-metric-val"></div><div class="chm-metric-lbl"></div></div></div></div><div class="chm-card chm-card-3"><div class="chm-card-tag"></div><div class="chm-card-title"></div><div class="chm-card-title-2"></div><div class="chm-card-metrics"><div class="chm-metric"><div class="chm-metric-val"></div><div class="chm-metric-lbl"></div></div><div class="chm-metric"><div class="chm-metric-val"></div><div class="chm-metric-lbl"></div></div></div></div></div></div>
</div>

<section class="sec">
  <div class="si">
    <div class="sl">Featured</div>
    <div class="featured">
      <div class="feat-glow"></div>
      <div style="position:relative;z-index:1">
        <div class="feat-label">Featured Case Study</div>
        <div class="feat-h">Multi-entity Zoho One Deployment Across 7 PE Portfolio Companies</div>
        <p class="feat-p">A private equity firm needed to replace three fragmented ERPs across seven subsidiaries with a single unified platform — without disrupting operations. We delivered a phased Zoho One rollout in 6 months with zero data loss and full team adoption.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px">
          <span style="font-size:11px;padding:4px 10px;border-radius:100px;background:rgba(236,169,52,.1);border:1px solid rgba(236,169,52,.2);color:var(--t);font-family:'Montserrat',sans-serif;font-weight:700">ERP Deployment</span>
          <span style="font-size:11px;padding:4px 10px;border-radius:100px;background:rgba(107,159,212,.1);border:1px solid rgba(107,159,212,.2);color:#6B9FD4;font-family:'Montserrat',sans-serif;font-weight:700">Data Migration</span>
          <span style="font-size:11px;padding:4px 10px;border-radius:100px;background:rgba(139,159,212,.1);border:1px solid rgba(139,159,212,.2);color:#8B9FD4;font-family:'Montserrat',sans-serif;font-weight:700">Multi-entity</span>
        </div>
        <a href="#" onclick="go('contact')"><button class="bp" style="font-size:13px;padding:11px 22px">Discuss a Similar Project <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a>
      </div>
      <div style="position:relative;z-index:1">
        <div class="feat-metrics">
          <div class="fm"><div class="fm-val">7</div><div class="fm-lbl">Entities Unified</div></div>
          <div class="fm"><div class="fm-val">6mo</div><div class="fm-lbl">To Go-Live</div></div>
          <div class="fm"><div class="fm-val">0</div><div class="fm-lbl">Data Loss</div></div>
          <div class="fm"><div class="fm-val">3</div><div class="fm-lbl">ERPs Replaced</div></div>
          <div class="fm"><div class="fm-val">94%</div><div class="fm-lbl">User Adoption</div></div>
          <div class="fm"><div class="fm-val">\$180k</div><div class="fm-lbl">Annual Saving</div></div>
        </div>
      </div>
    </div>

    <div class="sl">All Work</div>
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;margin-bottom:32px">
      <div class="sh" style="margin-bottom:0">All Case Studies</div>
      <div class="filter-bar" id="filterBar"></div>
    </div>
    <div class="case-grid" id="caseGrid"></div>
  </div>
</section>
<div class="ctas"><div class="ctasg"></div><h2 class="ctash">Want Results Like These?</h2><p class="ctasp">Every case study started with a single conversation. Let's have yours.</p><div class="ctasb"><a href="#" onclick="go('contact')"><button class="bp" style="padding:14px 34px;font-size:15px">Book a Strategy Session <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a><a href="#" onclick="go('services')"><button class="bs" style="padding:13px 26px">Explore Services</button></a></div></div>
`,
  'technology': `<div class="ph" style="position:relative">
  <div class="ph-grid"></div><div class="ph-glow" style="top:10%;right:5%;width:500px;height:500px;background:radial-gradient(ellipse,rgba(236,169,52,.05),transparent 65%)"></div>
  <div class="ph-in">
    <div class="badge">Technology</div>
    <h1>The Tools That<br><span style="color:var(--t)">Power Our Work.</span></h1>
    <p class="ph-sub">We're technology-agnostic in principle, but opinionated in practice. Here's the stack we've chosen, why we chose it, and how we extend it with AI and custom code.</p>
  </div>
  <div class="stack-hero-badge"><img src="data:image/png;base64,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qz2Dg4jEdDqN7du345FHHvHqpMTjcdx2223uH/3RH2Hq1Kno6urCwYMHsWPHDrz22ms4depUXnFgbXypqKjA+9//fnf9+vW47LLLvKJ1dXV1Xk0kWxSHWQND7t2ysjL09PSgubkZR44cwa5du7Bjxw4cP37ckYgE8b7LtuV+W758ufv+978fV199NS655BJUVlYim82ioqICPT09XkSHPgYxFPT29uKpp57CL37xC7z77rvO76IS3FtuuQWf+MQnUFFRgYGBAZw6dQobN27E5s2bvfsKAO666y53+fLlqKuryzvf8/G9Xap2eBP5mAvVSxivtVGx3SQo0M+jh0hboc3CP7YCHkHtNggZySQctrXLRLjHbKHrNnEXVEjP72d8hvJzYc1xDBLmYcdwLKv0jveLebTHSE/6+L9nJ/qi25aX7VcAcazmV13bwVyjxGIxb24QYaVFkrS0/N3PXcdxPAEkOeSS91xZWemFn+dyObz++utYtGgRDhw4gM2bN+O1115zpOWlLhYqnxfvajabxW9/+1vnxIkT2Lx5s3v77bfjxhtvxCWXXOKJ+Gg06nmCpb1oJpPxQt6TySTa29vR0tLiiICPRqNOf3+/29fXh6amJmzbtg0vvPAC9u/f7wwMDOS9S9rb270Ig4GBATQ3N6Onp2dYCLiEXIshpK2tzZEQez2/1NTUwHVdL9xaR1D29fWhq6sLTU1Njo62PHv2LNLpNI4ePYrt27djy5YtOHLkiNPb25u3XxkzMah0d3dj586dzttvv41rrrnGvemmm7Bq1SpUVVV5ERESeSDXXhc/1hFrkUgEp06dwoEDB7B9+3Zs374d77zzjiOpDraCw3JcAwMD2Llzp7N371688sor7u23347169ejsrISqVTKqz2g70e5HxzHQX9/v1ctv7e3V47P6evrc+PxOJqbm/H222/jiSeewFtvveXVn5FxVd8Z1v5vohQZHa3gLVRcbjznxrEozGemQIbtdFCqazva9Q0F+jnGJiKK8TqZPXDH4iYjF/b95zdJBomtiWIIMot6BIV0BYnGILFJwhUdG0kl39EK8GL7nU5UA4iZPkDG7j2r/1/sonW8F662MNrxbBMook1XixexLuLc1vJT5xw7joMzZ84gl8s5umCXrhQvYcTy83Q6jePHj6OxsRFPPPEEWlpanO7u7rw53IwwNLuDSNeS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" alt="Zoho Authorized Partner" class="stack-hero-badge-img"></div>
</div>

<!-- Zoho Section -->
<section class="sec">
  <div class="si">
    <div class="sl">Foundation Layer</div>
    <div class="sh">Zoho,<br><span style="color:var(--bg2)">Tuned to Your Business.</span></div>
    <p class="sp">Zoho's platform is one of the most capable business operating systems available. We've spent years achieving expert-level depth across the entire suite — and we extend it beyond its native limits with custom AI and integrations.</p>

    <div class="zoho-hero">
      <div>
        <div style="font-family:'Montserrat',sans-serif;font-size:12px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.09em;margin-bottom:16px">Apps We Deploy — Hover Any</div>
        <div id="zohoGrid"></div>
        <div class="zoho-note-box" style="margin-top:16px">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2" style="flex-shrink:0;margin-top:2px"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <p class="znb-text"><strong style="color:var(--t)">The real power</strong> comes when we extend Zoho with custom Claude AI agents, bespoke automation logic, and third-party integrations it can't do natively — creating systems no off-the-shelf tool can match.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- AI Stack -->
<section class="sec" style="background:#0C0F22;border-top:1px solid var(--bd)">
  <div class="si">
    <div class="sl">AI Layer</div>
    <div class="sh">Claude-First AI Engineering</div>
    <div class="ai-stack-feature">
      <div class="asf-glow"></div>
      <div style="position:relative;z-index:1">
        <div class="asf-badge">Claude Integration</div>
        <div class="asf-h">We Build on Claude Because It's the Best Tool for Business Logic</div>
        <p class="asf-p">We evaluated every major LLM before committing to Claude as our primary AI layer. For business-critical applications — where accuracy, reasoning depth, and safety matter — Claude consistently outperforms alternatives on the tasks our clients actually need.</p>
        <div class="ai-capability-list">
          <div class="acl-item"><div class="acl-dot"></div><div class="acl-text">Claude API integration into Zoho, HubSpot, and custom web apps via MCP and REST</div></div>
          <div class="acl-item"><div class="acl-dot"></div><div class="acl-text">Custom RAG pipelines that let Claude reason over your internal knowledge base</div></div>
          <div class="acl-item"><div class="acl-dot"></div><div class="acl-text">Agentic workflows where Claude orchestrates multi-step tasks without human intervention</div></div>
          <div class="acl-item"><div class="acl-dot"></div><div class="acl-text">Prompt engineering, evaluation frameworks, and production-grade reliability patterns</div></div>
        </div>
      </div>
      <div style="position:relative;z-index:1">
        <div class="arch-vis">
          <div style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:16px">AI Architecture Pattern</div>
          <div class="arch-row">
            <div class="arch-box" style="color:#6B9FD4;border-color:rgba(107,159,212,.25)">Zoho CRM</div>
            <div class="arch-box" style="color:#8B9FD4;border-color:rgba(139,159,212,.25)">Webhooks</div>
            <div class="arch-box" style="color:#ECA934;border-color:rgba(236,169,52,.25)">Databases</div>
          </div>
          <div class="arch-arrow">↓</div>
          <div class="arch-center">Claude API + RAG Layer</div>
          <div class="arch-arrow">↓</div>
          <div class="arch-row">
            <div class="arch-box">Draft Email</div>
            <div class="arch-box">Score Lead</div>
            <div class="arch-box">Flag Risk</div>
          </div>
          <div class="arch-arrow">↓</div>
          <div class="arch-row" style="grid-template-columns:1fr">
            <div class="arch-box" style="color:var(--t);border-color:rgba(236,169,52,.25)">Push back to CRM / Notify team / Log to analytics</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Full Stack Categories -->
<section class="sec">
  <div class="si">
    <div class="sl">Full Tech Stack</div>
    <div class="sh">Every Layer, Explained</div>
    <p class="sp">We're selective. Every tool in our stack was chosen because it's the best at what it does — not because it's popular.</p>
    <div class="stack-cats" id="stackCats"></div>
  </div>
</section>

<div class="ctas">
  <div class="ctasg"></div>
  <h2 class="ctash">Want to See the Stack in Action?</h2>
  <p class="ctasp">Book a technical session. We'll walk through exactly how our stack would be applied to your use case.</p>
  <div class="ctasb">
    <a href="#" onclick="go('contact')"><button class="bp" style="padding:14px 34px;font-size:15px">Book a Technical Call <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a>
    <a href="#" onclick="go('services')"><button class="bs" style="padding:13px 26px">View Capabilities</button></a>
  </div>
</div>
`,
  'contact': `<div class="page-wrap">
  <div class="contact-left">
    <div class="cl-grid"></div>
    <div class="cl-glow"></div>
    <div class="cl-inner">
      <div class="badge">Let&#39;s Talk</div>
      <h1 style="font-size:clamp(36px,4vw,54px);line-height:1.08;letter-spacing:-.03em">Start the<br><span style="color:var(--t)">Conversation.</span></h1>
      <p class="cl-sub">No deck. No pitch. Just a real conversation about your situation &#8212; and an honest answer about whether we can help.</p>
      <div class="expect-list">
        <div class="exp-item"><div class="exp-num">1</div><div><div class="exp-title">We respond within 24 hours</div><div class="exp-desc">Every submission is read by a senior advisor &#8212; not routed through an SDR.</div></div></div>
        <div class="exp-item"><div class="exp-num">2</div><div><div class="exp-title">30-minute intro call</div><div class="exp-desc">We ask about your goals, your current stack, and what&#39;s not working.</div></div></div>
        <div class="exp-item"><div class="exp-num">3</div><div><div class="exp-title">Honest recommendation</div><div class="exp-desc">We&#39;ll tell you which model fits &#8212; or if you don&#39;t need us yet, we&#39;ll say that too.</div></div></div>
      </div>
      <div class="alt-contacts">
        <div class="ac-item"><div class="ac-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div><div class="ac-title">Email</div><div class="ac-val">hello@mirroradvisors.com</div></div></div>
        <div class="ac-item"><div class="ac-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></div><div><div class="ac-title">LinkedIn</div><div class="ac-val">linkedin.com/company/mirroradvisors</div></div></div>
      </div>
    </div>
  </div>
  <div class="contact-right">
    <div class="cr-inner">
      <div id="formWrap">
        <div class="form-title">Tell Us About Your Project</div>
        <p class="form-sub">Takes about 2 minutes. The more detail you share, the more useful our first conversation will be.</p>
        <form id="contactForm" onsubmit="submitForm(event)">
          <div class="form-grid">
            <div class="fg"><label>First Name *</label><input type="text" id="fname" placeholder="Alex" required></div>
            <div class="fg"><label>Last Name *</label><input type="text" id="lname" placeholder="Johnson" required></div>
          </div>
          <div class="fg"><label>Work Email *</label><input type="email" id="email" placeholder="alex@company.com" required></div>
          <div class="fg"><label>Company</label><input type="text" id="company" placeholder="Acme Corp"></div>
          <div class="fg">
            <label>Company Size</label>
            <select id="size">
              <option value="">Select headcount...</option>
              <option>1&#8211;10 employees</option>
              <option>11&#8211;50 employees</option>
              <option>51&#8211;200 employees</option>
              <option>201&#8211;500 employees</option>
              <option>500+ employees</option>
            </select>
          </div>
          <div class="fg">
            <label>Which Service Are You Interested In?</label>
            <div class="svc-chips" id="svcChips">
              <button type="button" class="svc-chip" onclick="toggleChip(this)">AI-Powered Apps</button>
              <button type="button" class="svc-chip" onclick="toggleChip(this)">ERP Implementation</button>
              <button type="button" class="svc-chip" onclick="toggleChip(this)">Systems Integration</button>
              <button type="button" class="svc-chip" onclick="toggleChip(this)">Business Consulting</button>
              <button type="button" class="svc-chip" onclick="toggleChip(this)">Infinity Mirror</button>
              <button type="button" class="svc-chip" onclick="toggleChip(this)">Bank of Hours</button>
              <button type="button" class="svc-chip" onclick="toggleChip(this)">Not Sure Yet</button>
            </div>
          </div>
          <div class="fg">
            <label>How Can We Help? *</label>
            <textarea id="message" placeholder="Tell us what you&#39;re trying to solve, what you&#39;ve tried, and what success looks like..." required oninput="updateChar(this)"></textarea>
            <div class="char-count" id="charCount">0 / 1000</div>
          </div>
          <div class="fg">
            <label>Timeline</label>
            <select id="timeline">
              <option value="">When are you looking to start?</option>
              <option>As soon as possible</option>
              <option>Within 1 month</option>
              <option>1&#8211;3 months</option>
              <option>3&#8211;6 months</option>
              <option>Just exploring</option>
            </select>
          </div>
          <div class="privacy-note">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(236,169,52,.6)" stroke-width="2" style="flex-shrink:0;margin-top:1px"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Your information is never shared or sold. We use it only to prepare for our conversation with you.
          </div>
          <button type="submit" class="bp" id="submitBtn" style="width:100%;justify-content:center;margin-top:4px">
            Send Message <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </form>
      </div>
      <div class="success-state" id="successState" style="display:none">
        <div class="success-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ECA934" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
        <div class="success-title">Message Sent &#127881;</div>
        <p class="success-sub">Thanks for reaching out. A senior advisor will review your submission and reach out within 24 hours to schedule a call.</p>
        <div style="padding:14px 18px;border-radius:10px;background:rgba(236,169,52,.07);border:1px solid rgba(236,169,52,.2);font-size:13px;color:var(--mid)"><strong style="color:var(--t)">While you wait:</strong> Browse our <a href="#" onclick="go('cases')" style="color:var(--t)">case studies</a> to see what we&#39;ve built for similar businesses.</div>
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
      <li><strong>Personal Information</strong> &mdash; Name, email address, company name, phone number, and any other details you voluntarily provide through our contact form, consultation bookings, or direct inquiries.</li>
      <li><strong>Website Usage Data</strong> &mdash; IP address, browser type, device information, referral source, and pages visited. This data is collected automatically through cookies and similar technologies when you browse mirroradvisors.com.</li>
      <li><strong>Infinity Portal Data</strong> &mdash; If you are an active client with access to our Infinity Portal at app.mirroradvisors.com, we collect authentication credentials, session information, and the work product, documents, and project data you generate or upload while using the portal.</li>
      <li><strong>Project &amp; Engagement Data</strong> &mdash; Information you share with us during Scope engagements, project delivery, or support work &mdash; including system access credentials, business data, and configurations &mdash; handled under our standard engagement agreements.</li>
    </ul>

    <h2 class="legal-h2">How We Use Your Information</h2>
    <p class="legal-p">We use the information we collect to:</p>
    <ul class="legal-ul">
      <li>Respond to inquiries, service requests, and consultation bookings submitted through this website.</li>
      <li>Deliver, configure, and support the Zoho One and Claude AI systems we build for clients.</li>
      <li>Operate and improve the Infinity Portal experience for active clients.</li>
      <li>Send relevant updates and communications &mdash; only if you have opted in or have an active engagement with us.</li>
      <li>Conduct internal analytics to understand how our website performs and where we can improve it.</li>
      <li>Maintain compliance with applicable laws, tax obligations, and partner agreements (including Zoho and Anthropic).</li>
    </ul>

    <h2 class="legal-h2">How We Share Your Information</h2>
    <p class="legal-p">We do not sell or rent your personal information. We share data only with trusted third parties when necessary to operate our business, namely:</p>
    <ul class="legal-ul">
      <li><strong>Infrastructure Providers</strong> &mdash; Web hosting and email services we use to keep mirroradvisors.com and our communications running.</li>
      <li><strong>Zoho Corporation</strong> &mdash; As an authorised Zoho partner, certain client and engagement information is shared with Zoho when required to provision licences, register partner deals, or coordinate support.</li>
      <li><strong>Anthropic (Claude AI)</strong> &mdash; When we build custom Claude AI integrations for clients, data flows through Anthropic&#39;s API under their data processing terms. This applies only to active client systems, not to general website visitors.</li>
      <li><strong>Legal Compliance</strong> &mdash; When required by law, court order, or to protect our legal rights and property.</li>
    </ul>
    <p class="legal-p">All third-party partners we work with are required to handle your data securely and in a manner consistent with this Privacy Policy.</p>

    <h2 class="legal-h2">Cookies and Tracking Technologies</h2>
    <p class="legal-p">Our website uses a small set of cookies to remember your preferences (such as your cookie consent choice) and to help us understand basic site usage. You can control cookie preferences through your browser settings or by using the cookie consent banner that appears on your first visit. We do not use third-party advertising cookies or cross-site tracking pixels.</p>

    <h2 class="legal-h2">Data Retention</h2>
    <p class="legal-p">We retain personal data only as long as necessary to fulfill the purposes outlined in this policy &mdash; or as required by law, contract, or our professional obligations. Once no longer needed, your data is securely deleted or anonymised. Infinity Portal data is retained for the duration of your engagement plus a reasonable archival period.</p>

    <h2 class="legal-h2">Your Rights &amp; Global Compliance</h2>
    <p class="legal-p">Depending on your location (including the US, EU, UK, and Canada), you have specific rights regarding your data. You have the right to:</p>
    <ul class="legal-ul">
      <li><strong>Access, Correct, or Delete</strong> your personal data.</li>
      <li><strong>Opt-Out</strong> of targeted communications, data sharing, or automated profiling.</li>
      <li><strong>Data Portability</strong> &mdash; request a copy of your data in a usable format.</li>
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
      <li><strong>Hero integration puzzle</strong> &mdash; The interactive puzzle on our homepage uses visual cues (colour, animation, snapping pieces) to communicate how Zoho and AI tools connect. The same information is described in plain text on our Services, Technology, and Capabilities pages.</li>
      <li><strong>Animated transitions</strong> &mdash; Some pages include subtle animations on scroll or hover. We are working to ensure all motion respects the operating system&#39;s &ldquo;reduced motion&rdquo; preference.</li>
      <li><strong>Embedded media</strong> &mdash; A small number of case study background images do not have descriptive alt-text because they are purely decorative; we are reviewing these on an ongoing basis.</li>
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
  'capabilities': `<div style="display:flex;align-items:center;justify-content:center;min-height:60vh;color:var(--mid);font-family:Montserrat,sans-serif">Redirecting&hellip;</div>`,
  'stack': `<div style="display:flex;align-items:center;justify-content:center;min-height:60vh;color:var(--mid);font-family:Montserrat,sans-serif">Redirecting&hellip;</div>`,
};
