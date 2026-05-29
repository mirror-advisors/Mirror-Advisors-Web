'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CASES } from '@/lib/cases';

// Horizontal drag-to-scroll carousel. The track is duplicated so the scroll
// feels endless — click anywhere to navigate to the case detail page.

export function CasesTrack() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    moved: 0,
  });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onMouseDown = (e: MouseEvent) => {
      dragState.current.isDown = true;
      dragState.current.startX = e.pageX - wrap.offsetLeft;
      dragState.current.scrollLeft = wrap.scrollLeft;
      dragState.current.moved = 0;
      setDragging(true);
      e.preventDefault();
    };
    const onMouseUpOrLeave = () => {
      dragState.current.isDown = false;
      setDragging(false);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!dragState.current.isDown) return;
      const x = e.pageX - wrap.offsetLeft;
      const dx = x - dragState.current.startX;
      dragState.current.moved = Math.abs(dx);
      wrap.scrollLeft = dragState.current.scrollLeft - dx;
    };

    const onTouchStart = (e: TouchEvent) => {
      dragState.current.startX = e.touches[0].pageX - wrap.offsetLeft;
      dragState.current.scrollLeft = wrap.scrollLeft;
      setDragging(true);
    };
    const onTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].pageX - wrap.offsetLeft;
      wrap.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX);
    };
    const onTouchEnd = () => setDragging(false);

    wrap.addEventListener('mousedown', onMouseDown);
    wrap.addEventListener('mouseup', onMouseUpOrLeave);
    wrap.addEventListener('mouseleave', onMouseUpOrLeave);
    wrap.addEventListener('mousemove', onMouseMove);
    wrap.addEventListener('touchstart', onTouchStart, { passive: true });
    wrap.addEventListener('touchmove', onTouchMove, { passive: true });
    wrap.addEventListener('touchend', onTouchEnd);

    return () => {
      wrap.removeEventListener('mousedown', onMouseDown);
      wrap.removeEventListener('mouseup', onMouseUpOrLeave);
      wrap.removeEventListener('mouseleave', onMouseUpOrLeave);
      wrap.removeEventListener('mousemove', onMouseMove);
      wrap.removeEventListener('touchstart', onTouchStart);
      wrap.removeEventListener('touchmove', onTouchMove);
      wrap.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Duplicate the cases array so the track feels longer for dragging.
  const items = [...CASES, ...CASES];

  return (
    <div className="cases-track-wrap" ref={wrapRef} style={{ overflowX: 'auto', cursor: dragging ? 'grabbing' : 'grab' }}>
      <div
        className={`cases-track${dragging ? ' dragging' : ''}`}
        ref={trackRef}
        style={{ display: 'flex', gap: 16, padding: '4px 24px' }}
      >
        {items.map((c, i) => (
          <Link
            key={`${c.slug}-${i}`}
            href={`/cases/${c.slug}`}
            className="csc ccard"
            style={{
              minWidth: 320,
              maxWidth: 320,
              cursor: dragging ? 'grabbing' : 'pointer',
              textDecoration: 'none',
              color: 'inherit',
            }}
            onClick={(e) => {
              // Suppress click if drag-moved more than a few pixels
              if (dragState.current.moved > 6) {
                e.preventDefault();
              }
            }}
            draggable={false}
          >
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
    </div>
  );
}
