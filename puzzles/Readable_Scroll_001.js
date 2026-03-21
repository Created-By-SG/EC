// shared/puzzles/Scroll.js
// Reusable readable scroll / document item template.
// Props:
//   config — { title: string, text: string, signature: string }

import { useState } from 'react'
import styles from './Puzzles.module.css'

export default function Scroll({ config }) {
  const { title, text, signature } = config
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.scrollOuter} onClick={() => setOpen(o => !o)}>
      <div className={styles.scrollClosed}>
        <span className={styles.scrollIcon}>📜</span>
        <span className={styles.scrollClosedLbl}>Tap to open</span>
        <span className={`${styles.scrollChevron} ${open ? styles.scrollChevronOpen : ''}`}>▼</span>
      </div>
      <div className={`${styles.scrollContent} ${open ? styles.scrollContentOpen : ''}`}>
        <div className={styles.scrollPaper}>
          <div className={styles.scrollPaperTitle}>{title}</div>
          <div className={styles.scrollPaperText}>{text}</div>
          {signature && <div className={styles.scrollPaperSig}>— {signature}</div>}
        </div>
      </div>
    </div>
  )
}
