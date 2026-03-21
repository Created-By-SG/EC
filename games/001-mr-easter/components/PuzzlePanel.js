// components/PuzzlePanel.js
// Slide-out puzzle panel — triggered by 🧩 in GameHeader.
// Shows available puzzles for the active stage as a grid of icon cards.
// Tapping a puzzle card closes the panel and opens the drawer.

import styles from './PuzzlePanel.module.css'

// Emoji icons keyed by iframeSrc filename
const PUZZLE_ICONS = {
  'number-dials':       { emoji: '🔢', label: 'Number Dials' },
  'letter-drums':       { emoji: '🔤', label: 'Letter Drums' },
  'potion-mixer':       { emoji: '⚗️',  label: 'Potion Mixer' },
  'fuse-box':           { emoji: '⚡',  label: 'Fuse Box' },
  'readable-scroll':    { emoji: '📜',  label: 'Scroll' },
  'abstract-keypad':    { emoji: '☽',   label: 'Keypad' },
  'reactive-breakers':  { emoji: '💡',  label: 'Breakers' },
  'oscilloscope-tuner': { emoji: '📡',  label: 'Tuner' },
  'analyst-terminal':   { emoji: '💻',  label: 'Terminal' },
  'main-gate-override': { emoji: '🔀',  label: 'Router' },
  'uv-spectrum':        { emoji: '🔦',  label: 'UV Scan' },
  'signal-sync':        { emoji: '〰️',  label: 'Signal' },
  'vault-tumbler':      { emoji: '🔐',  label: 'Vault' },
  'matrix-override':    { emoji: '🟦',  label: 'Matrix' },
}

function getPuzzleIcon(iframeSrc) {
  if (!iframeSrc) return { emoji: '🧩', label: 'Puzzle' }
  const key = iframeSrc.replace('/puzzles/', '').replace('.html', '')
  return PUZZLE_ICONS[key] || { emoji: '🧩', label: 'Puzzle' }
}

export default function PuzzlePanel({
  isOpen,
  onClose,
  storyPuzzle,
  geoPuzzle,
  storyPuzzleSolved,
  geoPuzzleSolved,
  onSelectPuzzle,  // called with 'story' | 'geo'
}) {
  if (!isOpen) return null

  const puzzles = [
    storyPuzzle && { key: 'story', def: storyPuzzle, solved: storyPuzzleSolved },
    geoPuzzle   && { key: 'geo',   def: geoPuzzle,   solved: geoPuzzleSolved   },
  ].filter(Boolean)

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>

        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>🧩 Puzzles</span>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {puzzles.length === 0 && (
          <div className={styles.emptyMsg}>
            <span className={styles.emptyIcon}>🧩</span>
            <p>No puzzles available yet.</p>
            <p className={styles.emptyHint}>Keep exploring to unlock puzzles.</p>
          </div>
        )}

        {puzzles.length > 0 && (
          <>
            <p className={styles.hint}>Tap a puzzle to open it</p>
            <div className={styles.grid}>
              {puzzles.map(({ key, def, solved }) => {
                const { emoji, label } = getPuzzleIcon(def.iframeSrc)
                return (
                  <button
                    key={key}
                    className={`${styles.puzzleThumb} ${solved ? styles.puzzleThumbSolved : ''}`}
                    onClick={() => { onClose(); onSelectPuzzle(key) }}
                    disabled={solved}
                  >
                    <span className={styles.puzzleEmoji}>{solved ? '✓' : emoji}</span>
                    <span className={styles.puzzleName}>{def.buttonLabel || label}</span>
                    <span className={styles.puzzleType}>
                      {key === 'story' ? 'narrative' : 'geo'}
                    </span>
                    {solved && <span className={styles.solvedBadge}>Solved</span>}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
