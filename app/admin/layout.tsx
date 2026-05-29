import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — Mirror Advisors',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#080B1A', color: '#fff' }}>{children}</div>
  );
}
