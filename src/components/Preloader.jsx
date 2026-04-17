import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onDone }) {
  const topRef      = useRef(null)
  const botRef      = useRef(null)
  const monogramRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // 1. "AK" scales + fades in
    tl.fromTo(
      monogramRef.current,
      { scale: 0.8, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }
    )

    // 2. Pause ~1s, then split halves out
    tl.to({}, { duration: 1 })

    tl.to(
      topRef.current,
      { y: '-100%', duration: 0.6, ease: 'power3.inOut' },
      '<'
    )
    tl.to(
      botRef.current,
      { y: '100%', duration: 0.6, ease: 'power3.inOut' },
      '<'
    )

    // 3. After split completes, also fade out the monogram and call onDone
    tl.to(
      monogramRef.current,
      { autoAlpha: 0, duration: 0.2, ease: 'none' },
      '<'
    )

    tl.call(onDone)

    return () => tl.kill()
  }, [onDone])

  return (
    <>
      {/* Top half */}
      <div className="preloader-half preloader-half--top" ref={topRef} aria-hidden="true" />

      {/* Bottom half */}
      <div className="preloader-half preloader-half--bot" ref={botRef} aria-hidden="true" />

      {/* Monogram — sits above both halves */}
      <div className="preloader-monogram" ref={monogramRef} aria-hidden="true">
        <span className="preloader-ak">AK</span>
      </div>
    </>
  )
}
