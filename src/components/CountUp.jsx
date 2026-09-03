import { useEffect, useRef, useState } from 'react'

// Splits a stat like "8.20", "300+", "Top 3" into an optional text prefix,
// a number (with however many decimals it was written with), and a suffix.
function parse(value) {
  const m = String(value).match(/^(\D*?)(\d+(?:\.\d+)?)(\D*)$/)
  if (!m) return null
  const [, prefix, num, suffix] = m
  const decimals = num.includes('.') ? num.split('.')[1].length : 0
  return { prefix, target: parseFloat(num), decimals, suffix }
}

const format = (p, n, decimals, s) => `${p}${n.toFixed(decimals)}${s}`

// Animates a numeric stat from 0 → target the first time it scrolls into view.
export default function CountUp({ value, className, duration = 1600 }) {
  const ref = useRef(null)
  const parsed = parse(value)
  const [display, setDisplay] = useState(
    parsed ? format(parsed.prefix, 0, parsed.decimals, parsed.suffix) : value
  )

  useEffect(() => {
    const el = ref.current
    if (!el || !parsed) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }
    let raf = 0
    let played = false
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || played) return
          played = true
          io.unobserve(el)
          const start = performance.now()
          const tick = (t) => {
            const p = Math.min((t - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
            setDisplay(
              format(parsed.prefix, parsed.target * eased, parsed.decimals, parsed.suffix)
            )
            if (p < 1) raf = requestAnimationFrame(tick)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
