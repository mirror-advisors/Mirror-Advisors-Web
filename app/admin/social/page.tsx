import { AdminStub } from '../_components/AdminStub';
import { SOCIAL_LINKS } from '@/lib/social';

export default function AdminSocialPage() {
  return (
    <AdminStub
      title="Social Links"
      description="Manage the social media links shown in the footer."
      legacyRef="legacy/app.js → adminRenderSocialDash, socSaveLinks"
    >
      <div style={{ display: 'grid', gap: 8 }}>
        {SOCIAL_LINKS.map((s) => (
          <div
            key={s.key}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 60px',
              gap: 12,
              alignItems: 'center',
              padding: 12,
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 8,
            }}
          >
            <div style={{ fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: 'var(--dim)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {s.url}
            </div>
            <div
              style={{
                fontSize: 11,
                color: s.enabled ? '#4CAF50' : 'var(--dim)',
                fontWeight: 700,
              }}
            >
              {s.enabled ? 'ON' : 'OFF'}
            </div>
          </div>
        ))}
      </div>
    </AdminStub>
  );
}
