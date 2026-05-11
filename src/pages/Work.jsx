import './Work.css'
import wgtmThumb from '../assets/wgtm-thumb.jpg'
import oxfordThumb from '../assets/oxford-thumb.jpg'

export default function Work() {
  return (
    <div className="work-page">

      {/* ── PAGE HEADER ── */}
      <section className="work-page-header">
        <div className="work-header-inner">
          <div className="work-header-left">
            <span className="work-eyebrow">Linda Kinning · Portfolio</span>
            <h1 className="work-h1">
             Let me show you<br />
              <em className="work-h1-em">what I can do</em>
            </h1>
            <p className="work-subhead">
              Five artifacts across three modes. Things I've built, convened, and grown.
            </p>
          </div>
          <div id="chat-placeholder">
            <span className="work-chat-label">AI assistant coming soon</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          MODE 01 — BUILD
      ══════════════════════════════════ */}
      <section className="work-mode-section">

        <div className="work-mode-bar">
          <div className="work-mode-bar-num">01</div>
          <div className="work-mode-bar-center">
            I <span className="work-mode-bar-word">BUILD</span> things.
          </div>
          <div className="work-mode-bar-meta">
            <span className="work-mode-verb">Ships code</span>
            <span className="work-mode-sub-text">AI · Product · Apps</span>
          </div>
        </div>

        {/* Artifact A — Who Governs the Machine */}
        <div className="work-browser-card">
          <div className="work-browser-topbar">
            <div className="work-browser-dots">
              <span className="work-dot work-dot-yellow" />
              <span className="work-dot work-dot-muted-a" />
              <span className="work-dot work-dot-muted-a" />
            </div>
            <span className="work-browser-url">whogovernsthemachine.com</span>
          </div>
          <div className="work-browser-screen">
            <img src={wgtmThumb} alt="Who Governs the Machine" className="work-screen-img" />
            <div className="work-screen-overlay" />
            <span className="work-live-badge">Live · open now</span>
            <h3 className="work-screen-title">Who Governs the Machine?</h3>
            <p className="work-screen-sub">An interactive exploration of AI governance</p>
            <a
              href="https://whogovernsthemachine.com"
              target="_blank"
              rel="noreferrer"
              className="work-screen-link"
            >
              Visit site ↗
            </a>
          </div>
        </div>

        {/* Artifact B — Inna Circle */}
        <div
          className="work-inna-card"
          onClick={() => window.open('https://theinnacircle.com', '_blank')}
        >
          <div className="work-inna-top">
            <span className="work-inna-arrow">↗</span>
            <span className="work-pill-yellow">Live product</span>
            <span className="work-card-eyebrow">Manila · 2021–23</span>
            <h3 className="work-card-title">Inna Circle</h3>
            <p className="work-card-desc">
              Trustworthy on-demand childcare marketplace. Led end-to-end pre-seed venture design —
              user research, prototyping, MVP, GTM.
            </p>
          </div>
          <div className="work-inna-divider" />
          <div className="work-inna-bottom">
            <div className="work-inna-pills">
              <span className="work-inna-pill">User research</span>
              <span className="work-inna-pill">Prototyping</span>
              <span className="work-inna-pill">MVP build</span>
              <span className="work-inna-pill">GTM</span>
            </div>
            <a
              href="https://theinnacircle.com"
              target="_blank"
              rel="noreferrer"
              className="work-inna-link"
              onClick={(e) => e.stopPropagation()}
            >
              theinnacircle.com ↗
            </a>
          </div>
        </div>

        <div className="work-outcome">
          <span className="work-outcome-arrow">→</span>
          <span className="work-outcome-text">Two live products, built from zero to shipped</span>
        </div>

      </section>

      {/* ══════════════════════════════════
          MODE 02 — CONVENE
      ══════════════════════════════════ */}
      <section className="work-mode-section">

        <div className="work-mode-bar">
          <div className="work-mode-bar-num">02</div>
          <div className="work-mode-bar-center">
            I <span className="work-mode-bar-word">CONVENE</span> things.
          </div>
          <div className="work-mode-bar-meta">
            <span className="work-mode-verb">Moves rooms</span>
            <span className="work-mode-sub-text">Programs · Stage · Policy</span>
          </div>
        </div>

        {/* Artifact A — Oxford panel */}
        <div className="work-video-card">
          <div
            className="work-video-frame"
            onClick={() => window.open('https://vimeo.com/showcase/10796761?video=884331252', '_blank')}
          >
            <img src={oxfordThumb} alt="Oxford panel" className="work-screen-img" />
            <div className="work-video-overlay" />
            <div className="work-play-btn">
              <span className="work-play-triangle" />
            </div>
          </div>
          <div className="work-video-meta">
            <div className="work-video-meta-left">
              <p className="work-video-title">
                Pathways to Responsible Technology Investment
              </p>
              <p className="work-video-sub">
                Rhodes Forum on Technology &amp; Society · Oxford University · 2023
              </p>
            </div>
            <span className="work-pill-terra">Panelist</span>
          </div>
        </div>

        {/* Artifact B — Africa Data Collaborative */}
        <div className="work-article-card">
          <div className="work-article-img-col">
            <img
              src="https://cdn.prod.website-files.com/67a615e69b452167c907effa/680799b2824cf546c5ca047d_67dbd040477bec4f192a73a3_audc-thumb.png"
              alt="Africa Utility Data Collaborative"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </div>
          <div className="work-article-body">
            <span className="work-article-source">Equitech Futures · Feb 2025</span>
            <h3 className="work-article-title">
              Africa Utility Data Collaborative — Kenya Pilot
            </h3>
            <p className="work-article-desc">
              Designed and ran a cross-government data innovation program supporting water
              utilities across Africa to adopt data-driven decision making.
            </p>
            <div className="work-stats-row">
              <div className="work-stat">
                <span className="work-stat-num">20</span>
                <span className="work-stat-label">Water utilities</span>
              </div>
              <div className="work-stat">
                <span className="work-stat-num">4+</span>
                <span className="work-stat-label">Governments</span>
              </div>
              <div className="work-stat">
                <span className="work-stat-num">1</span>
                <span className="work-stat-label">Successful pilot</span>
              </div>
            </div>
            <a
              href="https://www.equitechfutures.com/articles/africa-utility-data-collaborative-successful-kenya-pilot-program-in-partnership-with-equitech-futures-and-athena-infonomics"
              target="_blank"
              rel="noreferrer"
              className="work-article-link"
            >
              Read the article ↗
            </a>
          </div>
        </div>

        <div className="work-outcome">
          <span className="work-outcome-arrow">→</span>
          <span className="work-outcome-text">
            Oxford stage to Kenya pilot — two very different rooms, same impact
          </span>
        </div>

      </section>

      {/* ══════════════════════════════════
          MODE 03 — GROW
      ══════════════════════════════════ */}
      <section className="work-mode-section">

        <div className="work-mode-bar">
          <div className="work-mode-bar-num">03</div>
          <div className="work-mode-bar-center">
            I <span className="work-mode-bar-word">GROW</span> things.
          </div>
          <div className="work-mode-bar-meta">
            <span className="work-mode-verb">Makes founders</span>
            <span className="work-mode-sub-text">Venture · Teaching · Fellows</span>
          </div>
        </div>

        {/* Artifact — Koan Learn */}
        <div className="work-dark-card">
          <div className="work-dark-top">
            <p className="work-dark-quote">
              I taught a 4-week entrepreneurship course at Oxford with Equitech. Teams of young
              people from around the world came together and built startups. One of them kept going.
            </p>
            <span className="work-pill-real">Real outcome</span>
          </div>
          <div className="work-dark-bottom">
            <div>
              <p className="work-dark-title">
                Koan Learn — AI That Teaches Students to Think
              </p>
              <p className="work-dark-sub">
                An LMS that captures every revision, pause, and breakthrough. Pilot programs open
                Spring 2026.
              </p>
            </div>
            <a
              href="https://koanlearn.com"
              target="_blank"
              rel="noreferrer"
              className="work-btn-terra"
            >
              Visit Koan ↗
            </a>
          </div>
        </div>

        <div className="work-outcome">
          <span className="work-outcome-arrow">→</span>
          <span className="work-outcome-text">
            Oxford Innovation Institute · 30+ builders · 15 countries · one became a real company
          </span>
        </div>

      </section>

    </div>
  )
}
