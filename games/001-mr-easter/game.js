// games/001-mr-easter/game.js
// DESTINATION: games/001-mr-easter/
//
// Single source of truth for The Bunny Who Stole Easter.
//
// TWO SECTIONS:
//   1. STORY   — chat messages per stage. Edit text here only.
//   2. PUZZLES — widget configs per stage. Edit mechanics here.
//
// STAGE 1 SCRIPT RULES:
//   - Messages are split into short individual lines (one sentence per message)
//   - type: 'event' renders as amber full-width strip (not a chat bubble)
//   - itemId on event rows assigns which inventory item gets added to the Kin Sack
//   - from: 'user' renders as right-aligned player bubble
//
// PUZZLE CONFIG KEYS:
//   iframeSrc    — path to HTML puzzle in /public/
//   submitLabel  — text shown on context bar submit button when drawer is open
//   hint_1/2     — revealed one at a time via Hint button in drawer header
//   devAnswer    — shown in amber strip at drawer bottom in DEV_MODE only
//   buttonLabel  — text on the puzzle entry button in the context bar
//
// STYLE RULES — NO EXCEPTIONS:
//   - No hyphens or em dashes anywhere in copy (use three dots instead)
//   - No decorative emojis in story messages
//   - Written in short punchy sentences, one per message object


// ─────────────────────────────────────────────────────────────────────────────
// STORY
// Read this section like a script. Each stage is a block of chat messages.
// To change what players read, edit the text here. Nothing else needs touching.
// ─────────────────────────────────────────────────────────────────────────────

