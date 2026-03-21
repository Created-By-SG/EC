// games/001-mr-easter/items/index.js
// All items available in The Bunny Who Stole Easter.
// stage_given: which stage delivers this item to the player's Kin Sack.
// Multiple items can be given at the same stage.

// ─── Existing items ───────────────────────────────────────────────────────────
import { item as fredNote }          from './Readable_Note_Fred_001'
import { item as echoClue }          from './Simple_Clue_Echo_001'
import { item as chucklesReceipt }   from './Readable_Receipt_Chuckles_001'
import { item as manifest }          from './Readable_Manifest_Warehouse_001'
import { item as napLog }            from './Readable_NapLog_LazyBunny_001'
import { item as oldKey }            from './Physical_Key_001'
import { item as yellowRibbon }      from './Physical_Ribbon_001'
import { item as hqMemo }            from './Readable_Memo_001'

// ─── Stage 1 — Lore (read) ────────────────────────────────────────────────────
import { item as journalMrEaster }   from './Readable_Journal_MrEaster_001'
import { item as journalLazyBunny }  from './Readable_Journal_LazyBunny_001'
import { item as letterHopscotch }   from './Readable_Letter_Hopscotch_001'
import { item as noticePark }        from './Readable_Notice_Park_001'
import { item as scrapUnderneath }   from './Readable_Scrap_Underneath_001'

// ─── Stage 1 — Narrative clues (read) ────────────────────────────────────────
import { item as noteCryptic }       from './Readable_Note_Cryptic_001'
import { item as letterFragment }    from './Readable_Letter_Fragment_001'
import { item as scheduleEvent }     from './Readable_Schedule_Event_001'
import { item as scrapNewspaper }    from './Readable_Scrap_Newspaper_001'

// ─── Stage 1 — Geo clues (read) ──────────────────────────────────────────────
import { item as mapHandDrawn }      from './Readable_Map_HandDrawn_001'
import { item as chalkMarks }        from './Readable_Chalk_Marks_001'

// ─── Stage 1 — Puzzle fragments ──────────────────────────────────────────────
import { item as ribbonNPA1 }        from './Readable_Ribbon_NPA1_001'
import { item as mapFragmentGP01 }   from './Readable_MapFragment_GP01_001'

// ─── Stage 1 — Physical clues ────────────────────────────────────────────────
import { item as stickArrow }        from './Physical_Stick_Arrow_001'
import { item as pebblesLine }       from './Physical_Pebbles_Line_001'

// ─── Stage 1 — Red herrings ───────────────────────────────────────────────────
import { item as candyWrapper }      from './Physical_CandyWrapper_001'
import { item as featherWhite }      from './Physical_Feather_White_001'

// ─── Shared tools ─────────────────────────────────────────────────────────────
import { item as uvTorch }     from '../../../items/Tool_UVTorch_001'
import { item as cipherWheel } from '../../../items/Tool_CipherWheel_001'
import { item as magnifier }   from '../../../items/Tool_Magnifier_001'

export const ITEMS = [

  // ── Stage 1 ──────────────────────────────────────────────────────────────
  { ...echoClue,          stage_given: '01' },
  { ...fredNote,          stage_given: '01' },
  { ...oldKey,            stage_given: '01' },
  // Lore
  { ...journalMrEaster,   stage_given: '01' },
  { ...journalLazyBunny,  stage_given: '01' },
  { ...letterHopscotch,   stage_given: '01' },
  { ...noticePark,        stage_given: '01' },
  { ...scrapUnderneath,   stage_given: '01' },
  // Narrative clues
  { ...noteCryptic,       stage_given: '01' },
  { ...letterFragment,    stage_given: '01' },
  { ...scheduleEvent,     stage_given: '01' },
  { ...scrapNewspaper,    stage_given: '01' },
  // Geo clues
  { ...mapHandDrawn,      stage_given: '01' },
  { ...chalkMarks,        stage_given: '01' },
  // Puzzle fragments
  { ...ribbonNPA1,        stage_given: '01' },
  { ...mapFragmentGP01,   stage_given: '01' },
  // Physical clues
  { ...stickArrow,        stage_given: '01' },
  { ...pebblesLine,       stage_given: '01' },
  // Red herrings
  { ...candyWrapper,      stage_given: '01' },
  { ...featherWhite,      stage_given: '01' },

  // ── Stage 2 ──────────────────────────────────────────────────────────────
  { ...hqMemo,            stage_given: '02' },
  { ...chucklesReceipt,   stage_given: '02' },
  { ...cipherWheel,       stage_given: '03' },

  // ── Stage 3+ ─────────────────────────────────────────────────────────────
  { ...yellowRibbon,      stage_given: '03' },
  { ...manifest,          stage_given: '04' },
  { ...uvTorch,           stage_given: '05' },
  { ...napLog,            stage_given: '06' },
  { ...magnifier,         stage_given: '07' },
]
