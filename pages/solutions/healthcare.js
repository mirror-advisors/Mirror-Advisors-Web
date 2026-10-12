import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Healthcare Solutions | Mirror Advisors</title>
        <meta name="description" content="Systems for healthcare and medical technology companies, built on Zoho and custom applications." />
      </Head>
      <HtmlPage html={pages['solutions-healthcare']} />
    </>
  );
}
