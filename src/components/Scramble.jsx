import { useEffect, useRef, useState } from 'react'

// Characters cycled through while a word "decodes" into place.
const GLYPHS = '!<>-_\\/[]{}—=+*^?#·:.'

// Decodes `text` from random glyphs into the real string the first time it
// scrolls into view — a signature "terminal" reveal used across the page.
export default function Scramble({ text, className }) {
  const ref = useRef(null)
  const [out, setOut] = useState(text)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text)
      return
    }
    let raf = 0
    let played = false
    const chars = [...text]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || played) return
          played = true
          io.unobserve(el)
          const start = performance.now()
          const duration = 550 + chars.length * 32
          const tick = (t) => {
            const p = Math.min((t - start) / duration, 1)
            const revealed = p * chars.length
            setOut(
              chars
                .map((c, i) => {
                  if (c === ' ') return ' '
                  if (i < revealed) return c
                  return GLYPHS[(Math.random() * GLYPHS.length) | 0]
                })
                .join('')
            )
            if (p < 1) raf = requestAnimationFrame(tick)
            else setOut(text)
          }
          raf = requestAnimationFrame(tick)
        })
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [text])

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  )
}
