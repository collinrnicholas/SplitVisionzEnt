import fs from 'node:fs';
import path from 'node:path';

/**
 * Lightweight visitor-memory store.
 *
 * Keyed by a visitor fingerprint: the client sends `visitor_id` (a UUID stored
 * in the browser's localStorage) plus a `fingerprint` string the server derives
 * from IP + user-agent. This lets us recognize a returning visitor without any
 * login and seed Elliot's context with what we already know.
 *
 * Stored in a local JSON file (server-side only, never exposed to the browser).
 */

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'visitors.json');

interface VisitorRecord {
  id: string;
  visits: number;
  lastSeen: number;
  firstSeen: number;
  /** Structured lead bits captured so far. */
  lead: {
    name?: string;
    contact?: string;
    kind?: string;
    style?: string;
    placement?: string;
    timing?: string;
  };
  /** Short plain-language summary the bot can use to welcome them back. */
  summary: string;
  timestamps: number[];
}

function readStore(): Record<string, VisitorRecord> {
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, VisitorRecord>) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = STORE_PATH + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(store, null, 2));
  fs.renameSync(tmp, STORE_PATH);
}

/** Build a stable-ish server-side fingerprint from request + client id. */
export function deriveId(req: Request, clientId: string): string {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  const ua = req.headers.get('user-agent') || '';
  // Combine IP + UA + client browser UUID -> stable key for this visitor.
  const raw = `${ip}|${ua.slice(0, 80)}|${clientId}`;
  // Simple deterministic hash (FNV-1a) — not crypto, fine for a shop bot.
  let h = 0x811c9dc5;
  for (let i = 0; i < raw.length; i++) {
    h ^= raw.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return 'v_' + (h >>> 0).toString(16).padStart(8, '0');
}

/** Look up a visitor, creating a fresh record on first sight. */
export function getOrCreateVisitor(key: string): VisitorRecord {
  const store = readStore();
  const now = Date.now();
  const existing = store[key];
  if (existing) {
    existing.visits += 1;
    existing.lastSeen = now;
    existing.timestamps.push(now);
    if (existing.timestamps.length > 20) existing.timestamps = existing.timestamps.slice(-20);
    store[key] = existing;
    writeStore(store);
    return existing;
  }
  const fresh: VisitorRecord = {
    id: key,
    visits: 1,
    firstSeen: now,
    lastSeen: now,
    lead: {},
    summary: '',
    timestamps: [now],
  };
  store[key] = fresh;
  writeStore(store);
  return fresh;
}

/** Update a visitor's known lead info + human summary for comeback greetings. */
export function updateVisitor(key: string, lead: VisitorRecord['lead']) {
  const store = readStore();
  const rec = store[key];
  if (!rec) return;
  if (lead.name) rec.lead.name = lead.name;
  if (lead.contact) rec.lead.contact = lead.contact;
  if (lead.kind) rec.lead.kind = lead.kind;
  if (lead.style) rec.lead.style = lead.style;
  if (lead.placement) rec.lead.placement = lead.placement;
  if (lead.timing) rec.lead.timing = lead.timing;
  // Rebuild a short plain-language summary.
  const bits: string[] = [];
  if (rec.lead.placement) bits.push(`wanted a ${rec.lead.placement} piece`);
  if (rec.lead.kind) bits.push(`(${rec.lead.kind})`);
  if (rec.lead.style) bits.push(rec.lead.style + ' style');
  rec.summary = bits.join(' ');
  store[key] = rec;
  writeStore(store);
}
