import './Marquee.css'

// Kinetic-typography strip that scrolls the things I work with. The list is
// duplicated so a -50% translate loops seamlessly; it pauses on hover.
const WORDS = [
  'C++',
  'JavaScript',
  'Python',
  'SQL',
  'LLMs',
  'Multi-Agent Systems',
  'LLM Evaluation',
  'MongoDB',
  'AWS Basics',
  'Test Automation',
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
