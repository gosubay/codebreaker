# HANDOFF — Codebreaker

Last updated: 2026-09-03

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
