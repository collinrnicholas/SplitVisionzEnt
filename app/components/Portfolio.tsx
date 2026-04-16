'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const photos = [
  { src: '/images/portfolio/photo1.jpg', tag: 'Piece · 01', name: 'Study I' },
  { src: '/images/portfolio/photo2.jpg', tag: 'Piece · 02', name: 'Study II' },
  { src: '/images/portfolio/photo3.jpg', tag: 'Piece · 03', name: 'Study III' },
  { src: '/images/portfolio/photo4.jpg', tag: 'Piece · 04', name: 'Study IV' },
  { src: '/images/portfolio/photo5.jpg', tag: 'Piece · 05', name: 'Study V' },
  { src: '/images/portfolio/photo6.jpg', tag: 'Piece · 06', name: 'Study VI' },
]

export default function Portfolio() {
  const [headerRef, headerVisible] = useReveal()

  return (
    <section id="portfolio" style={{ padding: '10rem 3rem' }}>
      <div
        ref={headerRef}
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
          marginBottom: '5rem',
        }}
      >
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>Selected Work</div>
        <h2 style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(3rem, 6vw, 5.5rem)',
          letterSpacing: '0.04em',
          color: 'var(--bone)',
          lineHeight: 0.9,
        }}>PORTFOLIO</h2>
      </div>

      <div className="portfolio-grid">
        {photos.map((p, i) => (
          <PortfolioItem key={p.src} photo={p} delay={i * 0.08} />
        ))}
      </div>

      <style>{`
        .portfolio-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 960px) {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .portfolio-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

function PortfolioItem({ photo, delay }: { photo: typeof photos[0]; delay: number }) {
  const [ref, visible] = useReveal()
  const [hovered, setHovered] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '3 / 4',
        overflow: 'hidden',
        background: 'var(--dim)',
        cursor: 'crosshair',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      }}
    >
      {!errored ? (
        <Image
          src={photo.src}
          alt={photo.name}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
          onError={() => setErrored(true)}
          style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.8s ease',
          }}
        />
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'var(--dim)',
          border: '1px solid var(--gold-dim)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
        }}>
          Image Missing
        </div>
      )}

      {/* Animated gold border overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        border: `1px solid ${hovered ? 'var(--gold)' : 'transparent'}`,
        boxShadow: hovered ? 'inset 0 0 0 1px rgba(201,168,76,0.4), 0 0 24px rgba(201,168,76,0.15)' : 'none',
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
        pointerEvents: 'none',
      }} />

      {/* Hover info overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,9,8,0.85) 0%, transparent 50%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '1.5rem',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          marginBottom: '0.3rem',
        }}>{photo.tag}</div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem',
          fontStyle: 'italic',
          color: 'var(--bone)',
        }}>{photo.name}</div>
      </div>
    </div>
  )
}
