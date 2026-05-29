import Link from 'next/link';

export const metadata = { title: 'Services — Mirror Advisors' };

const PATHS = [
  {
    t: 'ERP Projects',
    s: 'Implementation',
    c: '#6B9FD4',
    bc: 'rgba(107,159,212,.25)',
    bg: 'rgba(107,159,212,.06)',
    href: '/erp',
    d: 'Full-lifecycle ERP project delivery with defined milestones, a dedicated team, and a go-live commitment.',
    tm: '3-18 months',
    pr: 'Project-Based',
    w: 'Scope reveals you need a full ERP replacement, multi-entity deployment, or major data migration.',
  },
  {
    t: 'Infinity Mirror',
    s: 'Subscription Dev',
    c: '#ECA934',
    bc: 'rgba(236,169,52,.25)',
    bg: 'rgba(236,169,52,.06)',
    href: '/infinity',
    d: 'A continuous development partnership. Monthly retainer, rolling priorities, no SOW friction.',
    tm: 'Monthly rolling',
    pr: 'Retainer',
    w: 'Scope shows ongoing development needs and a consistent trusted team is better than one-off projects.',
  },
  {
    t: 'Bank of Hours',
    s: 'Prepaid Blocks',
    c: 'rgba(247,247,249,.7)',
    bc: 'rgba(255,255,255,.15)',
    bg: 'rgba(255,255,255,.04)',
    href: '/bankhours',
    d: 'Pre-purchase development hours at a locked rate for the specific items Scope identified.',
    tm: 'Flexible',
    pr: 'Prepaid',
    w: 'Scope identifies a clear list of discrete tasks that can be executed in blocks.',
  },
  {
    t: 'Support Only',
    s: 'Maintenance SLA',
    c: 'rgba(247,247,249,.7)',
    bc: 'rgba(255,255,255,.15)',
    bg: 'rgba(255,255,255,.04)',
    href: '/support',
    d: 'Dedicated SLA for systems already live. Monitoring, bug fixes, and proactive uptime management.',
    tm: 'Ongoing',
    pr: 'SLA-Based',
    w: 'Scope confirms systems are live and you need a reliable partner on call.',
  },
];

