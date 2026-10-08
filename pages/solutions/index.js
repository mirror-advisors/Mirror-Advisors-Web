import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Solutions | Mirror Advisors</title>
        <meta name="description" content="Custom AI applications, Zoho implementation and AI built on top of Zoho. Odoo and Avalara coming soon. Scoped before built, by a US-led team." />
      </Head>
      <HtmlPage html={pages['solutions']} />
    </>
  );
}
