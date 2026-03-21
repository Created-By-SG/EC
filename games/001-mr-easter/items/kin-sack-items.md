# Kin Sack — Item Mapping
> 3-stage structure · Total ~87 tracked items + 30 red herrings

---

## Item schema additions
Every item definition now supports two new fields:

```js
droppedBy: 'Mr Easter'   // character name, or player username, or null
source: 'character'      // 'character' | 'location' | 'puzzle' | 'scene'
sourceLabel: 'Found near the old oak'  // shown in detail view when droppedBy is null
```

---

## TYPE KEY
| Border | Type | Meaning |
|---|---|---|
| 🟣 Purple | `read` | Readable — notes, logs, pages, maps |
| 🔵 Blue | `tool` | Tool — interactive, combinable |
| 🟠 Orange | `physical` | Physical — objects, artefacts |

---

## 🔹 LORE ITEMS — 15 total (physical + read)
*Flavour / world-building. No puzzle function. From locations and story scenes.*

| # | Item | Type | droppedBy / source |
|---|---|---|---|
| L01 | Mini toy bunny | physical | location |
| L02 | Painted egg | physical | location |
| L03 | Golden egg (empty) | physical | Mr Easter / character |
| L04 | Mini plush carrot | physical | location |
| L05 | Tiny hat (bunny costume) | physical | location |
| L06 | Balloon fragment | physical | location |
| L07 | Mini toy mouse | physical | location |
| L08 | Small pine cone | physical | location |
| L09 | Shiny foil wrapper | physical | location |
| L10 | Tiny jar (empty) | physical | location |
| L11 | Cracked chocolate egg | physical | Mr Easter / character |
| L12 | Single silk thread | physical | location |
| L13 | Small torn page — Field Manual | read | scene |
| L14 | Tiny carved wooden figure | physical | Lazy / character |
| L15 | Mini scroll (flavour text) | read | scene |

---

## 🔹 SMALL NARRATIVE CLUES — 18 total (physical + read)
*3 of these unlock a narrative puzzle. Distributed across stages.*

| # | Item | Type | droppedBy / source |
|---|---|---|---|
| NC01 | Tiny note — cryptic handwriting | read | Mr Easter / character |
| NC02 | Crumpled note — half-erased | read | location |
| NC03 | Ribbon with faint writing | read | location |
| NC04 | Tiny tag with symbols | read | location |
| NC05 | Tiny folded note | read | Mr Easter / character |
| NC06 | Rolled-up note | read | scene |
| NC07 | Note: "look behind you" | read | Mr Easter / character |
| NC08 | Tiny handwritten letter fragment | read | Lazy / character |
| NC09 | Scrap of cardboard with marks | read | location |
| NC10 | Small torn cloth piece | physical | location |
| NC11 | Thread caught on branch | physical | location |
| NC12 | Broken stick arranged oddly | physical | location |
| NC13 | Pebbles in a line | physical | location |
| NC14 | Stick arranged like an arrow | physical | location |
| NC15 | Clump of grass tied together | physical | location |
| NC16 | Feather (coloured, unusual) | physical | location |
| NC17 | Rope knot | physical | location |
| NC18 | Tiny bell with engraving | physical | location |

---

## 🔹 TOOLS — 4 total
*Acquired tools that can combine with puzzle items.*

| # | Item | Type | droppedBy / source |
|---|---|---|---|
| T01 | UV Torch | tool | puzzle |
| T02 | Cipher Wheel | tool | puzzle |
| T03 | Magnifier | tool | puzzle |
| T04 | Small piece of cloth (wipe/reveal) | tool | location |

---

## 🔹 SMALL GEO CLUES — 8 total (physical + read)
*Location-based. Found by walking past geo-tagged spots.*

| # | Item | Type | droppedBy / source |
|---|---|---|---|
| GC01 | Small hand-drawn park map | read | location |
| GC02 | Faint chalk marks (rubbing) | read | location |
| GC03 | Crumpled map fragment | read | location |
| GC04 | Painted pebble with mark | physical | location |
| GC05 | Zigzag footprints (cast) | physical | location |
| GC06 | Muddy footprints — small | physical | location |
| GC07 | Muddy footprints — large | physical | location |
| GC08 | Small painted rock | physical | location |

---

## 🔹 NARRATIVE PUZZLE PARTS — 6 items (3 parts → 1 major each)
*Stage-gated. 3 fragments combine into 1 major narrative item.*

