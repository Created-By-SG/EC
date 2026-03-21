// components/PuzzleCard.js
// DESTINATION: games/001-mr-easter/components/
//
// Chat UI for a single active stage. Renders story messages with typing animation.
// Manages the context bar at the bottom — this bar is DYNAMIC and changes based on state:
//   - Drawer closed  → one button per unsolved puzzle (storyPuzzle + geoPuzzle)
//   - Drawer open    → one SUBMIT button that fires PUZZLE_SUBMIT into the iframe
//   - Future states  → character dialogue options, event choices, etc.
//
// SUB-PUZZLE PERSISTENCE (bitmask via puzzle_index in stage_progress):
//   Bit 1 = story puzzle solved, Bit 2 = geo puzzle solved
//   Written to DB on each sub-puzzle completion via /api/save-progress
//   Read back on session resume via initialPuzzleMask prop from [slug].js
//   This means closing/refreshing never loses partial progress within a stage
//
// SOLVE CHAIN:
//   PuzzleDrawer gets PUZZLE_SOLVED from iframe
//   → fires onPuzzleSolved
//   → PuzzleCard.handlePuzzleSolved(type) updates local + DB state
//   → if ALL present puzzles done → onSolved(stage) fires to parent [slug].js
//   bothSolved checks only puzzles that EXIST for this stage (not hardcoded to both)
//
// IMPORTANT — DO NOT:
//   - Put submit buttons inside iframe HTML files (submit lives here in context bar)
//   - Hardcode bothSolved as storyDone && geoDone (breaks single-puzzle stages)
//   - Remove initialPuzzleMask prop (needed for session resume)

import { useState, useEffect, useRef } from 'react'
import styles from './PuzzleCard.module.css'
import { DEV_MODE } from '../../../lib/devConfig'
import PuzzleDrawer from './PuzzleDrawer'
import { getStoryPuzzle, getGeoPuzzle, getStage } from '../game'

const SENDER_STYLES = {
  'Mr Easter':   { initial: 'E', color: styles.avatarBlue },
  'Mrs Bunny':   { initial: 'B', color: styles.avatarTeal },
  'Porridge':    { initial: 'P', color: styles.avatarAmber },
  'Lazy Bunny':  { initial: 'L', color: styles.avatarMuted },
  'Fred':        { initial: 'F', color: styles.avatarMuted },
  'Chuckles':    { initial: 'C', color: styles.avatarRed },
  'DISPATCH':    { initial: 'D', color: styles.avatarBlue },
}

function getSenderStyle(name) {
  return SENDER_STYLES[name] || { initial: (name || '?').charAt(0).toUpperCase(), color: styles.avatarBlue }
}

