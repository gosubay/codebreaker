# Codebreaker — project context

Mastermind (4 pegs, 6 colours, 1,296 codes) with Knuth's 1977 minimax solver running
alongside the player and explaining its reasoning. Built as both a screen-recording prop
for a short-form video and a shippable interactive toy.

Live: https://gosubay.github.io/codebreaker/ — repo `gosubay/codebreaker`
Author: Galvin Bay, @heygalvinbay

## Architecture

**One file: `index.html`.** No build, no dependencies, no backend. ~56KB.
(`verify-all-games.js` is a dev-only Node harness — it is never loaded by the page.)
Only external references are Google Fonts (falls back cleanly), the icon files, and `og.png`.

Key pieces, in order in the `<script>`:

- `DIG` — Uint8Array(1296×4), every code's digits
- `FB` / `FBI` — the 14 legal (blacks, whites) responses. Note: 3 blacks + 1 white is
  impossible. `SOLVED` is the index of 4b0w.
- `TABLE` — Uint8Array(1296×1296) of precomputed feedback. Built chunked on load with a
  progress bar, symmetric so only half is computed. ~1.6MB.
- `rankAll(cands)` — scores all 1,296 guesses by largest bucket. Sorted by
  (worst asc, inSet desc, index asc). **The inSet tie-break is not optional** — drop it and
  the five-guess guarantee is lost.
- `bestOf(cands)` — same thing without the full sort, for lookahead
- `analyze(cands)` — derives possible/sure/present/absent per colour, plus repeat facts
- `lastAnswer()` / `shortPlan()` / `plan()` — the coach's generated prose
- Field renders as canvas dots above 60 candidates, DOM chips at or below

## Three modes (added 2026-09-03)

One set of panels, shown and hidden by `data-mode` on `<body>`. There is no second copy
of the board or the solver anywhere — a tab is a visibility state, not a screen.

| | Play | Coach | Analyse |
|---|---|---|---|
| `secret` | random | random | **-1, there is none** |
| ranking computed | **never** | every turn | every turn |
| feedback comes from | `TABLE[g*N+secret]` | same | **the user clicks it** |
| panels shown | board only | all | all |

- `mode` is a module-level string: `'play' | 'coach' | 'analyse'`. `SNAP` parks the whole
  game state per mode on the way out and restores it on the way back, so switching tabs
  never destroys a board.
- `refresh()` **returns early in play mode**, before `rankAll`. That is deliberate: the
  ranking is 1.7M table lookups and nothing in play mode displays it. Do not "tidy" that
  branch away — it is the difference between instant and sluggish on a phone.
- `playGuess(g, forced)` — pass `forced` (a feedback index) and it uses that instead of
  consulting `secret`. That is the whole of analyse mode's plumbing. It rejects a
  `forced` value with an empty bucket rather than corrupting the candidate set.
- Analyse offers only answers some surviving code could actually have given; the rest are
  disabled, with each option labelled by how many codes it would leave. **A contradiction
  is unreachable by construction, not caught afterwards** — keep it that way.
- Play mode must never surface anything derived from the candidate set: no counts, no
  suggestion, no coach. The `Left` tally is hidden there for that reason.
- Both modes stop at 9 guesses, because `renderBoard` stops drawing rows at 9.
- **Rewinding is a review in play and coach, but an edit in analyse.** `liveEdit()` is the
  single test for "may I still set pegs here": `cursor === states.length-1 || mode === 'analyse'`.
  It gates the draft row in `renderBoard`, both buttons in `syncPlay`, and `ready` in
  `renderEntry`. In analyse the answers were typed by hand, so a mistyped one has to be
  fixable; `playGuess` already truncates `states` after the cursor, so re-answering just
  branches the game from that move. The entry caption says how many moves that drops.
  Do not re-add a bare `cursor === states.length-1` in those three places.
- **Back reopens the answer, not the guess.** A move in analyse is two steps: set the pegs,
  then pick the answer. `syncDraftToCursor()` runs on every Back/Forward and puts the guess
  that was played from the new cursor back on the draft row (`states[k+1].guesses[k].g` is
  the guess played from state `k`), so one Back lands on step 2, not step 1. Stepping
  forward onto the live state clears the draft again. Analyse only — in coach the draft row
  does not render while rewound, so prefilling it there would be invisible and confusing.

