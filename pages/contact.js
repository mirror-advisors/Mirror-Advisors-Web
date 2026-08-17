import Head from 'next/head';
import Script from 'next/script';
import HtmlPage from '../components/HtmlPage';
import { pages } from '../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Contact — Mirror Advisors</title>
      </Head>
      {/* Cloudflare Turnstile — loads the widget script. The .cf-turnstile
          div lives inside the contact form (data/pages.js). Turnstile auto-
          scans the DOM on load and renders every matching element. */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <HtmlPage html={pages['contact']} />
    </>
  );
}
