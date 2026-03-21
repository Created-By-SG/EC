// games/001-mr-easter/items/Readable_MapFragment_GP01_001.js
// Map fragment — top third — geo puzzle part 1 of 3
// Torn from a larger map. Shows the north section of the park.
// Combines with GP02 and GP03 to reveal the full map.
// is_red_herring: false

export const item = {
  id: 'map-fragment-gp01',
  name: 'Map fragment — top',
  type: 'Readable_Note_001',
  description: "The top third of a larger hand-drawn map. Torn cleanly. The north end of the park is visible.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found near the north fence',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: false,
  content: {
    title: 'MAP FRAGMENT [1 OF 3]',
    text: `[top section of a hand-drawn park map]

North fence — — — — — — — — — —
|                                |
|   [oak symbol]    [bench row]  |
|                                |
|   ← Zone B    |    Zone D →   |
|                                |
— — — — — [torn edge] — — — — — —

A small annotation at the top reads:
"Confirmed: the third marker is not on this section."`,
    signature: null,
  },
}
