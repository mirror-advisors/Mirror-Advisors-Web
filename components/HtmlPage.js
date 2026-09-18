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

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
