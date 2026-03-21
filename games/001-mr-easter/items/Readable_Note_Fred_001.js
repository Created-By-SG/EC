// games/001-mr-easter/items/Readable_Note_Fred_001.js
// Fred's crumpled warehouse note — key evidence item
// Combines with: Tool_CipherWheel_001 to reveal hidden annotation
// is_red_herring: false

export const item = {
  id: 'fred-note',
  name: "Fred's note",
  type: 'Readable_Note_001',
  description: 'A crumpled piece of paper found near the warehouse entrance.',
  combinedWith: 'cipher-wheel',
  combinationMechanic: 'cipher_overlay',
  isRedHerring: false,
  content: {
    title: 'Warehouse Log',
    text: `I arrived at 11:47pm. Not invited. I know.

The basket was there when I arrived. I checked the manifest. Southport, row 4, shelf 2. All correct.

I left at 12:03am. The basket was still there.

I saw Chuckles near the cold room on my way out. He was carrying something. I do not know what.

I am not saying anything further without representation.`,
    signature: 'Fred',
    hiddenText: 'HE TOOK THE BLUE DYE',
  },
}
