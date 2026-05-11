import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <h2 className={styles.name}>
          <span className={styles.nameFirst}>Linda /</span>
          <span className={styles.nameLast}>
            Kinning
            <span className={styles.highlight} aria-hidden="true" />
          </span>
        </h2>
        <p className={styles.tagline}>
          Builder across domains. Operator by nature. Investor by conviction.
          <br />
          Chicago-based, globally minded.
        </p>
      </div>

      <div className={styles.right}>
        <p className={styles.connectLabel}>Want to connect?</p>
        <p className={styles.connectQuote}>Let's see what we can make together.</p>
        <a href="mailto:thelindakinning@gmail.com" className={styles.connectBtn}>
          Say hello →
        </a>
      </div>
    </footer>
  )
}
