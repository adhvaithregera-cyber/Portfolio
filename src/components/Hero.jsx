import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const FIRST = 'ADHVAITH'
const LAST  = 'KARTHIKEYAN'

function LetterRow({ word, rowClass, letterClass }) {
  return (
    <span className={`name-row ${rowClass}`} aria-hidden="true">
      {word.split('').map((ch, i) => (
        <span key={i} className="letter-wrap">
          <span className={`letter ${letterClass}`}>{ch}</span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.letter-first', {
          y: 80, opacity: 0, duration: 0.8, stagger: 0.05,
        })
        .from('.letter-last', {
          y: 80, opacity: 0, duration: 0.8, stagger: 0.05,
        }, '-=0.5')
        .from('.hero-tagline', {
          y: 24, opacity: 0, duration: 0.7,
        }, '-=0.25')
        .from('.hero-icons', {
          y: 12, opacity: 0, duration: 0.6,
        }, '-=0.3')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef} aria-label="Introduction">
      <div className="orb" aria-hidden="true" />

      <div className="hero-content">
        {/* Accessible text — hidden visually, read by screen readers */}
        <h1 className="sr-only">Adhvaith Karthikeyan</h1>

        {/* Animated visual name */}
        <div className="hero-name" aria-hidden="true">
          <LetterRow word={FIRST} rowClass="name-row-first" letterClass="letter-first" />
          <LetterRow word={LAST}  rowClass="name-row-last"  letterClass="letter-last"  />
        </div>

        <p className="hero-tagline">
          Most people talk about AI. I deploy it.
        </p>
      </div>

      <nav className="hero-icons" aria-label="Social links">
        <a
          href="https://www.linkedin.com/in/adhvkrthn/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="LinkedIn"
          data-cursor
          data-glow
          data-magnetic
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>

        <a
          href="mailto:adhvaith.regera@gmail.com"
          className="social-link"
          aria-label="Email"
          data-tooltip="adhvaith.regera@gmail.com"
          data-cursor
          data-glow
          data-magnetic
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </a>
      </nav>
    </section>
  )
}
