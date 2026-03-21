// items.js
// Single source of truth for all EC items.
// Catalogue arrays: physicalRibbons, physicalStones, physicalFeathers, physicalKeys
// Game items: all 001-mr-easter items + shared tools
// ITEMS: the stage-ordered array consumed by the game


// ─── Catalogues ───────────────────────────────────────────────────────────────

export const physicalRibbons = [
  { id: "physical_ribbon_white_001",  name: "White Ribbon",  type: "Physical_Ribbon_001", description: "A white ribbon."  },
  { id: "physical_ribbon_yellow_001", name: "Yellow Ribbon", type: "Physical_Ribbon_001", description: "A yellow ribbon." },
  { id: "physical_ribbon_blue_001",   name: "Blue Ribbon",   type: "Physical_Ribbon_001", description: "A blue ribbon."   },
  { id: "physical_ribbon_pink_001",   name: "Pink Ribbon",   type: "Physical_Ribbon_001", description: "A pink ribbon."   },
  { id: "physical_ribbon_green_001",  name: "Green Ribbon",  type: "Physical_Ribbon_001", description: "A green ribbon."  },
  { id: "physical_ribbon_orange_001", name: "Orange Ribbon", type: "Physical_Ribbon_001", description: "An orange ribbon." },
  { id: "physical_ribbon_purple_001", name: "Purple Ribbon", type: "Physical_Ribbon_001", description: "A purple ribbon." },
  { id: "physical_ribbon_red_001",    name: "Red Ribbon",    type: "Physical_Ribbon_001", description: "A red ribbon."    },
  { id: "physical_ribbon_silver_001", name: "Silver Ribbon", type: "Physical_Ribbon_001", description: "A silver ribbon." },
  { id: "physical_ribbon_black_001",  name: "Black Ribbon",  type: "Physical_Ribbon_001", description: "A black ribbon."  },
];

export const physicalStones = [
  { id: "physical_stone_starry_001",   name: "Starry Stone",   type: "Physical_Stone_001", description: "A painted stone." },
  { id: "physical_stone_moonlit_001",  name: "Moonlit Stone",  type: "Physical_Stone_001", description: "A painted stone." },
  { id: "physical_stone_sunrise_001",  name: "Sunrise Stone",  type: "Physical_Stone_001", description: "A painted stone." },
  { id: "physical_stone_sunset_001",   name: "Sunset Stone",   type: "Physical_Stone_001", description: "A painted stone." },
  { id: "physical_stone_comet_001",    name: "Comet Stone",    type: "Physical_Stone_001", description: "A painted stone." },
  { id: "physical_stone_eclipse_001",  name: "Eclipse Stone",  type: "Physical_Stone_001", description: "A painted stone." },
  { id: "physical_stone_rainbow_001",  name: "Rainbow Stone",  type: "Physical_Stone_001", description: "A painted stone." },
  { id: "physical_stone_clouded_001",  name: "Clouded Stone",  type: "Physical_Stone_001", description: "A painted stone." },
  { id: "physical_stone_twilight_001", name: "Twilight Stone", type: "Physical_Stone_001", description: "A painted stone." },
  { id: "physical_stone_dawn_001",     name: "Dawn Stone",     type: "Physical_Stone_001", description: "A painted stone." },
];

