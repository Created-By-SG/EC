// games/001-mr-easter/items/Physical_Ribbon_001.js
// Yellow ribbon — red herring
// Found near the basket location. Referenced in the manifest as replaced.
// Players will think it matters. It does not.
// is_red_herring: true

export const item = {
  id: 'yellow-ribbon',
  name: 'Yellow ribbon',
  type: 'Physical_Ribbon_001',
  description: 'A length of yellow ribbon. Slightly frayed at one end. Smells faintly of chocolate.',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: true,
  content: {
    color: 'Yellow',
    length: 'Approximately 60cm',
    condition: 'Slightly frayed',
    smell: 'Chocolate',
  },
}
