import React from 'react'
import ReactDOM from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

// Spotlight glow border — tracks pointer position as CSS vars on each glow element
document.addEventListener('pointermove', (e) => {
  document.querySelectorAll('[data-glow]').forEach((el) => {
    el.style.setProperty('--glow-x', e.clientX)
    el.style.setProperty('--glow-y', e.clientY)
    el.style.setProperty('--glow-xp', (e.clientX / window.innerWidth).toFixed(3))
  })
})

// Magnetic buttons — pull toward cursor when nearby, spring back on leave
document.addEventListener('pointermove', (e) => {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const rect   = el.getBoundingClientRect()
    const cx     = rect.left + rect.width  / 2
    const cy     = rect.top  + rect.height / 2
    const dx     = e.clientX - cx
    const dy     = e.clientY - cy
    const dist   = Math.sqrt(dx * dx + dy * dy)
    const radius = Math.max(rect.width, rect.height) * 1.4

    if (dist < radius) {
      const strength = (1 - dist / radius) * 0.4
      gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power2.out' })
    } else {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }
  })
})

document.addEventListener('pointerleave', () => {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  })
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
