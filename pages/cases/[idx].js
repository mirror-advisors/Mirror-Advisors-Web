import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';

// Case-study detail page. The original site stored cases as a JS array
// (`window._CASES`) and built the detail HTML dynamically via
// `_buildCasePage(idx)` — both are exposed by `lib/site-runtime.js` once
// `initSiteRuntime()` runs (called from Layout's useEffect).
//
// Because Layout's useEffect runs *after* this page's useEffect on a fresh
// load, we poll briefly until the runtime hooks are available, then render.
export default function CaseDetailPage() {
  const router = useRouter();
  const idx = router.query.idx;
  const [html, setHtml] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || idx === undefined) return;

    let cancelled = false;
    let tries = 0;

    function tryRender() {
      if (cancelled) return;
      const cases = window._CASES;
      const build = window._buildCasePage;
      if (!cases || typeof build !== 'function') {
        // Runtime not initialized yet (Layout's useEffect hasn't fired).
        // Retry a handful of times before giving up.
        if (tries++ < 40) {
          setTimeout(tryRender, 50);
        }
        return;
      }
      const i = parseInt(idx, 10);
      if (Number.isNaN(i) || i < 0 || i >= cases.length) {
        setNotFound(true);
        return;
      }
      setHtml(build(i));
    }

    tryRender();
    return () => {
      cancelled = true;
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
