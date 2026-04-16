'use client'

import { useState } from 'react'

const links = [
  { label: 'Studio', href: '#manifesto' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Book', href: '#booking' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="site-nav" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'linear-gradient(to bottom, rgba(10,9,8,0.95) 0%, transparent 100%)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.5rem var(--pad)',
      }}>
        <a href="#hero" style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: '2rem',
          letterSpacing: '0.18em',
          color: 'var(--bone)',
          textDecoration: 'none',
        }}>SPLIT VISIONZ</a>

        {/* Desktop links */}
        <ul className="nav-desktop" style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
          {links.map(({ label, href }) => (
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

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{
            display: 'none',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '0.5rem',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {open ? (
              <path d="M6 6L18 18M6 18L18 6" stroke="var(--gold)" strokeWidth="1.5"/>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" stroke="var(--gold)" strokeWidth="1.5"/>
                <line x1="4" y1="12" x2="20" y2="12" stroke="var(--gold)" strokeWidth="1.5"/>
                <line x1="4" y1="17" x2="20" y2="17" stroke="var(--gold)" strokeWidth="1.5"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className="nav-mobile-menu" style={{
        maxHeight: open ? '300px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
        <ul style={{
          listStyle: 'none', padding: '0 var(--pad) 1.5rem',
          display: 'flex', flexDirection: 'column', gap: '1.5rem',
        }}>
          {links.map(({ label, href }) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                color: 'var(--ash)',
                textDecoration: 'none',
              }}>{label}</a>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @media (min-width: 768px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