export const physicalFeathers = [
  { id: "physical_feather_pelican_001",    name: "Pelican Feather",    type: "Physical_Feather_001", description: "A pelican feather."    },
  { id: "physical_feather_seagull_001",    name: "Seagull Feather",    type: "Physical_Feather_001", description: "A seagull feather."    },
  { id: "physical_feather_crow_001",       name: "Crow Feather",       type: "Physical_Feather_001", description: "A crow feather."       },
  { id: "physical_feather_ibis_001",       name: "Ibis Feather",       type: "Physical_Feather_001", description: "An ibis feather."      },
  { id: "physical_feather_magpie_001",     name: "Magpie Feather",     type: "Physical_Feather_001", description: "A magpie feather."     },
  { id: "physical_feather_lorikeet_001",   name: "Lorikeet Feather",   type: "Physical_Feather_001", description: "A lorikeet feather."   },
  { id: "physical_feather_cockatoo_001",   name: "Cockatoo Feather",   type: "Physical_Feather_001", description: "A cockatoo feather."   },
  { id: "physical_feather_kookaburra_001", name: "Kookaburra Feather", type: "Physical_Feather_001", description: "A kookaburra feather." },
  { id: "physical_feather_plover_001",     name: "Plover Feather",     type: "Physical_Feather_001", description: "A plover feather."     },
  { id: "physical_feather_pigeon_001",     name: "Pigeon Feather",     type: "Physical_Feather_001", description: "A pigeon feather."     },
];

export const physicalKeys = [
  { id: "physical_key_brass_001",   name: "Brass Key",   type: "Physical_Key_001", description: "A brass key."   },
  { id: "physical_key_iron_001",    name: "Iron Key",    type: "Physical_Key_001", description: "An iron key."   },
  { id: "physical_key_silver_001",  name: "Silver Key",  type: "Physical_Key_001", description: "A silver key."  },
  { id: "physical_key_rusted_001",  name: "Rusted Key",  type: "Physical_Key_001", description: "A rusted key."  },
  { id: "physical_key_copper_001",  name: "Copper Key",  type: "Physical_Key_001", description: "A copper key."  },
  { id: "physical_key_bent_001",    name: "Bent Key",    type: "Physical_Key_001", description: "A bent key."    },
  { id: "physical_key_tiny_001",    name: "Tiny Key",    type: "Physical_Key_001", description: "A tiny key."    },
  { id: "physical_key_long_001",    name: "Long Key",    type: "Physical_Key_001", description: "A long key."    },
  { id: "physical_key_notched_001", name: "Notched Key", type: "Physical_Key_001", description: "A notched key." },
  { id: "physical_key_ornate_001",  name: "Ornate Key",  type: "Physical_Key_001", description: "An ornate key." },
];


// ─── Shared tools ─────────────────────────────────────────────────────────────

const uvTorch = {
  id: 'uv-torch',
  name: 'UV torch',
  type: 'Tool_UVTorch_001',
  description: 'A small ultraviolet torch. The kind used to check banknotes. Or hidden messages.',
  combinedWith: null,
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    beamRadius: 80,
    glowColor: '#a855f7',
  },
}

const cipherWheel = {
  id: 'cipher-wheel',
  name: 'Cipher wheel',
  type: 'Tool_CipherWheel_001',
  description: 'A wooden disc with two rotating alphabet rings and small cutout windows.',
  combinedWith: null,
  combinationMechanic: 'cipher_overlay',
  isRedHerring: false,
  content: {
    outerRing: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    innerRing: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    windows: [0, 4, 8, 12],
  },
}

const magnifier = {
  id: 'magnifier',
  name: 'Magnifying glass',
  type: 'Tool_Magnifier_001',
  description: 'A brass handled magnifying glass. Old but functional.',
  combinedWith: null,
  combinationMechanic: 'magnify',
  isRedHerring: false,
  content: {
    lensRadius: 70,
    zoomLevel: 3,
  },
}


// ─── 001-mr-easter — Physical items ───────────────────────────────────────────

// Brass turning knob — McGuffin part 1 of 3
const knobBrass = {
  id: 'knob-brass',
  name: 'Brass knob',
  type: 'Physical_Key_001',
  description: 'A small, heavy brass knob. Turned and worn smooth from years of use. The base has a square socket. No obvious purpose on its own.',
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found on the ground near the park bench',
  combinedWith: 'safe-wall',
  combinationMechanic: 'physical_fit',
  isRedHerring: false,
  content: {
    material: 'Brass',
    condition: 'Well worn',
    socket: 'Square drive, 8mm',
    markings: 'None',
  },
}

