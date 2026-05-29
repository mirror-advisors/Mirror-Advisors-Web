import { AdminStub } from '../_components/AdminStub';
import { CASES } from '@/lib/cases';

export default function AdminCasesPage() {
  return (
    <AdminStub
      title="Case Studies"
      description="Add, edit, reorder, and hide case studies."
      legacyRef="legacy/app.js → adminRenderCasesDash, adminEditCase, adminSaveCase, adminDeleteCase"
    >
      <div style={{ display: 'grid', gap: 12 }}>
        {CASES.map((c) => (
          <div
            key={c.slug}
            style={{
              padding: 16,
              borderRadius: 10,
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(255,255,255,.08)',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: 700,
                  color: c.tt,
                  marginBottom: 4,
                  letterSpacing: '.07em',
                }}
              >
                {c.cat.toUpperCase()}
              </div>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: 'var(--dim)' }}>{c.desc}</div>
            </div>
            <button
              disabled
              style={{
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 7,
                padding: '6px 12px',
                fontSize: 12,
                color: 'var(--dim)',
                cursor: 'not-allowed',
              }}
            >
              Edit (TODO)
            </button>
          </div>
        ))}
      </div>
    </AdminStub>
  );
}
