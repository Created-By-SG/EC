// games/001-mr-easter/game.js
// Single source of truth for The Bunny Who Stole Easter.
//
// TWO SECTIONS:
//   1. STORY  — read top to bottom like a script. Edit chat text here.
//   2. PUZZLES — widget configs per stage. Edit puzzle mechanics here.
//
// Style rules: no hyphens or em dashes in copy. Use three dots instead.


// ─────────────────────────────────────────────────────────────────────────────
// STORY
// Read this section like a script. Each stage is a block of chat messages.
// To change what players read, edit the text here. Nothing else needs touching.
// ─────────────────────────────────────────────────────────────────────────────

const STORY = {

  1: [
    { sender: 'Mr Easter',  text: "Right. I'll keep this short because I'm already behind schedule and frankly I'm embarrassed this happened at all." },
    { sender: 'Mr Easter',  text: "My name is Mr Easter. Two thousand years I've been doing this job. Not once has a basket gone missing. Not once. Until today. Southport's basket. Gone." },
    { sender: 'Mr Easter',  text: "We were doing the final placement last night. Southport Park. Me, Lazy Bunny, Porridge and Fred. Standard night. Or so I thought." },
    { sender: 'Chuckles',   text: "hahaha I mean it could have been anyone hahaha except maybe the one who actually runs this whole operation hahahaha" },
    { sender: 'Mr Easter',  text: "Chuckles just winked at me. I don't know what that means. I never know what that means." },
    { sender: 'Porridge',   text: "I was doing quality control. Somebody has to make sure the eggs taste right. I take that very seriously. I had chocolate on my face because of testing. That is the only reason." },
    { sender: 'Lazy Bunny', text: "I was there but I was basically asleep the whole time. Nearly asleep. Very close to asleep. I did not see anything." },
    { sender: 'Mr Easter',  text: "Then there's Fred. Nobody invited Fred. He just showed up. Stood there. Nodded at things. Has not explained himself. Still hasn't." },
    { sender: 'Fred',       text: "..." },
    { type: 'event',        text: "Fred placed something in the Kin Sack." },
    { sender: 'Mr Easter',  text: "Fred found a cloth near the basket site. Looked useful. I approved it. We were grateful at the time." },
    { sender: 'Porridge',   text: "I also found something. Near the main path. Half eaten carrot. Someone left it there. Very suspicious. I placed it in the sack for safekeeping." },
    { type: 'event',        text: "Porridge placed something in the Kin Sack." },
    { sender: 'Lazy Bunny', text: "I sat on something. It was under me the whole time. Small gold button. No idea where it came from. Put it in the sack." },
    { type: 'event',        text: "Lazy Bunny placed something in the Kin Sack." },
    { sender: 'Chuckles',   text: "hahaha I found a ribbon hahaha very nice ribbon hahaha going in the sack hahaha" },
    { type: 'event',        text: "Chuckles placed something in the Kin Sack." },
    { sender: 'Porridge',   text: "I also found a note. Near Lazy Bunny's spot. Looked rushed. Handwriting familiar. Into the sack." },
    { type: 'event',        text: "Porridge placed something in the Kin Sack." },
    { sender: 'Fred',       text: "..." },
    { type: 'event',        text: "Fred placed something in the Kin Sack." },
    { sender: 'Mr Easter',  text: "Fred found a diagram. Scuff marks. Shows something was dragged. Direction unclear. Possibly useful." },
    { sender: 'Mr Easter',  text: "Six items. Five suspects. No basket. The loudspeaker system is down — someone pulled the wiring. We need it working to broadcast an alert across the park." },
    { sender: 'Mr Easter',  text: "I've got approximately two hours before every child in Southport wakes up to nothing. Check the items in the sack and get that electrical board fixed." },
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
    storyPool: [
      {
        buttonLabel: 'Fix the Electrical Board',
        isChain: true,
        chain: [
          {
            iframeSrc: '/Sequence_WireConnections_001.html',
            stepLabel: 'Rewire the Board',
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
            iframeSrc: '/Input_PoliceScanner_001.html',
            stepLabel: 'Tune the Scanner',
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
            iframeSrc: '/Input_SoundCalibration_001.html',
            stepLabel: 'Calibrate Output',
            hint_1: 'Align each bar to the orange marker on the VU meter.',
            devAnswer: 'Left=65  Centre=40  Right=55  (align bars to orange markers)',
            config: {
              channels: [
                { label: 'L', target: 65, color: '#3B82F6' },
                { label: 'C', target: 40, color: '#10B981' },
                { label: 'R', target: 55, color: '#F59E0B' },
              ],
              tolerance: 3,
              solvedTitle: 'Signal Broadcast',
              solvedMessage: 'The loudspeaker crackles to life across the park. Someone responds with a major clue.',
            },
          },
        ],
      },
    ],
    geoPool: [
      {
        buttonLabel: 'Search the Area',
        iframeSrc: '/Navigation_DirectionMaze_001.html',
        hint_1: 'The map item in your sack shows where the traps are placed.',
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

  // Stage 2 — Answer: 8 (4 corners x 2 checks)
  2: {
    storyPool: [
      {
        iframeSrc: '/puzzles/number-dials.html',
        buttonLabel: 'Count the corners',
        hint_1: 'Read carefully ... every corner, twice.',
        hint_2: '4 corners multiplied by 2.',
        config: {
          answer: [8],
          scramble: [3],
          solvedMessage: 'Eight. Four corners, checked twice. Not a basket in any of them.',
        },
      },
    ],
    geoPool: [
      {
        iframeSrc: '/puzzles/letter-drums.html',
        buttonLabel: 'Inspect the cold room door',
        hint_1: 'The number of corners multiplied by the checks. Spell it out.',
        hint_2: 'Spin the drums to spell: E, I, G, H, T.',
        config: {
          answer: ['E', 'I', 'G', 'H', 'T'],
          scramble: ['A', 'B', 'C', 'D', 'F'],
          solvedMessage: 'Eight corners. Chuckles checked every single one. No basket.',
        },
      },
    ],
  },

  // Stage 3 — Answer: PORRIDGE (anagram of LAPORGE)
  3: {
    storyPool: [
      {
        iframeSrc: '/puzzles/fuse-box.html',
        buttonLabel: 'Check the fuse panel',
        hint_1: 'It is an anagram of his own name.',
        hint_2: 'Restore letters in order: P, O, R, I, D, G, E.',
        config: {
          fuses: ['P', 'O', 'R', 'I', 'D', 'G', 'E', 'X'],
          answer: ['P', 'O', 'R', 'I', 'D', 'G', 'E'],
          solvedMessage: 'Porridge. That is what he claims he was carrying. The chocolate on his face suggests otherwise.',
        },
      },
    ],
    geoPool: [
      {
        iframeSrc: '/puzzles/letter-drums.html',
        buttonLabel: 'Search the loading dock',
        hint_1: 'It is an anagram of his own name.',
        hint_2: 'Spin the drums to spell: P, O, R, R, I, D, G, E.',
        config: {
          answer: ['P', 'O', 'R', 'R', 'I', 'D', 'G', 'E'],
          scramble: ['L', 'A', 'P', 'O', 'R', 'G', 'E', 'X'],
          solvedMessage: 'That is what he said. Though I notice he has chocolate on his face.',
        },
      },
    ],
  },

  // Stage 4 — Answer: 34310 (47 x 365 x 2)
  4: {
    storyPool: [
      {
        iframeSrc: '/puzzles/number-dials.html',
        buttonLabel: 'Check the nap log',
        hint_1: '47 years times 365 days times 2 naps.',
        hint_2: '47 x 365 x 2.',
        config: {
          answer: [3, 4, 3, 1, 0],
          scramble: [7, 2, 8, 5, 1],
          solvedMessage: '34,310 naps. He seemed proud of this.',
        },
      },
    ],
    geoPool: [
      {
        iframeSrc: '/puzzles/number-dials.html',
        buttonLabel: 'Inspect the timesheet',
        hint_1: '47 years times 365 days times 2 naps.',
        hint_2: '47 x 365 x 2.',
        config: {
          answer: [3, 4, 3, 1, 0],
          scramble: [0, 9, 1, 6, 4],
          solvedMessage: '34,310 naps. He had the number memorised. That tells you something.',
        },
      },
    ],
  },

  // Stage 5 — Answer: 2 red, 0 blue, 2 yellow (Southport Gold)
  5: {
    storyPool: [
      {
        iframeSrc: '/puzzles/potion-mixer.html',
        buttonLabel: 'Mix the Southport Gold',
        hint_1: 'Orange is made from red and yellow in equal parts. No blue.',
        hint_2: 'Two drops red, zero blue, two drops yellow.',
        config: {
          maxDrops: 4,
          answer: { R: 2, B: 0, Y: 2 },
          target: { color: '#c87020', label: 'Southport Gold ... equal red and yellow, no blue' },
          solvedMessage: 'Southport Gold. Two parts red, zero blue, two parts yellow. The colour of a Southport sunrise.',
        },
      },
    ],
    geoPool: [
      {
        iframeSrc: '/puzzles/number-dials.html',
        buttonLabel: 'Find the dye formula',
        hint_1: 'Red, Blue, Yellow in that order. Orange needs no blue.',
        hint_2: 'Two red, zero blue, two yellow.',
        config: {
          answer: [2, 0, 2],
          scramble: [5, 3, 7],
          solvedMessage: 'Two red, zero blue, two yellow. The formula checks out.',
        },
      },
    ],
  },

  // Stage 6 — Answer: 375 (minutes from midnight to 6:15am)
  6: {
    storyPool: [
      {
        iframeSrc: '/puzzles/number-dials.html',
        buttonLabel: 'Calculate the gap',
        hint_1: 'Convert 6 hours 15 minutes to minutes.',
        hint_2: '6 multiplied by 60 plus 15.',
        config: {
          answer: [3, 7, 5],
          scramble: [1, 2, 0],
          solvedMessage: '375 minutes. Long enough to hide something. Or eat something.',
        },
      },
    ],
    geoPool: [
      {
        iframeSrc: '/puzzles/number-dials.html',
        buttonLabel: 'Check the security log',
        hint_1: 'Convert 6 hours 15 minutes to minutes.',
        hint_2: '6 multiplied by 60 plus 15.',
        config: {
          answer: [3, 7, 5],
          scramble: [8, 0, 4],
          solvedMessage: '375 minutes unaccounted for. Chuckles had plenty of time.',
        },
      },
    ],
  },

  // Stage 7 — Answer: COLD HEAT LIGHT FANS DOOR ALARM (circuit restore sequence)
  7: {
    storyPool: [
      {
        iframeSrc: '/puzzles/fuse-box.html',
        buttonLabel: 'Restore the circuit board',
        hint_1: 'Cold storage first, then heat, then light.',
        hint_2: 'COLD then HEAT then LIGHT then FANS then DOOR then ALARM.',
        config: {
          fuses: ['COLD', 'HEAT', 'LIGHT', 'FANS', 'DOOR', 'ALARM'],
          answer: ['COLD', 'HEAT', 'LIGHT', 'FANS', 'DOOR', 'ALARM'],
          solvedMessage: 'All six circuits online. The cold room is running. Whatever was in there is still cold.',
        },
      },
    ],
    geoPool: [
      {
        iframeSrc: '/puzzles/letter-drums.html',
        buttonLabel: 'Find the breaker box',
        hint_1: 'First letters of each circuit in order.',
        hint_2: 'Spin the drums to spell: C, H, L, F, D, A.',
        config: {
          answer: ['C', 'H', 'L', 'F', 'D', 'A'],
          scramble: ['X', 'B', 'Q', 'M', 'Z', 'P'],
          solvedMessage: 'Cold, Heat, Light, Fans, Door, Alarm. Power restored.',
        },
      },
    ],
  },

  // Stage 8 — Answer: 8 (8pm, one hour after 7pm cake pickup)
  8: {
    storyPool: [
      {
        iframeSrc: '/puzzles/number-dials.html',
        buttonLabel: 'Check the delivery log',
        hint_1: 'Add one hour to 7pm.',
        hint_2: '7pm plus 60 minutes equals 8pm.',
        config: {
          answer: [8],
          scramble: [2],
          solvedMessage: '8pm. Packing started. And the basket was already gone.',
        },
      },
    ],
    geoPool: [
      {
        iframeSrc: '/puzzles/letter-drums.html',
        buttonLabel: 'Find the loading slip',
        hint_1: 'Add one hour to 7pm. Spell out the hour.',
        hint_2: 'Spin the drums to spell: E, I, G, H, T.',
        config: {
          answer: ['E', 'I', 'G', 'H', 'T'],
          scramble: ['A', 'C', 'M', 'P', 'X'],
          solvedMessage: 'Eight. 8pm. Packing started and the basket was already gone.',
        },
      },
    ],
  },

  // Stage 9 — Answer: 2025 (year 25 plus 2000 years)
  9: {
    storyPool: [
      {
        iframeSrc: '/puzzles/number-dials.html',
        buttonLabel: 'Check the year register',
        hint_1: 'Add 2000 to the year he started.',
        hint_2: '25 plus 2000.',
        config: {
          answer: [2, 0, 2, 5],
          scramble: [9, 3, 6, 1],
          solvedMessage: '2025. And still no basket. This has been the worst year of my career.',
        },
      },
    ],
    geoPool: [
      {
        iframeSrc: '/puzzles/number-dials.html',
        buttonLabel: 'Find the date stamp',
        hint_1: 'Add 2000 to the year he started.',
        hint_2: '25 plus 2000.',
        config: {
          answer: [2, 0, 2, 5],
          scramble: [5, 8, 0, 3],
          solvedMessage: 'Two thousand and twenty five years of this job. Never lost a basket. Until now.',
        },
      },
    ],
  },

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

function getStage(stage) {
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