const FAQS = [
  {
    q: 'Do I really have to start with Scope?',
    a: 'Yes, for new clients, always. Without a proper blueprint we would be building on assumptions.',
  },
  {
    q: 'How long does Scope take and what does it cost?',
    a: 'Scope runs 2-4 weeks, priced as a fixed fee based on your company size. You know the number before we start.',
  },
  {
    q: 'What if I already know what I need?',
    a: 'Scope will confirm it or refine it. Clients often discover targeted automations solve 80% of the problem at a fraction of the cost.',
  },
  {
    q: 'Can I do Bank of Hours without Scope first?',
    a: 'For returning clients yes. For new clients, Scope is required so we are not flying blind.',
  },
  {
    q: 'What if Scope shows we are not a fit?',
    a: 'We tell you honestly. We would rather lose a project than deliver the wrong solution.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <div className="ph">
        <div className="ph-grid"></div>
        <div
          className="ph-glow"
          style={{
            top: '30%',
            right: '10%',
            width: 500,
            height: 400,
            background: 'radial-gradient(ellipse,rgba(236,169,52,.07),transparent 65%)',
          }}
        ></div>
        <div className="ph-in ph-in-split">
          <div>
            <div className="badge">Our Practice</div>
            <h1
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: 'clamp(42px,5vw,68px)',
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: '-0.035em',
                marginBottom: 24,
              }}
            >
              Every Engagement
              <br />
              <span style={{ color: 'var(--t)' }}>Starts With Scope.</span>
            </h1>
            <p className="ph-sub">
              Four disciplines, one practice. Before any build begins, we understand your systems, your logic,
              and your goals. Scope is the fixed-fee discovery that makes everything else possible.
            </p>
          </div>
        </div>
      </div>

      <section className="sec" style={{ background: '#0C0F22', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
        <div className="si">
          <div className="sl">Step One — Always</div>
          <div className="sh">The Scope Engagement</div>
          <p className="sp">Everything starts here. No exceptions.</p>
          <div className="scope-gateway">
            <div className="scope-card-main">
              <div className="scope-card-inner">
                <div className="scope-top">
                  <div className="scope-badge-pill">Starting Point</div>
                </div>
                <div className="scope-title">
                  Scope <span className="scope-sub-title">/ Blueprinting</span>
                </div>
                <p className="scope-desc">
                  A fixed-fee discovery engagement. We audit your systems, interview stakeholders, map your
                  business logic, and deliver a comprehensive technical blueprint — before a single line of
                  code is written.
                </p>
                <div className="scope-meta-row">
                  <div>
                    <div className="scope-meta-lbl">Duration</div>
                    <div className="scope-meta-val">2–4 weeks</div>
                  </div>
                  <div>
                    <div className="scope-meta-lbl">Pricing</div>
                    <div className="scope-meta-val">Fixed Fee</div>
                  </div>
                  <div>
                    <div className="scope-meta-lbl">Best for</div>
                    <div className="scope-meta-val">Every new client</div>
                  </div>
                </div>
                <div className="scope-delivers">
                  <div className="scope-delivers-label">What you get</div>
                  <div className="scope-delivers-grid">
                    {[
                      'System & process audit',
                      'Stakeholder interviews',
                      'Technical blueprint doc',
                      'Automation opportunity map',
                      'Recommended service path',
                      'ROI estimates per item',
                    ].map((t) => (
                      <div key={t} className="scope-deliver-item">
                        <span className="scope-check">✓</span> {t}
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/contact">
                  <button className="bp">
                    Start With Scope{' '}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
            <div className="scope-arrow-col">
              <div className="scope-arrow-line"></div>
              <div className="scope-arrow-label">Scope reveals which path fits</div>
              <div style={{ color: 'rgba(255,255,255,.3)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="sec"
        style={{
          background: '#0C0F22',
          borderTop: '1px solid rgba(255,255,255,.08)',
          borderBottom: '1px solid rgba(255,255,255,.08)',
        }}
      >
        <div className="si">
          <div className="sl">How We Engage</div>
          <div className="sh">Your Four Paths Forward</div>
          <p className="sp">Once Scope is complete, we will know exactly which of these fits your situation.</p>
          <div className="paths-grid">
            {PATHS.map((p) => (
              <Link
                key={p.t}
                href={p.href}
                className="path-card"
                style={
                  {
                    ['--path-color' as string]: p.c,
                    ['--path-border' as string]: p.bc,
                    ['--path-bg' as string]: p.bg,
                    cursor: 'pointer',
                  } as React.CSSProperties
                }
              >
                <div className="path-card-top">
                  <div className="path-icon" style={{ color: p.c }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </div>
                </div>
                <div className="path-title">{p.t}</div>
                <div className="path-subtitle">{p.s}</div>
                <p className="path-desc">{p.d}</p>
                <div className="path-when">
                  <div className="path-when-label">Scope recommends this when</div>
                  <div className="path-when-text">{p.w}</div>
                </div>
                <div className="path-meta">
                  <div className="path-meta-item">
                    <span className="path-meta-k">Duration</span>
                    <span className="path-meta-v" style={{ color: p.c }}>
                      {p.tm}
                    </span>
                  </div>
                  <div className="path-meta-item">
                    <span className="path-meta-k">Pricing</span>
                    <span className="path-meta-v" style={{ color: p.c }}>
                      {p.pr}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="si" style={{ maxWidth: 780 }}>
          <div className="sl">Common Questions</div>
          <div className="sh">Frequently Asked</div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details key={i} className="fi">
                <summary className="fq">
                  <span className="fqt">{f.q}</span>
                  <div className="ficon">+</div>
                </summary>
                <div className="fa">
                  <div style={{ padding: '0 24px 20px', fontSize: 14, color: 'var(--mid)', lineHeight: 1.75 }}>
                    {f.a}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="ctas">
        <div className="ctas-glow"></div>
        <h2>Ready to Start With Scope?</h2>
        <p>
          Book a free 30-minute call. We will confirm Scope is the right first step and explain what you will
          get.
        </p>
        <div className="ctas-btns">
          <Link href="/contact">
            <button className="bp" style={{ padding: '14px 34px', fontSize: 15 }}>
              Book a Strategy Session
            </button>
          </Link>
          <Link href="/cases">
            <button className="bs" style={{ padding: '13px 26px' }}>
              See Case Studies
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
