import Head from 'next/head';
import HtmlPage from '../components/HtmlPage';
import { pages } from '../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>AI Field Guide — What AI Can Actually Do | Mirror Advisors</title>
        <meta name="description" content="A plain-language field guide to what AI can do inside a real business — from answering employee questions to running autonomous workflows. Nine capabilities, real examples." />
      </Head>
      <HtmlPage html={pages['ai-field-guide']} />
    </>
  );
}
