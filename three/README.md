# `/three` — the 3D board

A separate page. **It shares no code with `../index.html`** and is not loaded by it.

Live at https://gosubay.github.io/codebreaker/three/

## What it is

A lit 3D Mastermind board built in Three.js, made as a screen-recording prop for the
short-form video. Orbit camera, a shot system for repeatable camera moves, a cel-shading
pass to sit alongside `graphic_novel_cel` scenes, and a 1080x1920 plate mode with a
chroma or transparent background.

Also carries a Codespace view: 1,296 codes as a 36x36 grid of four-strip tiles that
culls to the surviving set as guesses land. That is the shot the physical board cannot
do — the 1,296 and the 256 in the script.

## It does not solve

Deliberately. `../index.html` owns solving: `rankAll` over all 1,296 guesses against the
precomputed table, verified at 4.476 average, worst 5.

This page only *filters* — it removes codes inconsistent with the feedback given, which is
the definition of the game rather than a strategy. Strategy mode replays the four scripted
moves from the video and stops; it never picks a line of its own.

The reason is in `../CLAUDE.md`: minimax restricted to possible codes averages 4.50 with a
worst case of **6**. A second, weaker solver in the same repo would eventually show a solve
the app itself would not play, and the app's footer links the video. One solver, one truth.

## Files

| File | |
|---|---|
| `index.html` | the served page — built, do not hand-edit |
| `page.src.html` | source: title, styles, markup |
| `app.src.js` | source: scene, board, camera, modes |
| `vendor/three.min.js` | Three.js r149 UMD, unmodified |
| `build.js` | dev-only assembler, never loaded by the page |

`index.html` is generated. Edit the two `.src` files, then `node build.js`.

Three.js is vendored rather than pulled from a CDN so the page keeps the repo's rule of no
runtime dependencies. It is a sibling file rather than inlined so that editing the board
does not churn a 660KB diff.

## Board state as text

Director mode round-trips the whole board through one string:

```
1432 / 1122=2b1w / 1134=1b2w / cam 24,0.34,1.30,0.1
```

Secret first, then one row per guess (`b` = black pegs, `w` = white; omit it and the row is
scored against the secret), then the camera as distance, yaw, tilt, height.

## Known gaps

- No depth of field or motion blur. Real-time rasterisation; both would need a
  post-processing pass.
- Recording writes VP9 webm. Fine for CapCut, not an editing codec.
- The peg colour order (red, orange, yellow, green, blue, purple) is fixed here and must
  match the video script. It is not read from `../index.html`.
