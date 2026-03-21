// games/001-mr-easter/items/Readable_Map_HandDrawn_001.js
// Hand-drawn park map — geo clue
// Pencil sketch with X marks that don't match the official egg locations.
// is_red_herring: false

export const item = {
  id: 'map-hand-drawn',
  name: 'Hand-drawn map',
  type: 'Readable_Manifest_001',
  description: "A rough pencil sketch of the park on the back of a torn envelope. X marks that don't match the official egg locations.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found folded inside the park notice frame',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: false,
  content: {
    title: 'PARK SKETCH — PERSONAL USE',
    date: 'Undated',
    supervisor: 'Unknown hand',
    rows: [
      { ref: 'X1', contents: 'Third tree from east gate', shelf: 'Zone A', status: 'MARKED' },
      { ref: 'X2', contents: 'Behind the pond — north side', shelf: 'Zone B', status: 'MARKED' },
      { ref: 'X3', contents: 'Below bench row 4', shelf: 'Zone D', status: 'MARKED' },
      { ref: '?', contents: '[illegible] — near old oak roots', shelf: 'Zone A', status: 'MARKED' },
    ],
    signed: 'Note at bottom: These are not the eggs.',
  },
}
