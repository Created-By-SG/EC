// pages/rooms/[slug].js
import { useState, useEffect, useCallback, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PuzzleCard from '../../games/001-mr-easter/components/PuzzleCard'
import GameHeader from '../../games/001-mr-easter/components/GameHeader'
import InventoryPanel from '../../games/001-mr-easter/components/InventoryPanel'
import StageLog from '../../games/001-mr-easter/components/StageLog'
import PuzzleDrawer from '../../games/001-mr-easter/components/PuzzleDrawer'
import { ITEMS } from '../../games/001-mr-easter/items/index'
import { DEV_MODE } from '../../lib/devConfig'
import { useGameNav } from '../../lib/GameNavContext'
import styles from '../../games/001-mr-easter/styles/Room.module.css'

export default function RoomPage({ roomSlug, gameId }) {
  const router = useRouter()
  const [puzzles, setPuzzles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const GAME_DURATION = 2 * 60 * 60
  const [seconds, setSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [progress, setProgress] = useState({})
  const [gameOver, setGameOver] = useState(false)
  const [startedAt, setStartedAt] = useState(null)

  // Session
  const [sessionId, setSessionId] = useState(null)
  const [shareToken, setShareToken] = useState(null)
  const [teamName, setTeamName] = useState('')
  const emailInput = 'macromatters1@gmail.com'
  const [bookingCode, setBookingCode] = useState('')
  const [nameError, setNameError] = useState('')
  const [starting, setStarting] = useState(false)
  const [copied, setCopied] = useState(false)

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState([])

  // Panels
  const [bagOpen, setBagOpen] = useState(false)
  const [logOpen, setLogOpen] = useState(false)
  const openPuzzlePanelRef = useRef(null)

  // Puzzle drawer counter (resets per stage)
  const [puzzleSolvedCount, setPuzzleSolvedCount] = useState(0)

  // Track the answer given for each solved stage (for log replay)
  const [solvedAnswers, setSolvedAnswers] = useState({})

  // Track puzzles solved per stage (resets when stage advances)
  const [puzzlesSolvedThisStage, setPuzzlesSolvedThisStage] = useState(0)
  const puzzlesTotal = 2 // story + geo per stage

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

  // On mount — check for ?s=sessionId in URL and resume from Supabase if present
  useEffect(() => {
    const { s } = router.query
    if (!s) return
    fetch(`/api/resume-session?sessionId=${s}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) return // invalid session — fall through to name entry
        if (data.expired) {
          setGameOver(true)
          return
        }
        setSessionId(data.sessionId)
        setShareToken(data.shareToken)
        setTeamName(data.teamName)
        setStartedAt(data.startedAt)
        setSeconds(data.elapsedSeconds)
        setTimerActive(true)
        if (data.progressData) setProgress(data.progressData)
      })
      .catch(() => {}) // fail silently — name entry screen shows
  }, [router.query])

  // Timer — calculates elapsed from startedAt (server timestamp) so it survives browser closes
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
    tick() // run immediately on mount
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [timerActive, startedAt])

  useEffect(() => {
    fetch(`/api/puzzles?game=${gameId}`)
      .then(r => r.json())
      .then(data => { setPuzzles(data); setLoading(false) })
      .catch(() => { setError('Failed to load puzzles'); setLoading(false) })
  }, [])

  useEffect(() => {
    if (!sessionId) return
    fetchLeaderboard()
    const interval = setInterval(fetchLeaderboard, 30_000)
    return () => clearInterval(interval)
  }, [sessionId, roomSlug])

  // Reset puzzle counter when stage changes
  const activeStageId = puzzles.find(p =>
    progress[p.stage] === 'active' || progress[p.stage] === 'location_verified'
  )?.stage
  useEffect(() => { setPuzzleSolvedCount(0) }, [activeStageId])

  // Keep elapsed seconds updating in nav — timer now driven by startedAt useEffect above

  // Push timer + pips to nav — bag is now in GameHeader, not nav
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

  async function fetchLeaderboard() {
    try {
      const res = await fetch(`/api/leaderboard?roomSlug=${roomSlug}`)
      if (res.ok) setLeaderboard(await res.json())
    } catch {}
  }

  async function startSession() {
    
    if (!bookingCode.trim()) { setNameError('Enter your booking code'); return }
    setStarting(true)
    setNameError('')
    try {
      // 1. Validate booking code + email
      const validateRes = await fetch('/api/validate-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim(), token: bookingCode.trim() }),
      })
      const validateData = await validateRes.json()
      if (!validateRes.ok) throw new Error(validateData.error)

      // displayName is everything before the @ e.g. matt@gmail.com → matt
      const displayName = validateData.displayName

      // 2. Start session using display name
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
      const initial = {}
      puzzles.forEach((p, i) => { initial[p.stage] = i === 0 ? 'active' : 'locked' })
      setProgress(initial)
      setTimerActive(true)
      router.replace({ query: { ...router.query, s: data.sessionId } }, undefined, { shallow: true })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) { setNameError(err.message || 'Something went wrong. Try again.') }
    finally { setStarting(false) }
  }

  const handleSolved = useCallback(async (stage, answerGiven) => {
    // Record the answer for the log
    if (answerGiven) {
      setSolvedAnswers(prev => ({ ...prev, [stage]: answerGiven }))
    }
    // Increment puzzle counter for this stage
    setPuzzlesSolvedThisStage(prev => prev + 1)

    setProgress(prev => {
      const updated = { ...prev, [stage]: 'solved' }
      const idx = puzzles.findIndex(p => p.stage === stage)
      if (idx !== -1 && puzzles[idx + 1]) {
        const next = puzzles[idx + 1].stage
        if (updated[next] === 'locked') updated[next] = 'active'
      }
      return updated
    })

    if (sessionId) {
      const idx = puzzles.findIndex(p => p.stage === stage)
      const nextStage = puzzles[idx + 1]?.stage || null
      try {
        await fetch('/api/solve-stage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, stage, nextStage, elapsedSeconds: seconds }),
        })
        fetchLeaderboard()
      } catch {}
    }
  }, [puzzles, sessionId, seconds])

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
    setSolvedAnswers({})
    setPuzzleSolvedCount(0)
    setPuzzlesSolvedThisStage(0)
    setGameNav(null)
    window.scrollTo({ top: 0 })
  }

  // Only render the single active puzzle card
  const activePuzzle = puzzles.find(p =>
    progress[p.stage] === 'active' || progress[p.stage] === 'location_verified'
  )

  const lbRows = (() => {
    const me = { name: teamName || 'you', solved: solvedCount, time: formatTime(seconds), you: true }
    const others = leaderboard
      .filter(r => r.session_id !== sessionId)
      .slice(0, 4)
      .map(r => ({ name: r.team_name, solved: r.stages_solved, time: formatTime(r.elapsed_seconds) }))
    return [...others, me].sort((a, b) => b.solved - a.solved || a.time.localeCompare(b.time))
  })()

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

      {/* Start game modal */}
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

      {/* Spectator link - fixed between nav and GameHeader */}
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

      {/* Persistent game header — shifts down if spectator bar is visible */}
      {sessionId && (
        <GameHeader
          puzzles={puzzles}
          progress={progress}
          puzzleCounter={activePuzzle ? `${puzzleSolvedCount}/1` : null}
          onBagOpen={() => setBagOpen(true)}
          onLogOpen={() => setLogOpen(true)}
          onPuzzleOpen={() => openPuzzlePanelRef.current?.()}
          topOffset={shareUrl ? 40 : 0}
        />
      )}

      <div className={styles.layout}>
        {/* Feed — single active stage only */}
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
                  gameName={gameId}
                  sessionId={sessionId}
                  puzzlesSolved={puzzlesSolvedThisStage}
                  puzzlesTotal={puzzlesTotal}
                  headerOffset={shareUrl ? 160 : 120}
                  onPuzzlePanelRef={fn => { openPuzzlePanelRef.current = fn }}
                />
              )}

              {!activePuzzle && solvedCount === puzzles.length && puzzles.length > 0 && (
                <div className={styles.stateMsg}>
                  🎉 All stages complete!
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar — desktop only */}
        <div className={styles.sidebar}>
          <div className={styles.sideSection}>
            <div className={styles.sideLabel}>Room</div>
            <div className={styles.roomName}>The Bunny Who Stole Easter</div>
            <div className={styles.roomMeta}>Gold Coast · Southport</div>
            <div className={styles.roomMeta}>9 stages · ~2 hrs</div>
          </div>

          {sessionId && (
            <>
              <div className={styles.sideSection}>
                <div className={styles.sideLabel}>Progress</div>
                <div className={styles.statGrid}>
                  <div className={styles.stat}>
                    <div className={styles.statVal}>{solvedCount}</div>
                    <div className={styles.statKey}>Solved</div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.statVal}>{puzzles.length - solvedCount}</div>
                    <div className={styles.statKey}>Remaining</div>
                  </div>
                </div>
              </div>

              <div className={styles.sideSection}>
                <div className={styles.sideLabel}>Leaderboard</div>
                {lbRows.map((entry, i) => (
                  <div key={entry.name} className={styles.lbRow}>
                    <span className={[styles.lbRank, i === 0 ? styles.lbGold : ''].join(' ')}>{i + 1}</span>
                    <span className={[styles.lbName, entry.you ? styles.lbYou : ''].join(' ')}>
                      {entry.you ? `${entry.name} ←` : entry.name}
                    </span>
                    <span className={styles.lbSolved}>{entry.solved}/{puzzles.length}</span>
                    <span className={styles.lbTime}>{entry.time}</span>
                  </div>
                ))}
              </div>

              {shareUrl && (
                <div className={styles.sideSection}>
                  <div className={styles.sideLabel}>Share</div>
                  <div className={styles.sideShareBox}>
                    <div className={styles.sideShareDesc}>Send this to spectators watching from home</div>
                    <div className={styles.sideShareUrl}>{shareUrl}</div>
                    <button className={styles.sideShareBtn} onClick={copyShare}>
                      {copied ? 'Copied!' : 'Copy link'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
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
