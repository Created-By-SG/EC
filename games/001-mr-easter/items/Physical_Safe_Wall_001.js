// games/001-mr-easter/items/Physical_Safe_Wall_001.js
// Small wall safe — McGuffin part 2 of 3
// The actuator spindle is exposed but the operating mechanism is absent.
// Players who have the brass knob should eventually connect them.
// Description deliberately avoids mentioning a knob.
// is_red_herring: false

export const item = {
  id: 'safe-wall',
  name: 'Wall safe',
  type: 'Physical_Key_001',
  description: 'A small recessed safe bolted behind a loose panel. Locked. The central actuator spindle is exposed... something has been removed from it. The door has not moved in a long time.',
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found behind a loose panel near the park maintenance area',
  combinedWith: 'knob-brass',
  combinationMechanic: 'physical_fit',
  isRedHerring: false,
  content: {
    material: 'Steel',
    condition: 'Old, surface rust on edges',
    lock: 'Rotary combination, actuator spindle exposed',
    markings: 'Stamped: B-12 ... possibly a serial or room reference',
    status: 'Locked',
  },
}
