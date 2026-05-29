import Link from 'next/link';
import { ZOHO_PRODUCTS } from '@/lib/zoho-products';

export const metadata = { title: 'Technology — Mirror Advisors' };

const CATEGORIES: Array<{ title: string; subtitle: string; slugs: string[] }> = [
  {
    title: 'Sales & CRM',
    subtitle: 'Win revenue.',
    slugs: ['crm', 'bigin', 'salesiq', 'forms', 'bookings'],
  },
  {
    title: 'Finance & Operations',
    subtitle: 'Books, billing, expense, inventory.',
    slugs: ['books', 'invoice', 'billing', 'expense', 'checkout', 'inventory'],
  },
  {
    title: 'Marketing',
    subtitle: 'Find, attract, convert.',
    slugs: [
      'campaigns',
      'social',
      'survey',
      'marketingplus',
      'sites',
      'landingpage',
      'backstage',
      'webinar',
      'pagesense',
      'commerce',
      'thrive',
    ],
  },
  {
    title: 'Productivity & Collaboration',
    subtitle: 'How your team actually gets work done.',
    slugs: [
      'mail',
      'cliq',
      'meeting',
      'workdrive',
      'writer',
      'sheet',
      'show',
      'notebook',
      'connect',
      'teaminbox',
    ],
  },
  {
    title: 'HR',
    subtitle: 'Hire, manage, retain.',
    slugs: ['people', 'recruit'],
  },
  {
    title: 'Project Delivery & Service',
    subtitle: 'Ship work, support customers.',
    slugs: ['projects', 'sprints', 'desk', 'assist', 'lens', 'learn'],
  },
  {
    title: 'Developer & Custom',
    subtitle: 'When standard isn’t enough.',
    slugs: ['creator', 'flow', 'analytics', 'dataprep', 'apptics', 'sign', 'contracts', 'vault'],
  },
];

export default function TechnologyPage() {
  return (
    <>
      <div className="ph" style={{ position: 'relative' }}>
        <div className="ph-grid"></div>
        <div
          className="ph-glow"
          style={{
            top: '10%',
            right: '5%',
            width: 500,
            height: 500,
            background: 'radial-gradient(ellipse,rgba(236,169,52,.05),transparent 65%)',
          }}
        ></div>
        <div className="ph-in">
          <div className="badge">Technology</div>
          <h1>
            The Tools That
            <br />
            <span style={{ color: 'var(--t)' }}>Power Our Work.</span>
          </h1>
          <p className="ph-sub">
            We&apos;re technology-agnostic in principle, but opinionated in practice. Here&apos;s the stack
            we&apos;ve chosen, why we chose it, and how we extend it with AI and custom code.
          </p>
        </div>
      </div>

      <section className="sec">
        <div className="si">
          <div className="sl">Foundation Layer</div>
          <div className="sh">
            Zoho One.
            <br />
            <span style={{ color: 'var(--t)' }}>40+ apps, one operating system.</span>
          </div>
          <p className="sp" style={{ maxWidth: 700 }}>
            Tap any product to see how we deploy it and how we extend it with Claude AI.
          </p>

          {CATEGORIES.map((cat) => {
            const items = cat.slugs
              .map((s) => ZOHO_PRODUCTS.find((p) => p.slug === s))
              .filter(Boolean) as typeof ZOHO_PRODUCTS;
            return (
              <div key={cat.title} style={{ marginTop: 48 }}>
                <div className="zoho-cat-h">
                  <div className="sl">{cat.title}</div>
                  <div
                    style={{
                      fontSize: 14,
                      color: 'var(--text-mid)',
                      fontWeight: 300,
                      marginBottom: 20,
                    }}
                  >
                    {cat.subtitle}
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gap: 14,
                    gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
                  }}
                >
                  {items.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/zoho/${p.slug}`}
                      className="zoho-tech-card"
                      style={{
                        display: 'block',
                        padding: 18,
                        borderRadius: 14,
                        background: p.color.bg08,
                        border: `1px solid ${p.color.bd2}`,
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'transform .2s ease',
                      }}
                    >
                      <div style={{ fontSize: 22, marginBottom: 8 }}>{p.emoji}</div>
                      <div
                        style={{
                          fontFamily: "'Montserrat',sans-serif",
                          fontWeight: 700,
                          fontSize: 14,
                          color: p.color.hex,
                          marginBottom: 4,
                        }}
                      >
                        {p.name}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-mid)' }}>{p.tagline}</div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="ctas">
        <div className="ctasg"></div>
        <h2 className="ctash">Want to See the Stack in Action?</h2>
        <p className="ctasp">Every engagement starts with Scope — we map your needs to the right tools.</p>
        <div className="ctasb">
          <Link href="/contact">
            <button className="bp" style={{ padding: '14px 34px', fontSize: 15 }}>
              Book a Strategy Session
            </button>
          </Link>
          <Link href="/cases">
            <button className="bs" style={{ padding: '13px 26px' }}>
              See Case Studies
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
