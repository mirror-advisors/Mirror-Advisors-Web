import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import { FOOTER_HTML } from '../lib/footer';
import { ADMIN_CHAT_HTML } from '../lib/admin-chat-html';
import { initSiteRuntime } from '../lib/site-runtime';
import { fetchAllConfig } from '../lib/site-config';
import SalesIQ from './SalesIQ';

// Map the current Next.js pathname to the nav key it should highlight.
// First path segment wins:  /             → 'home'
//                           /services     → 'services'
//                           /cases/0      → 'cases'
//                           /zoho/crm     → 'zoho'  (no nav match → no highlight)
function pathToNavKey(pathname) {
  if (!pathname || pathname === '/') return 'home';
  return pathname.replace(/^\//, '').split('/')[0];
}

// Dropdown groups for the server-rendered nav + mobile drawer. Keys match
// window._NAV_PAGES (lib/site-runtime.js → _NAV_DEFAULTS) so the admin
// visibility toggle can hide individual items. After Supabase hydration,
// site-runtime's _renderNav() re-renders the desktop nav from _NAV_PAGES.
const NAV_GROUPS = [
  {
    key: 'solutions', label: 'Solutions', href: '/solutions',
    items: [
      { key: 'sol-ai-custom',  href: '/solutions/ai-custom-solutions', label: 'AI Custom Solutions', featured: true },
      { key: 'sol-zoho',       href: '/solutions/zoho',                label: 'Zoho Implementation' },
      { key: 'sol-ai-on-zoho', href: '/solutions/ai-on-zoho',          label: 'AI on Zoho' },
      { key: 'sol-odoo',       href: '/solutions/odoo',                label: 'Odoo', soon: true },
      { key: 'sol-avalara',    href: '/solutions/avalara',             label: 'Avalara', soon: true },
    ],
  },
  {
    key: 'services', label: 'Services', href: '/services',
    items: [
      { key: 'software-implementation', href: '/services/software-implementation', label: 'Software Implementation' },
      { key: 'data-migration',          href: '/services/data-migration',          label: 'Data Migration' },
      { key: 'systems-integration',     href: '/services/systems-integration',     label: 'Systems Integration' },
      { key: 'custom-development',      href: '/services/custom-development',      label: 'Custom Development' },
      { key: 'consulting-support',      href: '/services/consulting-support',      label: 'Consulting & Support' },
    ],
  },
];
const NAV_LINKS = [
  { key: 'platforms',   href: '/platforms',   label: 'Platforms' },
  { key: 'how-we-work', href: '/how-we-work', label: 'How We Work' },
  { key: 'about',       href: '/about',       label: 'About' },
  { key: 'contact',     href: '/contact',     label: 'Contact' },
];

// Merge admin-saved nav config (Supabase) with the current defaults: keep
// the saved order, labels and enabled flags for keys that still exist,
// drop retired keys (e.g. the old 'erp-implementation'), take `parent`
// from the defaults so restructures apply, and slot new default keys in
// right after their predecessor in the default order.
function mergeNavPages(stored, defaults) {
  const defByKey = {};
  defaults.forEach((p) => { defByKey[p.key] = p; });
  const out = stored
    .filter((p) => p && p.key && defByKey[p.key])
    .map((p) => {
      const d = defByKey[p.key];
      const merged = Object.assign({}, d, { label: p.label || d.label, enabled: p.enabled !== false });
      if (!d.parent) delete merged.parent;
      return merged;
    });
  defaults.forEach((d, i) => {
    if (out.some((p) => p.key === d.key)) return;
    const prevKey = i > 0 ? defaults[i - 1].key : null;
    const at = prevKey ? out.findIndex((p) => p.key === prevKey) + 1 : 0;
    out.splice(at, 0, Object.assign({}, d));
  });
  return out;
}

export default function Layout({ children }) {
  const router = useRouter();
  const initialized = useRef(false);
  const currentNavKey = pathToNavKey(router.pathname);

  // Mount the original site JS runtime once on first render, then overlay
  // any admin-edited config from Supabase on top of the hardcoded defaults.
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // 1. Run init synchronously — populates window._CASES, _NAV_PAGES, etc.
    //    with the hardcoded defaults. Site renders correctly even if Supabase
    //    is unreachable.
    try {
      initSiteRuntime(router);
    } catch (e) {
      console.error('Site runtime init failed:', e);
    }

    // 2a. If we arrived from /admin/login with ?admin=open, auto-open the
    //     admin overlay once the runtime has registered window.openAdmin.
    if (router.query && router.query.admin === 'open') {
      const tryOpen = (tries) => {
        if (typeof window !== 'undefined' && typeof window.openAdmin === 'function') {
          try { window.openAdmin(); } catch (e) { console.warn('openAdmin failed:', e); }
          // Clean up the query param so refreshes don't keep re-opening.
          router.replace('/', undefined, { shallow: true });
          return;
        }
        if (tries < 40) setTimeout(() => tryOpen(tries + 1), 50);
      };
      tryOpen(0);
    }

    // 2. Then fetch any admin-saved overrides from Supabase and apply them.
    (async () => {
      let cfg = null;
      try {
        cfg = await fetchAllConfig();
      } catch (e) {
        console.warn('[Layout] fetchAllConfig threw:', e);
      }

      if (cfg) {
        // Cases — replace whole array WHENEVER the row exists (even when
        // empty). If the admin intentionally deleted every case we want
        // public pages to reflect that, not silently fall back to the
        // hardcoded defaults.
        if (Array.isArray(cfg.cases)) {
          window._CASES = cfg.cases;
          if (typeof window.renderCases === 'function') window.renderCases('All');
          if (typeof window._refreshHomeScroll === 'function') window._refreshHomeScroll();
          if (typeof window._renderFeaturedCase === 'function') window._renderFeaturedCase();
        }

        // Navigation pages — MERGE stored config with the current defaults
        // (see mergeNavPages above) so new entries surface and retired
        // ones disappear for visitors whose stored config predates them.
        if (Array.isArray(cfg.nav_pages) && cfg.nav_pages.length > 0) {
          const defaults = typeof window._navDefaults === 'function' ? window._navDefaults() : (window._NAV_PAGES || []);
          window._NAV_PAGES = mergeNavPages(cfg.nav_pages, defaults);
          if (typeof window._renderNav === 'function') window._renderNav();
          if (typeof window._navUpdateHomeLinks === 'function') window._navUpdateHomeLinks();
          // _renderNav already triggers _applyNavVisibility, but call it
          // explicitly here too so the mobile menu + footer reflect the
          // hidden flag even on cold loads where _renderNav might no-op
          // (e.g. when the desktop nav is hidden under a mobile breakpoint).
          if (typeof window._applyNavVisibility === 'function') window._applyNavVisibility();
        }

        // Social links — object keyed by platform. MERGE with the defaults
        // (instead of overwriting) so platforms added in code AFTER the last
        // Supabase save still have their default entry. Without this, a new
        // key like `skool` would be undefined after hydration, and the admin
        // dashboard's order.map would throw on s.label.
        if (cfg.social_links && typeof cfg.social_links === 'object' && Object.keys(cfg.social_links).length > 0) {
          window._SOCIAL_LINKS = Object.assign({}, window._SOCIAL_LINKS || {}, cfg.social_links);
          if (typeof window._renderSocialIcons === 'function') window._renderSocialIcons();
        }

        // Per-page background overrides
        if (cfg.page_backgrounds && typeof cfg.page_backgrounds === 'object' && Object.keys(cfg.page_backgrounds).length > 0) {
          window._PAGE_BACKGROUNDS = Object.assign(window._PAGE_BACKGROUNDS || {}, cfg.page_backgrounds);
          if (typeof window._applyPageBackground === 'function') {
            // Re-apply for the currently-rendered page.
            try { window._applyPageBackground(pathToInitKey(router.pathname, router.query) || 'home'); } catch (e) {}
          }
        }

        // Chat tree (chat widget script)
        if (cfg.chat_tree && typeof cfg.chat_tree === 'object' && Object.keys(cfg.chat_tree).length > 0) {
          window._CHAT_TREE = cfg.chat_tree;
        }
      }

      // ── Hydration complete — broadcast to listeners ────────────────────────
      // Components that render directly from window._CASES (e.g. the
      // /cases/[idx] detail page) need to know the async Supabase fetch is
      // done so they don't render stale hardcoded defaults. Set a flag for
      // mounts that arrive AFTER hydration, and fire an event for mounts
      // already waiting.
      window._casesHydrated = true;
      try {
        window.dispatchEvent(new CustomEvent('cases:hydrated', { detail: { cfg: !!cfg } }));
      } catch (e) {
        // IE/old browser fallback
        try {
          const evt = document.createEvent('Event');
          evt.initEvent('cases:hydrated', true, true);
          window.dispatchEvent(evt);
        } catch (_) {}
      }
    })();
  }, [router]);

  // Re-run page _INIT function on route change.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = pathToInitKey(router.pathname, router.query);
    if (!key) return;
    const inits = window.__site_INIT;
    if (inits && typeof inits[key] === 'function') {
      // Defer to next tick so the page HTML is rendered first.
      setTimeout(() => {
        try { inits[key](); } catch (e) { console.error('_INIT.' + key, e); }
      }, 0);
    }
  }, [router.pathname, router.asPath, router.query]);

  // Click delegation: any `<a onclick="go('xxx')">` inside dangerouslySetInnerHTML
  // content will fire `window.go('xxx')` — which we already shim to use router.push.
  // Nothing else needed here, the shim in site-runtime handles it.

  // Close mobile menu on route change.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.closeMobileMenu === 'function') {
      window.closeMobileMenu();
    }
  }, [router.asPath]);

  // Keep window._currentPage in sync with the route AND re-highlight the
  // JS-rendered nav. The React JSX nav is class-driven (see the Link
  // className props above) and updates automatically with React renders.
  // BUT after Supabase hydration, site-runtime.js's _renderNav() replaces
  // #navLinks with plain <a onclick="go(...)"> elements that React no
  // longer manages — those need _highlightNav called manually on every
  // route change.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window._currentPage = currentNavKey;
    if (typeof window._highlightNav === 'function') {
      window._highlightNav(currentNavKey);
    }
  }, [currentNavKey]);

  return (
    <>
      <Head>
        <title>Mirror Advisors</title>
        <meta name="description" content="US-led systems integration, ERP and custom development. We get growing companies onto one system. Scoped before built." />
        {/* Browser tab icon. Drop the file at public/mirror.svg. */}
        <link rel="icon" type="image/svg+xml" href="/mirror.svg" />
        <link rel="apple-touch-icon" href="/mirror.svg" />
      </Head>

      <nav id="nav">
        <div className="nav-in">
          <Link href="/" className="logo" legacyBehavior>
            <a className="logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/mirror.svg" alt="Mirror Advisors" className="logo-img" />
              <span className="logo-n">Mirror Advisors</span>
            </a>
          </Link>
          <div className="nl" id="navLinks">
            {/* Active page gets the existing .on class (amber accent). The
                same class is applied by site-runtime.js's _highlightNav for
                the JS-rendered nav (post-Supabase-hydration replacement),
                so visually the two stay in sync. */}
            {/* Solutions and Services are hover-dropdowns. The parent link
                routes to the overview page on click; the dropdown holds
                Overview + the sub-pages. The mobile menu below expands them
                as indented sub-items. */}
            {NAV_GROUPS.map((g) => (
              <div className="nav-drop" key={g.key}>
                <Link href={g.href} className={currentNavKey === g.key ? 'on' : ''}>{g.label}</Link>
                <div className="nav-drop-menu" role="menu" aria-label={g.label}>
                  <Link href={g.href} className="nav-drop-link" role="menuitem">Overview</Link>
                  {g.items.map((it) => (
                    <Link key={it.key} href={it.href} className={'nav-drop-link' + (it.featured ? ' nav-drop-link-featured' : '')} role="menuitem">
                      {it.label}{it.soon && <span className="nav-soon">Soon</span>}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {NAV_LINKS.map((l) => (
              <Link key={l.key} href={l.href} className={currentNavKey === l.key ? 'on' : ''}>{l.label}</Link>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/contact" legacyBehavior>
              <a><button className="ncta">Book a call &rarr;</button></a>
            </Link>
            <button
              className="nav-hamburger"
              id="navHamburger"
              aria-label="Open menu"
              aria-controls="mobileMenu"
              aria-expanded="false"
              onClick={() => typeof window !== 'undefined' && window.toggleMobileMenu && window.toggleMobileMenu()}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className="mobile-menu-backdrop"
        id="mobileMenuBackdrop"
        onClick={() => typeof window !== 'undefined' && window.closeMobileMenu && window.closeMobileMenu()}
        aria-hidden="true"
      />
      <aside className="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Site navigation">
        {/* Home is never togglable in the admin nav dashboard — keep it always-visible.
            Active page gets the .on class (same amber accent treatment as the desktop nav). */}
        <Link href="/" onClick={() => window.closeMobileMenu && window.closeMobileMenu()} className={'mm-link' + (currentNavKey === 'home' ? ' on' : '')}>Home</Link>
        {/* The data-page-key attributes let site-runtime.js's _applyNavVisibility()
            toggle these items based on window._NAV_PAGES[key].enabled, so the
            admin's hide toggle hides them here too. */}
        {/* Each dropdown group renders as a section header + indented
            sub-links so mobile visitors see the full sub-navigation without
            needing a hover target. data-page-key on the group lets the
            admin's visibility toggle hide the whole group. */}
        {NAV_GROUPS.map((g) => (
          <div className="mm-svc-group" data-page-key={g.key} key={g.key}>
            <div className="mm-svc-header">{g.label}</div>
            <Link href={g.href} onClick={() => window.closeMobileMenu && window.closeMobileMenu()} className={'mm-link mm-sub' + (router.pathname === g.href ? ' on' : '')}>Overview</Link>
            {g.items.map((it) => (
              <Link
                key={it.key}
                href={it.href}
                data-page-key={it.key}
                onClick={() => window.closeMobileMenu && window.closeMobileMenu()}
                className={'mm-link mm-sub' + (it.featured ? ' mm-sub-featured' : '') + (router.pathname === it.href ? ' on' : '')}
              >
                {it.label}{it.soon && <span className="nav-soon">Soon</span>}
              </Link>
            ))}
          </div>
        ))}
        {NAV_LINKS.map((l) => (
          <Link key={l.key} href={l.href} data-page-key={l.key} onClick={() => window.closeMobileMenu && window.closeMobileMenu()} className={'mm-link' + (currentNavKey === l.key ? ' on' : '')}>{l.label}</Link>
        ))}
        <div className="mm-cta-wrap">
          <a
            href="/contact"
            className="portal-btn"
            onClick={() => window.closeMobileMenu && window.closeMobileMenu()}
          >
            <span>Book a call</span>
          </a>
          <Link href="/contact" legacyBehavior>
            <a onClick={() => window.closeMobileMenu && window.closeMobileMenu()}>
              <button className="ncta">Book a Call &rarr;</button>
            </a>
          </Link>
        </div>
      </aside>

      <div id="pageBgLayer" style={{ display: 'none', position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', transition: 'opacity .6s ease' }} />

      {/* Main page content from each Next.js page */}
      <div id="app" style={{ position: 'relative', zIndex: 1 }}>
        {children}
        {/* Footer (rendered inside #app so it appears at the bottom of every page) */}
        <div dangerouslySetInnerHTML={{ __html: FOOTER_HTML }} />
      </div>

      {/* Cookie banner */}
      <div className="cookie-banner" id="cookieBanner" role="dialog" aria-labelledby="cookieBannerTitle" aria-describedby="cookieBannerText">
        <div className="cookie-banner-body">
          <div className="cookie-banner-title" id="cookieBannerTitle">
            <span className="cookie-banner-title-dot"></span>
            We use cookies
          </div>
          <div className="cookie-banner-text" id="cookieBannerText">
            We use a small set of cookies to keep this site working and understand how it&apos;s used. See our <Link href="/privacy">Privacy Policy</Link> for details.
          </div>
        </div>
        <div className="cookie-banner-actions">
          <button
            className="cookie-btn cookie-btn-decline"
            onClick={() => typeof window !== 'undefined' && window.declineCookies && window.declineCookies()}
          >
            Decline
          </button>
          <button
            className="cookie-btn cookie-btn-accept"
            onClick={() => typeof window !== 'undefined' && window.acceptCookies && window.acceptCookies()}
          >
            Accept
          </button>
        </div>
      </div>

      {/* Admin overlay + chat widget — preserved from source as-is */}
      <div dangerouslySetInnerHTML={{ __html: ADMIN_CHAT_HTML }} />

      {/* Zoho SalesIQ — visitor tracking + silent JS-API identification.
          Implementation lives in components/SalesIQ.js. The chat widget
          calls registerLead(...) from lib/salesiq.js when it captures a
          lead; that helper queues the call until SalesIQ confirms ready,
          then pushes name/email/phone via the visitor.* setters. The chat
          bubble UI is suppressed in the SalesIQ dashboard, NOT here. */}
      <SalesIQ />
    </>
  );
}

// Map Next.js pathname to the original `_INIT.xxx` key.
function pathToInitKey(pathname, query) {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/zoho/')) return 'zoho_' + (query.product || '');
  // Services sub-pages share the same _INIT as the Overview — they can
  // include #pathsGrid and #faqList (populated by _INIT.services). The
  // populators are guarded by if(el) so pages without those elements
  // simply skip.
  if (pathname.startsWith('/services/')) return 'services';
  if (pathname.startsWith('/solutions/') || pathname.startsWith('/case-studies/')) return null;
  // strip leading slash, dashes to underscores
  return pathname.replace(/^\//, '').replace(/-/g, '_');
}
