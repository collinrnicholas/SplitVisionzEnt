'use client'

export default function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.5rem 3rem',
      background: 'linear-gradient(to bottom, rgba(10,9,8,0.95) 0%, transparent 100%)',
    }}>
      <a href="#hero" style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: '2rem',
        letterSpacing: '0.18em',
        color: 'var(--bone)',
        textDecoration: 'none',
      }}>VEIL</a>

      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
        {[
          { label: 'Studio', href: '#manifesto' },
          { label: 'Work', href: '#portfolio' },
          { label: 'Process', href: '#process' },
          { label: 'Book', href: '#booking' },
        ].map(({ label, href }) => (
          <li key={href}>
            <a href={href} style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              color: 'var(--ash)',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--bone)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ash)')}
            >{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
