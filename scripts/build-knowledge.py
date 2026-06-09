#!/usr/bin/env python3
"""
Builds supabase/functions/chat/knowledge.ts from data/pages.js +
data/zoho-products.js. Run this BEFORE every `supabase functions deploy`
so the Edge Function picks up the latest page copy.

Why Python: this repo's package.json isn't type:module, so a plain Node
script can't directly `import` data/pages.js as ESM without setup.
Python is installed on macOS by default and the extraction is just
regex + string work — no Node toolchain dependency.

Usage:
  python3 scripts/build-knowledge.py
  supabase functions deploy chat

The script reads the back-tick template literals out of the data files,
strips HTML to plain text using the same rules as lib/site-knowledge.js,
and writes one big TypeScript module that exports SITE_KNOWLEDGE as a
const string.
"""
import re
import os
import sys
import json
from html import unescape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ──────────────────────────────────────────────────────────────────────────
# HTML → plain text. Mirrors lib/site-knowledge.js htmlToText() so the
# Edge Function sees the same context the Vercel function would have.
# ──────────────────────────────────────────────────────────────────────────
def html_to_text(html: str) -> str:
    if not html:
        return ''
    # Strip <script>, <style>, comments, and SVG (textually useless).
    html = re.sub(r'<script[\s\S]*?</script>', ' ', html, flags=re.I)
    html = re.sub(r'<style[\s\S]*?</style>', ' ', html, flags=re.I)
    html = re.sub(r'<!--[\s\S]*?-->', ' ', html)
    html = re.sub(r'<svg[\s\S]*?</svg>', ' ', html, flags=re.I)
    # Block-ending tags become newlines so paragraphs / list items separate.
    html = re.sub(r'</(p|div|section|h[1-6]|li|tr|br)>', '\n', html, flags=re.I)
    html = re.sub(r'<br\s*/?>', '\n', html, flags=re.I)
    # Strip remaining tags.
    html = re.sub(r'<[^>]+>', ' ', html)
    # Decode HTML entities (named + numeric) using Python's html.unescape,
    # plus a couple of common &#xxx; that show up in this codebase.
    html = unescape(html)
    # Collapse whitespace, preserve paragraph breaks.
    html = re.sub(r'[ \t]+', ' ', html)
    html = re.sub(r'\n[ \t]+', '\n', html)
    html = re.sub(r'\n{3,}', '\n\n', html)
    return html.strip()


# ──────────────────────────────────────────────────────────────────────────
# Pull every `'key': `template-literal-html`` entry out of a data file.
# Assumes no backticks nested inside the HTML strings (the repo had one
# such bug in the past — caught during build — and has none today).
# ──────────────────────────────────────────────────────────────────────────
def extract_entries(file_path: str) -> dict:
    with open(file_path, 'r', encoding='utf-8') as f:
        src = f.read()
    # Each entry: 'key': `html` followed by comma or end-of-object.
    # The key is lowercase + digits + underscores + hyphens.
    # The template body is everything between the matching backticks
    # (non-greedy across newlines).
    pattern = re.compile(
        r"'([a-z][a-z0-9_-]*)'\s*:\s*`([\s\S]*?)`(?=\s*[,}])",
        re.MULTILINE,
    )
    entries = {}
    for m in pattern.finditer(src):
        entries[m.group(1)] = m.group(2)
    return entries


# Human-friendly labels — same as lib/site-knowledge.js PAGE_LABELS.
PAGE_LABELS = {
    'home':           'Home — Mirror Advisors overview',
    'services':       'Services — Scope, ERP Projects, Infinity Mirror, Bank of Hours, Support',
    'cases':          'Case Studies — engagement examples and results',
    'technology':     'Technology — the Zoho stack we deploy and the Claude AI layer',
    'contact':        'Contact — how to reach Mirror Advisors',
    'about':          'About — founders, history, philosophy',
    'erp':            'Service: ERP Projects',
    'infinity':       'Service: Infinity Mirror (productised RevOps subscription)',
    'bankhours':      'Service: Bank of Hours (prepaid expert hours)',
    'support':        'Service: Support Only (post-implementation SLA)',
    'privacy':        'Privacy Policy',
    'accessibility':  'Accessibility Statement',
}

FACTS = [
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
]


def main():
    pages_path = os.path.join(ROOT, 'data', 'pages.js')
    zoho_path  = os.path.join(ROOT, 'data', 'zoho-products.js')

    if not os.path.isfile(pages_path):
        print(f'ERROR: not found: {pages_path}', file=sys.stderr)
        sys.exit(1)

    pages = extract_entries(pages_path)
    zoho  = extract_entries(zoho_path) if os.path.isfile(zoho_path) else {}

    sections = ['\n'.join(FACTS)]

    for key, html in pages.items():
        text = html_to_text(html)
        if not text:
            continue
        label = PAGE_LABELS.get(key, f'Page: {key}')
        sections.append(f'## {label}\n{text}')

    for key, html in zoho.items():
        text = html_to_text(html)
        if not text:
            continue
        label = f'Zoho {key[:1].upper() + key[1:]} — product detail page'
        sections.append(f'## {label}\n{text}')

    knowledge = '\n\n'.join(sections)
    # Hard cap at 60 KB, same as the Vercel-side extractor.
    if len(knowledge) > 60000:
        knowledge = knowledge[:60000]

    out_dir  = os.path.join(ROOT, 'supabase', 'functions', 'chat')
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, 'knowledge.ts')

    # JSON-encode the string so escaping (quotes, newlines, etc.) is bulletproof.
    encoded = json.dumps(knowledge)

    contents = (
        '// AUTO-GENERATED — DO NOT EDIT BY HAND.\n'
        '// Re-run `python3 scripts/build-knowledge.py` after editing data/pages.js\n'
        '// or data/zoho-products.js, then redeploy the function:\n'
        '//     supabase functions deploy chat\n'
        '//\n'
        f'// Source size: {len(knowledge)} chars from '
        f'{len(pages)} pages + {len(zoho)} Zoho product pages.\n'
        '\n'
        f'export const SITE_KNOWLEDGE = {encoded};\n'
    )
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(contents)

    print(f'✓ wrote {out_path}')
    print(f'  {len(knowledge)} chars, {len(pages)} pages, {len(zoho)} Zoho products')


if __name__ == '__main__':
    main()
