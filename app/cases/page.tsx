import Link from 'next/link';
import { CASES, type CaseCategory } from '@/lib/cases';
import { CaseFilter } from './CaseFilter';

export const metadata = { title: 'Case Studies — Mirror Advisors' };

export default function CasesPage() {
  const categories: ('All' | CaseCategory)[] = [
    'All',
    ...Array.from(new Set(CASES.map((c) => c.cat))) as CaseCategory[],
  ];

  return (
    <>
      <div className="ph" style={{ position: 'relative' }}>
        <div className="ph-grid"></div>
        <div
          className="ph-glow"
          style={{
            bottom: 0,
            right: 0,
            width: 600,
            height: 400,
            background: 'radial-gradient(ellipse at 80% 80%,rgba(236,169,52,.06),transparent 65%)',
          }}
        ></div>
        <div className="ph-in">
          <div className="badge">Real Work</div>
          <h1>
            Results That
            <br />
            <span style={{ color: 'var(--t)' }}>Compound.</span>
          </h1>
          <p className="ph-sub">
            Real projects. Real numbers. No inflated metrics, no vague &quot;improved efficiency&quot; claims —
            just what we actually built and what it actually did.
          </p>
        </div>
      </div>

      <section className="sec">
        <div className="si">
          <div className="sl">Featured</div>
          <div className="featured">
            <div className="feat-glow"></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="feat-label">Featured Case Study</div>
              <div className="feat-h">
                Multi-entity Zoho One Deployment Across 7 PE Portfolio Companies
              </div>
              <p className="feat-p">
                A private equity firm needed to replace three fragmented ERPs across seven subsidiaries with a
                single unified platform — without disrupting operations. We delivered a phased Zoho One rollout
                in 6 months with zero data loss and full team adoption.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {[
                  { label: 'ERP Deployment', c: '#ECA934', bg: 'rgba(236,169,52,.1)', bd: 'rgba(236,169,52,.2)' },
                  { label: 'Data Migration', c: '#6B9FD4', bg: 'rgba(107,159,212,.1)', bd: 'rgba(107,159,212,.2)' },
                  { label: 'Multi-entity', c: '#8B9FD4', bg: 'rgba(139,159,212,.1)', bd: 'rgba(139,159,212,.2)' },
                ].map((t) => (
                  <span
                    key={t.label}
                    style={{
                      fontSize: 11,
                      padding: '4px 10px',
                      borderRadius: 100,
                      background: t.bg,
                      border: `1px solid ${t.bd}`,
                      color: t.c,
                      fontFamily: "'Montserrat',sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
              <Link href="/contact">
                <button className="bp" style={{ fontSize: 13, padding: '11px 22px' }}>
                  Discuss a Similar Project{' '}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="feat-metrics">
                {[
                  ['7', 'Entities Unified'],
                  ['6mo', 'To Go-Live'],
                  ['0', 'Data Loss'],
                  ['3', 'ERPs Replaced'],
                  ['94%', 'User Adoption'],
                  ['$180k', 'Annual Saving'],
                ].map(([v, l]) => (
                  <div key={l} className="fm">
                    <div className="fm-val">{v}</div>
                    <div className="fm-lbl">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sl">All Work</div>
          <CaseFilter cases={CASES} categories={categories} />
        </div>
      </section>

      <div className="ctas">
        <div className="ctasg"></div>
        <h2 className="ctash">Want Results Like These?</h2>
        <p className="ctasp">Every case study started with a single conversation. Let&apos;s have yours.</p>
        <div className="ctasb">
          <Link href="/contact">
            <button className="bp" style={{ padding: '14px 34px', fontSize: 15 }}>
              Book a Strategy Session{' '}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
          <Link href="/services">
            <button className="bs" style={{ padding: '13px 26px' }}>
              Explore Services
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
