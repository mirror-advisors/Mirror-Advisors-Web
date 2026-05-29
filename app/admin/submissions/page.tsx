import { AdminStub } from '../_components/AdminStub';

export default function AdminSubmissionsPage() {
  return (
    <AdminStub
      title="Contact Submissions"
      description="Review, filter, and export incoming contact form submissions."
      legacyRef="legacy/app.js → adminRenderSubDash, subRenderList, _SUBMISSIONS, subDownloadPDF"
    >
      <div
        style={{
          padding: 24,
          background: 'rgba(255,255,255,.03)',
          border: '1px solid rgba(255,255,255,.08)',
          borderRadius: 10,
        }}
      >
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.6, margin: '0 0 12px' }}>
          The contact form server action in <code>app/contact/actions.ts</code> currently logs to the server
          console. To populate this dashboard, point that action at a real persistence layer (database row,
          email service, or Zoho CRM API call) and add a read query here.
        </p>
        <p style={{ color: 'var(--dim)', fontSize: 13, margin: 0 }}>No submissions to display.</p>
      </div>
    </AdminStub>
  );
}
