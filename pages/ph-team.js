import Head from 'next/head';
import HtmlPage from '../components/HtmlPage';
import { pages } from '../data/pages';

// Unlisted internal page. Not linked in navigation, footer, or the
// sitemap. Reached only via the direct URL, which the admin panel
// exposes with a copy button. The robots meta below tells search
// engines not to index it even if someone links to it externally.
export default function Page() {
  return (
    <>
      <Head>
        <title>The Operations Team — Mirror Advisors</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Head>
      <HtmlPage html={pages['ph-team']} />
    </>
  );
}
