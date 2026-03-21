// games/001-mr-easter/items/Readable_Letter_Fragment_001.js
// Torn letter — bottom half only — narrative clue
// References "the third basket." Top half is missing.
// is_red_herring: false

export const item = {
  id: 'letter-fragment',
  name: 'Torn letter',
  type: 'Readable_Note_001',
  description: "The bottom half of a letter. The top has been torn away. What remains is enough to raise questions.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found near the pond path',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: false,
  content: {
    title: null,
    text: `— and that is why the third basket was never logged. We agreed this at the time. You agreed this at the time.

If anyone finds this, they will have questions. Those questions will lead back to the warehouse. The warehouse leads back to you, not to me.

I am telling you this as a courtesy. Destroy the other copy.`,
    signature: '— T',
  },
}
