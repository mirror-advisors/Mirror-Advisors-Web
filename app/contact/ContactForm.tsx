'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { submitContact } from './actions';

const SERVICES = [
  'AI-Powered Apps',
  'ERP Implementation',
  'Systems Integration',
  'Business Consulting',
  'Infinity Mirror',
  'Bank of Hours',
  'Not Sure Yet',
];

export function ContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  function toggleService(s: string) {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: String(data.get('fname') || ''),
      lastName: String(data.get('lname') || ''),
      email: String(data.get('email') || ''),
      company: String(data.get('company') || ''),
      size: String(data.get('size') || ''),
      services: selectedServices,
      message: String(data.get('message') || ''),
      timeline: String(data.get('timeline') || ''),
    };
    startTransition(async () => {
      const res = await submitContact(payload);
      if (res.ok) setSubmitted(true);
      else setErrorMsg(res.error ?? 'Something went wrong. Please try again.');
    });
  }

  if (submitted) {
    return (
      <div className="success-state">
        <div className="success-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ECA934" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="success-title">Message Sent 🎉</div>
        <p className="success-sub">
          Thanks for reaching out. A senior advisor will review your submission and reach out within 24 hours
          to schedule a call.
        </p>
        <div
          style={{
            padding: '14px 18px',
            borderRadius: 10,
            background: 'rgba(236,169,52,.07)',
            border: '1px solid rgba(236,169,52,.2)',
            fontSize: 13,
            color: 'var(--mid)',
          }}
        >
          <strong style={{ color: 'var(--t)' }}>While you wait:</strong> Browse our{' '}
          <Link href="/cases" style={{ color: 'var(--t)' }}>
            case studies
          </Link>{' '}
          to see what we&apos;ve built for similar businesses.
        </div>
      </div>
    );
  }

  return (
    <div id="formWrap">
      <div className="form-title">Tell Us About Your Project</div>
      <p className="form-sub">
        Takes about 2 minutes. The more detail you share, the more useful our first conversation will be.
      </p>
      <form id="contactForm" onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="fg">
            <label>First Name *</label>
            <input type="text" name="fname" placeholder="Alex" required />
          </div>
          <div className="fg">
            <label>Last Name *</label>
            <input type="text" name="lname" placeholder="Johnson" required />
          </div>
        </div>
        <div className="fg">
          <label>Work Email *</label>
          <input type="email" name="email" placeholder="alex@company.com" required />
        </div>
        <div className="fg">
          <label>Company</label>
          <input type="text" name="company" placeholder="Acme Corp" />
        </div>
        <div className="fg">
          <label>Company Size</label>
          <select name="size">
            <option value="">Select headcount...</option>
            <option>1–10 employees</option>
            <option>11–50 employees</option>
            <option>51–200 employees</option>
            <option>201–500 employees</option>
            <option>500+ employees</option>
          </select>
        </div>
        <div className="fg">
          <label>Which Service Are You Interested In?</label>
          <div className="svc-chips">
            {SERVICES.map((s) => (
              <button
                type="button"
                key={s}
                className={`svc-chip${selectedServices.includes(s) ? ' on' : ''}`}
                onClick={() => toggleService(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="fg">
          <label>How Can We Help? *</label>
          <textarea
            name="message"
            placeholder="Tell us what you're trying to solve, what you've tried, and what success looks like..."
            required
            maxLength={1000}
            onChange={(e) => setCharCount(e.target.value.length)}
          />
          <div className="char-count">{charCount} / 1000</div>
        </div>
        <div className="fg">
          <label>Timeline</label>
          <select name="timeline">
            <option value="">When are you looking to start?</option>
            <option>As soon as possible</option>
            <option>Within 1 month</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>Just exploring</option>
          </select>
        </div>
        <div className="privacy-note">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(236,169,52,.6)"
            strokeWidth="2"
            style={{ flexShrink: 0, marginTop: 1 }}
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Your information is never shared or sold. We use it only to prepare for our conversation with you.
        </div>
        {errorMsg && (
          <div
            style={{
              fontSize: 13,
              color: 'rgba(255,80,80,.95)',
              background: 'rgba(255,80,80,.08)',
              border: '1px solid rgba(255,80,80,.2)',
              borderRadius: 8,
              padding: '10px 14px',
              marginBottom: 8,
            }}
          >
            {errorMsg}
          </div>
        )}
        <button
          type="submit"
          className="bp"
          disabled={isPending}
          style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
        >
          {isPending ? 'Sending…' : 'Send Message'}{' '}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
}
