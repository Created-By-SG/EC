// games/001-mr-easter/items/index.js
// All items available in The Bunny Who Stole Easter.
// stage_given: which stage delivers this item to the player's bag.
// Multiple items can be given at the same stage.

import { item as fredNote }          from './Readable_Note_Fred_001'
import { item as echoClue }          from './Simple_Clue_Echo_001'
import { item as chucklesReceipt }   from './Readable_Receipt_Chuckles_001'
import { item as manifest }          from './Readable_Manifest_Warehouse_001'
import { item as napLog }            from './Readable_NapLog_LazyBunny_001'
import { item as oldKey }            from './Physical_Key_001'
import { item as yellowRibbon }      from './Physical_Ribbon_001'
import { item as hqMemo }            from './Readable_Memo_001'

// Shared tools imported from shared items library
import { item as uvTorch }     from '../../../items/Tool_UVTorch_001'
import { item as cipherWheel } from '../../../items/Tool_CipherWheel_001'
import { item as magnifier }   from '../../../items/Tool_Magnifier_001'

export const ITEMS = [
  { ...echoClue,        stage_given: '01' },
  { ...fredNote,        stage_given: '01' },
  { ...oldKey,          stage_given: '01' },
  { ...hqMemo,          stage_given: '02' },
  { ...chucklesReceipt, stage_given: '02' },
  { ...cipherWheel,     stage_given: '03' },
  { ...yellowRibbon,    stage_given: '03' },
  { ...manifest,        stage_given: '04' },
  { ...uvTorch,         stage_given: '05' },
  { ...napLog,          stage_given: '06' },
  { ...magnifier,       stage_given: '07' },
]
