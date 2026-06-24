// POST /api/contact
//
// Server-side proxy that receives a JSON payload from the contact form and
// forwards it to Zoho Forms as multipart/form-data. We do this server-side
// to avoid the browser's CORS preflight (Zoho's htmlRecords endpoint doesn't
// return CORS headers for cross-origin POST).
//
// The visible form on /contact stays exactly as it was; only the submit
// handler (lib/site-runtime.js → submitForm) was rewired to POST here.
//
// Zoho field-name mapping (do NOT rename these — Zoho keys its CRM record
// and email-template merges off these exact names):
//   Name_First                ← payload.fname
//   Name_Last                 ← payload.lname
//   PhoneNumber_countrycode   ← payload.phone
//   Email                     ← payload.email
//   SingleLine                ← payload.company
//   Number                    ← payload.size      (numeric string)
//   MultipleChoice            ← payload.services  (array, appended once per value)
//   MultiLine                 ← payload.message
//   Dropdown1                 ← payload.timeline
//   zf_referrer_name          ← '' (required by Zoho even when empty)
//   zf_redirect_url           ← ''
//   zc_gad                    ← ''

const ZOHO_ENDPOINT =
  'https://forms.zohopublic.com/mirroradvisors/form/ContactUs/formperma/G9JXv_MlP0JAapZcOhdggz8YY8CwbVxID13bkcXfxuQ/htmlRecords/submit';

// Service options. Values MUST match the option list on the Zoho form
// (forms.zohopublic.com/.../ContactUs) — Zoho's htmlRecords endpoint
// validates MultipleChoice against the exact value strings.
const ALLOWED_SERVICES = new Set([
  'Zoho implementation',
  'Custom apps',
  'Claude AI solutions',
  'Digital marketing',
]);

const ALLOWED_TIMELINES = new Set([
  'As soon as possible',
  'Within 1 month',
  '1-3 months',
  '3-6 months',
  'Just exploring',
]);

// Normalise the timeline string the client sends. The visible <select> uses
// the en-dash "1–3 months" (U+2013) but Zoho's Dropdown1 expects hyphen-minus
// "1-3 months". Convert here so we don't have to touch the markup.
function normaliseTimeline(t) {
  return String(t || '').replace(/–/g, '-').trim();
}

function bad(res, code, message) {
  return res.status(code).json({ ok: false, error: message });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return bad(res, 405, 'method_not_allowed');
  }

  // Parse + validate body
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (_) { return bad(res, 400, 'invalid_json'); }
  }
  if (!body || typeof body !== 'object') return bad(res, 400, 'invalid_body');

  const fname    = String(body.fname    || '').trim();
  const lname    = String(body.lname    || '').trim();
  const email    = String(body.email    || '').trim();
  const phone    = String(body.phone    || '').trim();
  const company  = String(body.company  || '').trim();
  const size     = String(body.size     || '').trim();
  const message  = String(body.message  || '').trim();
  const timeline = normaliseTimeline(body.timeline);
  const services = Array.isArray(body.services) ? body.services : [];

  // Server-side validation mirrors the client. Keeps the API robust against
  // direct POSTs that skip the browser form.
  const errors = {};
  if (!fname)                                                  errors.fname = 'First name is required.';
  if (!lname)                                                  errors.lname = 'Last name is required.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))     errors.email = 'A valid email is required.';
  if (!phone || phone.replace(/\D/g, '').length < 7)           errors.phone = 'A valid phone number is required.';
  if (!company)                                                errors.company = 'Company is required.';
  // Company size is OPTIONAL. If the visitor leaves it blank we accept that.
  // If they provide a value it must be a positive integer.
  if (size && (!/^\d+$/.test(size) || Number(size) < 1))       errors.size = 'Company size must be a positive number.';
  if (!message)                                                errors.message = 'Please tell us how we can help.';
  if (!timeline || !ALLOWED_TIMELINES.has(timeline))           errors.timeline = 'Please pick a timeline.';
  if (!services.length || !services.every(s => ALLOWED_SERVICES.has(s)))
    errors.services = 'Please pick at least one service.';

  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, error: 'validation', fields: errors });
  }

  // Build multipart/form-data using Zoho's exact field names. The native
  // FormData ↔ fetch path automatically negotiates the multipart boundary +
  // Content-Type header. No 'form-data' npm dep required.
  const form = new FormData();
  form.append('Name_First',              fname);
  form.append('Name_Last',               lname);
  form.append('PhoneNumber_countrycode', phone);
  form.append('Email',                   email);
  form.append('SingleLine',              company);
  // Note: the Number (Company Size) field was removed from the Zoho form
  // in Jun 2026 — Zoho's htmlRecords validator now rejects unknown fields.
  // We still capture `size` client-side into Supabase for our own records,
  // but do NOT forward it to Zoho. Keep this block omitted unless / until
  // the Zoho form is reconfigured with a Number field again.
  form.append('MultiLine',               message);
  form.append('Dropdown1',               timeline);
  // MultipleChoice gets one entry per selected service — required by Zoho.
  services.forEach(s => form.append('MultipleChoice', s));
  // Hidden trackers Zoho still expects even when empty.
  form.append('zf_referrer_name', '');
  form.append('zf_redirect_url',  '');
  form.append('zc_gad',           '');

  // POST to Zoho with a hard timeout so a hung upstream can't lock the route.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const zr = await fetch(ZOHO_ENDPOINT, {
      method: 'POST',
      body:   form,
      signal: controller.signal,
      // Zoho will set its own cookies on the response; we don't forward them
      // to the browser since the submission is server-to-server.
    });
    if (!zr.ok) {
      const txt = await zr.text().catch(() => '');
      console.error(`[/api/contact] Zoho HTTP ${zr.status}: ${String(txt).slice(0, 500)}`);
      return res.status(502).json({
        ok:       false,
        error:    `zoho_http_${zr.status}`,
        friendly: 'Sorry — the submission failed on our end. Please try again, or email info@mirroradvisors.com.',
      });
    }
    // Zoho returns a JSON-ish or HTML body on success — we don't need the
    // payload, just the status. A 2xx is the contract.
    return res.status(200).json({ ok: true });
  } catch (e) {
    const aborted = e && e.name === 'AbortError';
    console.error(`[/api/contact] ${aborted ? 'timeout' : 'fetch error'}: ${e && e.message ? e.message : e}`);
    return res.status(aborted ? 504 : 502).json({
      ok:       false,
      error:    aborted ? 'timeout' : 'fetch_error',
      friendly: 'Sorry — the submission failed. Please try again or email info@mirroradvisors.com.',
    });
  } finally {
    clearTimeout(timer);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// OPTIONAL DUAL-WRITE NOTE
// ─────────────────────────────────────────────────────────────────────────────
// This project already records contact submissions in Supabase via
// insertSubmission() called CLIENT-SIDE from window.submitForm. That call
// runs in parallel with the POST to /api/contact, so:
//   - Supabase row appears in the admin Submissions dashboard
//   - The Postgres trigger trg_notify_submission_email fires the Resend
//     notification email to sythe@mirroradvisors.com (if you haven't dropped
//     that trigger after wiring Zoho's own email template)
// No changes needed here. If you ever want to move the Supabase write
// server-side (so an offline browser still records the lead), the spot is
// right above the `return res.status(200).json({ ok: true })` line:
//
//   // import { createClient } from '@supabase/supabase-js';  (top of file)
//   // const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
//   // await sb.from('submissions').insert({...}).catch(()=>{});  // never block
//
// That requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY env vars on Vercel —
// service-role, not anon, so RLS doesn't refuse the insert.
