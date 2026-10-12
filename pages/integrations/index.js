import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Integrations | Mirror Advisors</title>
        <meta name="description" content="Official Avalara and HelloSend partner, and experience connecting dozens of other systems: QuickBooks, NetSuite, Shopify, FedEx and more." />
      </Head>
      <HtmlPage html={pages['integrations']} />
    </>
  );
}
