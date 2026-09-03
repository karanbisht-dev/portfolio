import { useEffect, useRef } from 'react'
import './CustomCursor.css'

const INTERACTIVE = 'a, button, .social, .stat, .project-card, .skill-card, .resume-btn, .pcard'

// A precise dot plus a lagging ring that grows over interactive elements.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    document.body.classList.add('has-custom-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let hovering = false
    let raf = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
    }
    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE)) hovering = true
    }
    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE)) hovering = false
    }

    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      const scale = hovering ? 1.9 : 1
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`
      ring.classList.toggle('hover', hovering)
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    loop()

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}
