// components/GameHeader.js
// Persistent game header — fixed below the nav.
// Left:  game title + stage/counter stacked
// Right: Puzzles 🧩 · Log · Bag 🎒 — all full height, equal tap targets

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

      {/* Right actions — Puzzles · Log · Bag — all full height */}
      <div className={styles.actions}>

        <button className={styles.actionBtn} onClick={onPuzzleOpen} title="Puzzles">
          <span className={styles.actionEmoji}>🧩</span>
          <span className={styles.actionLabel}>Puzzles</span>
        </button>

        <button className={styles.actionBtn} onClick={onLogOpen} title="Stage log">
          <span className={styles.actionEmoji}>📋</span>
          <span className={styles.actionLabel}>Log</span>
        </button>

        <button className={styles.actionBtn} onClick={onBagOpen} title="Kin Sack">
          <span className={styles.actionEmoji}>🎒</span>
          <span className={styles.actionLabel}>Sack</span>
        </button>

      </div>
    </div>
  )
}
