import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand} onClick={close}>Linda Kinning</Link>
      <button
        className={styles.hamburger}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? '✕' : '☰'}
      </button>
      <ul className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
        <li><Link to="/experience" onClick={close}>Experience</Link></li>
        <li><Link to="/writing" onClick={close}>Writing</Link></li>
        <li><Link to="/work" onClick={close}>Portfolio</Link></li>
        <li><a href="mailto:thelindakinning@gmail.com" onClick={close}>Hello</a></li>
      </ul>
    </nav>
  )
}
