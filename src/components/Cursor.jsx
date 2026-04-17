import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const TRAIL_COUNT = 6

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const trails  = useRef([])

  useEffect(() => {
    // Skip entirely on touch/stylus devices — CSS hides elements too,
    // but this prevents unnecessary listeners being registered.
    if (window.matchMedia('(hover: none)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    const trs  = trails.current

    const onMove = ({ clientX: x, clientY: y }) => {
      gsap.to(dot,  { x, y, duration: 0.08, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(ring, { x, y, duration: 0.28, ease: 'power2.out', overwrite: 'auto' })

      trs.forEach((tr, i) => {
        gsap.to(tr, {
          x, y,
          duration: 0.12 + i * 0.06,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }

    // Event delegation — works for elements added after mount
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        gsap.to(ring, { scale: 1.75, duration: 0.22, ease: 'power2.out' })
        ring.classList.add('is-hovering')
      }
    }

    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        gsap.to(ring, { scale: 1, duration: 0.22, ease: 'power2.out' })
        ring.classList.remove('is-hovering')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trails.current[i] = el }}
          className="cursor-trail"
          style={{ opacity: 0.28 - i * 0.04 }}
          aria-hidden="true"
        />
      ))}
    </>
  )
}
