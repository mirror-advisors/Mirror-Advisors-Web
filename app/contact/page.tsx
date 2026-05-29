import Link from 'next/link';
import { ContactForm } from './ContactForm';

export const metadata = { title: 'Contact — Mirror Advisors' };

export default function ContactPage() {
  return (
    <div className="page-wrap">
      <div className="contact-left">
        <div className="cl-grid"></div>
        <div className="cl-glow"></div>
        <div className="cl-inner">
          <div className="badge">Let&apos;s Talk</div>
          <h1 style={{ fontSize: 'clamp(36px,4vw,54px)', lineHeight: 1.08, letterSpacing: '-.03em' }}>
            Start the
            <br />
            <span style={{ color: 'var(--t)' }}>Conversation.</span>
          </h1>
          <p className="cl-sub">
            No deck. No pitch. Just a real conversation about your situation — and an honest answer about
            whether we can help.
          </p>
          <div className="expect-list">
            {[
              ['1', 'We respond within 24 hours', 'Every submission is read by a senior advisor — not routed through an SDR.'],
              ['2', '30-minute intro call', 'We ask about your goals, your current stack, and what’s not working.'],
              ['3', 'Honest recommendation', 'We’ll tell you which model fits — or if you don’t need us yet, we’ll say that too.'],
            ].map(([n, t, d]) => (
              <div className="exp-item" key={n}>
                <div className="exp-num">{n}</div>
                <div>
                  <div className="exp-title">{t}</div>
                  <div className="exp-desc">{d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="alt-contacts">
            <div className="ac-item">
              <div className="ac-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECA934" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="ac-title">Email</div>
                <div className="ac-val">
                  <a href="mailto:hello@mirroradvisors.com">hello@mirroradvisors.com</a>
                </div>
              </div>
            </div>
            <div className="ac-item">
              <div className="ac-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ECA934" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div>
                <div className="ac-title">LinkedIn</div>
                <div className="ac-val">linkedin.com/company/mirroradvisors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-right">
        <div className="cr-inner">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
