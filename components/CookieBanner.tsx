'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ma_cookie_consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (!v) setVisible(true);
    } catch {
      setVisible(true);
    }
    const onReset = () => setVisible(true);
    window.addEventListener('ma:cookie-reset', onReset);
    return () => window.removeEventListener('ma:cookie-reset', onReset);
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {}
    setVisible(false);
  };
  const decline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'declined');
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner is-open"
      role="dialog"
      aria-labelledby="cookieBannerTitle"
      aria-describedby="cookieBannerText"
    >
      <div className="cookie-banner-body">
        <div className="cookie-banner-title" id="cookieBannerTitle">
          <span className="cookie-banner-title-dot"></span>
          We use cookies
        </div>
        <div className="cookie-banner-text" id="cookieBannerText">
          We use a small set of cookies to keep this site working and understand how it&apos;s used. See our{' '}
          <Link href="/privacy">Privacy Policy</Link> for details.
        </div>
      </div>
      <div className="cookie-banner-actions">
        <button className="cookie-btn cookie-btn-decline" onClick={decline}>
          Decline
        </button>
        <button className="cookie-btn cookie-btn-accept" onClick={accept}>
          Accept
        </button>
      </div>
    </div>
  );
}