export default function PuzzleCard({
  puzzle,
  status,
  gameName,
  sessionId,
  onSolved,
  onHintUsed,
  onPuzzleCompleted,
  puzzlesSolved = 0,
  puzzlesTotal = 2,
  headerOffset = 56,
  initialPuzzleMask = 0,   // nav only — drawer covers game header for max puzzle height
}) {
  // Story messages only — no question in chat
  const storyMessages = (puzzle.messages || []).filter(m => !m.isQuestion)

  const buildInitialMessages = () => {
    // DEV_MODE: show all story messages immediately, skip animation
    if (DEV_MODE && status === 'active') {
      return storyMessages.map((m, i) => ({
        ...m,
        id: `story-${i}`,
        from: m.from || (m.type === 'event' ? 'event' : 'contact'),
      }))
    }
    if (status === 'locked' || status === 'active') return []
    const msgs = storyMessages.map((m, i) => ({
      ...m,
      id: `story-${i}`,
      from: m.from || (m.type === 'event' ? 'event' : 'contact'),
    }))
    if (status === 'solved') {
      msgs.push({ id: 'solved-msg', from: 'system', text: '✓ Stage complete' })
    }
    return msgs
  }

  const [messages, setMessages]     = useState(buildInitialMessages)
  const [isTyping, setIsTyping]     = useState(false)
  const [showButtons, setShowButtons] = useState(DEV_MODE ? status === 'active' : false)
  const [isOpen, setIsOpen]         = useState(status !== 'locked')
  const [activeDrawer, setActiveDrawer] = useState(null) // 'story' | 'geo' | null
  const [submitFn, setSubmitFn] = useState(null)
  // storyIndex tracks which story puzzle is current (0, 1, 2...)
  // initialPuzzleMask lower bits store storyIndex, bit 8 = geo done
  const [storyIndex, setStoryIndex]       = useState(() => initialPuzzleMask & 0xFF)
  const [geoPuzzleSolved, setGeoPuzzleSolved] = useState(() => Boolean(initialPuzzleMask & 0x100))

  const bottomRef    = useRef(null)
  const didAnimate   = useRef(false)
  const prevMsgCount = useRef(0)
  const onSolvedRef  = useRef(onSolved)  // ref so stale closure never silently drops the call
  useEffect(() => { onSolvedRef.current = onSolved }, [onSolved])

  // Look up puzzle definitions for this stage
  const storyPuzzle   = getStoryPuzzle(puzzle.stage, storyIndex)
  const storyPoolSize  = getStage(puzzle.stage)?.storyPool?.length || 1
  const storyAllDone   = storyIndex >= storyPoolSize
  const geoPuzzle   = getGeoPuzzle(puzzle.stage)

  function typingDelay(text) {
    const base = Math.min(text.length * 55, 5000)
    const jitter = (Math.random() - 0.5) * 800
    return Math.max(1500, base + jitter)
  }

  function readingPause(text) {
    const base = Math.min(text.length * 22, 2500)
    const jitter = Math.random() * 600
    return Math.max(900, base + jitter)
  }

  function pushMessage(msg, delay) {
    const d = delay !== undefined ? delay : typingDelay(msg.text || '')
    setIsTyping(true)
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [...prev, { ...msg, id: msg.id || `msg-${Date.now()}` }])
        resolve()
      }, d)
    })
  }

  function pause(text) {
    return new Promise(r => setTimeout(r, readingPause(text)))
  }

  useEffect(() => {
    if (messages.length > prevMsgCount.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    prevMsgCount.current = messages.length
  }, [messages, isTyping])

  useEffect(() => {
    if (status !== 'active' || didAnimate.current) return
    didAnimate.current = true

    if (DEV_MODE) {
      setShowButtons(true)
      return
    }

    const run = async () => {
      await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))
      for (let i = 0; i < storyMessages.length; i++) {
        const m = storyMessages[i]
        await pushMessage({ ...m, from: m.from || (m.type === 'event' ? 'event' : 'contact') })
        if (i < storyMessages.length - 1) await pause(m.text)
      }
      setShowButtons(true)
    }
    run()
  }, [status])

  function handlePuzzleSolved(type) {
    const label = type === 'story'
      ? (storyPuzzle?.buttonLabel || 'Puzzle')
      : (geoPuzzle?.buttonLabel || 'Puzzle')

    setMessages(prev => [...prev, {
      id: `item-${Date.now()}`,
      from: 'system',
      icon: type === 'story' ? '📄' : '📍',
      text: label,
      solved: true,
    }])

    const newStoryIndex = type === 'story' ? storyIndex + 1 : storyIndex
    const newGeoDone    = type === 'geo'   ? true : geoPuzzleSolved

    if (type === 'story') setStoryIndex(newStoryIndex)
    if (type === 'geo')   setGeoPuzzleSolved(true)

    // mask: lower byte = storyIndex, bit 8 = geo done
    const newMask = (newStoryIndex & 0xFF) | (newGeoDone ? 0x100 : 0)
    if (sessionId) {
      fetch('/api/save-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, stage: puzzle.stage, puzzleMask: newMask, elapsedSeconds: 0 }),
      }).catch(err => console.error('[PuzzleCard] save-progress failed:', err))
    }

    if (onPuzzleCompleted) onPuzzleCompleted()

    const storyAllDoneNow = newStoryIndex >= storyPoolSize
    const geoRequired     = Boolean(geoPuzzle)
    const bothSolved      = storyAllDoneNow && (!geoRequired || newGeoDone)
    if (bothSolved) {
      setTimeout(() => onSolvedRef.current?.(puzzle.stage, null), 800)
    }
  }

  // ── LOCKED ──
  if (status === 'locked') return null

  // ── SOLVED collapsed ──
  if (status === 'solved' && !isOpen) {
    const primarySender = storyMessages[0]?.sender || 'DISPATCH'
    const pStyle = getSenderStyle(primarySender)
    return (
      <button className={styles.collapsedThread} onClick={() => setIsOpen(true)}>
        <div className={`${styles.avatar} ${pStyle.color}`}>{pStyle.initial}</div>
        <div className={styles.collapsedMeta}>
          <span className={styles.contactName}>{primarySender}</span>
          <span className={styles.collapsedPreview}>Stage {puzzle.stage} · solved</span>
        </div>
        <div className={styles.solvedPill}>✓</div>
      </button>
    )
  }

  return (
    <div className={`${styles.thread} ${status === 'solved' ? styles.threadDone : ''}`}>

      {/* Solved header */}
      {status === 'solved' && (
        <div className={styles.threadHeader} onClick={() => setIsOpen(o => !o)} style={{ cursor: 'pointer' }}>
          <div className={styles.headerMeta}>
            <span className={styles.contactName}>{storyMessages[0]?.sender || 'DISPATCH'}</span>
            <span className={styles.stageTag}>Stage {puzzle.stage} · solved</span>
          </div>
          <div className={styles.solvedPill}>✓</div>
        </div>
      )}

      {/* Messages */}
      <div className={styles.messageList}>
        {messages.map((msg, i) => {
          if (msg.type === 'event') {
            return (
              <div key={msg.id || i} className={styles.eventLine}>
                <span className={styles.eventBracket}>[</span>
                <span className={styles.eventText}>{msg.text}</span>
                <span className={styles.eventBracket}>]</span>
              </div>
            )
          }

          if (msg.from === 'system') {
            return (
              <div key={msg.id || i} className={styles.systemBox}>
                <span className={styles.systemIcon}>{msg.icon || '✓'}</span>
                <span className={styles.systemText}>{msg.text}</span>
                {msg.solved && <span className={styles.systemCheck}>✓</span>}
              </div>
            )
          }
          const sStyle = getSenderStyle(msg.sender)
          return (
            <div key={msg.id || i} className={styles.messageRow}>
              {msg.from === 'contact' && (i === 0 || messages[i-1]?.sender !== msg.sender) && (
                <div className={styles.senderLabel}>
                  <div className={`${styles.avatarSmall} ${sStyle.color}`}>{sStyle.initial}</div>
                  <span className={styles.senderName}>{msg.sender}</span>
                </div>
              )}
              <div className={[
                styles.bubble,
                msg.from === 'user'    ? styles.bubbleUser    : styles.bubbleContact,
                msg.isError            ? styles.bubbleError   : '',
                msg.isSuccess          ? styles.bubbleSuccess : '',
                msg.isHint             ? styles.bubbleHint    : '',
              ].filter(Boolean).join(' ')}>
                <span className={styles.bubbleText}>{msg.text}</span>
                {msg.time && <span className={styles.bubbleTime}>{msg.time}</span>}
              </div>
            </div>
          )
        })}

        {isTyping && (
          <div className={`${styles.bubble} ${styles.bubbleContact} ${styles.bubbleTyping}`}>
            <span/><span/><span/>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Context bar — dynamic based on game state ── */}
      {status !== 'solved' && showButtons && (
        <div className={styles.inputArea}>
          {activeDrawer ? (
            // Drawer open — submit button fires into the iframe
            <button
              className={styles.submitBtn}
              onClick={() => submitFn && submitFn()}
            >
              {activeDrawer === 'story'
                ? (storyPuzzle?.submitLabel || 'Submit')
                : (geoPuzzle?.submitLabel  || 'Submit')}
            </button>
          ) : (
            // Two buttons — story (current index) and geo. Label updates as puzzles are solved.
            <div className={styles.puzzleButtons}>
              {storyPuzzle && !storyAllDone && (
                <button
                  className={styles.puzzleBtn}
                  onClick={() => setActiveDrawer('story')}
                >
                  🔍 {storyPuzzle.buttonLabel}
                </button>
              )}
              {storyAllDone && storyPuzzle && (
                <button className={`${styles.puzzleBtn} ${styles.puzzleBtnSolved}`} disabled>
                  ✓ {storyPuzzle.buttonLabel}
                </button>
              )}
              {geoPuzzle && (
                <button
                  className={`${styles.puzzleBtn} ${geoPuzzleSolved ? styles.puzzleBtnSolved : ''}`}
                  onClick={() => !geoPuzzleSolved && setActiveDrawer('geo')}
                  disabled={geoPuzzleSolved}
                >
                  {geoPuzzleSolved ? '✓ ' : '🗺 '}
                  {geoPuzzle.buttonLabel}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Story puzzle drawer */}
      {storyPuzzle && (
        <PuzzleDrawer
          isOpen={activeDrawer === 'story'}
          onClose={() => setActiveDrawer(null)}
          puzzleDef={storyPuzzle}
          stage={puzzle.stage}
          sessionId={sessionId}
          puzzlesSolved={puzzlesSolved}
          puzzlesTotal={puzzlesTotal}
          headerOffset={headerOffset}
          inputOffset={80}
          onSubmitReady={fn => setSubmitFn(() => fn)}
          onPuzzleSolved={() => {
            setActiveDrawer(null)
            handlePuzzleSolved('story')
          }}
        />
      )}

      {/* Geo puzzle drawer */}
      {geoPuzzle && (
        <PuzzleDrawer
          isOpen={activeDrawer === 'geo'}
          onClose={() => setActiveDrawer(null)}
          puzzleDef={geoPuzzle}
          stage={puzzle.stage}
          sessionId={sessionId}
          puzzlesSolved={puzzlesSolved}
          puzzlesTotal={puzzlesTotal}
          headerOffset={headerOffset}
          inputOffset={80}
          onSubmitReady={fn => setSubmitFn(() => fn)}
          onPuzzleSolved={() => {
            setActiveDrawer(null)
            handlePuzzleSolved('geo')
          }}
        />
      )}
    </div>
  )
}

function LockIcon() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
      <rect x="1.5" y="5.5" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35"/>
      <path d="M3.5 5.5V3.5a2 2 0 014 0v2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.35"/>
    </svg>
  )
}
