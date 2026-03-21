// components/StageLog.js
// Slide-out log panel — full conversation replay per solved stage.
// Custom dropdown selector — no native OS select.

import { useState, useEffect, useRef } from 'react'
import styles from './StageLog.module.css'

const SENDER_STYLES = {
  'Mr Easter':  { initial: 'E', color: styles.avatarBlue },
  'Mrs Bunny':  { initial: 'B', color: styles.avatarTeal },
  'Porridge':   { initial: 'P', color: styles.avatarAmber },
  'Lazy Bunny': { initial: 'L', color: styles.avatarMuted },
  'Fred':       { initial: 'F', color: styles.avatarMuted },
  'Chuckles':   { initial: 'C', color: styles.avatarRed },
  'DISPATCH':   { initial: 'D', color: styles.avatarBlue },
}

function getSenderStyle(name) {
  return SENDER_STYLES[name] || { initial: (name || '?').charAt(0).toUpperCase(), color: styles.avatarBlue }
}

function stageStatus(stageId, progress) {
  const s = progress[stageId]
  if (s === 'solved') return 'solved'
  if (s === 'active' || s === 'location_verified') return 'active'
  return 'locked'
}

export default function StageLog({ isOpen, onClose, puzzles, progress, solvedAnswers }) {
  const solvedStages = puzzles.filter(p => progress[p.stage] === 'solved')
  const [selected, setSelected] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (isOpen && solvedStages.length > 0) {
      setSelected(solvedStages[solvedStages.length - 1].stage)
    }
  }, [isOpen])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!isOpen) return null

  const selectedPuzzle = puzzles.find(p => p.stage === selected)
  const storyMessages = selectedPuzzle?.messages?.filter(m => !m.isQuestion) || []
  const questionMsg = selectedPuzzle?.messages?.find(m => m.isQuestion)
  const answer = selected ? solvedAnswers[selected] : null

  const selectedLabel = selected
    ? `Stage ${selected}`
    : 'Select stage…'

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>Stage Log</span>

          <div className={styles.headerActions}>
            {/* Custom dropdown */}
            <div className={styles.dropdown} ref={dropdownRef}>
              <button
                className={styles.dropdownTrigger}
                onClick={() => setDropdownOpen(o => !o)}
              >
                <span>{selectedLabel}</span>
                <span className={styles.dropdownArrow}>{dropdownOpen ? '▲' : '▼'}</span>
              </button>

              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {puzzles.map(p => {
                    const status = stageStatus(p.stage, progress)
                    return (
                      <button
                        key={p.stage}
                        className={[
                          styles.dropdownItem,
                          status === 'solved'              ? styles.dropdownItemSolved   : '',
                          status === 'active'              ? styles.dropdownItemActive   : '',
                          status === 'locked'              ? styles.dropdownItemLocked   : '',
                          selected === p.stage             ? styles.dropdownItemSelected : '',
                        ].filter(Boolean).join(' ')}
                        onClick={() => {
                          if (status === 'solved') {
                            setSelected(p.stage)
                            setDropdownOpen(false)
                          }
                        }}
                        disabled={status !== 'solved'}
                      >
                        <span className={styles.dropdownIcon}>
                          {status === 'solved' ? '✓' : status === 'active' ? '⟳' : '○'}
                        </span>
                        <span>Stage {p.stage}</span>
                        {status === 'active' && <span className={styles.dropdownStatus}>in progress</span>}
                        {status === 'locked' && <span className={styles.dropdownStatus}>locked</span>}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Close — gap from dropdown prevents mis-tap */}
            <button className={styles.closeBtn} onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Convo replay */}
        <div className={styles.convo}>
          {!selected && (
            <div className={styles.emptyMsg}>
              <p>No stages solved yet.</p>
              <p className={styles.emptyHint}>Complete a stage to read back the conversation.</p>
            </div>
          )}

          {selectedPuzzle && (
            <>
              {storyMessages.map((msg, i) => {
                const sStyle = getSenderStyle(msg.sender)
                const showLabel = i === 0 || storyMessages[i - 1]?.sender !== msg.sender
                return (
                  <div key={i} className={styles.msgRow}>
                    {showLabel && (
                      <div className={styles.senderLabel}>
                        <div className={`${styles.avatarSmall} ${sStyle.color}`}>{sStyle.initial}</div>
                        <span className={styles.senderName}>{msg.sender}</span>
                      </div>
                    )}
                    <div className={styles.bubble}>{msg.text}</div>
                  </div>
                )
              })}

              {questionMsg && (
                <div className={styles.msgRow}>
                  <div className={styles.senderLabel}>
                    <div className={`${styles.avatarSmall} ${getSenderStyle(questionMsg.sender).color}`}>
                      {getSenderStyle(questionMsg.sender).initial}
                    </div>
                    <span className={styles.senderName}>{questionMsg.sender}</span>
                  </div>
                  <div className={`${styles.bubble} ${styles.bubbleQuestion}`}>{questionMsg.text}</div>
                </div>
              )}

              {answer && (
                <div className={styles.msgRow}>
                  <div className={`${styles.bubble} ${styles.bubbleAnswer}`}>✓ {answer}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
