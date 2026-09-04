# HANDOFF — Codebreaker

Last updated: 2026-09-04

## Where the repo lives
`C:\Claude\Code\Mastermind\codebreaker` — cloned from `gosubay/codebreaker`.
Live at https://gosubay.github.io/codebreaker/

## State: three tabs shipped, verified, committed
The page now has three modes, selected by a tab bar under the header. One set of
panels, shown and hidden by `data-mode` on `<body>`. One solver, one board, no copies.

- **Play** — big board, nothing else. No coach, no dot field, no histogram, no colour
  grid, no suggestion, no solver-plays, no "Left" counter. Ends with a small banner:
  cracked in N, or the code revealed after nine guesses.
- **Coach** — the page exactly as it was. Default tab on load.
- **Analyse** — no hidden code. Set four pegs, then pick the answer you were given from
  a grid of the 14 possible responses. Answers no surviving code could have produced are
  greyed out, and each option says how many codes it would leave. The solver then gives
  the next move with the usual explanation.

Each tab keeps its own game. Switching tabs parks a board, it never wipes one.

## Answer pegs redrawn (2026-09-03)
The black/white key pegs are now drawn literally — a pale tray, four holes, a black peg
and a white peg — everywhere they appear: board rows, both histograms, the coach's inline
icons, and the analyse entry grid. The old dark-mode inversion (solid light dot = black
peg, hollow ring = white peg) was unreadable at 8px and contradicted the `1b 3w` labels.
A key sits under the board in all three modes.

Two things this shook out, both fixed:
- The analyse grid dimmed impossible answers to 26% opacity, which made every icon on the
  page look wrong. Now the button chrome dims and the pegs stay at 50%, still readable.
- `.blabels` (the desktop bar labels) had no mobile styling, so its children used to be
  invisible by accident. Tray styles are global, so on mobile it briefly rendered as a
  stack of stretched pale bars. It now has an explicit `display:none`.

## Coach copy + rewind fix (2026-09-04)
- **Guess-1 explanation rewritten.** Was a one-liner about "no answer being much more
  likely" and "the worst you can hear" — a metaphor never set up. Now three paragraphs:
  a guess chases three things with four slots, and both extremes cost you (625 for four of
  one colour, 312 for four different, 256 for two-and-two). Figures computed over all
  1,296, table in CLAUDE.md.
- **Analyse: Back no longer dead-ends.** Rewinding used to grey out the draft row, both
  buttons and all 14 answers, so the only way out was Forward or Start over. In analyse the
  answers are typed by hand, so a wrong one must be fixable. New `liveEdit()` helper; the
  caption warns how many later moves a re-answer replaces. Play and coach unchanged.
- **Back lands on step 2, not step 1.** A move is "set pegs" then "pick answer"; Back now
  restores the pegs you played, so you land straight on "what came back?". Forward onto the
  live move clears them again.

## Mode bar (2026-09-04)
Back / Forward / New code moved off the foot of the page into a shared row with the three
tabs. Desktop: tabs left, buttons right, flush with the grid edge (measured 967px against a
967px grid). Mobile: buttons stack directly under the tabs, both visible without scrolling.
In analyse they now sit 400px *above* the entry grid instead of 2,000px below it.

## Middlegame and endgame copy (2026-09-04)
Moves 3 onward now read the position rather than the move number: the three middlegame
shapes, the surviving codes printed as chips when 5 or fewer remain, a "whatever comes back
you will know the code" line on `worst===1`, a note when the player holds more codes than
the solver's line ever does, and a "the five-guess guarantee is spent" line from guess 5.
All of it survives imperfect play, which was the point — a player who wanders can hold 625
codes on move 4, so nothing keys on the move number. Figures and triggers in CLAUDE.md.

## Coach copy for move 2 (2026-09-04)
Eleven hand-written explanations, one per answer to a two-and-two opening, each split into
"what you now know" (fires after any 22-shaped opening, colours and slots substituted) and
"why this move" (the peg-by-peg reasoning, standard opening `1122` only). Full table of
figures in CLAUDE.md. Checked by dumping the coach HTML for all 13 answers under `1122`,
`3344`, `5656` and the non-22 `1234`.

## Verified (not assumed)
- `node verify-all-games.js` runs the **shipped** `<script>` under a DOM shim and plays
  all 1,296 games: total 5801, average 4.4761, worst 5, distribution 1/6/62/533/694.
  Unchanged from before the tabs went in.
- Analyse's candidate counts cross-checked against `solver-decision-table.md`:
  after 1122 → 0b0w 256, 0b2w 96, 1b1w 208, 2b0w 114, 3b0w 20, 1b3w disabled.
  After 1b0w the suggestion is 1344, matching the table.
- Browser: all three tabs at 1024px and at 375px. Play solved in 5 and in 8 (both banner
  wordings), and stopped correctly at nine guesses. Analyse keyed in a full game to a
  solve. Console clean throughout.

## Known gaps (unchanged from CLAUDE.md, plus one)
- `og.png`, `favicon.svg`, `icon-32.png`, `icon-180.png` are still missing from the repo,
  so the tab icon and link previews are broken.
- **Mobile guess bar overflows at 375px.** Six 44px pegs plus gaps plus an 88px Play
  button needs ~424px inside a 375px screen, so Play is clipped off the right edge.
  Pre-existing, affects every mode, not yet fixed. One-line fix available.
- The loading bar only advances while the tab is visible (`requestAnimationFrame`), so
  opening the page in a background tab looks stalled until you click over to it.

## Open question for Galvin
CLAUDE.md says UI copy uses British spelling; he asked for a tab named "Analyze".
Shipped as **Analyse**. One-word change if he wants the American spelling.
