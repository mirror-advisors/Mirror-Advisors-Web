import Head from 'next/head';
import HtmlPage from '../../components/HtmlPage';
import { pages } from '../../data/pages';

export default function Page() {
  return (
    <>
      <Head>
        <title>Case Study: A Manufacturer's Shipping App on Zoho | Mirror Advisors</title>
        <meta name="description" content="How we built a manufacturer a shipping app on top of Zoho Inventory: auto-packed boxes, every FedEx rate, Zebra labels, and everything written back to Zoho." />
      </Head>
      <HtmlPage html={pages['case-shipping-app']} />
    </>
  );
}
