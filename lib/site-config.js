// Helpers around the `site_config` table in Supabase.
//
// Schema: ( key text primary key, value jsonb, updated_at timestamptz, updated_by uuid )
//
// Reads are open to the public (anon key + RLS). Writes require an authenticated
// session (i.e. admin logged in via /admin/login).
//
// Each helper degrades gracefully when Supabase is unreachable — readers return
// `null` so callers fall back to the hardcoded defaults baked into site-runtime.js.

import { getSupabase } from './supabase';

// Canonical list of config keys. Keep in sync with the SQL seed rows.
export const CONFIG_KEYS = [
  'cases',
  'nav_pages',
  'social_links',
  'page_backgrounds',
  'chat_tree',
  'site_settings',
];

/**
 * Fetch every config row in one round-trip. Returns an object keyed by config
 * name, e.g. { cases: [...], nav_pages: [...], social_links: {...}, ... }.
 * Returns null on any error — caller should use defaults.
 */
export async function fetchAllConfig() {
  const supa = getSupabase();
  if (!supa) return null;
  try {
    const { data, error } = await supa
      .from('site_config')
      .select('key,value')
      .in('key', CONFIG_KEYS);
    if (error) {
      console.warn('[site-config] fetchAllConfig error:', error.message);
      return null;
    }
    const out = {};
    (data || []).forEach((row) => {
      out[row.key] = row.value;
    });
    return out;
  } catch (e) {
    console.warn('[site-config] fetchAllConfig exception:', e);
    return null;
  }
}

/**
 * Fetch one config row. Returns the parsed value or null on error/missing.
 */
export async function fetchConfig(key) {
  const supa = getSupabase();
  if (!supa) return null;
  try {
    const { data, error } = await supa
      .from('site_config')
      .select('value')
      .eq('key', key)
      .single();
    if (error) {
      if (error.code !== 'PGRST116') {
        // PGRST116 = no rows found — not really an error here.
        console.warn('[site-config] fetchConfig(' + key + ') error:', error.message);
      }
      return null;
    }
    return data ? data.value : null;
  } catch (e) {
    console.warn('[site-config] fetchConfig(' + key + ') exception:', e);
    return null;
  }
}

/**
 * Save (upsert) one config row. Requires an authenticated session — RLS will
 * reject unauthenticated writes. Returns true on success, false otherwise.
 */
export async function saveConfig(key, value) {
  const supa = getSupabase();
  if (!supa) return false;
  try {
    const { error } = await supa
      .from('site_config')
      .upsert({ key, value }, { onConflict: 'key' });
    if (error) {
      console.warn('[site-config] saveConfig(' + key + ') error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('[site-config] saveConfig(' + key + ') exception:', e);
    return false;
  }
}

/**
 * Convenience: is there a currently-signed-in user? Reads from the cached
 * session (synchronous-ish, no network round-trip) so we don't race against
 * fresh sign-ins.
 */
export async function getCurrentUser() {
  const supa = getSupabase();
  if (!supa) return null;
  try {
    const { data } = await supa.auth.getSession();
    return data && data.session && data.session.user ? data.session.user : null;
  } catch (e) {
    return null;
  }
}

/**
 * Sign out the current admin. Safe to call even if no session.
 */
export async function signOut() {
  const supa = getSupabase();
  if (!supa) return;
  try {
    await supa.auth.signOut();
  } catch (e) {
    // ignore
  }
}

// ─── SUBMISSIONS table helpers ──────────────────────────────────────────────
// Schema (see SQL migration in admin docs):
//   id text primary key, data jsonb, status text, contacted bool,
//   created_at timestamptz, updated_at timestamptz
//
// RLS: anyone can INSERT (public contact form). Only authenticated can
// SELECT / UPDATE / DELETE (admin only).

/** Insert a new submission. Returns true on success. */
export async function insertSubmission(submission) {
  const supa = getSupabase();
  if (!supa) return false;
  try {
    const { error } = await supa.from('submissions').insert({
      id: String(submission.id),
      data: submission,
      status: String(submission.status || 'New').toLowerCase(),
      contacted: !!submission.contacted,
    });
    if (error) {
      console.warn('[submissions] insert error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('[submissions] insert exception:', e);
    return false;
  }
}

/** Fetch all submissions (newest first). Returns array or null on failure. */
export async function fetchSubmissions() {
  const supa = getSupabase();
  if (!supa) return null;
  try {
    const { data, error } = await supa
      .from('submissions')
      .select('id,data,status,contacted,created_at')
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('[submissions] fetch error:', error.message);
      return null;
    }
    // Re-merge structured columns back into the legacy submission shape so
    // existing admin UI code doesn't need to change.
    return (data || []).map(function (row) {
      var sub = Object.assign({}, row.data || {});
      sub.id = row.id;
      sub.status = row.status;
      sub.contacted = row.contacted;
      return sub;
    });
  } catch (e) {
    console.warn('[submissions] fetch exception:', e);
    return null;
  }
}

/** Update a submission's status/contacted/data. Returns true on success. */
export async function updateSubmission(id, patch) {
  const supa = getSupabase();
  if (!supa) return false;
  try {
    const update = {};
    if (patch.status !== undefined) update.status = String(patch.status).toLowerCase();
    if (patch.contacted !== undefined) update.contacted = !!patch.contacted;
    if (patch.data !== undefined) update.data = patch.data;
    const { error } = await supa
      .from('submissions')
      .update(update)
      .eq('id', String(id));
    if (error) {
      console.warn('[submissions] update error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('[submissions] update exception:', e);
    return false;
  }
}

/** Delete a submission. Returns true on success. */
export async function deleteSubmission(id) {
  const supa = getSupabase();
  if (!supa) return false;
  try {
    const { error } = await supa.from('submissions').delete().eq('id', String(id));
    if (error) {
      console.warn('[submissions] delete error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('[submissions] delete exception:', e);
    return false;
  }
}
