import Head from 'next/head';
import HtmlPage from '../components/HtmlPage';
import { pages } from '../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>AI — Mirror Advisors</title>
      </Head>
      <HtmlPage html={pages['artificial-intelligence']} />
    </>
  );
}
