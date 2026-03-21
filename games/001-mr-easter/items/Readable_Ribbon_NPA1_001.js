// games/001-mr-easter/items/Readable_Ribbon_NPA1_001.js
// Torn ribbon — left third — narrative puzzle fragment NP-A1 (1 of 3)
// Has faint writing along the edge. Needs NP-A2 and NP-A3 to read the full message.
// is_red_herring: false

export const item = {
  id: 'ribbon-fragment-npa1',
  name: 'Ribbon fragment',
  type: 'Readable_Note_001',
  description: "A third of a yellow ribbon, torn at both ends. There is faint writing along one edge. It cuts off mid-sentence.",
  droppedBy: 'Mr Easter',
  source: 'character',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: false,
  content: {
    title: 'RIBBON FRAGMENT [1 OF 3]',
    text: `[written in tiny careful letters along the ribbon's edge]

"The basket was never meant to leave the warehouse. I told them this in —"

[ribbon torn — text continues on missing section]`,
    signature: null,
  },
}
