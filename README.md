# Mirror Advisors Website

Marketing site for [Mirror Advisors](https://mirroradvisors.com) — Texas-based Zoho premium partner and Anthropic Claude AI consulting firm.

## Architecture

Single-page application using a hash router. Pages are loaded dynamically via `fetch()` from the `pages/` folder.

- `index.html` — App shell (nav, mobile menu, cookie banner, `#app` container, footer container)
- `styles.css` — All site styles
- `app.js` — Hash router, mobile menu logic, footer template, helpers
- `pages/*.html` — Individual page fragments (no DOCTYPE/head/body — just the inner content)

## Local development

The site uses `fetch()` to load pages, which **does not work over `file://`**. You need a local web server.

### Option 1 — Python (zero install)

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

### Option 2 — Node (npx)

```bash
npx serve .
```

### Option 3 — VS Code

Install the *Live Server* extension and click "Go Live".

## Deployment

Any static host works:

- **GitHub Pages** — Push to `main`, enable Pages in repo settings, source = root.
- **Netlify** — Drag the folder into [app.netlify.com](https://app.netlify.com/drop) or connect the repo.
- **Vercel** — `vercel` from the repo root.
- **Cloudflare Pages** — Connect repo, build command = (none), publish dir = `/`.

No build step. Just static files.

## Custom domain (GitHub Pages)

1. Create a file named `CNAME` at the repo root containing `mirroradvisors.com`.
2. At your DNS provider, point `mirroradvisors.com` at GitHub Pages IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and add a `www` CNAME → `<yourusername>.github.io`.
3. In repo Settings → Pages, set Custom domain and enable HTTPS.

## Editing pages

Each page is its own file under `pages/`. The router fetches `pages/<name>.html` based on the hash. The placeholder `${_FOOTER_HTML}` is replaced with the actual footer at injection time.

To add a new page:

1. Create `pages/newpage.html` with your content. End it with `${_FOOTER_HTML}` if you want the footer.
2. Add a nav link in `index.html`: `<a href="#" onclick="go('newpage')">New Page</a>`.

## Routes

- `#home` — Landing
- `#about` — About / leadership / firm story
- `#services` — Services overview
- `#erp`, `#infinity`, `#bankhours`, `#support` — Service detail pages
- `#cases` — Case studies
- `#technology` — Technology stack overview
- `#contact` — Contact form
- `#privacy`, `#accessibility` — Legal pages
- `#zoho_<product>` — 21 individual Zoho product pages
