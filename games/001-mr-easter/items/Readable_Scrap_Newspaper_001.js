// games/001-mr-easter/items/Readable_Scrap_Newspaper_001.js
// Torn newspaper classifieds — narrative clue
// A circled ad reads like a code.
// is_red_herring: false

export const item = {
  id: 'scrap-newspaper',
  name: 'Newspaper scrap',
  type: 'Readable_Note_001',
  description: "A torn section of classified ads. One ad has been circled in pencil.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Wedged under the leg of the park bench',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: 'CLASSIFIEDS — NOTICES',
    text: `LOST: One yellow ribbon, approx 2m. Sentimental value.
If found, leave at third bench from the east gate.
No questions. — Box 441

FOR SALE: Brass key, cold room type. Unused.
Owner no longer requires access. — Box 119

FOUND: Small basket, no contents, no label.
Collected from Zone B. Contact parks office.

NOTICE: The arrangement for 18 April
remains in place. Parties concerned
should confirm by return. — Box 441`,
    signature: null,
  hiddenAnnotations: [],
  },
}
