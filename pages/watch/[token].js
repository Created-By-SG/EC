// pages/watch/[token].js
// Spectator view — up to 4 people can watch a live game session.
// Requires the 4-digit spectator PIN to enter.
// Polls session progress every 10 seconds.

import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../../styles/Watch.module.css'

const GAME_DURATION = 2 * 60 * 60
const MAX_SPECTATORS = 4
const POLL_INTERVAL = 10_000

export default function WatchPage({ token }) {
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [checking, setChecking] = useState(false)
  const [session, setSession] = useState(null)
  const [expired, setExpired] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [spectatorCount, setSpectatorCount] = useState(null)
  const [denied, setDenied] = useState(false)

  // Poll session data once authenticated
  useEffect(() => {
    if (!session) return
    const poll = () => fetchProgress()
    poll()
    const t = setInterval(poll, POLL_INTERVAL)
    return () => clearInterval(t)
  }, [session])

  // Live timer driven by startedAt
  useEffect(() => {
    if (!session?.startedAt) return
    const tick = () => {
      const elapsed = Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000)
      setSeconds(elapsed)
      if (elapsed >= GAME_DURATION) setExpired(true)
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [session?.startedAt])

  async function fetchProgress() {
    try {
      const res = await fetch(`/api/watch-session?token=${token}&pin=${session.pin}`)
      const data = await res.json()
      if (!res.ok) return
      setSession(prev => ({ ...prev, ...data }))
      setSpectatorCount(data.spectatorCount)
      if (data.expired) setExpired(true)
    } catch {}
  }

  async function submitPin() {
    if (pin.length !== 4) { setPinError('Enter the 4-digit code'); return }
    setChecking(true)
    setPinError('')
    try {
      const res = await fetch(`/api/watch-session?token=${token}&pin=${pin}`)
      const data = await res.json()
      if (!res.ok) {
        if (data.code === 'FULL') {
          setDenied(true)
        } else {
          setPinError(data.error || 'Invalid code')
        }
        return
      }
      setSession({ ...data, pin })
      setSpectatorCount(data.spectatorCount)
    } catch {
      setPinError('Something went wrong. Try again.')
    } finally {
      setChecking(false)
    }
  }

  const formatTime = s => {
    const remaining = Math.max(0, GAME_DURATION - s)
    const h = String(Math.floor(remaining / 3600)).padStart(2, '0')
    const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0')
    const ss = String(remaining % 60).padStart(2, '0')
    return `${h}:${m}:${ss}`
  }

  // ── Denied (full) ───────────────────────────────────────────────
  if (denied) {
    return (
      <div className={styles.gate}>
        <Head><title>Spectator Full | Escape City</title></Head>
        <div className={styles.gateCard}>
          <div className={styles.eyebrow}>Escape City</div>
          <div className={styles.gateTitle}>Spectator slots full</div>
          <div className={styles.gateSub}>
            This session already has {MAX_SPECTATORS} spectators watching. Ask the player to share a new link when a slot opens.
          </div>
        </div>
      </div>
    )
  }

  // ── PIN gate ────────────────────────────────────────────────────
  if (!session) {
    return (
      <div className={styles.gate}>
        <Head><title>Spectator | Escape City</title></Head>
        <div className={styles.gateCard}>
          <div className={styles.eyebrow}>Escape City — Spectator</div>
          <div className={styles.gateTitle}>Enter your spectator code</div>
          <div className={styles.gateSub}>The player shared a 4-digit code with you.</div>
          <input
            className={styles.pinInput}
            type="number"
            inputMode="numeric"
            maxLength={4}
            placeholder="0000"
            value={pin}
            onChange={e => setPin(e.target.value.slice(0, 4))}
            onKeyDown={e => e.key === 'Enter' && submitPin()}
            autoFocus
          />
          {pinError && <div className={styles.pinError}>{pinError}</div>}
          <button className={styles.pinBtn} onClick={submitPin} disabled={checking}>
            {checking ? 'Checking…' : 'Watch Live'}
          </button>
        </div>
      </div>
    )
  }

  // ── Live spectator view ─────────────────────────────────────────
  const progress = session.progressData || {}
  const stages = session.stages || []
  const solvedCount = Object.values(progress).filter(v => v === 'solved').length
  const activeStage = stages.find(s => progress[s] === 'active')
  const totalStages = stages.length

  return (
    <>
      <Head><title>Watching {session.teamName} | Escape City</title></Head>

      <div className={styles.wrap}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrow}>Escape City — Live</div>
            <div className={styles.teamName}>{session.teamName}</div>
            <div className={styles.gameName}>{session.roomName || 'The Bunny Who Stole Easter'}</div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.timerLabel}>Time remaining</div>
            <div className={`${styles.timer} ${expired ? styles.timerExpired : ''}`}>
              {expired ? 'Time up' : formatTime(seconds)}
            </div>
            {spectatorCount && (
              <div className={styles.spectatorCount}>
                👁 {spectatorCount}/{MAX_SPECTATORS} watching
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          {stages.map(s => (
            <div
              key={s}
              className={[
                styles.progressPip,
                progress[s] === 'solved' ? styles.pipSolved : '',
                progress[s] === 'active' ? styles.pipActive : '',
              ].filter(Boolean).join(' ')}
            />
          ))}
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statVal}>{solvedCount}</div>
            <div className={styles.statKey}>Stages solved</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statVal}>{totalStages - solvedCount}</div>
            <div className={styles.statKey}>Remaining</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statVal}>{activeStage ? `Stage ${activeStage}` : expired ? 'Finished' : '—'}</div>
            <div className={styles.statKey}>Currently on</div>
          </div>
        </div>

        {/* Stage list */}
        <div className={styles.stageList}>
          {stages.map((s, i) => (
            <div key={s} className={[
              styles.stageRow,
              progress[s] === 'solved' ? styles.stageSolved : '',
              progress[s] === 'active' ? styles.stageActive : '',
            ].filter(Boolean).join(' ')}>
              <div className={styles.stageNum}>Stage {i + 1}</div>
              <div className={styles.stageStatus}>
                {progress[s] === 'solved' && '✓ Solved'}
                {progress[s] === 'active' && '● In progress'}
                {progress[s] === 'locked' && '— Locked'}
              </div>
            </div>
          ))}
        </div>

        {expired && (
          <div className={styles.expiredBanner}>
            Time's up — {solvedCount} of {totalStages} stages solved
          </div>
        )}

        <div className={styles.footer}>Updates every 10 seconds</div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  return { props: { token: context.params.token } }
}
