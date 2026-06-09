// Vercel serverless function: POST /api/chat
//
// Holds the Gemini API key as a server-side env var so it never reaches the
// browser. Builds a grounded prompt from the site's own copy (lib/site-knowledge.js)
// and returns Gemini's reply as JSON.
//
// Required env var (Vercel → Project → Settings → Environment Variables):
//   GEMINI_API_KEY=<your Google AI Studio key, starts with AIza...>
//
// Optional env vars:
//   GEMINI_MODEL    — override the model. Default: gemini-2.0-flash
//                     (try gemini-2.5-flash for a newer/smarter option)
//
// Request body:
//   { question: string, history?: [{ role: 'user'|'model', text: string }] }
//
// Response (success): { answer: string }
// Response (error):   { error: string, friendly: string }    HTTP 4xx/5xx

import { getSiteKnowledge } from '../../lib/site-knowledge';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const GEMINI_ENDPOINT = (key) =>
  'https://generativelanguage.googleapis.com/v1beta/models/' +
  encodeURIComponent(GEMINI_MODEL) +
  ':generateContent?key=' + encodeURIComponent(key);

// Hard caps so a malicious or runaway client can't blow our quota.
const MAX_QUESTION_CHARS = 4000;
const MAX_HISTORY_TURNS  = 12;   // 6 round-trips
const REQUEST_TIMEOUT_MS = 25000;

const FRIENDLY_FALLBACK =
  "I'm having trouble reaching the assistant right now. Please try again in a moment, or reach out to us directly at info@mirroradvisors.com or 713-887-7492.";

function systemInstruction(knowledge) {
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
    knowledge,
    '=== END SITE CONTENT ===',
  ].join('\n');
}

// Map our short history shape into Gemini's contents[] shape, clamping to a
// safe number of turns so the prompt never grows without bound.
function buildContents(history, question) {
  const trimmed = Array.isArray(history) ? history.slice(-MAX_HISTORY_TURNS) : [];
  const contents = trimmed
    .filter(function (m) { return m && m.text && (m.role === 'user' || m.role === 'model'); })
    .map(function (m) { return { role: m.role, parts: [{ text: String(m.text).slice(0, 4000) }] }; });
  contents.push({ role: 'user', parts: [{ text: question }] });
  return contents;
}

// Extract text from Gemini's response. The shape is:
//   { candidates: [{ content: { parts: [{ text: '...' }] }, finishReason: ... }] }
// Several things can go wrong (safety block, no candidates, malformed). Wrap
// every path so an unexpected shape produces our friendly fallback, not a stack.
function extractAnswer(json) {
  try {
    const cand = json && json.candidates && json.candidates[0];
    if (!cand) return null;
    if (cand.finishReason === 'SAFETY' || cand.finishReason === 'PROHIBITED_CONTENT') {
      return "I can't answer that one. If you have a Mirror Advisors question I'd be happy to help — otherwise email info@mirroradvisors.com.";
    }
    const parts = cand.content && cand.content.parts;
    if (!Array.isArray(parts) || !parts.length) return null;
    const text = parts.map(function (p) { return p && p.text ? p.text : ''; }).join('').trim();
    return text || null;
  } catch (_) {
    return null;
  }
}

export default async function handler(req, res) {
  // Method gate.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed', friendly: 'POST only.' });
  }

  // Env gate.
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[/api/chat] GEMINI_API_KEY is not set in this environment.');
    return res.status(500).json({
      error: 'missing_api_key',
      friendly: FRIENDLY_FALLBACK,
    });
  }

  // Parse + validate body.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (_) { body = {}; }
  }
  body = body || {};
  const question = typeof body.question === 'string' ? body.question.trim() : '';
  if (!question) {
    return res.status(400).json({ error: 'empty_question', friendly: 'Please type a question.' });
  }
  if (question.length > MAX_QUESTION_CHARS) {
    return res.status(400).json({
      error: 'question_too_long',
      friendly: 'That question is a bit long — try shortening it under 4000 characters.',
    });
  }

  // Build the Gemini request.
  const knowledge = getSiteKnowledge();
  const reqBody = {
    systemInstruction: { parts: [{ text: systemInstruction(knowledge) }] },
    contents: buildContents(body.history, question),
    generationConfig: {
      temperature: 0.4,
      topP: 0.9,
      maxOutputTokens: 800,
    },
    // Default safety settings — Gemini will block egregious content. We let
    // the model do its job rather than tuning these per-request.
  };

  // Call Gemini with a hard timeout. AbortController works in Node 18+ (the
  // Vercel runtime).
  const controller = new AbortController();
  const timer = setTimeout(function () { controller.abort(); }, REQUEST_TIMEOUT_MS);
  let json;
  try {
    const r = await fetch(GEMINI_ENDPOINT(apiKey), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody),
      signal: controller.signal,
    });
    if (!r.ok) {
      const errText = await r.text().catch(function () { return ''; });
      console.error('[/api/chat] Gemini HTTP ' + r.status + ': ' + errText.slice(0, 500));
      return res.status(502).json({
        error: 'gemini_http_' + r.status,
        friendly: FRIENDLY_FALLBACK,
      });
    }
    json = await r.json();
  } catch (e) {
    clearTimeout(timer);
    const aborted = e && e.name === 'AbortError';
    console.error('[/api/chat] ' + (aborted ? 'timeout' : 'fetch error') + ':', e && e.message ? e.message : e);
    return res.status(aborted ? 504 : 502).json({
      error: aborted ? 'timeout' : 'fetch_error',
      friendly: FRIENDLY_FALLBACK,
    });
  } finally {
    clearTimeout(timer);
  }

  const answer = extractAnswer(json);
  if (!answer) {
    console.error('[/api/chat] Empty/malformed Gemini response:', JSON.stringify(json).slice(0, 500));
    return res.status(502).json({ error: 'empty_answer', friendly: FRIENDLY_FALLBACK });
  }

  return res.status(200).json({ answer: answer });
}
