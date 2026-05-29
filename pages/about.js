import Head from 'next/head';
import HtmlPage from '../components/HtmlPage';
import { pages } from '../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>About — Mirror Advisors</title>
      </Head>
      <HtmlPage html={pages['about']} />
    </>
  );
}
