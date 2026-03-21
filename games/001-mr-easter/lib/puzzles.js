// pages/api/puzzles.js
// Returns stages for the game room.
// Loads from static JS data file — no Sheets dependency.
// Stage messages are defined in games/001-mr-easter/lib/stages.js

import { STAGES_DATA } from '../../games/001-mr-easter/lib/stages'

export default async function handler(req, res) {
  const { game } = req.query
  if (!game) return res.status(400).json({ error: 'game param required' })

  try {
    // STAGES_DATA is shared across all games for now.
    // If you add more games, filter by game id here.
    const stages = STAGES_DATA.map(s => ({
      stage: s.stage,
      messages: (s.messages || []).map(m => ({
        sender: m.sender,
        text: m.text,
        isQuestion: false,
      })),
    }))

    res.status(200).json(stages)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load puzzles' })
  }
}
