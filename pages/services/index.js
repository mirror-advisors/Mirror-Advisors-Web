import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Services | Systems Integration, ERP, Custom Development &amp; AI | Mirror Advisors</title>
        <meta name="description" content="Systems integration, data migration, ERP implementation, custom development, AI and automation, and Zoho consulting. US-led, scoped before built." />
      </Head>
      <HtmlPage html={pages['services']} />
    </>
  );
}
