import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { getSupabase } from '../../lib/supabase';
import { getCurrentUser, signOut } from '../../lib/site-config';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [currentEmail, setCurrentEmail] = useState(null);

  // On mount: check if already logged in
  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      if (user && user.email) setCurrentEmail(user.email);
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const supa = getSupabase();
    if (!supa) {
      setError('Supabase client unavailable. Try refreshing the page.');
      setSubmitting(false);
      return;
    }

    try {
      const { data, error: authError } = await supa.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (authError) {
        setError(authError.message || 'Login failed.');
        setSubmitting(false);
        return;
      }
      if (data && data.user) {
        // Land on home with ?admin=open so Layout auto-opens the admin overlay
        // (handled in components/Layout.js).
        router.push('/?admin=open');
        return;
      }
      setError('Login failed. Please try again.');
    } catch (err) {
      setError(err && err.message ? err.message : 'Unexpected error during login.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    setCurrentEmail(null);
    setEmail('');
    setPassword('');
  }

  // Already-logged-in state
  if (currentEmail) {
    return (
      <>
        <Head><title>Admin · Mirror Advisors</title></Head>
        <div style={containerStyle}>
          <div style={cardStyle}>
            <div style={logoStyle}>Mirror Advisors · Admin</div>
            <div style={{ marginBottom: 20, color: '#A0AEC0', fontSize: 14 }}>
              Signed in as <strong style={{ color: '#fff' }}>{currentEmail}</strong>
            </div>
            <p style={{ color: '#A0AEC0', fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>
              You can now use the admin panel anywhere on the site. Changes you save will
              persist to Supabase and update the live site for every visitor.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/" style={primaryBtn}>Go to site</Link>
              <button type="button" onClick={handleSignOut} style={secondaryBtn}>Sign out</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Login form
  return (
    <>
      <Head><title>Sign in · Mirror Advisors Admin</title></Head>
      <div style={containerStyle}>
        <form onSubmit={handleSubmit} style={cardStyle}>
          <div style={logoStyle}>Mirror Advisors · Admin</div>
          <div style={{ color: '#A0AEC0', fontSize: 13, marginBottom: 22 }}>
            Sign in to make changes that go live for every visitor.
          </div>

          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            style={inputStyle}
            placeholder="you@mirroradvisors.com"
            disabled={submitting}
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            style={inputStyle}
            disabled={submitting}
          />

          {error && (
            <div style={errorBoxStyle}>{error}</div>
          )}

          <button type="submit" disabled={submitting} style={primaryBtn}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>

          <div style={{ marginTop: 18, fontSize: 11, color: '#5A6478', textAlign: 'center' }}>
            Restricted access. If you don&apos;t have an account, contact the site owner.
          </div>
        </form>
      </div>
    </>
  );
}

// ── inline styles (avoid Tailwind-style class dependencies) ───────────────
const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  background: '#080B1A',
  fontFamily: "'DM Sans', sans-serif",
};
const cardStyle = {
  width: '100%',
  maxWidth: 380,
  padding: '36px 32px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
  color: '#fff',
};
const logoStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: 18,
  fontWeight: 800,
  color: '#ECA934',
  letterSpacing: '-0.01em',
  marginBottom: 4,
};
const labelStyle = {
  display: 'block',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#A0AEC0',
  marginBottom: 6,
  marginTop: 12,
};
const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  background: 'rgba(0,0,0,0.25)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  color: '#fff',
  fontSize: 14,
  fontFamily: "'DM Sans', sans-serif",
  outline: 'none',
  boxSizing: 'border-box',
};
const errorBoxStyle = {
  marginTop: 14,
  padding: '10px 12px',
  background: 'rgba(239,68,68,0.08)',
  border: '1px solid rgba(239,68,68,0.25)',
  borderRadius: 8,
  color: '#FCA5A5',
  fontSize: 12,
  lineHeight: 1.5,
};
const primaryBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: 22,
  padding: '12px 20px',
  background: '#ECA934',
  color: '#0F1424',
  border: 'none',
  borderRadius: 8,
  fontFamily: "'Montserrat', sans-serif",
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: '0.02em',
  cursor: 'pointer',
  textDecoration: 'none',
};
const secondaryBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 20px',
  background: 'transparent',
  color: '#A0AEC0',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 8,
  fontFamily: "'Montserrat', sans-serif",
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
};
