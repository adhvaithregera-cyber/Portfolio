import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const buildItems = [
  { label: 'Solo built', detail: 'Designed, developed, and shipped entirely by one person — no team, no agency.' },
  { label: 'Zero capital', detail: 'Started with free-tier services and grew from there. No funding, no investors.' },
  { label: 'First web app', detail: 'GridIQ was my first full-stack product — learned everything on the job.' },
  { label: 'Firebase auth + Firestore', detail: 'Authentication and real-time data powered by Firebase for a seamless user experience.' },
  { label: 'Razorpay payments', detail: 'Integrated a live payment gateway to handle Pro subscriptions end-to-end.' },
  { label: 'Built with Claude Code', detail: 'Leveraged AI-assisted development to move fast and ship a polished product.' },
]

export default function Projects() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const mockupRef = useRef(null)
  const storyRef = useRef(null)
  const [storyOpen, setStoryOpen] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches

    const ctx = gsap.context(() => {
      if (!isTouch) {
        gsap.to(trackRef.current, {
          x: () => -(trackRef.current.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${trackRef.current.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.from(mockupRef.current, {
          scale: 0.85,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      }
    }, containerRef)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const el = storyRef.current
    if (!el) return
    if (storyOpen) {
      gsap.to(el, { height: el.scrollHeight, autoAlpha: 1, duration: 0.5, ease: 'power3.out' })
    } else {
      gsap.to(el, { height: 0, autoAlpha: 0, duration: 0.35, ease: 'power3.in' })
    }
  }, [storyOpen])

  return (
    <section className="projects-container" id="projects" ref={containerRef}>
      <div className="projects-track" ref={trackRef}>

        {/* Panel 1 — GridIQ */}
        <div className="project-panel">
          <div className="project-panel-inner">

            {/* Text column */}
            <div className="project-text-col">
              <p className="section-label">Projects</p>
              <h2 className="project-title">GRIDIQ</h2>
              <p className="project-subtitle">F1 Race Strategy Intelligence</p>
              <a
                href="https://instagram.com/gridiq.app"
                target="_blank"
                rel="noopener noreferrer"
                className="project-insta"
                aria-label="GridIQ on Instagram"
              >
                @gridiq.app
              </a>
              <p className="project-desc">
                A full-stack F1 companion app built solo in college — race predictor, fantasy team
                builder, H2H comparison, and a Pro subscription tier. Live with real users.
              </p>

              <div className="project-btns">
                <a
                  href="https://gridiqapp.com"
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  data-glow
                >
                  View live →
                </a>
                <button
                  className="btn-ghost"
                  onClick={() => setStoryOpen((prev) => !prev)}
                  aria-expanded={storyOpen}
                  data-cursor
                  data-glow
                >
                  {storyOpen ? 'Close story ↑' : 'Read story ↓'}
                </button>
              </div>

              {/* Accordion */}
              <div
                className="build-story"
                ref={storyRef}
                style={{ height: 0, visibility: 'hidden', opacity: 0 }}
              >
                <div className="build-story-inner">
                  {buildItems.map((item) => (
                    <div className="build-item" key={item.label}>
                      <span className="build-item-label">{item.label}</span>
                      <span className="build-item-detail">{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mockup column */}
            <div className="project-mockup-col" ref={mockupRef}>
              <div className="browser-frame">
                {/* Chrome bar */}
                <div className="browser-chrome">
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-url">gridiqapp.com</span>
                </div>

                {/* Screen */}
                <div className="browser-screen">
                  {/* Nav */}
                  <div className="mockup-nav">
                    <span className="mockup-logo">
                      <span className="mockup-logo-grid">GRID</span>
                      <span className="mockup-logo-iq">IQ</span>
                    </span>
                    <div className="mockup-nav-links">
                      <span className="mockup-nav-active">HOME</span>
                      <span>RACING GUIDE</span>
                      <span>PREDICTOR</span>
                      <span>FANTASY</span>
                      <span>H2H</span>
                    </div>
                    <span className="mockup-pro">★ PRO</span>
                  </div>

                  {/* Stat cards row */}
                  <div className="mockup-stats-row">
                    <div className="mockup-stat">
                      <div className="mockup-stat-label">NEXT RACE</div>
                      <div className="mockup-stat-value">🇺🇸 USA</div>
                      <div className="mockup-stat-sub">4 May · R4/22</div>
                    </div>
                    <div className="mockup-stat">
                      <div className="mockup-stat-label">SEASON</div>
                      <div className="mockup-stat-value">3<span style={{fontSize:'0.55rem',color:'#555'}}>/22</span></div>
                      <div className="mockup-stat-sub">ROUNDS COMPLETE</div>
                    </div>
                    <div className="mockup-stat">
                      <div className="mockup-stat-label">WDC LEADER</div>
                      <div className="mockup-stat-value mockup-teal">ANTONELLI</div>
                      <div className="mockup-stat-sub">72 PTS · Mercedes</div>
                    </div>
                    <div className="mockup-stat">
                      <div className="mockup-stat-label">WCC LEADER</div>
                      <div className="mockup-stat-value mockup-teal">Mercedes</div>
                      <div className="mockup-stat-sub">135 PTS</div>
                    </div>
                  </div>

                  {/* Drivers standings */}
                  <div className="mockup-drivers">
                    {[
                      { pos: 1, name: 'KIMI ANTONELLI',  team: 'Mercedes', pts: 72,  teal: true },
                      { pos: 2, name: 'GEORGE RUSSELL',  team: 'Mercedes', pts: 63,  teal: false },
                      { pos: 3, name: 'CHARLES LECLERC', team: 'Ferrari',  pts: 49,  teal: false },
                      { pos: 4, name: 'LEWIS HAMILTON',  team: 'Ferrari',  pts: 41,  teal: false },
                      { pos: 5, name: 'LANDO NORRIS',    team: 'McLaren',  pts: 25,  teal: false },
                    ].map(({ pos, name, team, pts, teal }) => (
                      <div className="mockup-driver-row" key={pos}>
                        <span className={`mockup-driver-pos${pos === 1 ? ' mockup-pos-1' : ''}`}>{pos}</span>
                        <span className="mockup-driver-dot" />
                        <div className="mockup-driver-info">
                          <span className={`mockup-driver-name${teal ? ' mockup-teal' : ''}`}>{name}</span>
                          <span className="mockup-driver-team">{team}</span>
                        </div>
                        <span className="mockup-driver-pts">{pts}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Panel 2 — Teaser */}
        <div className="project-panel project-panel--teaser">
          <div className="teaser-content">
            <div className="teaser-dot" />
            <p className="teaser-text">Something new is being built.</p>
          </div>
        </div>

      </div>
    </section>
  )
}
