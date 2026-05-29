import Link from 'next/link';

export const metadata = { title: 'About — Mirror Advisors' };

export default function AboutPage() {
  return (
    <>
      <div className="ph" style={{ position: 'relative' }}>
        <div className="ph-grid"></div>
        <div
          className="ph-glow"
          style={{
            bottom: 0,
            right: 0,
            width: 600,
            height: 400,
            background: 'radial-gradient(ellipse at 80% 80%,rgba(236,169,52,.06),transparent 65%)',
          }}
        ></div>
        <div className="ph-in">
          <div className="badge">About Mirror Advisors</div>
          <h1>
            The firm built by
            <br />
            <span style={{ color: 'var(--t)' }}>someone who was inside Zoho.</span>
          </h1>
          <p className="ph-sub">
            A US-based Zoho premium partner with a former Zoho Account Executive running the business and a
            25-year enterprise CTO at the architecture table. Built to do Zoho the way Zoho does Zoho — with
            the seniority most partners can&apos;t bring.
          </p>
        </div>
      </div>

      <section className="ab-section">
        <div className="ab-inner">
          <div className="sl">Who We Are</div>
          <div className="sh">
            A Texas-based Zoho premium partner.
            <br />
            <span style={{ color: 'var(--t)' }}>With nearly a decade inside the ecosystem.</span>
          </div>
          <div className="ab-origin">
            <p>
              Mirror Advisors is a <strong>Texas-based Zoho premium partner</strong> with leadership and
              development talent that collectively brings nearly a decade inside the Zoho ecosystem. Our
              founder is a former Zoho Account Executive — CRM and Zoho One, Canada market — and our
              developers come out of Zappy Works, Zoho&apos;s own India-based partner.
            </p>
            <p>
              We are not learning Zoho on our clients&apos; time. We sell and deploy Zoho the way Zoho itself
              does — with inside knowledge of the product, the value proposition, and the sales motion. The
              result: deals close faster, implementations land cleaner, and customers stay longer.
            </p>
          </div>
        </div>
      </section>

      <section className="ab-section alt">
        <div className="ab-inner">
          <div className="sl">Why Mirror Exists</div>
          <div className="sh">
            Zoho is powerful.
            <br />
            <span style={{ color: 'var(--t)' }}>Most partners don&apos;t know how to make it work for you.</span>
          </div>

          <p className="ab-thesis">
            Most partners are <em>developers with a logo</em>. They write code, send an invoice, and disappear.
            Zoho&apos;s own support funnels to India, ticket by ticket, with no memory of your account. The
            freelancer market underprices the work and overdelivers confusion.{' '}
            <span>Mirror Advisors is what happens when someone who sold Zoho from the inside decides to do it right.</span>
          </p>

          <div className="ab-compare-wrap">
            <table className="ab-compare">
              <thead>
                <tr>
                  <th style={{ width: '32%' }}>What Clients Actually Need</th>
                  <th style={{ width: '17%' }}>Offshore Freelancer</th>
                  <th style={{ width: '17%' }}>Typical US Partner</th>
                  <th style={{ width: '17%' }}>Zoho Direct Support</th>
                  <th style={{ width: '17%' }} className="ab-ma-col">
                    Mirror Advisors
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(([crit, ...vals], i) => (
                  <tr key={i}>
                    <td className="ab-criterion">{crit}</td>
                    {vals.map((v, j) => (
                      <td key={j} className={j === 3 ? 'ab-ma-cell' : undefined}>
                        {renderBadge(v as string, j === 3)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="ab-section">
        <div className="ab-inner">
          <div className="sl">Founder &amp; CEO</div>
          <div className="sh">
            The inside view of Zoho.
            <br />
            <span style={{ color: 'var(--t)' }}>Turned into a firm that works.</span>
          </div>
          <p className="ab-intro-p">
            Paul Trinidad spent nearly three years selling Zoho from inside the company before starting Mirror
            Advisors. He saw every pattern — the partners who churn and burn, the support tickets lost in
            transit, the implementations that stall because nobody owns the outcome. Mirror Advisors is the
            firm he wished existed when he was referring deals out.
          </p>

          <div className="ab-leader">
            <div className="ab-leader-bio">
              <h3>
                Paul Trinidad<span>Founder &amp; CEO</span>
              </h3>
              <p>
                Founded Mirror Advisors as a premier RevOps consultancy specializing in end-to-end business
                process automation on the Zoho platform. Architected and launched the &ldquo;Infinity
                Mirror&rdquo; framework — a productized recurring subscription model that gives mid-market
                firms a fractional Revenue Operations team for a flat monthly fee.
              </p>
              <p>
                Before Mirror Advisors, Paul was a Mid-Market Account Executive at Zoho Corporation selling
                CRM and Zoho One into the Canadian market — promoted within the region to handle companies of
                30+ users as Zoho expanded its mid-market motion. He trained the Account Executives and SDRs
                who took over his territory, hit quarterly targets of $150K, and ran monthly sales targets of
                $75K on 2–3 month cycles.
              </p>
              <p>
                He carries that operator&apos;s view into every engagement. Mirror Advisors maintains a 70%+
                profit margin offshore delivery model, top-tier channel partner status, and the long-term
                client retainers that come from actually solving the problem the first time.
              </p>
              <div className="ab-credit">
                BBA · The University of Texas at Austin — McCombs School of Business · Based in Greater
                Houston, Texas
              </div>
            </div>

            <div className="ab-stats">
              {PAUL_STATS.map(([v, l], i) => (
                <div className="ab-stat-row" key={i}>
                  <div className="ab-stat-val">{v}</div>
                  <div className="ab-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ab-section alt">
        <div className="ab-inner">
          <div className="ab-divider"></div>
          <div className="sl">Managing Partner &amp; CTO</div>
          <div className="sh">
            Mirror Advisors brings something no other partner has:
            <br />
            <span style={{ color: 'var(--t)' }}>the enterprise buyer at the table.</span>
          </div>
          <p className="ab-intro-p">
            Most Zoho partners have never sat on the other side of the desk. Mark Alberto has — for 25+ years.
            SVP of Technology at a $2B insurance brokerage through IPO prep. Two decades running IT at a
            top-tier Philadelphia brokerage. The exact CIO/CTO profile most enterprise software vendors are
            trying to reach. Now he&apos;s on your side of the table — architecting your Zoho deployment with
            the seniority and judgment most partners can&apos;t bring.
          </p>

          <div className="ab-leader">
            <div className="ab-leader-bio">
              <h3>
                Mark Alberto<span>Managing Partner &amp; CTO</span>
              </h3>
              <p>
                25+ years as the buyer Zoho sells to. Career CIO/CTO/VP profile — the exact persona Zoho&apos;s
                mid-market and enterprise AEs are trying to reach. Now on your side of the pitch.
              </p>
              <p>
                Most recently SVP of Technology at TWFG, a $2B insurance brokerage where he led aggressive
                acquisition growth and IPO prep — unifying 200+ franchise branches and 20 corporate stores
                across 40 states onto a single SaaS, security, and management stack with 2,000 users. Exactly
                where Zoho shines and most partners fail.
              </p>
              <p>
                Mark speaks the SaaS P&amp;L. He partnered with the CEO and CFO on an 80% user-fee revenue
                lift and software capitalization, and delivered SOC 2 Type 1 and NYDFS compliance under live
                IPO pressure — an asset for any push into regulated verticals like financial services and
                insurance.
              </p>
              <div className="ab-credit">
                MBA Finance · BA Computer Science — La Salle University · Post-Grad, Generative AI for
                Business Applications — UT Austin, May 2026
              </div>
            </div>

            <div className="ab-stats">
              {MARK_STATS.map(([v, l], i) => (
                <div className="ab-stat-row" key={i}>
                  <div className="ab-stat-val">{v}</div>
                  <div className="ab-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="ctas">
        <div className="ctasg"></div>
        <h2 className="ctash">Want to work with the firm Zoho refers to?</h2>
        <p className="ctasp">
          Book a 30-minute call. We&apos;ll tell you honestly whether we&apos;re the right partner for what
          you&apos;re trying to do.
        </p>
        <div className="ctasb">
          <Link href="/contact">
            <button className="bp" style={{ padding: '14px 34px', fontSize: 15 }}>
              Book a Strategy Session{' '}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
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

function renderBadge(v: string, isMa: boolean) {
  if (v === '—') return <span className="ab-compare-dash">—</span>;
  const good = ['Yes', 'Texas', 'Always', 'In practice', 'Direct', '$2K/mo'];
  const bad = ['No', 'Rarely', 'None', 'Too expensive'];
  const part = ['Some', 'Varies', 'Sometimes', 'Talk', 'Piecemeal'];
  if (isMa) return <span className="ab-badge ab-badge-good">{v}</span>;
  if (good.includes(v)) return <span className="ab-badge ab-badge-good">{v}</span>;
  if (bad.includes(v)) return <span className="ab-badge ab-badge-bad">{v}</span>;
  if (part.includes(v)) return <span className="ab-badge ab-badge-part">{v}</span>;
  return <span className="ab-badge">{v}</span>;
}

const COMPARE_ROWS: Array<[string, string, string, string, string]> = [
  ['Strategic consulting on feature overlap', 'No', 'Some', 'No', 'Yes'],
  ['Former Zoho employee leading the firm', 'No', 'Rarely', '—', 'Yes'],
  ['US-based English-speaking project management', 'No', 'Varies', 'No', 'Texas'],
  ['Account-specific support (not ticket roulette)', 'No', 'Sometimes', 'No', 'Always'],
  ['Long-term retainer mentality (not churn-and-burn)', 'No', 'No', '—', 'Yes'],
  ['Real AI integration — not just talk', 'No', 'Talk', 'No', 'In practice'],
  ['Accountability tied to vendor referrals', 'None', 'None', '—', 'Direct'],
  ['Full implementation + support for small clients', 'Piecemeal', 'Too expensive', 'No', '$2K/mo'],
];

const PAUL_STATS: Array<[string, string]> = [
  ['3 yrs', 'Inside Zoho — Mid-Market AE, Canada market'],
  ['2017', 'Selling Zoho One since launch year'],
  ['70%+', 'Profit margin on offshore delivery team'],
  ['$150K', 'Quarterly quota carried and hit at Zoho'],
  ['3,000+', 'LinkedIn followers — active RevOps voice'],
];

const MARK_STATS: Array<[string, string]> = [
  ['25+ yrs', 'CTO as the enterprise buyer'],
  ['$2B', 'Brokerage scale led to IPO prep'],
  ['200+', 'Franchise branches unified onto one stack'],
  ['2,000', 'Users across 40 states'],
  ['4,000', 'Independent agents served via carrier portal'],
  ['+80%', 'SaaS user-fee revenue lift — alongside CEO & CFO'],
  ['SOC 2', 'Type 1 · NYDFS — delivered under IPO pressure'],
];
