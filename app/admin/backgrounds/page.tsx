import { AdminStub } from '../_components/AdminStub';

export default function AdminBackgroundsPage() {
  return (
    <AdminStub
      title="Page Backgrounds"
      description="Per-page background images and opacity controls."
      legacyRef="legacy/app.js → adminRenderBgDash, bgOpenEditor, _PAGE_BACKGROUNDS"
    >
      <p style={{ color: 'var(--text-mid)', lineHeight: 1.6 }}>
        The legacy implementation stored base64 image data per-page in <code>window._PAGE_BACKGROUNDS</code>.
        A proper rebuild should upload images to <code>/public/backgrounds/</code> and persist the mapping
        in a database table, then read it inside the root layout.
      </p>
    </AdminStub>
  );
}
