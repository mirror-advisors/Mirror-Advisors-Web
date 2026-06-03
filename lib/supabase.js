// Supabase client singleton.
//
// The URL + anon key are hardcoded here — both are designed to be public
// (the anon key is what every visitor's browser uses to read data, and the
// site's row-level-security policies are the actual security boundary, not
// the key itself). Falls back to NEXT_PUBLIC_* env vars if those are set on
// Vercel, so we can switch to env-var-driven config later with no code change.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_URL) ||
  'https://vytrclwxvbhlxrvssiod.supabase.co';

const SUPABASE_ANON_KEY =
  (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dHJjbHd4dmJobHhydnNzaW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODY2NjIsImV4cCI6MjA5NjA2MjY2Mn0.z2_gPtcKb8k62SrRB2GjM7Fb1inpSLsQj27L3Hbnwcs';

let _client = null;

/**
 * Return a singleton browser-side Supabase client. SSR-safe — returns null on
 * the server so any caller can short-circuit gracefully.
 */
export function getSupabase() {
  if (typeof window === 'undefined') return null;
  if (!_client) {
    _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return _client;
}

export { SUPABASE_URL, SUPABASE_ANON_KEY };
