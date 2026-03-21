// pages/api/use-hint.js
// Called whenever a team taps the hint button on a stage.
// Increments hints_used for that stage.

import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { sessionId, stage } = req.body

  if (!sessionId || !stage) {
    return res.status(400).json({ error: 'sessionId and stage are required' })
  }

  // Postgres rpc to atomically increment — avoids race conditions
  const { error } = await supabaseAdmin.rpc('increment_hints', {
    p_session_id: sessionId,
    p_stage: stage,
  })

  if (error) {
    // Fallback if the rpc function isn't set up yet: plain update
    const { data: current } = await supabaseAdmin
      .from('stage_progress')
      .select('hints_used')
      .eq('session_id', sessionId)
      .eq('stage', stage)
      .single()

    await supabaseAdmin
      .from('stage_progress')
      .update({ hints_used: (current?.hints_used ?? 0) + 1 })
      .eq('session_id', sessionId)
      .eq('stage', stage)
  }

  return res.status(200).json({ ok: true })
}

// ----------------------------------------------------------------
// Add this function in Supabase SQL editor for atomic increments:
// ----------------------------------------------------------------
// create or replace function increment_hints(p_session_id uuid, p_stage text)
// returns void language sql as $$
//   update stage_progress
//   set hints_used = hints_used + 1
//   where session_id = p_session_id and stage = p_stage;
// $$;
