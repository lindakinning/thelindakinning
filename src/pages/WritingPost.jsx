import { useParams, Link, Navigate } from 'react-router-dom'
import { marked } from 'marked'
import styles from './WritingPost.module.css'

// Load all markdown files as raw strings (Vite 5+ syntax)
const rawFiles = import.meta.glob('../content/writing/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseMd(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: '' }
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
  return { data, body: match[2].trim() }
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function WritingPost() {
  const { slug } = useParams()

  const matchKey = Object.keys(rawFiles).find((k) => k.endsWith(`/${slug}.md`))
  if (!matchKey) return <Navigate to="/writing" replace />

  const { data, body } = parseMd(rawFiles[matchKey])
  const html = marked.parse(body)

  return (
    <div className={styles.page}>

      {/* ── BACK LINK ── */}
      <div className={styles.backBar}>
        <Link to="/writing" className={styles.backLink}>← Back to writing</Link>
      </div>

      {/* ── ARTICLE HEADER ── */}
      <div className={styles.headerOuter}>
        <header className={styles.articleHeader}>
          <span className={styles.tagPill}>{data.tag}</span>
          <h1 className={styles.articleTitle}>{data.title}</h1>
          <p className={styles.articleMeta}>
            {formatDate(data.date)} · {data.readTime}
          </p>
        </header>
      </div>

      {/* ── ARTICLE BODY ── */}
      <div className={styles.bodyOuter}>
        <div
          className={styles.articleBody}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* ── POST FOOTER ── */}
        <div className={styles.postFooter}>
          <Link to="/writing" className={styles.allWritingBtn}>← All writing</Link>
        </div>
      </div>

    </div>
  )
}
