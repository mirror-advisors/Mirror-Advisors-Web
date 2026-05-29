import Link from 'next/link';
import { HeroPuzzle } from '@/components/home/HeroPuzzle';
import { Screens } from '@/components/home/Screens';
import { CasesTrack } from '@/components/home/CasesTrack';
import { ServiceTabs } from '@/components/home/ServiceTabs';

export const metadata = {
  title: 'Mirror Advisors — Business & Technology Consulting',
};

export default function HomePage() {
  return (
    <>
      {/* HERO with interactive puzzle */}
      <section id="hero" className="hero-v2">
        <div className="hero-v2-vignette"></div>
        <div className="hero-v2-inner">
          <div className="hero-v2-badge hero-v2-badge-left">
            <span className="hero-v2-badge-dot"></span>
            NOW ACCEPTING NEW CLIENTS
          </div>

          <h1 className="hero-v2-h1">
            <span className="word">We</span> <span className="word">build</span>{' '}
            <span className="word">technology</span>
            <br />
            <span className="word">that</span>{' '}
            <span className="word word-accent">scales.</span>
          </h1>

          <p className="hero-v2-p">
            Enterprise ERP deployments, custom Claude AI apps, Zoho consulting &amp; support, and deep systems
            integration — built for businesses that are serious about growth.
          </p>

          <div className="hero-v2-btns">
            <Link href="/contact">
              <button className="btn-primary hero-v2-cta">
                Book a Strategy Session
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
            <Link href="/cases">
              <button className="btn-secondary">See Case Studies</button>
            </Link>
          </div>

          <HeroPuzzle />
        </div>
      </section>

      {/* LIVE SCREENS */}
      <Screens />

      {/* CAPABILITIES */}
      <section id="capabilities">
        <div className="section-wrap">
          <div className="sec-label">What We Build</div>
          <div className="sec-h">
            Four Disciplines.
            <br />
            One Practice.
          </div>
          <p className="sec-sub">
            Every engagement draws from all four. We don&apos;t silo our expertise — your problem gets the full
            picture.
          </p>

          <div className="cap-grid">
            <CapCard
              color="#ECA934"
              icon={
                <>
                  <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
                  <path d="M12 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                  <path d="M7 17a5 5 0 0 1 10 0" />
                </>
              }
              title="AI-Powered Apps"
              desc="We build AI agents that live inside your existing tools — scoring leads, drafting documents, answering internal questions, and flagging problems before you see them. No new software to learn. No humans in the loop."
            />
            <CapCard
              color="#6B9FD4"
              icon={
                <>
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </>
              }
              title="Business Consulting"
              desc="Before we build anything, we map what you actually have, what’s broken, and what’s costing you. Then we give you a technology plan that we’re accountable for executing — not a deck that sits in a drawer."
            />
            <CapCard
              color="#8B9FD4"
              icon={
                <>
                  <circle cx="12" cy="5" r="3" />
                  <circle cx="5" cy="19" r="3" />
                  <circle cx="19" cy="19" r="3" />
                  <path d="M12 8v3M8.5 15.5l6.5-3.5M7.4 17.5l-1.9-3.3M16.6 17.5l1.9-3.3" />
                </>
              }
              title="Systems Integration"
              desc="Most businesses run 8–14 tools that don’t share data. We build the connections that make your stack behave like one system — so a deal closed in CRM becomes an invoice in accounting without anyone touching a keyboard."
            />
            <CapCard
              color="#ECA934"
              icon={
                <>
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </>
              }
              title="ERP Implementation"
              desc="ERP projects have a notorious failure rate. Ours don’t miss. We handle the full cycle — blueprint, migration, configuration, training — and we don’t hand you off to a support queue when it goes live."
            />
          </div>
        </div>
      </section>

      {/* CASE STUDIES — horizontal drag track */}
      <section id="cases">
        <div className="cases-header">
          <div className="sec-label">Case Studies</div>
          <div className="sec-h">Results That Compound</div>
          <p className="sec-sub">Real work. Real numbers. Drag to explore.</p>
        </div>
        <CasesTrack />
      </section>

      {/* SERVICE MODELS — interactive tabs */}
      <ServiceTabs />

      {/* ZOHO */}
      <section id="zoho">
        <div className="section-wrap">
          <div className="zoho-grid">
            <div>
              <div className="sec-label">Foundation Layer</div>
              <div className="sec-h">
                Deep Zoho Expertise.
                <br />
                <span style={{ color: 'var(--bluegray)' }}>Not Our Whole Story.</span>
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: 'var(--text-mid)',
                  lineHeight: 1.78,
                  marginBottom: 24,
                  fontWeight: 300,
                }}
              >
                Zoho&apos;s platform is one of the most capable business operating systems available — and
                we&apos;ve achieved expert-level depth across its entire suite. But Zoho is our instrument,
                not our identity.
              </p>
              <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.78, fontWeight: 300 }}>
                The real value comes when we extend it with custom Claude AI, bespoke integrations, and
                business logic the native platform alone can&apos;t handle.
              </p>
              <div className="zoho-tags">
                <span className="zoho-tag">Zoho One</span>
                <span className="zoho-tag">Advanced CRM</span>
                <span className="zoho-tag">Books + Finance</span>
                <span className="zoho-tag">Custom Functions</span>
                <span className="zoho-tag">Claude Extensions</span>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontFamily: 'Montserrat,sans-serif',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 16,
                }}
              >
                Apps We Deploy — Hover Any
              </div>
              <Link href="/technology" className="zoho-app-grid" style={{ display: 'grid', cursor: 'pointer' }}>
                {[
                  'CRM',
                  'Books',
                  'Projects',
                  'Desk',
                  'Analytics',
                  'Sign',
                  'Flow',
                  'People',
                  'Inventory',
                  'Recruit',
                  'Expense',
                  'Creator',
                ].map((n) => (
                  <div className="zoho-chip" key={n}>
                    <div className="zoho-chip-prefix">Zoho</div>
                    <div className="zoho-chip-name">{n}</div>
                  </div>
                ))}
              </Link>
              <div className="zoho-note">
                <div className="zoho-note-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECA934" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div className="zoho-note-text">
                  <strong>The real power</strong> comes when we extend Zoho with custom Claude AI apps,
                  automated workflows, and third-party integrations — building capabilities the native
                  platform alone cannot deliver.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CapCard({
  color,
  icon,
  title,
  desc,
}: {
  color: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  const rgba = hexToRgba(color);
  return (
    <Link
      href="/services"
      className="cap-card"
      style={{ cursor: 'pointer', display: 'block', color: 'inherit', textDecoration: 'none' }}
    >
      <div
        className="cap-card-accent"
        style={{ background: `linear-gradient(90deg,${color},transparent)` }}
      ></div>
      <div
        className="cap-icon-box"
        style={{ background: `rgba(${rgba},0.09)`, border: `1px solid rgba(${rgba},0.2)` }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7">
          {icon}
        </svg>
      </div>
      <div className="cap-title">{title}</div>
      <div className="cap-desc">{desc}</div>
      <div className="cap-arrow-btn">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

function hexToRgba(hex: string) {
  const m = hex.replace('#', '').match(/.{2}/g);
  if (!m) return '255,255,255';
  return m.map((h) => parseInt(h, 16)).join(',');
}
