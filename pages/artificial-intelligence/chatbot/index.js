import Head from 'next/head';
import HtmlPage from '../../../components/HtmlPage';
import { pages } from '../../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>How We Build the Chatbot — Mirror Advisors</title>
        <meta name="description" content="An article on how we build private, Claude-powered chatbots — prompt to deployment, in prose. What actually works when the coding tool is the coder." />
      </Head>
      <HtmlPage html={pages['ai-chatbot']} />
    </>
  );
}
