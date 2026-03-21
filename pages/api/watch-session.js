// pages/api/watch-session.js
// Validates spectator PIN and returns live session progress.
// Enforces max 4 concurrent spectators per session.
// GET /api/watch-session?token=XFdVan&pin=1234

import { supabaseAdmin } from '../../lib/supabase'

const MAX_SPECTATORS = 4
const GAME_DURATION = 2 * 60 * 60

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { token, pin } = req.query
  if (!token || !pin) return res.status(400).json({ error: 'Missing token or pin' })

  // 1. Look up session by share_token
  const { data: session, error: sessionError } = await supabaseAdmin
    .from('sessions')
    .select('id, team_name, room_slug, started_at, spectator_pin, spectator_count')
    .eq('share_token', token)
    .single()

  if (sessionError || !session) {
    return res.status(404).json({ error: 'Session not found. Check the link and try again.' })
  }

  // 2. Validate PIN
  if (String(session.spectator_pin) !== String(pin)) {
    return res.status(401).json({ error: 'Incorrect code. Ask the player for their spectator code.' })
  }

  // 3. Enforce spectator limit
  const currentCount = session.spectator_count || 0
  if (currentCount >= MAX_SPECTATORS) {
    return res.status(403).json({ error: 'Spectator slots full.', code: 'FULL' })
  }

  // 4. Increment spectator count (non-fatal if it fails)
  await supabaseAdmin
    .from('sessions')
    .update({ spectator_count: currentCount + 1 })
    .eq('id', session.id)

  // 5. Fetch stage progress
  const { data: stageRows } = await supabaseAdmin
    .from('stage_progress')
    .select('stage, status')
    .eq('session_id', session.id)
    .order('stage', { ascending: true })

  const progressData = {}
  const stages = []
  if (stageRows) {
    stageRows.forEach(row => {
      progressData[row.stage] = row.status
      stages.push(row.stage)
    })
  }

  // 6. Calculate elapsed / expired
  const elapsedSeconds = session.started_at
    ? Math.floor((Date.now() - new Date(session.started_at).getTime()) / 1000)
    : 0
  const expired = elapsedSeconds >= GAME_DURATION

  return res.status(200).json({
    sessionId: session.id,
    teamName: session.team_name,
    roomName: session.room_slug,
    startedAt: session.started_at,
    elapsedSeconds,
    expired,
    progressData,
    stages,
    spectatorCount: currentCount + 1,
  })
}