// Small wall safe — McGuffin part 2 of 3. Description deliberately avoids mentioning a knob.
const safeWall = {
  id: 'safe-wall',
  name: 'Wall safe',
  type: 'Physical_Key_001',
  description: 'A small recessed safe bolted behind a loose panel. Locked. The central actuator spindle is exposed... something has been removed from it. The door has not moved in a long time.',
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found behind a loose panel near the park maintenance area',
  combinedWith: 'knob-brass',
  combinationMechanic: 'physical_fit',
  isRedHerring: false,
  content: {
    material: 'Steel',
    condition: 'Old, surface rust on edges',
    lock: 'Rotary combination, actuator spindle exposed',
    markings: 'Stamped: B-12 ... possibly a serial or room reference',
    status: 'Locked',
  },
}

// Pebbles in a line — physical geo clue. Seven pebbles, deliberately spaced.
const pebblesLine = {
  id: 'pebbles-line',
  name: 'Pebble line',
  type: 'Physical_Key_001',
  description: "Seven small pebbles arranged in a straight line. The spacing between them is uneven ... short, short, long, short, long, long, short. Like a pattern.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found along the path between the gate and the oak',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: false,
  content: {
    label: '· · ... · ... ... ·',
    material: 'Pebbles',
    condition: 'Deliberately placed',
  },
}

// Stick arranged like an arrow — physical narrative clue. Points toward Zone B.
const stickArrow = {
  id: 'stick-arrow',
  name: 'Arranged stick',
  type: 'Physical_Key_001',
  description: "A broken stick, placed deliberately on the ground in the shape of an arrow. It's pointing toward Zone B.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found on the path near the east gate',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: false,
  content: {
    label: 'ARROW',
    material: 'Stick',
    condition: 'Deliberately placed',
  },
}


// ─── 001-mr-easter — Readable items ───────────────────────────────────────────

// Fred's crumpled warehouse note — key evidence item
const fredNote = {
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

// Chuckles purchase receipt — red herring. Numbers look like they could be a code. They are not.
const chucklesReceipt = {
  id: 'chuckles-receipt',
  name: 'Receipt',
  type: 'Readable_Receipt_001',
  description: 'A crumpled receipt found in Chuckles pocket.',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: true,
  content: {
    vendor: 'WAREHOUSE SUPPLIES CO',
    abn: '47 382 910 556',
    date: '18/04/2025',
    time: '23:14',
    items: [
      { qty: 3,  desc: 'PACKING TAPE 50MM',   price: '12.45' },
      { qty: 12, desc: 'EGG CARTON MEDIUM',   price: '28.80' },
      { qty: 1,  desc: 'THERMAL LABELS X500', price: '19.99' },
      { qty: 7,  desc: 'BUBBLE WRAP 1M',      price: '34.65' },
    ],
    total: '95.89',
    paid: 'CASH',
    note: 'Thank you for your purchase',
    hiddenAnnotations: [],
  },
}

// Official warehouse basket manifest — key evidence item. UV reveals hidden annotations.
const manifest = {
  id: 'warehouse-manifest',
  name: 'Warehouse manifest',
  type: 'Readable_Manifest_001',
  description: 'The official Easter basket packing manifest for the Southport delivery run.',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: 'BASKET MANIFEST ... SOUTHPORT DISTRICT',
    date: '18 April 2025',
    supervisor: 'Mr Easter',
    rows: [
      { ref: 'SOU-001', contents: 'Milk chocolate eggs x24',   shelf: '4-2', status: 'PACKED' },
      { ref: 'SOU-002', contents: 'Foil wrapped mini eggs x48', shelf: '4-3', status: 'PACKED' },
      { ref: 'SOU-003', contents: 'Jelly beans assorted x1 bag', shelf: '4-4', status: 'PACKED' },
      { ref: 'SOU-004', contents: 'Ribbon yellow x2m',          shelf: '4-5', status: 'PACKED' },
      { ref: 'SOU-005', contents: 'Basket liner tissue x3',     shelf: '4-6', status: 'PACKED' },
    ],
    hiddenAnnotations: [
      { ref: 'SOU-003', note: 'PORRIDGE CHECKED THIS ONE TWICE' },
      { ref: 'SOU-004', note: 'RIBBON REPLACED ... ORIGINAL TAKEN' },
    ],
    signed: 'Mr Easter ... Chief Delivery Officer',
  },
}

