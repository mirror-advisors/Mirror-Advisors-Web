import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ZOHO_PRODUCTS, getZohoProduct } from '@/lib/zoho-products';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return ZOHO_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const p = getZohoProduct(params.slug);
  return { title: p ? `${p.name} — Mirror Advisors` : 'Zoho Product — Mirror Advisors' };
}

export default function ZohoProductPage({ params }: PageProps) {
  const p = getZohoProduct(params.slug);
  if (!p) notFound();

  return (
    <>
      <div
        className="sd-hero"
        style={{
          background: `radial-gradient(ellipse at 65% 35%,${p.color.bg} 0%,transparent 60%),#080B1A`,
        }}
      >
        <div className="sd-hero-grid"></div>
        <div className="sd-hero-inner">
          <div>
            <div className="sd-hero-nav">
              <Link href="/technology" className="sd-hero-back">
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
                Back to Technology
              </Link>
              <div
                className="sd-tag"
                style={{ background: p.color.bg, border: `1px solid ${p.color.bd}`, color: p.color.hex }}
              >
                <span style={{ fontSize: 16 }}>{p.emoji}</span> {p.name}
              </div>
            </div>
            <h1 className="sd-h1">
              {p.name}
              <br />
              <span style={{ color: p.color.hex }}>{p.tagline}</span>
            </h1>
            <p className="sd-lead">{p.lead}</p>

            <div className="sd-meta-row">
              <div className="sd-meta-item">
                <div className="sd-meta-k">Platform</div>
                <div className="sd-meta-v" style={{ color: p.color.hex }}>
                  {p.meta.platform}
                </div>
              </div>
              <div className="sd-meta-item">
                <div className="sd-meta-k">We Deploy</div>
                <div className="sd-meta-v" style={{ color: p.color.hex }}>
                  {p.meta.deploy}
                </div>
              </div>
              <div className="sd-meta-item">
                <div className="sd-meta-k">Extends With</div>
                <div className="sd-meta-v" style={{ color: p.color.hex }}>
                  {p.meta.extends}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/contact">
                <button className="bp" style={{ padding: '12px 26px' }}>
                  Deploy {p.name.replace(/^Zoho\s+/, '')}{' '}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
              <Link href="/technology">
                <button className="bs" style={{ padding: '11px 20px' }}>
                  Full Stack
                </button>
              </Link>
            </div>
          </div>

          <div>
            <div
              className="zh-stat-card"
              style={
                {
                  ['--zh-bg' as string]: p.color.bg,
                  ['--zh-bd' as string]: p.color.bd,
                  ['--zh-c' as string]: p.color.hex,
                } as React.CSSProperties
              }
            >
              <div className="zh-stat-card-icon">{p.emoji}</div>
              <div className="zh-stat-card-name">{p.name}</div>
              <div className="zh-stat-card-cert">Mirror Advisors Certified</div>
              <div className="zh-stats-grid">
                {p.stats.map((s, i) => (
                  <div key={i} className="zh-stat-item">
                    <div className="zh-stat-val">{s.value}</div>
                    <div className="zh-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="sd-section">
        <div className="sd-inner">
          <div className="sd-2col">
            <div>
              <div className="sl zh-section-label">What We Deploy</div>
              <div className="sh zh-section-heading">Key Use Cases</div>
              <p className="sp" style={{ marginBottom: 20 }}>
                How we deploy {p.name} for our clients.
              </p>
              {p.useCases.map((u) => (
                <div key={u} className="zh-use-case">
                  <span className="zh-check">✓</span>
                  <span>{u}</span>
                </div>
              ))}
            </div>

            <div>
              <div className="sl zh-section-label">Best Fit</div>
              <div className="sh zh-section-heading">Who It&apos;s For</div>
              <p className="zh-who">{p.bestFit}</p>
              {p.aiExtension && (
                <div
                  className="zh-ai-box"
                  style={
                    {
                      ['--zh-bg' as string]: p.color.bg08,
                      ['--zh-bd' as string]: p.color.bd2,
                      ['--zh-c' as string]: p.color.hex,
                    } as React.CSSProperties
                  }
                >
                  <div className="zh-ai-title">✨ How Mirror Advisors Extends This</div>
                  <p className="zh-ai-text">{p.aiExtension}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="sd-cta-banner">
        <div>
          <div className="sd-cta-h">Ready to Deploy {p.name}?</div>
          <p className="sd-cta-p">
            Starts with a Scope engagement. We&apos;ll show you exactly how {p.name.replace(/^Zoho\s+/, '')}{' '}
            fits into your stack.
          </p>
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
