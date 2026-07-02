import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Custom AI Application — Mirror Advisors</title>
        <meta name="description" content="Bespoke web apps and Claude-powered AI agents. Custom applications + AI solutions built into your existing stack. Full source-code handover, MCP + custom RAG." />
      </Head>
      <HtmlPage html={pages['custom-ai-application']} />
    </>
  );
}
