import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAV_ITEMS = ['About', 'Projects', 'Skills', 'Certifications', 'Enquire']

export default function Nav() {
  const navRef     = useRef(null)
  const overlayRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll-based nav class
  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return
      if (window.scrollY > 40) {
        navRef.current.classList.add('nav--scrolled')
      } else {
        navRef.current.classList.remove('nav--scrolled')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // GSAP stagger on overlay open
  useEffect(() => {
    if (!overlayRef.current) return

    if (menuOpen) {
      // Stagger links in from right
      gsap.fromTo(
        overlayRef.current.querySelectorAll('.nav-overlay-link'),
        { x: 60, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
      )
    }
  }, [menuOpen])

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className="global-nav" ref={navRef}>
        <a href="#" className="nav-logo" aria-label="Adhvaith Karthikeyan">AK</a>

        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  window.__lenis?.scrollTo(`#${item.toLowerCase()}`, { offset: -64 })
                }}
              >{item}</a>
            </li>
          ))}
        </ul>

        <button className="nav-hamburger" aria-label="Menu" onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`nav-overlay ${menuOpen ? 'is-open' : ''}`} ref={overlayRef}>
        <button className="nav-overlay-close" onClick={toggleMenu} aria-label="Close menu">✕</button>
        <ul className="nav-overlay-links">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="nav-overlay-link"
                onClick={(e) => {
                  e.preventDefault()
                  closeMenu()
                  window.__lenis?.scrollTo(`#${item.toLowerCase()}`, { offset: -64 })
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
