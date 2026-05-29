import Head from 'next/head';
import HtmlPage from '../components/HtmlPage';
import { pages } from '../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Services — Mirror Advisors</title>
      </Head>
      <HtmlPage html={pages['services']} />
    </>
  );
}
