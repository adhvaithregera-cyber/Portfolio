import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const HEADING = 'Work With Me'

const SERVICES = [
  {
    label:    'PERSONAL',
    title:    'A clean, fast personal site.',
    desc:     'Your name, your work, your presence online — done right.',
    price:    '₹1,500 – ₹3,000',
    popular:  false,
    features: [
      'Fully responsive design',
      'GSAP scroll animations',
      'Contact form integration',
      'Delivered in 4 days',
    ],
  },
  {
    label:    'PRODUCT',
    title:    'A fully functional web app.',
    desc:     'Real software — auth, database, accounts, and a live user base.',
    price:    '₹5,000 – ₹8,000',
    popular:  true,
    features: [
      'Full-stack (React + backend)',
      'User auth & accounts',
      'Database integration',
      'Payment gateway ready',
      'Subscription / Pro tier support',
      'Deployed and live',
      'Delivered in 2 weeks',
    ],
  },
  {
    label:    'BUSINESS',
    title:    'A complete business website.',
    desc:     'Multi-page, built to convert, and designed to be taken seriously.',
    price:    '₹12,000 – ₹20,000',
    popular:  false,
    features: [
      'Multi-page architecture',
      'Custom UI/UX design',
      'CMS or admin panel',
      'Analytics & tracking setup',
      'Performance optimised',
      'Ongoing support available',
      '1 month minimum timeline',
    ],
  },
]

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-char', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 80,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: 'power3.out',
      })

      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.service-cards',
          start: 'top 75%',
          once: true,
        },
        y: 50,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      })

      gsap.from('.contact-footer-line', {
        scrollTrigger: {
          trigger: '.contact-footer-line',
          start: 'top 95%',
          once: true,
        },
        y: 16,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power3.out',
      })
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section
      className="contact-section"
      id="enquire"
      ref={sectionRef}
      aria-labelledby="contact-heading"
    >
      <h2
        className="contact-main-title"
        id="contact-heading"
        aria-label={HEADING}
      >
        <span className="contact-heading-wrap" aria-hidden="true">
          {HEADING.split('').map((ch, i) => (
            <span key={i} className="contact-char">
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </span>
      </h2>

      <div className="service-cards">
        {SERVICES.map(({ label, title, desc, price, popular, features }) => (
          <div key={label} className="service-card" data-cursor>
            {popular && <span className="service-badge">POPULAR</span>}
            <p className="service-label">{label}</p>
            <h3 className="service-title">{title}</h3>
            <p className="service-desc">{desc}</p>
            <p className="service-price">{price}</p>
            <ul className="service-features">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="contact-footer-box">
        <p className="contact-footer-line">
          Serious enquiries only&nbsp;—&nbsp;adhvaith.regera@gmail.com
        </p>
      </div>
    </section>
  )
}
