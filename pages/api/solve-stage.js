// pages/api/solve-stage.js
// Called when a player correctly answers a stage.
// Multiplayer safe — checks if stage already solved before acting.
// Items use upsert to prevent duplicates if multiple players trigger simultaneously.

import { supabaseAdmin } from '../../lib/supabase'
import { ITEMS } from '../../games/001-mr-easter/items'
import { getPoolSize } from '../../games/001-mr-easter/game'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { sessionId, stage, nextStage, elapsedSeconds } = req.body
  if (!sessionId || !stage) return res.status(400).json({ error: 'Missing fields' })

  // 1. Check if stage is already solved — if so, return ok silently
  // This handles the race condition where two players solve simultaneously
  const { data: current } = await supabaseAdmin
    .from('stage_progress')
    .select('status')
    .eq('session_id', sessionId)
    .eq('stage', stage)
    .single()

  if (current?.status === 'solved') {
    return res.status(200).json({ ok: true, alreadySolved: true })
  }

  // 2. Mark current stage as solved
  const { error: solveError } = await supabaseAdmin
    .from('stage_progress')
    .update({ status: 'solved' })
    .eq('session_id', sessionId)
    .eq('stage', stage)

  if (solveError) {
    console.error('[solve-stage] solve error:', solveError)
    return res.status(500).json({ error: 'Failed to solve stage' })
  }
  console.log(`[solve-stage] stage ${stage} solved for session ${sessionId}`)

  // 3. Unlock next stage with a randomly assigned puzzle_index
  if (nextStage) {
    // Check next stage isn't already active or solved (another player may have unlocked it)
    const { data: nextCurrent } = await supabaseAdmin
      .from('stage_progress')
      .select('status')
      .eq('session_id', sessionId)
      .eq('stage', nextStage)
      .single()

    if (nextCurrent?.status === 'locked') {
      const poolSize = getPoolSize(nextStage)
      const puzzleIndex = Math.floor(Math.random() * poolSize)

      const { error: unlockError } = await supabaseAdmin
        .from('stage_progress')
        .update({ status: 'active', puzzle_index: puzzleIndex })
        .eq('session_id', sessionId)
        .eq('stage', nextStage)

      if (unlockError) {
        console.error('unlock error:', unlockError)
        return res.status(500).json({ error: 'Failed to unlock next stage' })
      }
    }
  }

  // 4. Deliver items for this stage — upsert prevents duplicates
  const paddedStage = String(stage).padStart(2, '0')
  const stageItems = ITEMS.filter(item => item.stage_given === paddedStage)

  if (stageItems.length > 0) {
    const itemRows = stageItems.map(item => ({
      session_id: sessionId,
      item_id: item.id,
      stage_given: stage,
    }))

    const { error: itemError } = await supabaseAdmin
      .from('session_items')
      .upsert(itemRows, { onConflict: 'session_id,item_id', ignoreDuplicates: true })

    if (itemError) {
      console.error('item upsert error:', itemError)
      // Non-fatal — log but don't fail the request
    }
  }

  return res.status(200).json({ ok: true })
}
