import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Custom Development | Mirror Advisors</title>
        <meta name="description" content="When off-the-shelf software doesn't do it, we build it. Custom modules, portals, integrations, workflow logic and standalone applications." />
      </Head>
      <HtmlPage html={pages['custom-development']} />
    </>
  );
}
