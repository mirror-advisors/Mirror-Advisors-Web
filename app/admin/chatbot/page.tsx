import { AdminStub } from '../_components/AdminStub';
import { CHAT_TREE } from '@/lib/chat-tree';

export default function AdminChatbotPage() {
  return (
    <AdminStub
      title="Chatbot Tree"
      description="Edit topics, choices, and routing for the on-site chatbot."
      legacyRef="legacy/app.js → adminRenderChatbotDash, ctRenderEditor, ctAddTopic, ctAddChoice"
    >
      <div style={{ display: 'grid', gap: 10 }}>
        {CHAT_TREE.topics.map((t) => (
          <div
            key={t.id}
            style={{
              padding: 14,
              borderRadius: 10,
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(255,255,255,.08)',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{t.label}</div>
            <div style={{ fontSize: 12, color: 'var(--dim)', marginBottom: 8 }}>{t.answer}</div>
            <div style={{ fontSize: 11, color: 'var(--dim)' }}>{t.choices.length} choices</div>
          </div>
        ))}
      </div>
    </AdminStub>
  );
}
