import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Avalara Sales Tax (Coming Soon) | Mirror Advisors</title>
        <meta name="description" content="Avalara sales tax implementation from Mirror Advisors is coming soon, connected to the systems you sell through." />
      </Head>
      <HtmlPage html={pages['avalara']} />
    </>
  );
}
