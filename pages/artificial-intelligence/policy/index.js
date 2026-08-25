import Head from 'next/head';
import HtmlPage from '../../../components/HtmlPage';
import { pages } from '../../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>AI Policy, Unfussy — Mirror Advisors</title>
        <meta name="description" content="An article on drafting a workplace AI policy that people actually follow. Traffic-light data classification, human-in-the-loop verification, approved-tool roster — one page instead of twenty." />
      </Head>
      <HtmlPage html={pages['ai-policy']} />
    </>
  );
}
