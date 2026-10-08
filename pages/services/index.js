import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Services | Implementation, Migration, Integration, Development &amp; Support | Mirror Advisors</title>
        <meta name="description" content="Software implementation, data migration, systems integration, custom development, and consulting and support. US-led, scoped before built." />
      </Head>
      <HtmlPage html={pages['services']} />
    </>
  );
}
