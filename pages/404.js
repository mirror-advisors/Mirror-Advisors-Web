import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head><title>404 — Mirror Advisors</title></Head>
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
        textAlign: 'center',
        padding: 20,
      }}>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>Page not found</h1>
        <p style={{ color: 'var(--mid)', fontFamily: 'DM Sans, sans-serif' }}>
          The page you were looking for doesn&apos;t exist.
        </p>
        <Link href="/" style={{ color: 'var(--t)', textDecoration: 'underline' }}>
          Back to Home
        </Link>
      </div>
    </>
  );
}
