'use client'

import Image from 'next/image'
import { useReveal } from '../hooks/useReveal'

export default function ComingSoon({ id, title }: { id: string, title: string }) {
  const [ref, visible] = useReveal()

  const revealStyle = (delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
  })

  return (
    <section id={id} className="coming-soon-section">
      <div className="coming-soon-watermark" aria-hidden="true">
        <Image
          src="/images/sv-logo2.jpeg"
          alt=""
          width={600}
          height={600}
          style={{ width: '100%', height: 'auto', opacity: 0.04, mixBlendMode: 'screen' }}
        />
      </div>

      <svg className="coming-soon-lines" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <line x1="0" y1="150" x2="1400" y2="150" stroke="rgba(58,54,50,0.25)" strokeWidth="0.5"/>
        <line x1="0" y1="450" x2="1400" y2="450" stroke="rgba(58,54,50,0.15)" strokeWidth="0.5"/>
        <line x1="700" y1="0" x2="700" y2="600" stroke="rgba(58,54,50,0.08)" strokeWidth="0.5"/>
      </svg>

      <div ref={ref} className="coming-soon-inner">
        <div style={revealStyle(0)}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>Coming Soon</div>
        </div>

        <div style={revealStyle(0.15)}>
          <h2 className="coming-soon-heading">{title}</h2>
        </div>

        <div style={revealStyle(0.3)}>
          <div className="coming-soon-divider" />
        </div>

        <div style={revealStyle(0.45)}>
          <p className="coming-soon-teaser">
            Something is coming. Check back soon.
          </p>
          <div className="coming-soon-underline" aria-hidden="true" />
        </div>
      </div>

      <style>{`
        .coming-soon-section {
          position: relative;
          overflow: hidden;
          padding: 4rem var(--pad);
          background: var(--ink, #0a0908);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
        }
        .coming-soon-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          max-width: 600px;
          pointer-events: none;
          z-index: 0;
        }
        .coming-soon-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .coming-soon-inner {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin: 0 auto;
        }
        .coming-soon-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(3rem, 9vw, 7rem);
          letter-spacing: 0.04em;
          line-height: 1;
          color: var(--gold);
          text-shadow: 0 0 60px rgba(201,168,76,0.15);
          margin: 0;
        }
        .coming-soon-divider {
          width: 60px;
          height: 0.5px;
          background: var(--gold);
          margin: 2.5rem auto;
          opacity: 0.6;
        }
        .coming-soon-teaser {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--ash);
          margin: 0 0 1.25rem;
          line-height: 1.9;
        }
        .coming-soon-underline {
          width: 120px;
          height: 1px;
          margin: 0 auto;
          background: linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%);
          animation: coming-soon-pulse 2.8s ease-in-out infinite;
        }
        @keyframes coming-soon-pulse {
          0%, 100% { opacity: 0.25; transform: scaleX(0.6); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        @media (min-width: 768px) {
          .coming-soon-section {
            padding: 10rem var(--pad);
            min-height: 90vh;
          }
          .coming-soon-teaser {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  )
}
