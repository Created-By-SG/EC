// pages/api/start-session.js
// Called when a player validates their booking and hits Start Game.
// Creates a session + locked stage_progress rows for every stage.
// Marks the booking as active and links session_id to it.
// Returns { sessionId, shareToken, startedAt } to the client.

import { supabaseAdmin } from '../../lib/supabase'

function generateShareToken(length = 6) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}

function generateSpectatorPin() {
  return String(Math.floor(1000 + Math.random() * 9000))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { teamName, email, bookingId, roomSlug, stages } = req.body

  if (!teamName || !roomSlug || !stages?.length) {
    return res.status(400).json({ error: 'teamName, roomSlug, and stages are required' })
  }

  const startedAt = new Date().toISOString()

  // 1. Create the session
  const spectatorPin = generateSpectatorPin()

  const { data: session, error: sessionError } = await supabaseAdmin
    .from('sessions')
    .insert({
      team_name: teamName.trim(),
      room_slug: roomSlug,
      share_token: generateShareToken(),
      started_at: startedAt,
      email: email || null,
      spectator_pin: spectatorPin,
      spectator_count: 0,
    })
    .select('id, share_token, started_at')
    .single()

  if (sessionError) {
    console.error('start-session error:', sessionError)
    return res.status(500).json({ error: 'Failed to create session' })
  }

  // 2. Create locked stage_progress rows for every stage
  const progressRows = stages.map((stage, i) => ({
    session_id: session.id,
    stage,
    status: i === 0 ? 'active' : 'locked',
  }))

  const { error: progressError } = await supabaseAdmin
    .from('stage_progress')
    .insert(progressRows)

  if (progressError) {
    console.error('stage_progress insert error:', progressError)
    return res.status(500).json({ error: 'Failed to create stage progress' })
  }

  // 3. Seed the leaderboard row
  await supabaseAdmin.from('leaderboard').insert({
    session_id: session.id,
    room_slug: roomSlug,
    team_name: teamName.trim(),
    stages_solved: 0,
    elapsed_seconds: 0,
  })

  // 4. Mark booking as active and link to this session
  if (bookingId) {
    await supabaseAdmin
      .from('bookings')
      .update({ status: 'active', session_id: session.id })
      .eq('id', bookingId)
  }

  return res.status(200).json({
    sessionId: session.id,
    shareToken: session.share_token,
    startedAt: session.started_at,
    spectatorPin,
  })
}