const STORY = {

  1: [
    // Opening monologue
    { sender: 'Mr Easter',  text: "Right. I'll keep this short." },
    { sender: 'Mr Easter',  text: "Two thousand years. Two thousand deliveries." },
    { sender: 'Mr Easter',  text: "Not once has a basket gone missing." },
    { sender: 'Mr Easter',  text: "Until this morning." },
    { sender: 'Mr Easter',  text: "Southport's basket." },
    { sender: 'Mr Easter',  text: "No signs of entry. No damage. No noise." },
    { sender: 'Mr Easter',  text: "Just... gone." },
    { sender: 'Mr Easter',  text: "Last night was routine." },
    { sender: 'Mr Easter',  text: "Southport Park. Final placement." },
    { sender: 'Mr Easter',  text: "Me. Lazy Bunny. Porridge." },
    { sender: 'Mr Easter',  text: "And Fred." },
    { sender: 'Mr Easter',  text: "Fred wasn't scheduled." },
    { sender: 'Mr Easter',  text: "Fred is never scheduled." },
    { sender: 'Mr Easter',  text: "Fred just... appeared." },
    { sender: 'Mr Easter',  text: "Didn't say a word." },
    { sender: 'Mr Easter',  text: "Which is odd. He's usually pretty chatty." },
    { sender: 'Mr Easter',  text: "Then there's Chuckles." },
    { sender: 'Mr Easter',  text: "Showed up this morning. Uninvited." },
    { type: 'event',        text: "Chuckles has joined the chat." },
    { sender: 'Chuckles',   text: "you didn't even have to tell me" },
    { sender: 'Mr Easter',  text: "...Yes. Exactly. That." },
    { sender: 'Mr Easter',  text: "They've all said their piece." },
    { sender: 'Mr Easter',  text: "But not to you." },
    { type: 'event',        text: "Lazy Bunny, Porridge and Fred added to the chat." },
    { sender: 'Mr Easter',  text: "Anything you find... throw it in the Kin Sack. We all see it." },
    { sender: 'Mr Easter',  text: "There should be one near you." },
    { sender: 'Mr Easter',  text: "Field manual's already in there." },
    { sender: 'Mr Easter',  text: "Read it if you need to." },
    { sender: 'Mr Easter',  text: "Or don't." },
    // Kin Sack acquired (after first puzzle)
    { type: 'event',        text: "Kin Sack acquired." },
    // Chuckles conversation
    { from: 'user',         text: "Can you tell me what you know?" },
    { sender: 'Chuckles',   text: "Hahaha well I mean... I know as much as everyone else here. Hahaha" },
    { sender: 'Chuckles',   text: 'except for you know "the boss" hahahaha' },
    { sender: 'Mr Easter',  text: "Chuckles just winked at me. I don't know what that means." },
    // Porridge conversation
    { sender: 'Porridge',   text: "I would just like to state, for the record, that I was performing essential duties." },
    { sender: 'Porridge',   text: "Quality control." },
    { sender: 'Porridge',   text: "Taste verification." },
    { sender: 'Porridge',   text: "Repeatedly, if necessary." },
    // Lazy Bunny conversation
    { sender: 'Lazy Bunny', text: "I said we should throw the whole basket out and take a nap." },
    { sender: 'Lazy Bunny', text: "Nobody listens to me." },
    { sender: 'Lazy Bunny', text: "They should." },
    { sender: 'Lazy Bunny', text: "I have good ideas." },
    { sender: 'Lazy Bunny', text: "Sleep-based ideas." },
    // Item events -- placeholder items assigned, tweak later
    { sender: 'Mr Easter',  text: "Fred handed me a small cloth he found near the basket site." },
    { sender: 'Mr Easter',  text: "Didn't explain it. Just... left it in the sack." },
    { type: 'event',        text: "Fred placed something in the Kin Sack." },
    { sender: 'Porridge',   text: "Near the main path, I found a half-eaten carrot." },
    { sender: 'Porridge',   text: "Someone left it there. Very suspicious." },
    { sender: 'Porridge',   text: "I put it in the sack for safekeeping." },
    { type: 'event',        text: "Porridge placed something in the Kin Sack." },
    { sender: 'Lazy Bunny', text: "I was sitting down, and... something was under me." },
    { sender: 'Lazy Bunny', text: "Small golden button. Didn't notice until later." },
    { sender: 'Lazy Bunny', text: "Put it in the sack." },
    { type: 'event',        text: "Lazy Bunny placed something in the Kin Sack." },
    { sender: 'Chuckles',   text: "hahaha I found a ribbon hahaha" },
    { sender: 'Chuckles',   text: "Very nice ribbon hahaha" },
    { sender: 'Chuckles',   text: "Going in the sack hahaha" },
    { type: 'event',        text: "Chuckles placed something in the Kin Sack." },
    { sender: 'Porridge',   text: "Also found a note. Near Lazy Bunny's spot." },
    { sender: 'Porridge',   text: "Rushed handwriting. Looked familiar." },
    { sender: 'Porridge',   text: "Into the sack." },
    { type: 'event',        text: "Porridge placed something in the Kin Sack.", itemId: 'note-cryptic' },
    { sender: 'Mr Easter',  text: "Fred found a small diagram." },
    { sender: 'Mr Easter',  text: "Scuff marks show something was dragged." },
    { sender: 'Mr Easter',  text: "Direction unclear. Possibly useful." },
    { type: 'event',        text: "Fred placed something in the Kin Sack.", itemId: 'map-hand-drawn' },
  ],

  2: [
    { sender: 'Mr Easter',  text: "The warehouse is empty. The basket is gone. All that remains is a single cracked egg on the floor and a faint smell of chocolate in the air." },
    { sender: 'Mr Easter',  text: "I've checked every corner twice. The basket was here at midnight. I saw it myself." },
    { sender: 'Porridge',   text: "The cracked egg was already cracked when I got there. I want that on record. I did not crack that egg." },
    { sender: 'Lazy Bunny', text: "I didn't see anything. I was practically asleep the whole time. Very nearly asleep. Basically asleep." },
    { sender: 'Mr Easter',  text: "Someone in this warehouse last night knew exactly what they were doing. I checked every corner twice. Four corners. Twice each." },
  ],

  3: [
    { sender: 'Mr Easter',  text: "Witnesses place Porridge in the warehouse until well after midnight. Official role ... taste testing. Quality control on the final batch." },
    { sender: 'Porridge',   text: "That is correct. Very important work. Somebody has to do it. I take it very seriously." },
    { sender: 'Mr Easter',  text: "When Porridge left he was seen carrying something large under his coat. Something roughly the size and shape of a basket." },
    { sender: 'Porridge',   text: "It was my lunchbox. I always carry a large lunchbox. It is a normal lunchbox. Everyone has one that size." },
    { sender: 'Lazy Bunny', text: "I saw the lunchbox. It was moving. Lunchboxes don't usually move. Just saying." },
    { sender: 'Porridge',   text: "Lazy Bunny was barely awake. He can't be trusted to identify a moving lunchbox. Or any lunchbox. He was asleep." },
    { sender: 'Mr Easter',  text: "Nobody has seen the lunchbox since. Nobody has seen the eggs either. His name is an anagram of the answer." },
  ],

  4: [
    { sender: 'Mr Easter',  text: "Lazy Bunny told everyone he left at midnight. Went home. Went straight to bed." },
    { sender: 'Lazy Bunny', text: "I did. I went to bed. I was very tired. I am still tired. This conversation is making me tired." },
    { sender: 'Mr Easter',  text: "His nap log ... yes, he keeps one, has done for forty seven years ... shows he was awake until 3am." },
    { sender: 'Lazy Bunny', text: "The nap log is not always accurate. Sometimes I write in my sleep. It has happened before. Probably happened here." },
    { sender: 'Chuckles',   text: "hahaha awake til 3am hahaha doing WHAT though hahaha" },
    { sender: 'Lazy Bunny', text: "I don't remember. And I'd like to nap before I answer any more questions. Is that an option." },
    { sender: 'Mr Easter',  text: "It is not an option. Three hours unaccounted for. He has kept a nap log for 47 years. Two naps every single day." },
  ],

  5: [
    { sender: 'Mr Easter',  text: "Nobody invited Fred. He just appears. Has done for years. I have never been entirely sure who Fred is." },
    { sender: 'Fred',       text: "..." },
    { sender: 'Porridge',   text: "Fred brought snacks once. Good snacks. I'm not saying that means anything. Just noting it." },
    { sender: 'Mr Easter',  text: "Something turned up in Fred's coat pocket this morning. A receipt. 11:47pm last night. Gold Coast Highway." },
    { sender: 'Mr Easter',  text: "Twelve balloons. Fred bought twelve balloons in the middle of the night." },
    { sender: 'Fred',       text: "They were on sale." },
    { sender: 'Chuckles',   text: "hahahahaha BALLOONS hahaha I can't hahaha" },
    { sender: 'Mr Easter',  text: "The receipt also listed the dye used for the eggs this year. Southport Gold. A custom colour. Two parts red, zero parts blue, two parts yellow." },
  ],

  6: [
    { sender: 'Mr Easter',  text: "Chuckles arrived at 6:15am. Nobody called him. Nobody told him the basket was missing." },
    { sender: 'Chuckles',   text: "I was just in the neighbourhood hahaha I often walk past warehouses at 6am hahaha perfectly normal haha" },
    { sender: 'Mr Easter',  text: "He walked straight to the empty spot. Pointed at it. Started laughing. Has not stopped." },
    { sender: 'Porridge',   text: "Chuckles knows something. I don't know what but he definitely knows something. Unlike me. I know nothing. Lunchbox." },
    { sender: 'Chuckles',   text: "hahaha wouldn't it be funny if the basket just hahaha I can't even hahaha" },
    { sender: 'Lazy Bunny', text: "He has been like this for three hours. The joke hasn't finished. Nobody has heard the punchline. I need a nap." },
  ],

  7: [
    { sender: 'Mr Easter',  text: "Right. Here is what we know. Porridge left with something under his coat. Lazy Bunny was awake until 3am. Fred bought balloons. Chuckles knew exactly where to stand." },
    { sender: 'Porridge',   text: "I would like to point out that Lazy Bunny looks very guilty. Very suspicious. The nap log alone ..." },
    { sender: 'Lazy Bunny', text: "Porridge is literally the one who left with a basket sized object under his coat. I'm just saying." },
    { sender: 'Fred',       text: "The receipt was timestamped." },
    { sender: 'Chuckles',   text: "hahaha everyone's so stressed hahaha it's fine hahaha I promise hahaha" },
    { sender: 'Mr Easter',  text: "All four of them are lying. About different things. The case is getting murkier. And then someone found something behind the fridge." },
  ],

  8: [
    { sender: 'Mr Easter',  text: "Behind the fridge. Tucked under last year's delivery manifest. A receipt for a cake. Large. Custom decorated." },
    { sender: 'Mr Easter',  text: "Ordered three weeks ago. Bakery on Scarborough Street. Picked up at 7pm yesterday ... one hour before packing began." },
    { sender: 'Porridge',   text: "A cake. Someone ordered a cake. Without telling me. I'm the taste tester. I should have been consulted." },
    { sender: 'Lazy Bunny', text: "Was there any left. That's all I want to know. Was there any cake left." },
    { sender: 'Chuckles',   text: "hahaha the CAKE hahaha oh no hahaha I'm going to be in so much trouble hahaha" },
    { sender: 'Fred',       text: "The name on the receipt starts with M." },
    { sender: 'Mr Easter',  text: "The name is smudged. Almost illegible. The first letter is M. Packing started one hour after the cake was collected." },
  ],

  9: [
    { sender: 'Mr Easter',  text: "The basket was never taken far." },
    { sender: 'Mr Easter',  text: "It's next door. Sitting in the living room surrounded by streamers and candles and twelve balloons. Next to a very large custom cake and a banner." },
    { sender: 'Mr Easter',  text: "Happy 2000th Easter Mr Easter." },
    { sender: 'Mrs Bunny',  text: "I moved it myself. Carefully. Quietly. While everyone was hanging the streamers. I needed you looking everywhere except next door. I've been planning this for six months." },
    { sender: 'Chuckles',   text: "hahaha we did it hahaha happy 2000th hahaha I've been holding that in for WEEKS hahaha" },
    { sender: 'Porridge',   text: "I ate the cake. I'm sorry. I couldn't help it. There's still some left. A little. The corners mostly." },
    { sender: 'Lazy Bunny', text: "I'm asleep on the couch. This is the best day. Don't wake me." },
    { sender: 'Fred',       text: "..." },
    { sender: 'Mrs Bunny',  text: "Two thousand years. Not one party. Not one card. Not one single morning off. You deserved this." },
  ],

}


