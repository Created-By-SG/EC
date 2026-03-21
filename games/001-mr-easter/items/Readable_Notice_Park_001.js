// games/001-mr-easter/items/Readable_Notice_Park_001.js
// Official park notice — lore item
// Laminated, faded. Restricts access "until further notice." Has a sticky note on it.
// is_red_herring: false

export const item = {
  id: 'notice-park',
  name: 'Park notice',
  type: 'Readable_Manifest_001',
  description: "A laminated council notice, sun-faded. Someone has stuck a handwritten note on top of it.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Nailed to the old oak tree',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: 'NOTICE — RESTRICTED ACCESS',
    date: 'Issued: 3 March',
    supervisor: 'Parks & Recreation Authority',
    rows: [
      { ref: 'Zone A', contents: 'East gate to old oak', shelf: 'Open', status: 'OPEN' },
      { ref: 'Zone B', contents: 'Old oak to the pond', shelf: 'Restricted', status: 'CLOSED' },
      { ref: 'Zone C', contents: 'Pond to north fence', shelf: 'Restricted', status: 'CLOSED' },
      { ref: 'Zone D', contents: 'North fence to bench row', shelf: 'Open', status: 'OPEN' },
    ],
    signed: `Access to Zones B and C restricted until further notice.\n\n[sticky note in different handwriting]: Zone B has been open since Tuesday. Someone removed the tape.`,
  hiddenAnnotations: [],
  },
}
