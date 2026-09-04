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

## English / 中文 (2026-09-04)

The whole page is now bilingual, toggled by an `EN / 中文` segmented control sitting in the
mode bar to the left of Back / Forward / New code. The choice is remembered between visits.

- **Every string moved into one table, `STR`**, keyed identically in both languages and read
  through `T(key, ...args)`. Nothing outside `STR` holds prose any more. Chrome, buttons,
  panel titles, the deduction facts, the entry grid, both result banners, and all of the
  coach copy — move 1, the eleven move-2 explanations in both halves, the middlegame and
  endgame notes, the grading lines.
- **Switching is a re-render, not a reload.** The board, the cursor and all three parked
  games survive it, mid-game, in every mode.
- Numbers are untouched. Every computed figure reads the same in both languages, because
  they are computed and not quoted.
- Chinese-specific work: system CJK font stack (no webfont — that would be megabytes on a
  file with no build step), `em` rendered as weight rather than a synthesised italic,
  looser line-height on coach paragraphs, and a space between Latin numerals and Han
  characters everywhere. Full rules in CLAUDE.md.
- The mobile control row was tightened (5px gap, 6px button padding under 880px) so four
  items fit one row at 375px. Without it "Forward ▶" and "New code" each wrapped to two
  lines.

## Tutorial link (2026-09-04)

Galvin's own strategy tutorial, linked from the footer under the name line. The label and
the destination both switch with the language: **Strategy Tutorial → YouTube** in English,
**策略教程 → Bilibili** in Chinese, because YouTube does not open from mainland China.
Same video on both. Stored as one `foot.tutorial` key per language so the label and the
URL cannot drift apart.

## Verified (not assumed)
- `node verify-all-games.js` — unchanged: total 5801, average 4.4761, worst 5,
  distribution 1/6/62/533/694. The solver was not touched.
- `node verify-i18n.js` — **new**. Key parity 105/105, then 608 generated strings swept in
  both languages: move 1, all eleven answers to 1122 / 3344 / 5656, non-22 openings, the
  solver's line to the end for 36 secrets, a stubborn player five guesses deep, both
  banners, and every key rendered with arguments. Fails on `undefined`, on Latin surviving
  into Chinese prose, and on Chinese leaking into English. Passes clean.
- A separate scan for numerals butting against Han characters found 46 sites in
  `M2WHY_ZH`; all fixed, scan now reports 0.
- Browser, both languages: desktop and 375px, all three tabs. Analyse keyed in 1122 and the
  fourteen answer counts read 256/256/96/16/1/256/208/36/**0**/114/32/4/20/1, matching
  `solver-decision-table.md`. Play mode run out to the nine-guess banner. Language switched
  mid-game in coach and in play — board preserved both times. Reload comes back in the saved
  language. Console clean throughout.

## Known gaps (unchanged from CLAUDE.md, plus one)
- `og.png`, `favicon.svg`, `icon-32.png`, `icon-180.png` are still missing from the repo,
  so the tab icon and link previews are broken.
- **Mobile guess bar overflows at 375px.** Six 44px pegs plus gaps plus an 88px Play
  button needs ~424px inside a 375px screen, so Play is clipped off the right edge.
  Pre-existing, affects every mode, not yet fixed. One-line fix available. The
  translation does not change it — 出手 is narrower than Play, so Chinese clips slightly
  less, not more.
- The loading bar only advances while the tab is visible (`requestAnimationFrame`), so
  opening the page in a background tab looks stalled until you click over to it.

## Open questions for Galvin

The Chinese copy is a full translation, not a machine pass — the eleven move-2
explanations and the move-1 copy were rewritten in Chinese rather than mapped word for
word, so the reasoning reads naturally. Worth a read-through by a native speaker before
you push it in front of a Chinese audience; the figures are all verified, the phrasing is
my judgement.

Mastermind is glossed as 珠玑妙算 (the common Chinese name). If you prefer 万能码 or want
it left as plain Mastermind, that is one line in CLAUDE.md and one in STR.

CLAUDE.md says UI copy uses British spelling; he asked for a tab named "Analyze".
Shipped as **Analyse**. One-word change if he wants the American spelling.
