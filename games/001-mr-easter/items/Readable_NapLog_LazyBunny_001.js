// games/001-mr-easter/items/Readable_NapLog_LazyBunny_001.js
// Lazy Bunny's personal nap log — red herring item
// Looks extremely significant. Contains no useful information.
// is_red_herring: true

export const item = {
  id: 'nap-log',
  name: 'Nap log',
  type: 'Readable_NapLog_001',
  description: "A worn leather-bound log. Every page filled with dates, times, and duration of naps.",
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: true,
  content: {
    title: "LAZY BUNNY'S OFFICIAL NAP RECORD",
    subtitle: 'Volume 47 — Current Year',
    entries: [
      { date: '14/04', time: '09:15', duration: '2hr 40min', notes: 'Excellent. No disturbances.' },
      { date: '14/04', time: '14:30', duration: '1hr 55min', notes: 'Good. Slightly warm.' },
      { date: '15/04', time: '10:00', duration: '3hr 10min', notes: 'Outstanding. Career best.' },
      { date: '15/04', time: '15:45', duration: '2hr 05min', notes: 'Fine. Someone was whistling.' },
      { date: '16/04', time: '09:30', duration: '2hr 20min', notes: 'Good. Dreamed of grass.' },
      { date: '16/04', time: '13:00', duration: '1hr 50min', notes: 'Acceptable.' },
      { date: '17/04', time: '10:15', duration: '2hr 35min', notes: 'Very good.' },
      { date: '17/04', time: '14:00', duration: '2hr 00min', notes: 'Standard.' },
      { date: '18/04', time: '09:45', duration: '2hr 15min', notes: 'Good. Last nap before packing.' },
      { date: '18/04', time: '22:00', duration: '??', notes: 'Attempted. Could not sleep. Suspicious activity nearby.' },
    ],
    note: 'Total recorded naps to date: 34,310',
  },
}
