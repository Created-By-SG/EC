// pages/api/stage-puzzle.js
// Returns the puzzle_index assigned to a stage for this session.
// Client uses this to render the correct puzzle widget from the pool.
// GET /api/stage-puzzle?sessionId=X&stage=Y

import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { sessionId, stage } = req.query
  if (!sessionId || !stage) return res.status(400).json({ error: 'Missing params' })

  const { data, error } = await supabaseAdmin
    .from('stage_progress')
    .select('puzzle_index')
    .eq('session_id', sessionId)
    .eq('stage', stage)
    .single()

  if (error) return res.status(500).json({ error: 'Failed to fetch puzzle index' })

  return res.status(200).json({ puzzleIndex: data?.puzzle_index ?? 0 })
}
