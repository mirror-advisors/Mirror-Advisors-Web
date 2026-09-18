import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Systems Integration | Mirror Advisors</title>
        <meta name="description" content="Connect the software you already own so your data moves on its own. US-led systems integration for growing companies." />
      </Head>
      <HtmlPage html={pages['systems-integration']} />
    </>
  );
}
