// POST /api/ai-signup
//
// Handles submissions from the conversational sign-up form on
// /artificial-intelligence. Formats the answers into an HTML email and
// hands it to Resend for delivery.
//
// Env vars (set in Vercel → Settings → Environment Variables):
//   RESEND_API_KEY   (required) your Resend API key (starts with re_…)
//   RESEND_FROM      (optional) the verified sender, e.g.
//                    "AI Signups <noreply@mirroradvisors.com>".
//                    Defaults to Resend's sandbox onboarding@resend.dev,
//                    which always works but says "onboarding@resend.dev"
//                    as the visible from-address until you set a
//                    verified sender.
//   RESEND_TO        (optional) recipient inbox. Defaults to
//                    sythe@mirroradvisors.com.
//
// If RESEND_API_KEY isn't set, the endpoint still accepts the submission
// but returns { ok: false, error: 'notif_disabled' } so it fails loudly
// instead of silently dropping the lead.

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function bad(res, code, err) {
  return res.status(code).json({ ok: false, error: err });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return bad(res, 405, 'method_not_allowed');
  }

  // Parse body
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (_) { return bad(res, 400, 'invalid_json'); }
  }
  if (!body || typeof body !== 'object') return bad(res, 400, 'invalid_body');

  const name         = String(body.name         || '').trim();
  const phone        = String(body.phone        || '').trim();
  const email        = String(body.email        || '').trim();
  const hasWebsite   = String(body.hasWebsite   || '').trim();
  const websiteUrl   = String(body.websiteUrl   || '').trim();
  const wantsWebsite = String(body.wantsWebsite || '').trim();
  const motivation   = Array.isArray(body.motivation) ? body.motivation : (body.motivation ? [body.motivation] : []);
  const techstack    = String(body.techstack    || '').trim();
  const contactTime  = String(body.contactTime  || '').trim();

  // Minimum sanity: name + email required so the lead is actually reachable.
  if (!name)  return bad(res, 400, 'missing_name');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return bad(res, 400, 'missing_email');
  }

  // ── Compose the HTML email ────────────────────────────────────────────
  const rows = [];
  const row = (label, value) => {
    if (!value) return;
    rows.push(
      '<tr>' +
        '<td style="padding:12px 16px;background:#F7F5EF;border-bottom:1px solid #E8E1D0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;color:#8A8A92;letter-spacing:.08em;text-transform:uppercase;width:200px;vertical-align:top">' + esc(label) + '</td>' +
        '<td style="padding:12px 16px;background:#FFFFFF;border-bottom:1px solid #E8E1D0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:14px;color:#1A1A1E;line-height:1.5">' + value + '</td>' +
      '</tr>'
    );
  };

  row('Name',          esc(name));
  row('Phone',         phone ? '<a href="tel:' + esc(phone) + '" style="color:#B8811F;text-decoration:none">' + esc(phone) + '</a>' : '');
  row('Business email',email ? '<a href="mailto:' + esc(email) + '" style="color:#B8811F;text-decoration:none">' + esc(email) + '</a>' : '');
  row('Has a website?',esc(hasWebsite || '—'));
  if (websiteUrl)   row('Website URL', '<a href="' + esc(websiteUrl) + '" style="color:#B8811F;text-decoration:none">' + esc(websiteUrl) + '</a>');
  if (wantsWebsite) row('Interested in $100 basic site?', esc(wantsWebsite));
  row('Motivation for AI', motivation.length ? '<ul style="margin:0;padding-left:18px">' + motivation.map(m => '<li>' + esc(m) + '</li>').join('') + '</ul>' : '&mdash;');
  row('Current tech stack', esc(techstack || '—'));
  row('Best time / method to reach out', esc(contactTime || '—').replace(/\n/g, '<br/>'));

  const html =
    '<!doctype html><html><body style="margin:0;padding:32px 16px;background:#FAF6EE;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:#1A1A1E">' +
      '<table role="presentation" style="max-width:640px;margin:0 auto;border-collapse:collapse;background:#FFFFFF;border:1px solid #E3DBC6;border-radius:12px;overflow:hidden">' +
        '<tr><td style="padding:28px 30px 20px;border-bottom:1px solid #E8E1D0;background:linear-gradient(180deg,#FAF6EE 0%,#F5F0E4 100%)">' +
          '<div style="font-size:11px;font-weight:700;color:#B8811F;letter-spacing:.14em;text-transform:uppercase;margin-bottom:6px">Mirror Advisors &middot; AI Sign-up</div>' +
          '<div style="font-size:22px;font-weight:700;color:#1A1A1E;letter-spacing:-.01em">New free-chatbot-session request</div>' +
          '<div style="font-size:14px;color:#5A5A62;margin-top:8px">' + esc(name) + ' filled the conversational sign-up on the AI page.</div>' +
        '</td></tr>' +
        '<tr><td style="padding:0"><table role="presentation" style="width:100%;border-collapse:collapse">' + rows.join('') + '</table></td></tr>' +
        '<tr><td style="padding:18px 30px;background:#F7F5EF;font-size:11px;color:#8A8A92;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif">Sent from /api/ai-signup &middot; mirroradvisors.com</td></tr>' +
      '</table>' +
    '</body></html>';

  // Plain-text fallback for email clients that reject/hide HTML
  const textLines = [
    'New AI free-chatbot-session request',
    '',
    'Name: '          + name,
    'Phone: '         + (phone || '—'),
    'Business email: '+ email,
    'Has website? '   + (hasWebsite || '—'),
  ];
  if (websiteUrl)   textLines.push('Website URL: '                    + websiteUrl);
  if (wantsWebsite) textLines.push('Interested in $100 basic site? '  + wantsWebsite);
  textLines.push(
    'Motivation for AI: '  + (motivation.length ? motivation.join(', ') : '—'),
    'Current tech stack: ' + (techstack   || '—'),
    'Best time / method: ' + (contactTime || '—'),
  );
  const text = textLines.join('\n');

  // ── Send via Resend ───────────────────────────────────────────────────
  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    console.error('[/api/ai-signup] RESEND_API_KEY env var missing — cannot notify.');
    return res.status(500).json({
      ok:       false,
      error:    'notif_disabled',
      friendly: 'Submission received, but email notification is currently offline. We\'ll follow up.',
    });
  }
  const from = process.env.RESEND_FROM || 'onboarding@resend.dev';
  const to   = process.env.RESEND_TO   || 'sythe@mirroradvisors.com';

  try {
    const rr = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_KEY,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,     // hitting Reply in your inbox mails the lead
        subject: 'AI Signup · ' + name,
        html,
        text,
      }),
    });
    if (!rr.ok) {
      const txt = await rr.text().catch(() => '');
      console.error('[/api/ai-signup] Resend HTTP ' + rr.status + ': ' + txt.slice(0, 500));
      return res.status(502).json({ ok: false, error: 'resend_http_' + rr.status });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[/api/ai-signup] fetch error:', e && e.message ? e.message : e);
    return res.status(502).json({ ok: false, error: 'fetch_error' });
  }
}
