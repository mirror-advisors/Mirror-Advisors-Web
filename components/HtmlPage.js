import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

/**
 * Renders raw HTML from data/pages.js into the page. Intercepts clicks on
 * any `<a onclick="go('key')">` or `go('services/systems-integration')` and
 * routes via Next.js so internal nav stays snappy without a full reload.
 */
export default function HtmlPage({ html }) {
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleClick(e) {
      let node = e.target;
      while (node && node !== el) {
        if (node.tagName === 'A' || node.tagName === 'BUTTON' || node.hasAttribute('onclick')) {
          const onclick = node.getAttribute('onclick');
          if (onclick) {
            // Match go('key') where key may contain letters, digits, dashes
            // and forward slashes (for services/systems-integration etc).
            const m = onclick.match(/go\(\s*['"]([\w\-/]+)['"]\s*\)/);
            if (m) {
              e.preventDefault();
              const target = m[1];
              const path = target === 'home' ? '/' : '/' + target;
              router.push(path);
              return;
            }
          }
        }
        node = node.parentNode;
      }
    }

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [router, html]);

  // Scroll-reveal progressive enhancement. Content is fully visible by
  // default; only once this effect runs (JS available, motion allowed) do
  // [data-rv] / [data-lit] elements get their pre-reveal state. A single
  // rAF-throttled scroll check (not IntersectionObserver) so that jumping
  // past elements (End key, anchor, restored scroll) still reveals them.
  // Re-runs whenever the page HTML changes.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let rv = Array.prototype.slice.call(el.querySelectorAll('[data-rv]'));
    let lit = Array.prototype.slice.call(el.querySelectorAll('[data-lit]'));
    if (!rv.length && !lit.length) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight || 0;
      rv = rv.filter((t) => {
        if (t.getBoundingClientRect().top < vh * 0.9) { t.classList.add('rv-in'); return false; }
        return true;
      });
      lit = lit.filter((t) => {
        if (t.getBoundingClientRect().top < vh * 0.6) { t.classList.add('is-lit'); return false; }
        return true;
      });
      if (!rv.length && !lit.length) detach();
    };
    const onScroll = () => { if (!raf) raf = window.requestAnimationFrame(check); };
    const detach = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // Mark what is already on screen first, so it never flickers.
    check();
    el.classList.add('rv-ready');
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      detach();
      if (raf) window.cancelAnimationFrame(raf);
      el.classList.remove('rv-ready');
    };
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
