// Supabase Edge Function: POST /functions/v1/chat
//
// Replaces the previous Vercel Next.js API route at /api/chat. The widget
// (lib/site-runtime.js) now POSTs questions here. This function holds the
// Gemini API key as a Supabase secret, builds a grounded prompt from the
// bundled SITE_KNOWLEDGE string, calls Gemini server-side, and returns the
// answer as JSON.
//
// Deploy:
//     supabase secrets set GEMINI_API_KEY=AIza...
//     supabase functions deploy chat
//
// Optional secret:
//     supabase secrets set GEMINI_MODEL=gemini-2.5-flash    # default: gemini-2.0-flash
//
// Local dev:
//     supabase start
//     supabase functions serve chat --env-file ./supabase/.env.local
//   then POST to http://localhost:54321/functions/v1/chat
//
// Runtime: Deno (Supabase Edge Functions). NOT Node.js — use Deno.env.get,
// not process.env.

import { SITE_KNOWLEDGE } from './knowledge.ts';

// ── Configuration ───────────────────────────────────────────────────────────
const GEMINI_MODEL    = Deno.env.get('GEMINI_MODEL') ?? 'gemini-2.0-flash';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// Hard caps so a malicious or runaway client can't blow our quota.
const MAX_QUESTION_CHARS  = 4000;
const MAX_HISTORY_TURNS   = 12;   // 6 round-trips
const REQUEST_TIMEOUT_MS  = 25_000;

const FRIENDLY_FALLBACK =
  "I'm having trouble reaching the assistant right now. Please try again in a moment, or reach out to us directly at info@mirroradvisors.com or 713-887-7492.";

// ── CORS ────────────────────────────────────────────────────────────────────
// Allow the public widget on the site (and any preview deployment) to call
// this endpoint. The function returns text — no auth-protected data — so a
// wildcard origin is safe. Tighten to a specific origin allow-list later if
// you want.
const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age':       '86400',
};

// ── Prompt construction ─────────────────────────────────────────────────────
function systemInstruction(): string {
  return [
    'You are the Mirror Advisors website assistant — a concise, friendly chatbot that answers visitor questions about Mirror Advisors.',
    '',
    'GROUND RULES:',
    "- Answer ONLY using the SITE CONTENT below. Do not make up services, prices, results, employee names, or capabilities that aren't on the site.",
    "- If the answer is not in the site content, say so plainly and direct the visitor to email info@mirroradvisors.com or call 713-887-7492 (or click 'Book a call' to open the contact page).",
    '- Stay on topic for Mirror Advisors business: Zoho implementation, Claude AI integrations, ERP, RevOps, systems integration, our service engagements (Scope, ERP Projects, Infinity Mirror, Bank of Hours, Support Only), case studies, and company info.',
    "- Politely decline anything off-topic (sports, politics, coding help unrelated to our work, etc.) and redirect to what Mirror Advisors actually offers.",
    "- Keep replies tight: 1–3 short paragraphs or a short bulleted list. Never wall-of-text.",
    "- When relevant, mention the specific page a visitor can read for more (e.g. 'See /services for the full breakdown').",
    '- Tone: confident, plain-spoken, no marketing fluff, no emoji unless the user uses one first.',
    '',
    '=== SITE CONTENT (your only source of truth) ===',
    SITE_KNOWLEDGE,
    '=== END SITE CONTENT ===',
  ].join('\n');
}

// ── Types ───────────────────────────────────────────────────────────────────
type HistoryMessage = { role: 'user' | 'model'; text: string };

interface RequestBody {
  question?: string;
  history?:  HistoryMessage[];
}

