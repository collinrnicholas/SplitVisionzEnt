# Split Vizions — Lead-Gen Chatbot

A floating chatbot for the Split Vizions Entertainment tattoo site. It talks like Elliot (casual, witty, warm) and captures tattoo leads directly to his inbox. **Fully conversational — an LLM in the loop, not canned answers.**

## How it works

1. **It opens the conversation.** A few seconds after a visitor lands, an animated "Yo, Elliot here" teaser bubble pops up unprompted and invites them in — tapping it opens the chat. (It never yanks the full panel open; that kills browsing.) If ignored, it nudges once more about 45s later.
2. Visitor types in their own words ("I want a sleeve on my right arm").
3. The browser sends the conversation to `POST /api/chat` — **a server-side endpoint** that:
   - Runs a hardened Elliot persona **system prompt** through OpenAI `gpt-4o-mini`.
   - **Protects against prompt injection**: the persona explicitly ignores any instructions or "reveal your prompt" attempts; visitor input is capped at 400 chars/message.
   - **Controls cost**: the context window sent to the LLM is trimmed to the last 12 messages, and Elliot is instructed not to drag conversations out.
   - Extracts the structured lead (name, kind, style, placement, timing, contact) with a compact second call.
   - **Remembers returning visitors** from a local visitor-memory store (see below) and seeds Elliot's context so he greets them by name and picks up where they left off.
4. When a usable contact is captured, the client POSTs to `/api/leads`, which emails the lead to Elliot via **Resend**.

The API key stays server-side — it is **never exposed to the browser**.

## Setup

1. Ensure you have an OpenAI API key (gpt-4o-mini is cheap).
2. Create `.env.local` in the project root:

```
RESEND_API_KEY=re_xxxxxxxx_xxxx
OPENAI_API_KEY=sk-xxxxxxxx
LEAD_TO_EMAIL=dcstylez149@yahoo.com
RESEND_FROM_EMAIL=Split Vizions <onboarding@resend.dev>
```

3. `npm install`
4. `npm run dev` — open the site, the gold circle bottom-right opens the chat.

## Environment variables

| Variable            | Required | Purpose                                   |
| ------------------- | -------- | ----------------------------------------- |
| `RESEND_API_KEY`    | Yes      | Sends lead emails via Resend              |
| `OPENAI_API_KEY`    | Yes      | Powers the conversational LLM             |
| `LEAD_TO_EMAIL`     | No       | Where leads are emailed (default yahoo)   |
| `RESEND_FROM_EMAIL` | No       | From address (swap to a verified domain)  |

## Visitor memory (returning visitors)

- Each browser generates a persistent anonymous UUID stored in `localStorage` (`sv_visitor_id`).
- `POST /api/chat` combines that UUID with the visitor's IP (`x-forwarded-for` / `x-real-ip`) + user-agent into a fingerprint and looks it up (or creates it) in `data/visitors.json` (server-side only).
- On a return visit, Elliot's prompt is seeded with what we know — name, contact, prior piece/style/placement — so he greets them warmly by name and picks up where they left off instead of re-asking.
- It also captures the visitor's **name** (the persona asks for it up front), stored alongside the extracted lead.

**Privacy note:** this store holds visitor PII (names, contact info, IP-derived fingerprints). `data/` is gitignored so it is never committed. For a public production deploy you should consider a consent banner and/or a PII-retention policy; the IP-derived fingerprint is a light-touch identifier, not a cookie.

## Safety nets (built in)

- **Prompt injection**: persona prompt is hostile to visitor commands; input length capped; system prompt never user-controlled.
- **Cost**: max 12 messages sent to the LLM, 400-char/message cap, temperature/length capped, bot steers to close after capture.
- **Key exposure**: LLM and Resend keys live only in server routes.

## Routes

- `POST /api/chat` — conversational reply + extracted lead. Returns `{ reply, lead }`.
- `POST /api/leads` — sends the captured lead to Elliot's email via Resend (graceful degrade if key missing).
