// components/GameHeader.js
// Persistent game header — fixed below the nav.
// Left group:  [Title + Stage stacked] [Log — full height, bordered right]
// Right group: [Puzzles 🧩] [Sack 🎒] — full height

import styles from './GameHeader.module.css'

export default function GameHeader({
  puzzles,
  progress,
  puzzleCounter,
  onBagOpen,
  onLogOpen,
  onPuzzleOpen,
  topOffset = 0,
}) {
  const activeStage = puzzles.find(p =>
    progress[p.stage] === 'active' || progress[p.stage] === 'location_verified'
  )?.stage

  return (
    <div
      className={styles.header}
      style={{ '--header-top': `${56 + topOffset}px` }}
    >

      {/* Left group — title+stage AND Log button side by side */}
      <div className={styles.leftGroup}>

        <div className={styles.titleBlock}>
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

        {/* Log — full height, sits right of title, left divider */}
        <button className={styles.logBtn} onClick={onLogOpen} title="Stage log">
          <span className={styles.logEmoji}>📋</span>
          <span className={styles.logLabel}>Log</span>
        </button>

      </div>

      {/* Right group — Puzzles + Sack */}
      <div className={styles.rightGroup}>

        <button className={styles.actionBtn} onClick={onPuzzleOpen} title="Puzzles">
          <span className={styles.actionEmoji}>🧩</span>
          <span className={styles.actionLabel}>Puzzles</span>
        </button>

        <button className={styles.actionBtn} onClick={onBagOpen} title="Kin Sack">
          <span className={styles.actionEmoji}>🎒</span>
          <span className={styles.actionLabel}>Sack</span>
        </button>

      </div>
    </div>
  )
}
