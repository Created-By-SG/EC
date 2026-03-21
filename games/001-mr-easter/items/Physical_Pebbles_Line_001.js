// games/001-mr-easter/items/Physical_Pebbles_Line_001.js
// Pebbles in a line — physical geo clue
// Seven pebbles. Deliberately spaced. The spacing is uneven in a pattern.
// is_red_herring: false

export const item = {
  id: 'pebbles-line',
  name: 'Pebble line',
  type: 'Physical_Key_001',
  description: "Seven small pebbles arranged in a straight line. The spacing between them is uneven — short, short, long, short, long, long, short. Like a pattern.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found along the path between the gate and the oak',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: false,
  content: {
    label: '· · — · — — ·',
    material: 'Pebbles',
    condition: 'Deliberately placed',
  },
}
