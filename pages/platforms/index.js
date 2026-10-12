import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Trusted Platforms | Mirror Advisors</title>
        <meta name="description" content="The platforms we build on and know best: Claude, Zoho, and soon Odoo. Meet each one, then see what we have built with it." />
      </Head>
      <HtmlPage html={pages['platforms']} />
    </>
  );
}
