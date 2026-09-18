import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Zoho Consulting, Implementation &amp; Support | Mirror Advisors</title>
        <meta name="description" content="Zoho implementation, migration, custom development and support from a firm founded by a former Zoho employee. Zoho Authorized Partner." />
      </Head>
      <HtmlPage html={pages['zoho']} />
    </>
  );
}
