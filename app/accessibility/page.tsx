export const metadata = { title: 'Accessibility — Mirror Advisors' };

export default function AccessibilityPage() {
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
            Accessibility
            <br />
            <span style={{ color: 'var(--t)' }}>Statement.</span>
          </h1>
          <p className="ph-sub">
            Mirror Advisors is committed to making mirroradvisors.com usable for everyone, and we continually
            work to improve the experience for visitors with disabilities.
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
            Mirror Advisors is committed to ensuring digital accessibility for people with disabilities. We
            are continually improving the user experience for everyone and working toward the relevant
            accessibility standards to ensure an inclusive online experience.
          </p>

          <h2 className="legal-h2">Our Commitment &amp; Standards</h2>
          <p className="legal-p">
            Mirror Advisors strives to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level
            AA standards. These guidelines explain how to make web content more accessible to people with
            various disabilities, and conforming to them helps make the web more usable for everyone. We treat
            WCAG 2.1 AA as a target we work toward continuously, not a one-time certification.
          </p>

          <h2 className="legal-h2">Measures to Support Accessibility</h2>
          <p className="legal-p">
            As part of our ongoing commitment, we apply the following practices across our digital experience:
          </p>
          <ul className="legal-ul">
            <li>Maintaining a clear heading structure and consistent navigation across pages.</li>
            <li>
              Providing descriptive alt-text for meaningful images, and marking decorative images so screen
              readers can skip them.
            </li>
            <li>Ensuring text-to-background colour contrast meets or exceeds standard thresholds for our dark theme.</li>
            <li>Designing for keyboard navigation throughout the site, with focus indicators on interactive elements.</li>
            <li>Working toward compatibility with common screen-reading technologies (NVDA, JAWS, VoiceOver).</li>
            <li>
              Including ARIA labels and live-region announcements on interactive components such as the
              integration map on our homepage.
            </li>
          </ul>

          <h2 className="legal-h2">Known Limitations</h2>
          <p className="legal-p">
            We want to be transparent about areas where we are still working toward full accessibility:
          </p>
          <ul className="legal-ul">
            <li>
              <strong>Hero integration puzzle</strong> — The interactive puzzle on our homepage uses visual
              cues (colour, animation, snapping pieces) to communicate how Zoho and AI tools connect. The same
              information is described in plain text on our Services and Technology pages.
            </li>
            <li>
              <strong>Animated transitions</strong> — Some pages include subtle animations on scroll or hover.
              We are working to ensure all motion respects the operating system&apos;s &ldquo;reduced
              motion&rdquo; preference.
            </li>
            <li>
              <strong>Embedded media</strong> — A small number of case study background images do not have
              descriptive alt-text because they are purely decorative; we are reviewing these on an ongoing
              basis.
            </li>
          </ul>

          <h2 className="legal-h2">Technical Specifications</h2>
          <p className="legal-p">
            Accessibility of mirroradvisors.com relies on the following technologies working in combination
            with your web browser and any assistive technologies you have installed:
          </p>
          <ul className="legal-ul">
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript (ES2015+)</li>
            <li>WAI-ARIA where appropriate for interactive elements</li>
            <li>SVG for diagrams, icons, and the integration map</li>
          </ul>

          <h2 className="legal-h2">Feedback, Support &amp; Contact Information</h2>
          <p className="legal-p">
            We welcome your feedback on the accessibility of our website. If you encounter accessibility
            barriers, have difficulty navigating our content, or simply want to share a suggestion, please
            reach out:
          </p>

          <div className="legal-contact-block">
            <div className="legal-h3">Accessibility Contact</div>
            <p className="legal-p">
              <strong>Email:</strong> <a href="mailto:info@mirroradvisors.com">info@mirroradvisors.com</a>
            </p>
            <p className="legal-p">
              <strong>Phone:</strong> <a href="tel:+17138877492">713-887-7492</a>
            </p>
            <p className="legal-p">
              <strong>Response Time:</strong> We aim to respond to accessibility feedback within 2–3 business
              days and propose a solution within a reasonable timeframe.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
