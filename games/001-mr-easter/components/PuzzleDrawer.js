// components/PuzzleDrawer.js
// DESTINATION: games/001-mr-easter/components/
//
// Slide-up drawer that renders a puzzle widget (iframe or React component).
// Sits above the context bar — bottom edge stops at --drawer-bottom (80px by default)
// so the submit button in PuzzleCard's context bar stays visible below.
// Top edge starts at --drawer-top (56px = nav height only, NOT game header)
// so the drawer covers the game header and gains that extra space.
//
// SUBMIT FLOW:
//   Parent (PuzzleCard) calls submitFn() from context bar button
//   → submitPuzzle() posts PUZZLE_SUBMIT to the iframe
//   → iframe runs check(), posts PUZZLE_SOLVED or shows error
//   → PUZZLE_SOLVED caught here → handleSolve() → onPuzzleSolved()
//   Drawer only closes on correct answer. Wrong answer = drawer stays open.
//
// onSubmitReady(fn) — callback that hands submitFn up to PuzzleCard on open/step change
//   PuzzleCard stores it in submitFn state and calls it from the context bar button
//
// DEV_MODE extras: Solve button (bypasses puzzle), answer key strip at bottom
//
// CHAIN PUZZLES: chain: [...steps] — each step posts PUZZLE_SOLVED to advance
//   Final step fires onPuzzleSolved to parent
//
// IMPORTANT — DO NOT:
//   - Set headerOffset back to 120 (drawer would be too short, cutting off puzzles)
//   - Add submit buttons inside this drawer (they live in PuzzleCard context bar)
//   - Remove onSubmitReady callback (breaks context bar submit button)

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
  headerOffset = 56,
  inputOffset  = 0,
  onSubmitReady,   // callback(submitFn) — gives parent a way to trigger submit
}) {
  const [flyActive, setFlyActive] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [hints, setHints] = useState([])
  const [chainStep, setChainStep] = useState(0)
  const iframeRef    = useRef(null)
  const handleSolveRef = useRef(null)  // ref so message listener never goes stale
  const submitFnRef    = useRef(null)  // ref so parent context bar never goes stale

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
      if (e.data?.type === 'PUZZLE_SOLVED') handleSolveRef.current?.()
      if (e.data?.type === 'PUZZLE_WRONG')  {}
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [isOpen, chainStep])

  // Called by parent context bar button — stored in ref so it's never stale
  submitFnRef.current = function submitPuzzle() {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({ type: 'PUZZLE_SUBMIT' }, '*')
    } else {
      handleSolveRef.current?.()
    }
  }

  // Expose stable submit function to parent on open / step change
  useEffect(() => {
    if (isOpen && onSubmitReady) {
      // Wrap in stable function so parent always calls the current ref
      onSubmitReady(() => submitFnRef.current?.())
    }
  }, [isOpen, chainStep])

  function handleSolve() {
    if (isChain && chainStep < totalSteps - 1) {
      setTimeout(() => setChainStep(s => s + 1), 600)
    } else {
      setFlyActive(true)
      setTimeout(() => {
        setFlyActive(false)
        onPuzzleSolved()
      }, 900)
    }
  }
  // Keep ref current so message listener always calls the latest version
  handleSolveRef.current = handleSolve

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
