import { useEffect, useRef } from 'react'
import './Background.css'

// Immersive animated backdrop: a radial glow that follows the cursor,
// slow-drifting gradient blobs, and a faint grid — all GPU/CSS driven.
export default function Background() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Respect users who prefer no motion / touch devices.
    if (window.matchMedia('(hover: none)').matches) return

    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${(e.clientX / window.innerWidth) * 100}%`)
        el.style.setProperty('--my', `${(e.clientY / window.innerHeight) * 100}%`)
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="bg" ref={ref} aria-hidden="true">
      <div className="bg-base" />
      <div className="bg-glow" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="bg-grid" />
      <div className="bg-noise" />
    </div>
  )
}
