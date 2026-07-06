import { useEffect, useState } from 'react'
import './Preloader.css'

// Noomo-style entrance: a 0→100% counter that slides away to reveal the site.
export default function Preloader() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let raf
    const start = performance.now()
    const duration = 1900
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setCount(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setDone(true)
        setTimeout(() => setHidden(true), 900)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (hidden) return null

  return (
    <div className={`preloader ${done ? 'done' : ''}`} aria-hidden="true">
      <div className="preloader-inner">
        <span className="pre-label">[ LOADING ]</span>
        <span className="pre-count grad-text">
          {count}<em>%</em>
        </span>
        <span className="pre-name">KARAN&nbsp;BISHT — PORTFOLIO</span>
      </div>
      <div className="pre-bar" style={{ transform: `scaleX(${count / 100})` }} />
    </div>
  )
}
