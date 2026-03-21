// pages/api/save-progress.js
// Lightweight save triggered on individual puzzle completion.
// Updates elapsed_seconds on the session so resume is accurate.
// Also accepts puzzleMask + stage to persist sub-puzzle completion state
// via puzzle_index on stage_progress (bitmask: 1=story done, 2=geo done).
// POST /api/save-progress
// Body: { sessionId, elapsedSeconds, stage?, puzzleMask? }

import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { sessionId, elapsedSeconds, stage, puzzleMask } = req.body
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' })

  const { error } = await supabaseAdmin
    .from('sessions')
    .update({ last_saved_seconds: elapsedSeconds })
    .eq('id', sessionId)

  if (error) console.error('[save-progress] session update error:', error)
  else console.log(`[save-progress] session ${sessionId} updated, elapsed=${elapsedSeconds}`)

  // Persist sub-puzzle completion bitmask if provided
  if (stage != null && puzzleMask != null) {
    const { error: maskError } = await supabaseAdmin
      .from('stage_progress')
      .update({ puzzle_index: puzzleMask })
      .eq('session_id', sessionId)
      .eq('stage', stage)

    if (maskError) console.error('[save-progress] puzzle_index error:', maskError)
    else console.log(`[save-progress] stage ${stage} mask=${puzzleMask} saved`)
  }

  return res.status(200).json({ ok: true })
}
