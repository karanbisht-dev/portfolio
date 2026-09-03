import './MainContent.css'
import SkillShuffle from './SkillShuffle'
import Journey from './Journey'
import CountUp from './CountUp'
import Scramble from './Scramble'

const stats = [
  { value: '8.20', label: 'CGPA / 10' },
  { value: '300+', label: 'DSA solved' },
  { value: 'Top 3', label: 'AWS Jam / 500+' },
  { value: '2', label: 'Internships' },
]

const projects = [
  {
    title: 'Customer Relationship Management (CRM) System',
    tag: 'Full-Stack · 2026',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST API'],
    points: [
      'Built a full-stack CRM on the MEN stack (MongoDB, Express.js, Node.js) with MVC architecture for managing customer records and business workflows.',
      'Architected 15+ RESTful API endpoints with full CRUD, input validation, Mongoose ODM schema design, structured JSON responses and error handling.',
    ],
    link: 'https://github.com/karanbisht-dev',
  },
]

const experience = [
  {
    role: 'Custom Software Engineering Associate Intern',
    org: 'Accenture',
    period: 'May 2026 – Present',
    location: 'Chennai, India',
    points: [
      'Built an AI-assisted, human-in-the-loop Teradata→Snowflake SQL remediation tool (Python, Claude via Snowflake Cortex) across 4 healthcare data pipelines (~1,000 lines/script, PII data).',
      'Engineered a complete Snowflake test environment from scratch — 35+ tables and 7 stub PII-tokenization UDFs — by reverse-engineering scripts with no reference database.',
      'Developed a variable-resolution pre-processor that eliminated &{VAR} token failures blocking 100% of scripts; catalogued 9 severity-ranked migration issue classes.',
      'Implemented Snowflake zero-copy cloning with iteration caps and token cost guardrails; reviewed 50+ SQL scripts for schema compatibility, data integrity and crash-safe audit trails.',
    ],
  },
  {
    role: 'Research Intern — Large Language Models & Multi-Agent AI',
    org: 'IIT Patna',
    period: 'Jun 2026 – Present',
    location: 'Remote',
    points: [
      'Analyzed EduPlanner (IEEE TLT 2025), identified 5 research gaps, and wrote Python integrating Dynamic Knowledge Tracing, a 3-LLM ensemble evaluator and SymPy-based math verification into the existing multi-agent framework.',
      'Reviewed and synthesized 30+ peer-reviewed papers on LLMs and multi-agent systems to validate proposed framework improvements.',
    ],
  },
]

const certifications = [
  'AWS Jam — Top 3 out of 500+ participants (cloud architecture competition)',
  'Solved 300+ DSA problems on LeetCode & GeeksforGeeks',
  'Selected as sole campus candidate for the Accenture CSE Associate Intern role',
  'Selected for research internship at IIT Patna (Institute of National Importance)',
  'AWS Certified Cloud Practitioner (Foundational)',
  'NPTEL — Cloud Computing · NCC B Certificate',
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
          at Graphic Era Hill University (graduating May 2027). I&apos;m an intern
          at <strong>Accenture</strong>, where I built an AI-assisted SQL migration
          remediation tool for enterprise healthcare pipelines, and a research
          intern at <strong>IIT Patna</strong> working on LLMs and multi-agent AI.
          I&apos;m proficient in Python, SQL, Node.js and REST APIs — and I love
          turning messy, real-world problems into clean software that ships.
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
            <span className="period">Aug 2023 – May 2027 (Expected)</span>
          </div>
          <p className="prose">
            Graphic Era Hill University, Bhimtal, Uttarakhand · CGPA: 8.20 / 10
          </p>
          <p className="prose small-note">
            Coursework: DSA, OOP, DBMS, Operating Systems, Computer Networks,
            Machine Learning, Cloud Computing.
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
          I&apos;m open to software engineering roles, internships and interesting
          collaborations. The fastest way to reach me:
        </p>
        <div className="contact-links" data-reveal="up" style={{ '--d': '0.1s' }}>
          <a className="magnetic glow-card" data-magnetic="0.25" href="mailto:karan.bisht.work@gmail.com">karan.bisht.work@gmail.com</a>
          <a className="magnetic glow-card" data-magnetic="0.25" href="tel:+918392898312">+91 83928 98312</a>
          <a className="magnetic glow-card" data-magnetic="0.25" href="https://linkedin.com/in/karanbisht-cse" target="_blank" rel="noopener noreferrer">LinkedIn</a>
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
