import { useEffect, useRef } from 'react'

export default function Noise() {
  const elRef = useRef(null)

  useEffect(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width  = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const img = ctx.createImageData(size, size)
    const d   = img.data
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0
      d[i] = d[i + 1] = d[i + 2] = v
      d[i + 3] = 255
    }
    ctx.putImageData(img, 0, 0)
    elRef.current.style.backgroundImage = `url(${canvas.toDataURL()})`
  }, [])

  return <div ref={elRef} className="noise-overlay" aria-hidden="true" />
}
