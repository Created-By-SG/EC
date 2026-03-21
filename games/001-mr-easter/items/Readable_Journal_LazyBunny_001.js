// games/001-mr-easter/items/Readable_Journal_LazyBunny_001.js
// Lazy Bunny's sleep diary — lore item
// Establishes Lazy's character. One entry is circled in red.
// is_red_herring: false

export const item = {
  id: 'journal-lazy-bunny',
  name: "Lazy's sleep diary",
  type: 'Readable_NapLog_001',
  description: "A soft-covered diary dedicated entirely to sleep. Every entry is a nap review.",
  droppedBy: 'Lazy',
  source: 'character',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: false,
  content: {
    title: "LAZY BUNNY'S SLEEP DIARY — DO NOT DISTURB",
    entries: [
      { time: '12 Apr', text: 'Under the oak. 3 hours. Warm. Excellent.' },
      { time: '13 Apr', text: 'Near the gate. 2 hours. Bit draughty. Fine.' },
      { time: '14 Apr', text: 'Old bench. 4 hours. Perfect. No disturbances.' },
      { time: '15 Apr', text: 'Could not settle. Someone kept walking past. Only managed 40 minutes.' },
      { time: '16 Apr', text: 'Back at the oak. 3.5 hours. Good. Dreamed of meadows.' },
      { time: '17 Apr', text: 'DO NOT SLEEP ON THE 3RD. Reminder to self. Porridge said so.' },
      { time: '18 Apr', text: 'Did not sleep. Was asked to watch something. Will not say what.' },
    ],
  },
}
