'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, login, logout, type AdminRole } from '@/lib/admin-auth';

interface DashCard {
  href: string;
  label: string;
  icon: string;
  bg: string;
  adminOnly?: boolean;
}

const CARDS: DashCard[] = [
  { href: '/admin/cases', label: 'Case Studies', icon: '📋', bg: 'rgba(107,159,212,.12)' },
  { href: '/admin/chatbot', label: 'Chatbot', icon: '💬', bg: 'rgba(236,169,52,.12)' },
  { href: '/admin/social', label: 'Social Media', icon: '📱', bg: 'rgba(139,159,212,.12)' },
  { href: '/admin/backgrounds', label: 'Page Backgrounds', icon: '🖼', bg: 'rgba(76,175,80,.12)' },
  { href: '/admin/navigation', label: 'Navigation', icon: '🧭', bg: 'rgba(236,169,52,.12)' },
  { href: '/admin/submissions', label: 'Submissions', icon: '📥', bg: 'rgba(107,159,212,.12)' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️', bg: 'rgba(255,255,255,.06)', adminOnly: true },
];

export default function AdminHomePage() {
  const router = useRouter();
  const [authed, setAuthed] = useState<{ user: string; role: AdminRole } | null>(null);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setAuthed(getSession());
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const res = login(user, pass);
    if (res.ok) setAuthed(getSession());
    else setErr(res.error ?? 'Login failed.');
  }

  function onLogout() {
    logout();
    setAuthed(null);
    router.push('/admin');
  }

  if (!authed) {
    return (
      <div style={loginShellStyle}>
        <form onSubmit={onSubmit} style={loginBoxStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 11,
                background: 'rgba(236,169,52,.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
              }}
            >
              🔐
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 20 }}>Admin Login</h2>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--dim)' }}>Mirror Advisors Dashboard</p>
            </div>
          </div>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            autoComplete="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={inputStyle}
          />
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={inputStyle}
          />
          {err && (
            <div style={{ fontSize: 12, color: 'rgba(255,80,80,.9)', marginBottom: 10 }}>{err}</div>
          )}
          <button type="submit" style={primaryBtnStyle}>
            Sign In →
          </button>
          <div style={{ marginTop: 16, fontSize: 11, color: 'var(--dim)', textAlign: 'center' }}>
            <Link href="/" style={{ color: 'var(--dim)' }}>← Back to site</Link>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--dim)', letterSpacing: '.07em' }}>SIGNED IN AS</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{authed.user}</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/" style={{ ...secondaryBtnStyle, textDecoration: 'none' }}>
            ← View Site
          </Link>
          <button onClick={onLogout} style={secondaryBtnStyle}>
            Sign Out
          </button>
        </div>
      </div>

      <h1 style={{ margin: '0 0 8px', fontSize: 32 }}>Admin Dashboard</h1>
      <p style={{ color: 'var(--dim)', margin: '0 0 32px' }}>Pick a subsystem to manage.</p>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))' }}>
        {CARDS.filter((c) => !c.adminOnly || authed.role === 'admin').map((c) => (
          <Link
            key={c.href}
            href={c.href}
            style={{
              display: 'block',
              padding: 20,
              borderRadius: 14,
              background: c.bg,
              border: '1px solid rgba(255,255,255,.08)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 14 }}>
              {c.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const loginShellStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
};
const loginBoxStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: 380,
  padding: 32,
  background: 'rgba(255,255,255,.03)',
  border: '1px solid rgba(255,255,255,.08)',
  borderRadius: 14,
};
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '.07em',
  color: 'var(--dim)',
  margin: '12px 0 6px',
};
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  background: 'rgba(255,255,255,.04)',
  border: '1px solid rgba(255,255,255,.1)',
  borderRadius: 8,
  color: '#fff',
  fontSize: 14,
  marginBottom: 4,
};
const primaryBtnStyle: React.CSSProperties = {
  width: '100%',
  padding: 12,
  marginTop: 16,
  background: '#ECA934',
  color: '#0D1232',
  border: 'none',
  borderRadius: 8,
  fontWeight: 700,
  fontFamily: "'Montserrat',sans-serif",
  cursor: 'pointer',
};
const secondaryBtnStyle: React.CSSProperties = {
  padding: '8px 14px',
  background: 'rgba(255,255,255,.06)',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: 7,
  color: 'rgba(255,255,255,.7)',
  fontSize: 12,
  fontFamily: "'Montserrat',sans-serif",
  fontWeight: 700,
  cursor: 'pointer',
};
