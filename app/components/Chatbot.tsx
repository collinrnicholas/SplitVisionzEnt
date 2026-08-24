'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';

type Msg = { role: 'user' | 'bot'; text: string };

const INITIAL: Msg[] = [
  {
    role: 'bot',
    text: "Yo, Elliot here from Split Vizions. What're we dreaming up today?",
  },
];

/** Get-or-create a stable anonymous visitor id, persisted in localStorage. */
function getVisitorId(): string {
  if (typeof window === 'undefined') return 'anon';
  const KEY = 'sv_visitor_id';
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      // crypto.randomUUID is fine on modern browsers.
      id =
        (window.crypto && 'randomUUID' in crypto ? crypto.randomUUID() : 'anon-' + Math.random().toString(36).slice(2) + Date.now().toString(36));
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return 'anon';
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teaser, setTeaser] = useState(false);
  const [visitorId] = useState<string>(getVisitorId);

  const msgsRef = useRef<Msg[]>(INITIAL);
  const endRef = useRef<HTMLDivElement>(null);
  const firstName = useRef<string | null>(null);

  // Auto-open teaser bubble a few seconds after load (once per session), so the
  // bot "opens up and starts the convo" without hijacking the whole page.
  useEffect(() => {
    const t1 = window.setTimeout(() => {
      if (!open) setTeaser(true);
    }, 4000);
    // If they ignore the first tease, give it one more nudge later.
    const t2 = window.setTimeout(() => {
      if (!open) setTeaser(true);
    }, 45000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, thinking]);

  function openChat() {
    setTeaser(false);
    setOpen(true);
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || thinking || done) return;

    setInput('');
    setError(null);
    const updated: Msg[] = [...msgsRef.current, { role: 'user', text }];
    setMessages(updated);
    msgsRef.current = updated;
    setThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitor_id: visitorId,
          name: firstName.current,
          messages: msgsRef.current.map((m) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setThinking(false);
        setMessages([
          ...msgsRef.current,
          { role: 'bot', text: j?.error || 'Shoot, somethin buckled on my end. Try that again in a sec?' },
        ]);
        msgsRef.current = [
          ...msgsRef.current,
          { role: 'bot', text: j?.error || 'Shoot, somethin buckled on my end. Try that again in a sec?' },
        ];
        return;
      }

      const data = await res.json();
      const reply: string = data.reply || '...';
      const lead = data.lead || {};

      const withReply: Msg[] = [...msgsRef.current, { role: 'bot', text: reply }];
      setMessages(withReply);
      msgsRef.current = withReply;
      setThinking(false);

      // Remember the name for the rest of this session + submit back to server.
      if (lead.name) firstName.current = lead.name;

      // If the lead looks rich (contact captured), fire the email server-side.
      const contact = String(lead.contact || '').trim();
      if (contact && !done) {
        setDone(true);
        const payload = {
          name: lead.name || firstName.current || '',
          contact,
          kind: lead.kind || '',
          style: lead.style || '',
          placement: lead.placement || '',
          timing: lead.timing || '',
        };
        try {
          await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        } catch {
          // email is best-effort; don't surface an error to a happy visitor
        }
      }
    } catch {
      setThinking(false);
      setMessages([
        ...msgsRef.current,
        { role: 'bot', text: 'Shoot, my side just hiccuped. Wanna give that one more shot?' },
      ]);
      msgsRef.current = [
        ...msgsRef.current,
        { role: 'bot', text: 'Shoot, my side just hiccuped. Wanna give that one more shot?' },
      ];
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
        style={{ background: 'var(--gold)', color: 'var(--ink)' }}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />}
        </svg>
      </button>

      {/* Teaser bubble — the bot opening the conversation */}
      {teaser && !open && (
        <div
          className="fixed bottom-24 right-5 z-50 max-w-[260px] animate-pulse rounded-2xl rounded-br-sm px-4 py-3 text-sm shadow-xl"
          style={{ background: 'var(--dim)', border: '1px solid var(--gold)', color: 'var(--bone)' }}
        >
          <p className="mb-1 font-semibold" style={{ color: 'var(--gold)' }}>
            Yo, Elliot here
          </p>
          <p className="mb-3">
            Just got back to the shop. What&apos;re we dreaming up today — fresh piece, cover-up, maybe a touch-up?
          </p>
          <div className="flex gap-2">
            <button
              onClick={openChat}
              className="rounded-full px-3 py-1 text-xs font-semibold transition-transform hover:scale-105"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}
            >
              Let&apos;s talk
            </button>
            <button
              onClick={() => setTeaser(false)}
              className="rounded-full px-3 py-1 text-xs"
              style={{ background: 'transparent', color: 'var(--ash)', border: '1px solid var(--mid)' }}
            >
              Not now
            </button>
          </div>
        </div>
      )}

      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 flex max-h-[70vh] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border shadow-2xl"
          style={{ background: 'var(--dim)', borderColor: 'var(--mid)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 text-[--bone]" style={{ background: 'var(--ink)' }}>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--gold)' }} />
              <span className="font-semibold tracking-tight" style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '1.05rem', letterSpacing: '0.06em' }}>
                CHAT WITH ELLIOT
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: 'var(--ash)' }}>
              Split Vizions
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" style={{ background: 'var(--ink)' }}>
            {messages.map((m, i) =>
              m.role === 'bot' ? (
                <div key={i} className="flex justify-start">
                  <div
                    className="max-w-[85%] rounded-2xl rounded-tl-sm px-3 py-2 text-sm"
                    style={{ background: 'var(--dim)', border: '1px solid var(--mid)', color: 'var(--bone)' }}
                  >
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-end">
                  <div
                    className="max-w-[85%] rounded-2xl rounded-tr-sm px-3 py-2 text-sm"
                    style={{ background: 'var(--gold)', color: 'var(--ink)' }}
                  >
                    {m.text}
                  </div>
                </div>
              )
            )}
            {thinking && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl rounded-tl-sm px-3 py-2 text-sm"
                  style={{ background: 'var(--dim)', border: '1px solid var(--mid)', color: 'var(--ash)' }}
                >
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {error && (
            <div className="px-4 pb-1" style={{ color: '#e58' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{error}</span>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSend} className="flex items-center gap-2 border-t px-3 py-3" style={{ borderColor: 'var(--mid)', background: 'var(--dim)' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={done ? 'Thanks, talk soon.' : 'Type a message...'}
              disabled={done}
              className="min-w-0 flex-1 rounded-full bg-transparent px-3 py-2 text-sm outline-none"
              style={{ background: 'var(--ink)', color: 'var(--bone)', border: '1px solid var(--mid)' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e as unknown as FormEvent);
                }
              }}
            />
            <button
              type="submit"
              disabled={done || thinking || !input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-transform disabled:opacity-40"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