// Lazy Bunny's personal nap log — red herring. Looks extremely significant. Contains no useful information.
const napLog = {
  id: 'nap-log',
  name: 'Nap log',
  type: 'Readable_NapLog_001',
  description: "A worn leather-bound log. Every page filled with dates, times, and duration of naps.",
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: true,
  content: {
    title: "LAZY BUNNY'S OFFICIAL NAP RECORD",
    subtitle: 'Volume 47 ... Current Year',
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
      { date: '18/04', time: '22:00', duration: '??',        notes: 'Attempted. Could not sleep. Suspicious activity nearby.' },
    ],
    note: 'Total recorded naps to date: 34,310',
    hiddenAnnotations: [],
  },
}

// Internal Easter HQ memo — red herring. Official looking, full of numbers. None of it is relevant.
const hqMemo = {
  id: 'hq-memo',
  name: 'Internal memo',
  type: 'Readable_Memo_001',
  description: 'An official memo from Easter HQ. Lots of numbers and policy references.',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: true,
  content: {
    from: 'Easter HQ Operations',
    to: 'All Warehouse Staff',
    ref: 'EHQ/OPS/2025/441',
    date: '15 April 2025',
    subject: 'Updated Packing Protocol ... Season 2025',
    body: `Please note the following updates to packing protocol effective immediately.

All baskets must be sealed with reference code EHQ-2025 before 23:00 on packing night.

Weight limits have been revised. Baskets must not exceed 4.2kg including liner.

Cold room access is restricted to authorised personnel only. Code updated to 7741. Do not share this code.

Any discrepancies in the manifest must be reported to the shift supervisor within 15 minutes of discovery.

Failure to comply with protocol 7.3(b) may result in suspension of delivery privileges.`,
    signed: 'Operations Division ... Easter HQ',
    note: 'Policy reference 7741 supersedes all previous protocols dated before March 2025.',
    hiddenAnnotations: [],
  },
}

// Mr Easter's pocket journal — first entry. Establishes his voice and hints at "the arrangement."
const journalMrEaster = {
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
    title: 'PERSONAL ... DO NOT READ',
    text: `Entry 1.

I have been doing this for thirty-one years. Thirty-one. I know every basket, every route, every shelf number in every warehouse in this district.

I do not make mistakes.

Which is why I need to write this down. Because if something goes wrong this year ... and I believe something will ... I want there to be a record of what I knew and when I knew it.

The arrangement began three seasons ago. I was approached. I said no. Then I said yes. I am not proud of that.

What I am is careful. And careful people keep notes.`,
    signature: 'E.',
    hiddenAnnotations: [],
  },
}

// Lazy Bunny's sleep diary. Establishes Lazy's character. One entry is circled in red.
const journalLazyBunny = {
  id: 'journal-lazy-bunny',
  name: "Lazy's sleep diary",
  type: 'Readable_NapLog_001',
  description: "A soft-covered diary dedicated entirely to sleep. Every entry is a nap review.",
  droppedBy: 'Lazy',
  source: 'character',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: "LAZY BUNNY'S SLEEP DIARY ... DO NOT DISTURB",
    entries: [
      { time: '12 Apr', text: 'Under the oak. 3 hours. Warm. Excellent.' },
      { time: '13 Apr', text: 'Near the gate. 2 hours. Bit draughty. Fine.' },
      { time: '14 Apr', text: 'Old bench. 4 hours. Perfect. No disturbances.' },
      { time: '15 Apr', text: 'Could not settle. Someone kept walking past. Only managed 40 minutes.' },
      { time: '16 Apr', text: 'Back at the oak. 3.5 hours. Good. Dreamed of meadows.' },
      { time: '17 Apr', text: 'DO NOT SLEEP ON THE 3RD. Reminder to self. Porridge said so.' },
      { time: '18 Apr', text: 'Did not sleep. Was asked to watch something. Will not say what.' },
    ],
    hiddenAnnotations: [],
  },
}

