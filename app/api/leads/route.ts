import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const TO_EMAIL = process.env.LEAD_TO_EMAIL || 'dcstylez149@yahoo.com'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Split Vizions <onboarding@resend.dev>'

interface LeadBody {
  name?: string
  contact: string
  kind: string
  style: string
  placement: string
  timing: string
}

/** Lazily import Supabase only if configured. */
async function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
  if (!url || !key) return null
  const { createClient } = await import('@supabase/supabase-js')
  return createClient(url, key)
}

export async function POST(req: NextRequest) {
  let body: LeadBody
  try {
    body = (await req.json()) as LeadBody
  } catch {
    return NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 })
  }

  // basic honeypot / spam protection: require a contact
  const contact = (body.contact || '').trim()
  const name = (body.name || '').trim() || 'Not specified'
  const kind = (body.kind || '').trim() || 'Not specified'
  const style = (body.style || '').trim() || 'Not specified'
  const placement = (body.placement || '').trim() || 'Not specified'
  const timing = (body.timing || '').trim() || 'Not specified'

  if (!contact) {
    return NextResponse.json({ ok: false, error: 'missing contact' }, { status: 400 })
  }

  const leadRow = { name, contact, kind, style, placement, timing, created_at: new Date().toISOString(), source: 'split-visionz-chat' }

  // --- Persistent store: Supabase (best-effort; never block the email) ---
  let stored = false
  try {
    const sb = await getSupabase()
    if (sb) {
      const { error } = await sb.from('leads').insert(leadRow)
      if (!error) stored = true
      else console.error('[leads] Supabase insert failed:', error.message)
    }
  } catch (err) {
    console.error('[leads] Supabase error (degraded to email-only):', err)
  }

  // --- Email: keep the existing path ---
  if (!process.env.RESEND_API_KEY) {
    console.warn('[leads] RESEND_API_KEY not set — lead not emailed. Lead:', leadRow, 'stored:', stored)
    return NextResponse.json({ ok: true, degraded: true, stored })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const html = `
  <div style="font-family: -apple-system, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e4; border-radius: 12px; color:#1a1a1a;">
    <h2 style="margin:0 0 16px; font-size:22px;">🎨 New Split Vizions lead</h2>
    <table cellpadding="8" style="border-collapse: collapse; width:100%; font-size:15px;">
      <tr><td style="font-weight:600; color:#666; width:130px;">Name</td><td style="font-weight:600;">${escapeHtml(name)}</td></tr>
      <tr><td style="font-weight:600; color:#666;">Contact</td><td style="font-weight:600;">${escapeHtml(contact)}</td></tr>
      <tr><td style="font-weight:600; color:#666;">Work type</td><td>${escapeHtml(kind)}</td></tr>
      <tr><td style="font-weight:600; color:#666;">Style</td><td>${escapeHtml(style)}</td></tr>
      <tr><td style="font-weight:600; color:#666;">Placement</td><td>${escapeHtml(placement)}</td></tr>
      <tr><td style="font-weight:600; color:#666;">Timing</td><td>${escapeHtml(timing)}</td></tr>
    </table>
    <p style="margin-top:20px; font-size:13px; color:#888;">Sent automatically from the Split Vizions website.</p>
  </div>
  `

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `🎨 New lead${name && name !== 'Not specified' ? ` from ${name}` : ''}: ${contact} — ${kind}`,
      html,
    })
    return NextResponse.json({ ok: true, stored })
  } catch (err) {
    console.error('[leads] Resend send failed:', err)
    return NextResponse.json({ ok: false, error: 'send failed' }, { status: 500 })
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
