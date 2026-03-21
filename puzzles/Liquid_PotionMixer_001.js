// shared/puzzles/PotionMixer.js
// Reusable potion colour mixing puzzle template.
// Props:
//   config  — { maxDrops: number, answer: {R,G,B}, target: { color: string, label: string }, solvedMessage: string }
//   onSolve — called when correct formula submitted
//   onWrong — called when wrong formula submitted

import { useState } from 'react'
import styles from './Puzzles.module.css'

const VIAL_COLORS = {
  R: { hex: '#8c3d3d', label: 'Red' },
  B: { hex: '#3d5a8c', label: 'Blue' },
  Y: { hex: '#8c7a3d', label: 'Yellow' },
}

function mixColor(drops) {
  const t = drops.R + drops.B + drops.Y
  if (!t) return 'transparent'
  const nr = drops.R / t, nb = drops.B / t, ny = drops.Y / t
  const r = Math.min(255, Math.round(nr * 140 + nb * 61 + ny * 140))
  const g = Math.min(255, Math.round(nr * 61 + nb * 90 + ny * 122))
  const b = Math.min(255, Math.round(nr * 61 + nb * 140 + ny * 61))
  return `rgb(${r},${g},${b})`
}

export default function PotionMixer({ config, onSolve, onWrong }) {
  const { maxDrops = 4, answer, target, solvedMessage } = config
  const [drops, setDrops] = useState({ R: 0, B: 0, Y: 0 })
  const [solved, setSolved] = useState(false)

  function pour(color) {
    if (drops[color] >= maxDrops) return
    setDrops(prev => ({ ...prev, [color]: prev[color] + 1 }))
  }

  function reset() {
    setDrops({ R: 0, B: 0, Y: 0 })
  }

  function submit() {
    const correct = Object.keys(answer).every(k => drops[k] === answer[k])
    if (correct) {
      setSolved(true)
      onSolve && onSolve()
    } else {
      onWrong && onWrong()
    }
  }

  const total = drops.R + drops.B + drops.Y
  const mixHeight = Math.min((total / maxDrops) * 90, 90)

  if (solved) {
    return (
      <div className={styles.solvedBox}>
        <div className={styles.solvedTitle}>Formula matched</div>
        <div className={styles.solvedMsg}>{solvedMessage}</div>
      </div>
    )
  }

  return (
    <div className={styles.puzzleWrap}>
      <div className={styles.targetRow}>
        <span className={styles.targetLabel}>Target</span>
        <div className={styles.targetSwatch} style={{ background: target.color }} />
        <span className={styles.targetName}>{target.label}</span>
      </div>
      <div className={styles.vialsRow}>
        {['R', 'B', 'Y'].map(c => (
          <div key={c} className={styles.vialCol}>
            <div className={styles.vialOuter}>
              <div className={styles.vialFill} style={{
                height: `${((maxDrops - drops[c]) / maxDrops) * 100}%`,
                background: VIAL_COLORS[c].hex,
              }} />
            </div>
            <button className={styles.vialBtn} onClick={() => pour(c)}>+</button>
            <div className={styles.vialLbl} style={{ color: VIAL_COLORS[c].hex }}>{VIAL_COLORS[c].label}</div>
          </div>
        ))}
        <div className={styles.vDivider} />
        <div className={styles.mixCol}>
          <div className={styles.mixOuter}>
            <div className={styles.mixFill} style={{
              height: `${mixHeight}%`,
              background: total ? mixColor(drops) : 'transparent',
            }} />
          </div>
          <div className={styles.mixLbl}>Mix</div>
        </div>
      </div>
      <button className={styles.submitBtn} onClick={submit}>Submit formula</button>
      <button className={styles.resetBtn} onClick={reset}>Reset</button>
    </div>
  )
}