## The mode bar (moved 2026-09-04)

`.modebar` holds the tab bar and the Back / Forward / New code row together, directly under
the header. Column on a phone, one row on desktop with the controls pushed right by
`margin-left:auto` so they line up with the grid's right edge. They used to sit in the grid
as `.a-ctrl` at the foot of the page, ~2,500px below the analyse entry grid, which is where
you actually use them. The `ctrl` area and the `.spacer` that right-aligned New code inside
that old row are both gone — do not re-add `ctrl` to any `grid-template-areas`.

## Coach copy — the middlegame and endgame (added 2026-09-04)

Everything after move 2 is keyed on **the position, never the move number**. This is not
a style choice. "By move 4 you are certain" is true only of the solver's own line, and
Coach and Analyse both let the player play anything. Measured over 3,000 games:

| at the start of move 4 | solver | player who always guesses something still possible | player ignoring the answers |
|---|---|---|---|
| codes left, median | 3 | 3 | 6 |
| most it can be | 7 | 32 | 111 |
| more than 7 left | never | **17% of games** | 43% |

Play `1111` three times and hear "no pegs" each time and **625** codes are alive on move 4.
A consistent guesser averages 4.65 guesses and needs a sixth in 15% of games.

`adviceBody()` is the shared body — `advise()` and `nextLine()` both call it, so grading,
rewinding and mode-switching all say the same thing. Its parts:

- `positionNote()` — the three middlegame shapes, chosen by how many colours are neither
  confirmed in nor ruled out: none (`Every colour is settled`), one or two (`Almost there`),
  three or more (`Still a hunt`). Suppressed when the previous answer filled all four holes,
  because `lastAnswer()` has already said it.
- `survivorList()` — prints every remaining code as a chip when there are 2–5 of them.
  Reaches 26 of the 94 move-3 positions and 293 of the 320 move-4 ones. The `.cands` chip
  styling is load-bearing: twenty bare pegs in a row read as one stripe.
- `certaintyNote()` — fires on `worst===1`, not on a move number. True in 40 of 94 move-3
  positions and **all 320** move-4 ones. Has a second voice for `!inSet`: 31 of those 320
  give up a free winning shot because no candidate tells the field apart, which is the
  `2b2w` dead-peg lesson returning.
- `behindNote()` — fires when `cands.length` exceeds `SOLVERCAP[guesses.length]`.
  `SOLVERCAP = [1296, 256, 46, 7, 1]` is the most the solver's own line ever holds at the
  start of each move, computed over every reachable state. Do not adjust these by hand.
- `guaranteeNote()` — fifth guess or later with more than one code left. The guarantee is
  genuinely spent there and the solver never reaches it. Offers the 1-in-N shot only when
  N ≤ 20; a 1-in-256 shot is not worth mentioning.

Move 5 needs nothing: all 694 states the solver reaches have exactly one candidate.

## Coach copy — move 2 (added 2026-09-04)

Eleven hand-written explanations, one per reachable answer to a two-and-two opening,
each in two halves. `moveTwo()` builds them; `advise()` and `gradeOpening()` both call it.

- **KNOW** is true after **any** 22-shaped opening — AABB, ABAB, ABBA, any colours.
  Verified over all 1,296: every 22 opening yields exactly the same eleven answers with
  exactly the same counts (256/256/96/16/256/208/36/114/32/4/20). Only the colour names
  and slot pairs change, and `pairsOf()` substitutes them. Colour plurals use `AP`/`BP`.
- **WHY** describes the solver's actual pegs, so it is shown **only after `1122`**
  (index 7). The tie sets are large — 48 guesses tie after `0b1w` — and the solver picks
  a different representative under a different opening: after `3344` it answers `2b0w`
  with `1124`, not the relabelled `1234`. Any other opening falls back to the generated
  line. **Do not widen this without re-checking every pick.**
- A non-22 opening skips the whole block and uses `lastAnswer()` + `nextLine()` as before.

Figures that appear in the copy, all computed here, none quoted:

