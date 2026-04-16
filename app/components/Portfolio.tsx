'use client'

import { useReveal } from '../hooks/useReveal'

const works = [
  {
    tag: 'Blackwork · Botanical',
    name: 'Nightshade Series, No. 4',
    bg: '#1a1714',
    svg: (
      <g stroke="#c8c0b4" fill="none" strokeWidth="0.8" opacity="0.5" transform="translate(200,300)">
        <path d="M0 180 C -5 120 5 60 0 -180"/>
        <path d="M0 80 C -60 40 -90 -20 -50 -60 C -20 -30 -10 20 0 40"/>
        <path d="M0 40 C 50 0 80 -50 55 -90 C 20 -60 10 -10 0 20"/>
        <path d="M0 -20 C -55 -50 -75 -100 -45 -130 C -15 -100 -5 -60 0 -40"/>
        <path d="M0 -60 C 45 -90 60 -140 35 -165 C 10 -135 5 -95 0 -75"/>
        <path d="M-20 40 C -40 30 -55 10 -45 -10" strokeWidth={0.4} opacity="0.6"/>
        <path d="M20 10 C 40 -5 50 -30 40 -50" strokeWidth={0.4} opacity="0.6"/>
        <circle cx="0" cy="-190" r="18"/>
        <ellipse cx="0" cy="-215" rx="8" ry="14"/>
        <ellipse cx="0" cy="-215" rx="8" ry="14" transform="rotate(45,0,-190)"/>
        <ellipse cx="0" cy="-215" rx="8" ry="14" transform="rotate(90,0,-190)"/>
        <ellipse cx="0" cy="-215" rx="8" ry="14" transform="rotate(135,0,-190)"/>
        <ellipse cx="0" cy="-215" rx="8" ry="14" transform="rotate(180,0,-190)"/>
        <ellipse cx="0" cy="-215" rx="8" ry="14" transform="rotate(225,0,-190)"/>
        <ellipse cx="0" cy="-215" rx="8" ry="14" transform="rotate(270,0,-190)"/>
        <ellipse cx="0" cy="-215" rx="8" ry="14" transform="rotate(315,0,-190)"/>
      </g>
    ),
    viewBox: '0 0 400 600',
    large: true,
  },
  {
    tag: 'Fine line · Geometric',
    name: 'Vesica Study',
    bg: '#141210',
    svg: (
      <g stroke="#c8c0b4" fill="none" strokeWidth="0.7" opacity="0.55" transform="translate(150,170)">
        <polygon points="0,-90 78,45 -78,45"/>
        <polygon points="0,90 78,-45 -78,-45"/>
        <circle cx="0" cy="0" r="95"/>
        <circle cx="0" cy="0" r="50"/>
        <circle cx="0" cy="0" r="15"/>
        <path d="M0,-50 C 25,-25 25,25 0,50 C -25,25 -25,-25 0,-50"/>
        <path d="M-50,0 C -25,-25 25,-25 50,0 C 25,25 -25,25 -50,0"/>
      </g>
    ),
    viewBox: '0 0 300 340',
  },
  {
    tag: 'Stipple · Natural history',
    name: 'Luna Moth',
    bg: '#1c1916',
    svg: (
      <g stroke="#c8c0b4" fill="none" opacity="0.5" transform="translate(150,130)">
        <ellipse cx="0" cy="0" rx="8" ry="45" strokeWidth="0.75"/>
        <ellipse cx="0" cy="-20" rx="5" ry="10" strokeWidth="0.75"/>
        <path d="M8 -30 C 50 -70 80 -40 70 0 C 55 25 30 20 8 -5" strokeWidth="0.75"/>
        <path d="M-8 -30 C -50 -70 -80 -40 -70 0 C -55 25 -30 20 -8 -5" strokeWidth="0.75"/>
        <path d="M5 5 C 35 15 45 40 30 55 C 18 45 10 25 5 15" strokeWidth="0.75"/>
        <path d="M-5 5 C -35 15 -45 40 -30 55 C -18 45 -10 25 -5 15" strokeWidth="0.75"/>
        <circle cx="40" cy="-25" r="8" strokeWidth="0.4" opacity="0.7"/>
        <circle cx="-40" cy="-25" r="8" strokeWidth="0.4" opacity="0.7"/>
        <path d="M4 -50 C 10 -75 20 -85 15 -95" strokeWidth="0.5"/>
        <path d="M-4 -50 C -10 -75 -20 -85 -15 -95" strokeWidth="0.5"/>
        <circle cx="15" cy="-95" r="3" strokeWidth="0.5"/>
        <circle cx="-15" cy="-95" r="3" strokeWidth="0.5"/>
      </g>
    ),
    viewBox: '0 0 300 260',
  },
  {
    tag: 'Architectural · Fine line',
    name: 'Roman Arch Study',
    bg: '#181512',
    svg: (
      <g stroke="#c8c0b4" fill="none" opacity="0.5" transform="translate(150,130)">
        <path d="M-55 80 L-55 -10 C -55 -65 55 -65 55 -10 L55 80" strokeWidth="0.8"/>
        <path d="M-42 80 L-42 -5 C -42 -50 42 -50 42 -5 L42 80" strokeWidth="0.4"/>
        <rect x="-8" y="-66" width="16" height="12" rx="1" strokeWidth="0.6"/>
        {[20,30,40,50,60].map(y => (
          <>
            <line key={`l${y}`} x1="-55" y1={y} x2="-42" y2={y} strokeWidth="0.4" opacity="0.5"/>
            <line key={`r${y}`} x1="42" y1={y} x2="55" y2={y} strokeWidth="0.4" opacity="0.5"/>
          </>
        ))}
      </g>
    ),
    viewBox: '0 0 300 260',
  },
]

export default function Portfolio() {
  const [headerRef, headerVisible] = useReveal()

  return (
    <section id="portfolio" style={{ padding: '6rem 3rem' }}>
      <div
        ref={headerRef}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: '4rem',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}>
        <h2 style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          letterSpacing: '0.06em',
          color: 'var(--bone)',
        }}>SELECTED WORKS</h2>
        <a href="#" style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--ash)',
          textDecoration: 'none',
          borderBottom: '0.5px solid var(--mid)',
          paddingBottom: '0.25rem',
        }}>Full archive →</a>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gridTemplateRows: '340px 260px',
        gap: '3px',
      }}>
        {works.map((work, i) => (
          <PortfolioItem key={work.name} work={work} index={i} />
        ))}
      </div>
    </section>
  )
}

function PortfolioItem({ work, index }: { work: typeof works[0], index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: work.bg,
        gridRow: index === 0 ? '1 / 3' : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        style={{
          width: '100%', height: '100%',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
        viewBox={work.viewBox}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill={work.bg}/>
        {work.svg}
      </svg>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,9,8,0.85) 0%, transparent 50%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '1.5rem',
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          color: 'var(--ember)',
          textTransform: 'uppercase',
          marginBottom: '0.3rem',
        }}>{work.tag}</div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem',
          fontStyle: 'italic',
          color: 'var(--bone)',
        }}>{work.name}</div>
      </div>
    </div>
  )
}

// Need to import useState
import { useState } from 'react'
