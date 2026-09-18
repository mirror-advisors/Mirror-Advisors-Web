import Head from 'next/head';
import HtmlPage from '../components/HtmlPage';
import { pages } from '../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Mirror Advisors | US-Led Systems Integration, ERP &amp; Custom Development</title>
        <meta name="description" content="We get growing companies onto one system. Integration, data migration, ERP implementation, custom development and AI. US-led, scoped before built." />
      </Head>
      <HtmlPage html={pages['home']} />
    </>
  );
}
