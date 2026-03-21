// pages/api/resume-session.js
// Restores a session from Supabase using sessionId.
// Used both for tab resume and for additional players joining the same session.
// Returns full state — progress, items, timer — so all screens stay in sync.
// GET /api/resume-session?sessionId=xxx

import { supabaseAdmin } from '../../lib/supabase'

const GAME_DURATION = 2 * 60 * 60

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { sessionId } = req.query
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' })

  // 1. Fetch session
  const { data: session, error: sessionError } = await supabaseAdmin
    .from('sessions')
    .select('id, team_name, share_token, started_at, room_slug, spectator_pin, spectator_count')
    .eq('id', sessionId)
    .single()

  if (sessionError || !session) {
    return res.status(404).json({ error: 'Session not found' })
  }

  // 2. Calculate elapsed seconds
  const elapsedSeconds = session.started_at
    ? Math.floor((Date.now() - new Date(session.started_at).getTime()) / 1000)
    : 0

  const expired = elapsedSeconds >= GAME_DURATION

  // 3. Fetch stage progress
  const { data: stageRows } = await supabaseAdmin
    .from('stage_progress')
    .select('stage, status, puzzle_index')
    .eq('session_id', sessionId)
    .order('stage', { ascending: true })

  const progressData = {}
  const puzzleMasks = {}
  if (stageRows) {
    stageRows.forEach(row => {
      progressData[row.stage] = row.status
      if (row.puzzle_index != null) puzzleMasks[row.stage] = row.puzzle_index
    })
  }

  // 4. Fetch collected items so joining players get full inventory
  const { data: itemRows } = await supabaseAdmin
    .from('session_items')
    .select('item_id, stage_given, collected_at')
    .eq('session_id', sessionId)
    .order('collected_at', { ascending: true })

  return res.status(200).json({
    sessionId: session.id,
    teamName: session.team_name,
    shareToken: session.share_token,
    startedAt: session.started_at,
    elapsedSeconds,
    expired,
    progressData,
    puzzleMasks,
    collectedItems: itemRows || [],
  })
}
