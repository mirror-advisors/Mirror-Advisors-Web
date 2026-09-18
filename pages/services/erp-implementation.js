import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>ERP Implementation | Mirror Advisors</title>
        <meta name="description" content="ERP deployment built around how your business actually runs. Selection, process mapping, configuration, migration, training and go-live support." />
      </Head>
      <HtmlPage html={pages['erp-implementation']} />
    </>
  );
}
