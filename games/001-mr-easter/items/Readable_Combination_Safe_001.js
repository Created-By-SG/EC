// games/001-mr-easter/items/Readable_Combination_Safe_001.js
// Combination slip — McGuffin part 3 of 3
// Written to look like a storage reference or internal memo.
// The three numbers are the safe combination. Players won't know that until they have the safe.
// is_red_herring: false

export const item = {
  id: 'combination-safe',
  name: 'Internal memo',
  type: 'Readable_Note_001',
  description: 'A folded slip of paper. Formatted like an internal memo. The numbers read like a storage reference... or something else.',
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found tucked inside the field manual in the Kin Sack',
  combinedWith: 'safe-wall',
  combinationMechanic: 'combination_entry',
  isRedHerring: false,
  content: {
    title: 'INTERNAL NOTE ... DO NOT DISTRIBUTE',
    text: `Re: B-12 access

Authorised entry sequence updated as of last rotation.

Left 4 ... Right 9 ... Left 7

This reference is for approved personnel only.
If found, return to operations.`,
    signature: 'M.E ... Operations',
  },
}
