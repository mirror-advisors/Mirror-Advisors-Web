'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ServiceBar {
  label: string;
  pct: string;
}

interface ServiceTab {
  num: string;
  name: string;
  sub: string;
  desc: string;
  time: string;
  pricing: string;
  fit: string;
  bars: ServiceBar[];
  href: string;
}

const SERVICES: ServiceTab[] = [
  {
    num: '01',
    name: 'Scope',
    sub: 'Blueprinting',
    desc: 'A fixed-fee discovery engagement. We audit your systems, map your business logic, and deliver a comprehensive technical blueprint before any build begins. No surprises, no scope creep.',
    time: '2–4 weeks',
    pricing: 'Fixed Fee',
    fit: 'New clients & tech audits',
    bars: [
      { label: 'Process Mapping', pct: '90%' },
      { label: 'Tech Audit', pct: '75%' },
      { label: 'Roadmap Delivery', pct: '100%' },
    ],
    href: '/services',
  },
  {
    num: '02',
    name: 'ERP Projects',
    sub: 'Implementation',
    desc: 'Full-lifecycle project delivery with defined milestones, a dedicated team, and a go-live commitment. For complex, multi-phase ERP builds that require serious architectural thinking.',
    time: '3–18 months',
    pricing: 'Project-Based',
    fit: 'Mid to large businesses',
    bars: [
      { label: 'Architecture', pct: '100%' },
      { label: 'Configuration', pct: '95%' },
      { label: 'Training + Handoff', pct: '80%' },
    ],
    href: '/erp',
  },
  {
    num: '03',
    name: 'Infinity Mirror',
    sub: 'Subscription Dev',
    desc: 'A continuous development partnership. Monthly retainer, rolling priorities, no SOW friction. Your technology evolves at the same pace as your business strategy.',
    time: 'Monthly rolling',
    pricing: 'Retainer',
    fit: 'Growth-stage companies',
    bars: [
      { label: 'Feature Velocity', pct: '85%' },
      { label: 'AI Iteration', pct: '90%' },
      { label: 'Strategic Alignment', pct: '95%' },
    ],
    href: '/infinity',
  },
  {
    num: '04',
    name: 'Bank of Hours',
    sub: 'Prepaid Blocks',
    desc: 'Pre-purchase development hours at a locked rate. Use for feature sprints, integrations, or AI experiments — consumed on your schedule with full flexibility.',
    time: 'Flexible',
    pricing: 'Prepaid',
    fit: 'Tactical on-demand work',
    bars: [
      { label: 'Flexibility', pct: '100%' },
      { label: 'Speed to Start', pct: '95%' },
      { label: 'Cost Control', pct: '90%' },
    ],
    href: '/bankhours',
  },
  {
    num: '05',
    name: 'Support Only',
    sub: 'Maintenance',
    desc: 'Dedicated support SLA for systems already live. Monitoring, bug fixes, minor improvements, and proactive uptime management — keeping everything running clean.',
    time: 'Ongoing',
    pricing: 'SLA-Based',
    fit: 'Post-implementation clients',
    bars: [
      { label: 'Response SLA', pct: '100%' },
      { label: 'Uptime Monitoring', pct: '100%' },
      { label: 'Minor Enhancements', pct: '60%' },
    ],
    href: '/support',
  },
];

export function ServiceTabs() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];

  return (
    <section id="services">
      <div className="section-wrap">
        <div className="svc-header-row">
          <div className="svc-header-left">
            <div className="sec-label">Engagement Models</div>
            <div className="sec-h">
              Five Ways to Work
              <br />
              With Us
            </div>
          </div>
          <p className="sec-sub svc-header-sub">
            Every client situation is different. We structured our engagements to match your risk tolerance
            and growth stage.
          </p>
        </div>

        <div className="services-layout">
          <div className="svc-tab-list">
            {SERVICES.map((svc, i) => (
              <button
                key={svc.num}
                type="button"
                className={`svc-tab-item${i === active ? ' active' : ''}`}
                onClick={() => setActive(i)}
                style={{
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <div className="svc-tab-num">{svc.num}</div>
                <div className="svc-tab-name">{svc.name}</div>
                <div className="svc-tab-sub">{svc.sub}</div>
              </button>
            ))}
          </div>

          <div className="svc-panel" key={active /* re-mount on tab change → bars animate again */}>
            <div className="svc-panel-glow"></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="svc-badge">
                <div className="svc-badge-dot"></div>
                {s.sub}
              </div>
              <div className="svc-title">{s.name}</div>
              <div className="svc-desc">{s.desc}</div>
              <div className="svc-meta">
                <div>
                  <div className="svc-meta-label">Timeframe</div>
                  <div className="svc-meta-value">{s.time}</div>
                </div>
                <div>
                  <div className="svc-meta-label">Pricing</div>
                  <div className="svc-meta-value">{s.pricing}</div>
                </div>
                <div>
                  <div className="svc-meta-label">Best Fit</div>
                  <div
                    className="svc-meta-value"
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}
                  >
                    {s.fit}
                  </div>
                </div>
              </div>
              <div className="svc-bars">
                {s.bars.map((b) => (
                  <div className="svc-bar-row" key={b.label}>
                    <div className="svc-bar-head">
                      <span className="svc-bar-label">{b.label}</span>
                      <span className="svc-bar-pct">{b.pct}</span>
                    </div>
                    <div className="svc-bar-track">
                      <div
                        className="svc-bar-fill run"
                        style={
                          {
                            ['--bar-w' as string]: b.pct,
                            width: b.pct,
                          } as React.CSSProperties
                        }
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Link href={s.href}>
              <button
                className="btn-primary"
                style={{ fontSize: 13, padding: '11px 22px', marginTop: 16, cursor: 'pointer' }}
              >
                Learn More{' '}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
