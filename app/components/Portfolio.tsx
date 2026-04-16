'use client'

import Image from 'next/image'
import { useRef, useState, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal'

const photos = [
  { src: '/images/portfolio/DSC03411.jpg', tag: 'Piece · 01', name: 'DSC03411' },
  { src: '/images/portfolio/IMG_4496.jpg', tag: 'Piece · 02', name: 'IMG 4496' },
  { src: '/images/portfolio/IMG_4957.jpg', tag: 'Piece · 03', name: 'IMG 4957' },
  { src: '/images/portfolio/IMG_5231.jpg', tag: 'Piece · 04', name: 'IMG 5231' },
  { src: '/images/portfolio/IMG_5333.jpg', tag: 'Piece · 05', name: 'IMG 5333' },
  { src: '/images/portfolio/IMG_6086.jpg', tag: 'Piece · 06', name: 'IMG 6086' },
]

export default function Portfolio() {
  const [headerRef, headerVisible] = useReveal()
  const trackRef = useRef<HTMLDivElement>(null)
  const [arrowHover, setArrowHover] = useState<'left' | 'right' | null>(null)

  const scroll = useCallback((dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.querySelector<HTMLDivElement>('.portfolio-card')?.offsetWidth ?? 400
    track.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' })
  }, [])

  return (
    <section id="portfolio" style={{ padding: '10rem 0', position: 'relative' }}>
      <div style={{ padding: '0 3rem', marginBottom: '4rem' }}>
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div>
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

          {/* Arrow controls */}
          <div style={{ display: 'flex', gap: '0.75rem', paddingBottom: '0.5rem' }}>
            {(['left', 'right'] as const).map(dir => (
              <button
                key={dir}
                onClick={() => scroll(dir === 'left' ? -1 : 1)}
                onMouseEnter={() => setArrowHover(dir)}
                onMouseLeave={() => setArrowHover(null)}
                aria-label={`Scroll ${dir}`}
                style={{
                  width: '52px',
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: arrowHover === dir ? 'rgba(201,168,76,0.1)' : 'transparent',
                  border: `0.5px solid ${arrowHover === dir ? 'var(--gold)' : 'var(--mid)'}`,
                  color: arrowHover === dir ? 'var(--gold)' : 'var(--ash)',
                  cursor: 'crosshair',
                  transition: 'all 0.4s ease',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.4rem',
                }}
              >
                {dir === 'left' ? '←' : '→'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        className="portfolio-track"
        style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingLeft: '3rem',
          paddingRight: '3rem',
          paddingBottom: '1rem',
        }}
      >
        {photos.map((p, i) => (
          <PortfolioCard key={p.src} photo={p} index={i} />
        ))}
      </div>

      {/* Edge fades */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        width: '3rem',
        background: 'linear-gradient(to right, var(--ink), transparent)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      <div style={{
        position: 'absolute',
        top: 0, right: 0, bottom: 0,
        width: '3rem',
        background: 'linear-gradient(to left, var(--ink), transparent)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      <style>{`
        .portfolio-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .portfolio-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

function PortfolioCard({ photo, index }: { photo: typeof photos[0]; index: number }) {
  const [ref, visible] = useReveal()
  const [hovered, setHovered] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div
      ref={ref}
      className="portfolio-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        height: '500px',
        minWidth: 'calc((100vw - 6rem - 40px) / 2.5)',
        flexShrink: 0,
        overflow: 'hidden',
        background: 'var(--dim)',
        cursor: 'crosshair',
        scrollSnapAlign: 'start',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 1s ease ${index * 0.1}s, transform 1s ease ${index * 0.1}s`,
      }}
    >
      {!errored ? (
        <Image
          src={photo.src}
          alt={photo.name}
          fill
          sizes="40vw"
          onError={() => setErrored(true)}
          style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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

      {/* Gold border glow */}
      <div style={{
        position: 'absolute', inset: 0,
        border: `1px solid ${hovered ? 'var(--gold)' : 'transparent'}`,
        boxShadow: hovered
          ? 'inset 0 0 0 1px rgba(201,168,76,0.35), 0 0 30px rgba(201,168,76,0.12)'
          : 'none',
        transition: 'border-color 0.6s ease, box-shadow 0.6s ease',
        pointerEvents: 'none',
      }} />

      {/* Caption overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,9,8,0.9) 0%, rgba(10,9,8,0.3) 30%, transparent 55%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '2rem',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          marginBottom: '0.4rem',
        }}>{photo.tag}</div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.2rem',
          fontStyle: 'italic',
          color: 'var(--bone)',
        }}>{photo.name}</div>
      </div>
    </div>
  )
}