| answer | left | play | worst | notable |
|---|---|---|---|---|
| `0b0w` | 256 | `3345` | 46 | ≤2 pegs → purple present 84%; 4 pegs → purple absent, always |
| `0b1w` | 256 | `2344` | 44 | 48 guesses tie; red-in-slot-3 equally good |
| `1b0w` | 256 | `1344` | 44 | same 48-way tie |
| `0b2w` | 96 | `2344` | 18 | doubling orange → 36; **`2244` needs a 6th guess in 2 of 96** |
| `1b1w` | 208 | `1134` | 38 | `1234` → 44; all 24 best guesses keep a doubled old colour |
| `2b0w` | 114 | `1234` | 21 | `1344` and `1243` tie exactly; `1123` → 34 |
| `0b3w` | 16 | `1213` | 4 | **`2211` returns one answer for all 16 codes** |
| `1b2w` | 36 | `1213` | 7 | lock-and-test → 16 |
| `2b1w` | 32 | `1223` | 6 | every code has one red in the red pair, never both; `1123` → 8 |
| `3b0w` | 20 | `1223` | 5 | `1124` → 8 but **still finishes in five**, 4.15 vs 4.05 average |
| `2b2w` | 4 | `1213` | 1 | any candidate → worst 2; the dead yellow peg → worst 1 |

Six of the eleven recommendations **cannot be the code**: `0b2w`, `1b1w`, `2b0w`, `0b3w`,
`2b2w`, `3b0w`. Say so — it is the most surprising thing in the whole sequence.

Galvin's rules for this copy: name what a comparison is against (never "the mirror image"
or "the same guess"), a reader lands on one answer and never reads the others, and the
numbers stay in.

## Coach copy — the opening (rewritten 2026-09-04)

The guess-1 explanation is deliberately **not** a restatement of the algorithm. It says a
guess has to chase three things with four slots (which colours, how many of each, where
they sit), then shows both extremes costing you. Every figure in it is computed, not
quoted — worst case by opening shape over all 1,296:

| shape | example | worst case |
|---|---|---|
| `4` all one colour | 6666 | 625 |
| `31` | 6661 | 317 |
| `1111` four different | 1234 | 312 |
| `211` pair + two singles | 1123 | 276 |
| `22` **two colours, two of each** | 1122 | **256** |

Note `22` produces only 13 distinct answers while `1111` and `211` produce all 14 — more
possible answers is *not* the criterion, so never explain it that way. Galvin rejected the
"sorting codes into piles" framing as just repeating the algorithm; keep the copy human.

## Verified numbers — computed here, do not trust cited figures

Published sources disagree. Irving cites 5,804; one arXiv paper says 4.467; 4.478 circulates
widely. All were checked against a full playout of all 1,296 secrets:

| Strategy | Average | Worst |
|---|---|---|
| Random consistent guess | 4.64 | 8 |
| First consistent guess in order | 5.02 | 8 |
| Minimax restricted to possible codes | 4.50 | 6 |
| **Knuth minimax (all 1,296 considered)** | **5801/1296 = 4.476** | **5** |
| Koyama & Lai optimal expected | 5625/1296 = 4.340 | 6 |
| Koyama & Lai constrained to 5 | 5626/1296 = 4.341 | 5 |

Knuth distribution: 1/6/62/533/694 games at 1–5 guesses.

Opening worst cases depend **only on the shape**, never which colours:
two pairs 256 (90 openings tie) · pair+two singles 276 · all different 312 ·
three+one 317 · all same 625.

Tree size: move 2 has 11 decision nodes, move 3 has 94, move 4 has 320.
**All 694 states reaching move 5 have exactly one candidate** — move 5 is never a decision.

Across 425 reachable states, the solver tests roughly half the remaining colour uncertainty
each turn (0 unresolved → 0.00 new colours, 6 → 3.30). With zero unresolved it introduces
zero new colours, no exceptions.

Consecutive guesses differ by: 0 colours 7.8%, 1 colour 22.3%, 2 colours 35.8%,
3 colours 26.1%, 4 colours 8.0%.

## The answer pegs (changed 2026-09-03)

They are drawn **literally**, like the physical board: a pale tray, four holes, a black
peg for the right colour in the right slot and a white peg for the right colour in the
wrong slot. Empty holes are small and recessed.

This replaced an earlier dark-mode inversion (solid near-white = black peg, hollow ring
= white peg), which nobody could read: at 8px a ring and a solid dot look the same, and
the letters in `1b 3w` contradicted the colours on screen.

- **One function builds every one of them**: `fbIcons(i, cls)` returns a `.tray`. Used by
  the board rows, both histograms, the coach's inline icons, the pinned-bucket note and
  the analyse entry grid. Do not add a second way to draw them.
