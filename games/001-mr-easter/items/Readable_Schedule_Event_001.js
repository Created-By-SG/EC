// games/001-mr-easter/items/Readable_Schedule_Event_001.js
// Easter event schedule — narrative clue
// Official printed timetable. Several entries altered by hand.
// is_red_herring: false

export const item = {
  id: 'schedule-event',
  name: 'Event schedule',
  type: 'Readable_Manifest_001',
  description: "A printed Easter event timetable. Someone has crossed things out and rewritten them by hand.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Pinned to the noticeboard near the east gate',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: 'EASTER IN THE PARK — OFFICIAL SCHEDULE',
    date: '18–19 April',
    supervisor: 'Events Office',
    rows: [
      { ref: '09:00', contents: 'Gates open', shelf: 'All areas', status: 'CONFIRMED' },
      { ref: '10:00', contents: 'Egg hunt begins — Zone A only', shelf: 'Zone A', status: 'CONFIRMED' },
      { ref: '11:30', contents: '[CROSSED OUT: Zone B opens] — DELAYED', shelf: 'Zone B', status: 'DELAYED' },
      { ref: '13:00', contents: 'Lunch break — no hunt activity', shelf: 'All areas', status: 'CONFIRMED' },
      { ref: '14:00', contents: 'Resumed — Zones A and D only', shelf: 'A + D', status: 'CONFIRMED' },
      { ref: '17:00', contents: '[HANDWRITTEN: Check north fence before close]', shelf: 'Zone D', status: 'ADDED' },
      { ref: '18:00', contents: 'Gates close', shelf: 'All areas', status: 'CONFIRMED' },
    ],
    signed: 'Note: Zone B access change authorised by Mr Easter — 17 Apr, 22:41',
  hiddenAnnotations: [],
  },
}
