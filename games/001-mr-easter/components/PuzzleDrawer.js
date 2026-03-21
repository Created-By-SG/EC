// components/PuzzleDrawer.js
// Slide-up drawer rendering a puzzle widget.
// Supports iframe puzzles (iframeSrc:) and puzzle chains (chain: [...steps]).
// Chain: each step sends PUZZLE_SOLVED to advance. Final step fires onPuzzleSolved.
// DEV_MODE: shows answer key below puzzle.

import { useState, useEffect, useRef } from 'react'
import styles from './PuzzleDrawer.module.css'
import { DEV_MODE } from '../../../lib/devConfig'

export default function PuzzleDrawer({
  isOpen,
  onClose,
  puzzleDef,
  stage,
  puzzlesSolved,
  puzzlesTotal,
  onPuzzleSolved,
  headerOffset = 120,
  inputOffset  = 0,
}) {
  const [flyActive, setFlyActive] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [hints, setHints] = useState([])
  const [chainStep, setChainStep] = useState(0)
  const iframeRef = useRef(null)

  const isChain = Boolean(puzzleDef?.chain?.length)
  const currentStep = isChain ? puzzleDef.chain[chainStep] : puzzleDef
  const totalSteps = isChain ? puzzleDef.chain.length : 1

  // Reset chain and hints when drawer opens or puzzle changes
  useEffect(() => {
    if (isOpen) {
      setChainStep(0)
      setHintIndex(0)
      setHints([])
    }
  }, [isOpen, puzzleDef])

  // Reset hints when chain step advances
  useEffect(() => {
    setHintIndex(0)
    setHints([])
  }, [chainStep])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Send config to iframe once it loads
  function handleIframeLoad() {
    if (currentStep?.iframeSrc && currentStep?.config && iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'PUZZLE_CONFIG', config: currentStep.config },
        '*'
      )
    }
  }

  // Listen for solve/wrong messages from iframe puzzles
  useEffect(() => {
    if (!isOpen) return
    function handleMessage(e) {
      if (e.data?.type === 'PUZZLE_SOLVED') handleSolve()
      if (e.data?.type === 'PUZZLE_WRONG')  {}
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [isOpen, chainStep])

  function handleSolve() {
    if (isChain && chainStep < totalSteps - 1) {
      // Advance to next step in chain
      setTimeout(() => setChainStep(s => s + 1), 600)
    } else {
      // Final step — complete the puzzle
      setFlyActive(true)
      setTimeout(() => {
        setFlyActive(false)
        onPuzzleSolved()
      }, 900)
    }
  }

  function requestHint() {
    const available = [currentStep?.hint_1, currentStep?.hint_2].filter(Boolean)
    if (hintIndex < available.length) {
      setHints(prev => [...prev, available[hintIndex]])
      setHintIndex(i => i + 1)
    }
  }

  if (!isOpen || !puzzleDef) return null

  const isIframe = Boolean(currentStep?.iframeSrc)
  const PuzzleComponent = currentStep?.component
  const availableHints = [currentStep?.hint_1, currentStep?.hint_2].filter(Boolean)
  const devAnswer = currentStep?.devAnswer || puzzleDef?.devAnswer

  const stepLabel = isChain
    ? (currentStep?.stepLabel || `Step ${chainStep + 1} of ${totalSteps}`)
    : (puzzleDef?.buttonLabel || '')

  return (
    <>
      <div
        className={styles.drawerOverlay}
        style={{ '--drawer-top': `${headerOffset}px`, '--drawer-bottom': `${inputOffset}px` }}
        onClick={onClose}
      >
        <div className={styles.drawer} onClick={e => e.stopPropagation()}>

          {/* Header */}
          <div className={styles.drawerHeader}>
            <div className={styles.drawerMeta}>
              <span className={styles.drawerTitle}>{stepLabel}</span>
              {isChain && (
                <span className={styles.drawerCounter}>{chainStep + 1}/{totalSteps}</span>
              )}
            </div>
            <div className={styles.headerActions}>
              {availableHints.length > 0 && hintIndex < availableHints.length && (
                <button className={styles.hintBtn} onClick={requestHint}>
                  Hint {hintIndex + 1}
                </button>
              )}
              {DEV_MODE && (
                <button className={styles.devSolveBtn} onClick={handleSolve}>
                  Solve
                </button>
              )}
              <button className={styles.closeBtn} onClick={onClose}>✕</button>
            </div>
          </div>

          {/* Chain step progress bar */}
          {isChain && (
            <div className={styles.chainProgress}>
              {puzzleDef.chain.map((_, i) => (
                <div
                  key={i}
                  className={[
                    styles.chainDot,
                    i < chainStep ? styles.chainDotDone : '',
                    i === chainStep ? styles.chainDotActive : '',
                  ].filter(Boolean).join(' ')}
                />
              ))}
            </div>
          )}

          {/* Hint bubbles */}
          {hints.length > 0 && (
            <div className={styles.hintList}>
              {hints.map((h, i) => (
                <div key={i} className={styles.hintBubble}>💡 {h}</div>
              ))}
            </div>
          )}

          {/* Puzzle — iframe or React component */}
          <div className={styles.content}>
            {isIframe ? (
              <iframe
                key={`${stage}-${chainStep}`}
                ref={iframeRef}
                src={currentStep.iframeSrc}
                className={styles.puzzleIframe}
                onLoad={handleIframeLoad}
                title={stepLabel}
              />
            ) : PuzzleComponent ? (
              <PuzzleComponent
                config={currentStep.config}
                onSolve={handleSolve}
                onWrong={() => {}}
              />
            ) : null}
          </div>

          {/* DEV answer strip */}
          {DEV_MODE && devAnswer && (
            <div className={styles.devAnswer}>
              <span className={styles.devAnswerLabel}>DEV</span>
              <span className={styles.devAnswerText}>{devAnswer}</span>
            </div>
          )}

        </div>
      </div>

      {flyActive && (
        <div className={styles.flyEmoji} aria-hidden="true">✨</div>
      )}
    </>
  )
}
