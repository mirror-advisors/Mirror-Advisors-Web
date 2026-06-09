// Site knowledge base for the AI chatbot. Strips HTML out of the existing
// page HTML strings (data/pages.js + data/zoho-products.js) into a single
// plain-text context block that we ship to Gemini with every question.
//
// Why this approach:
//   - The whole site's text fits comfortably in one Gemini prompt (well under
//     the 1M-token context window). No need for embeddings / retrieval.
//   - Pages already have their canonical copy in data/*.js, so the chatbot
//     stays in sync as those files are edited — no separate knowledge source
//     to maintain.
//   - The extractor runs once per cold start of the serverless function and
//     the result is cached on the module scope. Per-request work is just a
//     string read.
//
// To refresh the knowledge after editing pages, redeploy. (Vercel cold starts
// will pick up the new content on the next request automatically.)

import { pages } from '../data/pages';
import { zohoProducts } from '../data/zoho-products';

// Human-friendly section labels for each route key in pages.js.
const PAGE_LABELS = {
  home:         'Home — Mirror Advisors overview',
  services:     'Services — Scope, ERP Projects, Infinity Mirror, Bank of Hours, Support',
  cases:        'Case Studies — engagement examples and results',
  technology:   'Technology — the Zoho stack we deploy and the Claude AI layer',
  contact:      'Contact — how to reach Mirror Advisors',
  about:        'About — founders, history, philosophy',
  erp:          'Service: ERP Projects',
  infinity:     'Service: Infinity Mirror (productised RevOps subscription)',
  bankhours:    'Service: Bank of Hours (prepaid expert hours)',
  support:      'Service: Support Only (post-implementation SLA)',
  privacy:      'Privacy Policy',
  accessibility:'Accessibility Statement',
};

// Strip HTML to plain text. Decodes the handful of entities the source uses,
// drops <script>/<style> blocks entirely, then collapses whitespace.
function htmlToText(html) {
  if (!html || typeof html !== 'string') return '';
  return html
    // remove <script>, <style>, and HTML comments entirely
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    // SVG paths are visually meaningful but textually useless — drop them
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    // turn block-ending tags into newlines so paragraphs / list items separate
    .replace(/<\/(p|div|section|h[1-6]|li|tr|br)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    // strip remaining tags
    .replace(/<[^>]+>/g, ' ')
    // decode the entities used in the source
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&bull;/g, '•')
    .replace(/&times;/g, '×')
    .replace(/&#169;/g, '©')
    .replace(/&#10003;/g, '✓')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8599;/g, '↗')
    .replace(/&#10024;/g, '✨')
    .replace(/&#128274;/g, '🔒')
    .replace(/&#9889;/g, '⚡')
    // numeric entities — fall back to the literal char
    .replace(/&#(\d+);/g, function (_, n) {
      try { return String.fromCodePoint(parseInt(n, 10)); } catch (_) { return ' '; }
    })
    // collapse runs of whitespace to a single space; preserve paragraph breaks
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Build a labelled section "## <Label>\n<text>" for one page.
function buildSection(label, html) {
  const text = htmlToText(html);
  if (!text) return '';
  return `## ${label}\n${text}`;
}

// Lazy-built + cached. The first call after a cold start spends a few ms
// stripping ~2KLOC of HTML; every later call is a string read.
let _cachedKnowledge = null;

export function getSiteKnowledge() {
  if (_cachedKnowledge) return _cachedKnowledge;

  const sections = [];

  // Main pages — only the ones with real prose. Skip 404 / privacy bodies that
  // are mostly legal boilerplate (privacy + accessibility have their own copy
  // that's useful so we DO include them, just at lower priority).
  Object.keys(pages).forEach(function (key) {
    const label = PAGE_LABELS[key] || ('Page: ' + key);
    const s = buildSection(label, pages[key]);
    if (s) sections.push(s);
  });

  // Zoho product detail pages — one section per product.
  Object.keys(zohoProducts).forEach(function (key) {
    const label = 'Zoho ' + key.charAt(0).toUpperCase() + key.slice(1) + ' — product detail page';
    const s = buildSection(label, zohoProducts[key]);
    if (s) sections.push(s);
  });

  // Hard facts we want the bot to always know up front, in case the page
  // extraction misses them or they're scattered. Keep this short.
  const FACTS = [
    '## Quick Facts',
    'Company: Mirror Advisors',
    'Location: 2002 Timberloch Pl, Suite 200, The Woodlands, TX 77380 (USA)',
    'Phone: 713-887-7492',
    'General email: info@mirroradvisors.com',
    'LinkedIn: https://www.linkedin.com/company/mirroradvisors/',
    'Client portal: https://app.mirroradvisors.com (Infinity Portal)',
    'Practice areas: Zoho One implementation, custom AI integrations built on Claude, systems integration, business consulting.',
    'Engagement model: every engagement begins with Scope (fixed-fee discovery). After Scope, clients choose ERP Projects (fixed scope), Infinity Mirror (productised monthly RevOps subscription), Bank of Hours (prepaid hours at a locked rate), or Support Only (SLA retainer).',
    'Founders: Paul Trinidad (founder & CEO, ex-Zoho mid-market AE for Canada), Mark Alberto (managing partner).',
    'Primary AI partnership: Anthropic Claude — we build production AI features on the Claude API rather than swapping LLMs per project.',
    'Zoho certification: Texas-based Zoho premium partner.',
  ];
  sections.unshift(FACTS.join('\n'));

  _cachedKnowledge = sections.join('\n\n').slice(0, 60000); // hard cap ~60KB
  return _cachedKnowledge;
}
