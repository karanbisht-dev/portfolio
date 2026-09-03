import './Journey.css'

const levels = [
  { lvl: '01', title: 'Foundations', desc: 'C++, Python, OOP, DBMS & core CS at Graphic Era Hill University.' },
  { lvl: '02', title: 'Problem Solving', desc: 'Solved 300+ DSA problems on LeetCode & GeeksforGeeks.' },
  { lvl: '03', title: 'Cloud & Competitions', desc: 'AWS Cloud Practitioner · AWS Jam — Top 3 out of 500+.' },
  { lvl: '04', title: 'Full-Stack Builder', desc: 'Built a MEN-stack CRM with 15+ RESTful API endpoints.' },
  { lvl: '05', title: 'Research Intern · IIT Patna', desc: 'LLMs & multi-agent AI research (current).', current: true },
  { lvl: '06', title: 'SWE Intern · Accenture', desc: 'AI-assisted SQL migration tooling (current).', current: true },
]

export default function Journey() {
  return (
    <div className="journey">
      <div className="journey-line" data-reveal="" />
      {levels.map((l, i) => (
        <div
          className={`level ${l.current ? 'current' : ''}`}
          data-reveal={i % 2 === 0 ? 'left' : 'right'}
          style={{ '--d': `${i * 0.06}s` }}
          key={l.lvl}
        >
          <div className="level-node">
            <span className="level-num">{l.lvl}</span>
          </div>
          <div className="level-body glow-card">
            <h3>
              {l.title}
              {l.current && <span className="level-badge">CURRENT</span>}
            </h3>
            <p>{l.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
