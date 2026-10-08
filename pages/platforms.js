import Head from 'next/head';
import HtmlPage from '../components/HtmlPage';
import { pages } from '../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Platforms We Work With | Mirror Advisors</title>
        <meta name="description" content="Where we build: custom applications with Claude, Zoho, and soon Odoo and Avalara. Plus the systems we connect them to." />
      </Head>
      <HtmlPage html={pages['platforms']} />
    </>
  );
}
