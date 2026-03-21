// games/001-mr-easter/items/Readable_Journal_MrEaster_001.js
// Mr Easter's pocket journal — first entry
// Lore item. Establishes his voice and hints at "the arrangement."
// is_red_herring: false

export const item = {
  id: 'journal-mr-easter-1',
  name: "Mr Easter's journal",
  type: 'Readable_Note_001',
  description: "A small battered journal. Soft cover, corners worn down. His initials are stamped inside.",
  droppedBy: 'Mr Easter',
  source: 'character',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: 'PERSONAL — DO NOT READ',
    text: `Entry 1.

I have been doing this for thirty-one years. Thirty-one. I know every basket, every route, every shelf number in every warehouse in this district.

I do not make mistakes.

Which is why I need to write this down. Because if something goes wrong this year — and I believe something will — I want there to be a record of what I knew and when I knew it.

The arrangement began three seasons ago. I was approached. I said no. Then I said yes. I am not proud of that.

What I am is careful. And careful people keep notes.`,
    signature: 'E.',
  hiddenAnnotations: [],
  },
}
