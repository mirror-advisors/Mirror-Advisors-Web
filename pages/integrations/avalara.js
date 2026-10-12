import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Avalara Sales Tax | Mirror Advisors</title>
        <meta name="description" content="Mirror Advisors is an Avalara partner. We connect Avalara to the systems you sell through so sales tax is calculated on every order." />
      </Head>
      <HtmlPage html={pages['avalara']} />
    </>
  );
}
