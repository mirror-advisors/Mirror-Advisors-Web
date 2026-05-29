import Head from 'next/head';
import { useRouter } from 'next/router';
import HtmlPage from '../../components/HtmlPage';
import { zohoProducts } from '../../data/zoho-products';

export default function ZohoProductPage() {
  const router = useRouter();
  const { product } = router.query;
  if (!product) return null;
  const html = zohoProducts[product];
  if (!html) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--mid)', fontFamily: 'Montserrat, sans-serif' }}>
        Zoho product not found.
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Zoho {product.charAt(0).toUpperCase() + product.slice(1)} — Mirror Advisors</title>
      </Head>
      <HtmlPage html={html} />
    </>
  );
}

// Pre-render every known product at build time.
export async function getStaticPaths() {
  const products = Object.keys(zohoProducts);
  return {
    paths: products.map((p) => ({ params: { product: p } })),
    fallback: false,
  };
}

export async function getStaticProps() {
  return { props: {} };
}
