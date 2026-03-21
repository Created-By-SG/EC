// games/001-mr-easter/items/Physical_Knob_Brass_001.js
// Brass turning knob — McGuffin part 1 of 3
// Looks decorative or incidental. Players won't know what it fits until they find the safe.
// is_red_herring: false

export const item = {
  id: 'knob-brass',
  name: 'Brass knob',
  type: 'Physical_Key_001',
  description: 'A small, heavy brass knob. Turned and worn smooth from years of use. The base has a square socket. No obvious purpose on its own.',
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found on the ground near the park bench',
  combinedWith: 'safe-wall',
  combinationMechanic: 'physical_fit',
  isRedHerring: false,
  content: {
    material: 'Brass',
    condition: 'Well worn',
    socket: 'Square drive, 8mm',
    markings: 'None',
  },
}
