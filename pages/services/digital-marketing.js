import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Digital Marketing — Mirror Advisors</title>
        <meta name="description" content="Full-funnel marketing wired to your CRM. Zoho Campaigns, marketing automation, landing pages, SEO, paid coordination, and pipeline-to-revenue attribution." />
      </Head>
      <HtmlPage html={pages['digital-marketing']} />
    </>
  );
}
