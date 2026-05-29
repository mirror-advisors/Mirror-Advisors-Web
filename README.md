# Mirror Advisors Website

Marketing site for [Mirror Advisors](https://mirroradvisors.com) — Texas-based Zoho premium partner and Anthropic Claude AI consulting firm.

## Stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** (design tokens in [tailwind.config.ts](tailwind.config.ts))
- **next/font** for Montserrat + DM Sans

The original static SPA (hash router + 60+ HTML page fragments + a 2 MB `app.js`) has been migrated to a real Next.js codebase. The previous implementation is preserved under [legacy/](legacy/) for reference. See [MIGRATION.md](MIGRATION.md) for what was ported and what still needs work.

## Routes

| Path | Source |
|---|---|
| `/` | [app/page.tsx](app/page.tsx) |
| `/about` | [app/about/page.tsx](app/about/page.tsx) |
| `/services` | [app/services/page.tsx](app/services/page.tsx) |
| `/erp`, `/infinity`, `/bankhours`, `/support` | [app/{erp,infinity,bankhours,support}/page.tsx](app/) |
| `/cases` + `/cases/[slug]` | [app/cases/](app/cases/) — 9 case studies in [lib/cases.ts](lib/cases.ts) |
| `/technology` | [app/technology/page.tsx](app/technology/page.tsx) |
| `/zoho/[slug]` | 47 product pages driven by [lib/zoho-products.ts](lib/zoho-products.ts) |
| `/contact` | [app/contact/](app/contact/) — server action in `actions.ts` |
| `/privacy`, `/accessibility` | [app/{privacy,accessibility}/page.tsx](app/) |
| `/admin/*` | [app/admin/](app/admin/) — login + 6 dashboard stubs |
| `/capabilities`, `/stack` | Redirect to `/services` and `/technology` ([next.config.mjs](next.config.mjs)) |

## Local development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

`npm run build` produces a static-friendly output. All Zoho product pages and case detail pages are pre-rendered via `generateStaticParams`.

## Type-check and lint

```bash
npm run typecheck
npm run lint
```

## Project layout

```
app/                  # Next.js App Router routes
  layout.tsx          # Root layout: Nav, Footer, CookieBanner, ChatWidget
  page.tsx            # Home
  <route>/page.tsx    # Each route lives in its own folder
  admin/              # Admin panel (login + dashboard stubs)

components/           # Shared React components
  Nav.tsx             # Top nav with mobile menu
  Footer.tsx          # Site footer
  CookieBanner.tsx    # Cookie consent
  ChatWidget.tsx      # On-site chatbot
  ServiceDetail.tsx   # Generic service detail (used by ERP/Infinity/etc.)

lib/                  # Typed data + helpers
  cases.ts            # Case study data
  zoho-products.ts    # 47 Zoho product entries
  chat-tree.ts        # Chatbot decision tree
  nav.ts, social.ts   # Nav + social link config
  admin-auth.ts       # Client-side admin session (matches legacy trust model)

public/legacy/        # Transitional: original styles.css served as-is
legacy/               # Original SPA (kept for reference; not built)
```

## Styling

The original `styles.css` (216 KB) is served as-is from `public/legacy/styles.css` and linked in the root layout while the migration to Tailwind utility classes continues. Brand tokens (colors, fonts) are also configured in [tailwind.config.ts](tailwind.config.ts) so new components can use Tailwind directly.

To finish the Tailwind migration: pick a section (e.g. nav, hero, cards), rewrite its styles with Tailwind utilities, then delete the corresponding rules from `public/legacy/styles.css`.

## Deployment

- **Vercel** — `vercel` from the repo root. Auto-detects Next.js.
- **Self-hosted** — `npm run build && npm start` on Node 20+.
- **Static export** — Add `output: 'export'` to `next.config.mjs` for static hosts (GitHub Pages, Netlify Drop, Cloudflare Pages). Note: this disables Server Actions, so the contact form would need a different submission target.

## Custom domain

Already in use at `mirroradvisors.com`. DNS continues to point at the host of choice; nothing in the codebase is host-specific.

## Where the work continues

See [MIGRATION.md](MIGRATION.md) for the full punch list. Highest-value follow-ups:

1. Wire the contact form server action to a real persistence target (database, email, or Zoho CRM API).
2. Replace the client-only admin authentication with a real server-side session.
3. Incrementally migrate `public/legacy/styles.css` to Tailwind, deleting CSS as components are rewritten.
4. Port the interactive home-page puzzle (currently the hero is static).
5. Build out the admin dashboard editors (currently stubs).
