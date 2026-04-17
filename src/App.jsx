import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from './components/Cursor'
import Noise from './components/Noise'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Preloader from './components/Preloader'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 })
    window.__lenis = lenis

    const rafFn = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(rafFn)
    gsap.ticker.lagSmoothing(0)

    lenis.on('scroll', ScrollTrigger.update)

    // Scroll progress bar
    gsap.to('.scroll-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
      },
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafFn)
    }
  }, [])

  return (
    <>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <div className="scroll-progress" aria-hidden="true" />
      <Nav />
      <Cursor />
      <Noise />
      <main>
        <Hero />
        <About />
        <Projects />
        <hr className="section-divider" />
        <Skills />
        <hr className="section-divider" />
        <Certifications />
        <hr className="section-divider" />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>© 2025 Adhvaith Karthikeyan</p>
        <p className="footer-built">Designed and built by Adhvaith Karthikeyan using React, GSAP, and Claude Code.</p>
      </footer>
    </>
  )
}
