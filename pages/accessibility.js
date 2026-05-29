import Head from 'next/head';
import HtmlPage from '../components/HtmlPage';
import { pages } from '../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Accessibility — Mirror Advisors</title>
      </Head>
      <HtmlPage html={pages['accessibility']} />
    </>
  );
}
