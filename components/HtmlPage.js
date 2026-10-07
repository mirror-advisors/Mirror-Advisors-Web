import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { mountConstellations } from '../lib/constellation';

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

  // Decorative particle constellations. Generic .brf-hero sections that
  // don't carry their own canvas get one injected (aria-hidden), then every
  // canvas[data-constellation] in the page is mounted. Re-runs per page.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    el.querySelectorAll('.brf-hero').forEach((hero) => {
      if (hero.querySelector('canvas[data-constellation]')) return;
      const c = document.createElement('canvas');
      c.className = 'dl-cv dl-cv-auto';
      c.setAttribute('data-constellation', 'cloud');
      c.setAttribute('data-seed', String(hero.textContent.length % 97));
      c.setAttribute('data-density', '1.1');
      c.setAttribute('aria-hidden', 'true');
      hero.classList.add('dl-has-cv');
      hero.insertBefore(c, hero.firstChild);
    });
    return mountConstellations(el);
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