// Letter to "Hopscotch" — lore item. Formal but clearly coded. Signed with a carrot drawing.
const letterHopscotch = {
  id: 'letter-hopscotch',
  name: 'Letter to Hopscotch',
  type: 'Readable_Memo_001',
  description: "A formal letter addressed to someone called Hopscotch. The sign-off is a small drawing of a carrot.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found tucked under the park bench',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    to: 'Hopscotch',
    from: '[unsigned]',
    subject: 'The Spring Arrangement ... Final Confirmation',
    body: `Dear Hopscotch,

This letter confirms that the arrangement discussed in our previous correspondence remains in place for this season.

The third location will be accessible from 11pm. You will not be seen if you are prompt. You know what to collect and where to leave it.

Do not involve the others. Particularly not L.

Destroy this after reading. If you are reading this and you are not Hopscotch, then congratulations ... you are now part of something you were not supposed to find.`,
    signed: '[carrot drawing]',
    hiddenAnnotations: [],
  },
}

// Official park notice — lore item. Laminated, faded. Has a sticky note on it.
const noticePark = {
  id: 'notice-park',
  name: 'Park notice',
  type: 'Readable_Manifest_001',
  description: "A laminated council notice, sun-faded. Someone has stuck a handwritten note on top of it.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Nailed to the old oak tree',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: 'NOTICE ... RESTRICTED ACCESS',
    date: 'Issued: 3 March',
    supervisor: 'Parks & Recreation Authority',
    rows: [
      { ref: 'Zone A', contents: 'East gate to old oak',    shelf: 'Open',       status: 'OPEN'   },
      { ref: 'Zone B', contents: 'Old oak to the pond',     shelf: 'Restricted', status: 'CLOSED' },
      { ref: 'Zone C', contents: 'Pond to north fence',     shelf: 'Restricted', status: 'CLOSED' },
      { ref: 'Zone D', contents: 'North fence to bench row', shelf: 'Open',      status: 'OPEN'   },
    ],
    signed: 'Access to Zones B and C restricted until further notice.\n\n[sticky note in different handwriting]: Zone B has been open since Tuesday. Someone removed the tape.',
    hiddenAnnotations: [],
  },
}

// Scrap with a single word — lore item. One word written in large careful letters: UNDERNEATH.
const scrapUnderneath = {
  id: 'scrap-underneath',
  name: 'Paper scrap',
  type: 'Readable_Note_001',
  description: "A small torn scrap. One word written on it in large, deliberate letters.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found caught in the fence near the east gate',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: null,
    text: 'UNDERNEATH',
    signature: null,
    hiddenAnnotations: [],
  },
}

// Tiny cryptic note — narrative clue. Handwriting small and hurried. Deliberately ambiguous.
const noteCryptic = {
  id: 'note-cryptic',
  name: 'Cryptic note',
  type: 'Readable_Note_001',
  description: "A tiny folded note. The handwriting is small and hurried, like it was written in a rush.",
  droppedBy: 'Mr Easter',
  source: 'character',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: null,
    text: `Not the first basket. Not the last.
The one in the middle was never on the manifest.

Count from the gate. Third tree.
Below the roots, not above.

You have until the bells.`,
    signature: null,
    hiddenAnnotations: [],
  },
}

// Torn letter — bottom half only — narrative clue. References "the third basket." Top half is missing.
const letterFragment = {
  id: 'letter-fragment',
  name: 'Torn letter',
  type: 'Readable_Note_001',
  description: "The bottom half of a letter. The top has been torn away. What remains is enough to raise questions.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found near the pond path',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: null,
    text: `... and that is why the third basket was never logged. We agreed this at the time. You agreed this at the time.

If anyone finds this, they will have questions. Those questions will lead back to the warehouse. The warehouse leads back to you, not to me.

I am telling you this as a courtesy. Destroy the other copy.`,
    signature: '... T',
    hiddenAnnotations: [],
  },
}

