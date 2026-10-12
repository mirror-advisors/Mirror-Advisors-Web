import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Consulting &amp; Support | Mirror Advisors</title>
        <meta name="description" content="Senior advice before you buy and a team that stays reachable after go-live: reviews, fixes, enhancements and admin training." />
      </Head>
      <HtmlPage html={pages['consulting-support']} />
    </>
  );
}
