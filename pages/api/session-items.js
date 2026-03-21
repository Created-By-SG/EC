// pages/api/session-items.js
// Returns all items collected by a session.
// GET /api/session-items?sessionId=xxx

import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { sessionId } = req.query
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' })

  const { data, error } = await supabaseAdmin
    .from('session_items')
    .select('item_id, stage_given, collected_at')
    .eq('session_id', sessionId)
    .order('collected_at', { ascending: true })

  if (error) {
    console.error('session-items error:', error)
    return res.status(500).json({ error: 'Failed to fetch items' })
  }

  return res.status(200).json(data || [])
}
