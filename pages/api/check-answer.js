// pages/api/check-answer.js
// Validates player answer server-side against game.js puzzle configs.
// Google Sheets is no longer used — game.js is the source of truth.
// Answer never reaches the browser.

import { getStoryPuzzle, getGeoPuzzle } from '../../games/001-mr-easter/game'

function normalise(str) {
  return String(str).trim().toLowerCase().replace(/\s+/g, '')
}

function checkPuzzleAnswer(puzzleDef, answer) {
  if (!puzzleDef?.config) return false
  const config = puzzleDef.config

  // Number dials / letter drums — answer is an array, player submits joined string or array
  if (Array.isArray(config.answer)) {
    const expected = config.answer.map(String).join('').toLowerCase()
    const given = Array.isArray(answer)
      ? answer.map(String).join('').toLowerCase()
      : normalise(answer)
    return given === expected
  }

  // Potion mixer — answer is { R, B, Y }
  if (config.answer && typeof config.answer === 'object' && 'R' in config.answer) {
    if (typeof answer !== 'object') return false
    return (
      Number(answer.R) === Number(config.answer.R) &&
      Number(answer.B) === Number(config.answer.B) &&
      Number(answer.Y) === Number(config.answer.Y)
    )
  }

  // Plain string comparison fallback
  return normalise(answer) === normalise(config.answer)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // storyIndex — which step in a multi-puzzle storyPool the player is currently on
  //              (stage 1 has 3 sequential puzzles; other stages have 1 so it defaults to 0)
  // puzzleIndex — the randomly assigned pool variant for this session (from stage_progress)
  const { game, stage, answer, puzzleType, storyIndex, puzzleIndex } = req.body
  if (!game || !stage || answer === undefined) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    // Resolve the correct puzzle definition using both indices.
    // storyIndex selects which sub-puzzle within a multi-step storyPool.
    // puzzleIndex selects which pool variant was assigned to this session.
    const resolvedStoryIndex = Number(storyIndex ?? 0)
    const resolvedPoolIndex  = Number(puzzleIndex ?? 0)

    const storyPuzzle = getStoryPuzzle(stage, resolvedStoryIndex)
    const geoPuzzle   = getGeoPuzzle(stage, resolvedPoolIndex)

    let correct = false

    if (puzzleType === 'geo' && geoPuzzle) {
      correct = checkPuzzleAnswer(geoPuzzle, answer)
    } else if (storyPuzzle) {
      correct = checkPuzzleAnswer(storyPuzzle, answer)
      // Also try geo if story didn't match
      if (!correct && geoPuzzle) {
        correct = checkPuzzleAnswer(geoPuzzle, answer)
      }
    }

    return res.status(200).json({ correct })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