// ─────────────────────────────────────────────────────────────────────────────
// PUZZLES
// Widget configs per stage. Each stage has a storyPool and a geoPool.
// Widgets available: FuseBox, LetterDrums, NumberDials, PotionMixer, Scroll
// ─────────────────────────────────────────────────────────────────────────────
// All puzzles are self-contained iframe HTML files served from /public/puzzles/
// PuzzleDrawer renders them via iframeSrc and communicates via postMessage.
// ─────────────────────────────────────────────────────────────────────────────

const PUZZLES = {

  // Stage 1 — Fix the Electrical Board (3-step chain) + Direction Maze (geo)
  //
  // Story chain: Wire Connections → Police Scanner → Sound Calibration
  //   Wire answer key (revealed by in-world clues):
  //   Red→F  Blue→M  Green→P  Yellow→L  Orange→C  Purple→B  White→K  Cyan→H
  //   Scanner: Freq=73 Hz, Amp=42% (both must lock simultaneously — no green on their own)
  //   Calibration: visual only, align bars to orange markers, no clue needed
  //
  // Geo: Direction Maze — 7x7, trap-heavy, needs the map item to solve safely
  1: {
    // Three narrative puzzles — shown one at a time via storyIndex in PuzzleCard
    // Solve puzzle 0 → puzzle 1 appears → solve → puzzle 2 → solve → story done
    //
    // WHY THERE IS NO CHAIN MECHANIC HERE — READ BEFORE CHANGING
    //
    // A chain mechanic was tried (chain: [...steps] inside a single storyPool entry).
    // It broke save/resume in a way that was very hard to debug. Here is why:
    //
    // The chain kept all 3 puzzles inside one PuzzleDrawer instance.
    // PuzzleDrawer managed chainStep internally with local state.
    // When the drawer closed, that local state was destroyed.
    // save-progress was only called at the END of the full chain completing —
    // meaning if a player solved puzzle 1 of 3 and closed the drawer (or the
    // browser crashed, or the session resumed), they had to start from puzzle 1
    // again. The progress was invisible to Supabase until all 3 were done.
    //
    // A chain WOULD make sense if puzzles were designed to repeat on failure —
    // e.g. a bomb defusal where wrong answer resets the whole sequence.
    // That is not this game. Each puzzle here is a one-time solve.
    //
    // The correct pattern is storyPool with multiple entries + storyIndex in PuzzleCard.
    // Each solve increments storyIndex, writes the mask to Supabase immediately,
    // and the next puzzle appears. Resuming restores storyIndex from the mask.
    // Each puzzle is independently saved the moment it is solved.
    storyPool: [
      {
        buttonLabel: 'Fix the Electrical Board',
        submitLabel: 'Submit Wiring',
        iframeSrc: '/Sequence_WireConnections_001.html',
        hint_1: 'Each wire colour matches a character initial. Check the items in your sack.',
        hint_2: 'Red=F  Blue=M  Green=P  Yellow=L  Orange=C  Purple=B  White=K  Cyan=H',
        devAnswer: 'Red→F  Blue→M  Green→P  Yellow→L  Orange→C  Purple→B  White→K  Cyan→H',
        config: {
          pairs: [
            { wire: 'Red',    color: '#c0392b', terminal: 'F', terminalLabel: 'Terminal F' },
            { wire: 'Blue',   color: '#5dcedf', terminal: 'M', terminalLabel: 'Terminal M' },
            { wire: 'Green',  color: '#27ae60', terminal: 'P', terminalLabel: 'Terminal P' },
            { wire: 'Yellow', color: '#f1c40f', terminal: 'L', terminalLabel: 'Terminal L' },
            { wire: 'Orange', color: '#e67e22', terminal: 'C', terminalLabel: 'Terminal C' },
            { wire: 'Purple', color: '#8e44ad', terminal: 'B', terminalLabel: 'Terminal B' },
            { wire: 'White',  color: '#ecf0f1', terminal: 'K', terminalLabel: 'Terminal K' },
            { wire: 'Cyan',   color: '#1abc9c', terminal: 'H', terminalLabel: 'Terminal H' },
          ],
          solvedTitle: 'Board Rewired',
          solvedMessage: 'All circuits connected. The speaker system has power.',
        },
      },
      {
        buttonLabel: 'Tune the Scanner',
        submitLabel: 'Intercept Signal',
        iframeSrc: '/Input_PoliceScanner_001.html',
        hint_1: 'Both channels must be correct at the same time. Check your items for the values.',
        hint_2: 'Frequency: 73 Hz. Amplitude: 42%.',
        devAnswer: 'Frequency: 73 Hz  |  Amplitude: 42%',
        config: {
          targetFreq: 73,
          targetAmp: 42,
          tolerance: 1,
          solvedTitle: 'Signal Intercepted',
          solvedMessage: 'Broadcast channel open. Ready to transmit.',
        },
      },
      {
        buttonLabel: 'Calibrate Output',
        submitLabel: 'Broadcast',
        iframeSrc: '/Input_SoundCalibration_001.html',
        hint_1: 'Align each bar by feel. No visual guides.',
        devAnswer: 'Left=65  Centre=40  Right=55',
        config: {
          channels: [
            { label: 'L', target: 65, color: '#3B82F6' },
            { label: 'C', target: 40, color: '#10B981' },
            { label: 'R', target: 55, color: '#F59E0B' },
          ],
          tolerance: 3,
          solvedTitle: 'Signal Broadcast',
          solvedMessage: 'The loudspeaker crackles to life across the park.',
        },
      },
    ],
    geoPool: [
      {
        buttonLabel: 'Search the Area',
        iframeSrc: '/Navigation_DirectionMaze_001.html',
            submitLabel: 'Confirm Route',
        hint_1: 'Navigate ● to ★ by tapping adjacent cells. The map item in your sack shows where the traps are.',
        hint_2: 'Safe path: R, D, R, D, D, R, D, R, R, D, R',
        devAnswer: 'Safe path: Right, Down, Right, Down, Down, Right, Down, Right, Right, Down, Right',
        config: {
          cols: 6,
          rows: 6,
          grid: [
            [1, 1, 2, 1, 2, 1],
            [2, 1, 1, 2, 1, 1],
            [1, 2, 1, 1, 1, 2],
            [1, 1, 2, 1, 2, 1],
            [2, 1, 1, 1, 1, 1],
            [1, 2, 1, 2, 1, 3],
          ],
          startRow: 0,
          startCol: 0,
          solvedTitle: 'Pattern Found',
          solvedMessage: 'The trap positions form a pattern. The map was a clue within a clue.',
        },
      },
    ],
  },

  // Stage 2 — TODO: puzzle TBD
  // Answer: 8 (4 corners x 2 checks)
  2: { storyPool: [], geoPool: [] },

  // Stage 3 — TODO: puzzle TBD
  // Answer: PORRIDGE (anagram)
  3: { storyPool: [], geoPool: [] },

  // Stage 4 — TODO: puzzle TBD
  // Answer: 34310 (47 x 365 x 2)
  4: { storyPool: [], geoPool: [] },

  // Stage 5 — TODO: puzzle TBD
  // Answer: 2 red, 0 blue, 2 yellow (Southport Gold dye formula)
  5: { storyPool: [], geoPool: [] },

  // Stage 6 — TODO: puzzle TBD
  // Answer: 375 (minutes from midnight to 6:15am)
  6: { storyPool: [], geoPool: [] },

  // Stage 7 — TODO: puzzle TBD
  // Answer: COLD HEAT LIGHT FANS DOOR ALARM
  7: { storyPool: [], geoPool: [] },

  // Stage 8 — TODO: puzzle TBD
  // Answer: 8pm (cake collected at 7pm, packing started one hour later)
  8: { storyPool: [], geoPool: [] },

  // Stage 9 — TODO: puzzle TBD
  // Answer: 2025
  9: { storyPool: [], geoPool: [] },

}


// ─────────────────────────────────────────────────────────────────────────────
// STAGES — wires STORY and PUZZLES together. Do not edit below this line.
// ─────────────────────────────────────────────────────────────────────────────

export const STAGES = Object.keys(STORY).map(key => ({
  stage: String(key),
  messages: STORY[key],
  storyPool: PUZZLES[key]?.storyPool || [],
  geoPool:   PUZZLES[key]?.geoPool   || [],
}))

export function getStage(stage) {
  return STAGES.find(s => s.stage === String(stage)) || null
}

export function getMessages(stage) {
  return getStage(stage)?.messages || []
}

export function getStoryPuzzle(stage, index = 0) {
  const pool = getStage(stage)?.storyPool
  if (!pool?.length) return null
  return pool[index % pool.length]
}

export function getGeoPuzzle(stage, index = 0) {
  const pool = getStage(stage)?.geoPool
  if (!pool?.length) return null
  return pool[index % pool.length]
}

export function getPoolSize(stage) {
  const s = getStage(stage)
  return (s?.storyPool?.length || 1) + (s?.geoPool?.length || 1)
}
