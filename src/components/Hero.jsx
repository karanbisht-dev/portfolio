import './Hero.css'
import avatar from '../assets/avatar.png'
import Scramble from './Scramble'

const socials = [
  {
    href: 'https://github.com/karanbisht-dev',
    label: 'GitHub',
    icon: (
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.02 2.8-.02 3.18 0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
    ),
  },
  {
    href: 'https://www.linkedin.com/in/karanbisht-cse',
    label: 'LinkedIn',
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    ),
  },
  {
    href: 'mailto:karan.bisht.work@gmail.com',
    label: 'Email',
    icon: (
      <path d="M2 4h20c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Zm10 7L2.4 5.2C2.15 5.05 2 5.3 2 5.6V6l10 6 10-6v-.4c0-.3-.15-.55-.4-.4L12 11Z" />
    ),
  },
]

export default function Hero() {
  return (
    <section className="hero" id="home">
      <span className="hero-status" data-reveal="up">
        <span className="hero-status-dot" />
        Available for new opportunities
      </span>

      <span className="hero-eyebrow" data-reveal="up" style={{ '--d': '0.06s' }}>
        <Scramble text="[ SOFTWARE DEVELOPER ]" />
      </span>

      <div className="hero-avatar" data-reveal="zoom">
        <img className="hero-avatar-img" src={avatar} alt="Karan Bisht" />
      </div>

      <h1 className="hero-name">
        {/* The mask (not the clipped line) carries data-reveal, so the
            IntersectionObserver isn't fooled by the overflow:hidden clip. */}
        <span className="mask" data-reveal="" style={{ '--d': '0.15s' }}>
          <span className="line grad-text">KARAN</span>
        </span>
        <span className="mask" data-reveal="" style={{ '--d': '0.28s' }}>
          <span className="line outline">BISHT</span>
        </span>
      </h1>

      <p className="hero-tagline" data-reveal="blur" style={{ '--d': '0.42s' }}>
        Final-year B.Tech CSE student with two internships applying
        <strong> LLMs</strong> to real engineering problems at Accenture and IIT
        Patna. Interested in software development, AI/ML and test automation.
      </p>

      <div className="hero-actions" data-reveal="up" style={{ '--d': '0.52s' }}>
        <a className="btn primary magnetic" href="#projects">View Work</a>
      </div>

      <div className="hero-socials" data-reveal="up" style={{ '--d': '0.6s' }}>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className="social magnetic"
            data-magnetic="0.5"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              {s.icon}
            </svg>
          </a>
        ))}
      </div>
    </section>
  )
}