// Easter event schedule — narrative clue. Several entries altered by hand.
const scheduleEvent = {
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
    title: 'EASTER IN THE PARK ... OFFICIAL SCHEDULE',
    date: '18 ... 19 April',
    supervisor: 'Events Office',
    rows: [
      { ref: '09:00', contents: 'Gates open',                                   shelf: 'All areas', status: 'CONFIRMED' },
      { ref: '10:00', contents: 'Egg hunt begins ... Zone A only',              shelf: 'Zone A',    status: 'CONFIRMED' },
      { ref: '11:30', contents: '[CROSSED OUT: Zone B opens] ... DELAYED',      shelf: 'Zone B',    status: 'DELAYED'   },
      { ref: '13:00', contents: 'Lunch break ... no hunt activity',             shelf: 'All areas', status: 'CONFIRMED' },
      { ref: '14:00', contents: 'Resumed ... Zones A and D only',               shelf: 'A + D',     status: 'CONFIRMED' },
      { ref: '17:00', contents: '[HANDWRITTEN: Check north fence before close]', shelf: 'Zone D',   status: 'ADDED'     },
      { ref: '18:00', contents: 'Gates close',                                  shelf: 'All areas', status: 'CONFIRMED' },
    ],
    signed: 'Note: Zone B access change authorised by Mr Easter ... 17 Apr, 22:41',
    hiddenAnnotations: [],
  },
}

// Torn newspaper classifieds — narrative clue. A circled ad reads like a code.
const scrapNewspaper = {
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
    title: 'CLASSIFIEDS ... NOTICES',
    text: `LOST: One yellow ribbon, approx 2m. Sentimental value.
If found, leave at third bench from the east gate.
No questions. ... Box 441

FOR SALE: Brass key, cold room type. Unused.
Owner no longer requires access. ... Box 119

FOUND: Small basket, no contents, no label.
Collected from Zone B. Contact parks office.

NOTICE: The arrangement for 18 April
remains in place. Parties concerned
should confirm by return. ... Box 441`,
    signature: null,
    hiddenAnnotations: [],
  },
}

// Hand-drawn park map — geo clue. X marks that don't match the official egg locations.
const mapHandDrawn = {
  id: 'map-hand-drawn',
  name: 'Hand-drawn map',
  type: 'Readable_Manifest_001',
  description: "A rough pencil sketch of the park on the back of a torn envelope. X marks that don't match the official egg locations.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found folded inside the park notice frame',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: 'PARK SKETCH ... PERSONAL USE',
    date: 'Undated',
    supervisor: 'Unknown hand',
    rows: [
      { ref: 'X1', contents: 'Third tree from east gate',          shelf: 'Zone A', status: 'MARKED' },
      { ref: 'X2', contents: 'Behind the pond ... north side',     shelf: 'Zone B', status: 'MARKED' },
      { ref: 'X3', contents: 'Below bench row 4',                  shelf: 'Zone D', status: 'MARKED' },
      { ref: '?',  contents: '[illegible] ... near old oak roots', shelf: 'Zone A', status: 'MARKED' },
    ],
    signed: 'Note at bottom: These are not the eggs.',
    hiddenAnnotations: [],
  },
}

// Chalk marks rubbing — geo clue. Paper rubbing of chalk marks on a stone surface.
const chalkMarks = {
  id: 'chalk-marks',
  name: 'Chalk rubbing',
  type: 'Readable_Note_001',
  description: "A paper rubbing of faint chalk marks from a stone surface. The marks form a rough diagram.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Left under the base of the old oak',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: 'CHALK RUBBING ... EAST GATE STONE',
    text: `[rubbing of chalk marks]

The marks appear to show:
... An arrow pointing north
... A number: 3
... A circle with a cross through it
... Below that, something that looks like the letter B or the number 8

The chalk was recent. Still slightly smudged at the edges.`,
    signature: null,
    hiddenAnnotations: [],
  },
}

