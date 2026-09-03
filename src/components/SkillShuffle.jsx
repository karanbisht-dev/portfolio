import { useLayoutEffect, useRef, useState } from 'react'
import './SkillShuffle.css'
import avatar from '../assets/avatar.png'

// Each skill is a playing card: rank + suit corners, a pixel face, and a name.
// tone drives the face colour (king = gold, queen = pink, joker = purple).
const CARDS = [
  { name: 'Python', rank: 'K', suit: '♠', tone: 'king' },
  { name: 'C++', rank: 'K', suit: '♦', tone: 'king' },
  { name: 'Node.js', rank: 'K', suit: '♥', tone: 'king' },
  { name: 'AWS', rank: 'K', suit: '♣', tone: 'king' },
  { name: 'SQL', rank: 'Q', suit: '♦', tone: 'queen' },
  { name: 'MongoDB', rank: 'Q', suit: '♠', tone: 'queen' },
  { name: 'LLMs', rank: 'Q', suit: '♥', tone: 'queen' },
  { name: 'Linux', rank: 'Q', suit: '♣', tone: 'queen' },
  { name: 'JavaScript', rank: 'J', suit: '♦', tone: 'jack' },
  { name: 'Express.js', rank: 'J', suit: '♠', tone: 'jack' },
  { name: 'Git', rank: 'J', suit: '♥', tone: 'jack' },
  { name: 'Docker', rank: 'J', suit: '♣', tone: 'jack' },
  { name: 'Multi-Agent AI', rank: 'JOKER', suit: '', tone: 'joker' },
  { name: 'Snowflake', rank: 'JOKER', suit: '', tone: 'joker' },
  { name: 'PostgreSQL', rank: 'JOKER', suit: '', tone: 'joker' },
  { name: 'REST APIs', rank: 'JOKER', suit: '', tone: 'joker' },
]

const isRed = (suit) => suit === '♦' || suit === '♥'

// Pixel-ish accessories that sit on top of the face to give each rank a
// distinct character: crown (King), cat-ear headphones (Queen), jester (Joker).
function Accessory({ tone }) {
  if (tone === 'king') {
    return (
      <svg className="acc" viewBox="0 0 24 14" aria-hidden="true">
        <path d="M2 13V5l4.5 3.5L12 2l5.5 6.5L22 5v8Z" fill="#ffcf3f" stroke="#b8860b" strokeWidth="0.7" />
        <rect x="11" y="6.2" width="2" height="2" fill="#ff5436" />
        <rect x="5" y="9.6" width="1.6" height="1.6" fill="#ff5436" />
        <rect x="17.4" y="9.6" width="1.6" height="1.6" fill="#ff5436" />
      </svg>
    )
  }
  if (tone === 'queen') {
    return (
      <svg className="acc" viewBox="0 0 26 14" aria-hidden="true">
        <path d="M5 13 6.5 3 12 11Z" fill="#ff6fae" />
        <path d="M21 13 19.5 3 14 11Z" fill="#ff6fae" />
        <path d="M5 12A9 8 0 0 1 21 12" fill="none" stroke="#ff8a5c" strokeWidth="1.4" />
      </svg>
    )
  }
  if (tone === 'joker') {
    return (
      <svg className="acc" viewBox="0 0 26 16" aria-hidden="true">
        <path d="M3 15 2 4l6 5Z" fill="#a855f7" />
        <path d="M13 15V2l6 6Z" fill="#ff5436" />
        <path d="M23 15 24 4l-6 5Z" fill="#a855f7" />
        <rect x="2" y="13" width="22" height="3" rx="1" fill="#4a2f7a" />
        <circle cx="2" cy="4" r="1.5" fill="#ffcf3f" />
        <circle cx="13" cy="2" r="1.5" fill="#ffcf3f" />
        <circle cx="24" cy="4" r="1.5" fill="#ffcf3f" />
      </svg>
    )
  }
  return null
}

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function Corner({ card, className }) {
  return (
    <span className={`corner ${className}`}>
      <b>{card.rank}</b>
      {card.suit && <i className={isRed(card.suit) ? 'red' : 'dark'}>{card.suit}</i>}
    </span>
  )
}

export default function SkillShuffle() {
  const [order, setOrder] = useState(CARDS.map((_, i) => i))
  const [busy, setBusy] = useState(false)
  // Pointer devices flip on hover (CSS); touch devices flip on tap (this set).
  const [canHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
  )
  const [flipped, setFlipped] = useState(() => new Set())
  const refs = useRef({})
  const prevRects = useRef(null)

  const toggleFlip = (idx) => {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const doShuffle = () => {
    if (busy) return
    // FLIP — record current positions (First)
    const rects = {}
    order.forEach((idx) => {
      const el = refs.current[idx]
      if (el) rects[idx] = el.getBoundingClientRect()
    })
    prevRects.current = rects
    setBusy(true)
    setOrder((o) => shuffleArray(o)) // Last
  }

  // Invert + Play after the DOM reorders.
  useLayoutEffect(() => {
    const prev = prevRects.current
    if (!prev) return
    prevRects.current = null
    order.forEach((idx, pos) => {
      const el = refs.current[idx]
      if (!el || !prev[idx]) return
      const now = el.getBoundingClientRect()
      const dx = prev[idx].left - now.left
      const dy = prev[idx].top - now.top
      if (!dx && !dy) return
      const rot = Math.random() * 18 - 9
      el.style.transition = 'none'
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(1.06)`
      el.style.zIndex = '5'
      // force reflow so the browser registers the start state
      void el.getBoundingClientRect()
      requestAnimationFrame(() => {
        el.style.transition = `transform 0.65s cubic-bezier(0.34, 1.56, 0.4, 1) ${pos * 35}ms`
        el.style.transform = 'translate(0, 0) rotate(0deg) scale(1)'
      })
      const clear = () => {
        el.style.zIndex = ''
        el.style.transition = ''
        el.removeEventListener('transitionend', clear)
      }
      el.addEventListener('transitionend', clear)
    })
    const t = setTimeout(() => setBusy(false), 1100)
    return () => clearTimeout(t)
  }, [order])

  return (
    <div className="skilldeck">
      <div className="deck-grid">
        {order.map((idx) => {
          const c = CARDS[idx]
          return (
            <div
              className={`pcard ${flipped.has(idx) ? 'flipped' : ''}`}
              data-tone={c.tone}
              key={c.name}
              ref={(el) => { refs.current[idx] = el }}
              onClick={canHover ? undefined : () => toggleFlip(idx)}
            >
              <div className="pcard-inner">
                {/* Front — the skill face */}
                <div className="pcard-side pcard-front">
                  <Corner card={c} className="tl" />
                  <div className="pcard-face">
                    <Accessory tone={c.tone} />
                    <img src={avatar} alt="" />
                  </div>
                  <span className="pcard-name">{c.name}</span>
                  <Corner card={c} className="br" />
                </div>
                {/* Back — holographic foil that comes alive when flipped */}
                <div className="pcard-side pcard-back">
                  <div className="pcard-back-holo" />
                  <div className="pcard-back-art">
                    <span className="pcard-back-emblem">KB</span>
                  </div>
                  <div className="pcard-back-shine" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        className={`shuffle-btn ${busy ? 'busy' : ''}`}
        onClick={doShuffle}
        disabled={busy}
      >
        ★ SHUFFLE DECK
      </button>
    </div>
  )
}
