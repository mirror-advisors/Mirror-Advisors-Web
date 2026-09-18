import Head from 'next/head';
import HtmlPage from '../components/HtmlPage';
import { pages } from '../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>How We Work | Mirror Advisors</title>
        <meta name="description" content="Every engagement starts with a Mirror Scope, a paid discovery phase that defines the work before anyone builds. US-led consulting with global delivery." />
      </Head>
      <HtmlPage html={pages['how-we-work']} />
    </>
  );
}
