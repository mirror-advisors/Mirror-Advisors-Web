import Link from 'next/link';

export interface ServiceFeature {
  title: string;
  desc: string;
}

export interface ServiceMetric {
  value: string;
  label: string;
}

export interface ServicePhase {
  step: number;
  title: string;
  desc: string;
}

export interface ServiceDetailProps {
  tag: string;
  color: string;
  bg: string;
  bd: string;
  h1Lead: string;
  h1Accent: string;
  lead: string;
  meta: { timeline: string; pricing: string; startsWith: string };
  stats: ServiceMetric[];
  featuresLead: string;
  features: ServiceFeature[];
  phases?: ServicePhase[];
  ctaTitle: string;
  ctaDesc: string;
}

export function ServiceDetail({
  tag,
  color,
  bg,
  bd,
  h1Lead,
  h1Accent,
  lead,
  meta,
  stats,
  featuresLead,
  features,
  phases,
  ctaTitle,
  ctaDesc,
}: ServiceDetailProps) {
  return (
    <>
      <div
        className="sd-hero"
        style={{
          background: `radial-gradient(ellipse at 70% 30%,${bg} 0%,transparent 60%),#080B1A`,
        }}
      >
        <div className="sd-hero-grid"></div>
        <div className="sd-hero-inner">
          <div>
            <div className="sd-hero-nav">
              <Link href="/services" className="sd-hero-back">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>{' '}
                Back to Services
              </Link>
              <div
                className="sd-tag"
                style={{ background: bg, border: `1px solid ${bd}`, color }}
              >
                {tag}
              </div>
            </div>
            <h1 className="sd-h1">
              {h1Lead}
              <br />
              <span style={{ color }}>{h1Accent}</span>
            </h1>
            <p className="sd-lead">{lead}</p>
            <div className="sd-meta-row">
              <div className="sd-meta-item">
                <div className="sd-meta-k">Timeline</div>
                <div className="sd-meta-v" style={{ color }}>
                  {meta.timeline}
                </div>
              </div>
              <div className="sd-meta-item">
                <div className="sd-meta-k">Pricing</div>
                <div className="sd-meta-v" style={{ color }}>
                  {meta.pricing}
                </div>
              </div>
              <div className="sd-meta-item">
                <div className="sd-meta-k">Starts With</div>
                <div className="sd-meta-v" style={{ color: 'var(--t)' }}>
                  {meta.startsWith}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/contact">
                <button className="bp" style={{ padding: '13px 28px' }}>
                  Start With Scope
                </button>
              </Link>
              <Link href="/cases">
                <button className="bs" style={{ padding: '12px 22px' }}>
                  View Case Studies
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sd-stats-row" style={{ maxWidth: 1180, margin: '0 auto', padding: '60px 40px 0' }}>
        {stats.map((s, i) => (
          <div
            key={i}
            className="sd-stat"
            style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.1)',
            }}
          >
            <div className="sd-stat-val" style={{ color }}>
              {s.value}
            </div>
            <div className="sd-stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="sd-section">
        <div className="sd-inner">
          <div className="sd-2col sd-2col-center">
            <div>
              <div className="sl">What We Deliver</div>
              <div className="sh">{featuresLead}</div>
              <div className="sd-feature-list" style={{ marginTop: 28 }}>
                {features.map((f, i) => (
                  <div key={i} className="sd-feature">
                    <div
                      className="sd-feature-icon"
                      style={{ background: bg, border: `1px solid ${bd}` }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                    </div>
                    <div>
                      <div className="sd-feature-t">{f.title}</div>
                      <div className="sd-feature-d">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {phases && (
              <div>
                <div
                  style={{
                    background: 'rgba(255,255,255,.03)',
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: 20,
                    padding: 32,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Montserrat,sans-serif',
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--dim)',
                      textTransform: 'uppercase',
                      letterSpacing: '.09em',
                      marginBottom: 20,
                    }}
                  >
                    Project Phases
                  </div>
                  {phases.map((p) => (
                    <div key={p.step} style={{ display: 'flex', gap: 14, paddingBottom: 20 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: bg,
                          border: `2px solid ${bd}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontFamily: 'Montserrat,sans-serif',
                          fontSize: 11,
                          fontWeight: 800,
                          color,
                        }}
                      >
                        {p.step}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: 'Montserrat,sans-serif',
                            fontSize: 13,
                            fontWeight: 700,
                            color: 'var(--tx)',
                            marginBottom: 2,
                          }}
                        >
                          {p.title}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.55 }}>{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="sd-cta-banner">
        <div>
          <div className="sd-cta-h">{ctaTitle}</div>
          <p className="sd-cta-p">{ctaDesc}</p>
        </div>
        <Link href="/contact">
          <button className="bp" style={{ padding: '14px 32px', fontSize: 15, whiteSpace: 'nowrap' }}>
            Start With Scope{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>
    </>
  );
}
