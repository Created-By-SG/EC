// games/001-mr-easter/items/Readable_Manifest_Warehouse_001.js
// Official warehouse basket manifest — key evidence item
// Combines with: Tool_UVTorch_001 to reveal hidden annotations in invisible ink
// is_red_herring: false

export const item = {
  id: 'warehouse-manifest',
  name: 'Warehouse manifest',
  type: 'Readable_Manifest_001',
  description: 'The official Easter basket packing manifest for the Southport delivery run.',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: 'BASKET MANIFEST — SOUTHPORT DISTRICT',
    date: '18 April 2025',
    supervisor: 'Mr Easter',
    rows: [
      { ref: 'SOU-001', contents: 'Milk chocolate eggs x24', shelf: '4-2', status: 'PACKED' },
      { ref: 'SOU-002', contents: 'Foil wrapped mini eggs x48', shelf: '4-3', status: 'PACKED' },
      { ref: 'SOU-003', contents: 'Jelly beans assorted x1 bag', shelf: '4-4', status: 'PACKED' },
      { ref: 'SOU-004', contents: 'Ribbon yellow x2m', shelf: '4-5', status: 'PACKED' },
      { ref: 'SOU-005', contents: 'Basket liner tissue x3', shelf: '4-6', status: 'PACKED' },
    ],
    hiddenAnnotations: [
      { ref: 'SOU-003', note: 'PORRIDGE CHECKED THIS ONE TWICE' },
      { ref: 'SOU-004', note: 'RIBBON REPLACED — ORIGINAL TAKEN' },
    ],
    signed: 'Mr Easter — Chief Delivery Officer',
  },
}
