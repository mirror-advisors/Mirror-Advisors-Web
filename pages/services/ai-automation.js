import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>AI &amp; Automation | Mirror Advisors</title>
        <meta name="description" content="AI applied where it earns its place, inside systems that are already connected properly. Built by a firm that built its own AI platform." />
      </Head>
      <HtmlPage html={pages['ai-automation']} />
    </>
  );
}
