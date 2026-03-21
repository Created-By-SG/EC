// lib/GameNavContext.js
// Allows the game room page to push timer/pips/bag up into the global nav
// without prop-drilling through _app.js.

import { createContext, useContext, useState } from 'react'

const GameNavContext = createContext(null)

export function GameNavProvider({ children }) {
  const [gameNav, setGameNav] = useState(null)
  return (
    <GameNavContext.Provider value={{ gameNav, setGameNav }}>
      {children}
    </GameNavContext.Provider>
  )
}

export function useGameNav() {
  return useContext(GameNavContext)
}
