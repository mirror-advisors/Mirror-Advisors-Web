'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSession, getSubAdmins, saveSubAdmins, updateCreds, type SubAdmin } from '@/lib/admin-auth';

export default function AdminSettingsPage() {
  const [hydrated, setHydrated] = useState(false);
  const [role, setRole] = useState<'admin' | 'subadmin' | null>(null);
  const [currentPass, setCurrentPass] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
  const [subUser, setSubUser] = useState('');
  const [subPass, setSubPass] = useState('');
  const [subErr, setSubErr] = useState<string | null>(null);

  useEffect(() => {
    const s = getSession();
    setRole(s?.role ?? null);
    if (s?.user) setCurrentUser(s.user);
    setSubAdmins(getSubAdmins());
    setHydrated(true);
  }, []);

  if (!hydrated) return null;
  if (role !== 'admin') {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>Only the primary admin can change credentials.</p>
        <Link href="/admin" style={{ color: 'var(--t)' }}>
          ← Back
        </Link>
      </div>
    );
  }

  function save() {
    setErr(null);
    setOk(false);
    if (newPass && newPass !== confirmPass) {
      setErr('New passwords do not match.');
      return;
    }
    const res = updateCreds(
      { user: currentUser, pass: currentPass },
      { user: newUser || undefined, pass: newPass || undefined },
    );
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setOk(true);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setNewUser('');
  }

  function addSub() {
    setSubErr(null);
    if (!subUser.trim() || !subPass.trim()) {
      setSubErr('Both fields required.');
      return;
    }
    if (subAdmins.some((s) => s.user === subUser.trim())) {
      setSubErr('Sub-admin already exists.');
      return;
    }
    const next = [...subAdmins, { user: subUser.trim(), pass: subPass }];
    setSubAdmins(next);
    saveSubAdmins(next);
    setSubUser('');
    setSubPass('');
  }

  function removeSub(user: string) {
    const next = subAdmins.filter((s) => s.user !== user);
    setSubAdmins(next);
    saveSubAdmins(next);
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px' }}>
      <Link href="/admin" style={{ color: 'var(--dim)', textDecoration: 'none', fontSize: 13 }}>
        ← All dashboards
      </Link>
      <h1 style={{ margin: '16px 0 24px', fontSize: 28 }}>Settings</h1>

      <section
        style={{
          padding: 20,
          background: 'rgba(255,255,255,.03)',
          border: '1px solid rgba(255,255,255,.08)',
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <h2 style={{ fontSize: 14, margin: '0 0 16px', letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--dim)' }}>
          Change Credentials
        </h2>
        <Field label="Current Password *" value={currentPass} onChange={setCurrentPass} type="password" />
        <div style={{ height: 1, background: 'rgba(255,255,255,.07)', margin: '14px 0' }} />
        <Field label="New Username (optional)" value={newUser} onChange={setNewUser} />
        <Field label="New Password (optional)" value={newPass} onChange={setNewPass} type="password" />
        <Field label="Confirm New Password" value={confirmPass} onChange={setConfirmPass} type="password" />
        {err && <Message color="error">{err}</Message>}
        {ok && <Message color="success">✓ Credentials updated successfully.</Message>}
        <button onClick={save} style={primaryBtnStyle}>
          Save Changes
        </button>
      </section>

      <section
        style={{
          padding: 20,
          background: 'rgba(255,255,255,.03)',
          border: '1px solid rgba(255,255,255,.08)',
          borderRadius: 12,
        }}
      >
        <h2 style={{ fontSize: 14, margin: '0 0 8px', letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--dim)' }}>
          Sub-Admins
        </h2>
        <p style={{ fontSize: 12, color: 'var(--dim)', marginBottom: 16, lineHeight: 1.6 }}>
          Sub-admins can access all dashboards except Settings.
        </p>
        <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
          {subAdmins.length === 0 && (
            <div style={{ color: 'var(--dim)', fontSize: 13 }}>No sub-admins yet.</div>
          )}
          {subAdmins.map((s) => (
            <div
              key={s.user}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(255,255,255,.06)',
                borderRadius: 8,
              }}
            >
              <span style={{ fontSize: 13 }}>{s.user}</span>
              <button onClick={() => removeSub(s.user)} style={smallBtnStyle}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(255,255,255,.03)', padding: 16, borderRadius: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--dim)', marginBottom: 12, textTransform: 'uppercase' }}>
            Add Sub-Admin
          </div>
          <Field label="Username" value={subUser} onChange={setSubUser} />
          <Field label="Password" value={subPass} onChange={setSubPass} type="password" />
          {subErr && <Message color="error">{subErr}</Message>}
          <button onClick={addSub} style={primaryBtnStyle}>
            + Add Sub-Admin
          </button>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label
        style={{
          display: 'block',
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.07em',
          color: 'var(--dim)',
          margin: '0 0 6px',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 12px',
          background: 'rgba(255,255,255,.04)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 8,
          color: '#fff',
          fontSize: 13,
        }}
      />
    </div>
  );
}

function Message({ color, children }: { color: 'error' | 'success'; children: React.ReactNode }) {
  const styles =
    color === 'error'
      ? { fg: 'rgba(255,80,80,.95)', bg: 'rgba(255,80,80,.08)', bd: 'rgba(255,80,80,.2)' }
      : { fg: '#4CAF50', bg: 'rgba(76,175,80,.08)', bd: 'rgba(76,175,80,.2)' };
  return (
    <div
      style={{
        fontSize: 12,
        color: styles.fg,
        background: styles.bg,
        border: `1px solid ${styles.bd}`,
        borderRadius: 8,
        padding: '9px 12px',
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

const primaryBtnStyle: React.CSSProperties = {
  background: '#ECA934',
  color: '#0D1232',
  border: 'none',
  borderRadius: 8,
  padding: '10px 18px',
  fontWeight: 700,
  fontFamily: "'Montserrat',sans-serif",
  cursor: 'pointer',
  fontSize: 12,
};
const smallBtnStyle: React.CSSProperties = {
  background: 'rgba(255,80,80,.08)',
  border: '1px solid rgba(255,80,80,.2)',
  color: 'rgba(255,80,80,.95)',
  borderRadius: 6,
  padding: '4px 10px',
  fontSize: 11,
  fontFamily: "'Montserrat',sans-serif",
  cursor: 'pointer',
};
