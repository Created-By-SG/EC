// pages/api/complete-game.js
// Called once when the player solves the final stage.
// Writes the final score to the leaderboard and marks the booking as complete.
// POST /api/complete-game
// Body: { sessionId, elapsedSeconds, roomSlug, teamName }

import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { sessionId, elapsedSeconds, roomSlug, teamName } = req.body
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' })

  // 1. Upsert leaderboard row with final time
  const { error: lbError } = await supabaseAdmin
    .from('leaderboard')
    .upsert({
      session_id: sessionId,
      room_slug: roomSlug,
      team_name: teamName,
      stages_solved: 9, // full completion
      elapsed_seconds: elapsedSeconds,
      completed: true,
    }, { onConflict: 'session_id' })

  if (lbError) {
    console.error('complete-game leaderboard error:', lbError)
    // Non-fatal — don't fail the player's completion screen
  }

  // 2. Mark booking as complete so the code can't start a new session
  await supabaseAdmin
    .from('bookings')
    .update({ status: 'complete' })
    .eq('session_id', sessionId)

  return res.status(200).json({ ok: true })
}
