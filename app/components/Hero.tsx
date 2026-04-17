'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.hero-animate')
    els?.forEach((el, i) => {
      const elem = el as HTMLElement
      elem.style.opacity = '0'
      elem.style.transform = 'translateY(20px)'
      elem.style.transition = `opacity 1s ease ${i * 0.15}s, transform 1s ease ${i * 0.15}s`
      requestAnimationFrame(() => {
        elem.style.opacity = '1'
        elem.style.transform = 'translateY(0)'
      })
    })
  }, [])

  return (
    <section id="hero" ref={heroRef} style={{
      height: '100vh',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      textAlign: 'center',
      padding: '0 var(--pad)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Atmospheric background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 60% 70% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 50% 70%, rgba(201,168,76,0.04) 0%, transparent 50%)
        `,
      }} />

      {/* Decorative SVG lines */}
      <svg className="hero-lines" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="200" x2="1400" y2="200" stroke="rgba(58,54,50,0.3)" strokeWidth="0.5"/>
        <line x1="0" y1="400" x2="1400" y2="400" stroke="rgba(58,54,50,0.15)" strokeWidth="0.5"/>
        <line x1="0" y1="700" x2="1400" y2="700" stroke="rgba(58,54,50,0.2)" strokeWidth="0.5"/>
        <line x1="700" y1="0" x2="700" y2="900" stroke="rgba(58,54,50,0.08)" strokeWidth="0.5"/>
      </svg>

      {/* SV logo */}
      <div className="hero-animate hero-logo" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '2rem',
      }}>
        {!logoError ? (
          <Image
            src="/images/sv-logo2.jpeg"
            alt="Split Visionz"
            width={280}
            height={0}
            onError={() => setLogoError(true)}
            style={{ width: '100%', maxWidth: '280px', height: 'auto', opacity: 0.9 }}
          />
        ) : (
          <span aria-label="SV monogram" className="hero-fallback-logo" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 55%, var(--gold-dim) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(201,168,76,0.2)',
          }}>SV</span>
        )}
      </div>

      {/* Eyebrow */}
      <div className="hero-animate hero-eyebrow" style={{
        fontFamily: "'Space Mono', monospace",
        letterSpacing: '0.35em',
        color: 'var(--gold)',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
      }}>
        By appointment only
      </div>

      {/* Studio name */}
      <h1 className="hero-animate hero-headline" style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        lineHeight: 1.1,
        marginBottom: '1.2rem',
      }}>
        Split Visionz
      </h1>

      {/* Subtitle */}
      <p className="hero-animate hero-subtitle" style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        color: 'var(--ash)',
        lineHeight: 1.7,
        marginBottom: '2.5rem',
      }}>
        Ornate custom tattoo artistry by Elliot Brawner.<br/>15 years of mastery.
      </p>

      {/* CTA */}
      <a href="#booking" className="hero-animate hero-cta" style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.6rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--bone)',
        textDecoration: 'none',
        padding: '1rem 2.5rem',
        border: '0.5px solid rgba(240,235,227,0.25)',
        transition: 'border-color 0.4s, background 0.4s',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(201,168,76,0.08)'
          e.currentTarget.style.borderColor = 'var(--gold)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'rgba(240,235,227,0.25)'
        }}
      >
        Begin your inquiry <span style={{ color: 'var(--gold)' }}>→</span>
      </a>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '1.5rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.5rem',
          letterSpacing: '0.2em',
          color: 'var(--mid)',
          textTransform: 'uppercase',
        }}>Scroll</div>
        <div style={{
          width: '0.5px', height: '30px',
          background: 'linear-gradient(to bottom, var(--gold), transparent)',
          animation: 'scrollpulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes scrollpulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .hero-logo { width: 280px; }
        .hero-fallback-logo { font-size: 8rem; }
        .hero-eyebrow { font-size: 0.6rem; }
        .hero-headline { font-size: clamp(2rem, 4vw, 3.5rem); }
        .hero-subtitle { font-size: 1.15rem; max-width: 400px; }
        .hero-cta { width: auto; }

        @media (max-width: 767px) {
          .hero-logo { width: 200px; }
          .hero-fallback-logo { font-size: 5.5rem; }
          .hero-eyebrow { font-size: 0.5rem; letter-spacing: 0.2em; }
          .hero-headline { font-size: clamp(1.6rem, 6vw, 2.2rem); letter-spacing: 0.15em; }
          .hero-subtitle { font-size: 1rem; max-width: 300px; }
          .hero-cta { width: 100%; text-align: center; }
        }
      `}</style>
    </section>
  )
}
