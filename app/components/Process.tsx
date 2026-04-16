'use client'

import { useReveal } from '../hooks/useReveal'

const steps = [
  {
    num: '01 — Inquiry',
    title: 'WRITE TO US',
    body: 'A brief letter about who you are, what you carry, and what you imagine. We read everything. We respond to very few.',
  },
  {
    num: '02 — Consultation',
    title: 'WE MEET',
    body: 'An unhurried conversation in the studio. No timeline, no pressure. We want to understand the story before we consider the design.',
  },
  {
    num: '03 — Design',
    title: 'WE CREATE',
    body: 'Weeks of sketches, revisions, and collaboration. You will see the piece evolve. The design is finished only when both of us feel it.',
  },
  {
    num: '04 — The Sitting',
    title: 'IT HAPPENS',
    body: 'In privacy. In quiet. With full attention. Sessions run as long as they need to. The work ends when it is done — not when the clock says.',
  },
]

export default function Process() {
  const [headerRef, headerVisible] = useReveal()

  return (
    <section id="process" style={{ background: 'var(--dim)' }}>
      <div className="process-header">
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            letterSpacing: '0.06em',
            color: 'var(--bone)',
          }}>THE PROCESS</h2>
        </div>
      </div>

      <div className="process-grid">
        {steps.map((step, i) => (
          <ProcessStep key={step.title} step={step} delay={i * 0.15} />
        ))}
      </div>

      <style>{`
        .process-header {
          padding: 4rem var(--pad) 0;
        }
        .process-grid {
          display: grid;
          grid-template-columns: 1fr;
          margin-top: 2.5rem;
        }
        .process-step {
          padding: 2rem var(--pad);
          border-bottom: 0.5px solid var(--mid);
        }
        @media (min-width: 768px) {
          .process-header { padding-top: 10rem; }
          .process-grid {
            grid-template-columns: repeat(4, 1fr);
            border-left: 0.5px solid var(--mid);
            margin-top: 5rem;
          }
          .process-step {
            padding: 3rem 2.5rem;
            border-bottom: none;
            border-right: 0.5px solid var(--mid);
          }
        }
      `}</style>
    </section>
  )
}

function ProcessStep({ step, delay }: { step: typeof steps[0], delay: number }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className="process-step"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      }}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.6rem',
        color: 'var(--gold)',
        letterSpacing: '0.15em',
        marginBottom: '1.5rem',
      }}>{step.num}</div>
      <div style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: '1.8rem',
        letterSpacing: '0.08em',
        color: 'var(--bone)',
        marginBottom: '1rem',
      }}>{step.title}</div>
      <p style={{
        fontSize: '0.9rem',
        fontStyle: 'italic',
        lineHeight: 1.8,
        color: 'var(--ash)',
      }}>{step.body}</p>
    </div>
  )
}
