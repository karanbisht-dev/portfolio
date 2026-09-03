import './Marquee.css'

// Kinetic-typography strip that scrolls the things I work with. The list is
// duplicated so a -50% translate loops seamlessly; it pauses on hover.
const WORDS = [
  'Backend',
  'Cloud',
  'Artificial Intelligence',
  'Python',
  'AWS',
  'Node.js',
  'LLMs',
  'REST APIs',
  'Problem Solving',
  'Distributed Systems',
  'SQL',
  'Multi-Agent AI',
]

export default function Marquee() {
  const row = [...WORDS, ...WORDS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((word, i) => (
          <span className="marquee-item" key={i}>
            <span className="marquee-word">{word}</span>
            <span className="marquee-star">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
