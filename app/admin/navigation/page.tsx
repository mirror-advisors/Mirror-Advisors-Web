import { AdminStub } from '../_components/AdminStub';
import { NAV_PAGES } from '@/lib/nav';

export default function AdminNavigationPage() {
  return (
    <AdminStub
      title="Navigation"
      description="Reorder, enable, or disable items in the primary nav."
      legacyRef="legacy/app.js → adminRenderNavDash, _NAV_PAGES, navTogglePage, navMoveRow"
    >
      <div style={{ display: 'grid', gap: 8 }}>
        {NAV_PAGES.map((p, i) => (
          <div
            key={p.key}
            style={{
              padding: 12,
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 8,
              display: 'grid',
              gridTemplateColumns: '40px 1fr auto',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{ color: 'var(--dim)', fontSize: 13 }}>{i + 1}.</div>
            <div>
              <div style={{ fontWeight: 600 }}>{p.label}</div>
              <div style={{ fontSize: 12, color: 'var(--dim)' }}>{p.href}</div>
            </div>
            <div
              style={{
                fontSize: 11,
                color: p.enabled ? '#4CAF50' : 'var(--dim)',
                fontWeight: 700,
              }}
            >
              {p.enabled ? 'ENABLED' : 'HIDDEN'}
            </div>
          </div>
        ))}
      </div>
    </AdminStub>
  );
}
