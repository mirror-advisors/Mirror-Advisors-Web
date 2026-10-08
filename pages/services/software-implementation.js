import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Software Implementation | Mirror Advisors</title>
        <meta name="description" content="ERP, CRM and core business system implementation, from process mapping and configuration through migration, training and go-live." />
      </Head>
      <HtmlPage html={pages['software-implementation']} />
    </>
  );
}
