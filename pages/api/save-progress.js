// pages/api/save-progress.js
// Lightweight save triggered on individual puzzle completion.
// Updates elapsed_seconds on the session so resume is accurate.
// POST /api/save-progress
// Body: { sessionId, elapsedSeconds }

import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { sessionId, elapsedSeconds } = req.body
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' })

  const { error } = await supabaseAdmin
    .from('sessions')
    .update({ last_saved_seconds: elapsedSeconds })
    .eq('id', sessionId)

  if (error) {
    console.error('save-progress error:', error)
  }

  return res.status(200).json({ ok: true })
}
