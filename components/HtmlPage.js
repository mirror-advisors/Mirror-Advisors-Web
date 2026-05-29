import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

/**
 * Renders raw HTML (from data/pages.js or data/zoho-products.js) into the page.
 * Intercepts clicks on any `<a onclick="go('xxx')">` and routes via Next.js
 * instead of relying on the global `window.go` shim — so internal nav stays
 * snappy and doesn't full-reload.
 */
export default function HtmlPage({ html }) {
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleClick(e) {
      // Climb up to find a relevant anchor or button
      let node = e.target;
      while (node && node !== el) {
        if (node.tagName === 'A' || node.tagName === 'BUTTON' || node.hasAttribute('onclick')) {
          const onclick = node.getAttribute('onclick');
          if (onclick) {
            // Look for go('xxx') pattern
            const m = onclick.match(/go\(\s*['"]([\w-]+)['"]\s*\)/);
            if (m) {
              e.preventDefault();
              const page = m[1];
              const aliases = { capabilities: 'home', stack: 'technology' };
              const target = aliases[page] || page;
              let path;
              if (target === 'home') {
                path = '/';
              } else if (/^case_\d+$/.test(target)) {
                path = '/cases/' + target.slice('case_'.length);
              } else if (target.startsWith('zoho_')) {
                path = '/zoho/' + target.slice('zoho_'.length);
              } else {
                path = '/' + target;
              }
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
