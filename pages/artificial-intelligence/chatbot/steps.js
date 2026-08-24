import Head from 'next/head';
import HtmlPage from '../../../components/HtmlPage';
import { pages } from '../../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>The Step-by-Step — How We Build the Chatbot — Mirror Advisors</title>
        <meta name="description" content="A twelve-step checklist for building a private, Claude-powered chatbot with an AI coding assistant. Copy each prompt, verify the outcome, ship." />
      </Head>
      <HtmlPage html={pages['ai-chatbot-steps']} />
    </>
  );
}
