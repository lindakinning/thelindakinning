import { useState } from 'react'
import { timelineEntries } from '../content/timeline'
import styles from './Experience.module.css'

const TAG_CONFIG = {
  venture:   { bg: '#C4502A', color: '#ffffff',  label: 'Venture' },
  ai:        { bg: '#E8C547', color: '#1A1A1A',  label: 'AI' },
  product:   { bg: '#F0D5C8', color: '#1A1A1A',  label: 'Product' },
  community: { bg: '#1A1A1A', color: '#F5F2EB',  label: 'Community' },
  early:     { bg: '#888888', color: '#ffffff',   label: 'Origin' },
}

const FILTER_TABS = [
  { label: 'All of it',           value: 'all' },
  { label: 'Venture & Investing', value: 'venture' },
  { label: 'AI & Research',       value: 'ai' },
  { label: 'Product & Build',     value: 'product' },
  { label: 'Community',           value: 'community' },
  { label: 'Origin Story',        value: 'early' },
]

const YEAR_ORDER = ['Now', '2023', '2021', '2020', '2019', '2018', '2013', 'The Beginning']

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [expanded, setExpanded] = useState(new Set())

  const filteredEntries =
    activeFilter === 'all'
      ? timelineEntries
      : timelineEntries.filter((e) => e.tags.includes(activeFilter))

  const byYear = filteredEntries.reduce((acc, entry) => {
    if (!acc[entry.year]) acc[entry.year] = []
    acc[entry.year].push(entry)
    return acc
  }, {})

  const orderedYears = YEAR_ORDER.filter((y) => byYear[y])

  const toggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className={styles.page}>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>What I've Done</h1>
        <p className={styles.pageSubtitle}>The whole story — from the backyard to the boardroom</p>
      </div>

      <div className={styles.filterRow} role="tablist">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeFilter === tab.value}
            className={`${styles.filterTab} ${activeFilter === tab.value ? styles.filterTabActive : ''}`}
            onClick={() => { setActiveFilter(tab.value); setExpanded(new Set()) }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.timeline}>
        {orderedYears.map((year) => (
          <div key={year} className={styles.yearGroup}>
            {byYear[year].map((entry, idx) => {
              const isExpanded = expanded.has(entry.id)
              const isVenture = entry.tags.includes('venture')

              return (
                <div key={entry.id} className={styles.row}>

                  {/* Year label — only on first entry of group */}
                  <div className={styles.yearCol}>
                    {idx === 0 && (
                      <span className={styles.yearLabel}>{year}</span>
                    )}
                  </div>

                  {/* Vertical line + dot */}
                  <div className={styles.lineCol}>
                    <div className={styles.lineTrack}>
                      <button
                        className={[
                          styles.dot,
                          isVenture  ? styles.dotVenture  : '',
                          isExpanded ? styles.dotExpanded : '',
                        ].join(' ')}
                        onClick={() => toggle(entry.id)}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${entry.title}`}
                      />
                    </div>
                  </div>

                  {/* Entry content */}
                  <div className={styles.entryCol}>
                    <div className={`${styles.entry} ${isExpanded ? styles.entryOpen : ''}`}>

                      <div
                        className={styles.entryHeader}
                        onClick={() => toggle(entry.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && toggle(entry.id)}
                        aria-expanded={isExpanded}
                      >
                        <div className={styles.entryMeta}>
                          <span className={styles.yearMobile}>{year}</span>
                          <div className={styles.tagRow}>
                            {entry.tags.map((tag) => (
                              <span
                                key={tag}
                                className={styles.tagPill}
                                style={{
                                  backgroundColor: TAG_CONFIG[tag]?.bg,
                                  color: TAG_CONFIG[tag]?.color,
                                }}
                              >
                                {TAG_CONFIG[tag]?.label}
                              </span>
                            ))}
                          </div>
                          <span className={styles.entryDate}>{entry.date}</span>
                        </div>

                        <div className={styles.titleRow}>
                          <h3 className={styles.entryTitle}>{entry.title}</h3>
                          <span
                            className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}
                            aria-hidden="true"
                          >
                            ↓
                          </span>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className={styles.entryBody}>
                          <p className={styles.bodyText}>{entry.body}</p>
                          <div className={styles.learnedBlock}>
                            <p className={styles.learnedLabel}>Learned:</p>
                            <p className={styles.learnedText}>{entry.learned}</p>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        ))}
      </div>

    </div>
  )
}
