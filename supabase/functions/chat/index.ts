// Supabase Edge Function: POST /functions/v1/chat
//
// The widget (lib/site-runtime.js) POSTs questions here. This function holds
// the OpenAI API key as a Supabase secret, builds a grounded prompt from the
// bundled SITE_KNOWLEDGE string, calls OpenAI Chat Completions server-side,
// and returns the answer as JSON.
//
// Backend history:
//   1. Started as a Next.js API route on Vercel calling Gemini.
//   2. Moved to this Supabase Edge Function (still Gemini).
//   3. Now: same Edge Function, swapped Gemini → OpenAI Chat Completions.
// The widget's request/response shape ({ question, history? } → { answer })
// has NOT changed across any of these migrations — only the upstream LLM has.
//
// Deploy:
//     supabase secrets set OPENAI_API_KEY=sk-...
//     supabase functions deploy chat
//
// Optional secret:
//     supabase secrets set OPENAI_MODEL=gpt-4o    # default: gpt-4o-mini
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
const OPENAI_MODEL = Deno.env.get('OPENAI_MODEL') ?? 'gpt-4o-mini';
const OPENAI_URL   = 'https://api.openai.com/v1/chat/completions';

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
// Inbound shape from the widget. Unchanged from the previous Gemini version.
type HistoryMessage = { role: 'user' | 'model'; text: string };

interface RequestBody {
  question?: string;
  history?:  HistoryMessage[];
}

// OpenAI Chat Completions message shape. NOTE the role mapping:
//   widget 'user'  → openai 'user'
//   widget 'model' → openai 'assistant'
type OpenAIRole = 'system' | 'user' | 'assistant';
interface OpenAIMessage { role: OpenAIRole; content: string }

// Just the slices of the response we care about. The full schema has a lot
// more (logprobs, usage, etc.) we don't need.
interface OpenAIChoice {
  message?:       { role?: string; content?: string | null };
  finish_reason?: string;
}
interface OpenAIResponse {
  choices?: OpenAIChoice[];
  error?:   { message?: string; type?: string; code?: string };
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

// Build the OpenAI messages[] from the system instruction + history + new
// question. The widget's 'model' role maps to OpenAI's 'assistant'; same
// trimming + per-message length caps as the previous Gemini version.
function buildMessages(history: HistoryMessage[] | undefined, question: string): OpenAIMessage[] {
  const messages: OpenAIMessage[] = [
    { role: 'system', content: systemInstruction() },
  ];

  const trimmed = Array.isArray(history) ? history.slice(-MAX_HISTORY_TURNS) : [];
  for (const m of trimmed) {
    if (!m || !m.text) continue;
    if (m.role !== 'user' && m.role !== 'model') continue;
    messages.push({
      role:    m.role === 'model' ? 'assistant' : 'user',
      content: String(m.text).slice(0, 4000),
    });
  }

  messages.push({ role: 'user', content: question });
  return messages;
}

// Extract reply text safely. OpenAI's choices[].message.content is normally a
// string; for some models / refusals it may be null. Wrap every path so an
// unexpected shape produces our friendly fallback, not a stack.
function extractAnswer(json: OpenAIResponse): string | null {
  try {
    const choice = json.choices?.[0];
    if (!choice) return null;
    const content = choice.message?.content;
    if (typeof content !== 'string') return null;
    const text = content.trim();
    if (!text) return null;
    // OpenAI's content-policy refusal: model returned a polite decline. Pass
    // through directly so the visitor sees it (the system instruction tells
    // the model how to decline, so this is normally not hit).
    if (choice.finish_reason === 'content_filter') {
      return "I can't answer that one. If you have a Mirror Advisors question I'd be happy to help — otherwise email info@mirroradvisors.com.";
    }
    return text;
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
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) {
    console.error('[chat] OPENAI_API_KEY is not set. Run: supabase secrets set OPENAI_API_KEY=sk-...');
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

  // Build the OpenAI request.
  const reqBody = {
    model:       OPENAI_MODEL,
    messages:    buildMessages(body.history, question),
    temperature: 0.4,
    top_p:       0.9,
    max_tokens:  800,
  };

  // Call OpenAI with a hard timeout.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let openaiJson: OpenAIResponse;
  try {
    const r = await fetch(OPENAI_URL, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body:   JSON.stringify(reqBody),
      signal: controller.signal,
    });
    if (!r.ok) {
      const errText = await r.text().catch(() => '');
      console.error(`[chat] OpenAI HTTP ${r.status}: ${errText.slice(0, 500)}`);
      return json(502, { error: `openai_http_${r.status}`, friendly: FRIENDLY_FALLBACK });
    }
    openaiJson = await r.json() as OpenAIResponse;
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

  // Surface OpenAI's structured error (rate-limit, model-not-found, etc.) if
  // it slipped through with a 200 status — rare, but worth handling.
  if (openaiJson.error) {
    console.error(`[chat] OpenAI returned error payload: ${openaiJson.error.message ?? '(no message)'}`);
    return json(502, { error: 'openai_payload_error', friendly: FRIENDLY_FALLBACK });
  }

  const answer = extractAnswer(openaiJson);
  if (!answer) {
    console.error('[chat] Empty/malformed OpenAI response:', JSON.stringify(openaiJson).slice(0, 500));
    return json(502, { error: 'empty_answer', friendly: FRIENDLY_FALLBACK });
  }

  return json(200, { answer });
});
