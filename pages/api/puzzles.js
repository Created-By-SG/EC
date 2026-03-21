// pages/api/puzzles.js
// Returns stage list with story messages for the game room.
// Source of truth is game.js — Google Sheets is no longer used.

import { STAGES, getMessages } from '../../games/001-mr-easter/game'

export default async function handler(req, res) {
  const { game } = req.query
  if (!game) return res.status(400).json({ error: 'game param required' })

  try {
    const stages = STAGES.map(s => ({
      stage: s.stage,
      messages: getMessages(s.stage).map(m => ({
        sender: m.sender,
        text: m.text,
        type: m.type || null,
        isQuestion: false,
      })),
    }))

    res.status(200).json(stages)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load puzzles' })
  }
}
