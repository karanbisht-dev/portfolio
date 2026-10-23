import './Journey.css'

const levels = [
  { lvl: '01', title: 'B.Tech CSE · Graphic Era Hill University', desc: 'Started B.Tech in Computer Science and Engineering in Aug 2023 (CGPA 8.23).' },
  { lvl: '02', title: 'AWS Jam', desc: 'Top 3 out of 500+ participants.' },
  { lvl: '03', title: 'NPTEL Topper', desc: 'Topped an NPTEL exam, earning selection for the IIT Patna research internship.' },
  { lvl: '04', title: 'Intern · Accenture', desc: 'Custom Software Engineering Associate Intern, May 2026 – Jul 2026: LLM-assisted Teradata-to-Snowflake SQL migration.' },
  { lvl: '05', title: 'Research Intern · IIT Patna', desc: 'LLM multi-agent systems research, Jun 2026 – Jul 2026.' },
  { lvl: '06', title: 'PPO · Accenture', desc: 'Pre-placement offer for the Advanced Associate Software Engineer role.' },
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
