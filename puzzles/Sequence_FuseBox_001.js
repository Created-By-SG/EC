// shared/puzzles/FuseBox.js
// Reusable fuse box sequence puzzle template.
// Props:
//   config  — { fuses: string[], answer: string[], solvedMessage: string }
//   onSolve — called when correct sequence confirmed
//   onWrong — called when wrong sequence confirmed

import { useState } from 'react'
import styles from './Puzzles.module.css'

export default function FuseBox({ config, onSolve, onWrong }) {
  const { fuses, answer, solvedMessage } = config
  const [state, setState] = useState(Object.fromEntries(fuses.map(f => [f, false])))
  const [sequence, setSequence] = useState([])
  const [solved, setSolved] = useState(false)
  const [failed, setFailed] = useState(false)

  function flip(name) {
    if (solved) return
    if (state[name]) {
      const next = { ...state, [name]: false }
      const nextSeq = sequence.filter(s => s !== name)
      setState(next)
      setSequence(nextSeq)
      setFailed(false)
    } else {
      const next = { ...state, [name]: true }
      const nextSeq = [...sequence, name]
      setState(next)
      setSequence(nextSeq)
    }
  }

  function confirm() {
    const correct = answer.every((v, i) => sequence[i] === v)
    if (correct) {
      setSolved(true)
      onSolve && onSolve()
    } else {
      setFailed(true)
      onWrong && onWrong()
    }
  }

  function reset() {
    setState(Object.fromEntries(fuses.map(f => [f, false])))
    setSequence([])
    setFailed(false)
  }

  if (solved) {
    return (
      <div className={styles.solvedBox}>
        <div className={styles.solvedTitle}>Power restored</div>
        <div className={styles.solvedMsg}>{solvedMessage}</div>
      </div>
    )
  }

  return (
    <div className={styles.puzzleWrap}>
      <div className={styles.fuseBox}>
        <div className={styles.fuseTop}>
          <div className={styles.fuseTitle}>Fuse Panel</div>
          <div className={`${styles.powerLight} ${solved ? styles.powerOn : failed ? styles.powerFail : ''}`} />
        </div>
        <div className={styles.fusesGrid}>
          {fuses.map(name => (
            <div key={name} className={styles.fuseItem} onClick={() => flip(name)}>
              <div className={styles.fuseLbl}>{name}</div>
              <div className={`${styles.fuseTrack} ${state[name] ? styles.fuseTrackOn : ''}`}>
                <div className={`${styles.fuseKnob} ${state[name] ? styles.fuseKnobUp : styles.fuseKnobDown}`} />
              </div>
              <div className={styles.fuseNum}>{state[name] ? sequence.indexOf(name) + 1 : ''}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.seqTrack}>
        {answer.map((_, i) => (
          <div key={i} className={`${styles.seqDot} ${i < sequence.length ? (sequence[i] === answer[i] ? styles.seqDotDone : styles.seqDotWrong) : ''} ${failed && sequence[i] !== answer[i] ? styles.seqDotBad : ''}`}>
            {i < sequence.length ? sequence[i].charAt(0) : i + 1}
          </div>
        ))}
      </div>
      {sequence.length === answer.length && (
        <button className={styles.submitBtn} onClick={confirm}>Confirm sequence</button>
      )}
      <button className={styles.resetBtn} onClick={reset}>Reset</button>
    </div>
  )
}
