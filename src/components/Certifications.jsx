import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TITLE = 'CERTIFICATIONS'

const PROFESSIONAL = [
  { name: 'Google AI Essentials',                                          issuer: 'Google',           year: '2025', url: 'https://coursera.org/verify/E0Z2DJQYTYT' },
  { name: 'Google Prompting Essentials',                                   issuer: 'Google',           year: '2025', url: 'https://coursera.org/verify/DYTN1I5BGAD0' },
  { name: 'Google Data Analytics Professional Certificate',                issuer: 'Google',           year: '2025', url: 'https://coursera.org/verify/professional-cert/ZD8ORYFY6TGW' },
  { name: 'Google Digital Marketing & E-Commerce Professional Certificate',issuer: 'Google',           year: '2025', url: null },
  { name: 'Meta Social Media Marketing Professional Certificate',          issuer: 'Meta',             year: '2025', url: 'https://coursera.org/verify/PQ4F54HBPVS4' },
  { name: 'AI Fluency',                                                    issuer: 'Anthropic',        year: '2025', url: null },
]

const COURSES = [
  { name: 'Foundations: Data, Data, Everywhere',         issuer: 'Google / Coursera' },
  { name: 'Ask Questions to Make Data-Driven Decisions', issuer: 'Google / Coursera' },
  { name: 'Prepare Data for Exploration',                issuer: 'Google / Coursera' },
  { name: 'Process Data from Dirty to Clean',            issuer: 'Google / Coursera' },
  { name: 'Analyze Data to Answer Questions',            issuer: 'Google / Coursera' },
  { name: 'Share Data Through the Art of Visualization', issuer: 'Google / Coursera' },
  { name: 'Data Analysis with R Programming',            issuer: 'Google / Coursera' },
  { name: 'Introduction to Social Media Marketing',      issuer: 'Meta / Coursera' },
  { name: 'Social Media Management',                     issuer: 'Meta / Coursera' },
  { name: 'Fundamentals of Social Media Advertising',    issuer: 'Meta / Coursera' },
  { name: 'Advertising with Meta',                       issuer: 'Meta / Coursera' },
  { name: 'Measure & Optimize Social Media Campaigns',   issuer: 'Meta / Coursera' },
]

function CertCard({ name, issuer, year }) {
  return (
    <div className="cert-card" data-glow>
      <div className="cert-card-body">
        <p className="cert-card-name">{name}</p>
        <p className="cert-card-issuer">{issuer}</p>
        {year && <p className="cert-card-year">{year}</p>}
      </div>
    </div>
  )
}

export default function Certifications() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Title character stagger
      gsap.from('.cert-title-char', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 70,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.035,
        ease: 'power3.out',
      })

      // Subtitle
      gsap.from('.cert-subtitle', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        delay: 0.35,
        ease: 'power3.out',
      })

      // Group labels
      gsap.from('.cert-group-label', {
        scrollTrigger: {
          trigger: '.cert-groups',
          start: 'top 88%',
          once: true,
        },
        y: 24,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      })

      // Cards
      gsap.from('.cert-card', {
        scrollTrigger: {
          trigger: '.cert-groups',
          start: 'top 85%',
          once: true,
        },
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
      })
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="certifications" ref={sectionRef} aria-labelledby="cert-heading">
      {/* Header */}
      <p className="section-label">Certifications</p>
      <h2
        className="section-title cert-heading-block"
        id="cert-heading"
        aria-label={TITLE}
        style={{ overflow: 'hidden', display: 'block' }}
      >
        <span className="cert-title-wrap" aria-hidden="true">
          {TITLE.split('').map((ch, i) => (
            <span key={i} className="letter-wrap">
              <span className="cert-title-char">{ch}</span>
            </span>
          ))}
        </span>
      </h2>
      <p className="cert-subtitle">Proof of the learning, not just the doing.</p>

      {/* Card groups */}
      <div className="cert-groups">
        {/* Professional Certificates */}
        <div className="cert-group">
          <h3 className="cert-group-label">Professional Certificates</h3>
          <div className="cert-grid">
            {PROFESSIONAL.map((cert) => (
              <CertCard key={cert.name} {...cert} />
            ))}
          </div>
        </div>

        {/* Course Completions — auto-scrolling ticker */}
        <div className="cert-group">
          <h3 className="cert-group-label">Course Completions</h3>
          <div className="cert-ticker">
            <div className="cert-ticker-track">
              {[...COURSES, ...COURSES].map((cert, i) => (
                <div key={i} className="cert-ticker-item">
                  <span className="cert-ticker-name">{cert.name}</span>
                  <span className="cert-ticker-issuer">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
