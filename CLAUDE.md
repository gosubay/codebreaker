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
