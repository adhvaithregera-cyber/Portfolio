import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SKILLS = [
  {
    title: 'AI & Automation',
    pills: ['Claude Code', 'Prompt Engineering', 'AI Integration', 'Generative Tools', 'Automation'],
  },
  {
    title: 'Digital Marketing',
    pills: ['Google Analytics', 'Meta Ads', 'SEO', 'E-Commerce', 'Data Strategy'],
  },
  {
    title: 'Building & Tools',
    pills: ['React', 'Firebase', 'Razorpay', 'Vercel', 'Squarespace', 'WordPress'],
  },
]

const TITLE = 'SKILLS'

export default function Skills() {
  const sectionRef = useRef(null)
  const gridRef    = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Title — character stagger
      gsap.from('.skills-title-char', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 70,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.06,
        ease: 'power3.out',
      })

      // Columns — stagger in from bottom
      gsap.from(gridRef.current.querySelectorAll('.skill-col'), {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 88%',
          once: true,
        },
        y: 48,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
      })

      // Pills — scale up with stagger after columns land
      gsap.from(gridRef.current.querySelectorAll('.pill'), {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
        scale: 0.8,
        autoAlpha: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: 'back.out(1.7)',
      })
    }, sectionRef)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="skills" aria-labelledby="skills-heading" ref={sectionRef}>
      <p className="section-label">Skills</p>
      <h2
        className="section-title"
        id="skills-heading"
        aria-label={TITLE}
        style={{ overflow: 'hidden', display: 'block' }}
      >
        <span className="skills-title-wrap" aria-hidden="true">
          {TITLE.split('').map((ch, i) => (
            <span key={i} className="letter-wrap">
              <span className="skills-title-char">{ch}</span>
            </span>
          ))}
        </span>
      </h2>

      <div className="skills-grid" ref={gridRef}>
        {SKILLS.map((col) => (
          <div className="skill-col" key={col.title}>
            <p className="skill-col-title">{col.title}</p>
            <div className="skill-pills">
              {col.pills.map((pill) => (
                <span className="pill" key={pill}>{pill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
