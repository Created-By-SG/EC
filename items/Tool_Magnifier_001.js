// games/shared/items/Tool_Magnifier_001.js
// Reusable magnifying glass tool
// When combined with a Visual item that has combinationMechanic: 'magnify'
// dragging the magnifier reveals fine hidden detail in the image
// is_red_herring: false

export const item = {
  id: 'magnifier',
  name: 'Magnifying glass',
  type: 'Tool_Magnifier_001',
  description: 'A brass handled magnifying glass. Old but functional.',
  combinedWith: null,
  combinationMechanic: 'magnify',
  isRedHerring: false,
  content: {
    lensRadius: 70,
    zoomLevel: 3,
  },
}
