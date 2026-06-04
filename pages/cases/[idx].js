import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';

// Case-study detail page. The original site stored cases as a JS array
// (`window._CASES`) and built the detail HTML dynamically via
// `_buildCasePage(idx)` — both are exposed by `lib/site-runtime.js` once
// `initSiteRuntime()` runs (called from Layout's useEffect).
//
// Two-stage hydration:
//   1. Layout's initSiteRuntime sets window._CASES to HARDCODED defaults
//      synchronously.
//   2. Layout's fetchAllConfig() async-overrides window._CASES with the
//      latest admin-saved data from Supabase, then fires `cases:hydrated`.
//
// If this page renders between stages 1 and 2 it will show stale defaults
// and never pick up the admin edits. So we wait for hydration before doing
// the first build, and also re-render on the `cases:hydrated` event for
// any subsequent updates.
export default function CaseDetailPage() {
  const router = useRouter();
  const idx = router.query.idx;
  const [html, setHtml] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || idx === undefined) return;

    let cancelled = false;
    let tries = 0;
    // Safety net: if Supabase is unreachable / extremely slow, fall back to
    // whatever's already in window._CASES after ~3 s so the page isn't blank
    // forever.
    const HARD_FALLBACK_MS = 3000;
    const hardFallbackAt = Date.now() + HARD_FALLBACK_MS;

    function build() {
      if (cancelled) return;
      const cases = window._CASES;
      const buildFn = window._buildCasePage;
      if (!cases || typeof buildFn !== 'function') return;
      const i = parseInt(idx, 10);
      if (Number.isNaN(i) || i < 0 || i >= cases.length) {
        setNotFound(true);
        return;
      }
      setHtml(buildFn(i));
    }

    function tryRender() {
      if (cancelled) return;
      const cases = window._CASES;
      const buildFn = window._buildCasePage;
      // Stage 0: runtime not initialised yet — Layout's useEffect hasn't
      // populated window._CASES / _buildCasePage.
      if (!cases || typeof buildFn !== 'function') {
        if (tries++ < 80) setTimeout(tryRender, 50);
        return;
      }
      // Stage 1: runtime ready but Supabase fetch hasn't returned yet.
      // Wait for hydration (or the hard-fallback timeout) so we don't paint
      // stale hardcoded defaults.
      if (!window._casesHydrated && Date.now() < hardFallbackAt) {
        if (tries++ < 200) setTimeout(tryRender, 50);
        return;
      }
      build();
    }

    function onHydrated() {
      // Re-render whenever hydration fires. Resets the not-found flag in
      // case the saved data restored a previously-missing case.
      if (cancelled) return;
      setNotFound(false);
      build();
    }

    tryRender();
    window.addEventListener('cases:hydrated', onHydrated);
    return () => {
      cancelled = true;
      window.removeEventListener('cases:hydrated', onHydrated);
    };
  }, [idx]);

  if (notFound) {
    return (
      <>
        <Head><title>Case Study Not Found — Mirror Advisors</title></Head>
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          textAlign: 'center',
          padding: 20,
        }}>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
            Case study not found
          </h1>
          <a href="/cases" style={{ color: 'var(--t)', textDecoration: 'underline' }}>
            ← All Case Studies
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <Head><title>Case Study — Mirror Advisors</title></Head>
      <HtmlPage html={html} />
    </>
  );
}
