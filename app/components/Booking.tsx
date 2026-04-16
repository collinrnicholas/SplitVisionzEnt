'use client'

import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '0.5px solid var(--mid)',
  padding: '0.75rem 0',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '1rem',
  fontStyle: 'italic',
  color: 'var(--bone)',
  outline: 'none',
  borderRadius: 0,
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Space Mono', monospace",
  fontSize: '0.55rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--mid)',
  marginBottom: '0.6rem',
}

export default function Booking() {
  const [ref1, visible1] = useReveal()
  const [ref2, visible2] = useReveal()
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  })

  const focusedInputStyle = (name: string): React.CSSProperties => ({
    ...inputStyle,
    borderBottomColor: focused === name ? 'var(--gold)' : 'var(--mid)',
    transition: 'border-color 0.3s',
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="booking" className="booking-section">
      <div ref={ref1} style={revealStyle(visible1)}>
        <h2 style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(2.5rem, 7vw, 6rem)',
          lineHeight: 0.88,
          letterSpacing: '0.04em',
          color: 'var(--bone)',
          marginBottom: '2rem',
        }}>
          BEGIN<br/>YOUR<br/>INQUIRY
        </h2>
        <p style={{
          fontSize: '1rem',
          fontStyle: 'italic',
          color: 'var(--ash)',
          lineHeight: 1.75,
          marginBottom: '2.5rem',
        }}>
          We are currently accepting inquiries for the <em>spring cohort</em>. Commissions are limited. If the work resonates, write to us below.
        </p>
        <div style={{ width: '40px', height: '0.5px', background: 'var(--gold)', marginBottom: '2rem' }} />
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.55rem',
          letterSpacing: '0.15em',
          color: 'var(--mid)',
          textTransform: 'uppercase',
          lineHeight: 2,
        }}>
          studio@splitvisionz.com<br/><br/>
          By appointment only<br/>
          Location disclosed upon acceptance
        </p>
      </div>

      <div ref={ref2} style={revealStyle(visible2, 0.2)}>
        {submitted ? (
          <div style={{ paddingTop: '2rem' }}>
            <div style={{ width: '40px', height: '0.5px', background: 'var(--gold)', marginBottom: '2rem' }} />
            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--ash)', lineHeight: 1.8 }}>
              Your inquiry has been received.<br/>
              We will be in touch if your vision aligns with our current work.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Your name</label>
              <input
                name="name" type="text" required placeholder="Full name"
                style={focusedInputStyle('name')}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Email</label>
              <input
                name="email" type="email" required placeholder="your@email.com"
                style={focusedInputStyle('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Piece type</label>
              <select
                name="style" required
                style={{ ...focusedInputStyle('style'), WebkitAppearance: 'none' }}
                onFocus={() => setFocused('style')}
                onBlur={() => setFocused(null)}
              >
                <option value="" disabled>Select a style</option>
                <option value="botanical">Botanical / Illustrative</option>
                <option value="geometric">Geometric / Sacred</option>
                <option value="natural">Natural History</option>
                <option value="architectural">Architectural</option>
                <option value="portrait">Portrait / Figure</option>
                <option value="custom">Custom — tell me</option>
              </select>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Your vision</label>
              <textarea
                name="vision" required rows={4}
                placeholder="Tell us about the piece you carry in your mind..."
                style={{
                  ...focusedInputStyle('vision'),
                  resize: 'none',
                  height: '100px',
                }}
                onFocus={() => setFocused('vision')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <SubmitButton />
          </form>
        )}
      </div>

      <style>{`
        .booking-section {
          padding: 4rem var(--pad);
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
        }
        @media (min-width: 768px) {
          .booking-section {
            padding: 10rem var(--pad);
            grid-template-columns: 1fr 1fr;
            gap: 8rem;
          }
        }
      `}</style>
    </section>
  )
}

function SubmitButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="submit"
      className="booking-submit"
      style={{
        marginTop: '2rem',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
        background: hovered ? 'rgba(201,168,76,0.08)' : 'none',
        border: `0.5px solid ${hovered ? 'var(--gold)' : 'rgba(240,235,227,0.25)'}`,
        padding: '1rem 2.5rem',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.65rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--bone)',
        cursor: 'crosshair',
        transition: 'background 0.3s, border-color 0.3s',
        width: '100%',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Submit inquiry <span style={{ color: 'var(--gold)' }}>→</span>
    </button>
  )
}
