// games/shared/items/Tool_UVTorch_001.js
// Reusable UV torch tool
// When combined with a Readable item that has combinationMechanic: 'uv'
// dragging the torch across the document reveals hidden ink
// is_red_herring: false (always functional when matched with correct document)

export const item = {
  id: 'uv-torch',
  name: 'UV torch',
  type: 'Tool_UVTorch_001',
  description: 'A small ultraviolet torch. The kind used to check banknotes. Or hidden messages.',
  combinedWith: null,
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    beamRadius: 80,
    glowColor: '#a855f7',
  },
}
