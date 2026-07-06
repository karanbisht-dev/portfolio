import { useEffect, useState } from 'react'
import './ScrollProgress.css'

// Thin gradient bar at the top that fills as you scroll the page.
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? el.scrollTop / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
}
