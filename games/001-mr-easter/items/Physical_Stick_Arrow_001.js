// games/001-mr-easter/items/Physical_Stick_Arrow_001.js
// Stick arranged like an arrow — physical narrative clue
// Deliberately placed. Points toward Zone B.
// is_red_herring: false

export const item = {
  id: 'stick-arrow',
  name: 'Arranged stick',
  type: 'Physical_Key_001',
  description: "A broken stick, placed deliberately on the ground in the shape of an arrow. It's pointing toward Zone B.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found on the path near the east gate',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: false,
  content: {
    label: 'ARROW',
    material: 'Stick',
    condition: 'Deliberately placed',
  },
}