### Fragment Set A — "The Confession"
| # | Item | Type | droppedBy / source |
|---|---|---|---|
| NP-A1 | Torn ribbon — left third | read | Mr Easter / character |
| NP-A2 | Torn ribbon — middle third | read | Lazy / character |
| NP-A3 | Torn ribbon — right third | read | scene |

→ **Combines into:** `NP-MAJOR-A` — Full Ribbon Message *(read)*

### Fragment Set B — "The Route"
| # | Item | Type | droppedBy / source |
|---|---|---|---|
| NP-B1 | Tiny coded note — part 1 | read | puzzle |
| NP-B2 | Tiny coded note — part 2 | read | puzzle |
| NP-B3 | Tiny coded note — part 3 | read | scene |

→ **Combines into:** `NP-MAJOR-B` — Decoded Route Note *(read)*

---

## 🔹 MAJOR NARRATIVE PUZZLE ITEMS — 2 total
*Produced by fragment combination. Feed into the Final Object.*

| # | Item | Type | Notes |
|---|---|---|---|
| NP-MAJOR-A | Full Ribbon Message | read | Combined from NP-A1/2/3 |
| NP-MAJOR-B | Decoded Route Note | read | Combined from NP-B1/2/3 |

---

## 🔹 GEO PUZZLE PARTS — 3 items (3 parts → 1 major)
*Found at geo locations. Combine into the major geo item.*

### Fragment Set — "The Landmark"
| # | Item | Type | droppedBy / source |
|---|---|---|---|
| GP01 | Fragment of torn map — top | read | location |
| GP02 | Fragment of torn map — middle | read | location |
| GP03 | Fragment of torn map — bottom | read | location |

→ **Combines into:** `GP-MAJOR` — Restored Park Map *(read)*

---

## 🔹 MAJOR GEO ITEM — 1 total

| # | Item | Type | Notes |
|---|---|---|---|
| GP-MAJOR | Restored Park Map | read | Combined from GP01/02/03 |

---

## 🔹 FINAL OBJECT — 1 total
*Unlocked by holding both major narrative items + major geo item.*

| # | Item | Type | Requires |
|---|---|---|---|
| FINAL | Hidden Easter Cache Location | read | NP-MAJOR-A + NP-MAJOR-B + GP-MAJOR |

---

## 🔹 RED HERRINGS — 30 total
*No puzzle function. Intentionally misleading.*

| # | Item | Type |
|---|---|---|
| RH01 | Loose candy wrapper | physical |
| RH02 | Feather — plain white | physical |
| RH03 | Egg-shaped stone | physical |
| RH04 | Cracked shell (hen) | physical |
| RH05 | Single flower petal | physical |
| RH06 | Rubber band | physical |
| RH07 | Paperclip | physical |
| RH08 | Tiny mirror shard | physical |
| RH09 | Glass shard | physical |
| RH10 | Loose buttons | physical |
| RH11 | Small pebble stacked weirdly | physical |
| RH12 | Tiny plastic bead | physical |
| RH13 | Tiny glass marble | physical |
| RH14 | Wadded-up ribbon | physical |
| RH15 | Random leaf | physical |
| RH16 | Half-eaten berry | physical |
| RH17 | Broken pencil | physical |
| RH18 | Tiny spool of thread | physical |
| RH19 | Cracked pebble | physical |
| RH20 | Small shell | physical |
| RH21 | Tiny insect (preserved) | physical |
| RH22 | Faded sticker | physical |
| RH23 | Tiny toy car | physical |
| RH24 | Mini plush toy (off-theme) | physical |
| RH25 | Broken buckle | physical |
| RH26 | Rusted nail | physical |
| RH27 | Soap bubble residue card | physical |
| RH28 | Crumpled paper ball | physical |
| RH29 | Small card (blank) | read |
| RH30 | Faint chalk mark (plain) | read |

---

## Stage distribution summary

| Stage | Lore | Narrative Clues | Geo Clues | Tools | Puzzle Parts | Red Herrings |
|---|---|---|---|---|---|---|
| Stage 1 | 5 | 6 | 3 | 1 | NP-A1, GP01 | 10 |
| Stage 2 | 5 | 6 | 3 | 2 | NP-A2, NP-B1/2, GP02 | 10 |
| Stage 3 | 5 | 6 | 2 | 1 | NP-A3, NP-B3, GP03 | 10 |

Fragment combinations and major items unlock at end of each stage once all 3 parts are held.
