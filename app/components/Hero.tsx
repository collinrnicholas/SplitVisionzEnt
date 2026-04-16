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
      justifyContent: 'flex-end', alignItems: 'flex-start',
      padding: '0 3rem 5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Atmospheric background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 60% 80% at 70% 40%, rgba(201,168,76,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 40% 60% at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 50%)
        `,
      }} />

      {/* Decorative SVG lines + botanical */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="200" x2="1400" y2="200" stroke="rgba(58,54,50,0.3)" strokeWidth="0.5"/>
        <line x1="0" y1="400" x2="1400" y2="400" stroke="rgba(58,54,50,0.15)" strokeWidth="0.5"/>
        <line x1="0" y1="700" x2="1400" y2="700" stroke="rgba(58,54,50,0.2)" strokeWidth="0.5"/>
        <line x1="900" y1="0" x2="900" y2="900" stroke="rgba(58,54,50,0.15)" strokeWidth="0.5"/>
        <g opacity="0.06" stroke="#f0ebe3" fill="none" strokeWidth="0.7" transform="translate(780, 60) scale(1.4)">
          <ellipse cx="180" cy="200" rx="60" ry="80" transform="rotate(-20,180,200)"/>
          <ellipse cx="180" cy="200" rx="40" ry="55" transform="rotate(10,180,200)"/>
          <ellipse cx="180" cy="200" rx="25" ry="35" transform="rotate(35,180,200)"/>
          <path d="M180 280 C 175 350 165 420 150 500"/>
          <path d="M158 330 C 130 310 90 325 70 355 C 100 360 120 345 140 355"/>
          <path d="M165 380 C 200 365 230 380 245 410 C 210 405 185 385 175 405"/>
          <circle cx="180" cy="150" r="22"/>
          <ellipse cx="180" cy="125" rx="9" ry="15" transform="rotate(0,180,150)"/>
          <ellipse cx="180" cy="125" rx="9" ry="15" transform="rotate(45,180,150)"/>
          <ellipse cx="180" cy="125" rx="9" ry="15" transform="rotate(90,180,150)"/>
          <ellipse cx="180" cy="125" rx="9" ry="15" transform="rotate(135,180,150)"/>
        </g>
      </svg>

      {/* SV monogram — image with graceful text fallback */}
      <div className="hero-animate" style={{
        position: 'absolute', top: '6rem', right: '3rem',
        width: '120px', height: '120px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        {!logoError ? (
          <Image
            src="/images/sv-logo.png"
            alt="SV monogram"
            width={120}
            height={120}
            onError={() => setLogoError(true)}
            style={{ objectFit: 'contain', opacity: 0.85 }}
          />
        ) : (
          <span aria-label="SV monogram" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: '5.5rem',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'var(--gold)',
            textShadow: '0 0 24px rgba(201,168,76,0.25)',
            background: 'linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 55%, var(--gold-dim) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>SV</span>
        )}
      </div>

      {/* Content */}
      <div className="hero-animate" style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.65rem',
        letterSpacing: '0.3em',
        color: 'var(--gold)',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
      }}>
        By appointment only — Private studio
      </div>

      <h1 className="hero-animate" style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: 'clamp(5rem, 14vw, 13rem)',
        lineHeight: 0.88,
        letterSpacing: '0.02em',
        color: 'var(--bone)',
        marginBottom: '2rem',
      }}>
        THE<br/>ART OF<br/>THE MARK
      </h1>

      <p className="hero-animate" style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.1rem',
        fontStyle: 'italic',
        color: 'var(--ash)',
        maxWidth: '420px',
        lineHeight: 1.7,
        marginBottom: '3rem',
      }}>
        Singular works of permanent art, made in<br/>intimate collaboration with a single artist.
      </p>

      <a href="#booking" className="hero-animate" style={{
        display: 'inline-flex', alignItems: 'center', gap: '1rem',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.65rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--bone)',
        textDecoration: 'none',
        padding: '1rem 2rem',
        border: '0.5px solid rgba(240,235,227,0.3)',
        transition: 'border-color 0.3s, background 0.3s',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(201,168,76,0.1)'
          e.currentTarget.style.borderColor = 'var(--gold)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'rgba(240,235,227,0.3)'
        }}
      >
        Begin your inquiry <span style={{ color: 'var(--gold)' }}>→</span>
      </a>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', right: '3rem',
        writingMode: 'vertical-rl',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.6rem',
        letterSpacing: '0.2em',
        color: 'var(--mid)',
        textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <div style={{
          width: '0.5px', height: '60px',
          background: 'linear-gradient(to bottom, transparent, var(--gold))',
          animation: 'scrollpulse 2s ease-in-out infinite',
        }} />
        Scroll
      </div>

      <style>{`
        @keyframes scrollpulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
