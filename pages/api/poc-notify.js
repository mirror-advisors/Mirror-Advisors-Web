// POST /api/poc-notify
//
// Sends an email to sythe@mirroradvisors.com every time a visitor uses the
// PoC Lab on /services/custom-ai-application to generate a proof-of-concept
// preview. The PoC itself renders client-side and doesn't persist anywhere —
// this endpoint is the ONLY breadcrumb the visitor leaves behind.
//
// Requires the RESEND_API_KEY env var (already configured on Vercel for the
// Supabase → Postgres → Resend submission-notification trigger; we're just
// calling Resend directly here to avoid persisting a row).
//
// Payload (JSON):
//   {
//     companyName:  string  (required, ≤200 chars)
//     details:      string  (required, ≤4000 chars)
//     pocType:      'Website' | 'Custom CRM'  (required)
//     logoDataUrl:  string? (optional, must be a data:image/... URL)
//   }
//
// Body-parser size cap set to 2mb below to accommodate reasonable logo
// data-URLs. Larger uploads (>1MB) are rejected client-side before they
// reach this endpoint.

export const config = {
  api: {
    bodyParser: { sizeLimit: '2mb' },
  },
};

const ALLOWED_POC_TYPES = new Set(['Website', 'Custom CRM']);

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildEmailHtml({ companyName, details, pocType, logoDataUrl }) {
  const safe = {
    name:    escapeHtml(companyName),
    details: escapeHtml(details).replace(/\n/g, '<br>'),
    type:    escapeHtml(pocType),
  };

  // Only accept data URLs for common raster + SVG image types.
  const logoOk = typeof logoDataUrl === 'string'
              && /^data:image\/(png|jpe?g|svg\+xml|webp|gif);base64,/i.test(logoDataUrl);
  const logoRow = logoOk
    ? `<img src="${logoDataUrl}" alt="${safe.name} logo" style="max-width:140px;max-height:90px;border-radius:10px;background:#fff;padding:10px;display:block">`
    : `<div style="font-family:monospace;color:#7B7F94;font-size:12px">(no logo uploaded)</div>`;

  return `<!doctype html><html><body style="margin:0;background:#080B16;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F7F7F9">
  <div style="max-width:600px;margin:0 auto;background:#0C0F22;border:1px solid rgba(236,169,52,.22);border-radius:16px;overflow:hidden">
    <div style="padding:24px 28px;border-bottom:1px solid rgba(236,169,52,.18);background:radial-gradient(ellipse at 100% 0%, rgba(236,169,52,.12) 0%, transparent 55%)">
      <div style="font-size:11px;color:#ECA934;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px">Mirror Advisors · PoC Lab</div>
      <div style="font-size:22px;font-weight:800;color:#F7F7F9;letter-spacing:-.01em">New PoC generated</div>
    </div>
    <table style="width:100%;border-collapse:collapse;padding:24px 28px" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:20px 28px 10px 28px;color:#7B7F94;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;width:120px;vertical-align:top">Company</td>
        <td style="padding:20px 28px 10px 0;font-weight:700;color:#F7F7F9;font-size:15px">${safe.name}</td>
      </tr>
      <tr>
        <td style="padding:10px 28px 10px 28px;color:#7B7F94;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;vertical-align:top">PoC type</td>
        <td style="padding:10px 28px 10px 0">
          <span style="display:inline-block;padding:4px 12px;border-radius:100px;background:rgba(236,169,52,.15);color:#ECA934;font-size:12px;font-weight:800">${safe.type}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 28px 10px 28px;color:#7B7F94;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;vertical-align:top">Logo</td>
        <td style="padding:10px 28px 10px 0">${logoRow}</td>
      </tr>
      <tr>
        <td style="padding:10px 28px 20px 28px;color:#7B7F94;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;vertical-align:top">Details</td>
        <td style="padding:10px 28px 20px 0;color:#F7F7F9;font-size:14px;line-height:1.6">${safe.details}</td>
      </tr>
    </table>
    <div style="padding:14px 28px;background:rgba(0,0,0,.25);border-top:1px solid rgba(255,255,255,.06);color:#7B7F94;font-size:11px;line-height:1.5">
      Sent from the experimental PoC Lab on /services/custom-ai-application. Nothing was persisted server-side — this email is the only record of the interaction.
    </div>
  </div>
</body></html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('[/api/poc-notify] RESEND_API_KEY not set — cannot send email.');
    return res.status(500).json({ ok: false, error: 'resend_not_configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); }
    catch (_) { return res.status(400).json({ ok: false, error: 'invalid_json' }); }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'invalid_body' });
  }

  const companyName  = String(body.companyName  || '').trim().slice(0, 200);
  const details      = String(body.details      || '').trim().slice(0, 4000);
  const pocType      = String(body.pocType      || '').trim();
  const logoDataUrl  = typeof body.logoDataUrl === 'string' ? body.logoDataUrl : null;

  if (!companyName) return res.status(400).json({ ok: false, error: 'missing_company_name' });
  if (!details)     return res.status(400).json({ ok: false, error: 'missing_details' });
  if (!ALLOWED_POC_TYPES.has(pocType)) {
    return res.status(400).json({ ok: false, error: 'invalid_poc_type' });
  }

  const html = buildEmailHtml({ companyName, details, pocType, logoDataUrl });

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'Mirror Advisors PoC Lab <noreply@mirroradvisors.com>',
        to:      ['sythe@mirroradvisors.com'],
        subject: `PoC Generated: ${companyName} (${pocType})`,
        html,
      }),
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      console.error(`[/api/poc-notify] Resend HTTP ${r.status}: ${String(txt).slice(0, 500)}`);
      return res.status(502).json({ ok: false, error: `resend_http_${r.status}` });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[/api/poc-notify] fetch error:', e && e.message);
    return res.status(502).json({ ok: false, error: 'fetch_error' });
  }
}
