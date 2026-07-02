import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Zoho Implementation — Mirror Advisors</title>
        <meta name="description" content="Full-suite Zoho One deployments — CRM, Books, Creator, SalesIQ, Desk, Campaigns. Certified Zoho partner. Multi-entity, legacy migrations, custom Deluge automation, and hypercare." />
      </Head>
      <HtmlPage html={pages['zoho-implementation']} />
    </>
  );
}
