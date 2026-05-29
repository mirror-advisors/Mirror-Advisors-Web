export const metadata = { title: 'Privacy Policy — Mirror Advisors' };

export default function PrivacyPage() {
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
          <div className="badge">Legal</div>
          <h1>
            Privacy
            <br />
            <span style={{ color: 'var(--t)' }}>Policy.</span>
          </h1>
          <p className="ph-sub">
            How Mirror Advisors collects, uses, and protects information you share with us through this website
            and the Infinity Portal.
          </p>
        </div>
      </div>

      <section className="sec">
        <div className="legal-wrap">
          <div className="legal-meta">
            <span className="legal-meta-dot"></span>
            <span className="legal-meta-label">Last Updated</span>
            <span>May 27, 2026</span>
          </div>

          <p className="legal-intro">
            Mirror Advisors values your privacy and is committed to protecting your personal information. This
            Privacy Policy explains how we collect, use, and protect data you share when visiting our website
            (mirroradvisors.com), engaging with our services, or signing in to the Infinity Portal at
            app.mirroradvisors.com.
          </p>

          <h2 className="legal-h2">Information We Collect</h2>
          <p className="legal-p">
            We collect information to provide better services to our clients and visitors. The data we collect
            includes:
          </p>
          <ul className="legal-ul">
            <li>
              <strong>Personal Information</strong> — Name, email address, company name, phone number, and any
              other details you voluntarily provide through our contact form, consultation bookings, or direct
              inquiries.
            </li>
            <li>
              <strong>Website Usage Data</strong> — IP address, browser type, device information, referral
              source, and pages visited. This data is collected automatically through cookies and similar
              technologies when you browse mirroradvisors.com.
            </li>
            <li>
              <strong>Infinity Portal Data</strong> — If you are an active client with access to our Infinity
              Portal at app.mirroradvisors.com, we collect authentication credentials, session information,
              and the work product, documents, and project data you generate or upload while using the portal.
            </li>
            <li>
              <strong>Project &amp; Engagement Data</strong> — Information you share with us during Scope
              engagements, project delivery, or support work — including system access credentials, business
              data, and configurations — handled under our standard engagement agreements.
            </li>
          </ul>

          <h2 className="legal-h2">How We Use Your Information</h2>
          <p className="legal-p">We use the information we collect to:</p>
          <ul className="legal-ul">
            <li>Respond to inquiries, service requests, and consultation bookings submitted through this website.</li>
            <li>Deliver, configure, and support the Zoho One and Claude AI systems we build for clients.</li>
            <li>Operate and improve the Infinity Portal experience for active clients.</li>
            <li>Send relevant updates and communications — only if you have opted in or have an active engagement with us.</li>
            <li>Conduct internal analytics to understand how our website performs and where we can improve it.</li>
            <li>
              Maintain compliance with applicable laws, tax obligations, and partner agreements (including
              Zoho and Anthropic).
            </li>
          </ul>

          <h2 className="legal-h2">How We Share Your Information</h2>
          <p className="legal-p">
            We do not sell or rent your personal information. We share data only with trusted third parties
            when necessary to operate our business, namely:
          </p>
          <ul className="legal-ul">
            <li>
              <strong>Infrastructure Providers</strong> — Web hosting and email services we use to keep
              mirroradvisors.com and our communications running.
            </li>
            <li>
              <strong>Zoho Corporation</strong> — As an authorised Zoho partner, certain client and engagement
              information is shared with Zoho when required to provision licences, register partner deals, or
              coordinate support.
            </li>
            <li>
              <strong>Anthropic (Claude AI)</strong> — When we build custom Claude AI integrations for clients,
              data flows through Anthropic&apos;s API under their data processing terms. This applies only to
              active client systems, not to general website visitors.
            </li>
            <li>
              <strong>Legal Compliance</strong> — When required by law, court order, or to protect our legal
              rights and property.
            </li>
          </ul>
          <p className="legal-p">
            All third-party partners we work with are required to handle your data securely and in a manner
            consistent with this Privacy Policy.
          </p>

          <h2 className="legal-h2">Cookies and Tracking Technologies</h2>
          <p className="legal-p">
            Our website uses a small set of cookies to remember your preferences (such as your cookie consent
            choice) and to help us understand basic site usage. You can control cookie preferences through your
            browser settings or by using the cookie consent banner that appears on your first visit. We do not
            use third-party advertising cookies or cross-site tracking pixels.
          </p>

          <h2 className="legal-h2">Data Retention</h2>
          <p className="legal-p">
            We retain personal data only as long as necessary to fulfill the purposes outlined in this policy —
            or as required by law, contract, or our professional obligations. Once no longer needed, your data
            is securely deleted or anonymised. Infinity Portal data is retained for the duration of your
            engagement plus a reasonable archival period.
          </p>

          <h2 className="legal-h2">Your Rights &amp; Global Compliance</h2>
          <p className="legal-p">
            Depending on your location (including the US, EU, UK, and Canada), you have specific rights
            regarding your data. You have the right to:
          </p>
          <ul className="legal-ul">
            <li>
              <strong>Access, Correct, or Delete</strong> your personal data.
            </li>
            <li>
              <strong>Opt-Out</strong> of targeted communications, data sharing, or automated profiling.
            </li>
            <li>
              <strong>Data Portability</strong> — request a copy of your data in a usable format.
            </li>
            <li>
              <strong>Non-Discrimination</strong> for exercising your privacy rights.
            </li>
          </ul>
          <p className="legal-p">
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:info@mirroradvisors.com">info@mirroradvisors.com</a>. We will respond within the
            legally mandated timeframe (typically 30 to 45 days).
          </p>

          <h2 className="legal-h2">Data Security</h2>
          <p className="legal-p">
            We take appropriate technical and organisational measures to protect your information from
            unauthorised access, alteration, or disclosure. The Infinity Portal uses authenticated sessions,
            encrypted connections, and access controls scoped to your engagement. While no system is entirely
            secure, we implement industry-standard practices to safeguard the data you entrust to us.
          </p>

          <h2 className="legal-h2">Links to Other Websites</h2>
          <p className="legal-p">
            Our website may contain links to external sites (including Zoho, Anthropic, and partner
            documentation). We are not responsible for the content or privacy practices of those sites and
            encourage you to review their privacy policies separately.
          </p>

          <h2 className="legal-h2">Updates to This Policy</h2>
          <p className="legal-p">
            We may update this Privacy Policy from time to time to reflect new legal requirements or changes
            to how we operate. Any changes will be posted on this page with a revised &ldquo;Last
            Updated&rdquo; date.
          </p>

          <div className="legal-contact-block">
            <div className="legal-h3">Questions About This Policy?</div>
            <p className="legal-p">
              Email us at <a href="mailto:info@mirroradvisors.com">info@mirroradvisors.com</a> or call{' '}
              <a href="tel:+17138877492">713-887-7492</a>. You can also write to us at 2002 Timberloch Pl,
              Suite 200, The Woodlands, TX 77380.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
