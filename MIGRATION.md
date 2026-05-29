# Migration Status

Live tracking of what was ported from the static SPA to Next.js. The original implementation is preserved under [legacy/](legacy/).

## ✅ Completed

### Foundation
- Next.js 14 + App Router + TypeScript + Tailwind CSS scaffolding
- Design tokens extracted to [tailwind.config.ts](tailwind.config.ts) (brand teal/amber/blue/purple, dark backgrounds, fonts)
- Legacy `styles.css` served from `public/legacy/styles.css` and linked in the root layout — visual design preserved 1:1 while Tailwind migration continues
- Fonts loaded via `next/font/google` (Montserrat + DM Sans)
- `/capabilities` and `/stack` redirect to `/services` and `/technology` respectively

### Shared components
- [Nav.tsx](components/Nav.tsx) — desktop nav + mobile drawer + scroll-state class
- [Footer.tsx](components/Footer.tsx) — multi-column footer with services / company / contact
- [CookieBanner.tsx](components/CookieBanner.tsx) — accept/decline with `localStorage` persistence
- [ChatWidget.tsx](components/ChatWidget.tsx) — full chat tree from [lib/chat-tree.ts](lib/chat-tree.ts)
- [ServiceDetail.tsx](components/ServiceDetail.tsx) — generic detail layout reused by ERP/Infinity/Bankhours/Support

### Data extraction
- 9 case studies → [lib/cases.ts](lib/cases.ts)
- 47 Zoho products → [lib/zoho-products.ts](lib/zoho-products.ts)
- Chatbot tree (5 topics, 25+ nodes) → [lib/chat-tree.ts](lib/chat-tree.ts)
- Nav config → [lib/nav.ts](lib/nav.ts)
- Social links → [lib/social.ts](lib/social.ts)

### Routes (15 marketing pages + 2 dynamic routes = 80 pre-rendered pages)
- `/` Home — capabilities grid, case study preview, Zoho section
- `/about` — full content: founder + CTO bios, compare table, 8 differentiators
- `/services` — Scope engagement, 4 paths, 5 FAQs
- `/erp`, `/infinity`, `/bankhours`, `/support` — service detail pages
- `/cases` — filterable grid with featured case
- `/cases/[slug]` — 9 case detail pages with problem/solution/results sections
- `/technology` — Zoho stack organized by category (Sales, Finance, Marketing, etc.)
- `/zoho/[slug]` — 47 product pages (stats, use cases, best fit, AI extension callout)
- `/contact` — form with server action; chip selectors + char count
- `/privacy`, `/accessibility` — full legal text

### Admin panel scaffold
- Client-side login (matches legacy trust model: `MAAdmin1 / MA20262027!`)
- Dashboard home with cards for each subsystem
- Settings page (working): change admin credentials, manage sub-admins
- Stub pages for 6 dashboards (`cases`, `chatbot`, `social`, `backgrounds`, `navigation`, `submissions`) — each shows existing data read-only with a clear pointer to the legacy implementation

## ⚠️ Partial / Behavioural

### Home page interactive features (now ported)

Ported as proper React client components in [components/home/](components/home/):

- **HeroPuzzle** — 13 brand pieces scatter across the hero stage; clicking a piece reveals its first "group" (Retail & Commerce, AI Operations, Finance & Audit, Sales & Service, The Full Stack), and clicking the same piece again cycles through other groups it belongs to. Esc or empty-stage click returns to neutral. Hover shows the piece name in the header pill. Jigsaw piece SVG paths are computed from `GROUP_LAYOUTS` so adjacent pieces interlock with knobs.
- **Screens** — CRM pipeline table + Analytics dashboard mock. The 12-month revenue chart bars animate up from 0 on mount.
- **CasesTrack** — horizontal drag-to-scroll carousel of the 9 case studies (mouse drag + touch). Click suppression on real drags so cards don't fire navigation when dragging.
- **ServiceTabs** — 5-tab engagement model picker (Scope / ERP / Infinity / Bank of Hours / Support) with animated progress bars on each panel.

Brand logos inside puzzle pieces use brand-colored circles + initials (e.g. "CRM", "GPT", "MA") rather than the legacy base64 SVGs to keep bundle size sane. Replace with proper logo assets in `public/images/brands/` when needed.

### Background images per page
The legacy `_PAGE_BACKGROUNDS` system (base64 images stored in `localStorage`, swapped per route) is not ported. Pages now use the gradient backgrounds defined in `styles.css` only.

### Contact form persistence
The server action in [app/contact/actions.ts](app/contact/actions.ts) currently logs submissions to the server console. The legacy implementation pushed into a `window._SUBMISSIONS` array surfaced by the admin panel — that doesn't persist across users. Pick a real target:
- Send via Resend / Postmark / SendGrid to `info@mirroradvisors.com`
- Write to a database (Postgres on Supabase / Vercel Postgres)
- Push to Zoho CRM via API

## 🔴 Not yet ported (intentional follow-up work)

### Brand logos inside hero puzzle pieces
The legacy puzzle used 13 base64-encoded SVG/PNG brand logos (Claude, ChatGPT, Gemini, Shopify, QuickBooks, etc.). The new puzzle uses brand-colored circles + initials as a placeholder. To restore real logos: extract them from `legacy/app.js` (the `LOGOS` object inside `_INIT.home`'s puzzle IIFE) and save under `public/images/brands/<key>.svg`, then load via `<image href=>` inside [HeroPuzzle.tsx](components/home/HeroPuzzle.tsx).

### Admin panel editors
The legacy admin panel has ~3,000 lines of editor logic — drag-and-drop case study reordering, a full chatbot tree editor with live preview, navigation editor, page background editor with file upload + opacity controls, submissions filtering + PDF export, sub-admin management. The admin dashboard stubs render existing data read-only with explicit pointers to the relevant legacy code paths. Building the real editors should be a follow-up project that also adds a proper backend (the legacy version used browser `localStorage`, which doesn't persist across users or devices).

### Tailwind migration
Pages use semantic class names (`.hero-v2`, `.cap-card`, `.sd-section`, etc.) that come from `public/legacy/styles.css`. Migration to Tailwind is incremental — rewrite a section in Tailwind utilities, then delete the matching rules from `styles.css`.

### Zoho product logos
The legacy `_ZOHO_LOGOS` object had 47 base64-encoded product icons (~1.75 MB of the 2 MB `app.js`). The Zoho product pages currently use emoji glyphs. To restore branded logos: extract them from `legacy/app.js`, save under `public/images/zoho/<slug>.svg`, and reference via `next/image` in [app/zoho/[slug]/page.tsx](app/zoho/[slug]/page.tsx).

### Real authentication
Admin auth is client-side only (`localStorage`) — same trust model as the legacy SPA. Anyone with the JS bundle can read the credentials. Replace with iron-session / next-auth / clerk before this is exposed publicly.

## How to verify the build

```bash
npm run build    # ✓ Compiled successfully — 80 static pages
npm run lint     # No errors
npm run typecheck
npm run dev      # Open http://localhost:3000
```
