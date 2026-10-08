import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>AI on Zoho | Mirror Advisors</title>
        <meta name="description" content="Applications and AI that sit on top of Zoho, read from it and write back to it, so Zoho stays your system of record." />
      </Head>
      <HtmlPage html={pages['ai-on-zoho']} />
    </>
  );
}
