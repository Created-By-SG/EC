// games/001-mr-easter/items/Physical_Key_001.js
// Old warehouse key — red herring
// Looks important. Fits nothing.
// is_red_herring: true

export const item = {
  id: 'old-key',
  name: 'Old key',
  type: 'Physical_Key_001',
  description: 'A heavy brass key. Very old. The tag says COLD ROOM but there is no lock.',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: true,
  content: {
    label: 'COLD ROOM',
    material: 'Brass',
    condition: 'Worn',
  },
}
