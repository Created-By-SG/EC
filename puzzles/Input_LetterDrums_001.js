// shared/puzzles/LetterDrums.js
import { useState } from 'react'
import styles from './Puzzles.module.css'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function LetterDrums({ config, onSolve, onWrong }) {
  const { answer, scramble, solvedMessage } = config

  const [positions, setPositions] = useState(
    scramble.map(l => {
      const idx = LETTERS.indexOf(l.toUpperCase())
      return idx === -1 ? 26 : idx + 26
    })
  )
  const [solved, setSolved] = useState(false)
  const [wrong, setWrong]   = useState(false)

  function spin(ri, dir) {
    if (solved) return
    const next = [...positions]
    next[ri] = ((next[ri] + dir - 26 + 78) % 26) + 26
    setPositions(next)
  }

  function submit() {
    if (solved) return
    // Case-insensitive comparison
    const correct = answer.every((v, i) =>
      LETTERS[positions[i] % 26] === v.toString().toUpperCase()
    )
    if (correct) {
      setSolved(true)
      onSolve && onSolve()
    } else {
      setWrong(true)
      onWrong && onWrong()
      setTimeout(() => setWrong(false), 600)
    }
  }

  if (solved) {
    return (
      <div className={styles.solvedBox}>
        <div className={styles.solvedTitle}>Unlocked</div>
        <div className={styles.solvedMsg}>{solvedMessage}</div>
      </div>
    )
  }

  return (
    <div className={styles.puzzleWrap}>
      <div className={styles.drums}>
        {positions.map((pos, ri) => {
          const ext = [...LETTERS, ...LETTERS, ...LETTERS]
          const offset = -pos * 36
          return (
            <div key={ri} className={styles.drumWrap}>
              <button className={styles.drumArrow} onClick={() => spin(ri, -1)}>▲</button>
              <div className={`${styles.drum} ${wrong ? styles.drumWrong : ''}`}>
                <div className={styles.drumInner} style={{ transform: `translateY(${offset}px)` }}>
                  {ext.map((l, i) => (
                    <div key={i} className={`${styles.drumCell} ${i === pos ? styles.drumCellActive : ''}`}>{l}</div>
                  ))}
                </div>
                <div className={styles.drumLine} style={{ top: 36 }} />
                <div className={styles.drumLine} style={{ top: 72 }} />
              </div>
              <button className={styles.drumArrow} onClick={() => spin(ri, 1)}>▼</button>
            </div>
          )
        })}
      </div>
      <button
        className={`${styles.submitBtn} ${wrong ? styles.submitBtnWrong : ''}`}
        onClick={submit}
      >
        Unlock
      </button>
    </div>
  )
}
