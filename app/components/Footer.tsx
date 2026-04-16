'use client'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: '1.5rem',
        letterSpacing: '0.18em',
        color: 'var(--mid)',
      }}>SPLIT VISIONZ</div>

      <div className="footer-links">
        {[
          { label: 'Instagram', href: 'https://www.instagram.com/sv_ink', external: true },
          { label: 'Process', href: '#process', external: false },
          { label: 'Contact', href: '#booking', external: false },
        ].map(({ label, href, external }) => (
          <a key={label} href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            style={{
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
        fontSize: '0.5rem',
        letterSpacing: '0.15em',
        color: 'var(--mid)',
      }}>&copy; 2026 Split Visionz &middot; All rights reserved</div>

      <style>{`
        .site-footer {
          padding: 3rem var(--pad);
          border-top: 0.5px solid var(--dim);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          text-align: center;
        }
        .footer-links {
          display: flex;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .site-footer {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            padding: 4rem var(--pad);
          }
          .footer-links { gap: 2rem; }
        }
      `}</style>
    </footer>
  )
}
