import './Work.css'

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
        </div>
      </section>

      {/* ══════════════════════════════════
          01 — BUILD
      ══════════════════════════════════ */}
      <section className="wt-section">
        <div className="wt-header">
          <span className="wt-number">01</span>
          <h2 className="wt-title">I <span className="wt-highlight">BUILD</span> things.</h2>
        </div>

        <div className="wt-grid">

          <div className="wt-tile wt-tile-wide">
            <div className="wt-meta">whogovernsthemachine.com</div>
            <div className="wt-card-title">Who Governs the Machine?</div>
            <div className="wt-desc">Interactive field guide to AI governance — intervention maps, legal layer, live policy tracker, and a framework for building your own position.</div>
            <div className="wt-footer">
              <span className="wt-pill">Live · Open now</span>
              <a className="wt-link" href="https://whogovernsthemachine.com" target="_blank" rel="noopener noreferrer">Visit site →</a>
            </div>
          </div>

          <div className="wt-tile wt-tile-accent">
            <div className="wt-meta">Manila · 2021–23</div>
            <div className="wt-card-title">Inna Circle</div>
            <div className="wt-desc">Trustworthy on-demand childcare marketplace. Led end-to-end pre-seed venture design — user research, prototyping, MVP, GTM.</div>
            <div className="wt-footer">
              <span className="wt-pill wt-pill-dark">Live product</span>
              <a className="wt-link" href="https://theinnacircle.com/" target="_blank" rel="noopener noreferrer">theinnacircle.com →</a>
            </div>
          </div>

          <div className="wt-tile wt-tile-accent">
            <div className="wt-meta">Kinning Consulting · Chicago</div>
            <div className="wt-card-title">AI Assistant Coming Soon</div>
            <div className="wt-desc">Something is in the works.</div>
            <div className="wt-footer">
              <span className="wt-pill">In progress</span>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════
          02 — CONVENE
      ══════════════════════════════════ */}
      <section className="wt-section">
        <div className="wt-header">
          <span className="wt-number">02</span>
          <h2 className="wt-title">I <span className="wt-highlight">CONVENE</span> things.</h2>
        </div>

        <div className="wt-grid">

          <div className="wt-tile wt-tile-wide">
            <div className="wt-meta">Rhodes Forum · Oxford University · 2023</div>
            <div className="wt-card-title">Pathways to Responsible Technology Investment</div>
            <div className="wt-desc">Panelist at the Tech and Society Forum discussing how strategic investments can drive innovation while delivering financial returns and positive societal impact.</div>
            <div className="wt-footer">
              <span className="wt-pill wt-pill-dark">Panelist</span>
              <a className="wt-link" href="https://vimeo.com/showcase/10796761?video=884331252" target="_blank" rel="noopener noreferrer">Watch panel →</a>
            </div>
          </div>

          <div className="wt-tile wt-tile-accent">
            <div className="wt-meta">Equitech Futures · Feb 2025</div>
            <div className="wt-card-title">Africa Utility Data Collaborative — Kenya Pilot</div>
            <div className="wt-desc">Multi-country program spanning 20 water utilities and multiple governments to advance data-driven infrastructure.</div>
            <div className="wt-footer">
              <a className="wt-link" href="https://www.equitechfutures.com/articles/africa-utility-data-collaborative-successful-kenya-pilot-program-in-partnership-with-equitech-futures-and-athena-infonomics" target="_blank" rel="noopener noreferrer">Read more →</a>
            </div>
          </div>

          <div className="wt-tile wt-tile-accent">
            <div className="wt-meta">Rhodes Trust · Annual</div>
            <div className="wt-card-title">Kevin Xu Innovation Challenge</div>
            <div className="wt-desc">Partnership with the Rhodes Trust to support global finalists building AI products for social benefit. $40K in grants, 50+ applications evaluated.</div>
            <div className="wt-footer">
              <a className="wt-link" href="https://www.rhodeshouse.ox.ac.uk/unlikeminded/the-kevin-xu-innovation-challenge-2025/" target="_blank" rel="noopener noreferrer">See challenge →</a>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════
          03 — GROW
      ══════════════════════════════════ */}
      <section className="wt-section">
        <div className="wt-header">
          <span className="wt-number">03</span>
          <h2 className="wt-title">I <span className="wt-highlight">GROW</span> things.</h2>
        </div>

        <div className="wt-grid">

          <div className="wt-tile wt-tile-wide">
            <div className="wt-meta">Oxford Innovation Institute · 30+ builders · 15 countries</div>
            <div className="wt-card-title">One of them became a real company.</div>
            <div className="wt-desc">Taught a 4-week entrepreneurship course at Oxford with Equitech. Teams of young people from around the world came together and built startups. One kept going — it's Koan.</div>
            <div className="wt-footer">
              <a className="wt-link" href="https://koanlearn.com" target="_blank" rel="noopener noreferrer">Visit Koan →</a>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
