// games/shared/items/Tool_CipherWheel_001.js
// Reusable cipher wheel tool — two rotating alphabet rings
// When combined with a Readable item that has combinationMechanic: 'cipher_overlay'
// the wheel overlays the document and reveals hidden letters through its cutouts
// is_red_herring: false (always functional when matched with correct document)

export const item = {
  id: 'cipher-wheel',
  name: 'Cipher wheel',
  type: 'Tool_CipherWheel_001',
  description: 'A wooden disc with two rotating alphabet rings and small cutout windows.',
  combinedWith: null, // set dynamically — combines with any cipher_overlay item
  combinationMechanic: 'cipher_overlay',
  isRedHerring: false,
  content: {
    outerRing: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    innerRing: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    windows: [0, 4, 8, 12], // positions of cutout windows
  },
}
