import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

// Services Overview. Same content as the pre-restructure /services page —
// renamed from pages/services.js → pages/services/index.js when the
// sub-pages (zoho-implementation, custom-ai-application) were added under
// this folder.
export default function Page() {
  return (
    <>
      <Head>
        <title>Services — Mirror Advisors</title>
      </Head>
      <HtmlPage html={pages['services']} />
    </>
  );
}
