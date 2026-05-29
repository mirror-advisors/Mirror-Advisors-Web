'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV_PAGES, MOBILE_NAV_PAGES } from '@/lib/nav';

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.classList.add('menu-open');
    else document.body.classList.remove('menu-open');
    return () => document.body.classList.remove('menu-open');
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <nav id="nav" className={scrolled ? 'is-scrolled' : ''}>
        <div className="nav-in">
          <Link href="/" className="logo" onClick={() => setMobileOpen(false)}>
            <span className="logo-n">Mirror Advisors</span>
          </Link>
          <div className="nl" id="navLinks">
            {NAV_PAGES.filter((p) => p.enabled).map((p) => (
              <Link key={p.key} href={p.href}>
                {p.label}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a
              href="https://app.mirroradvisors.com"
              target="_blank"
              rel="noopener"
              className="portal-btn"
            >
              <div className="portal-icon">
                <svg
                  className="inf-spin"
                  width="11"
                  height="8"
                  viewBox="0 0 44 20"
                  fill="none"
                  stroke="#0D1232"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                >
                  <path d="M22 10 C22 10 18 2 10 2 C4 2 1 6 1 10 C1 14 4 18 10 18 C18 18 22 10 22 10 C22 10 26 2 34 2 C40 2 43 6 43 10 C43 14 40 18 34 18 C26 18 22 10 22 10 Z" />
                </svg>
              </div>
              <span>Infinity Portal</span>
            </a>
            <Link href="/contact">
              <button className="ncta">Book a Call &rarr;</button>
            </Link>
            <button
              className={`nav-hamburger${mobileOpen ? ' is-open' : ''}`}
              aria-label="Open menu"
              aria-controls="mobileMenu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-menu-backdrop${mobileOpen ? ' is-open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`mobile-menu${mobileOpen ? ' is-open' : ''}`}
        id="mobileMenu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        {MOBILE_NAV_PAGES.filter((p) => p.enabled).map((p) => (
          <Link key={p.key} href={p.href} className="mm-link" onClick={() => setMobileOpen(false)}>
            {p.label}
          </Link>
        ))}
        <div className="mm-cta-wrap">
          <a
            href="https://app.mirroradvisors.com"
            target="_blank"
            rel="noopener"
            className="portal-btn"
            onClick={() => setMobileOpen(false)}
          >
            <span>Infinity Portal &#8599;</span>
          </a>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>
            <button className="ncta">Book a Call &rarr;</button>
          </Link>
        </div>
      </aside>
    </>
  );
}
