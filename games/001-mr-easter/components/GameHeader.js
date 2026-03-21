// components/GameHeader.js
// Persistent two-row game header — sticks below the nav for the entire session.
// Row 1: game title + bag icon
// Row 2: stage label + puzzle counter + log button

import styles from './GameHeader.module.css'

export default function GameHeader({ puzzles, progress, puzzleCounter, onBagOpen, onLogOpen, topOffset = 0 }) {
  const activeStage = puzzles.find(p =>
    progress[p.stage] === 'active' || progress[p.stage] === 'location_verified'
  )?.stage

  return (
    <div className={styles.header} style={{ '--header-top': `${56 + topOffset}px` }}>

      {/* Left — title + stage stacked */}
      <div className={styles.left}>
        <span className={styles.title}>Who Stole Easter?</span>
        <div className={styles.stageRow}>
          <span className={styles.stage}>
            {activeStage ? `Stage ${activeStage}` : 'Loading…'}
          </span>
          {puzzleCounter && (
            <span className={styles.counter}>{puzzleCounter}</span>
          )}
        </div>
      </div>

      {/* Right actions — Log then Bag, both full height */}
      <div className={styles.actions}>
        <button className={styles.logBtn} onClick={onLogOpen}>
          <span className={styles.logLabel}>Log</span>
        </button>
        <button className={styles.bagBtn} onClick={onBagOpen} title="Evidence bag">
          🎒
        </button>
      </div>

    </div>
  )
}
