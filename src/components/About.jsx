import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STATS = [
  { num: '01',  label: 'Live products shipped' },
  { num: '20+', label: 'Certifications in web dev, AI & digital marketing' },

  { num: '∞',   label: 'Things still being built' },
]

export default function About() {
  const sectionRef = useRef(null)
  const lineRef    = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Step 1 — amber line shoots across
      tl.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.4,
        ease: 'power3.out',
      })

      // Step 2 — left column reveals up
      tl.from(leftRef.current, {
        y: 40,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.1')

      // Step 3 — all stats fade in simultaneously with tight stagger
      const statEls = rightRef.current.querySelectorAll('.about-stat')
      tl.from(statEls, {
        autoAlpha: 0,
        y: 20,
        duration: 0.35,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.3')

      // Step 4 — all counters start at same time as stat reveal
      const numEls = rightRef.current.querySelectorAll('.about-stat-num')
      numEls.forEach((el) => {
        const raw    = el.dataset.target
        if (raw === '∞') return

        const isPlus = raw.endsWith('+')
        const end    = parseInt(raw, 10)
        const obj    = { val: 0 }
        tl.to(obj, {
          val: end,
          duration: 0.8,
          ease: 'power2.out',
          snap: { val: 1 },
          onUpdate() {
            el.textContent = String(Math.round(obj.val)).padStart(2, '0')
          },
          onComplete() {
            el.textContent = isPlus ? `${end}+` : String(end).padStart(2, '0')
          },
        }, '<')
      })
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading" ref={sectionRef}>

      {/* Top amber line */}
      <div ref={lineRef} className="about-top-line" aria-hidden="true" />

      <div className="about-grid">
        {/* Left column */}
        <div className="about-left" ref={leftRef}>
          <h2 className="about-statement" id="about-heading">
            Building things that matter.
          </h2>
          <div className="about-body">
            <p>Grade 12 student at Chrysalis High, Bengaluru — building towards a career at the intersection of front-end engineering, design, and digital marketing.</p>
            <p>I'm drawn to the front end: the layer people actually see, feel, and interact with. I care about getting that layer right — precise, expressive, and fast. GridIQ is where that thinking became a real product.</p>
            <p>A well-built website isn't just a presence — it's a brand's most effective marketing asset. It earns trust before a word is read, drives action without a hard sell, and outlasts any single campaign. That's the standard I design to.</p>
          </div>
        </div>

        {/* Right column — stats */}
        <div className="about-right" ref={rightRef}>
          {STATS.map(({ num, label }, i) => {
            const isInf  = num === '∞'
            const target = isInf ? '∞' : num.replace(/^0+(\d)/, '$1')
            return (
              <div key={label} className="about-stat">
                {i > 0 && <div className="about-stat-divider" aria-hidden="true" />}
                <div className="about-stat-inner">
                  <p className="about-stat-value">
                    <span className="about-stat-num" data-target={target}>{num}</span>
                  </p>
                  <p className="about-stat-label">{label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}
