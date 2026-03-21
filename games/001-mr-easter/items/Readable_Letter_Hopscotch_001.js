// games/001-mr-easter/items/Readable_Letter_Hopscotch_001.js
// Letter to "Hopscotch" — lore item
// Formal but clearly coded. Signed only with a carrot drawing.
// is_red_herring: false

export const item = {
  id: 'letter-hopscotch',
  name: 'Letter to Hopscotch',
  type: 'Readable_Memo_001',
  description: "A formal letter addressed to someone called Hopscotch. The sign-off is a small drawing of a carrot.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found tucked under the park bench',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: false,
  content: {
    to: 'Hopscotch',
    from: '[unsigned]',
    subject: 'The Spring Arrangement — Final Confirmation',
    body: `Dear Hopscotch,

This letter confirms that the arrangement discussed in our previous correspondence remains in place for this season.

The third location will be accessible from 11pm. You will not be seen if you are prompt. You know what to collect and where to leave it.

Do not involve the others. Particularly not L.

Destroy this after reading. If you are reading this and you are not Hopscotch, then congratulations — you are now part of something you were not supposed to find.`,
    signed: '🥕',
  },
}
