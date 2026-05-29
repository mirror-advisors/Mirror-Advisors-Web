import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASES, getCase } from '@/lib/cases';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const c = getCase(params.slug);
  return { title: c ? `${c.title} — Mirror Advisors` : 'Case Study — Mirror Advisors' };
}

export default function CaseDetailPage({ params }: PageProps) {
  const c = getCase(params.slug);
  if (!c) notFound();

  return (
    <>
      <div className="ph" style={{ position: 'relative' }}>
        <div className="ph-grid"></div>
        <div className="ph-in">
          <Link href="/cases" className="sd-hero-back" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>{' '}
            Back to Case Studies
          </Link>
          <div className="badge" style={{ background: c.tc, borderColor: c.tt, color: c.tt }}>
            {c.cat}
          </div>
          <h1>{c.title}</h1>
          <p className="ph-sub">{c.desc}</p>
          <div style={{ display: 'flex', gap: 32, marginTop: 24, flexWrap: 'wrap' }}>
            <div>
              <div className="sd-stat-val" style={{ color: c.tt }}>
                {c.m1}
              </div>
              <div className="sd-stat-lbl">{c.ml1}</div>
            </div>
            <div>
              <div className="sd-stat-val" style={{ color: c.tt }}>
                {c.m2}
              </div>
              <div className="sd-stat-lbl">{c.ml2}</div>
            </div>
          </div>
        </div>
      </div>

      <section className="sec">
        <div className="si" style={{ maxWidth: 820 }}>
          <div className="sl">The Problem</div>
          <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.78, marginBottom: 40 }}>
            {c.problem}
          </p>
          <div className="sl">The Solution</div>
          <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.78, marginBottom: 40 }}>
            {c.solution}
          </p>
          <div className="sl">The Results</div>
          <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.78, marginBottom: 40 }}>
            {c.results}
          </p>
        </div>
      </section>

      <div className="ctas">
        <div className="ctasg"></div>
        <h2 className="ctash">Want a Result Like This?</h2>
        <p className="ctasp">Book a strategy session and we&apos;ll tell you honestly if we&apos;re a fit.</p>
        <div className="ctasb">
          <Link href="/contact">
            <button className="bp" style={{ padding: '14px 34px', fontSize: 15 }}>
              Book a Strategy Session
            </button>
          </Link>
          <Link href="/cases">
            <button className="bs" style={{ padding: '13px 26px' }}>
              More Case Studies
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
