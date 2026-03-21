// components/GameHeader.js
// Persistent two-row game header — sticks below the nav for the entire session.
//
// Layout:
//   Left  — game title / stage label / LOG inline button
//   Right — PUZZLES button / BAG button
//
// Puzzle panel:
//   Slides down from the header when PUZZLES is tapped.
//   Shows story and geo puzzle status for the active stage (and the next
//   stage if it exists), so players always know what's left to do.
//   Tapping a puzzle row calls onPuzzleSelect(stage, type, storyIndex).
//
// Bitmask convention (puzzleMasks[stage]):
//   lower byte (& 0xFF) = storyIndex — how many story sub-puzzles are done
//   bit 8 (& 0x100)     = geo puzzle done

import { useState } from 'react'
import { getStage } from '../game'
import styles from './GameHeader.module.css'

// ─── Puzzle panel ─────────────────────────────────────────────────────────────

function PuzzlePanel({ puzzles, progress, puzzleMasks, onPuzzleSelect, onClose }) {

  // Show active stage + the next one (so players can see what's coming)
  const activeIdx = puzzles.findIndex(p =>
    progress[p.stage] === 'active' || progress[p.stage] === 'location_verified'
  )
  const visibleStages = puzzles
    .slice(Math.max(0, activeIdx), activeIdx + 2)
    .filter(p => progress[p.stage] !== 'locked')

  if (!visibleStages.length) return null

  return (
    <>
      <div className={styles.panelBackdrop} onClick={onClose} />
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>Puzzles</span>
          <button className={styles.panelClose} onClick={onClose}>✕</button>
        </div>

        {visibleStages.map(stageDef => {
          const stage     = stageDef.stage
          const mask      = puzzleMasks?.[stage] ?? 0
          const storyIdx  = mask & 0xFF        // how many story sub-puzzles completed
          const geoDone   = !!(mask & 0x100)
          const stageDone = progress[stage] === 'solved'
          const gameStage = getStage(stage)
          const storyPool = gameStage?.storyPool ?? []
          const geoPool   = gameStage?.geoPool   ?? []

          return (
            <div key={stage} className={styles.stageBlock}>
              <div className={styles.stageBlockLabel}>Stage {stage}</div>

              {/* Story puzzles — one row per sub-puzzle in the pool */}
              {storyPool.map((puzzle, i) => {
                const done    = stageDone || i < storyIdx
                const current = !stageDone && i === storyIdx
                const locked  = !stageDone && i > storyIdx
                return (
                  <button
                    key={i}
                    className={[
                      styles.puzzleRow,
                      done    ? styles.puzzleRowDone   : '',
                      current ? styles.puzzleRowActive : '',
                      locked  ? styles.puzzleRowLocked : '',
                    ].join(' ')}
                    onClick={() => !locked && !done && onPuzzleSelect?.(stage, 'story', i)}
                    disabled={locked || done}
                  >
                    <span className={styles.puzzleStatus}>
                      {done ? '✓' : current ? '→' : '·'}
                    </span>
                    <span className={styles.puzzleLabel}>
                      {puzzle.buttonLabel || `Story puzzle ${i + 1}`}
                    </span>
                    {current && <span className={styles.puzzleBadge}>In progress</span>}
                  </button>
                )
              })}

              {/* Geo puzzle */}
              {geoPool.length > 0 && (() => {
                const done    = stageDone || geoDone
                const current = !stageDone && !geoDone && storyIdx >= storyPool.length
                const locked  = !stageDone && !geoDone && storyIdx < storyPool.length
                return (
                  <button
                    key="geo"
                    className={[
                      styles.puzzleRow,
                      done    ? styles.puzzleRowDone   : '',
                      current ? styles.puzzleRowActive : '',
                      locked  ? styles.puzzleRowLocked : '',
                    ].join(' ')}
                    onClick={() => !locked && !done && onPuzzleSelect?.(stage, 'geo', 0)}
                    disabled={locked || done}
                  >
                    <span className={styles.puzzleStatus}>
                      {done ? '✓' : current ? '→' : '·'}
                    </span>
                    <span className={styles.puzzleLabel}>
                      {geoPool[0].buttonLabel || 'Geo puzzle'}
                    </span>
                    {current && <span className={styles.puzzleBadge}>In progress</span>}
                    {locked  && <span className={styles.puzzleBadge}>Story first</span>}
                  </button>
                )
              })()}

              {/* Placeholder for stages not yet designed */}
              {storyPool.length === 0 && geoPool.length === 0 && (
                <div className={styles.puzzleEmpty}>Puzzles coming soon</div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function GameHeader({
  puzzles,
  progress,
  puzzleMasks,
  puzzleCounter,
  onBagOpen,
  onLogOpen,
  onPuzzleSelect,
  topOffset = 0,
}) {
  const [panelOpen, setPanelOpen] = useState(false)

  const activeStage = puzzles.find(p =>
    progress[p.stage] === 'active' || progress[p.stage] === 'location_verified'
  )?.stage

  return (
    <>
      <div className={styles.header} style={{ '--header-top': `${56 + topOffset}px` }}>

        {/* Left — title, stage row with inline LOG */}
        <div className={styles.left}>
          <span className={styles.title}>Who Stole Easter?</span>
          <div className={styles.stageRow}>
            <span className={styles.stage}>
              {activeStage ? `Stage ${activeStage}` : 'Loading…'}
            </span>
            {puzzleCounter && (
              <span className={styles.counter}>{puzzleCounter}</span>
            )}
            <button className={styles.logInline} onClick={onLogOpen}>
              Log
            </button>
          </div>
        </div>

        {/* Right — puzzles toggle + bag */}
        <div className={styles.actions}>
          <button
            className={`${styles.puzzleBtn} ${panelOpen ? styles.puzzleBtnActive : ''}`}
            onClick={() => setPanelOpen(o => !o)}
            title="Puzzles"
          >
            <span className={styles.puzzleIcon}>⬡</span>
            <span className={styles.puzzleBtnLabel}>Puzzles</span>
          </button>
          <button className={styles.bagBtn} onClick={onBagOpen} title="Evidence bag">
            🎒
          </button>
        </div>

      </div>

      {panelOpen && (
        <PuzzlePanel
          puzzles={puzzles}
          progress={progress}
          puzzleMasks={puzzleMasks}
          onPuzzleSelect={(stage, type, idx) => {
            setPanelOpen(false)
            onPuzzleSelect?.(stage, type, idx)
          }}
          onClose={() => setPanelOpen(false)}
        />
      )}
    </>
  )
}
