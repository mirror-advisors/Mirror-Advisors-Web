'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSession, type AdminRole } from '@/lib/admin-auth';

export function AdminStub({
  title,
  description,
  legacyRef,
  children,
}: {
  title: string;
  description: string;
  legacyRef: string;
  children?: React.ReactNode;
}) {
  const [session, setSession] = useState<{ user: string; role: AdminRole } | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSession(getSession());
    setHydrated(true);
  }, []);

  if (!hydrated) return null;
  if (!session) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>You must sign in to access this dashboard.</p>
        <Link href="/admin" style={{ color: 'var(--t)' }}>
          → Go to login
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Link href="/admin" style={{ color: 'var(--dim)', textDecoration: 'none', fontSize: 13 }}>
          ← All dashboards
        </Link>
        <div style={{ fontSize: 11, color: 'var(--dim)', letterSpacing: '.07em' }}>
          Signed in as <strong style={{ color: '#fff' }}>{session.user}</strong>
        </div>
      </div>
      <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>{title}</h1>
      <p style={{ color: 'var(--dim)', margin: '0 0 24px' }}>{description}</p>

      <div
        style={{
          padding: 20,
          background: 'rgba(236,169,52,.06)',
          border: '1px solid rgba(236,169,52,.2)',
          borderRadius: 12,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 700,
            color: 'var(--t)',
            fontSize: 12,
            marginBottom: 8,
            letterSpacing: '.07em',
          }}
        >
          MIGRATION IN PROGRESS
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: 'var(--text-mid)' }}>
          The full editor UI from the legacy SPA hasn&apos;t been ported yet. The original implementation
          lives in <code>{legacyRef}</code>. A proper rebuild needs a real backend (database / API
          route) — the legacy version used <code>window._*</code> globals backed by browser{' '}
          <code>localStorage</code>, which doesn&apos;t persist across users or sessions.
        </p>
      </div>

      {children}
    </div>
  );
}