// Torn ribbon — left third — narrative puzzle fragment NP-A1 (1 of 3)
const ribbonNPA1 = {
  id: 'ribbon-fragment-npa1',
  name: 'Ribbon fragment',
  type: 'Readable_Note_001',
  description: "A third of a yellow ribbon, torn at both ends. There is faint writing along one edge. It cuts off mid-sentence.",
  droppedBy: 'Mr Easter',
  source: 'character',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: 'RIBBON FRAGMENT [1 OF 3]',
    text: `[written in tiny careful letters along the ribbon's edge]

"The basket was never meant to leave the warehouse. I told them this in ..."

[ribbon torn ... text continues on missing section]`,
    signature: null,
    hiddenAnnotations: [],
  },
}

// Map fragment — top third — geo puzzle part 1 of 3. Combines with GP02 and GP03.
const mapFragmentGP01 = {
  id: 'map-fragment-gp01',
  name: 'Map fragment ... top',
  type: 'Readable_Note_001',
  description: "The top third of a larger hand-drawn map. Torn cleanly. The north end of the park is visible.",
  droppedBy: null,
  source: 'location',
  sourceLabel: 'Found near the north fence',
  combinedWith: 'uv-torch',
  combinationMechanic: 'uv',
  isRedHerring: false,
  content: {
    title: 'MAP FRAGMENT [1 OF 3]',
    text: `[top section of a hand-drawn park map]

North fence ... ... ... ... ... ... ... ...
|                                |
|   [oak symbol]    [bench row]  |
|                                |
|   <- Zone B    |    Zone D ->  |
|                                |
... ... ... ... [torn edge] ... ... ... ...

A small annotation at the top reads:
"Confirmed: the third marker is not on this section."`,
    signature: null,
    hiddenAnnotations: [],
  },
}

// Combination slip — McGuffin part 3 of 3. Written to look like a storage reference.
const combinationSafe = {
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


// ─── ITEMS — stage-ordered game array ─────────────────────────────────────────
// stage_given: which stage delivers this item to the player's Kin Sack.

export const ITEMS = [

  // ── Stage 1 ────────────────────────────────────────────────────────────────
  { ...fredNote,        stage_given: '01' },
  // Lore
  { ...journalMrEaster,  stage_given: '01' },
  { ...journalLazyBunny, stage_given: '01' },
  { ...letterHopscotch,  stage_given: '01' },
  { ...noticePark,       stage_given: '01' },
  { ...scrapUnderneath,  stage_given: '01' },
  // Narrative clues
  { ...noteCryptic,     stage_given: '01' },
  { ...letterFragment,  stage_given: '01' },
  { ...scheduleEvent,   stage_given: '01' },
  { ...scrapNewspaper,  stage_given: '01' },
  // Geo clues
  { ...mapHandDrawn,    stage_given: '01' },
  { ...chalkMarks,      stage_given: '01' },
  // Puzzle fragments
  { ...ribbonNPA1,      stage_given: '01' },
  { ...mapFragmentGP01, stage_given: '01' },
  // Physical clues
  { ...stickArrow,      stage_given: '01' },
  { ...pebblesLine,     stage_given: '01' },
  // McGuffin ... 3 parts, spread across stage 1
  { ...knobBrass,       stage_given: '01' },
  { ...safeWall,        stage_given: '01' },
  { ...combinationSafe, stage_given: '01' },

  // ── Stage 2 ────────────────────────────────────────────────────────────────
  { ...hqMemo,          stage_given: '02' },
  { ...chucklesReceipt, stage_given: '02' },
  { ...cipherWheel,     stage_given: '03' },

  // ── Stage 3+ ───────────────────────────────────────────────────────────────
  { ...manifest,        stage_given: '04' },
  { ...uvTorch,         stage_given: '05' },
  { ...napLog,          stage_given: '06' },
  { ...magnifier,       stage_given: '07' },
]
