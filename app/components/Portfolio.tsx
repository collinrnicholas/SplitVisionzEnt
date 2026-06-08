'use client'

import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

const photos = [
  { src: '/images/portfolio/DSC03411.png', label: 'No. 01' },
  { src: '/images/portfolio/IMG_4496.jpg', label: 'No. 02' },
  { src: '/images/portfolio/IMG_4957.jpg', label: 'No. 03' },
  { src: '/images/portfolio/IMG_5231.jpg', label: 'No. 04' },
  { src: '/images/portfolio/IMG_5333.jpg', label: 'No. 05' },
  { src: '/images/portfolio/IMG_6086.jpg', label: 'No. 06' },
]

const N = photos.length
// [clones of last set] [real items] [clones of first set]
const loopPhotos = [...photos, ...photos, ...photos]

function getItemWidth(track: HTMLDivElement): number {
  const card = track.querySelector<HTMLDivElement>('.portfolio-card')
  if (!card) return 0
  return card.offsetWidth + (parseFloat(getComputedStyle(track).gap) || 12)
}

export default function Portfolio() {
  const [headerRef, headerVisible] = useReveal()
  const trackRef = useRef<HTMLDivElement>(null)
  const [arrowHover, setArrowHover] = useState<'left' | 'right' | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const loopTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // On mount: jump to start of middle set (no animation)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const init = () => {
      const w = getItemWidth(track)
      if (!w) { requestAnimationFrame(init); return }
      track.scrollLeft = N * w
    }
    requestAnimationFrame(init)
  }, [])

  // Update active dot + debounced silent teleport back to middle set
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onScroll = () => {
      const w = getItemWidth(track)
      if (!w) return
      const idx = Math.round(track.scrollLeft / w)
      setActiveIndex(((idx % N) + N) % N)

      clearTimeout(loopTimer.current)
      loopTimer.current = setTimeout(() => {
        const cur = Math.round(track.scrollLeft / w)
        if (cur < N) {
          track.scrollLeft = (cur + N) * w
        } else if (cur >= N * 2) {
          track.scrollLeft = (cur - N) * w
        }
      }, 200)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      clearTimeout(loopTimer.current)
    }
  }, [])

  const scroll = useCallback((dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * getItemWidth(track), behavior: 'smooth' })
  }, [])

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: (N + i) * getItemWidth(track), behavior: 'smooth' })
  }, [])

  return (
    <section id="portfolio" className="portfolio-section" style={{ position: 'relative' }}>
      <div style={{ padding: '0 var(--pad)', marginBottom: '3rem' }}>
        <div
          ref={headerRef}
          className="portfolio-header"
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
              marginBottom: '1rem',
            }}>Selected Work</div>
            <h2 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              letterSpacing: '0.04em',
              color: 'var(--bone)',
              lineHeight: 0.9,
            }}>PORTFOLIO</h2>
          </div>

          <div className="portfolio-arrows" style={{ display: 'flex', gap: '0.75rem', paddingBottom: '0.5rem' }}>
            {(['left', 'right'] as const).map(dir => (
              <button
                key={dir}
                onClick={() => scroll(dir === 'left' ? -1 : 1)}
                onMouseEnter={() => setArrowHover(dir)}
                onMouseLeave={() => setArrowHover(null)}
                aria-label={`Scroll ${dir}`}
                style={{
                  width: '52px', height: '52px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
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

      {/* Carousel track — 18 cards (6 clones + 6 real + 6 clones) */}
      <div
        ref={trackRef}
        className="portfolio-track"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '1rem',
        }}
      >
        {loopPhotos.map((p, i) => (
          <PortfolioCard
            key={`${p.src}-${i}`}
            photo={p}
            index={i % N}
            clone={i < N || i >= N * 2}
          />
        ))}
      </div>

      {/* Dot indicators — mobile only */}
      <div className="portfolio-dots" aria-hidden="true">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            style={{
              width: i === activeIndex ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === activeIndex ? 'var(--gold)' : 'var(--mid)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.3s ease, background 0.3s ease',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Edge fades */}
      <div className="portfolio-fade-left" style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        background: 'linear-gradient(to right, var(--ink), transparent)',
        pointerEvents: 'none', zIndex: 2,
      }} />
      <div className="portfolio-fade-right" style={{
        position: 'absolute', top: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to left, var(--ink), transparent)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      <style>{`
        .portfolio-section { padding: 4rem 0; }
        .portfolio-track {
          gap: 12px;
          padding-left: var(--pad);
          padding-right: var(--pad);
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .portfolio-track::-webkit-scrollbar { display: none; }
        .portfolio-fade-left,
        .portfolio-fade-right { width: var(--pad); }
        .portfolio-card { min-width: 85vw; height: 420px; }
        .portfolio-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          padding: 1.5rem var(--pad) 0.5rem;
        }
        @media (min-width: 768px) {
          .portfolio-section { padding: 10rem 0; }
          .portfolio-track { gap: 20px; }
          .portfolio-card {
            min-width: calc((100vw - 6rem - 40px) / 2.5);
            height: 500px;
          }
          .portfolio-dots { display: none; }
          .portfolio-arrows { display: flex !important; }
        }
        @media (max-width: 767px) {
          .portfolio-arrows { display: none !important; }
        }
      `}</style>
    </section>
  )
}

function PortfolioCard({
  photo, index, clone,
}: {
  photo: typeof photos[0]
  index: number
  clone?: boolean
}) {
  const [ref, visible] = useReveal()
  const [hovered, setHovered] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div
      ref={clone ? undefined : ref}
      className="portfolio-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        flexShrink: 0,
        overflow: 'hidden',
        background: 'var(--dim)',
        cursor: 'crosshair',
        scrollSnapAlign: 'start',
        opacity: clone ? 1 : (visible ? 1 : 0),
        transform: clone ? 'none' : (visible ? 'translateY(0)' : 'translateY(40px)'),
        transition: clone
          ? 'none'
          : `opacity 1s ease ${index * 0.1}s, transform 1s ease ${index * 0.1}s`,
      }}
    >
      {!errored ? (
        <Image
          src={photo.src}
          alt={photo.label}
          fill
          sizes="(max-width: 767px) 85vw, 40vw"
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

      <div style={{
        position: 'absolute', inset: 0,
        border: `1px solid ${hovered ? 'var(--gold)' : 'transparent'}`,
        boxShadow: hovered
          ? 'inset 0 0 0 1px rgba(201,168,76,0.35), 0 0 30px rgba(201,168,76,0.12)'
          : 'none',
        transition: 'border-color 0.6s ease, box-shadow 0.6s ease',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0.75rem 1rem',
        opacity: 0.5,
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.5rem',
          letterSpacing: '0.2em',
          color: 'var(--gold-dim)',
          textTransform: 'uppercase',
        }}>{photo.label}</div>
      </div>
    </div>
  )
}
