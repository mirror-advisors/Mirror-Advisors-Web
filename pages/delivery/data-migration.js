import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Data Migration | Mirror Advisors</title>
        <meta name="description" content="Move your history into a new system cleanly, with nothing lost and nothing duplicated. ERP and CRM data migration, mapped, validated and reconciled." />
      </Head>
      <HtmlPage html={pages['data-migration']} />
    </>
  );
}
