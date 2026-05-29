/* eslint-disable @next/next/no-css-tags */
import type { Metadata } from 'next';
import { Montserrat, DM_Sans } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { ChatWidget } from '@/components/ChatWidget';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mirror Advisors — Business & Technology Consulting',
  description:
    'Texas-based Zoho premium partner and Anthropic Claude AI consulting firm. Enterprise ERP deployments, custom Claude AI apps, Zoho consulting & support, and deep systems integration.',
  metadataBase: new URL('https://mirroradvisors.com'),
  openGraph: {
    title: 'Mirror Advisors',
    description:
      'Enterprise ERP deployments, custom Claude AI apps, Zoho consulting & support, and deep systems integration.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${dmSans.variable}`}>
      <head>
        {/* Legacy stylesheet from the original static site. Loaded from /public
            so it can ship unchanged while we migrate styling to Tailwind. */}
        <link rel="stylesheet" href="/legacy/styles.css" />
      </head>
      <body>
        <Nav />
        <div id="app" style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
        <Footer />
        <CookieBanner />
        <ChatWidget />
      </body>
    </html>
  );
}
