# Mirror Advisors Website (Next.js)

Production-ready Next.js 14 conversion of the Mirror Advisors marketing site. All assets are bundled locally — nothing depends on external CDNs except Google Fonts.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
```

Requires Node.js 18.17 or newer.

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or just connect this repo on the Vercel dashboard and push. No configuration needed — Vercel auto-detects Next.js.

## Project structure

```
nextapp/
├── pages/
│   ├── _app.js                 Global app wrapper (mounts Layout)
│   ├── _document.js            HTML shell with Google Fonts
│   ├── index.js                Home page (/)
│   ├── about.js                /about (with all Stage 1 additions)
│   ├── services.js             /services
│   ├── erp.js                  /erp
│   ├── infinity.js             /infinity
│   ├── bankhours.js            /bankhours
│   ├── support.js              /support
│   ├── cases.js                /cases
│   ├── technology.js           /technology
│   ├── contact.js              /contact
│   ├── privacy.js              /privacy
│   ├── accessibility.js        /accessibility
│   ├── 404.js                  Custom not-found page
│   └── zoho/[product].js       Dynamic route for 48 Zoho product pages
├── components/
│   ├── Layout.js               Nav, footer, mobile menu, cookie banner,
│   │                           chat widget, admin panel
│   └── HtmlPage.js             Renders raw HTML and intercepts onclick="go(...)"
├── data/
│   ├── pages.js                Main page HTML fragments
│   └── zoho-products.js        48 Zoho product HTML fragments
├── lib/
│   ├── footer.js               Footer HTML (with /images/logo-wide.png)
│   ├── zoho-logos.js           Zoho product logos (mix of file paths + base64)
│   ├── admin-chat-html.js      Admin overlay + chat widget HTML
│   └── site-runtime.js         All vanilla JS (cookies, chat, admin, scroll
│                               handlers, per-page _INIT functions)
├── public/
│   └── images/
│       ├── logo.jpg            Main nav logo (extracted from base64)
│       ├── logo-wide.png       Footer logo (extracted from base64)
│       └── zoho/               9 Zoho product logos as JPG files
├── styles/
│   └── globals.css             All CSS from the original source (217 KB)
├── next.config.js
├── package.json
└── .gitignore
```

## Architecture notes

### Hybrid rendering strategy

Page content is stored as HTML string fragments in `data/pages.js` and `data/zoho-products.js`. Each Next.js page reads its fragment and renders it through `<HtmlPage>`, which uses `dangerouslySetInnerHTML` and intercepts internal `onclick="go('xxx')"` clicks to route via Next.js instead of full reloads.

The chrome (nav, footer, mobile menu, cookie banner, chat widget, admin overlay) is in the `Layout` component, which wraps every page through `_app.js`.

This preserves 100% of the original visual output and JS behavior while gaining Next.js's static generation, code splitting, and routing.

### Why not pure JSX?

A full JSX rewrite of all 60+ pages would have taken many more hours, with high risk of visual regression. The hybrid approach gets to a working, deployable Next.js app today; individual pages can be incrementally rewritten as proper JSX later.

### Original site JS

`lib/site-runtime.js` contains everything from the original `<script>` block except:
- The `_HTML` page-content object (replaced by `data/`)
- The `go()` hash router (replaced by Next.js routing, with a `window.go` shim for backwards compat with inline `onclick="go(...)"` in HTML strings)
- `_FOOTER_HTML` and `_ZOHO_LOGOS` (moved to `lib/`)

Everything else runs once on first mount via a `useEffect` in `Layout`: cookie consent, chat widget, admin panel, scroll handlers, mobile menu, and all `_INIT.*` per-page initializers.

The per-page `_INIT.NAME()` function is re-invoked on every Next.js route change so charts, animations, and interactive widgets initialize correctly.

### Image assets

The source had base64-encoded images embedded throughout. Extracted to `public/images/`:
- `logo.jpg` (11 KB) — main nav logo
- `logo-wide.png` (47 KB) — footer logo
- `zoho/*.jpg` (9 files, ~70 KB) — Zoho product card images

The `_ZOHO_LOGOS` object in `lib/zoho-logos.js` uses these file paths for the 9 extracted ones and keeps base64 for any others (most other product pages use emoji icons instead).

### Footer

Every page renders the footer at the bottom of its content via `<Layout>`, which injects the footer HTML once after the page children. Links inside the footer (Privacy Policy, Accessibility, Cookie Preferences) work via `window.go(...)` shim → Next.js router.

### Admin panel

The admin overlay (`adminOverlay` div + ~2200 lines of JS) is preserved verbatim from the source. It mounts as static HTML in `Layout` (via `dangerouslySetInnerHTML` from `lib/admin-chat-html.js`) and the JS in `lib/site-runtime.js` wires up `openAdmin`, `closeAdmin`, login, all panels, etc. Open it from the footer's hidden trigger or by calling `window.openAdmin()` in the console.

### Chat widget

Same approach as admin: HTML preserved, JS preserved, mounts via Layout. The chat launcher button is in the trailing HTML; `chatToggle()` opens it.

## Routes

| URL | Source |
|---|---|
| `/` | home |
| `/about` | about |
| `/services` | services |
| `/erp` | erp |
| `/infinity` | infinity |
| `/bankhours` | bankhours |
| `/support` | support |
| `/cases` | cases |
| `/technology` | technology |
| `/contact` | contact |
| `/privacy` | privacy |
| `/accessibility` | accessibility |
| `/zoho/<product>` | 48 Zoho products (books, crm, analytics, …) |

## Caveats

- **Bundle size:** `_app.js` is ~1.5 MB because it includes all admin/chat/init JS. This is the cost of preserving the full original functionality. Splitting these into dynamic imports would be a worthwhile follow-up.
- **Google Fonts:** Loaded via CDN link in `_document.js`. The Next.js build emits a warning about font optimization in sandboxed environments; production deploys hit Google directly and work fine.
- **No type-checking:** Project is JavaScript only. Converting to TypeScript would be straightforward but wasn't in scope.
- **The 48 Zoho pages share a near-identical template.** Worth extracting into a single component later.
