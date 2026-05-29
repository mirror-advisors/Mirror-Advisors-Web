import Head from 'next/head';
import HtmlPage from '../components/HtmlPage';
import { pages } from '../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Case Studies — Mirror Advisors</title>
      </Head>
      <HtmlPage html={pages['cases']} />
    </>
  );
}
