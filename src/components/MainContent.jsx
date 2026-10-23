import './MainContent.css'
import SkillShuffle from './SkillShuffle'
import Journey from './Journey'
import CountUp from './CountUp'
import Scramble from './Scramble'

const stats = [
  { value: '8.23', label: 'CGPA / 10' },
  { value: '2', label: 'Internships' },
  { value: 'Top 3', label: 'AWS Jam / 500+' },
  { value: 'PPO', label: 'Accenture' },
]

const projects = [
  {
    title: 'CRM Backend',
    tag: 'Backend · 2026',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Postman'],
    points: [
      'REST API to add, view, update and delete customer records, with input validation and error handling; tested with Postman.',
    ],
    link: 'https://github.com/karanbisht-dev',
  },
]

const experience = [
  {
    role: 'Custom Software Engineering Associate Intern',
    org: 'Accenture',
    period: 'May 2026 – Jul 2026',
    location: 'Chennai',
    context: 'Teradata-to-Snowflake data warehouse migration for an enterprise client.',
    points: [
      'Repaired auto-converted Teradata-to-Snowflake ETL scripts using a Python tool where an LLM (Claude) proposes each fix and an engineer approves it; every attempt ran on a zero-copy clone, not production data.',
      'Traced why every converted script failed on line 1 (unresolved placeholders) and built a Python pre-processor that resolves them before execution.',
      'Fixed a SQL statement-splitter bug that cut BEGIN…END blocks at inner semicolons and caused false syntax errors; the 2 main data-load scripts then ran cleanly.',
      'Cut a missing-table check from 38 flagged tables to the 4 truly missing, then created those 4.',
      'Added a rule-based (non-LLM) fix for column aliases in WHERE clauses; reported 2 bugs from a code review and wrote the technical handover report.',
    ],
  },
  {
    role: 'Research Intern, LLM Multi-Agent Systems',
    org: 'IIT Patna (NPTEL)',
    period: 'Jun 2026 – Jul 2026',
    location: 'Remote',
    context: 'EduPlanner++: extending an IEEE TLT 2025 multi-agent lesson planner (guide: Dr. Rajiv Misra).',
    points: [
      'Replaced a fixed student profile with Deep Knowledge Tracing (LSTM); on 200 simulated students, weak-topic detection F1 rose from 0.41 to 0.78 and mastery error halved (0.28 to 0.14).',
      'Showed the LLM judge scored correct and wrong maths examples almost the same (55.0 vs 55.9); added a verifier where SymPy re-solves each equation alongside an LLM check.',
      'Replaced one LLM judge with 3 from different model families and measured their disagreement.',
      'Added API-key rotation and retries for HTTP 429 rate limits so long experiments completed.',
    ],
  },
]

const certifications = [
  'Pre-placement offer (PPO) from Accenture for the Advanced Associate Software Engineer role.',
  'Topped an NPTEL exam, earning selection for the IIT Patna research internship.',
  'AWS Jam: Top 3 out of 500+ participants.',
  'NPTEL Cloud Computing certificate.',
]

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <div className="section-head">
        <h2 className="section-title" data-reveal="up"><Scramble text={title} /></h2>
      </div>
      {children}
    </section>
  )
}

export default function MainContent() {
  return (
    <main className="content">
      <Section id="about" num="01" title="About">
        <p className="prose big" data-reveal="up">
          I&apos;m a final-year B.Tech Computer Science &amp; Engineering student
          at Graphic Era Hill University (CGPA 8.23, graduating Jul 2027) with two
          internships applying LLMs to real engineering problems: an
          LLM-assisted Teradata-to-Snowflake SQL migration at
          <strong> Accenture</strong> and an LLM multi-agent research project at
          <strong> IIT Patna</strong>. I&apos;m interested in software
          development, AI/ML and test automation.
        </p>

        <div className="stats">
          {stats.map((s, i) => (
            <div className="stat tilt glow-card" data-reveal="zoom" style={{ '--d': `${i * 0.08}s` }} key={s.label}>
              <CountUp className="stat-value grad-text" value={s.value} />
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="journey" num="02" title="Journey">
        <Journey />
      </Section>

      <Section id="experience" num="03" title="Experience">
        <div className="timeline">
          {experience.map((e, i) => (
            <div
              className="timeline-item tilt glow-card"
              data-reveal={i % 2 === 0 ? 'left' : 'right'}
              key={e.org}
            >
              <div className="timeline-head">
                <h3>{e.role} · <span className="org">{e.org}</span></h3>
                <span className="period">{e.period} · {e.location}</span>
              </div>
              {e.context && <p className="prose small-note">{e.context}</p>}
              <ul>
                {e.points.map((pt, j) => <li key={j}>{pt}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="skills" num="04" title="Skills">
        <SkillShuffle />
      </Section>

      <Section id="projects" num="05" title="Projects">
        <div className="projects">
          {projects.map((p) => (
            <a
              className="project-card tilt glow-card"
              data-reveal="rot"
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              key={p.title}
            >
              <div className="project-head">
                <h3>{p.title}</h3>
                <span className="project-tag">{p.tag}</span>
              </div>
              <ul>
                {p.points.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
              <div className="chips">
                {p.stack.map((s) => <span className="chip small" key={s}>{s}</span>)}
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Section id="education" num="06" title="Education">
        <div className="timeline-item tilt glow-card" data-reveal="up">
          <div className="timeline-head">
            <h3>B.Tech, Computer Science &amp; Engineering</h3>
            <span className="period">Aug 2023 – Jul 2027</span>
          </div>
          <p className="prose">
            Graphic Era Hill University, Bhimtal, Uttarakhand · CGPA: 8.23 / 10
          </p>
        </div>
      </Section>

      <Section id="certifications" num="07" title="Achievements & Certifications">
        <ul className="cert-list">
          {certifications.map((c, i) => (
            <li className="glow-card" data-reveal="up" style={{ '--d': `${i * 0.06}s` }} key={c}>{c}</li>
          ))}
        </ul>
      </Section>

      <Section id="contact" num="08" title="Contact">
        <p className="prose big" data-reveal="up">
          I&apos;m open to software engineering roles and interesting
          collaborations. The fastest way to reach me:
        </p>
        <div className="contact-links" data-reveal="up" style={{ '--d': '0.1s' }}>
          <a className="magnetic glow-card" data-magnetic="0.25" href="mailto:karan.bisht.work@gmail.com">karan.bisht.work@gmail.com</a>
          <a className="magnetic glow-card" data-magnetic="0.25" href="https://www.linkedin.com/in/karanbisht-cse" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="magnetic glow-card" data-magnetic="0.25" href="https://github.com/karanbisht-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </Section>

      <footer className="footer">
        <a className="footer-cta magnetic" data-magnetic="0.2" href="mailto:karan.bisht.work@gmail.com">
          <span className="footer-cta-label">Let&apos;s build something</span>
          <span className="footer-cta-big grad-text">GET IN TOUCH →</span>
        </a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Karan Bisht</span>
          <span>Built with React, Three.js &amp; Vite</span>
        </div>
      </footer>
    </main>
  )
}
