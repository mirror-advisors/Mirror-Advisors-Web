'use client';

// CLIENT-SIDE AUTH — matches the legacy site's trust model exactly.
// The original SPA stored credentials in localStorage and gated UI client-side.
// This is NOT secure auth; anyone with the bundle can read it. Replace with a
// real server-side session when the admin panel is rebuilt.

const STORAGE_KEY = 'ma_admin_session';
const CREDS_KEY = 'ma_admin_creds';
const SUBADMIN_KEY = 'ma_admin_subadmins';

const DEFAULT_CREDS = { user: 'MAAdmin1', pass: 'MA20262027!' };

export type AdminRole = 'admin' | 'subadmin';

export interface SubAdmin {
  user: string;
  pass: string;
}

function readCreds(): typeof DEFAULT_CREDS {
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_CREDS;
}

function readSubAdmins(): SubAdmin[] {
  try {
    const raw = localStorage.getItem(SUBADMIN_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function getSubAdmins(): SubAdmin[] {
  return readSubAdmins();
}

export function saveSubAdmins(list: SubAdmin[]) {
  try {
    localStorage.setItem(SUBADMIN_KEY, JSON.stringify(list));
  } catch {}
}

export function login(user: string, pass: string): { ok: boolean; role?: AdminRole; error?: string } {
  const creds = readCreds();
  if (user === creds.user && pass === creds.pass) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, role: 'admin' }));
    } catch {}
    return { ok: true, role: 'admin' };
  }
  const sub = readSubAdmins().find((s) => s.user === user && s.pass === pass);
  if (sub) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, role: 'subadmin' }));
    } catch {}
    return { ok: true, role: 'subadmin' };
  }
  return { ok: false, error: 'Incorrect username or password.' };
}

export function logout() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function getSession(): { user: string; role: AdminRole } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function updateCreds(current: { user: string; pass: string }, next: Partial<{ user: string; pass: string }>) {
  const creds = readCreds();
  if (current.pass !== creds.pass || current.user !== creds.user) {
    return { ok: false as const, error: 'Current credentials do not match.' };
  }
  const merged = { user: next.user || creds.user, pass: next.pass || creds.pass };
  try {
    localStorage.setItem(CREDS_KEY, JSON.stringify(merged));
  } catch {}
  return { ok: true as const };
}
