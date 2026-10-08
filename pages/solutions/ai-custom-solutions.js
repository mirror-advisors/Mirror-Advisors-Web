import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>AI Custom Solutions | Mirror Advisors</title>
        <meta name="description" content="Fully custom applications built around how your business runs, with AI where it saves real time. Built with Claude, scoped before built." />
      </Head>
      <HtmlPage html={pages['ai-custom-solutions']} />
    </>
  );
}