interface GeminiPart    { text?: string }
interface GeminiContent { role?: string; parts?: GeminiPart[] }
interface GeminiCandidate {
  content?:      GeminiContent;
  finishReason?: string;
}
interface GeminiResponse {
  candidates?: GeminiCandidate[];
  error?:      { message?: string };
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

function buildContents(history: HistoryMessage[] | undefined, question: string): GeminiContent[] {
  const trimmed = Array.isArray(history) ? history.slice(-MAX_HISTORY_TURNS) : [];
  const contents: GeminiContent[] = trimmed
    .filter(m => m && m.text && (m.role === 'user' || m.role === 'model'))
    .map(m => ({ role: m.role, parts: [{ text: String(m.text).slice(0, 4000) }] }));
  contents.push({ role: 'user', parts: [{ text: question }] });
  return contents;
}

// Extract text safely from Gemini's response. Several things can go wrong
// (safety block, no candidates, malformed payload). Wrap every path so an
// unexpected shape produces our friendly fallback, not a stack.
function extractAnswer(json: GeminiResponse): string | null {
  try {
    const cand = json.candidates?.[0];
    if (!cand) return null;
    if (cand.finishReason === 'SAFETY' || cand.finishReason === 'PROHIBITED_CONTENT') {
      return "I can't answer that one. If you have a Mirror Advisors question I'd be happy to help — otherwise email info@mirroradvisors.com.";
    }
    const parts = cand.content?.parts;
    if (!Array.isArray(parts) || parts.length === 0) return null;
    const text = parts.map(p => p?.text ?? '').join('').trim();
    return text || null;
  } catch (_) {
    return null;
  }
}

// ── Handler ─────────────────────────────────────────────────────────────────
Deno.serve(async (req: Request) => {
  // CORS preflight.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  // Method gate.
  if (req.method !== 'POST') {
    return json(405, { error: 'method_not_allowed', friendly: 'POST only.' });
  }

  // Env gate.
  const apiKey = Deno.env.get('GEMINI_API_KEY');
  if (!apiKey) {
    console.error('[chat] GEMINI_API_KEY is not set. Run: supabase secrets set GEMINI_API_KEY=...');
    return json(500, { error: 'missing_api_key', friendly: FRIENDLY_FALLBACK });
  }

  // Parse + validate body.
  let body: RequestBody = {};
  try {
    body = await req.json();
  } catch (_) {
    return json(400, { error: 'invalid_json', friendly: 'Could not parse the request.' });
  }
  const question = typeof body.question === 'string' ? body.question.trim() : '';
  if (!question) {
    return json(400, { error: 'empty_question', friendly: 'Please type a question.' });
  }
  if (question.length > MAX_QUESTION_CHARS) {
    return json(400, {
      error:    'question_too_long',
      friendly: 'That question is a bit long — try shortening it under 4000 characters.',
    });
  }

  // Build the Gemini request.
  const reqBody = {
    systemInstruction: { parts: [{ text: systemInstruction() }] },
    contents:          buildContents(body.history, question),
    generationConfig: {
      temperature:      0.4,
      topP:             0.9,
      maxOutputTokens:  800,
    },
  };

  // Call Gemini with a hard timeout.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let geminiJson: GeminiResponse;
  try {
    const url = `${GEMINI_BASE_URL}/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const r = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(reqBody),
      signal:  controller.signal,
    });
    if (!r.ok) {
      const errText = await r.text().catch(() => '');
      console.error(`[chat] Gemini HTTP ${r.status}: ${errText.slice(0, 500)}`);
      return json(502, { error: `gemini_http_${r.status}`, friendly: FRIENDLY_FALLBACK });
    }
    geminiJson = await r.json() as GeminiResponse;
  } catch (e: unknown) {
    const err = e as Error;
    const aborted = err?.name === 'AbortError';
    console.error(`[chat] ${aborted ? 'timeout' : 'fetch error'}: ${err?.message ?? err}`);
    return json(aborted ? 504 : 502, {
      error:    aborted ? 'timeout' : 'fetch_error',
      friendly: FRIENDLY_FALLBACK,
    });
  } finally {
    clearTimeout(timer);
  }

  const answer = extractAnswer(geminiJson);
  if (!answer) {
    console.error('[chat] Empty/malformed Gemini response:', JSON.stringify(geminiJson).slice(0, 500));
    return json(502, { error: 'empty_answer', friendly: FRIENDLY_FALLBACK });
  }

  return json(200, { answer });
});
