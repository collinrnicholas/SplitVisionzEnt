'use client'

import { useReveal } from '../hooks/useReveal'

export default function Manifesto() {
  const [ref1, visible1] = useReveal()
  const [ref2, visible2] = useReveal()

  const revealStyle = (visible: boolean): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
  })

  return (
    <section id="manifesto" className="manifesto-section">
      <div ref={ref1} style={revealStyle(visible1)}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          marginBottom: '2rem',
        }}>The Philosophy</div>

        <h2 style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
          lineHeight: 0.9,
          letterSpacing: '0.04em',
          color: 'var(--bone)',
        }}>
          ONE<br/>ARTIST.<br/>ONE<br/>CLIENT.
        </h2>

        <div style={{ width: '40px', height: '0.5px', background: 'var(--gold)', margin: '2rem 0' }} />

        <div className="manifesto-stats">
          {[
            { num: '100+', label: 'Clients per year' },
            { num: '18+', label: 'Years mastery' },
            { num: '∞', label: 'Hours per piece' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: 'var(--bone)',
                lineHeight: 1,
              }}>{num}</div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.5rem',
                letterSpacing: '0.2em',
                color: 'var(--ash)',
                textTransform: 'uppercase',
                marginTop: '0.4rem',
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div ref={ref2} style={revealStyle(visible2)}>
        <p style={{ fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.85, color: 'var(--ash)' }}>
          This is not a tattoo shop. There is no walk-in counter, no flash on the wall, no appointment slot that lasts an hour.
        </p>
        <br/>
        <p style={{ fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.85, color: 'var(--ash)' }}>
          <strong style={{ color: 'var(--bone)', fontStyle: 'normal', fontWeight: 400 }}>Split Visionz</strong> is a private atelier — a single room, a single artist, and a practice that treats the body as the only canvas that matters. Every piece begins with conversation, moves through weeks of design, and ends with something that could only ever be yours.
        </p>
        <br/>
        <p style={{ fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.85, color: 'var(--ash)' }}>
          We accept <strong style={{ color: 'var(--bone)', fontStyle: 'normal', fontWeight: 400 }}>twelve commissions per year</strong>. If you are reading this, a space may be open.
        </p>

        <div style={{ width: '40px', height: '0.5px', background: 'var(--gold)', margin: '2rem 0' }} />

        <a href="#process" style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--ash)',
          textDecoration: 'none',
          borderBottom: '0.5px solid var(--mid)',
          paddingBottom: '0.25rem',
          transition: 'color 0.3s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--bone)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--ash)')}
        >How it works →</a>
      </div>

      <style>{`
        .manifesto-section {
          padding: 4rem var(--pad);
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .manifesto-stats {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        @media (min-width: 768px) {
          .manifesto-section {
            padding: 10rem var(--pad);
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
          }
          .manifesto-stats {
            gap: 3rem;
          }
        }
      `}</style>
    </section>
  )
}
