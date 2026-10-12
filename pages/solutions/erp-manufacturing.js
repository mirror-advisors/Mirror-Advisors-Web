import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>ERP & Manufacturing Solutions | Mirror Advisors</title>
        <meta name="description" content="ERP, inventory and shipping systems for manufacturers and distributors, on Zoho and custom applications built with Claude." />
      </Head>
      <HtmlPage html={pages['solutions-erp']} />
    </>
  );
}