- Size per context with the custom properties `--td` (peg), `--th` (empty hole),
  `--tg` (gap), `--tp` (padding), `--tr` (corner). Never hard-code sizes on `.tray span`.
- The grid tracks are **pinned to `--td`**, not `1fr`. Empty holes are smaller than pegs, so
  content-sized tracks made `0b0w` visibly smaller than `4b0w`. Every tray must be the same
  square whatever it holds.
- A key sits under the board in **all three modes** (`.pegkey`). It is the only place the
  convention is explained, so it stays visible even in play mode.
- **The tray styles are global, not inside a media query.** Anything that holds a tray and
  is desktop-only must be hidden explicitly on mobile — `.blabels` needs its own
  `display:none`, because its children used to be invisible by accident.

## Rules for the explanations

**Every clause must be derived from the live candidate set.** No invented reasoning, no
plausible-sounding rationalisation. If a claim can't be computed from the surviving codes,
it doesn't ship. Someone will check.

The spine is: the peg **total** is a colour question (how much of the code the guessed
colours account for), and the black/white **split** is a position question. `lastAnswer()`
reads both.

UI copy uses British spelling ("colour"). Tone is plain and direct, no filler.

### The move-1 explanation is locked (2026-09-03)
Galvin chose the framing: **three jobs, four slots, and both extremes are worse.** Not
"the algorithm sorts codes into piles" — that was rejected for restating the algorithm
instead of explaining it. The shape is:

1. A guess chases three things at once with only four slots — which colours are in the
   code, how many of each, and where they sit. A slot spent on a new colour is a slot not
   spent pinning down a colour already asked about, so nothing does all three well.
2. Both extremes cost you. Worst case by opening shape, computed over all 1,296:
   all-one-colour **625**, three-and-one **317**, four-different **312**,
   pair-and-two-singles **276**, two-colours-twice-each **256**.
   Only two of these ship: 625 and 312. The 317 line was cut for length.
3. The colours are irrelevant — 90 openings tie exactly.

Do not reintroduce the "piles" or "biggest bucket" wording into move 1. The mechanism is
allowed to appear later, once the reader has a reason to care.

## Testing

There is no test framework. Verification is done with throwaway Node scripts that reimplement
or splice in the shipped functions and play all 1,296 games. Any change to the solver,
the tie-break, or the explanation generator should be re-verified this way — especially that
the worst case never exceeds 5.

The cheapest version: run the shipped `<script>` under a ~40-line DOM shim in `node:vm`
(stub `document`, `matchMedia`, `requestAnimationFrame`, drain the rAF queue to finish the
table build), append a line exporting the internals onto `globalThis`, then play all 1,296.
That tests the file that ships rather than a copy of it. Expect exactly:
total 5801, average 4.4761, worst 5, distribution 1/6/62/533/694.

Analyse mode gives a second, free check: the candidate counts it shows for each answer
must match `solver-decision-table.md` — e.g. after 1122 the options read
0b0w 256, 0b2w 96, 1b0w 256, 1b1w 208, 2b0w 114, 3b0w 20, and 1b3w is disabled.

## Open items

- `og.png` (1200×630) missing, so links share with no preview card
- `favicon.svg`, `icon-32.png`, `icon-180.png` may not be uploaded yet; the page links them
- Colour **count** ranges are not shown anywhere ("yellow: 1 or 2"). The grid shows which
  slots a colour can occupy but never how many there are. Agreed gap, not yet built.
- Comparative explanations ("we swapped a yellow for a purple and the total went up") only
  work when consecutive guesses differ by 0 or 1 colour — about 30% of turns. Not yet built.
  Comparing against non-consecutive guesses would raise that; not yet measured.
- Mobile: real-device timing of the table build is unmeasured. The fixed guess bar against
  iOS Safari's collapsing toolbar is untested.
- The doubled-colour clause fires on most turns and may read repetitively over a full game.
- The mobile guess bar overflows at 375px: six 44px pegs + gaps + an 88px Play button needs
  ~424px inside a 375px screen, so Play is clipped off the right edge. **Pre-existing, all
  modes, not yet fixed.**

## Deliberately not built

Side-by-side strategy comparison (minimax vs entropy vs most-parts). It's a second video.
