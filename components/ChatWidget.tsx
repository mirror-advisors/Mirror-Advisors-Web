'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CHAT_TREE, type ChatChoice } from '@/lib/chat-tree';

type Msg = { role: 'bot' | 'user'; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [choices, setChoices] = useState<ChatChoice[]>([]);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  // Initialise opening message + topic choices once
  useEffect(() => {
    setMessages([{ role: 'bot', text: CHAT_TREE.opening }]);
    setChoices(CHAT_TREE.topics.map((t) => ({ label: t.label, nodeId: t.id })));
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, open]);

  function handleChoice(c: ChatChoice) {
    // Find as topic first
    const topic = CHAT_TREE.topics.find((t) => t.id === c.nodeId);
    if (topic) {
      setMessages((m) => [...m, { role: 'user', text: c.label }, { role: 'bot', text: topic.answer }]);
      setChoices(topic.choices.length ? topic.choices : []);
      return;
    }
    const node = CHAT_TREE.nodes[c.nodeId];
    if (node) {
      setMessages((m) => [...m, { role: 'user', text: c.label }, { role: 'bot', text: node.answer }]);
      // After a leaf node, re-offer topics so the user can pivot
      if (node.choices.length) {
        setChoices(node.choices);
      } else {
        setChoices([
          { label: '← Back to topics', nodeId: '__topics' },
          { label: 'Book a Call', nodeId: '__contact' },
        ]);
      }
      return;
    }
    if (c.nodeId === '__topics') {
      setMessages((m) => [...m, { role: 'user', text: c.label }, { role: 'bot', text: CHAT_TREE.opening }]);
      setChoices(CHAT_TREE.topics.map((t) => ({ label: t.label, nodeId: t.id })));
      return;
    }
    // fallback
    setMessages((m) => [...m, { role: 'user', text: c.label }, { role: 'bot', text: CHAT_TREE.fallback }]);
  }

  return (
    <>
      <button
        id="chatBtn"
        aria-label="Chat with us"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="chat-pulse"></div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D1232" strokeWidth="2.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="12" y1="9" x2="12" y2="9.01" strokeWidth="3" />
          <line x1="8" y1="9" x2="8" y2="9.01" strokeWidth="3" />
          <line x1="16" y1="9" x2="16" y2="9.01" strokeWidth="3" />
        </svg>
      </button>

      {open && (
        <div id="chatPanel" style={{ display: 'flex' }}>
          <div className="chat-header">
            <div className="chat-header-dot"></div>
            <div>
              <div className="chat-header-title">Mirror Advisors</div>
              <div className="chat-header-sub">Usually replies instantly</div>
            </div>
            <button className="chat-header-close" onClick={() => setOpen(false)}>
              &#10005;
            </button>
          </div>

          <div className="chat-messages" id="chatMessages" ref={messagesRef}>
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'bot' ? 'chat-msg-bot' : 'chat-msg-user'}>
                {m.text}
              </div>
            ))}

            {choices.length > 0 && (
              <div className="chat-choices">
                {choices.map((c, i) => (
                  <button key={i} className="chat-choice" onClick={() => handleChoice(c)}>
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="chat-footer">
            Powered by Mirror Advisors &bull;{' '}
            <Link href="/contact" onClick={() => setOpen(false)} style={{ color: 'var(--t)' }}>
              Book a call
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
