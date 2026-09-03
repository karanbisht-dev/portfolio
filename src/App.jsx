import { Suspense, lazy, useEffect, useState } from 'react'
import './App.css'
import Background from './components/Background'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import MainContent from './components/MainContent'

// The 3D scene (three.js) is code-split so it never blocks first paint.
const Scene3D = lazy(() => import('./components/Scene3D'))

function App() {
  const [use3D, setUse3D] = useState(false)
  // Gate entrance reveals until the preloader lifts, so the hero animates
  // *in front of* the user instead of playing out behind the curtain.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Enable the WebGL scene only on hover-capable devices that don't ask for
    // reduced motion; everyone else gets the lightweight CSS backdrop.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canHover = window.matchMedia('(hover: hover)').matches
    setUse3D(!reduced && canHover)
  }, [])

  // Reveal-on-scroll for every [data-reveal] element (slide / rotate / zoom in).
  // Held back until `ready` so above-the-fold content reveals as the curtain lifts.
  useEffect(() => {
    if (!ready) return
    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            // Drop the compositor hint once the reveal has played (perf).
            e.target.addEventListener(
              'transitionend',
              () => { e.target.style.willChange = 'auto' },
              { once: true }
            )
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ready])

  // 3D mouse-tilt for .tilt cards (desktop only).
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const cards = Array.from(document.querySelectorAll('.tilt'))
    const cleanups = cards.map((card) => {
      const move = (e) => {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        card.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateZ(10px)`
      }
      const leave = () => {
        card.style.transform = ''
      }
      card.addEventListener('mousemove', move)
      card.addEventListener('mouseleave', leave)
      return () => {
        card.removeEventListener('mousemove', move)
        card.removeEventListener('mouseleave', leave)
      }
    })
    return () => cleanups.forEach((fn) => fn())
  }, [])

  // Parallax for [data-parallax] elements (big section numbers, hero accents).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = Array.from(document.querySelectorAll('[data-parallax]'))
    if (!els.length) return
    let raf = 0
    const update = () => {
      const vh = window.innerHeight
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.15
        const r = el.getBoundingClientRect()
        const offset = r.top + r.height / 2 - vh / 2
        el.style.setProperty('--py', `${-offset * speed}px`)
      })
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Magnetic hover for .magnetic elements — buttons/links gently pull toward
  // the cursor and spring back on leave (a signature creative-web micro-interaction).
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const els = Array.from(document.querySelectorAll('.magnetic'))
    const cleanups = els.map((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 0.4
      const move = (e) => {
        const r = el.getBoundingClientRect()
        const mx = e.clientX - (r.left + r.width / 2)
        const my = e.clientY - (r.top + r.height / 2)
        el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`
      }
      const leave = () => { el.style.transform = '' }
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      return () => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      }
    })
    return () => cleanups.forEach((fn) => fn())
  }, [])

  // Cursor-tracking spotlight for .glow-card surfaces (one delegated listener).
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    let raf = 0
    let lx = 0
    let ly = 0
    const apply = () => {
      raf = 0
      const el = document.elementFromPoint(lx, ly)?.closest('.glow-card')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${lx - r.left}px`)
      el.style.setProperty('--my', `${ly - r.top}px`)
    }
    const onMove = (e) => {
      lx = e.clientX
      ly = e.clientY
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <CustomCursor />
      <NavBar />
      {/* Rich animated CSS backdrop — always on, guaranteed visible */}
      <Background />
      {/* Transparent WebGL layer floats the 3D object over the backdrop */}
      {use3D && (
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      )}
      <ScrollProgress />
      <div className="page">
        <Hero />
        <Marquee />
        <MainContent />
      </div>
    </>
  )
}

export default App
