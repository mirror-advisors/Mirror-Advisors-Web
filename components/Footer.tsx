'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <div className="pg-footer">
      <div className="pg-foot-in">
        <div className="pg-foot-top">
          <div className="pft-brand">
            <Link
              href="/"
              className="logo"
              style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 4 }}
            >
              <span className="logo-n">Mirror Advisors</span>
            </Link>
            <p className="pft-brand-desc">
              We build the technology infrastructure that lets ambitious businesses move faster — custom AI
              apps, enterprise ERP, and deep systems integration.
            </p>
            <div className="pft-tagline">Zoho One &bull; Anthropic Claude AI</div>
            <div className="pft-social"></div>
          </div>

          <div>
            <div className="pft-col-title">Services</div>
            <div className="pft-links">
              <Link href="/services">Scope Engagement</Link>
              <Link href="/erp">ERP Projects</Link>
              <Link href="/infinity">Infinity Mirror</Link>
              <Link href="/bankhours">Bank of Hours</Link>
              <Link href="/support">Support Only</Link>
            </div>
          </div>

          <div>
            <div className="pft-col-title">Company</div>
            <div className="pft-links">
              <Link href="/about">About</Link>
              <Link href="/cases">Case Studies</Link>
              <Link href="/technology">Technology</Link>
              <Link href="/contact">Contact Us</Link>
              <a href="https://app.mirroradvisors.com" target="_blank" rel="noopener">
                Infinity Portal &#8599;
              </a>
            </div>
          </div>

          <div>
            <div className="pft-col-title">Contact</div>
            <div className="pft-contact">
              <a href="tel:+17138877492" className="pft-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>713-887-7492</span>
              </a>
              <a href="mailto:info@mirroradvisors.com" className="pft-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>info@mirroradvisors.com</span>
              </a>
              <div className="pft-contact-item pft-contact-addr">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  2002 Timberloch Pl, Suite 200
                  <br />
                  The Woodlands, TX 77380
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pg-foot-bottom">
          <div className="foot-copy">&copy; {new Date().getFullYear()} Mirror Advisors. All rights reserved.</div>
          <div className="foot-legal-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/accessibility">Accessibility</Link>
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.removeItem('ma_cookie_consent');
                  window.dispatchEvent(new Event('ma:cookie-reset'));
                } catch {}
              }}
            >
              Cookie Preferences
            </button>
          </div>
          <div className="foot-badges">
            <span className="foot-badge">Zoho Partner</span>
            <span className="foot-badge">Claude AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
