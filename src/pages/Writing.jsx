import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Writing.module.css'

// Vite 5+ raw import syntax (replaces deprecated { as: 'raw' })
const rawFiles = import.meta.glob('../content/writing/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const data = {}
  match[1].split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) return
    const key = line.slice(0, colonIdx).trim()
    if (!key) return
    let value = line.slice(colonIdx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  })
  return data
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const allEntries = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace('.md', '')
    return { slug, ...parseFrontmatter(raw) }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

const PILLS = ['All', 'AI & Society', 'Workforce', 'Democracy & Tech', 'Venture']

const EXTERNAL_LINKS = [
  { title: 'Public Interest AI Report — Part I: Funders', year: '2025', href: 'https://www.equitechfutures.com/research-articles/public-interest-ai-for-funders' },
  { title: 'Public Interest AI Report — Part II: Policy Makers', year: '2025', href: 'https://www.equitechfutures.com/research-articles/public-interest-ai-for-policymakers' },
  { title: 'Public Interest AI Report — Part III: Technologists', year: '2025', href: 'https://www.equitechfutures.com/research-articles/public-interest-ai-for-technologists' },
  { title: 'Public Interest AI Report — Part IIII: Citizens', year: '2025', href: 'https://www.equitechfutures.com/research-articles/public-interest-ai-for-citizens' },
]

export default function Writing() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All'
      ? allEntries
      : allEntries.filter((e) => e.tag === activeFilter)

  // Assign sequential numbers before grouping so they reflect filtered order
  const numbered = filtered.map((entry, i) => ({
    ...entry,
    num: String(i + 1).padStart(2, '0'),
  }))

  // Group by year, preserving descending order
  const byYear = {}
  const yearOrder = []
  numbered.forEach((entry) => {
    const year = entry.date?.slice(0, 4) ?? '—'
    if (!byYear[year]) {
      byYear[year] = []
      yearOrder.push(year)
    }
    byYear[year].push(entry)
  })

  return (
    <div className={styles.page}>

      {/* ── PAGE HEADER ── */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          <span className={styles.titleHighlight}>What I'm thinking</span>.
        </h1>
        <p className={styles.pageSubtitle}>
          About life, business, and the future.
        </p>
      </header>

      {/* ── FILTER PILLS ── */}
      <div className={styles.filterRow}>
        <div className={styles.pills}>
          {PILLS.map((pill) => (
            <button
              key={pill}
              className={`${styles.pill} ${activeFilter === pill ? styles.pillActive : ''}`}
              onClick={() => setActiveFilter(pill)}
            >
              {pill}
            </button>
          ))}
        </div>
        <span className={styles.postCount}>
          {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── ENTRY LIST ── */}
      <div className={styles.entryList}>
        {yearOrder.map((year) => {
          const entries = byYear[year]
          if (!entries?.length) return null
          return (
            <div key={year} className={styles.yearGroup}>
              <div className={styles.yearLabel}>{year}</div>
              {entries.map((entry) => (
                <Link
                  key={entry.slug}
                  to={`/writing/${entry.slug}`}
                  className={styles.entry}
                >
                  <span className={styles.entryNum}>{entry.num}</span>
                  <div className={styles.entryBody}>
                    <h2 className={styles.entryTitle}>{entry.title}</h2>
                    <p className={styles.entryDesc}>{entry.description}</p>
                    <div className={styles.entryMeta}>
                      <span className={styles.entryTag}>{entry.tag}</span>
                      <span className={styles.entryDot} aria-hidden="true">·</span>
                      <span className={styles.entryDateRead}>
                        {formatDate(entry.date)} · {entry.readTime}
                      </span>
                    </div>
                  </div>
                  <span className={styles.entryArrow} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          )
        })}
      </div>

      {/* ── EXTERNAL LINKS ── */}
      <div className={styles.externalSection}>
        <p className={styles.externalLabel}>From Equitech Ideas</p>
        {EXTERNAL_LINKS.map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalRow}
          >
            <span className={styles.externalTitle}>{link.title}</span>
            <span className={styles.externalMeta}>{link.year} ↗</span>
          </a>
        ))}
      </div>

    </div>
  )
}
