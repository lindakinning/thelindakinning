import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { currentlyRows } from '../content/currently'
import styles from './Home.module.css'

import lindaPhoto from '../assets/linda.jpg'

const BREADCRUMBS = ['Theatre', 'AI Research', 'Tokyo', 'Venture', 'Chicago']

const WORK_CARDS = [
  {
    number: '01',
    bg: 'terra',
    title: 'Venture & Investing',
    teaser: "Pragmatic optimist backing founders who believe the world can be better tomorrow than it is today — and are building like it.",
  },
  {
    number: '02',
    bg: 'yellow',
    title: 'AI Build & Strategy',
    teaser: 'Custom agents, tools, and workflows for orgs that think and work in systems.',
  },
  {
    number: '03',
    bg: 'linen',
    title: 'Writing & Ideas',
    teaser: 'Public Interest AI. Attention economics. What it means to build responsibly in a fast world.',
  },
  {
    number: '04',
    bg: 'blush',
    title: 'Programs & People',
    teaser: 'Global fellowships, innovation challenges, and communities built to move people and ideas forward.',
  },
]


export default function Home() {
  const navigate = useNavigate()
  const [breadcrumbsActive, setBreadcrumbsActive] = useState(false)
  const [highlightActive, setHighlightActive] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  useEffect(() => {
    const t1 = setTimeout(() => setBreadcrumbsActive(true), 200)
    // 6 words × 300ms stagger + 600ms for last animation to finish
    const t2 = setTimeout(() => setHighlightActive(true), 200 + BREADCRUMBS.length * 300 + 600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>

          <div className={styles.breadcrumbs} aria-label="Background sequence">
            {BREADCRUMBS.map((word, i) => (
              <span key={word} className={styles.breadcrumbItem}>
                <span
                  className={`${styles.breadcrumbWord} ${breadcrumbsActive ? styles.fadeIn : ''}`}
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  {word}
                </span>
                {i < BREADCRUMBS.length - 1 && (
                  <span
                    className={`${styles.breadcrumbArrow} ${breadcrumbsActive ? styles.fadeIn : ''}`}
                    style={{ animationDelay: `${i * 0.3 + 0.15}s` }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </span>
            ))}
          </div>

          <div className={styles.heroNameBlock}>
            <h1 className={styles.heroName}>
              <span className={styles.heroFirst}>Linda /</span>
              <span className={`${styles.heroLast} ${highlightActive ? styles.heroLastHighlighted : ''}`}>
                Kinning
              </span>
            </h1>
          </div>

          <blockquote className={styles.statement}>
          I've spent the past 10+ years bringing ideas, products, and communities to life 
          in domains ranging from theatre, AI research, to startups in the US and Asia. 
          </blockquote>

          {/* TAG STYLE OPTION A — swap here (inactive)
          <div className={styles.tagsA}>
            <span className={styles.tagAVenture}>Venture</span>
            <span className={styles.tagADot} aria-hidden="true">·</span>
            <span className={styles.tagADefault}>AI Strategy</span>
            <span className={styles.tagADot} aria-hidden="true">·</span>
            <span className={styles.tagADefault}>Product</span>
            <span className={styles.tagADot} aria-hidden="true">·</span>
            <span className={styles.tagADefault}>Writing</span>
          </div>
          */}

          {/* TAG STYLE OPTION B — swap here (active) */}
          <div className={styles.tagsB}>
            <span className={styles.tagBTerra}>Venture</span>
            <span className={styles.tagBYellow}>AI Strategy</span>
            <span className={styles.tagBBlush}>Product</span>
            <span className={styles.tagBInk}>Writing</span>
          </div>

          {/* TAG STYLE OPTION C — swap here (comment out Option A above and uncomment below)
          <p className={styles.tagsC}>Venture, AI Strategy, Product &amp; Writing</p>
          */}
        </div>

        <div className={styles.heroRight}>
          <div
            className={styles.photoPanel}
            role="img"
            aria-label="Linda Kinning"
            style={{ backgroundImage: `url(${lindaPhoto})` }}
          />
          <div className={styles.photoOverlay} aria-hidden="true" />
          <div className={styles.locationBadge}>
            <span>Chicago, IL</span>
          </div>
        </div>
      </section>

      {/* ── WORK SECTION ── */}
      <section className={styles.workSection}>
        <div className={styles.workHeader}>
          <h2 className={styles.workTitle}>Ideas are easy. I do the hard part.</h2>
          <p className={styles.workHint}>Hover to explore →</p>
        </div>
        <div className={styles.workGrid}>
          {WORK_CARDS.map((card, i) => (
            <div
              key={card.number}
              className={`${styles.workCard} ${styles[`workCard_${card.bg}`]} ${hoveredCard === i ? styles.workCardHovered : ''}`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate('/work')}
              style={{ cursor: 'pointer' }}
            >
              <span className={styles.cardNum}>{card.number}</span>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardTeaser}>{card.teaser}</p>
              </div>
              <span className={styles.cardArrow} aria-hidden="true">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CURRENTLY ── */}
      <section className={styles.currentlySection}>
        <div className={styles.currentlyHeader}>
          <h2 className={styles.currentlyTitle}>Currently</h2>
          <span className={styles.currentlyBadge}>Updated May 2026</span>
        </div>
        <div className={styles.currentlyList}>
          {currentlyRows.map((row) => (
            <div key={row.id} className={styles.currentlyRow}>
              <div className={styles.currentlyLabel}>
                <span
                  className={styles.currentlyDot}
                  style={{ backgroundColor: row.dot }}
                  aria-hidden="true"
                />
                <span className={styles.currentlyLabelText}>{row.label}</span>
              </div>
              <p className={styles.currentlyText}>
                {row.before && (
                  <span className={styles.currentlyBefore}>{row.before}</span>
                )}
                {row.text}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
