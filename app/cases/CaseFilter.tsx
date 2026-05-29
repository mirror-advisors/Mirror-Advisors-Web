'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { CaseStudy, CaseCategory } from '@/lib/cases';

export function CaseFilter({
  cases,
  categories,
}: {
  cases: CaseStudy[];
  categories: ('All' | CaseCategory)[];
}) {
  const [active, setActive] = useState<'All' | CaseCategory>('All');
  const filtered = active === 'All' ? cases : cases.filter((c) => c.cat === active);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div className="sh" style={{ marginBottom: 0 }}>
          All Case Studies
        </div>
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`fb${active === cat ? ' act' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="case-grid">
        {filtered.map((c) => (
          <Link key={c.slug} href={`/cases/${c.slug}`} className="ccard" style={{ cursor: 'pointer' }}>
            <div className="cc-img" style={{ background: c.gc }}>
              <div className="cc-img-glyph" style={{ color: c.tt }}>
                {c.glyph}
              </div>
              <div className="cc-img-overlay"></div>
            </div>
            <div className="cc-body">
              <span className="cc-tag" style={{ background: c.tc, color: c.tt }}>
                {c.cat}
              </span>
              <div className="cc-title">{c.title}</div>
              <div className="cc-desc">{c.desc}</div>
              <div className="cc-metrics">
                <div>
                  <div className="cc-m-val">{c.m1}</div>
                  <div className="cc-m-lbl">{c.ml1}</div>
                </div>
                <div>
                  <div className="cc-m-val">{c.m2}</div>
                  <div className="cc-m-lbl">{c.ml2}</div>
                </div>
              </div>
              <div className="cc-read">
                Read case study{' '}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
