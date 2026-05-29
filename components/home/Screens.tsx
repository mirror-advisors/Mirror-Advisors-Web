'use client';

import { useEffect, useState } from 'react';

const BAR_DATA = [42, 55, 38, 67, 52, 78, 60, 88, 70, 84, 76, 95];

// CRM rows shown in the left "Live in Production" mock.
const CRM_ROWS = [
  { initials: 'NC', name: 'Nexus Corp', value: '$124k', stage: 'Proposal', badge: 'hot', color: '#ECA934' },
  { initials: 'AD', name: 'Apex Dynamics', value: '$87k', stage: 'Discovery', badge: 'warm', color: '#ECA934' },
  { initials: 'OS', name: 'Orbital Systems', value: '$210k', stage: 'Contract', badge: 'closing', color: '#6B9FD4' },
  { initials: 'PM', name: 'Pulse Media', value: '$45k', stage: 'Nurture', badge: 'cool', color: '#8B9FD4' },
];

export function Screens() {
  const [barsMounted, setBarsMounted] = useState(false);

  useEffect(() => {
    // Trigger bar animation after mount so heights animate from 0 → target.
    const t = setTimeout(() => setBarsMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="screens">
      <div className="section-wrap">
        <div className="sec-label">Live in Production</div>
        <div className="sec-h">
          Systems That Actually
          <br />
          Work in the Real World
        </div>
        <p className="sec-sub">
          Real deployments running daily across sales, operations, and finance teams.
        </p>

        <div className="screens-grid">
          {/* CRM Screen */}
          <div className="screen-wrap">
            <div className="screen-frame">
              <div className="scan-overlay"></div>
              <div className="screen-bar">
                <div className="screen-dot" style={{ background: '#ff5f57' }}></div>
                <div className="screen-dot" style={{ background: '#ffbd2e' }}></div>
                <div className="screen-dot" style={{ background: '#28c840' }}></div>
                <div className="url-pill">app.mirroradvisors.io/crm/pipeline</div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="screen-body">
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "'Montserrat',sans-serif",
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 12,
                  }}
                >
                  AI-Scored Pipeline — Q2 2025
                </div>
                <div className="crm-table-head">
                  <span className="crm-th">Company</span>
                  <span className="crm-th">Value</span>
                  <span className="crm-th">Stage</span>
                  <span className="crm-th">Status</span>
                </div>
                {CRM_ROWS.map((row) => (
                  <div className="crm-row" key={row.name}>
                    <div className="crm-company">
                      <div
                        className="crm-avatar"
                        style={{
                          background: `${row.color}33`,
                          color: row.color,
                        }}
                      >
                        {row.initials}
                      </div>
                      <span className="crm-name-text">{row.name}</span>
                    </div>
                    <span className="crm-value">{row.value}</span>
                    <span className="crm-stage">{row.stage}</span>
                    <span
                      className="crm-badge"
                      style={{ background: `${row.color}26`, color: row.color }}
                    >
                      {row.badge}
                    </span>
                  </div>
                ))}
                <div className="ai-insight">
                  <div className="ai-insight-label">⚡ AI Insight</div>
                  <div className="ai-insight-text">
                    3 deals show engagement decay — follow-up recommended within 48h to prevent pipeline loss.
                  </div>
                </div>
              </div>
            </div>
            <div className="screen-caption">
              <div className="screen-caption-title">AI-Augmented CRM</div>
              <div className="screen-caption-text">
                Custom Claude agents that score leads, draft follow-ups, and flag pipeline risk — all inside
                your existing Zoho CRM.
              </div>
            </div>
          </div>

          {/* Analytics Screen */}
          <div className="screen-wrap" style={{ animationDelay: '-3s' }}>
            <div className="screen-frame" style={{ animationDelay: '-3s' }}>
              <div className="screen-bar">
                <div className="screen-dot" style={{ background: '#ff5f57' }}></div>
                <div className="screen-dot" style={{ background: '#ffbd2e' }}></div>
                <div className="screen-dot" style={{ background: '#28c840' }}></div>
                <div className="url-pill">analytics.mirroradvisors.io/revenue</div>
                <span
                  style={{
                    fontSize: 9,
                    padding: '2px 7px',
                    borderRadius: 100,
                    background: 'rgba(236,169,52,0.15)',
                    color: '#ECA934',
                    fontWeight: 700,
                    fontFamily: "'Montserrat',sans-serif",
                  }}
                >
                  LIVE
                </span>
              </div>
              <div className="screen-body">
                <div className="analytics-kpis">
                  <div className="kpi-box">
                    <div className="kpi-label">Monthly Revenue</div>
                    <div className="kpi-value">$284k</div>
                    <div className="kpi-change" style={{ color: '#ECA934' }}>↑ 18.4%</div>
                  </div>
                  <div className="kpi-box">
                    <div className="kpi-label">Open Pipeline</div>
                    <div className="kpi-value">$1.2M</div>
                    <div className="kpi-change" style={{ color: '#6B9FD4' }}>+6 deals</div>
                  </div>
                  <div className="kpi-box">
                    <div className="kpi-label">Win Rate</div>
                    <div className="kpi-value">64%</div>
                    <div className="kpi-change" style={{ color: '#8B9FD4' }}>↑ 7pts</div>
                  </div>
                </div>
                <div className="chart-area">
                  <div className="chart-label">12-Month Revenue Trend</div>
                  <div className="chart-bars">
                    {BAR_DATA.map((v, i) => {
                      const isLast = i === BAR_DATA.length - 1;
                      const isSecond = i === BAR_DATA.length - 2;
                      const bg = isLast ? '#00C4CC' : isSecond ? '#4A9EFF' : 'rgba(255,255,255,0.11)';
                      return (
                        <div
                          key={i}
                          className="chart-bar"
                          style={{
                            height: barsMounted ? `${Math.round(v * 0.52)}px` : '0px',
                            background: bg,
                            transition: `height 700ms cubic-bezier(.22,1,.36,1) ${i * 50}ms`,
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 12,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      padding: '8px 10px',
                      borderRadius: 7,
                      background: 'rgba(236,169,52,0.05)',
                      border: '1px solid rgba(236,169,52,0.15)',
                    }}
                  >
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>
                      Zoho Books Sync
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: '#ECA934',
                        fontWeight: 600,
                        fontFamily: "'Montserrat',sans-serif",
                      }}
                    >
                      ● Real-time
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '8px 10px',
                      borderRadius: 7,
                      background: 'rgba(107,159,212,0.05)',
                      border: '1px solid rgba(107,159,212,0.15)',
                    }}
                  >
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>
                      CRM Pipeline
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: '#6B9FD4',
                        fontWeight: 600,
                        fontFamily: "'Montserrat',sans-serif",
                      }}
                    >
                      ● Connected
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="screen-caption">
              <div className="screen-caption-title">Unified Analytics Layer</div>
              <div className="screen-caption-text">
                Cross-system dashboards pulling from CRM, ERP, and third-party APIs into a single live
                intelligence view.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
