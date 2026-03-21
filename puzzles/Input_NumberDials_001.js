// shared/puzzles/NumberDials.js
// Reusable spinning number dials puzzle template.
// Props:
//   config  — { digits: number, scramble: number[], answer: number[] }
//   onSolve — called when correct answer submitted
//   onWrong — called when wrong answer submitted

import { useState } from 'react'
import styles from './Puzzles.module.css'

export default function NumberDials({ config, onSolve, onWrong }) {
  const { digits, scramble, answer, solvedMessage } = config
  const [values, setValues] = useState([...scramble])
  const [solved, setSolved] = useState(false)

  function change(i, dir) {
    const next = [...values]
    next[i] = (next[i] + dir + 10) % 10
    setValues(next)
  }

  function submit() {
    const correct = answer.every((v, i) => values[i] === v)
    if (correct) {
      setSolved(true)
      onSolve && onSolve()
    } else {
      onWrong && onWrong()
    }
  }

  if (solved) {
    return (
      <div className={styles.solvedBox}>
        <div className={styles.solvedTitle}>Confirmed</div>
        <div className={styles.solvedMsg}>{solvedMessage}</div>
      </div>
    )
  }

  return (
    <div className={styles.puzzleWrap}>
      <div className={styles.dials}>
        {values.map((v, i) => (
          <div key={i} className={styles.dial}>
            <button className={styles.dialBtn} onClick={() => change(i, 1)}>▲</button>
            <div className={styles.dialDigit}>{v}</div>
            <button className={styles.dialBtn} onClick={() => change(i, -1)}>▼</button>
          </div>
        ))}
      </div>
      <button className={styles.submitBtn} onClick={submit}>Unlock</button>
    </div>
  )
}
