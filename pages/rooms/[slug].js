// pages/rooms/[slug].js

import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PuzzleCard from '../../games/001-mr-easter/components/PuzzleCard'
import GameHeader from '../../games/001-mr-easter/components/GameHeader'
import InventoryPanel from '../../games/001-mr-easter/components/InventoryPanel'
import StageLog from '../../games/001-mr-easter/components/StageLog'
import { ITEMS } from '../../games/001-mr-easter/items/index'
import { DEV_MODE } from '../../lib/devConfig'
import { useGameNav } from '../../lib/GameNavContext'
import styles from '../../games/001-mr-easter/styles/Room.module.css'

const GAME_DURATION = 2 * 60 * 60

export default function RoomPage({ roomSlug, gameId }) {
  const router = useRouter()
  const [puzzles, setPuzzles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [seconds, setSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [progress, setProgress] = useState({})
  const [gameOver, setGameOver] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [startedAt, setStartedAt] = useState(null)
  const [puzzleMasks, setPuzzleMasks] = useState({})

  // Session
  const [sessionId, setSessionId] = useState(null)
  const [shareToken, setShareToken] = useState(null)
  const [teamName, setTeamName] = useState('')
  const emailInput = 'macromatters1@gmail.com'
  const [bookingCode, setBookingCode] = useState('')
  const [nameError, setNameError] = useState('')
  const [starting, setStarting] = useState(false)
  const [copied, setCopied] = useState(false)

  // Panels
  const [bagOpen, setBagOpen] = useState(false)
  const [logOpen, setLogOpen] = useState(false)

  // Puzzle counter per stage
  const [puzzleSolvedCount, setPuzzleSolvedCount] = useState(0)
  const [solvedAnswers, setSolvedAnswers] = useState({})
  const [puzzlesSolvedThisStage, setPuzzlesSolvedThisStage] = useState(0)
  const puzzlesTotal = 2

  const { setGameNav } = useGameNav()

  const formatTimeRemaining = s => {
    const remaining = Math.max(0, GAME_DURATION - s)
    const h = String(Math.floor(remaining / 3600)).padStart(2, '0')
    const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0')
    const ss = String(remaining % 60).padStart(2, '0')
    return `${h}:${m}:${ss}`
  }

  const formatTime = s => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0')
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
    const ss = String(s % 60).padStart(2, '0')
    return `${h}:${m}:${ss}`
  }

  // On mount — check for ?s=sessionId in URL and resume from Supabase
  useEffect(() => {
    const { s } = router.query
    if (!s) return
    fetch(`/api/resume-session?sessionId=${s}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) return
        if (data.expired) { setGameOver(true); return }
        setSessionId(data.sessionId)
        setShareToken(data.shareToken)
        setTeamName(data.teamName)
        setStartedAt(data.startedAt)
        setSeconds(data.elapsedSeconds)
        setTimerActive(true)
        if (data.progressData) setProgress(data.progressData)
        if (data.puzzleMasks) setPuzzleMasks(data.puzzleMasks)
      })
      .catch(() => {})
  }, [router.query])

  // Timer — driven by startedAt so it survives tab closes
  useEffect(() => {
    if (!timerActive || !startedAt) return
    const tick = () => {
      const elapsed = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000)
      setSeconds(elapsed)
      if (elapsed >= GAME_DURATION) {
        setTimerActive(false)
        setGameOver(true)
      }
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [timerActive, startedAt])

  // Load puzzles
  useEffect(() => {
    fetch(`/api/puzzles?game=${gameId}`)
      .then(r => r.json())
      .then(data => { setPuzzles(data); setLoading(false) })
      .catch(() => { setError('Failed to load puzzles'); setLoading(false) })
  }, [])

  // Reset puzzle counter when stage changes
  const activeStageId = puzzles.find(p =>
    progress[p.stage] === 'active' || progress[p.stage] === 'location_verified'
  )?.stage
  useEffect(() => { setPuzzleSolvedCount(0) }, [activeStageId])

  // Push timer + pips to nav
  useEffect(() => {
    if (!sessionId) { setGameNav(null); return }
    const pips = puzzles.map(p => (
      <div key={p.stage} className={[
        styles.pip,
        progress[p.stage] === 'solved' ? styles.pipDone : '',
        progress[p.stage] === 'active' || progress[p.stage] === 'location_verified' ? styles.pipActive : '',
      ].filter(Boolean).join(' ')} />
    ))
    setGameNav({
      timer: formatTimeRemaining(seconds),
      pips,
      devBadge: DEV_MODE ? <span className={styles.devBadge}>DEV</span> : null,
    })
  }, [sessionId, seconds, progress, puzzles])

  useEffect(() => { return () => setGameNav(null) }, [])

  async function startSession() {
    if (!bookingCode.trim()) { setNameError('Enter your booking code'); return }
    setStarting(true)
    setNameError('')
    try {
      // 1. Validate booking code
      const validateRes = await fetch('/api/validate-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim(), token: bookingCode.trim() }),
      })
      const validateData = await validateRes.json()
      if (!validateRes.ok) throw new Error(validateData.error)

      const displayName = validateData.displayName

      // 2. Start or resume session
      const res = await fetch('/api/start-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName: displayName,
          email: emailInput.trim(),
          bookingId: validateData.bookingId,
          roomSlug: gameId,
          stages: puzzles.map(p => p.stage),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setSessionId(data.sessionId)
      setShareToken(data.shareToken)
      setTeamName(displayName)
      setStartedAt(data.startedAt)

      // Resume existing progress or initialise fresh
      if (data.resumed && data.progressData) {
        setProgress(data.progressData)
      } else {
        const initial = {}
        puzzles.forEach((p, i) => { initial[p.stage] = i === 0 ? 'active' : 'locked' })
        setProgress(initial)
      }

      setTimerActive(true)
      router.replace({ query: { ...router.query, s: data.sessionId } }, undefined, { shallow: true })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) { setNameError(err.message || 'Something went wrong. Try again.') }
    finally { setStarting(false) }
  }

  // Called when both puzzles in a stage are solved
  const handleSolved = useCallback(async (stage, answerGiven) => {
    if (answerGiven) setSolvedAnswers(prev => ({ ...prev, [stage]: answerGiven }))
    setPuzzlesSolvedThisStage(prev => prev + 1)

    const idx = puzzles.findIndex(p => p.stage === stage)
    const nextStage = puzzles[idx + 1]?.stage || null
    const isLastStage = !nextStage

    setProgress(prev => {
      const updated = { ...prev, [stage]: 'solved' }
      if (nextStage && updated[nextStage] === 'locked') updated[nextStage] = 'active'
      return updated
    })

    if (sessionId) {
      try {
        await fetch('/api/solve-stage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, stage, nextStage, elapsedSeconds: seconds }),
        })
      } catch {}

      // Last stage — write to leaderboard once
      if (isLastStage) {
        setGameComplete(true)
        setTimerActive(false)
        try {
          await fetch('/api/complete-game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, elapsedSeconds: seconds, roomSlug: gameId, teamName }),
          })
        } catch {}
      }
    }
  }, [puzzles, sessionId, seconds, teamName, gameId])

  // Called on individual puzzle completion — saves progress
  const handlePuzzleCompleted = useCallback(async () => {
    if (!sessionId) return
    try {
      await fetch('/api/save-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, elapsedSeconds: seconds }),
      })
    } catch {}
  }, [sessionId, seconds])

  const handleHintUsed = useCallback(async (stage) => {
    if (!sessionId) return
    try {
      await fetch('/api/use-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, stage }),
      })
    } catch {}
  }, [sessionId])

  const solvedCount = Object.values(progress).filter(v => v === 'solved').length

  const shareUrl = shareToken && typeof window !== 'undefined'
    ? `${window.location.origin}/watch/${shareToken}`
    : null

  function copyShare() {
    if (!shareUrl) return
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function devReset() {
    const { s, ...rest } = router.query
    router.replace({ query: rest }, undefined, { shallow: true })
    setSessionId(null)
    setShareToken(null)
    setTeamName('')
    setBookingCode('')
    setNameError('')
    setProgress({})
    setSeconds(0)
    setStartedAt(null)
    setTimerActive(false)
    setGameOver(false)
    setGameComplete(false)
    setSolvedAnswers({})
    setPuzzleSolvedCount(0)
    setPuzzlesSolvedThisStage(0)
    setGameNav(null)
    window.scrollTo({ top: 0 })
  }

  const activePuzzle = puzzles.find(p =>
    progress[p.stage] === 'active' || progress[p.stage] === 'location_verified'
  )

  return (
    <>
      <Head><title>The Bunny Who Stole Easter | Escape City</title></Head>

      {/* Game over — time expired */}
      {gameOver && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalEyebrow}>Time's up</div>
            <div className={styles.modalTitle}>Better luck next time.</div>
            <div className={styles.modalMeta} style={{ marginTop: 8 }}>
              Your 2 hour window has closed.
            </div>
            <div className={styles.modalDivider} />
            <div className={styles.modalMeta}>
              Team: {teamName || 'Unknown'}<br />
              Stages solved: {Object.values(progress).filter(v => v === 'solved').length} of {puzzles.length}
            </div>
          </div>
        </div>
      )}

      {/* Game complete */}
      {gameComplete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalEyebrow}>Case closed</div>
            <div className={styles.modalTitle}>You found the basket.</div>
            <div className={styles.modalDivider} />
            <div className={styles.modalMeta}>
              Team: {teamName}<br />
              Time: {formatTime(seconds)}<br />
              Stages: {puzzles.length} of {puzzles.length}
            </div>
            <div className={styles.modalMeta} style={{ marginTop: 8 }}>
              Your time has been saved to the leaderboard.
            </div>
          </div>
        </div>
      )}

      {/* Booking code entry modal */}
      {!sessionId && !loading && !error && !gameOver && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalEyebrow}>Escape City</div>
            <div className={styles.modalTitle}>The Bunny Who Stole Easter</div>
            <div className={styles.modalMeta}>Gold Coast · Southport · 9 stages</div>
            <div className={styles.modalDivider} />
            <label className={styles.modalFieldLabel}>Booking code</label>
            <input
              className={styles.modalInput}
              placeholder="e.g. EAST-4829"
              value={bookingCode}
              onChange={e => setBookingCode(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && startSession()}
              autoCapitalize="characters"
              autoCorrect="off"
              autoFocus
            />
            {nameError && <div className={styles.modalError}>{nameError}</div>}
            <button className={styles.modalBtn} onClick={startSession} disabled={starting}>
              {starting ? 'Checking booking…' : 'Start Game'}
            </button>
            <button className={styles.modalBackBtn} onClick={() => router.push('https://ec-core.vercel.app/')}>
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Spectator share bar */}
      {sessionId && shareUrl && (
        <div className={styles.shareBar}>
          <span className={styles.shareLabel}>Spectator link</span>
          <span className={styles.shareUrl}>{shareUrl}</span>
          <button className={styles.shareBtn} onClick={copyShare}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          {DEV_MODE && (
            <button className={styles.devResetBtn} onClick={devReset}>
              Reset session
            </button>
          )}
        </div>
      )}

      {/* Game header */}
      {sessionId && (
        <GameHeader
          puzzles={puzzles}
          progress={progress}
          puzzleCounter={activePuzzle ? `${puzzleSolvedCount}/1` : null}
          onBagOpen={() => setBagOpen(true)}
          onLogOpen={() => setLogOpen(true)}
          topOffset={shareUrl ? 40 : 0}
        />
      )}

      {/* Feed */}
      <div className={styles.feed} style={shareUrl ? { paddingTop: '180px' } : undefined}>
        {loading && <div className={styles.stateMsg}>Loading…</div>}
        {error && <div className={`${styles.stateMsg} ${styles.stateMsgError}`}>{error}</div>}

        {sessionId && (
          <>
            {activePuzzle && (
              <PuzzleCard
                key={activePuzzle.stage}
                puzzle={activePuzzle}
                status={progress[activePuzzle.stage] || 'active'}
                onSolved={handleSolved}
                onHintUsed={handleHintUsed}
                onPuzzleCompleted={handlePuzzleCompleted}
                gameName={gameId}
                sessionId={sessionId}
                puzzlesSolved={puzzlesSolvedThisStage}
                puzzlesTotal={puzzlesTotal}
                initialPuzzleMask={puzzleMasks[activePuzzle.stage] || 0}
              />
            )}

            {!activePuzzle && solvedCount === puzzles.length && puzzles.length > 0 && !gameComplete && (
              <div className={styles.stateMsg}>🎉 All stages complete!</div>
            )}
          </>
        )}
      </div>

      <InventoryPanel
        sessionId={sessionId}
        isOpen={bagOpen}
        onClose={() => setBagOpen(false)}
        allItemDefs={ITEMS}
      />

      <StageLog
        isOpen={logOpen}
        onClose={() => setLogOpen(false)}
        puzzles={puzzles}
        progress={progress}
        solvedAnswers={solvedAnswers}
      />
    </>
  )
}

export async function getServerSideProps(context) {
  const { ROOMS } = await import('../rooms/index')
  const slug = context.params.slug
  const room = ROOMS.find(r => r.slug === slug)
  const gameId = room?.gameId || slug
  return { props: { roomSlug: slug, gameId } }
}
