import Head from 'next/head';
import HtmlPage from '../components/HtmlPage';
import { pages } from '../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>About Mirror Advisors | US-Led Systems Integrator</title>
        <meta name="description" content="Founded in 2023 by a former Zoho employee. A US-led systems integrator based in The Woodlands, Texas, working with clients across the United States." />
      </Head>
      <HtmlPage html={pages['about']} />
    </>
  );
}
