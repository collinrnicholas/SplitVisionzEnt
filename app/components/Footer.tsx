'use client'

export default function Footer() {
  return (
    <footer style={{
      padding: '4rem 3rem',
      borderTop: '0.5px solid var(--dim)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: '1.5rem',
        letterSpacing: '0.18em',
        color: 'var(--mid)',
      }}>SPLIT VISIONZ</div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {['Instagram', 'Process', 'Contact'].map(label => (
          <a key={label} href="#" style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--mid)',
            textDecoration: 'none',
            transition: 'color 0.3s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--ash)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--mid)')}
          >{label}</a>
        ))}
      </div>

      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.55rem',
        letterSpacing: '0.15em',
        color: 'var(--mid)',
      }}>© 2025 Split Visionz Studio · All rights reserved</div>
    </footer>
  )
}
