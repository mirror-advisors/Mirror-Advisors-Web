import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Odoo Implementation (Coming Soon) | Mirror Advisors</title>
        <meta name="description" content="Odoo implementation from Mirror Advisors is coming soon. Tell us about your project and we will tell you where we can help today." />
      </Head>
      <HtmlPage html={pages['odoo']} />
    </>
  );
}
